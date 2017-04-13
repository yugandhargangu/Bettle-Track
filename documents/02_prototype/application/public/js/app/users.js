/* global baseUrl, AjaxHelper, SelectRender, PreLoader, bettleTrackApp, CallBackHelper, UserCardlayout, UserGroupCardlayout */

'use strict';

var UserUrls = {
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

bettleTrackApp.factory('UserGroupService', function ($resource) {
    return $resource('/', {}, {
        query: {
            method: UserUrls.groups.list.method,
            url: UserUrls.groups.list.url,
            isArray: false,
            transformResponse: AjaxHelper.generateResponse
        }
    });
});

bettleTrackApp.factory('UserService', function ($resource) {
    return $resource('/', {}, {
        query: {
            method: UserUrls.users.list.method,
            url: UserUrls.users.list.url,
            isArray: false,
            transformResponse: AjaxHelper.generateResponse
        }
    });
});

// user list controller
bettleTrackApp.controller('UserController', ['$rootScope', '$scope', '$timeout', '$stateParams', '$state', 'UserService', 'UserGroupService',
    function ($rootScope, $scope, $timeout, $stateParams, $state, UserService, UserGroupService) {
        $rootScope.activeMainMenuItem = 2;
        var self = this;
        self.userInfo = {};
        self.user_btn_create = true;
        self.userInfoSubmitted = false;
        self.users = [];
        var groupOptions = [{value: 1, label: 'User group one'}, {value: 2, label: 'User group two'}, {value: 3, label: 'User group three'}, {value: 4, label: 'User group four'}];
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
        self.viewMoreCards = function () {
            UserService.query(function (response) {
                self.users = response.data.users;
                UserCardlayout.render({labels: response.data.labels, users: response.data.users}, self);
            });
        };
        self.showUserInfo = function (userId) {
            self.user_btn_create = (userId === 0);
            $('#user-info-form').slideDown(200);
            $('#users-search').hide();
            $('#users-list').slideUp(200);
            SelectRender.render('userinfo_usergroup', {
                options: groupOptions,
                values: [],
                multiple: true
            }, true, false, 'None');
        };
        self.hideUserInfo = function () {
            $('#user-info-form').slideUp(200);
            $('#users-search').show();
            $('#users-list').slideDown(200);
        };
        self.submitUserInfo = function (valid) {
            self.userInfoSubmitted = true;
            if (valid) {

            }
        };
        self.showUserGroups = function (userId) {

        };
        self.viewMoreCards();
        PreLoader.init();
    }]);

// user group list controller
bettleTrackApp.controller('UserGroupController', ['$rootScope', '$stateParams', '$state', 'UserGroupService',
    function ($rootScope, $stateParams, $state, UserGroupService) {
        $rootScope.activeMainMenuItem = 2;
        var self = this;
        self.buttons = {
            add: true,
            active: true,
            block: true,
            delete: true,
            action: true
        };
        self.user_btn_create = true;
        self.userGroupInfo = {};
        self.userGroupInfoSubmitted = false;
        $rootScope.userGroupId = -1;
        self.usergroups = [];
        self.viewMoreCards = function () {
            UserGroupService.query(function (response) {
                UserGroupCardlayout.render({labels: response.data.labels, user_groups: response.data.user_groups}, self);
            });
        };
        self.submitUserGroupInfo = function (valid) {
            self.userGroupInfoSubmitted = true;
            if (valid) {

            }
        };
        self.showUserGroupInfo = function (groupId) {
            self.user_btn_create = (groupId === 0);
            $('#user-group-form').slideDown(200);
            $('#user-group-search').hide();
            $('#user-groups-list').slideUp(200);
        };
        self.hideUserGroupInfo = function () {
            $('#user-group-form').slideUp(200);
            $('#user-group-search').show();
            $('#user-groups-list').slideDown(200);
        };
        self.showGroupUsers = function (groupId) {
            $state.go('users', {group_id: groupId}, {});
        };
        self.viewMoreCards();
        PreLoader.init();
    }]);