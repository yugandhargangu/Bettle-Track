/* global AjaxHelper, baseUrl, DashBoardView, DashboardInfo, PreLoader, moment, bettleTrackApp, CallBackHelper */

'use strict';

bettleTrackApp.controller("NotificationController", ['$rootScope', function ($rootScope) {
        $rootScope.activeMainMenuItem = 0;
        PreLoader.init();
    }]);
