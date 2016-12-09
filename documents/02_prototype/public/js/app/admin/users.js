
requirejs.config({
    baseUrl: '../../public/js/',
    paths: {
        jquery: 'jquery-3.1.1.min',
        angular: 'angular.min'
    },
    shim: {
        'angular': {
            exports: 'angular'
        }
    },
    deps: ['metro.min']
});


define("app", ["angular"], function (angular) {
    var app = angular.module('bettleTrackApp', []);
    return app;
});
require(["app"], function (app) {
    'use strict';
    app.controller('UsersController', ['$scope', '$http', function ($scope, $http) {
            var self = this;
            $scope.users = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            self.user_btn_create = true;
            self.userInfo = {};
            self.userInfoSubmitted = false;
            self.isEven = function (n) {
                return n % 2 == 0;
            };
            self.isOdd = function (n) {
                return n % 2 != 0;
            };
            self.showUserInfo = function (userId) {
                self.user_btn_create = (userId === 0);
                self.userInfoSubmitted = false;
                var dialog = $('#user-info').data('dialog');
                dialog.open();
            };
            self.closeUserInfo = function () {
                var dialog = $('#user-info').data('dialog');
                dialog.close();
            };
            self.submitUserInfo = function (valid) {
                self.userInfoSubmitted = true;
                if (valid) {

                }
            };
        }]);
});