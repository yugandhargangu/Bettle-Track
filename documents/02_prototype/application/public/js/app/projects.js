/* global AjaxHelper, baseUrl, tinyMCE, PreLoader */

'use strict';

var Urls = {
    project: {
        method: 'GET',
        url: baseUrl + 'server/projects/projects.json'
    },
    project_info: {
        method: 'GET',
        url: baseUrl + 'server/projects/project_info.json'
    },
    modules: {
        method: 'GET',
        url: baseUrl + 'server/projects/modules.json'
    },
    module_info: {
        method: 'GET',
        url: baseUrl + 'server/projects/module_info.json'
    },
    members: {
        method: 'GET',
        url: baseUrl + 'server/projects/members.json'
    },
    pages: {
        method: 'GET',
        url: baseUrl + 'server/projects/pages.json'
    },
    page: {
        method: 'GET',
        url: baseUrl + 'server/projects/page.json'
    },
    fields: {
        method: 'GET',
        url: baseUrl + 'server/projects/fields.json'
    }
};

var CallBackHelper = {
    callbacks: []
};
CallBackHelper.add = function (callback) {
    this.callbacks.push(callback);
};

var bettleTrackApp = angular.module('bettleTrackApp', ['ngResource', 'ui.router']);

bettleTrackApp.factory('ProjectService', ['$resource', function ($resource) {
        return $resource('/', {}, {
            query: {
                method: Urls.project.method,
                url: Urls.project.url,
                isArray: false,
                transformResponse: AjaxHelper.generateResponse
            },
            get: {
                method: Urls.project_info.method,
                url: Urls.project_info.url,
                isArray: false,
                transformResponse: AjaxHelper.generateResponse
            }
        });
    }]);

bettleTrackApp.factory('ModuleService', ['$resource', function ($resource) {
        return $resource('/', {}, {
            query: {
                method: Urls.modules.method,
                url: Urls.modules.url,
                isArray: false,
                transformResponse: AjaxHelper.generateResponse
            },
            get: {
                method: Urls.module_info.method,
                url: Urls.module_info.url,
                isArray: false,
                transformResponse: AjaxHelper.generateResponse
            }
        });
    }]);

bettleTrackApp.factory('MemberService', ['$resource', function ($resource) {
        return $resource('/', {}, {
            query: {
                method: Urls.members.method,
                url: Urls.members.url,
                isArray: false,
                transformResponse: AjaxHelper.generateResponse
            },
            get: {
                method: Urls.members.method,
                url: Urls.members.url,
                isArray: false,
                transformResponse: AjaxHelper.generateResponse
            }
        });
    }]);

bettleTrackApp.factory('PageService', ['$resource', function ($resource) {
        return $resource('/', {}, {
            query: {
                method: Urls.pages.method,
                url: Urls.pages.url,
                isArray: false,
                transformResponse: AjaxHelper.generateResponse
            },
            get: {
                method: Urls.page.method,
                url: Urls.page.url,
                isArray: false,
                transformResponse: AjaxHelper.generateResponse
            }
        });
    }]);

bettleTrackApp.factory('FieldService', ['$resource', function ($resource) {
        return $resource('/', {}, {
            query: {
                method: Urls.fields.method,
                url: Urls.fields.url,
                isArray: false,
                transformResponse: AjaxHelper.generateResponse
            },
            get: {
                method: Urls.fields.method,
                url: Urls.fields.url,
                isArray: false,
                transformResponse: AjaxHelper.generateResponse
            }
        });
    }]);

bettleTrackApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/project/0');
        $stateProvider.state('project', {
            url: '/project/:project_id',
            templateUrl: 'projects/project_data.html',
            controller: 'ProjectController as ctrl'
        }).state('project.info', {
            url: '/info/:project_id',
            templateUrl: 'projects/project_info.html',
            controller: 'ProjectInfoController as ctrl'
        }).state('project.module', {
            url: '/module/:module_id',
            templateUrl: 'projects/module_info.html',
            controller: 'ModuleInfoController as ctrl'
        }).state('project.members', {
            url: '/members/:project_id',
            templateUrl: 'projects/members.html',
            controller: 'MembersController as ctrl'
        }).state('project.pages', {
            url: '/pages/:project_id',
            templateUrl: 'projects/pages.html',
            controller: 'PagesController as ctrl'
        }).state('project.files', {
            url: '/files/:project_id',
            templateUrl: 'projects/files.html',
            controller: 'FilesController as ctrl'
        }).state('project.fields', {
            url: '/fields/:module_id',
            templateUrl: 'projects/fields.html',
            controller: 'FieldController as ctrl'
        });
    }]);

bettleTrackApp.run(function ($rootScope, $timeout) {
    $rootScope.$on('$viewContentLoaded', function (event) {
        $timeout(function () {
            if (CallBackHelper.callbacks.length > 0) {
                for (var i = 0; i < CallBackHelper.callbacks.length; i++) {
                    CallBackHelper.callbacks[i]();
                    CallBackHelper.callbacks.shift();
                }
            }
        });
    });
});

// sidebar controller
bettleTrackApp.controller('SidebarController', ['$rootScope', 'ProjectService', function ($rootScope, ProjectService) {
        var self = this;
        $rootScope.activeMainMenuItem = 3;
        $rootScope.project_id = 0;
        self.projects = [];
        ProjectService.query(function (response) {
            self.projects = response.data.projects;
        });
    }]);

// Main controller
bettleTrackApp.controller('ProjectController', ['$rootScope', '$stateParams', '$state', 'ModuleService',
    function ($rootScope, $stateParams, $state, ModuleService) {
        var self = this;
        self.project_id = $stateParams.project_id;
        self.project_name = '';
        self.modules = [];
        ModuleService.query({project_id: $stateParams.project_id}, function (response) {
            self.project_name = response.data.project_name;
            self.modules = response.data.modules;
        });
        $rootScope.project_id = $stateParams.project_id;
        if ($state.current.name === 'project') {
            $state.go('project.info', {project_id: $stateParams.project_id});
        }
        PreLoader.init();
    }]);

// project information controller
bettleTrackApp.controller('ProjectInfoController', ['$rootScope', '$stateParams', 'ProjectService', function ($rootScope, $stateParams, ProjectService) {
        $rootScope.activeProjectMenuItem = 1;
        var self = this;
        self.project = {};
        ProjectService.get({}, function (response) {
            self.project = response.data;
        });
        CallBackHelper.add(initTinyMce);
    }]);

// module information controller
bettleTrackApp.controller('ModuleInfoController', ['$rootScope', '$stateParams', 'ModuleService', function ($rootScope, $stateParams, ModuleService) {
        $rootScope.activeProjectMenuItem = 2;
        var self = this;
        self.module = {};
        ModuleService.get({}, function (response) {
            self.module = response.data;
        });
        CallBackHelper.add(initTinyMce);
    }]);

// members controller
bettleTrackApp.controller('MembersController', ['$rootScope', '$stateParams', 'MemberService',
    function ($rootScope, $stateParams, MemberService) {
        $rootScope.activeProjectMenuItem = 3;
        var self = this;
        self.project_name = '';
        self.all_users = [];
        self.users = [];
        MemberService.query({}, function (response) {
            self.project_name = response.data.project_name;
            self.users = response.data.users;
        });
        self.addMembers = function () {
            MemberService.query({}, function (response) {
                self.all_users = response.data.users;
                var dialog = $('#add_members').data('dialog');
                dialog.open();
            });
        };
    }]);

// files controller
bettleTrackApp.controller('FilesController', ['$rootScope', '$stateParams', 'MemberService', function ($rootScope, $stateParams, MemberService) {
        $rootScope.activeProjectMenuItem = 4;
        var self = this;
    }]);

// pages controller
bettleTrackApp.controller('PagesController', ['$rootScope', '$stateParams', 'PageService', function ($rootScope, $stateParams, PageService) {
        $rootScope.activeProjectMenuItem = 5;
        var self = this;
        self.pages = [];
        self.project_name = '';
        self.page_name = '';
        PageService.query({}, function (response) {
            self.project_name = response.data.project_name;
            self.pages = response.data.pages;
        });
        tinyMCE.init({
            selector: "#page-content",
            height: 600,
            autoresize_min_height: 400,
            autoresize_max_height: 600,
            menubar: false,
            plugins: [
                'autoresize advlist autolink lists link image charmap print preview anchor table',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table contextmenu paste code'
            ],
            toolbar: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | table'
        });
        self.openPage = function (page_id) {
            PageService.get({page_id: page_id}, function (response) {
                self.page_name = response.data.page_name;
                self.page_content = response.data.page_content;
                $('#page-info').data('dialog').open();
            });
        };
    }]);

// fields controller
bettleTrackApp.controller('FieldController', ['$rootScope', '$stateParams', 'FieldService',
    function ($rootScope, $stateParams, FieldService) {
        $rootScope.activeProjectMenuItem = 6;
        var self = this;
        self.project_name = '';
        self.module_name = '';
        self.all_field_types = [];
        self.fields = [];
        self.fieldInfo = {};
        self.fieldInfoSubmitted = false;
        self.field_existed = false;
        self.user_btn_create = true;
        FieldService.query({}, function (response) {
            self.project_name = response.data.project_name;
            self.fields = response.data.fields;
            self.all_field_types = response.data.types;
            if ($stateParams.module_id == 0) {
                self.module_name = '';
            } else {
                self.module_name = 'Some Module Name';
            }
        });
        self.addField = function () {
            var dialog = $('#add_field').data('dialog');
            dialog.open();
        };
        self.submitFieldForm = function (isValid) {
            self.fieldInfoSubmitted = true;
            if (isValid) {
                // do submit
            }
        };
        self.showFieldInfo = function (field_id) {
            var dialog = $('#add_field').data('dialog');
            dialog.open();
        };
    }]);

var tinyMceInitCount = 0;
/**
 * To get tinymce init function
 * 
 * @returns {Function}
 */
function initTinyMce() {
    if (tinyMceInitCount > 0) {
        tinyMCE.EditorManager.editors = [];
    }
    tinyMCE.init({
        selector: "#short_desc",
        height: 200,
        menubar: false,
        plugins: [
            'advlist autolink lists link image charmap print preview anchor table',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table contextmenu paste code'
        ],
        toolbar: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | table'
    });
    tinyMCE.init({
        selector: "#long_desc",
        height: 400,
        menubar: false,
        plugins: [
            'advlist autolink lists link image charmap print preview anchor table',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table contextmenu paste code'
        ],
        toolbar: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | table'
    });
    tinyMceInitCount++;
}