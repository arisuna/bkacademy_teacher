/**
 * [avatar upload directive]
 * @return {[type]} [created by thinh@expatfinder.com]
 */
(function () {
    'use strict';

    angular
        .module('app.avatar-upload')
        .directive('avatarUpload', avatarUpload);

    avatarUpload.$inject = ['FileUploader', '$http', '$localStorage', '$timeout', 'ngDialog', 'toaster', 'urlBase', '$document',
        '$translate','$rootScope','DataService','WaitingService', 'AppAvatarService', 'DataThumbCache'];

    function avatarUpload( FileUploader, $http, $localStorage, $timeout, ngDialog, toaster, urlBase, $document,
                           $translate, $rootScope, DataService, WaitingService, AppAvatarService, DataThumbCache) {
        var avatarUploadZone = {
            restrict: 'E',
            replace: true,
            scope: {
                avatar:'=?avatar',
                uuid:'=uuid',
                groupname:'@groupname',
                buttonText: '@?',
                aclEditAllow: '<?'
            },
            templateUrl: urlBase.tplBase('base-modules/avatar-upload', 'avatar-upload'),
            link: function (scope, element, attrs, timeout) {

                if( scope.buttonText == '' || angular.isUndefined(scope.buttonText)  ){
                    scope.buttonText = $translate.instant('CHANGE_AVATAR_TEXT');
                }

                if( scope.groupname == '' || scope.groupname == 'undefined' ){
                    scope.groupname = 'avatar';
                }

                if( angular.isUndefined(scope.aclEditAllow) ){
                    scope.aclEditAllow = true;
                }

                $timeout(function () {
                    var uploadBtn = $(':file', element);
                    angular.forEach(uploadBtn, function (value, key) {
                        var default_text = scope.buttonText;
                        $(value).filestyle('buttonText', $translate.instant(default_text));
                        $rootScope.$on('$translateChangeSuccess', function () {
                            $(value).filestyle('buttonText', $translate.instant(default_text));
                        });
                    });
                }, 0);
            },
            controller: function ($scope, $element, $attrs, $timeout) {
                $scope.avatar = {};
                $scope.preview = false;
                $scope.uploading = false;

                $scope.getAvatar = function () {
                    AppAvatarService.getAvatarObject($scope.uuid).then(
                        function (response) {
                            if (response.success == true) {
                                $scope.avatar = response.data;
                                DataThumbCache.put($scope.uuid, $scope.avatar.image_data.url_thumb);
                                $timeout(function () {
                                    $scope.publish('updateAvatarAfterChange', $scope.uuid);
                                    $scope.publish('load_avatar_thumb', $scope.avatar.image_data.url_thumb);
                                }, 500);
                            }
                        }, function (error) {
                            WaitingService.popExpire();
                        });
                }

                $scope.$watch('uuid', function () {
                    if ($scope.uuid != '' && $scope.uuid != undefined && angular.isDefined($scope.uuid)) {
                        $scope.getAvatar();
                    }
                })


                var uploader = $scope.uploader = AppAvatarService.createFileUploaderEngine({
                    objectUuid: $scope.uuid,
                    objectName: 'avatar',
                });

                /**
                 * add avatar
                 * @param avatar
                 */
                    // $scope.addAvatar = function (avatar) {
                    //     $scope.avatar = avatar;
                    //     if (!angular.isUndefined($scope.uuid) && $scope.uuid != '') {
                    //         GmsMediaService.attachAvatar({
                    //             uuid: $scope.uuid,
                    //             media: $scope.avatar,
                    //         }).then(function (res) {
                    //
                    //         });
                    //     }
                    // }

                var file_items = [];


                /**
                 * Converts data uri to Blob. Necessary for uploading.
                 * @see
                 *   http://stackoverflow.com/questions/4998908/convert-data-uri-to-file-then-append-to-formdata
                 * @param  {String} dataURI
                 * @return {Blob}
                 */
                var dataURItoBlob = function (dataURI) {
                    var binary = atob(dataURI.split(',')[1]);
                    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
                    var array = [];
                    for (var i = 0; i < binary.length; i++) {
                        array.push(binary.charCodeAt(i));
                    }
                    return new Blob([new Uint8Array(array)], {type: mimeString});
                };


                uploader.onAfterAddingFile = function (fileItem) {
                    console.info('onAfterAddingFile', fileItem);
                    $scope.uploading = true;
                    $scope.preview = false;
                    $scope.filepreview = fileItem.file;
                    $scope.uploader.uploadAll();
                };

                uploader.readAndPreviewFile = function (fileItem) {
                    //var preview = $document("#previewAvatar");
                    var preview = $document[0].getElementById('previewAvatar');
                    var reader = new FileReader();
                    reader.addEventListener("load", function () {
                        if (preview != null && angular.isDefined(preview.src)) {
                            preview.src = reader.result;
                        }
                    }, false);
                    reader.readAsDataURL(fileItem._file, "UTF-8");
                }

                uploader.onSuccessItem = function (fileItem, response, status, headers) {
                    if (response.success == true) {
                        $scope.uploading = true;
                        $scope.preview = true;
                        uploader.readAndPreviewFile(fileItem);
                        $scope.getAvatar();
                        // $scope.addAvatar(response.data);
                    }
                };

                uploader.onErrorItem = function (fileItem, response, status, headers) {
                    $scope.uploading = false;
                    // $scope.preview = false;
                    $scope.getAvatar();
                    if ($scope.avatar) {
                        let previewUrl = $document[0].getElementById('previewAvatar');
                        previewUrl.src = $scope.avatar.image_data ? $scope.avatar.image_data.url_thumb : '';
                    } else {
                        $scope.preview = false;
                    }

                    if (angular.isDefined(response.message)) {
                        WaitingService.errorWithTitle(fileItem.file.name, response.message);
                    }
                };

                /**
                 * Remove avatar
                 */
                $scope.removeAvatar = function () {
                    WaitingService.questionSimple('QUESTION_DELETE_AVATAR_TEXT', function () {
                        if ($scope.uuid && $scope.uuid != "") {
                            AppAvatarService.removeAvatar($scope.uuid).then(function (res) {
                                if (res.success) {
                                    $scope.avatar = {};
                                    $scope.preview = false;
                                    $scope.uploading = false;
                                    DataThumbCache.put($scope.uuid, '');
                                    $timeout(function () {
                                        $scope.publish('updateAvatarAfterChange', $scope.uuid);
                                        $scope.publish('load_avatar_thumb', '');
                                    }, 500);
                                    WaitingService.popSuccess('AVATAR_DELETE_SUCCESS_TEXT');
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
        };

        return avatarUploadZone;
    }

})();