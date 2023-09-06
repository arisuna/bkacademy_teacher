/**
 * [filter selector directive]
 * @return {[type]}
 */
(function () {
    'use strict';

    angular
        .module('app.app-directives-media-zone')
        .directive('appMediaBtnSetting', appMediaBtnSetting);

    appMediaBtnSetting.$inject = ['Utils', '$window', '$timeout', 'urlBase', 'ngDialog', '$rootScope', 'AppDataService', 'WaitingService'];

    function appMediaBtnSetting(Utils, $window, $timeout, urlBase, ngDialog, $rootScope, AppDataService, WaitingService) {
        var directive = {
            restrict: 'E',
            replace: true,
            scope: {
                name: '@?',
                position: '@?',
                type: '<type',
                isEmployee: '<?',
                isEditable: '<?',
                newUploader: '<newUploader',
                isPrivate: '<?isPrivate',
                isAttachment: '<?isAttachment',
                isMedia: '<?isMedia',
                attachmentItem: '=?attachmentItem',
                item: '=?item',
                currentFolder: '=?currentFolder',
                moveMediaItem: '&?moveMediaItem',
                copyMediaItem: '&?copyMediaItem',
                renameMediaItem: '&?renameMediaItem',
                changeMediaStatus: '&?changeMediaStatus',
                removeMediaItem: '&?removeMediaItem',
                moveAttachmentItem: '&?moveAttachmentItem',
                moveFileOutOfFolder: '&?moveFileOutOfFolder',

            },
            templateUrl: urlBase.tplBase('base-modules/app-directives-media-zone', 'btn-three-dot'),
            link: function (scope, element, attrs) {
                if (angular.isUndefined(scope.dropdownSize) || scope.dropdownSize == '') {
                    scope.dropdownSize = 'medium';
                }
                if (angular.isUndefined(scope.options)) {
                    scope.options = [];
                }

                if (angular.isUndefined(scope.isRight)) {
                    scope.isRight = false;
                }
            },
            controller: function ($scope, $element, $attrs) {

                $scope.dynamicClass = function(a) {
                    return $scope.type === 'list' ? 'btn btn-round btn-primary btn-outline' : 'text-white mr-sm';
                };

                $scope.openSearchDialog = function ($event) {

                    let element = $event.currentTarget;
                    let dialogPosition = Utils.getPositionDropdownDialog($event, 158, 35, 35, 20);

                    let searchDialog = ngDialog.open({
                        template: urlBase.tplBase('base-modules/app-directives-media-zone', 'btn-setting.dialog'),
                        className: 'ngdialog-custom-position-2 custom-bottom no-background',
                        showClose: false,
                        closeByDocument: true,
                        disableAnimation: true,
                        data: {
                            dialog: dialogPosition,
                            isEmployee: $scope.isEmployee,
                            isEditable: $scope.isEditable,
                            newUploader: $scope.newUploader,
                            isPrivate: $scope.isPrivate,
                            isAttachment: $scope.isAttachment,
                            isMedia: $scope.isMedia,
                            attachmentItem: $scope.attachmentItem,
                            item: $scope.item,
                            currentFolder: $scope.currentFolder,
                        },
                        resolve: {
                        },
                        controller: ['$scope', '$element', '$rootScope', 'AppDataService', 'AppSystem', 'Utils', 'AppAuthService', function ($scope, $element, $rootScope, AppDataService, AppSystem, Utils, AppAuthService) {

                            Utils.setPositionDropdownDialog(dialogPosition);
                            $scope.isEmployee = $scope.ngDialogData.isEmployee;
                            $scope.isEditable = $scope.ngDialogData.isEditable;
                            $scope.newUploader = $scope.ngDialogData.newUploader;
                            $scope.isPrivate = $scope.ngDialogData.isPrivate;
                            $scope.isAttachment = $scope.ngDialogData.isAttachment;
                            $scope.isMedia = $scope.ngDialogData.isMedia;
                            $scope.item = $scope.ngDialogData.item;
                            $scope.attachmentItem = $scope.ngDialogData.attachmentItem;
                            $scope.currentFolder = $scope.ngDialogData.currentFolder;
                            $scope.currentUser = AppAuthService.getUser();
                        }]
                    });

                    searchDialog.closePromise.then(function (returnData) {
                        console.log('returnData', returnData);
                        if (angular.isDefined(returnData) && angular.isDefined(returnData.value)){
                            switch (returnData.value.type){
                                case 1:
                                    //Rename media
                                    if (angular.isFunction($scope.renameMediaItem)){
                                        $scope.renameMediaItem();
                                    }
                                    break;
                                case 2:
                                    //Move media
                                    if (angular.isFunction($scope.moveMediaItem)){
                                        $scope.moveMediaItem();
                                    }
                                    break;
                                case 3:
                                    //Copy media
                                    if (angular.isFunction($scope.copyMediaItem())){
                                        $scope.copyMediaItem();
                                    }
                                    break;
                                case 4:
                                    //Change media status
                                    if (angular.isFunction($scope.changeMediaStatus)){
                                        $scope.changeMediaStatus();
                                    }
                                    break;
                                case 5:
                                    //Remove Media
                                    if (angular.isFunction($scope.removeMediaItem)){
                                        $scope.removeMediaItem();
                                    }
                                    break;
                                case 6:
                                    //Move Attachment to Folder
                                    if (angular.isFunction($scope.moveAttachmentItem)){
                                        $scope.moveAttachmentItem();
                                    }
                                    break;
                                case 7:
                                    //Move Attachment out of folder
                                    if (angular.isFunction($scope.moveFileOutOfFolder)){
                                        $scope.moveFileOutOfFolder();
                                    }
                                    break;
                            }
                        }
                    })
                };

            }
        };

        return directive;
    }

})();
