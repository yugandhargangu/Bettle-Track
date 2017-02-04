/* global AjaxHelper, baseUrl, DashBoardView, DashboardInfo, PreLoader */

'use strict';

var Urls = {
    dashboards: {
        method: 'GET',
        url: baseUrl + 'server/dashboard/index.json'
    },
    dashboard: {
        method: 'GET',
        url: baseUrl + 'server/dashboard/content.json'
    }
};

var bettleTrackApp = angular.module('bettleTrackApp', ['ngResource']);

bettleTrackApp.factory('DashboardService', function ($resource) {
    return $resource('/', {}, {
        query: {
            method: Urls.dashboards.method,
            url: Urls.dashboards.url,
            isArray: false,
            transformResponse: AjaxHelper.generateResponse
        },
        get: {
            method: Urls.dashboard.method,
            url: Urls.dashboard.url,
            isArray: false,
            transformResponse: AjaxHelper.generateResponse
        }
    });
});

bettleTrackApp.factory('DashboardInfoService', function ($resource) {
    return $resource('/', {}, {
        get: {
            method: Urls.dashboard.method,
            url: Urls.dashboard.url,
            isArray: false,
            transformResponse: AjaxHelper.generateResponse
        }
    });
});

bettleTrackApp.service('CtrlService', function () {
    this.ctrls = {};
    var _self = this;
    return    {
        getCtrl: function (name) {
            return _self.ctrls.name;
        },
        setCtrl: function (name, ctrl) {
            _self.ctrls.name = ctrl;
        }
    };
});

bettleTrackApp.controller('DashboardController', ['$rootScope', '$scope', 'DashboardService', 'CtrlService',
    function ($rootScope, $scope, DashboardService, CtrlService) {
        $rootScope.activeMainMenuItem = 1;
        var self = this;
        CtrlService.setCtrl('view', self);
        self.dashboards = [];
        self.currentDashboard = 0;
        self.deleteDialogStatus = false;
        self.getDashboards = function () {
            DashboardService.query(function (response) {
                self.dashboards = response.data.dashbaords;
                self.loadDashboard(self.dashboards[0]);
                PreLoader.init();
            });
        };
        self.loadDashboard = function (dashboard) {
            self.currentDashboard = dashboard;
            DashboardService.get(function (response) {
                DashBoardView.render(response.data);
            });
        };
        self.createDashboard = function () {
            var infoData = {
                ctrl: CtrlService.getCtrl('info'),
                data: {}
            };
            DashboardInfo.render(infoData);
            $('#dashboard-info').data('dialog').open();
        };
        self.editDashboard = function () {
            var infoData = {
                ctrl: CtrlService.getCtrl('info'),
                data: {}
            };
            DashboardInfo.render(infoData);
            $('#dashboard-info').data('dialog').open();
        };
        self.deleteDashboard = function () {
            confirm('Are you sure? Deleted dashboard can not be recovered!');
        };
        self.getDashboards();
    }]);

bettleTrackApp.controller('DashboardInfoController', ['$scope', 'DashboardInfoService', 'CtrlService',
    function ($scope, DashboardInfoService, CtrlService) {
        var self = this;
        $('#dashboard-content').empty();
        CtrlService.setCtrl('info', self);
        self.defaultTitle = 'Dashboard New Title';
        self.onTitleBlur = function (event) {
            var target = angular.element(event.target);
            if (target.text() === '') {
                target.text(self.defaultTitle);
            }
        };
        self.addSection1 = function () {
            var div = $('<div class="row cell-auto-size" style="width:90%:height:400px;border:1px solid gray;min-height:400px;">Test</div>');
            $(div).appendTo($('#dashboard-content'));
        };
        self.addSection2 = function () {
            alert('add section2');
        };
        self.addSection3 = function () {
            alert('add section3');
        };
        self.addChart = function (count) {
            alert('add chart');
        };
        self.addTable = function (count) {
            alert('add table');
        };
        self.addText = function (count) {
            alert('add text');
        };
    }]);