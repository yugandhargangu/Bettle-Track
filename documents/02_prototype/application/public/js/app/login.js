/* global baseUrl, AjaxHelper */

'use strict';

$(function () {
    $(".login-form").css({
        opacity: 1,
        "-webkit-transform": "scale(1)",
        "transform": "scale(1)",
        "-webkit-transition": ".5s",
        "transition": ".5s"
    });
});

var Urls = {
    login: {
        method: 'GET',
        url: baseUrl + 'server/index.html'
    }
};

var bettleTrackApp = angular.module('bettleTrackApp', ['ngResource']);

bettleTrackApp.factory('LoginService', function ($resource) {
    return $resource('/', {}, {
        query: {
            method: Urls.login.method,
            url: Urls.login.url,
            isArray: false,
            transformResponse: AjaxHelper.generateResponse
        }
    });
});

bettleTrackApp.controller('LoginController', ['$scope', 'LoginService', function ($scope, LoginService) {
        var self = this;
        $('#data-preloader').hide();
        self.alreadySubmit = false;
        self.login = {};
        self.submit = function (loginForm) {
            self.alreadySubmit = true;
            if (loginForm.$valid) {
                LoginService.query({}, function (response) {
                    var data = response.data;
                    if (data.code === 1) {
                        var dialog = $('#success-dialog').data('dialog');
                        dialog.open();
                        window.location.href = 'app/index.html';
                    } else {
                        var dialog = $('#error-dialog').data('dialog');
                        dialog.open();
                    }
                });
            }
        };
    }]);