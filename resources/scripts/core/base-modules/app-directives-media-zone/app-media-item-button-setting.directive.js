/**
 * Created by anmeo on 10/26/16.
 */

(function () {
    'use strict';

    angular
        .module('app.app-directives-media-zone')
        .directive('appMediaItemButtonSetting', appMediaItemButtonSetting);

    appMediaItemButtonSetting.$inject = ['$http', '$window', '$timeout', '$location', 'AppMediaService', 'urlBase', 'WaitingService', '$rootScope', 'AppAuthService'];

    function appMediaItemButtonSetting($http, $window, $timeout, $location, AppMediaService, urlBase, WaitingService, $rootScope, AppAuthService) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                type: '<type',
                isEmployee: '<?',
                isEditable: '<?',
                newUploader: '<newUploader',
                moveMediaItem: '&?moveMediaItem',
                copyMediaItem: '&?copyMediaItem',
                renameMediaItem: '&?renameMediaItem',
                removeMediaItem: '&?removeMediaItem',
                changeMediaStatus: '&?changeMediaStatus',
                isPrivate: '<?isPrivate',
                isAttachment: '<?isAttachment',
                isMedia: '<?isMedia',
                attachmentItem: '=?attachmentItem',
                item: '=?item',
                currentFolder: '=?currentFolder',
                onDelete: '&?onDelete',
                moveAttachmentItem: '&?moveAttachmentItem',
                moveFileOutOfFolder: '&?moveFileOutOfFolder',
                isProperty: '<?',
                setThumb: '&?setThumb',
            },
            link: function (scope, element, attrs) {
                if (angular.isUndefined(scope.isPrivate)){
                    scope.isPrivate = null;
                }

                if (angular.isUndefined(scope.attachmentItem)){
                    scope.attachmentItem = {};
                }

                if (angular.isUndefined(scope.item)){
                    scope.item = {};
                }

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
                if (angular.isUndefined(scope.isProperty) || scope.isProperty == undefined) {
                    scope.isProperty = false;
                }
            },
            templateUrl: urlBase.tplBase('base-modules/app-directives-media-zone', 'media-item-button-setting'),
            controller: function ($scope, $element, $attrs, $timeout){
                $scope.dynamicClass = function(a) {
                    return $scope.type === 'list' ? 'btn btn-round btn-primary btn-outline' : 'text-white mr-sm';
                };

                $scope.currentUser = AppAuthService.getUser();
            }
        }
    }
})();
