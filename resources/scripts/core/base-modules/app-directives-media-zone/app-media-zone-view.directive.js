(function () {
    'use strict';

    angular
        .module('app.app-directives-media-zone')
        .directive('appMediaZoneView', appMediaZoneView);

    appMediaZoneView.$inject = ['FileUploader', '$http', '$localStorage', '$timeout', 'ngDialog', 'toaster', 'urlBase', '$translate', '$rootScope', '$location', '$window', 'AppMediaService', 'WaitingService'];

    function appMediaZoneView(FileUploader, $http, $localStorage, $timeout, ngDialog, toaster, urlBase, $translate, $rootScope, $location, $window,
                              AppMediaService, WaitingService) {
        var directive = {
            restrict: 'E',
            replace: true,
            scope: {
                options: '=?options',
                libraryOptions: '<?libraryOptions',
                onSelectItem: '&?onSelectItem',
                onAddItem: '&?onAddItem',
                objectShared: '@?',
                items: '=?',
                uuid: '<',

                buttonText: '@?',
                objectType: '@?',
                showLabel: '<?',
                showNoDataAvailable: '<?'
            },

            templateUrl: urlBase.tplBase('base-modules/app-directives-media-zone', 'media-zone-view', '_=' + Math.random()),
            link: function (scope, element, attrs, translate) {

                scope.isLoading = true;

                if (angular.isUndefined(scope.items)) {
                    scope.items = [];
                }

                if (angular.isUndefined(scope.showLabel) || scope.showLabel == true) {
                    scope.showLabel = true;
                } else {
                    scope.showLabel = false;
                }

                if (angular.isUndefined(scope.showNoDataAvailable) || scope.showNoDataAvailable == true) {
                    scope.showNoDataAvailable = true;
                } else {
                    scope.showNoDataAvailable = false;
                }

                if (angular.isUndefined(scope.options) || scope.options == undefined) {
                    scope.options = {limit: 5}
                }

                if (angular.isUndefined(scope.options.limit)) {
                    scope.options.limit = 5;
                }
                scope.libraryOpts = scope.libraryOptions;

                if (angular.isUndefined(scope.options.isGrid)) {
                    scope.options.isGrid = true;
                }
                if (angular.isUndefined(scope.options.isList)) {
                    scope.options.isList = false;
                }

                if (angular.isUndefined(scope.objectShared) || scope.objectShared == "false") {
                    scope.objectShared = false;
                } else if (scope.objectShared == "true") {
                    scope.objectShared = true;
                } else {
                    scope.objectShared = null;
                }


                $timeout(function () {
                    var uploadBtn = $(':file', element);
                    angular.forEach(uploadBtn, function (value, key) {
                        var default_text = $(value).filestyle('buttonText');
                        $(value).filestyle('buttonText', $translate.instant(default_text));
                        $rootScope.$on('$translateChangeSuccess', function () {
                            $(value).filestyle('buttonText', $translate.instant(default_text));
                        });
                    });
                }, 0);
            },

            controller: function ($scope, $element, $attrs, $translate, $location, $window) {

                if (angular.isUndefined($scope.options) || $scope.options == undefined) {
                    $scope.options = {limit: 5}
                }

                $scope.isLoading = true;

                let allTypes = AppMediaService.getFileTypeList();

                if (angular.isUndefined($scope.items) || $scope.items == '') {
                    $scope.items = [];
                }

                if (typeof $scope.items === "object") {
                    $scope.items = [];
                }

                $scope.getSharedValue = function () {
                    if (angular.isUndefined($scope.objectShared) || $scope.objectShared == "false") {
                        $scope.objectShared = false;
                        return false;
                    } else if ($scope.objectShared == "true") {
                        $scope.objectShared = true;
                        return true;
                    } else if ($scope.objectShared === true || $scope.objectShared === false) {
                        return $scope.objectShared;
                    } else {
                        $scope.objectShared = null;
                        return null;
                    }
                }

                $scope.getFileList = function () {
                    $scope.isLoading = true;
                    AppMediaService.getAttachments({
                        uuid: $scope.uuid,
                        shared: $scope.getSharedValue()
                    }).then(function (res) {
                        $scope.isLoading = false;
                        if (res.success == true) {
                            $scope.items = res.data
                        }
                    }, function () {
                        $scope.isLoading = true;
                    });
                }

                $scope.$watch('uuid', function () {
                    if ($scope.uuid != undefined && $scope.uuid != '') {
                        $scope.getFileList();
                    }
                })


                /**
                 * add item
                 * @param items
                 */
                $scope.addItem = function (items) {
                    if (items.length > 0) {
                        if (angular.isUndefined($scope.items) || angular.isArray($scope.items) == false) {
                            $scope.items = [];
                        }
                        angular.forEach(items, function (item, key) {
                            if ($scope.items.map(function (e) {
                                return e.id;
                            }).indexOf(item.id) < 0) {
                                $scope.items.push(item);
                                if (!angular.isUndefined($scope.onAddItem)) {
                                    $scope.onAddItem({item: item});
                                }
                            }
                        });
                    }


                    if (!angular.isUndefined($scope.uuid) && $scope.uuid != '') {
                        AppMediaService.attachMultipleFiles({
                            uuid: $scope.uuid,
                            attachments: items,
                            shared: $scope.objectShared,
                            type: !angular.isUndefined($scope.objectType) && $scope.objectType != '' ? $scope.objectType : null
                        }).then(function (res) {
                            if (!res.success) {
                                WaitingService.popError(res.message);
                            }
                        }, function (err) {
                            WaitingService.popExpire(err);
                        })
                    }
                };

                $scope.translateButton = function () {
                    $timeout(function () {
                        var uploadBtn = $(':file', $element);
                        angular.forEach(uploadBtn, function (value, key) {
                            var default_text = $(value).filestyle('buttonText');
                            $(value).filestyle('buttonText', $translate.instant(default_text));
                            $rootScope.$on('$translateChangeSuccess', function () {
                                $(value).filestyle('buttonText', $translate.instant(default_text));
                            });
                        });
                    }, 0);
                }

                $scope.itemsSelected = function (items) {
                    console.log(items);
                    $scope.addItem(items);
                };

                var uploader = $scope.uploader = AppMediaService.createFileUploaderEngine();

                /* Call back Uploader */
                var file_items = [];

                uploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/, filter, options) {
                    //console.info('onWhenAddingFileFailed', item, filter, options);
                };
                uploader.onAfterAddingFile = function (fileItem) {
                    //console.info('onAfterAddingFile', fileItem);
                    $scope.uploader.uploadAll();
                };
                uploader.onAfterAddingAll = function (addedFileItems) {
                    //console.info('onAfterAddingAll', addedFileItems);
                };
                uploader.onBeforeUploadItem = function (item) {
                    //console.info('onBeforeUploadItem', item);
                };
                uploader.onProgressItem = function (fileItem, progress) {
                    //console.info('onProgressItem', fileItem, progress);
                };
                uploader.onProgressAll = function (progress) {
                    //console.info('onProgressAll', progress);
                };
                uploader.onSuccessItem = function (fileItem, response, status, headers) {
                    if (response.success == true) {
                        var fileType = AppMediaService.getFileTypeFromExtension(response.data.file_extension);
                        response.data.fileType = fileType;
                        $scope.addItem([response.data]);
                    }
                    $scope.translateButton();
                };
                uploader.onErrorItem = function (fileItem, response, status, headers) {
                    console.info('onErrorItem', fileItem, response, status, headers);
                };
                uploader.onCancelItem = function (fileItem, response, status, headers) {
                    //console.info('onCancelItem', fileItem, response, status, headers);
                };
                uploader.onCompleteItem = function (fileItem, response, status, headers) {
                    //console.info('onCompleteItem', fileItem, response, status, headers);
                };
                uploader.onCompleteAll = function () {
                    //console.info('onCompleteAll');
                };

                uploader.removeItem = function (itemMediaUuid) {
                    WaitingService.questionSimple('DO_YOU_WANT_TO_DELETE_DOCUMENT_TEXT', function () {
                        $scope.$apply();

                        if ($scope.uuid && $scope.uuid != "") {
                            AppMediaService.removeAttachment({
                                'object_uuid': $scope.uuid,
                                'media_uuid': itemMediaUuid,
                            }).then(function (res) {
                                if (res.success) {
                                    WaitingService.popSuccess('DOCUMENT_DELETE_SUCCESS_TEXT');
                                    angular.forEach($scope.items, function (item, index) {
                                        if (item.uuid == itemMediaUuid) {
                                            $scope.items.splice(index, 1);
                                        }
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
                }

                uploader.downloadItem = function (item) {
                    AppMediaService.downloadMediaByUrl(item);
                };
            }
        };

        return directive;
    }
})();
