(function () {
    'use strict';

    angular
        .module('app.app-directives-media-zone')
        .directive('appLogoUpload', appLogoUpload);

    appLogoUpload.$inject = ['FileUploader', '$document', '$http', 'urlBase', '$translate', '$rootScope', '$timeout', 'AppDataService', 'DataService', 'WaitingService', 'AppAvatarService', 'DataThumbCache'];

    function appLogoUpload(FileUploader, $document, $http, urlBase, $translate, $rootScope, $timeout, AppDataService, DataService, WaitingService, AppAvatarService, DataThumbCache) {

        const directive = {
            restrict: 'E',
            replace: true,
            scope: {
                uuid: '=',
                name: '@?',
                buttonText: '@',
                mediaType: '<',
                isPublicPhoto: '<?',
                aclEditAllow: '<?'
            },
            template: `
            <div class="text-center avatar-upload">
                <div data-text=""
                     class="imgcrop-preview"
                     style="background:transparent;">

                    <div class="user-block-picture">

                        <spinner ng-show="uploading == true && preview == false"></spinner>

                        <div class="user-block-status text-center">
                            <img id="previewLogo_{{name}}" class="img-avatar img-responsive" ng-src="" ng-show="preview == true">
                        </div>

                        <div class="user-block-status text-center"
                             ng-if="avatar.image_data.url_thumb"
                             ng-show="uploading == false && preview == false">
                            <img class="img-avatar img-responsive"
                                 ng-if="avatar.image_data.url_thumb && avatar.image_data.url_thumb != undefined"
                                 ng-src="{{avatar.image_data.url_thumb }}"/>
                        </div>
                    </div>
                </div>


                <div ng-if="avatar.image_data.url_thumb == undefined || avatar.image_data.url_thumb == ''"
                     ng-show="uploading == false && preview == false"
                     class="mt-lg text-center">
                    <img class="img-circle img-avatar"
                         ng-src="/app/assets/img/company-logo.png"/>
                </div>

                <div class="clearfix"></div>
                <div class="text-center mt mb" ng-style="{'width':'100%','margin':'auto'}" ng-if="aclEditAllow">
                    <input filestyle="" type="file"
                           data-input="false"
                           accept="image/*"
                           data-class-button="btn btn-dark-blue btn-block mg-auto"
                           nv-file-select=""
                           uploader="uploader"
                           class="text-center btn-block"
                           data-button-text=""
                           data-badge="false"
                           data-button-name="btn btn-xs btn-oval btn-flat btn-primary btn-outline"
                           data-icon-name="fa fa-cloud-upload"/>

                           <a ng-if="avatar.image_data.url_thumb || preview == true" ng-click="removeLogo()"><i class="fa fa-trash"></i> {{'REMOVE_LOGO_TEXT' | translate }}</a>
                </div>
            </div>
            `,

            link: function (scope, element, attrs, timeout) {
                if (angular.isUndefined(scope.name)) {
                    console.log("scope.name ", scope.name)
                    scope.name = "";
                }

                if (scope.buttonText == '' || scope.buttonText == 'undefined') {
                    scope.buttonText = 'CHANGE_LOGO_TEXT';
                }

                if (angular.isUndefined(scope.mediaType) || scope.mediaType == '' || scope.mediaType == 'undefined') {
                    scope.mediaType = 'avatar';
                }

                if (scope.aclEditAllow == null || scope.aclEditAllow == 'undefined' || scope.aclEditAllow == undefined) {
                    scope.aclEditAllow = true;
                }

                if (angular.isUndefined(scope.isPublicPhoto) || scope.isPublicPhoto == false) {
                    scope.isPublicPhoto = false;
                } else {
                    scope.isPublicPhoto = true;
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
                $scope.uploading = false;
                $scope.preview = false;

                $scope.getAvatar = function () {
                    $scope.avatar = {};
                    AppAvatarService.getAvatarObject($scope.uuid).then(
                        function (response) {
                            if (response.success == true) {
                                // $scope.preview = false;
                                // $scope.uploading = false;
                                $scope.avatar = response.data;
                            }
                            DataThumbCache.put($scope.uuid, $scope.avatar);
                            $timeout(function () {
                                $scope.publish('updateLogoAfterChange', $scope.uuid);
                            }, 500);
                        }, function (error) {
                            WaitingService.expire();
                        });
                }

                $scope.$watch('uuid', function () {
                    if ($scope.uuid != '' && $scope.uuid != undefined && angular.isDefined($scope.uuid)) {
                        $scope.getAvatar();
                    } else {
                        $scope.avatar = {};
                    }
                })


                var uploader = $scope.uploader = AppAvatarService.createFileUploaderEngine({
                    objectUuid: $scope.uuid,
                    objectName: 'logo',
                });

                /**
                 * add avatar
                 * @param avatar
                 */

                var file_items = [];

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
                    var preview = $document[0].getElementById('previewLogo_' + ($scope.name));
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
                        let previewUrl = $document[0].getElementById('previewLogo_' + ($scope.name));
                        previewUrl.src = $scope.avatar.image_data ? $scope.avatar.image_data.url_thumb : '';
                    } else {
                        $scope.preview = false;
                    }

                    if (angular.isDefined(response.message)) {
                        WaitingService.errorWithTitle(fileItem.file.name, response.message);
                    }
                };


                /**
                 * Remove logo
                 */
                $scope.removeLogo = function () {
                    WaitingService.questionSimple('QUESTION_DELETE_LOGO_TEXT', function () {
                        if ($scope.uuid && $scope.uuid != "") {
                            console.log($scope.uuid);
                            AppAvatarService.removeAvatar($scope.uuid).then(function (res) {
                                if (res.success) {
                                    $scope.avatar = {};
                                    $scope.preview = false;
                                    $scope.uploading = false;
                                    DataThumbCache.put($scope.uuid, {});
                                    $timeout(function () {
                                        $scope.publish('updateLogoAfterChange', $scope.uuid);
                                    }, 500);
                                    WaitingService.popSuccess('LOGO_DELETE_SUCCESS_TEXT');
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

            }
        };

        return directive;
    }

})();
