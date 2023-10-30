/**
 * Created by anmeo on 10/26/16.
 */

(function () {
    'use strict';

    angular
        .module('app.app-directives-media-zone')
        .directive('appMediaLibraryModal', appMediaLibraryModal);

    appMediaLibraryModal.$inject = ['$http', '$localStorage', '$timeout', 'ngDialog', 'toaster', 'urlBase', '$filter', 'WaitingService'];

    function appMediaLibraryModal($http, $localStorage, $timeout, ngDialog, toaster, urlBase, $filter, WaitingService) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                options: '=libraryOptions',
                onSelectItem: '&onSelectItem',
                objectUuid: '<?',
                companyUuid: '<?',
                object: '=?',
                objectType: '@?',
                isAttachAttachment: '<?',
            },
            templateUrl: urlBase.tplBase('base-modules/app-directives-media-zone', 'media-library-modal'),
            link: function (scope, element, attrs) {
                /**
                 * Define options
                 */
                if (angular.isUndefined(attrs.libraryOptions)) {
                    scope.options = {
                        multiSelect: true,
                    };
                }

                if (angular.isUndefined(scope.options)) {
                    scope.options = {
                        multiSelect: true,
                    };
                }
                if (angular.isUndefined(scope.objectUuid) || scope.objectUuid == undefined) {
                    scope.objectUuid = "";
                }

                if (angular.isUndefined(scope.companyUuid) || scope.companyUuid == undefined) {
                    scope.companyUuid = "";
                }

                if (angular.isUndefined(scope.object) || scope.object == undefined) {
                    scope.object = {};
                }

                if (angular.isUndefined(scope.objectType) || scope.objectType == undefined) {
                    scope.objectType = '';
                }

                if (angular.isUndefined(scope.isAttachAttachment) || scope.isAttachAttachment == undefined) {
                    scope.isAttachAttachment = false;
                }


                scope.fileType = [];

                var fileType = [
                    {name: 'Image', value: 'image'},
                    {name: 'Document', value: 'document'},
                    {name: 'Audio', value: 'audio'},
                    {name: 'Video', value: 'video'},
                    {name: 'Compressed', value: 'compressed'},
                    {name: 'Other', value: 'other'}
                ];


                var fileFilter = 'all';


            },
            controller: 'AppMediaLibraryController',
        }
    }
})();
