/* global baseUrl, AjaxHelper, SelectRender */

'use strict';

var Urls = {
    groups: {
        list: {
            method: 'GET',
            url: baseUrl + 'server/users/usergroups.json'
        }
    },
    users: {
        list: {
            method: 'GET',
            url: baseUrl + 'server/users/users.json'
        }
    }
};

var CallBackHelper = {
    callbacks: []
};
CallBackHelper.add = function (callback) {
    this.callbacks.push(callback);
};

var bettleTrackApp = angular.module('bettleTrackApp', ['ui.router', 'ngResource']);

bettleTrackApp.factory('UserGroupService', function ($resource) {
    return $resource('/', {}, {
        query: {
            method: Urls.groups.list.method,
            url: Urls.groups.list.url,
            isArray: false,
            transformResponse: AjaxHelper.generateResponse
        }
    });
});

bettleTrackApp.factory('UserService', function ($resource) {
    return $resource('/', {}, {
        query: {
            method: Urls.users.list.method,
            url: Urls.users.list.url,
            isArray: false,
            transformResponse: AjaxHelper.generateResponse
        }
    });
});

bettleTrackApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/usergroups');
        $stateProvider.state('users', {
            url: '/users/:group_id',
            templateUrl: 'users/users.html',
            controller: 'UserController as ctrl'
        }).state('users.userinfo', {
            url: '/userinfo/:id',
            templateUrl: 'users/userinfo.html',
            controller: 'UserInfoController as ctrl'
        }).state('users.usergroups', {
            url: '/user_usergroups/:id',
            templateUrl: 'users/usergroups.html',
            controller: 'UserUserGroupsController as ctrl'
        }).state('usergroups', {
            url: '/usergroups',
            templateUrl: 'users/usergroups.html',
            controller: 'UserGroupController as ctrl'
        }).state('usergroups.usergroupinfo', {
            url: '/usergroupinfo/:id',
            templateUrl: 'users/usergroupinfo.html',
            controller: 'UserGroupInfoController as ctrl'
        }).state('usergroups.users', {
            url: '/usergroup_users/:id',
            templateUrl: 'users/users.html',
            controller: 'UserGroupUsersController as ctrl'
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

// side bar controller
bettleTrackApp.controller('SidebarController', ['$rootScope', 'UserGroupService',
    function ($rootScope, UserGroupService) {
        var self = this;
        $rootScope.userGroupId = -1;
        $rootScope.usergroups = [];
        UserGroupService.query(function (response) {
            $rootScope.usergroups = response.data.user_groups;
        });
    }]);

// user list controller
bettleTrackApp.controller('UserController', ['$rootScope', '$scope', '$timeout', '$stateParams', '$state', 'UserService',
    function ($rootScope, $scope, $timeout, $stateParams, $state, UserService) {
        var self = this;
        self.buttons = {
            add: true,
            active: true,
            block: true,
            delete: true,
            action: true
        };
        $rootScope.userGroupId = $stateParams.group_id;
        if ($stateParams.group_id > 0) {
            self.isUserGroupUsers = true;
            self.userGroupName = 'Some usergroup name';
        } else {
            self.isUserGroupUsers = false;
        }
        self.users = [];
        UserService.query(function (response) {
            self.users = response.data.users;
        });
        self.showUserInfo = function (userId) {
            $state.go('users.userinfo', {id: userId}, {});
        };
        self.showuserGroups = function (userId) {
            $state.go('users.usergroups', {id: userId}, {});
        };
    }]);

// user information controller
bettleTrackApp.controller('UserInfoController', ['$rootScope', '$scope', '$stateParams', '$state', 'UserService',
    function ($rootScope, $scope, $stateParams, $state, UserService) {
        var self = this;
        self.user_btn_create = ($stateParams.id == 0);
        self.userInfo = {};
        self.userInfoSubmitted = false;
        var groupOptions = [];
        for (var i = 0; i < $rootScope.usergroups.length; i++) {
            groupOptions.push({
                value: $rootScope.usergroups[i].id,
                label: $rootScope.usergroups[i].name
            });
        }
        self.submitUserInfo = function (valid) {
            self.userInfoSubmitted = true;
            if (valid) {

            }
        };
        CallBackHelper.add(function () {
            var dialog = $('#user-info').data('dialog');
            dialog.open();
            SelectRender.render('userinfo_usergroup', {
                options: groupOptions,
                values: [],
                multiple: true
            }, true, false, 'None');
        });
    }]);

// user usergroups controller
bettleTrackApp.controller('UserUserGroupsController', ['$timeout', '$stateParams', '$state', 'UserGroupService',
    function ($timeout, $stateParams, $state, UserGroupService) {
        var self = this;
        self.buttons = {
            add: false,
            active: true,
            block: true,
            delete: true,
            action: false
        };
        self.usergroups = [];
        UserGroupService.query(function (response) {
            self.usergroups = response.data.user_groups;
        });
        CallBackHelper.add(function () {
            var dialog = $('#user-info').data('dialog');
            dialog.open();
        });
    }]);

// user group list controller
bettleTrackApp.controller('UserGroupController', ['$rootScope', '$stateParams', '$state', 'UserGroupService',
    function ($rootScope, $stateParams, $state, UserGroupService) {
        var self = this;
        self.buttons = {
            add: true,
            active: true,
            block: true,
            delete: true,
            action: true
        };
        $rootScope.userGroupId = -1;
        self.usergroups = [];
        UserGroupService.query(function (response) {
            self.usergroups = response.data.user_groups;
        });
        self.showUserGroupInfo = function (groupId) {
            $state.go('usergroups.usergroupinfo', {id: groupId}, {});
        };
        self.showGroupUsers = function (groupId) {
            $state.go('usergroups.users', {id: groupId}, {});
        };
    }]);

// user group information controller
bettleTrackApp.controller('UserGroupInfoController', ['$scope', '$stateParams', '$state', 'UserService',
    function ($scope, $stateParams, $state, UserService) {
        var self = this;
        self.user_btn_create = true;
        self.userGroupInfo = {};
        self.userGroupInfoSubmitted = false;
        self.submitUserGroupInfo = function (valid) {
            self.userGroupInfoSubmitted = true;
            if (valid) {

            }
        };
        CallBackHelper.add(function () {
            var dialog = $('#user-group-info').data('dialog');
            dialog.open();
        });
    }]);

// user group users controller
bettleTrackApp.controller('UserGroupUsersController', ['$stateParams', '$state', 'UserService',
    function ($stateParams, $state, UserService) {
        var self = this;
        self.buttons = {
            add: false,
            active: true,
            block: true,
            delete: true,
            action: false
        };
        self.users = [];
        UserService.query(function (response) {
            self.users = response.data.users;
        });
        CallBackHelper.add(function () {
            var dialog = $('#user-group-info').data('dialog');
            dialog.open();
        });
    }]);