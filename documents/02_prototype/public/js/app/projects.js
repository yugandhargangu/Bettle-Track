
requirejs.config({
    baseUrl: '../public/js/',
    paths: {
        jquery: 'jquery-3.1.1.min',
        angular: 'angular.min',
        tinyMCE: 'tinymce.min'
    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        tinyMCE: {
            exports: 'tinyMCE',
            init: function () {
                this.tinyMCE.DOM.events.domLoaded = true;
                return this.tinyMCE;
            }
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
    app.controller('ProjectsController', ['$scope', '$http', function ($scope, $http) {
            var self = this;
            $('#data-preloader').hide();
            self.content_name = 'info';
            self.contentMenuClick = function (content) {
                self.content_name = content;
            };
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

require(['tinyMCE'], function (tinyMCE) {
    tinyMCE.init({
        selector: "#short_desc",
        height: 100,
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
        height: 100,
        menubar: false,
        plugins: [
            'advlist autolink lists link image charmap print preview anchor table',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table contextmenu paste code'
        ],
        toolbar: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | table'
    });
    tinyMCE.init({
        selector: "#m_short_desc",
        height: 100,
        menubar: false,
        plugins: [
            'advlist autolink lists link image charmap print preview anchor table',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table contextmenu paste code'
        ],
        toolbar: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | table'
    });
    tinyMCE.init({
        selector: "#m_long_desc",
        height: 100,
        menubar: false,
        plugins: [
            'advlist autolink lists link image charmap print preview anchor table',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table contextmenu paste code'
        ],
        toolbar: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | table'
    });
});