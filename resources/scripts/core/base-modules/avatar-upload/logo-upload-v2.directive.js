/**
 * [avatar upload directive]
 * @return {[type]} [created by thinh@expatfinder.com]
 */
(function () {
    'use strict';

    angular
        .module('app.avatar-upload')
        .directive('logoUploadV2', logoUploadV2);

    logoUploadV2.$inject = ['FileUploader', '$document', '$http', '$localStorage', '$timeout', 'ngDialog', 'toaster', 'urlBase',
        '$translate','$rootScope','DataService','WaitingService', 'AppAvatarService'];

    function logoUploadV2( FileUploader, $document, $http, $localStorage, $timeout, ngDialog, toaster, urlBase,
                         $translate, $rootScope, DataService, WaitingService, AppAvatarService) {
        var logoUploadV2Zone = {
            restrict: 'E',
            replace: true,
            scope: {
                uuid: '=',
                buttonText: '@',
                type: '@?',
                aclEditAllow: '<?',
                toolTipText: '@?'
            },
            templateUrl: urlBase.tplBase('base-modules/avatar-upload', 'logo-v2', '_=' + Math.random()),
            link: function (scope, element, attrs, timeout) {

                if( scope.buttonText == '' || angular.isDefined(scope.buttonText) ){
                    scope.buttonText = $translate.instant('CHANGE_LOGO_TEXT');
                }

                if( scope.groupname == '' || scope.groupname == 'undefined' ){
                    scope.groupname = 'avatar';
                }

                if( scope.type == '' ||  angular.isDefined(scope.type)  ){
                    scope.type = 'squared_logo';
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
                $scope.image = '';
                $scope.preview = false;
                $scope.uploading = false;

                $scope.getImage = function () {
                    let params = {
                        uuid: $scope.uuid,
                        type: $scope.type
                    };

                    AppAvatarService.getImageObject(params).then(
                        function (response) {
                            if (response.success == true) {
                                $scope.image = response.data;
                                if ($scope.image && $scope.image.uuid){
                                    $scope.publish('updateLogoUuid', {type: $scope.type, logoUuid: $scope.image.uuid});
                                }
                            }
                        }, function (error) {
                            WaitingService.popExpire();
                        });
                }

                $scope.$watch('uuid', function () {
                    if ($scope.uuid != '' && $scope.uuid != undefined && angular.isDefined($scope.uuid)) {
                        $scope.getImage();
                    }
                })

                var uploader = $scope.uploader = AppAvatarService.createFileUploaderEngine({
                    objectUuid: $scope.uuid,
                    objectName: $scope.type,
                });

                /**
                 * Converts data uri to Blob. Necessary for uploading.
                 * @see
                 * http://stackoverflow.com/questions/4998908/convert-data-uri-to-file-then-append-to-formdata
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
                    var preview = $document[0].getElementById('previewLogo_' + $scope.type + '_' + $scope.uuid);
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
                        $scope.getImage();
                        // $scope.addAvatar(response.data);
                    }
                };

                uploader.onErrorItem = function (fileItem, response, status, headers) {
                    $scope.uploading = false;
                    // $scope.preview = false;
                    $scope.getImage();
                    if($scope.image){
                        let previewUrl = $document[0].getElementById('previewLogo_' + $scope.uuid);
                        previewUrl.src = $scope.image;
                    }else{
                        $scope.preview = false;
                    }

                    if (angular.isDefined(response.message)) {
                        WaitingService.errorWithTitle(fileItem.file.name, response.message);
                    }
                };

                /**
                 * Remove avatar
                 */
                $scope.removeImage = function (){
                    WaitingService.questionSimple('QUESTION_DELETE_LOGO_TEXT', function () {
                        if ($scope.uuid && $scope.uuid != "") {
                            let params = {
                                uuid: $scope.uuid,
                                type: $scope.type
                            };
                            AppAvatarService.removeImage(params).then(function (res) {
                                if (res.success) {
                                    $scope.image = '';
                                    $scope.preview = false;
                                    $scope.uploading = false;
                                    $scope.publish('updateLogoUuid', {type: $scope.type, logoUuid: ''});
                                    WaitingService.success('Logo deleted');
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

        return logoUploadV2Zone;
    }

})();