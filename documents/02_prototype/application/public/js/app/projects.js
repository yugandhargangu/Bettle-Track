/* global AjaxHelper, baseUrl, tinyMCE, PreLoader, bettleTrackApp, CallBackHelper, ProjectCardlayout */

'use strict';

var ProjectUrls = {
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

bettleTrackApp.factory('ProjectService', ['$resource', function ($resource) {
        return $resource('/', {}, {
            query: {
                method: ProjectUrls.project.method,
                url: ProjectUrls.project.url,
                isArray: false,
                transformResponse: AjaxHelper.generateResponse
            },
            get: {
                method: ProjectUrls.project_info.method,
                url: ProjectUrls.project_info.url,
                isArray: false,
                transformResponse: AjaxHelper.generateResponse
            }
        });
    }]);

bettleTrackApp.factory('ModuleService', ['$resource', function ($resource) {
        return $resource('/', {}, {
            query: {
                method: ProjectUrls.modules.method,
                url: ProjectUrls.modules.url,
                isArray: false,
                transformResponse: AjaxHelper.generateResponse
            },
            get: {
                method: ProjectUrls.module_info.method,
                url: ProjectUrls.module_info.url,
                isArray: false,
                transformResponse: AjaxHelper.generateResponse
            }
        });
    }]);

bettleTrackApp.factory('MemberService', ['$resource', function ($resource) {
        return $resource('/', {}, {
            query: {
                method: ProjectUrls.members.method,
                url: ProjectUrls.members.url,
                isArray: false,
                transformResponse: AjaxHelper.generateResponse
            },
            get: {
                method: ProjectUrls.members.method,
                url: ProjectUrls.members.url,
                isArray: false,
                transformResponse: AjaxHelper.generateResponse
            }
        });
    }]);

bettleTrackApp.factory('PageService', ['$resource', function ($resource) {
        return $resource('/', {}, {
            query: {
                method: ProjectUrls.pages.method,
                url: ProjectUrls.pages.url,
                isArray: false,
                transformResponse: AjaxHelper.generateResponse
            },
            get: {
                method: ProjectUrls.page.method,
                url: ProjectUrls.page.url,
                isArray: false,
                transformResponse: AjaxHelper.generateResponse
            }
        });
    }]);

bettleTrackApp.factory('FieldService', ['$resource', function ($resource) {
        return $resource('/', {}, {
            query: {
                method: ProjectUrls.fields.method,
                url: ProjectUrls.fields.url,
                isArray: false,
                transformResponse: AjaxHelper.generateResponse
            },
            get: {
                method: ProjectUrls.fields.method,
                url: ProjectUrls.fields.url,
                isArray: false,
                transformResponse: AjaxHelper.generateResponse
            }
        });
    }]);

// List controller
bettleTrackApp.controller('ProjectsController', ['$rootScope', '$stateParams', '$state', 'ProjectService',
    function ($rootScope, $stateParams, $state, ProjectService) {
        $rootScope.activeMainMenuItem = 3;
        var self = this;
        self.projects = [];
        self.viewMoreCards = function () {
            ProjectService.query(function (response) {
                ProjectCardlayout.render({labels: response.data.labels, projects: response.data.projects}, self);
            });
        };
        self.showProjectDetails = function (projectId) {
            $state.go('project', {project_id: projectId}, {});
        };
        self.showTestCases = function (projectId) {
            $state.go('tp_project', {project_id: projectId}, {});
        };
        self.showTestSets = function (projectId) {
            $state.go('tl_project', {project_id: projectId}, {});
        };
        self.viewMoreCards();
        PreLoader.init();
    }]);

// Main controller
bettleTrackApp.controller('ProjectController', ['$rootScope', '$stateParams', '$state', 'ModuleService',
    function ($rootScope, $stateParams, $state, ModuleService) {
        $rootScope.activeMainMenuItem = 3;
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
            if ($stateParams.module_id === 0) {
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