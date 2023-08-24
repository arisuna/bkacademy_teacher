(function () {
    'use strict';

    angular
        .module('app.app-services')
        .service('AppAvatarService', AppAvatarService);

    AppAvatarService.$inject = ['Utils', '$http', '$q', '$httpParamSerializer', '$localStorage', '$filter', 'moment', 'AppHttp', '$window', 'WaitingService', 'FileUploader'];

    function AppAvatarService(Utils, $http, $q, $httpParamSerializer, $localStorage, $filter, moment, AppHttp, $window, WaitingService, FileUploader) {

        var vm = this;

        const squaredLogoUploadUrl = __env.apiHostname + '/app/object-image/uploadSquaredLogo';
        const rectangularLogoUploadUrl = __env.apiHostname + '/app/object-image/uploadRectangularLogo';

        vm.config = {
            queueLimit: 1,
            maxSizeLimit: 10485760,
            // maxSizeLimit: 2096000,
            avatarType: 'avatar',
            squaredLogoType: 'squared_logo',
            rectangularLogoType: 'rectangular_logo',
            logoType: 'logo',
            defaultUploadUrl: __env.apiHostname + '/app/object-avatar/upload',
            logoUploadUrl: __env.apiHostname + '/app/object-image/uploadLogo',
            squaredLogoUploadUrl: __env.apiHostname + '/app/object-image/uploadSquaredLogo',
            rectangularLogoUploadUrl: __env.apiHostname + '/app/object-image/uploadRectangularLogo',
        };

        vm.types = {
            employee: 'employee',
            assignment: 'assignment',
            relocation: 'relocation',
            task: 'task',
            document: 'document',
            other: 'other'
        };

        vm.data = {
            file_types: [{
                "image": ["jpg", "gif", "jpeg", "png", "tif", "tiff", "bmp"],
                "audio": ["mp3", "wav", "wma", "aif", "iff", "m3u", "m4u", "mid", "mpa", "ra"],
                "video": ["avi", "flv", "mov", "mp4", "m4v", "mpg", "rm", "swf", "vob", "wmv", "3g2", "3gp", "asf", "asx"],
                "compressed": ["7z", "deb", "gz", "pkg", "rar", "rpm", "sit", "sitx", "tar.gz", "zip", "zipx"],
                "document": ["doc", "docx", "ppt", "pptx", "xls", "xlsx", "pdf", "txt", "log"]
            }],
        };


        /**
         * Function upload avatar
         * @param uploadParams
         * @returns {*}
         */
        vm.createFileUploaderEngine = function (uploadParams) {
            let uploadUrl = vm.config.defaultUploadUrl;
            if (uploadParams) {
                if(uploadParams.objectName != '' && uploadParams.objectUuid != ''){
                    switch (uploadParams.objectName){
                        case 'squared_logo':
                            uploadUrl = vm.config.squaredLogoUploadUrl;
                            break;
                        case 'rectangular_logo':
                            uploadUrl = vm.config.rectangularLogoUploadUrl;
                            break;
                        case 'logo':
                            uploadUrl = vm.config.logoUploadUrl;
                            break;
                        default:
                            break;
                    }
                    uploadUrl = uploadUrl + '?objectUuid=' + uploadParams.objectUuid + '&objectName=' + uploadParams.objectName;
                }
            }

            var uploader = new FileUploader({
                url: uploadUrl,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Token-Key': window.localStorage.getItem('token_key')
                },
                filters: [{
                    'name': 'sizeFilter',
                    'fn': function (item) {
                        if (item.size <= vm.config.maxSizeLimit) {
                            return true;
                        } else {
                            WaitingService.error('ALERT_FILE_MAX_SIZE_TEXT');
                            return false;
                        }
                    }
                }],
                /*withCredentials: true,*/
                removeAfterUpload: true,
                queueLimit: vm.config.queueLimit
            });

            uploader.onBeforeUpload = function (fileItem) {
                console.log(fileItem);
            };

            uploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/, filter, options) {
                //console.info('onWhenAddingFileFailed', item, filter, options);
            };
            uploader.onAfterAddingFile = function (fileItem) {
                //console.info('onAfterAddingFile', fileItem);
                uploader.uploadAll();
            };
            uploader.onAfterAddingAll = function (addedFileItems) {
                //console.info('onAfterAddingAll', addedFileItems);
            };
            uploader.onBeforeUploadItem = function (fileItem) {
                var fileName = angular.isDefined(fileItem.file.name) ? fileItem.file.name : (
                    angular.isDefined(fileItem.name) ? fileItem.name : ''
                );
            };
            uploader.onProgressItem = function (fileItem, progress) {
                //console.info('onProgressItem', fileItem, progress);
            };
            uploader.onProgressAll = function (progress) {
                //console.info('onProgressAll', progress);
            };

            uploader.onErrorItem = function (fileItem, response, status, headers) {
                if (angular.isDefined(response.message)) {
                    WaitingService.errorWithTitle(fileItem.file.name, response.message);
                }
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

            return uploader;
        }

        /**
         * getAvatarObject
         */
        vm.getAvatarObject = function(uuid){
            var deferred = $q.defer();
            AppHttp.get('/app/object-avatar/getObject/' + uuid)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        this.getAvatarObjectDirect = function (uuid) {
            return __env.apiHostname + '/media/avatar/thumbdirect/' + uuid + '?token=' + localStorage.getItem('token_key') + '&getAvatarObjectDirect=true';
        }

        this.getAvatarObjectDirectV2 = function (uuid) {
            return __env.apiHostname + '/media/avatar/thumbdirectV2/' + uuid + '?token=' + localStorage.getItem('token_key') + '&getAvatarObjectDirect=true';
        }

        this.getThumbContentDirect = function (uuid) {
            return __env.apiHostname + '/media/avatar/getThumbDirect/' + uuid + '?token=' + localStorage.getItem('token_key') + '&getAvatarObjectDirect=true';
        }

        this.getContactAvatarObjectDirect = function (uuid) {
            return __env.apiHostname + '/media/avatar/contactThumb/' + uuid + '?token=' + localStorage.getItem('token_key') + '&getContactAvatarObjectDirect=true';
        }

        this.getCompanyLogoObjectDirect = function (uuid) {
            return __env.apiHostname + '/media/avatar/companyLogoThumb/' + uuid + '?token=' + localStorage.getItem('token_key') + '&getCompanyLogoObjectDirect=true';
        }

        this.getEntiyPublicPhotoUrl = function (uuid) {
            return __env.apiHostname + '/media/avatar/publicPhotoThumb/' + uuid + '?token=' + localStorage.getItem('token_key') + '&getPublicPhotoThumbDirect=true';
        }

        // this.getEmployeeAvatar = function (uuid) {
        //     var deferred = $q.defer();
        //     DataHttp.get('/media/avatar/employee/' + uuid)
        //         .then(function (response) {
        //             deferred.resolve(response.data);
        //         }).catch(function (err, status) {
        //         deferred.reject(err.data);
        //     });
        //     return deferred.promise;
        // }
        //
        // this.getLogoObject = function (uuid, type) {
        //     var deferred = $q.defer();
        //     DataHttp.get('/media/avatar/getObject/' + uuid + '?type=' + type)
        //         .then(function (response) {
        //             deferred.resolve(response.data);
        //         }).catch(function (err, status) {
        //         deferred.reject(err.data);
        //     });
        //     return deferred.promise;
        // }

        /**
         * remove the Media FIle and the attachments from all;
         * @param uuid
         * @returns {*}
         */
        vm.removeAvatar = function (uuid) {
            var deferred = $q.defer();

            if (angular.isUndefined(uuid) || uuid == '') {
                deferred.resolve({
                    success: true,
                    message: 'DATA_NOT_FOUND_TEXT'
                });
                return deferred.promise;
            }

            AppHttp.delete('/app/object-avatar/removeAvatar/' + uuid).then(function (response) {
                if (angular.isDefined(response.data.success) && response.data.success == true) {
                    deferred.resolve(response.data);
                } else {
                    deferred.reject(response.data);
                }
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        /**
         * getAvatarObject
         */
        vm.getImageObject = function (data) {
            var deferred = $q.defer();
            if (angular.isUndefined(data.uuid) || data.uuid == '' ||
                angular.isUndefined(data.type) || data.type == '') {
                deferred.resolve({
                    success: false,
                    message: 'PARAMS_NOT_FOUND_TEXT'
                });
                return deferred.promise;
            }

            AppHttp.post('/app/object-image/getObject', data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        vm.removeImage = function (data) {
            var deferred = $q.defer();

            if (angular.isUndefined(data.uuid) || data.uuid == '' ||
                angular.isUndefined(data.type) || data.type == '') {
                deferred.resolve({
                    success: true,
                    message: 'PARAMS_NOT_FOUND_TEXT'
                });
                return deferred.promise;
            }

            AppHttp.delete('/app/object-image/removeImage/' + data.uuid, data).then(function (response) {
                if (angular.isDefined(response.data.success) && response.data.success == true) {
                    deferred.resolve(response.data);
                } else {
                    deferred.reject(response.data);
                }
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

    }

})();
