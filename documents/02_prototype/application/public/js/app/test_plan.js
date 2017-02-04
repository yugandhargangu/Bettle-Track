/* global AjaxHelper, baseUrl, tinyMCE, PreLoader */

'use strict';

var Urls = {
    project: {
        method: 'GET',
        url: baseUrl + 'server/projects/projects.json'
    }
};

var CallBackHelper = {
    callbacks: []
};
CallBackHelper.add = function (callback) {
    this.callbacks.push(callback);
};

var tinyMceInitCount = 0;

var bettleTrackApp = angular.module('bettleTrackApp', ['ngResource', 'ui.router']);

bettleTrackApp.factory('ProjectService', ['$resource', function ($resource) {
        return $resource('/', {}, {
            query: {
                method: Urls.project.method,
                url: Urls.project.url,
                isArray: false,
                transformResponse: AjaxHelper.generateResponse
            }
        });
    }]);

bettleTrackApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/project/0');
        $stateProvider.state('project', {
            url: '/project/:project_id',
            templateUrl: 'tests/plan/testcases.html',
            controller: 'TestCasesController as ctrl'
        }).state('project.testcase', {
            url: '/testcase/:test_id',
            templateUrl: 'tests/plan/testinfo.html',
            controller: 'TestInfoController as ctrl'
        }).state('project.testcase.details', {
            url: '/details',
            templateUrl: 'tests/plan/details.html',
            controller: 'DetailsController as ctrl'
        }).state('project.testcase.steps', {
            url: '/steps',
            templateUrl: 'tests/plan/design_steps.html',
            controller: 'DesignStepsController as ctrl'
        }).state('project.testcase.params', {
            url: '/params',
            templateUrl: 'tests/plan/params.html',
            controller: 'ParamsController as ctrl'
        }).state('project.testcase.attachments', {
            url: '/attachments',
            templateUrl: 'tests/plan/attachments.html',
            controller: 'AttachmentsController as ctrl'
        }).state('project.testcase.requirements', {
            url: '/requirements',
            templateUrl: 'tests/plan/requirements.html',
            controller: 'RequirementsController as ctrl'
        }).state('project.testcase.issues', {
            url: '/issues',
            templateUrl: 'tests/plan/issues.html',
            controller: 'IssuesController as ctrl'
        }).state('project.testcase.history', {
            url: '/history',
            templateUrl: 'tests/plan/history.html',
            controller: 'HistoryController as ctrl'
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
        $rootScope.activeMainMenuItem = 4;
        $rootScope.project_id = 0;
        self.projects = [];
        ProjectService.query(function (response) {
            self.projects = response.data.projects;
        });
    }]);

// testcase list controller
bettleTrackApp.controller('TestCasesController', ['$rootScope', '$stateParams', '$state', 'ProjectService',
    function ($rootScope, $stateparams, $state, ProjectService) {
        var self = this;
        $rootScope.project_id = $stateparams.project_id;
        self.project_name = "Some project name";
        self.modal_display_name = '';
        $state.go('project.testcase', {test_id: 0}, {});
        PreLoader.init();
        self.showAddFolder = function () {

        };
    }]);

// testcase info controller
bettleTrackApp.controller('TestInfoController', ['$rootScope', '$stateParams', '$state', 'ProjectService',
    function ($rootScope, $stateparams, $state, ProjectService) {
        var self = this;
        $state.go('project.testcase.details', {}, {});
    }]);

// testcase info controller
bettleTrackApp.controller('DetailsController', ['$rootScope', 'ProjectService', function ($rootScope, ProjectService) {
        $rootScope.testMenuItemIndex = 1;
        var self = this;
        CallBackHelper.add(function () {
            if (tinyMceInitCount > 0) {
                tinyMCE.EditorManager.editors = [];
            }
            tinyMceInitCount++;
            tinyMCE.init({
                selector: "#test_desc",
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
                selector: "#test_comments",
                height: 200,
                menubar: false,
                plugins: [
                    'advlist autolink lists link image charmap print preview anchor table',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table contextmenu paste code'
                ],
                toolbar: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | table'
            });
        });
    }]);

// design steps controller
bettleTrackApp.controller('DesignStepsController', ['$rootScope', '$stateParams', '$state', 'ProjectService',
    function ($rootScope, $stateparams, $state, ProjectService) {
        $rootScope.testMenuItemIndex = 2;
        var self = this;
    }]);

// params controller
bettleTrackApp.controller('ParamsController', ['$rootScope', '$stateParams', '$state', 'ProjectService',
    function ($rootScope, $stateparams, $state, ProjectService) {
        $rootScope.testMenuItemIndex = 3;
        var self = this;
    }]);

// attachments controller
bettleTrackApp.controller('AttachmentsController', ['$rootScope', '$stateParams', '$state', 'ProjectService',
    function ($rootScope, $stateparams, $state, ProjectService) {
        $rootScope.testMenuItemIndex = 4;
        var self = this;
    }]);

// requirements controller
bettleTrackApp.controller('RequirementsController', ['$rootScope', '$stateParams', '$state', 'ProjectService',
    function ($rootScope, $stateparams, $state, ProjectService) {
        $rootScope.testMenuItemIndex = 5;
        var self = this;
    }]);

// issues controller
bettleTrackApp.controller('IssuesController', ['$rootScope', '$stateParams', '$state', 'ProjectService',
    function ($rootScope, $stateparams, $state, ProjectService) {
        $rootScope.testMenuItemIndex = 6;
        var self = this;
        self.issues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    }]);

// history controller
bettleTrackApp.controller('HistoryController', ['$rootScope', '$stateParams', '$state', 'ProjectService',
    function ($rootScope, $stateparams, $state, ProjectService) {
        $rootScope.testMenuItemIndex = 7;
        var self = this;
    }]);