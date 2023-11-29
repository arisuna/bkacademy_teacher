
(function () {
    'use strict';

    angular
        .module('app.app-directives-media-zone')
        .directive('appMediaItemGrid', appMediaItemGrid);

    appMediaItemGrid.$inject = ['$http', '$window', '$timeout', '$location', 'AppMediaService', 'urlBase', 'WaitingService'];

    function appMediaItemGrid($http, $window, $timeout, $location, AppMediaService, urlBase, WaitingService) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                displayMode: '<?displayMode',
                isSelectable: '<?isSelectable',
                isEditable: '<?isEditable',
                ngSelectClick: '&?ngSelectClick',
                onDelete: '&?onDelete',
                onAddItems: '&?onAddItems',
                isMedia: '<?',
                isAttachment: '<?',
                isEmployee: '<?',
                item: '=item',
                items: '=?items',
                objectUuid: '<objectUuid',
                employeeUuid: '<?',
                companyUuid: '<?',
                object: '=?',
                settingActive: '<?',
                width: '<?',
                isLibrary: '<?',
                attachmentSelect: '&?attachmentSelect',
                isProperty: '<?',
                isProduct: '<?',
                objectType: '<?',
            },
            templateUrl: urlBase.tplBase('base-modules/app-directives-media-zone', 'media-item-grid'),
            link: function (scope, element, attrs) {

                if (angular.isDefined(scope.isMedia) && scope.isMedia == true) {
                    scope.isMedia = true;
                } else {
                    scope.isMedia = false;
                }

                if (angular.isDefined(scope.isAttachment) && scope.isAttachment == true) {
                    scope.isAttachment = true;
                } else {
                    scope.isAttachment = false;
                }

                if (angular.isDefined(scope.isEmployee) && scope.isEmployee == true) {
                    scope.isEmployee = true;
                } else {
                    scope.isEmployee = false;
                }

                if (!angular.isDefined(scope.folders) || scope.folders == undefined) {
                    scope.folders = {};
                }
                if (!angular.isDefined(scope.currentFolder) || scope.currentFolder == undefined) {
                    scope.currentFolder = {};
                }

                if (!angular.isDefined(scope.displayMode) || scope.displayMode == undefined) {
                    scope.displayMode = 'grid';
                }

                if (!angular.isDefined(scope.assigneeFolders) || scope.assigneeFolders == undefined) {
                    scope.assigneeFolders = {};
                }
                if (!angular.isDefined(scope.currentAssigneeFolder) || scope.currentAssigneeFolder == undefined) {
                    scope.currentAssigneeFolder = {};
                }

                if (angular.isUndefined(scope.isShareDocument) || scope.isShareDocument == undefined) {
                    scope.isShareDocument = false;
                }

                if (angular.isUndefined(scope.employeeUuid) || scope.employeeUuid == undefined) {
                    scope.employeeUuid = "";
                }

                if (angular.isUndefined(scope.companyUuid) || scope.companyUuid == undefined) {
                    scope.companyUuid = "";
                }

                if (angular.isUndefined(scope.currentSharedFolder) || scope.currentSharedFolder == undefined) {
                    scope.currentSharedFolder = "";
                }

                if (angular.isUndefined(scope.isLibrary) || scope.isLibrary == undefined) {
                    scope.isLibrary = false;
                }

                if (angular.isUndefined(scope.isProperty) || scope.isProperty == undefined) {
                    scope.isProperty = false;
                }
            },
            controller: 'AppMediaItemController'
        }
    }
})();
