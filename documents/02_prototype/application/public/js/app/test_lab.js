/* global AjaxHelper, baseUrl, tinyMCE, PreLoader, bettleTrackApp, CallBackHelper */

'use strict';

var TestLabUrls = {
    project: {
        method: 'GET',
        url: baseUrl + 'server/projects/projects.json'
    }
};

var tlTinyMceInitCount = 0;

bettleTrackApp.factory('TestLabService', ['$resource', function ($resource) {
        return $resource('/', {}, {
            query: {
                method: TestLabUrls.project.method,
                url: TestLabUrls.project.url,
                isArray: false,
                transformResponse: AjaxHelper.generateResponse
            }
        });
    }]);

// testcase list controller
bettleTrackApp.controller('TestSetsController', ['$rootScope', '$stateParams', '$state', 'TestLabService',
    function ($rootScope, $stateparams, $state, TestLabService) {
        $rootScope.activeMainMenuItem = 4;
        var self = this;
        $rootScope.project_id = $stateparams.project_id;
        self.project_name = "Some project name";
        self.modal_display_name = '';
        $state.go('tl_project.testset', {test_id: 0}, {});
        self.showAddFolder = function () {

        };
        PreLoader.init();
    }]);

// testcase info controller
bettleTrackApp.controller('TestSetInfoController', ['$rootScope', '$stateParams', '$state', 'TestLabService',
    function ($rootScope, $stateparams, $state, TestLabService) {
        var self = this;
        $state.go('tl_project.testset.details', {}, {});
    }]);

// testcase info controller
bettleTrackApp.controller('TestSetDetailsController', ['$rootScope', 'TestLabService', function ($rootScope, TestLabService) {
        $rootScope.testMenuItemIndex = 1;
        var self = this;
        CallBackHelper.add(function () {
            if (tlTinyMceInitCount > 0) {
                tinyMCE.EditorManager.editors = [];
            }
            tlTinyMceInitCount++;
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
bettleTrackApp.controller('TestSetExecutionController', ['$rootScope', '$stateParams', '$state', 'TestLabService',
    function ($rootScope, $stateparams, $state, TestLabService) {
        $rootScope.testMenuItemIndex = 2;
        var self = this;
    }]);

// attachments controller
bettleTrackApp.controller('TestSetAttachmentsController', ['$rootScope', '$stateParams', '$state', 'TestLabService',
    function ($rootScope, $stateparams, $state, TestLabService) {
        $rootScope.testMenuItemIndex = 3;
        var self = this;
    }]);

// issues controller
bettleTrackApp.controller('TestSetIssuesController', ['$rootScope', '$stateParams', '$state', 'TestLabService',
    function ($rootScope, $stateparams, $state, TestLabService) {
        $rootScope.testMenuItemIndex = 4;
        var self = this;
        self.issues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    }]);

// history controller
bettleTrackApp.controller('TestSetHistoryController', ['$rootScope', '$stateParams', '$state', 'TestLabService',
    function ($rootScope, $stateparams, $state, ProjectService) {
        $rootScope.testMenuItemIndex = 5;
        var self = this;
    }]);