/* global AjaxHelper, baseUrl, tinyMCE */

'use strict';

var Urls = {
    sidebar: {
        method: "GET",
        url: baseUrl + "server/issues/sidebar.json"
    },
    filters: {
        method: "GET",
        url: baseUrl + "server/issues/filters.json"
    },
    issues: {
        method: "GET",
        url: ""
    }
};

var CallBackHelper = {
    callbacks: []
};
CallBackHelper.add = function (callback) {
    this.callbacks.push(callback);
};

var tinyMceInitCount = {
    viewType: 0,
    issueInfo: 0
};

var bettleTrackApp = angular.module('bettleTrackApp', ['ngResource', 'ui.router']);

bettleTrackApp.factory('SidebarService', ['$resource', function ($resource) {
        return $resource("/", {}, {
            query: {
                method: Urls.sidebar.method,
                url: Urls.sidebar.url,
                isArray: false,
                transformResponse: AjaxHelper.generateResponse
            }
        });
    }]);

bettleTrackApp.factory('FilterService', ['$resource', function ($resource) {
        return $resource("/", {}, {
            query: {
                method: Urls.filters.method,
                url: Urls.filters.url,
                isArray: false,
                transformResponse: AjaxHelper.generateResponse
            }
        });
    }]);

bettleTrackApp.service('SearchService', function () {
    // Between search and view controller
    this.type = 'search'; // search, project, common, filter
});

// sidebar controller
bettleTrackApp.controller('SidebarController', ['$rootScope', '$scope', 'SidebarService', function ($rootScope, $scope, SidebarService) {
        var self = this;
        $rootScope.sidebarCode = '';
        $rootScope.sidebarId = 0;
        $rootScope.detail_view = false;
        self.projects = [];
        self.filters = [];
        SidebarService.query({}, function (response) {
            self.projects = response.data.projects;
            self.filters = response.data.filters;
        });
    }]);

bettleTrackApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/filter//');
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

bettleTrackApp.controller('FilterController', ['$rootScope', '$stateParams', '$state', 'SearchService',
    function ($rootScope, $stateParams, $state, SearchService) {
        var self = this;
        self.filter_type = '';
        self.filter_name = '';
        if ($stateParams.type == 'p') {
            self.filter_type = 'Project';
            self.filter_name = 'Selected Project Name';
            $rootScope.sidebarCode = 'project';
            $rootScope.sidebarId = $stateParams.id;
        } else if ($stateParams.type == 'c') {
            self.filter_type = 'Common Filter';
            self.filter_name = 'Selected Filter name';
            $rootScope.sidebarCode = 'common';
            $rootScope.sidebarId = $stateParams.id;
        } else if ($stateParams.type == 'f') {
            self.filter_type = 'Filter';
            self.filter_name = 'Selected Filter name';
            $rootScope.sidebarCode = 'filter';
            $rootScope.sidebarId = $stateParams.id;
        } else {
            self.filter_type = 'Search';
            self.filter_name = '';
            $rootScope.sidebarCode = 'search';

        }
        if ($state.current.name == 'filter.detailview') {
            $rootScope.detail_view = true;
        }
        if ($rootScope.detail_view) {
            $state.go('filter.detailview', {}, {});
        } else {
            $state.go('filter.listview', {}, {});
        }
    }]);

bettleTrackApp.controller('IssueInfoController', ['$rootScope', '$stateParams', '$state', 'SearchService',
    function ($rootScope, $stateParams, $state, SearchService) {
        var self = this;
        $rootScope.sidebarCode = 'new_issue';
        self.issueinfo = {};
        if (tinyMceInitCount.issueInfo > 0) {
            tinyMCE.EditorManager.editors = [];
        }
        tinyMceInitCount.issueInfo++;
        CallBackHelper.add(function () {
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
    }]);

bettleTrackApp.controller('FiltersController', ['$rootScope', '$stateParams', '$state', 'FilterService',
    function ($rootScope, $stateParams, $state, FilterService) {
        $rootScope.sidebarCode = "all_filter";
        var self = this;
        self.alreadyInitialized = false;
        self.showSearch = false;
        self.filters = [];
        self.changeFilterId = '0';
        FilterService.query({}, function (response) {
            self.filters = response.data.filters;
        });
        self.changeFilterType = function () {
            if (self.changeFilterId == '4') {
                self.showSearch = true;
                if (!self.alreadyInitialized) {
                    $('#filter_owner_select').select2({
                        placeholder: 'None'
                    });
                    $('#filter_share_select').select2({
                        placeholder: 'None'
                    });
                    self.alreadyInitialized = true;
                }
            } else {
                self.showSearch = false;
            }
        };
        self.showFilterEdit = function (filter_id) {
            $('#share_type').select2();
            $('#share_with').select2({
                placeholder: 'None'
            });
            tinyMCE.init({
                selector: "#filter_desc",
                height: 200,
                menubar: false,
                plugins: [
                    'advlist autolink lists link image charmap print preview anchor table',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table contextmenu paste code'
                ],
                toolbar: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | table'
            });
            $('#filter-edit-window').data('dialog').open();
        };
    }]);

bettleTrackApp.controller('ViewTypeController', ['$rootScope', '$stateParams', '$state', 'SearchService',
    function ($rootScope, $stateParams, $state, SearchService) {
        var self = this;
        if ($state.current.url == '/details') {
            $rootScope.detail_view = true;
            if (tinyMceInitCount.viewType > 0) {
                tinyMCE.EditorManager.editors = [];
            }
            tinyMceInitCount.viewType++;
            CallBackHelper.add(function () {
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
            });
        } else {
            $rootScope.detail_view = false;
            self.issues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        }
    }]);