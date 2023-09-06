/**
 * Created by anmeo on 10/26/16.
 */

(function () {
    'use strict';

    angular
        .module('app.app-directives-media-zone')
        .directive('appMediaItem', appMediaItem);

    appMediaItem.$inject = ['$http', '$window', '$timeout', '$location', 'AppMediaService', 'urlBase', 'WaitingService', 'AppAuthService'];

    function appMediaItem($http, $window, $timeout, $location, AppMediaService, urlBase, WaitingService, AppAuthService) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                displayMode: '<?displayMode',
                isSelectable: '<?isSelectable',
                isEditable: '<?isEditable',
                ngSelectClick: '&?ngSelectClick',
                onDelete: '&?onDelete',
                isMedia: '<?',
                isAttachment: '<?',
                item: '=item',
                items: '=?items',
                objectUuid: '<objectUuid',
            },

            templateUrl: urlBase.tplBase('base-modules/app-directives-media-zone', 'media-item'),
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

            },
            controller: function ($scope, $element, $attrs) {

                $scope.downloadItem = function (item) {
                    $window.location.href = item.image_data.url_download;
                };

                $scope.selectItemFn = function () {
                    if (angular.isFunction($scope.ngSelectClick)) {
                        $scope.ngSelectClick();
                    }
                };

                $scope.currentUser = AppAuthService.getUser();
                $scope.currentCompany = AppAuthService.getCompany();

                $scope.removeAttachmentItem = function (itemMediaUuid) {
                    console.log('removeAttachmentItem', itemMediaUuid);
                    WaitingService.questionSimple('QUESTION_DELETE_DOCUMENT_TEXT', function () {
                        $scope.$apply();
                        if ($scope.objectUuid && $scope.objectUuid != "") {
                            AppMediaService.removeAttachment({
                                'object_uuid': $scope.objectUuid,
                                'media_uuid': itemMediaUuid,
                            }).then(function (res) {
                                if (res.success) {
                                    WaitingService.popSuccess('DOCUMENT_DELETE_SUCCESS_TEXT');
                                    $scope.onDelete();
                                } else {
                                    WaitingService.error(res.message);
                                }
                            }).catch(function (err) {
                                WaitingService.error(err.message);
                            });
                        } else {
                            $scope.$evalAsync(function () {
                                if (angular.isFunction($scope.onDelete)) {
                                    $scope.onDelete();
                                }
                            });
                            WaitingService.end();
                        }

                    });
                };

                $scope.removeMediaItem = function (itemMediaUuid) {
                    WaitingService.questionSimple('QUESTION_DELETE_DOCUMENT_TEXT', function () {
                        $scope.$apply();
                        if (itemMediaUuid && itemMediaUuid != "") {
                            AppMediaService.removeMedia(itemMediaUuid).then(function (res) {
                                if (res.success) {
                                    WaitingService.popSuccess('DOCUMENT_DELETE_SUCCESS_TEXT');
                                    if (angular.isFunction($scope.onDelete)) {
                                        $scope.onDelete();
                                    }
                                } else {
                                    WaitingService.error(res.message);
                                }
                            }).catch(function (err) {
                                WaitingService.error(err.message);
                            });
                        } else {
                            if (angular.isFunction($scope.onDelete)) {
                                $scope.onDelete();
                            }
                            WaitingService.end();
                        }
                    });
                };

                $scope.renameMediaItem = function (item) {
                    WaitingService.questionWithInputText('', 'YOUR_FILE_NAME_TEXT', $scope.item.name, function (inputValue) {
                        $scope.$apply();
                        if (item && item.uuid != "") {
                            AppMediaService.renameMedia({uuid: item.uuid, name: inputValue}).then(function (res) {
                                if (res.success) {
                                    WaitingService.popSuccess('DOCUMENT_RENAME_SUCCESS_TEXT');
                                    $scope.$evalAsync(function () {
                                        $scope.item = res.data;
                                        $scope.selectItemFn();
                                    });
                                } else {
                                    WaitingService.error(res.message);
                                }
                            }).catch(function (err) {
                                WaitingService.error(err.message);
                            });
                        } else {
                            WaitingService.end();
                        }
                    });
                };

            }
        }
    }
})();
