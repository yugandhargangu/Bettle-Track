/* global AjaxHelper, baseUrl, DashBoardView, DashboardInfo, PreLoader, CallBackHelper, bettleTrackApp */

'use strict';

bettleTrackApp.controller("ProfileController", ['$rootScope', function ($rootScope) {
        PreLoader.init();
        $rootScope.activeMainMenuItem = 0;
    }]);
