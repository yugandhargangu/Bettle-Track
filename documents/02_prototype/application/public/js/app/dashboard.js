/* global AjaxHelper, baseUrl, DashBoardView, DashboardInfo, PreLoader, bettleTrackApp, CallBackHelper */

'use strict';

var DashboardUrls = {
    dashboards: {
        method: 'GET',
        url: baseUrl + 'server/dashboard/index.json'
    },
    dashboard: {
        method: 'GET',
        url: baseUrl + 'server/dashboard/content.json'
    }
};

bettleTrackApp.factory('DashboardService', function ($resource) {
    return $resource('/', {}, {
        query: {
            method: DashboardUrls.dashboards.method,
            url: DashboardUrls.dashboards.url,
            isArray: false,
            transformResponse: AjaxHelper.generateResponse
        },
        get: {
            method: DashboardUrls.dashboard.method,
            url: DashboardUrls.dashboard.url,
            isArray: false,
            transformResponse: AjaxHelper.generateResponse
        }
    });
});

bettleTrackApp.factory('DashboardInfoService', function ($resource) {
    return $resource('/', {}, {
        get: {
            method: DashboardUrls.dashboard.method,
            url: DashboardUrls.dashboard.url,
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

bettleTrackApp.controller('DashboardController', ['$rootScope', '$scope', '$state', 'DashboardService', 'CtrlService',
    function ($rootScope, $scope, $state, DashboardService, CtrlService) {
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
        self.editDashboard = function () {
            $state.go('dashboard_info', {dashboard_id: 1}, {});
        };
        self.deleteDashboard = function () {
            confirm('Are you sure? Deleted dashboard can not be recovered!');
        };
        self.getDashboards();
    }]);

bettleTrackApp.controller('DashboardInfoController', ['$rootScope', '$scope', 'DashboardInfoService', 'CtrlService',
    function ($rootScope, $scope, DashboardInfoService, CtrlService) {
        $rootScope.activeMainMenuItem = 1;
        PreLoader.init();
        var self = this;
        CallBackHelper.add(function () {
            $('#dashboard-content').empty();
            var infoData = {
                ctrl: CtrlService.getCtrl('info'),
                data: {}
            };
            DashboardInfo.render(infoData);
        });

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