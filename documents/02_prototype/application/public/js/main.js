/* global React, ReactDOM */

'use strict';

var IdHelper = {
    id: 1,
    name: 'IdName'
};

IdHelper.generate = function () {
    this.id++;
    return this.name + this.id;
};

var PreLoader = {
    preloader: $('#data-preloader')
};

PreLoader.init = function () {
    if (this.preloader.is(':visible')) {
        this.preloader.hide();
    }
};

PreLoader.hide = function () {
    this.preloader.hide();
};

PreLoader.show = function () {
    this.preloader.show();
};

var CallBackHelper = {
    callbacks: []
};
CallBackHelper.add = function (callback) {
    this.callbacks.push(callback);
};
CallBackHelper.clean = function () {
    this.callbacks = [];
};

var bettleTrackApp = angular.module('bettleTrackApp', ['ngResource', 'ui.router']);

bettleTrackApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/dashboard/');
        // Dashboard states
        $stateProvider.state('dashboard', {
            url: '/dashboard/:dashboard_id',
            templateUrl: 'dashboard/index.html',
            controller: 'DashboardController as ctrl'
        }).state('dashboard_info', {
            url: '/dashboard_info/:dashboard_id',
            templateUrl: 'dashboard/info.html',
            controller: 'DashboardInfoController as ctrl'
        });

        // User states
        $stateProvider.state('users', {
            url: '/users/:group_id',
            templateUrl: 'users/users.html',
            controller: 'UserController as ctrl'
        }).state('usergroups', {
            url: '/usergroups',
            templateUrl: 'users/usergroups.html',
            controller: 'UserGroupController as ctrl'
        });

        // Project states
        $stateProvider.state('projects', {
            url: '/projects',
            templateUrl: 'projects/projects.html',
            controller: 'ProjectsController as ctrl'
        }).state('project', {
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

        // Test plan states
        $stateProvider.state('tp_project', {
            url: '/tp_project/:project_id',
            templateUrl: 'tests/plan/testcases.html',
            controller: 'TestCasesController as ctrl'
        }).state('tp_project.testcase', {
            url: '/tp_testcase/:test_id',
            templateUrl: 'tests/plan/testinfo.html',
            controller: 'TestCaseInfoController as ctrl'
        }).state('tp_project.testcase.details', {
            url: '/tp_details',
            templateUrl: 'tests/plan/details.html',
            controller: 'TestCaseDetailsController as ctrl'
        }).state('tp_project.testcase.steps', {
            url: '/tp_steps',
            templateUrl: 'tests/plan/design_steps.html',
            controller: 'TestCaseDesignStepsController as ctrl'
        }).state('tp_project.testcase.params', {
            url: '/tp_params',
            templateUrl: 'tests/plan/params.html',
            controller: 'TestCaseParamsController as ctrl'
        }).state('tp_project.testcase.attachments', {
            url: '/tp_attachments',
            templateUrl: 'tests/plan/attachments.html',
            controller: 'TestCaseAttachmentsController as ctrl'
        }).state('tp_project.testcase.requirements', {
            url: '/tp_requirements',
            templateUrl: 'tests/plan/requirements.html',
            controller: 'TestCaseRequirementsController as ctrl'
        }).state('tp_project.testcase.issues', {
            url: '/tp_issues',
            templateUrl: 'tests/plan/issues.html',
            controller: 'TestCaseIssuesController as ctrl'
        }).state('tp_project.testcase.history', {
            url: '/tp_history',
            templateUrl: 'tests/plan/history.html',
            controller: 'TestCaseHistoryController as ctrl'
        });

        // Test lab states
        $stateProvider.state('tl_project', {
            url: '/tl_project/:project_id',
            templateUrl: 'tests/lab/testsets.html',
            controller: 'TestSetsController as ctrl'
        }).state('tl_project.testset', {
            url: '/tl_testset/:test_id',
            templateUrl: 'tests/lab/testinfo.html',
            controller: 'TestSetInfoController as ctrl'
        }).state('tl_project.testset.details', {
            url: '/tl_details',
            templateUrl: 'tests/lab/details.html',
            controller: 'TestSetDetailsController as ctrl'
        }).state('tl_project.testset.execution', {
            url: '/tl_execution',
            templateUrl: 'tests/lab/execution.html',
            controller: 'TestSetExecutionController as ctrl'
        }).state('tl_project.testset.attachments', {
            url: '/tl_attachments',
            templateUrl: 'tests/lab/attachments.html',
            controller: 'TestSetAttachmentsController as ctrl'
        }).state('tl_project.testset.issues', {
            url: '/tl_issues',
            templateUrl: 'tests/lab/issues.html',
            controller: 'TestSetIssuesController as ctrl'
        }).state('tl_project.testset.history', {
            url: '/tl_history',
            templateUrl: 'tests/lab/history.html',
            controller: 'TestSetHistoryController as ctrl'
        });

        // Issues states
        $stateProvider.state('filter', {
            url: '/filter/:type/:id',
            templateUrl: 'issues/search.html',
            controller: 'FilterController as ctrl'
        }).state('issue', {
            url: '/issue/:issue_id',
            templateUrl: 'issues/issue_info.html',
            controller: 'IssueInfoController as ctrl'
        }).state('filters', {
            url: '/filters',
            templateUrl: 'issues/filters.html',
            controller: 'FiltersController as ctrl'
        }).state('filter.listview', {
            url: '/list',
            templateUrl: 'issues/issue_listview.html',
            controller: 'ViewTypeController as ctrl'
        }).state('filter.detailview', {
            url: '/details',
            templateUrl: 'issues/issue_detailview.html',
            controller: 'ViewTypeController as ctrl'
        });

        // Common states
        $stateProvider.state('calendar', {
            url: '/calendar',
            templateUrl: 'common/calendar.html',
            controller: 'CalendarController as ctrl'
        }).state('notifications', {
            url: '/notifications',
            templateUrl: 'common/notifications.html',
            controller: 'NotificationController as ctrl'
        }).state('inbox', {
            url: '/inbox',
            templateUrl: 'common/inbox.html',
            controller: 'InboxController as ctrl'
        }).state('myprofile', {
            url: '/myprofile',
            templateUrl: 'common/profile.html',
            controller: 'ProfileController as ctrl'
        });
    }]);

bettleTrackApp.run(function ($rootScope, $timeout) {
    $rootScope.$on('$viewContentLoaded', function (event) {
        $timeout(function () {
            if (CallBackHelper.callbacks.length > 0) {
                for (var i = 0; i < CallBackHelper.callbacks.length; i++) {
                    CallBackHelper.callbacks[i]();
                    CallBackHelper.callbacks.splice(i, 1);
                }
            }
        });
        StartScreen.init();
    });
});

bettleTrackApp.controller('MenuController', ['$state', function ($state) {
        var self = this;
        self.toggleStartScreen = function () {
            StartScreen.toggleStartScreen();
        };
    }]);

bettleTrackApp.controller('StartController', ['$state', function ($state) {
        var self = this;
        self.goToState = function (stateName) {
            StartScreen.toggleStartScreen();
            $state.go(stateName, {}, {});
        };
        self.closeStartScreen = function () {
            StartScreen.init();
        };
    }]);

var StartScreen = {};
$(document).ready(function () {
    StartScreen.appsIcon = $('#start-screen');
    StartScreen.mainContent = $('#main-content');
});
StartScreen.toggleStartScreen = function () {
    this.appsIcon.toggle(250);
    if (this.mainContent.is(':visible')) {
        this.mainContent.hide();
    } else {
        this.mainContent.show();
    }
};

StartScreen.init = function () {
    StartScreen.appsIcon.hide(250);
    this.mainContent.show();
};

var AjaxHelper = {};
AjaxHelper.generateResponse = function (data, headers) {
    return {
        status: 0,
        redirect: false,
        redirectUrl: '',
        headers: headers,
        data: angular.fromJson(data)
    };
};

var ViewMoreBtnHelper = {
    destroy: function () {
        $('#btn-view-more').remove();
    },
    create: function (id, ctrl) {
        var item = $('<div class="margin10" style="text-align:center;" id="btn-view-more"><button type="button" class="button link">View More...</button></div>');
        item.on('click', function () {
            ctrl.viewMoreCards();
        });
        $('#' + id).append(item);
    }
};
        