(function () {
    'use strict';

    angular
        .module('app.app-directives-media-zone')
        .directive('appMediaZone', appMediaZone);

    appMediaZone.$inject = ['Utils', '$http', '$localStorage', '$timeout', 'ngDialog', 'toaster', 'urlBase', '$translate', '$rootScope', '$location', '$window',
        'AppMediaService', 'WaitingService', 'HistoryService', '__env'];

    function appMediaZone(Utils, $http, $localStorage, $timeout, ngDialog, toaster, urlBase, $translate, $rootScope, $location, $window,
                          AppMediaService, WaitingService, HistoryService, __env) {
        var uploadZoneBox = {
            restrict: 'E',
            replace: true,
            scope: {
                onSelectItem: '&onSelectItem',
                onAddItem: '&onAddItem',
                multiSelect: '<?',
                showLibrary: '<?',
                isMultiple: '<?',
                isHidden: '<?',
                isEditable: '<?',
                isGrid: '<?',
                limit: '<?',
                objectShared: '@?',
                items: '=?',
                uuid: '<',
                buttonText: '@',
                objectType: '@',
                hideImg: '<?',
                isRelocationService: '<?',
                isRelocation: '<?',
                isAssignment: '<?',
                isTask: '<?',
                description: '@?',
                showUpload: '<?',
                mediaContentWidth: '<?',
                companyId: '<?',
                employeeUuid: '<?',
                libraryCompanyUuid: '<?',
                libraryEmployeeUuid: '<?',
                object: '=?',
                isShareDocument: '<?',
                isAttachAttachment: '<?',
                isProperty: '<?',
            },

            templateUrl: urlBase.tplBase('base-modules/app-directives-media-zone', 'media-zone'),
            link: function (scope, element, attrs, translate) {
                if (angular.isUndefined(scope.items)) {
                    scope.items = [];
                }

                if (angular.isUndefined(scope.description)) {
                    scope.description = undefined;
                }

                scope.options = {
                    limit: angular.isUndefined(scope.limit) || scope.limit == undefined ? 5 : scope.limit,
                    isGrid: angular.isUndefined(scope.isGrid) || scope.isGrid == undefined ? false : true,
                    isList: angular.isUndefined(scope.isList) || scope.isList == undefined ? false : true,
                    multiSelect: angular.isUndefined(scope.multiSelect) || scope.multiSelect == undefined ? true : scope.multiSelect,
                    showLibrary: angular.isUndefined(scope.showLibrary) || scope.showLibrary == undefined ? true : scope.showLibrary,
                }


                scope.libraryOpts = scope.options;

                if (angular.isUndefined(scope.objectShared) || scope.objectShared == "false") {
                    scope.objectShared = false;
                } else if (scope.objectShared == "true") {
                    scope.objectShared = true;
                } else {
                    scope.objectShared = null;
                }
                scope.isMultiple = !(angular.isDefined(scope.isMultiple) || scope.isMultiple == false);

                if(angular.isUndefined(scope.isEditable)){
                    scope.isEditable = true;
                }

                // scope.isEditable = !(angular.isDefined(scope.isEditable) || scope.isEditable == false);

                if (angular.isUndefined(scope.showUpload) && !_.isBoolean(scope.showUpload)) {
                    console.log('scope.showUpload', scope.showUpload);
                    scope.showUpload = true;
                }

                if (angular.isUndefined(scope.mediaContentWidth)) {
                    scope.mediaContentWidth = 0;
                } else {
                    scope.mediaContentWidth = parseFloat(scope.mediaContentWidth);
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

                if (angular.isUndefined(scope.isShareDocument) || scope.isShareDocument == undefined) {
                    scope.isShareDocument = false;
                }

                if (angular.isUndefined(scope.isShareAssignee) || scope.isShareAssignee == undefined) {
                    scope.isShareAssignee = false;
                }

                if (angular.isUndefined(scope.isAttachAttachment) || scope.isAttachAttachment == undefined) {
                    scope.isAttachAttachment = false;
                }

                if (angular.isUndefined(scope.isProperty) || scope.isProperty === undefined) {
                    scope.isProperty = false;
                }

                if (angular.isUndefined(scope.objectType)) {
                    scope.objectType = '';
                }
            },

            controller: function ($scope, $element, $attrs, $translate, $location, $window) {
                $scope.getWidthContent = function () {
                    $scope.mediaContentWidth = $('.upload-zone').innerWidth();
                    // console.log('content width', $scope.mediaContentWidth);
                };
                $scope.$watch('mediaContentWidth', function (newValue, oldValue) {
                    if ($scope.mediaContentWidth <= 0) {
                        $scope.getWidthContent();
                    }
                });
                console.log('isAttachAttachment', $scope.isAttachAttachment);

                let allTypes = AppMediaService.getFileTypeList();
                if (angular.isDefined($scope.isGrid) && $scope.isGrid == true) {
                    $scope.displayMode = 'grid';
                    $scope.displayModeLabel = 'GRID_MODE_TEXT';
                } else {
                    $scope.displayMode = 'list';
                    $scope.displayModeLabel = 'LIST_MODE_TEXT';
                }

                console.log('displayMode', $scope.displayMode);

                $scope.isLoading = false;

                if (angular.isUndefined($scope.items) || $scope.items == '') {
                    $scope.items = [];
                }

                if (!Array.isArray($scope.items)) {
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
                };


                $scope.getFileList = function () {
                    $scope.items = []
                    $scope.isLoading = true;
                    AppMediaService.getAttachments({
                        uuid: $scope.uuid,
                        shared: $scope.getSharedValue(),
                        type: !angular.isUndefined($scope.objectType) && $scope.objectType != '' ? $scope.objectType : null
                    }).then(function (res) {
                        if (res.success == true) {
                            $scope.items = res.data
                        }
                        $scope.isLoading = false;
                    }, function () {
                        $scope.isLoading = false;
                    });
                }

                $scope.$watch('uuid', function () {
                    if ($scope.uuid != undefined && $scope.uuid != '') {
                        $scope.getFileList();
                    }
                });

                $scope.$watchCollection('items', function () {
                    console.log('items', $scope.items);
                });

                $scope.subscribe('reload_attachments', function (data) {
                    if (angular.isDefined(data.uuid) && data.uuid == $scope.uuid) {
                        $scope.getFileList();
                        // $timeout(function(){
                        //     $scope.publish('reload_thumb', {reload: true});
                        // }, 500);
                    }
                });

                $scope.subscribe('reload_thumb', function (data) {
                    if (angular.isDefined(data)) {
                        $scope.getFileList();
                    }
                });

                /*
                 * Upload Zone
                 */
                /** Show upload zone **/
                $scope.showUploadZone = function () {
                    var uploadZone = $('div[upload-zone]', $element);
                    if (uploadZone.hasClass('ng-hide')) {
                        uploadZone.removeClass('ng-hide').animo({
                            animation: 'fadeInDown',
                            duration: 0.3
                        });
                    } else {
                        uploadZone.animo({
                            animation: 'fadeOutDown',
                            duration: 0.3
                        }, function () {
                            uploadZone.addClass('ng-hide');
                        });
                    }
                };

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
                                $scope.items.unshift(item);
                                if (!angular.isUndefined($scope.onAddItem)) {
                                    item.can_delete = true;
                                    $scope.onAddItem({item: item});
                                }
                            }
                        });
                    }

                    if (Utils.isUndefinedOrNull($scope.uuid) === false && $scope.uuid !== '') {
                        AppMediaService.attachMultipleFiles({
                            uuid: $scope.uuid,
                            attachments: items,
                            shared: $scope.objectShared,
                            type: !angular.isUndefined($scope.objectType) && $scope.objectType != '' ? $scope.objectType : null
                        }).then(function (res) {
                            if (res.success) {
                                // if ($scope.isProperty) {
                                //     $scope.showUploadFn();
                                // }
                                $scope.getFileList();
                                $timeout(() => {
                                    $scope.publish('reload_thumb', {reload: true});
                                    WaitingService.popSuccess(res.message);
                                }, 300)
                            } else {
                                WaitingService.popError(res.message);
                                angular.forEach(items, function (item, index) {
                                    $scope.items.splice(index, 1);
                                });
                            }
                        }, function (err) {
                            WaitingService.popExpire(err);
                            angular.forEach(items, function (item, index) {
                                $scope.items.splice(index, 1);
                            });
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
                    if (items.length > 0) {
                        $scope.addItem(items);
                    }
                };

                var uploader = $scope.uploader = AppMediaService.createFileUploaderEngine({
                    isHidden: $scope.isHidden,
                    objectUuid: $scope.uuid,
                });

                AppMediaService.getUploadUrl().then(function (res) {
                    if (res.success == true) {
                        $scope.uploader.url = res.data;
                        console.log('url', res.data);
                    }
                    $timeout(function () {
                        $scope.isLoading = false;
                    }, 1000);
                }, function () {
                    $timeout(function () {
                        $scope.isLoading = false;
                    }, 1000);
                });

                $scope.uploader.onAfterAddingFile = function () {
                };

                $scope.uploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/, filter, options) {
                    // console.info('onWhenAddingFileFailed', item, filter, options);
                    $scope.translateButton()
                };


                $scope.uploader.onSuccessItem = function (fileItem, response, status, headers) {
                    AppMediaService.upload({
                        'name': fileItem.file.name,
                        'size': fileItem.file.size,
                        'uuid': fileItem.uuid,
                        'company_id': $scope.companyId,
                        'type': fileItem.file.type,
                    }).then(function (res) {
                        if (res.success == true) {
                            var fileType = AppMediaService.getFileTypeFromExtension(res.data.file_extension);
                            res.data.fileType = fileType;
                            $scope.addItem([res.data]);
                        }
                        $scope.translateButton();
                    }, function () {
                    });
                };


                $scope.deleteItem = function (itemMediaUuid) {
                    angular.forEach($scope.items, function (item, index) {
                        if (item.uuid == itemMediaUuid) {
                            $scope.items.splice(index, 1);
                        }
                    });
                }

                $scope.showGrid = function () {
                    $scope.displayMode = 'grid';
                    $scope.displayModeLabel = 'GRID_MODE_TEXT';
                    $scope.getWidthContent();
                }

                $scope.showUploadFn = function () {
                    $scope.showUpload = !$scope.showUpload
                }
            }
        };

        return uploadZoneBox;
    }
})();
