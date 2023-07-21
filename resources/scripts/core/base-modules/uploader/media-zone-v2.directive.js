(function () {
    'use strict';

    angular
        .module('app.media-library')
        .directive('mediaZoneV2', mediaZoneV2);

    mediaZoneV2.$inject = ['FileUploader', '$http', '$localStorage', '$timeout', 'ngDialog', 'toaster', 'urlBase', '$translate', '$rootScope', '$location', '$window', 'DataService', 'WaitingService'];

    function mediaZoneV2(FileUploader, $http, $localStorage, $timeout, ngDialog, toaster, urlBase, $translate, $rootScope, $location, $window, DataService, WaitingService) {
        var mediaZoneV2Directive = {
            restrict: 'E',
            replace: true,
            scope: {
                uuid: '<',
                objectType: '@',
                label: '<',
                objectShared: '@?',
                options: '=?options',
            },

            templateUrl: urlBase.tplBase('base-modules/uploader', 'media-zone-v2', '_=' + Math.random()),

            controller: function ($scope, $element, $attrs, $translate, $location, $window) {
                $scope.options = angular.extend({ limit: 5 }, $scope.options);
                $scope.objectType = $scope.objectType || null;

                console.log( $scope.objectType  );

                $scope.fileTypes = [];
                $scope.files = [];
                $scope.uploader = new FileUploader({
                    url: 'https://nhuandev.reloday.com/media/uploader/upload',
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
                                WaitingService.error('ALERT_FILE_MAX_SIZE_TEXT');
                                return false;
                            }
                        }
                    }],
                    removeAfterUpload: true,
                    queueLimit: $scope.options.limit
                });


                $scope.getFiles = function() {
                    DataService.getMediaListByUuid($scope.uuid, $scope.objectType)
                        .then(function(res) {
                            $scope.files = res.data;
                        });
                };

                $scope.getFileTypes = function () {
                    $http.get('/server/file-type.json')
                        .success(function (data) {
                            $scope.fileTypes = data[0];
                        });
                };

                $scope.mappingUploadedFileToUUID = function(uploadedFiles) {
                    DataService.attachFileByUuid({
                        uuid: $scope.uuid,
                        attachments: uploadedFiles,
                        shared: $scope.objectShared,
                        type: $scope.objectType
                    }).then(function (res) {
                        if (!res.success) {
                            WaitingService.error('ATTACH_FILE_FAILED_TEXT');
                            return;
                        }
                        $scope.getFiles();
                    }, function (err) {
                        WaitingService.expire();
                    })
                };

                $scope.downloadFile = function(file) {
                    $window.location.href = $location.protocol() + "://" + $location.host() + file.image_data.url_download;
                    ;
                };

                $scope.removeFile = function(file) {
                    WaitingService.questionSimple('DELETE_FILE_MESSAGE_TEXT',function(){
                        $scope.$apply();
                        $http({
                            method: 'POST',
                            url: '/media/attachments/remove',
                            data: {
                                'object_uuid': $scope.uuid,
                                'object_name': '',
                                'media_id': file.id,
                            },
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        }).success(function (res) {
                            $scope.getFiles();
                        });
                    });
                };

                $scope.getFileType = function(type) {
                    var fileType = '';
                    angular.forEach($scope.fileTypes, function (typeValue, typeIndex) {
                        angular.forEach(typeValue, function (extension, index) {
                            if (extension == type) {
                                fileType = typeIndex;
                            }
                        })
                    });
                    return fileType;
                };

                // Init function
                (function init($scope) {
                    $scope.getFiles();
                    $scope.getFileTypes();


                    // Uploader configuration
                    $scope.uploader.onAfterAddingFile = function () {
                        $scope.uploader.uploadAll();
                    };


                    $scope.uploader.onSuccessItem = function (fileItem, response, status, headers) {
                        if (response.success == true) {
                            var fileType = $scope.getFileType(response.data.file_extension);
                            response.data.fileType = fileType;
                            $scope.mappingUploadedFileToUUID([response.data]);
                        }
                    };
                })($scope);
            }
        };

        return mediaZoneV2Directive;
    }
})();
