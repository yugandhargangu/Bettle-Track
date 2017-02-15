/* global AjaxHelper, baseUrl, tinyMCE, PreLoader, bettleTrackApp, CallBackHelper */

'use strict';

var TestPlanUrls = {
    project: {
        method: 'GET',
        url: baseUrl + 'server/projects/projects.json'
    }
};

var tpTnyMceInitCount = 0;

bettleTrackApp.factory('TestPlanService', ['$resource', function ($resource) {
        return $resource('/', {}, {
            query: {
                method: TestPlanUrls.project.method,
                url: TestPlanUrls.project.url,
                isArray: false,
                transformResponse: AjaxHelper.generateResponse
            }
        });
    }]);

// testcase list controller
bettleTrackApp.controller('TestCasesController', ['$rootScope', '$stateParams', '$state', 'TestPlanService',
    function ($rootScope, $stateparams, $state, TestPlanService) {
        $rootScope.activeMainMenuItem = 4;
        var self = this;
        $rootScope.project_id = $stateparams.project_id;
        self.project_name = "Some project name";
        self.modal_display_name = '';
        $state.go('tp_project.testcase', {test_id: 0}, {});
        PreLoader.init();
        self.showAddFolder = function () {

        };
    }]);

// testcase info controller
bettleTrackApp.controller('TestCaseInfoController', ['$rootScope', '$stateParams', '$state', 'TestPlanService',
    function ($rootScope, $stateparams, $state, TestPlanService) {
        var self = this;
        $state.go('tp_project.testcase.details', {}, {});
    }]);

// testcase info controller
bettleTrackApp.controller('TestCaseDetailsController', ['$rootScope', 'TestPlanService', function ($rootScope, TestPlanService) {
        $rootScope.testMenuItemIndex = 1;
        var self = this;
        CallBackHelper.add(function () {
            if (tpTnyMceInitCount > 0) {
                tinyMCE.EditorManager.editors = [];
            }
            tpTnyMceInitCount++;
            tinyMCE.init({
                selector: "#test_desc",
                height: 200,
                menubar: false,
                plugins: [
                    'advlist autolink lists link image charmap print preview anchor table',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table contextmenu paste code'
                ],
                toolbar: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | table'
            });
            tinyMCE.init({
                selector: "#test_comments",
                height: 200,
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

// design steps controller
bettleTrackApp.controller('TestCaseDesignStepsController', ['$rootScope', '$stateParams', '$state', 'TestPlanService',
    function ($rootScope, $stateparams, $state, TestPlanService) {
        $rootScope.testMenuItemIndex = 2;
        var self = this;
    }]);

// params controller
bettleTrackApp.controller('TestCaseParamsController', ['$rootScope', '$stateParams', '$state', 'TestPlanService',
    function ($rootScope, $stateparams, $state, TestPlanService) {
        $rootScope.testMenuItemIndex = 3;
        var self = this;
    }]);

// attachments controller
bettleTrackApp.controller('TestCaseAttachmentsController', ['$rootScope', '$stateParams', '$state', 'TestPlanService',
    function ($rootScope, $stateparams, $state, TestPlanService) {
        $rootScope.testMenuItemIndex = 4;
        var self = this;
    }]);

// requirements controller
bettleTrackApp.controller('TestCaseRequirementsController', ['$rootScope', '$stateParams', '$state', 'TestPlanService',
    function ($rootScope, $stateparams, $state, TestPlanService) {
        $rootScope.testMenuItemIndex = 5;
        var self = this;
    }]);

// issues controller
bettleTrackApp.controller('TestCaseIssuesController', ['$rootScope', '$stateParams', '$state', 'TestPlanService',
    function ($rootScope, $stateparams, $state, TestPlanService) {
        $rootScope.testMenuItemIndex = 6;
        var self = this;
        self.issues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    }]);

// history controller
bettleTrackApp.controller('TestCaseHistoryController', ['$rootScope', '$stateParams', '$state', 'TestPlanService',
    function ($rootScope, $stateparams, $state, TestPlanService) {
        $rootScope.testMenuItemIndex = 7;
        var self = this;
    }]);