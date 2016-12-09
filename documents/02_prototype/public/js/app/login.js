requirejs.config({
    baseUrl: 'public/js/',
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

require(['jquery'], function () {
    $(function () {
        $(".login-form").css({
            opacity: 1,
            "-webkit-transform": "scale(1)",
            "transform": "scale(1)",
            "-webkit-transition": ".5s",
            "transition": ".5s"
        });
    });
});

define("app", ["angular"], function (angular) {
    var app = angular.module('bettleTrackApp', []);
    return app;
});

require(["app"], function (app) {
    'use strict';
    app.controller('LoginController', ['$scope', '$http', function ($scope, $http) {
            var self = this;
            self.alreadySubmit = false;
            self.login = {};
            self.submit = function (loginForm) {
                self.alreadySubmit = true;
                if (loginForm.$valid) {
                    $http.get('server/login.html',
                            {
                                params: self.login
                            }
                    ).then(function (success) {
                        var data = success.data;
                        if (data.code == 1) {
                            var dialog = $('#success-dialog').data('dialog');
                            dialog.open();
                            window.location.href = 'app/admin/index.html';
                        } else {
                            var dialog = $('#error-dialog').data('dialog');
                            dialog.open();
                        }
                    }, function (error) {
                        var dialog = $('#error-dialog').data('dialog');
                        dialog.open();
                    });
                }
            };
        }]);
});