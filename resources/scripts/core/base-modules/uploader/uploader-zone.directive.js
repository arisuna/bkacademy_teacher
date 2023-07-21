/**
 * Created by anmeo on 10/26/16.
 */

(function () {
    'use strict';

    angular
        .module('app.media-library')
        .directive('uploadZone', uploadZone);

    uploadZone.$inject = ['FileUploader', '$http', '$localStorage', '$timeout', 'ngDialog', 'toaster', 'urlBase', '$translate', '$rootScope','$location','$window'];

    function uploadZone(FileUploader, $http, $localStorage, $timeout, ngDialog, toaster, urlBase, $translate, $rootScope, $location, $window) {
        var uploadZoneBox = {
            restrict: 'E',
            replace: true,
            scope: {
                options: '=options',
                libraryOptions: '=libraryOptions',
                onSelectItem: '&onSelectItem',
                data: '=data',
                dataUuid: '=dataUuid'
            },
            templateUrl: urlBase.tplBase('base-modules/uploader', 'upload-zone', '_=' + Math.random()),
            link: function (scope, element, attrs, translate) {
                if (angular.isUndefined(attrs.options)) {
                    scope.options = {
                        limit: 5
                    }
                }
                else {
                    if (angular.isUndefined(scope.options.limit)) {
                        scope.options.limit = 5;
                    }
                    scope.libraryOpts = scope.libraryOptions;
                }
                if (angular.isUndefined(scope.options.isGrid)) {
                    scope.options.isGrid = true;
                }

                if (angular.isUndefined(scope.options.isList)) {
                    scope.options.isList = false;
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

                var allTypes = null;

                $http.get('/server/file-type.json')
                    .success(function (data) {
                        allTypes = data[0];
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

                $scope.addItem = function (items) {
                    angular.forEach(items, function (item, key) {
                        if ($scope.data.items.map(function (e) {
                                return e.id;
                            }).indexOf(item.id) < 0) {
                            $scope.data.items.push(item);
                        }
                    });

                    if (!angular.isUndefined($scope.data.uuid) && $scope.data.uuid != '') {
                        //add item directiry in Media Attachment
                        //
                        $http({
                            method: 'POST',
                            url: '/media/uploader/attach',
                            data: jQuery.param({
                                uuid: $scope.data.uuid,
                                attachments: $scope.data.items,
                                type: !angular.isUndefined($scope.data.object_type) && $scope.data.object_type != '' ? $scope.data.object_type : "nothing"
                            }),
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        }).success(function (res) {
                            if (!res.success) {
                                //
                            } else {
                                //
                            }
                        });
                    }
                };

                $scope.translateButton = function(){
                    $timeout(function () {
                        var uploadBtn = $(':file', $element);
                        angular.forEach(uploadBtn, function (value, key) {
                            var default_text = $(value).filestyle('buttonText');
                            console.log( default_text );
                            $(value).filestyle('buttonText', $translate.instant(default_text));
                            $rootScope.$on('$translateChangeSuccess', function () {
                                $(value).filestyle('buttonText', $translate.instant(default_text));
                            });
                        });
                    }, 0);
                }

                $scope.itemsSelected = function (items) {
                    $scope.addItem(items);
                };

                var uploader = $scope.uploader = new FileUploader({
                    url: '/media/uploader/upload',
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest',
                        'Token-Key': window.localStorage.getItem('token_key')
                    },
                    filters: [{
                        'name': 'sizeFilter',
                        'fn': function (item) {
                            if (item.size <= 10485760) {
                                return true;
                            } else {
                                window.swal($translate.instant('ERROR_TEXT'), $translate.instant('ALERT_FILE_MAX_SIZE_TEXT'), 'error');
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
                    console.log( item_id_to_remove );
                    angular.forEach($scope.data.items, function (item, index) {
                        if (item.id == item_id_to_remove) {
                            $scope.data.items.splice(index, 1);
                        }
                    });
                    if ($scope.data.uuid && $scope.data.uuid != "") {
                        $http({
                            method: 'POST',
                            url: '/media/attachments/remove',
                            data: {
                                'object_uuid': $scope.data.uuid,
                                'object_name': '',
                                'media_id': item_id_to_remove,
                            },
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        }).success(function (res) {

                        });
                    }
                }

                uploader.downloadItem = function ( item ) {
                    $window.location.href = $location.protocol() + "://" + $location.host() + item.image_data.url_download;;
                };

                function getFileType (type) {

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

                //console.info('uploader', uploader);
            }
        };

        return uploadZoneBox;
    }
})();
