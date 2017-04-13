/* global AjaxHelper, baseUrl, DashBoardView, DashboardInfo, PreLoader, moment, bettleTrackApp, CallBackHelper */

'use strict';

bettleTrackApp.controller("InboxController", ['$rootScope', function ($rootScope) {
        $rootScope.activeMainMenuItem = 0;        
        PreLoader.init();
    }]);
