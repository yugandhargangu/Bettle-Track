/* global AjaxHelper, baseUrl, tinyMCE */

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
    }]);

// project information controller
bettleTrackApp.controller('ProjectInfoController', ['$stateParams', 'ProjectService', function ($stateParams, ProjectService) {
        var self = this;
        self.project = {};
        ProjectService.get({}, function (response) {
            self.project = response.data;
        });
        CallBackHelper.add(initTinyMce);
    }]);

// module information controller
bettleTrackApp.controller('ModuleInfoController', ['$stateParams', 'ModuleService', function ($stateParams, ModuleService) {
        var self = this;
        self.module = {};
        ModuleService.get({}, function (response) {
            self.module = response.data;
        });
        CallBackHelper.add(initTinyMce);
    }]);

// members controller
bettleTrackApp.controller('MembersController', ['$stateParams', 'MemberService',
    function ($stateParams, MemberService) {
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
bettleTrackApp.controller('FilesController', ['$stateParams', 'MemberService', function ($stateParams, MemberService) {
        var self = this;
    }]);

// pages controller
bettleTrackApp.controller('PagesController', ['$stateParams', 'PageService', function ($stateParams, PageService) {
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