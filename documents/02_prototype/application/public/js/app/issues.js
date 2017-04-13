/* global AjaxHelper, baseUrl, tinyMCE, PreLoader, bettleTrackApp, CallBackHelper */

'use strict';

var IssueUrls = {
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

var issueTinyMceInitCount = {
    viewType: 0,
    issueInfo: 0
};

bettleTrackApp.factory('FilterService', ['$resource', function ($resource) {
        return $resource("/", {}, {
            query: {
                method: IssueUrls.filters.method,
                url: IssueUrls.filters.url,
                isArray: false,
                transformResponse: AjaxHelper.generateResponse
            }
        });
    }]);

bettleTrackApp.service('SearchService', function () {
    // Between search and view controller
    this.type = 'search'; // search, project, common, filter
});

bettleTrackApp.controller('FilterController', ['$rootScope', '$stateParams', '$state', 'SearchService',
    function ($rootScope, $stateParams, $state, SearchService) {
        $rootScope.activeMainMenuItem = 5;
        var self = this;
        self.filter_type = '';
        self.filter_name = '';
        if ($stateParams.type === 'p') {
            self.filter_type = 'Project';
            self.filter_name = 'Selected Project Name';
            $rootScope.sidebarCode = 'project';
            $rootScope.sidebarId = $stateParams.id;
        } else if ($stateParams.type === 'c') {
            self.filter_type = 'Common Filter';
            self.filter_name = 'Selected Filter name';
            $rootScope.sidebarCode = 'common';
            $rootScope.sidebarId = $stateParams.id;
        } else if ($stateParams.type === 'f') {
            self.filter_type = 'Filter';
            self.filter_name = 'Selected Filter name';
            $rootScope.sidebarCode = 'filter';
            $rootScope.sidebarId = $stateParams.id;
        } else {
            self.filter_type = 'Search';
            self.filter_name = '';
            $rootScope.sidebarCode = 'search';

        }
        if ($state.current.name === 'filter.detailview') {
            $rootScope.detail_view = true;
        }
        if ($rootScope.detail_view) {
            $state.go('filter.detailview', {}, {});
        } else {
            $state.go('filter.listview', {}, {});
        }
        PreLoader.init();
    }]);

bettleTrackApp.controller('IssueInfoController', ['$rootScope', '$stateParams', '$state', 'SearchService',
    function ($rootScope, $stateParams, $state, SearchService) {
        $rootScope.activeMainMenuItem = 5;
        var self = this;
        $rootScope.sidebarCode = 'new_issue';
        self.issueinfo = {};
        if (issueTinyMceInitCount.issueInfo > 0) {
            tinyMCE.EditorManager.editors = [];
        }
        issueTinyMceInitCount.issueInfo++;
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
        PreLoader.init();
    }]);

bettleTrackApp.controller('FiltersController', ['$rootScope', '$stateParams', '$state', 'FilterService',
    function ($rootScope, $stateParams, $state, FilterService) {
        $rootScope.activeMainMenuItem = 5;
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
            if (self.changeFilterId === '4') {
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
        PreLoader.init();
    }]);

bettleTrackApp.controller('ViewTypeController', ['$rootScope', '$stateParams', '$state', 'SearchService',
    function ($rootScope, $stateParams, $state, SearchService) {
        var self = this;
        if ($state.current.url === '/details') {
            $rootScope.detail_view = true;
            if (issueTinyMceInitCount.viewType > 0) {
                tinyMCE.EditorManager.editors = [];
            }
            issueTinyMceInitCount.viewType++;
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