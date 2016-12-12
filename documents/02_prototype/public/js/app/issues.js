
requirejs.config({
    baseUrl: '../public/js/',
    paths: {
        jquery: 'jquery-3.1.1.min',
        angular: 'angular.min',
        select2: 'select2.full.min',
        tinyMCE: 'tinymce.min'
    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        'select2': {
            deps: ['jquery']
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

require(['jquery', 'select2'], function () {
    $(function () {
        $('#project-select').select2({
            placeholder: 'All'
        });
        $('#module-select').select2({
            placeholder: 'All'
        });
        $('#category-select').select2({
            placeholder: 'All'
        });
        $('#tags-select').select2({
            placeholder: 'All'
        });
        $('#type-select').select2({
            placeholder: 'All'
        });
        $('#priority-select').select2({
            placeholder: 'All'
        });
        $('#state-select').select2({
            placeholder: 'All'
        });
        $('#resolution-select').select2({
            placeholder: 'All'
        });
        $('#tags-issue-select').select2({
            placeholder: 'None'
        });
        $('#category-issue-select').select2({
            placeholder: 'None'
        });
    });
});

define("app", ["angular"], function (angular) {
    var app = angular.module('bettleTrackApp', []);
    return app;
});
require(["app"], function (app) {
    'use strict';
    app.controller('IssuesController', ['$scope', '$http', function ($scope, $http) {
            var self = this;
            self.issueview = 'list';
            $('#data-preloader').hide();
            $scope.issues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            self.issue_btn_create = true;
            self.userInfo = {};
            self.issueInfoSubmitted = false;
            self.setIssueView = function (view) {
                self.issueview = view;
            };
            self.openFiltersDialog = function () {
                $('#filters-dialog').data('dialog').open();
            };
            self.isEven = function (n) {
                return n % 2 == 0;
            };
            self.isOdd = function (n) {
                return n % 2 != 0;
            };
            self.showIssueInfo = function (issueId) {
                self.issue_btn_create = (issueId === 0);
                self.issueInfoSubmitted = false;
                var dialog = $('#issue-info').data('dialog');
                dialog.open();
            };
            self.submitIssueInfo = function (valid) {
                self.issueInfoSubmitted = true;
                if (valid) {

                }
            };
        }]);
});

require(['tinyMCE'], function (tinyMCE) {
    tinyMCE.init({
        selector: "#issue-enviroment",
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
        selector: "#issue-procedure",
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
        selector: "#issue-desc",
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
        selector: "#info-environment",
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
        selector: "#info-procedure",
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
        selector: "#info-desc",
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