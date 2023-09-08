(function () {
    'use strict';

    angular
        .module('app.media-library')
        .directive('mediaZone', mediaZone);

    mediaZone.$inject = ['FileUploader', '$http', '$localStorage', '$timeout', 'ngDialog', 'toaster', 'urlBase', '$translate', '$rootScope', '$location', '$window', 'DataService', 'WaitingService', 'DocumentViewerFactory'];

    function mediaZone(FileUploader, $http, $localStorage, $timeout, ngDialog, toaster, urlBase, $translate, $rootScope, $location, $window, DataService, WaitingService, DocumentViewerFactory) {
        var uploadZoneBox = {
            restrict: 'E',
            replace: true,
            scope: {
                options: '=?options',
                libraryOptions: '<libraryOptions',
                onSelectItem: '&onSelectItem',
                onAddItem: '&onAddItem',
                objectShared: '@?',
                items: '=?',
                uuid: '<',
                buttonText: '@',
                objectType: '@'
            },

            templateUrl: urlBase.tplBase('base-modules/uploader', 'media-zone', '_=' + Math.random()),
            link: function (scope, element, attrs, translate) {
                if (angular.isUndefined(scope.items)) {
                    scope.items = [];
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
                }else if(scope.objectShared == "true"){
                    scope.objectShared = true;
                }else {
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

                var allTypes = null;

                if( angular.isUndefined( $scope.items ) || $scope.items == ''){
                    $scope.items = [];
                }

                if (typeof $scope.items === "object") {
                    $scope.items = [];
                }

                $scope.getSharedValue = function(){
                    if (angular.isUndefined($scope.objectShared) || $scope.objectShared == "false") {
                        $scope.objectShared = false;
                        return false;
                    }else if($scope.objectShared == "true"){
                        $scope.objectShared = true;
                        return true;
                    }else if( $scope.objectShared === true || $scope.objectShared === false ){
                        return $scope.objectShared;
                    }else {
                        $scope.objectShared = null;
                        return null;
                    }
                }
                $scope.getListFileType = function () {
                    $http.get('/server/file-type.json')
                        .success(function (data) {
                            allTypes = data[0];
                        });
                };

                $scope.getListFileType();

                $scope.getFileList = function () {
                    DataService.getMediaListPayload ({
                        uuid: $scope.uuid,
                        shared: $scope.getSharedValue()
                    }).then(function (res) {
                        if (res.success == true) {
                            $scope.items = res.data
                        }
                    });
                }

                $scope.$watch('uuid', function () {
                    if ($scope.uuid != undefined && $scope.uuid != '') {
                        $scope.getFileList();
                    }
                })

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
                    }
                    else {
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
                        if( angular.isUndefined( $scope.items ) || angular.isArray( $scope.items  ) == false  ){
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

                    console.log( items );
                    if (!angular.isUndefined($scope.uuid) && $scope.uuid != '') {
                        DataService.attachFileByUuid({
                            uuid: $scope.uuid,
                            attachments: items,
                            shared: $scope.objectShared,
                            type: !angular.isUndefined($scope.objectType) && $scope.objectType != '' ? $scope.objectType : "nothing"
                        }).then(function (res) {
                            if (!res.success) {
                                WaitingService.error('ATTACH_FILE_FAILED_TEXT');
                            }
                        }, function (err) {
                            WaitingService.expire();
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

                $scope.openDocumentViewer = function(file) {
                    var url = file.image_data.url_download;
                    console.log(file.image_data.url_download);

                    if (file.file_type === 'document') {
                        DocumentViewerFactory.openDocumentViewer(url, file.file_extension);
                    } else {
                        DocumentViewerFactory.openDocumentViewer(url, file.file_type);
                    }
                };

                var uploader = $scope.uploader = new FileUploader({
                    url: 'https://nhuandev.reloday.com/media/uploader/upload',
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest',
                        'Token-Key': window.localStorage.getItem('token_key')
                    },
                    filters: [{
                        'name': 'sizeFilter',
                        'fn': function (item) {
                            if (item.size <= 50485760) {
                                //10mb maxi
                                return true;
                            } else {
                                WaitingService.error('ALERT_FILE_MAX_SIZE_TEXT');
                                return false;
                            }
                        }
                    }],
                    removeAfterUpload: true,
                    queueLimit: $scope.options.limit
                });

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
                        var fileType = getFileType(response.data.file_extension);
                        response.data.fileType = fileType;
                        $scope.addItem([response.data]);
                    }
                    $scope.translateButton();
                };
                uploader.onErrorItem = function (fileItem, response, status, headers) {
                    console.info('onErrorItem', fileItem, response, status, headers);
                    console.info('onErrorItem', response, status, headers);
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

                uploader.removeItem = function (item_id_to_remove) {
                    $window.swal({
                        title: $translate.instant('ARE_YOU_SURE_TEXT'),
                        text: $translate.instant('DO_YOU_WANT_TO_DELETE_DOCUMENT_TEXT'),
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: $translate.instant('YES_TEXT'),
                        cancelButtonText: $translate.instant('NO_TEXT'),
                        closeOnConfirm: true,
                    },
                    function() {
                        $scope.$apply();

                        console.log(item_id_to_remove);
                        angular.forEach($scope.items, function (item, index) {
                            if (item.id == item_id_to_remove) {
                                $scope.items.splice(index, 1);
                            }
                        });
                        if ($scope.uuid && $scope.uuid != "") {
                            $http({
                                method: 'POST',
                                url: '/media/attachments/remove',
                                data: {
                                    'object_uuid': $scope.uuid,
                                    'object_name': '',
                                    'media_id': item_id_to_remove,
                                },
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded'
                                }
                            }).success(function (res) {
                                if (res.success) {
                                    $window.swal({
                                        title:$translate.instant('CONGRATULATION_TEXT'), 
                                        text:"DOCUMENT_DELETE_SUCCESS_TEXT", 
                                        type:"success",
                                        confirmButtonText: 'OK'
                                    });
                                } else {
                                    $window.swal(
                                        $translate.instant('DOCUMENT_DELETE_FAIL_TEXT'),
                                        $translate.instant( res.message ),
                                        'error'
                                    );
                                }
                            });
                        }
                    });
                }
                uploader.downloadItem = function (item) {
                    $window.location.href = $location.protocol() + "://" + $location.host() + item.image_data.url_download;
                    ;
                };

                function getFileType(type) {
                    var fileType = '';
                    angular.forEach(allTypes, function (typeValue, typeIndex) {
                        angular.forEach(typeValue, function (extension, index) {
                            if (extension == type) {
                                console.log(typeIndex);
                                fileType = typeIndex;
                            }
                        })
                    });
                    return fileType;
                }
            }
        };

        return uploadZoneBox;
    }
})();
