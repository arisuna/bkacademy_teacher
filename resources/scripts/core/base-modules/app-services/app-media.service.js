(function () {
    'use strict';

    angular
        .module('app.app-services')
        .service('AppMediaService', AppMediaService);

    AppMediaService.$inject = ['$window', '$http', '$q', '$httpParamSerializer', '$localStorage', '$filter', 'moment', 'AppHttp', 'FileUploader', 'WaitingService'];

    function AppMediaService($window, $http, $q, $httpParamSerializer, $localStorage, $filter, moment, AppHttp, FileUploader, WaitingService) {
        var vm = this;

        vm.config = {
            queueLimit: 10,
            maxSizeLimit: 26214400,
            avatarType: 'avatar',
            logoType: 'logo',
            defaultUploadUrl: __env.apiHostname + '/app/media/upload',
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


        vm.getFileTypeFromExtension = function (fileExtension) {
            var fileType = null;
            angular.forEach(vm.data.file_types, function (typeValue, typeIndex) {
                angular.forEach(typeValue, function (extension) {
                    if (extension == fileExtension) {
                        fileType = typeIndex;
                    }
                })
            });
            return fileType;
        };

        vm.getFileTypeList = function () {
            return vm.data.file_types;
        };

        vm.searchMediaFromLibrary = function (data) {
            var deferred = $q.defer();
            AppHttp.put('/app/media/index', data).then(function (response) {
                if (angular.isDefined(response.data.success) && response.data.success == true) {
                    deferred.resolve(response.data);
                } else {
                    deferred.reject(response.data);
                }
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /*** media and data ***/
        this.getAttachments = function (data) {
            var deferred = $q.defer();
            if (angular.isUndefined(data.uuid) || data.uuid == '') {
                deferred.reject({success: false});
            } else {
                AppHttp.put('/app/attachments/list/' + data.uuid, data).then(function (response) {
                    if (angular.isDefined(response.data.success) && response.data.success == true) {
                        deferred.resolve(response.data);
                    } else {
                        deferred.reject(response.data);
                    }
                }).catch(function (err, status) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }

        /*** media and data ***/
        this.getAttachmentsWithMe = function (data) {
            var deferred = $q.defer();
            AppHttp.put('/app/attachments/listSharedWithMe/', data).then(function (response) {
                if (angular.isDefined(response.data.success) && response.data.success == true) {
                    deferred.resolve(response.data);
                } else {
                    deferred.reject(response.data);
                }
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });

            return deferred.promise;
        }

        /**
         * upload Media By URL SINGLE FILE
         * @param data
         * @returns {*}
         */
        this.upload = function (data) {
            var deferred = $q.defer();
            if (data != undefined) {
                AppHttp.post('/app/media/upload', data).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                    deferred.reject(err.data);
                });
            } else {
                deferred.resolve({success: false});
            }
            return deferred.promise;
        }


        /**
         * upload file
         * @param uuid
         * @param attachments
         * @param objectType
         */
        this.attachMultipleFiles = function (data) {
            var deferred = $q.defer();

            if (angular.isUndefined(data.uuid) || data.uuid == '' ||
                angular.isUndefined(data.attachments) || data.attachments == null) {
                deferred.reject({
                    success: false,
                    message: 'DATA_NOT_FOUND_TEXT',
                });
            } else {
                AppHttp.post('/app/attachments/attachMultipleFiles', {
                    uuid: data.uuid,
                    employeeUuid: !_.isNull(data.employeeUuid) ? data.employeeUuid : null,
                    companyUuid: !_.isNull(data.companyUuid) ? data.companyUuid : null,
                    attachments: data.attachments,
                    shared: angular.isDefined(data.shared) ? data.shared : null,
                    type: angular.isDefined(data.type) ? data.type : "document",
                    objectNameRequired: angular.isDefined(data.objectNameRequired) ? data.objectNameRequired : ""
                }).then(function (response) {
                    if (angular.isDefined(response.data.success) && response.data.success == true) {
                        deferred.resolve(response.data);
                    } else {
                        deferred.reject(response.data);
                    }
                }).catch(function (err) {
                    deferred.reject(err.data);
                });

            }
            return deferred.promise;
        }
        /**
         * Attache One FILE TO Enity Object
         * @param data
         * @returns {*}
         */
        vm.attachSingleFile = function (data) {
            var deferred = $q.defer();
            AppHttp.post('/app/attachments/attachSingleFile', {
                uuid: data.uuid,
                file: data.file,
                objectNameRequired: data.objectNameRequired,
                type: data.type
            }).then(function (response) {
                if (angular.isDefined(response.data.success) && response.data.success == true) {
                    deferred.resolve(response.data);
                } else {
                    deferred.reject(response.data);
                }
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         * Remove an attachemnt
         * @param data
         * @returns {*}
         */
        vm.removeAttachment = function (data) {
            var deferred = $q.defer();

            // if (angular.isUndefined(data.object_uuid) || data.object_uuid == '' ||
            //     angular.isUndefined(data.media_uuid) || data.media_uuid == '') {
            //     deferred.resolve({
            //         success: true,
            //         message: 'DATA_NOT_FOUND_TEXT'
            //     });
            //     return deferred.promise;
            // }

            AppHttp.put('/app/attachments/remove', {
                'object_uuid': angular.isDefined(data.object_uuid) ? data.object_uuid : null,
                'media_uuid': angular.isDefined(data.media_uuid) ? data.media_uuid : null,
                'media_attachment_uuid': angular.isDefined(data.media_attachment_uuid) ? data.media_attachment_uuid : null,
                'type': angular.isDefined(data.type) ? data.type : null,
            }).then(function (response) {
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
         * Remove an attachemnt
         * @param data
         * @returns {*}
         */
        vm.removeMultipleAttachments = function (data) {
            var deferred = $q.defer();

            if (angular.isUndefined(data.media_attachment_uuids) || data.media_attachment_uuids == '') {
                deferred.resolve({
                    success: false,
                    message: 'DATA_NOT_FOUND_TEXT'
                });
                return deferred.promise;
            }

            AppHttp.put('/app/attachments/removeMultiple', {
                'media_attachment_uuids': angular.isDefined(data.media_attachment_uuids) ? data.media_attachment_uuids : null,
                'type': angular.isDefined(data.type) ? data.type : null,
                'object_uuid': angular.isDefined(data.object_uuid) ? data.object_uuid : null,
            }).then(function (response) {
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
         * Remove an attachemnt
         * @param data
         * @returns {*}
         */
        vm.removeMultipleMedias = function (data) {
            var deferred = $q.defer();

            if (angular.isUndefined(data.media_uuids) || data.media_uuids == '') {
                deferred.resolve({
                    success: false,
                    message: 'DATA_NOT_FOUND_TEXT'
                });
                return deferred.promise;
            }

            AppHttp.put('/app/media/removeMultiple', {
                'media_uuids': angular.isDefined(data.media_uuids) ? data.media_uuids : null,
            }).then(function (response) {
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
         * upload Media By URL SINGLE FILE
         * @param data
         * @returns {*}
         */
        this.uploadMediaByUrlSingleFile = function (data) {
            var deferred = $q.defer();
            if (data != undefined) {
                AppHttp.post('/app/media/uploadByUrl', {
                    uuid: data.uuid != undefined ? data.uuid : '',
                    url: data.url
                }).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                    deferred.reject(err.data);
                });
            } else {
                deferred.resolve({success: false});
            }
            return deferred.promise;
        }

        this.upload = function (data) {
            var deferred = $q.defer();
            if (data != undefined) {
                AppHttp.post('/app/media/upload', data).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                    deferred.reject(err.data);
                });
            } else {
                deferred.resolve({success: false});
            }
            return deferred.promise;
        }

        /**
         * Upload Media By Url Multiple
         * @param data
         * @returns {*}
         */
        this.uploadMediaByUrlMultipleFile = function (data) {
            var deferred = $q.defer();
            if (data != undefined) {
                var promises = [];
                angular.forEach(data.images, function (image) {
                    promises.push(vm.uploadMediaByUrlSingleFile({
                        uuid: data.uuid,
                        url: image
                    }).then(
                        function (res) {
                            if (res.success) {
                                return res.data;
                            } else {
                                deferred.reject(res);
                            }
                        },
                        function (err) {
                            deferred.reject(err);
                        }))
                });

                $q.all(promises).then(function (res) {
                    var resultFinal = {
                        success: true,
                        data: res,
                    };
                    deferred.resolve(resultFinal);
                }, function (err) {
                    deferred.reject(res);
                });

            } else {
                deferred.resolve({success: false});
            }
            return deferred.promise;
        }
        /**
         * get Binary Data of Media File From URL Source
         * @param url
         * @returns {*}
         */
        this.getBinaryDataFromUrl = function (url) {
            console.log(url);
            var deferred = $q.defer();

            AppHttp.get(url, {responseType: "arraybuffer"})
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.uploadToS3 = function (url) {
            let deferred = $q.defer();

            $http.put(url, {}).then(function (response) {
                deferred.resolve(response.data);
            })

            return deferred.promise;
        }

        /**
         * Uploader Engine
         * @param uploadParams
         * @returns {*}
         */
        vm.createFileUploaderEngine = function (uploadParams) {
            var uploadUrl = vm.config.defaultUploadUrl;

            if (uploadParams) {
                if (angular.isDefined(uploadParams.folderUuid) && angular.isString(uploadParams.folderUuid) && uploadParams.folderUuid != null && uploadParams.folderUuid != '') {
                    uploadUrl = uploadUrl + '/' + uploadParams.folderUuid;
                    uploadUrl = uploadUrl + '?folderUuid=' + uploadParams.folderUuid;
                }
                if (angular.isDefined(uploadParams.isHidden) && uploadParams.isHidden) {
                    uploadUrl = uploadUrl + '?isHidden=true';
                }
                if (angular.isDefined(uploadParams.isPrivate) && uploadParams.isPrivate) {
                    uploadUrl = uploadUrl + '?isPrivate=true';
                }
                if (angular.isDefined(uploadParams.isPublic) && uploadParams.isPublic) {
                    uploadUrl = uploadUrl + '?isPublic=true';
                }

                uploadUrl = uploadUrl + '?objectUuid=' + uploadParams.objectUuid + '&objectName=' + uploadParams.objectName;
                console.log("createFileUploaderEngine", uploadUrl, uploadParams)
            }

            var uploader = new FileUploader({
                url: uploadUrl,
                method: 'PUT',
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
                removeAfterUpload: angular.isDefined(uploadParams) && angular.isDefined(uploadParams.removeAfterUpload) ? uploadParams.removeAfterUpload : true,
                queueLimit: angular.isDefined(uploadParams) && angular.isDefined(uploadParams.limit) ? uploadParams.limit : vm.config.queueLimit
            });

            uploader.onBeforeUpload = function (fileItem) {
                // console.log(fileItem);
            };

            uploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/, filter, options) {
                //console.info('onWhenAddingFileFailed', item, filter, options);
            };
            uploader.onAfterAddingFile = function (fileItem) {
                // console.info('onAfterAddingFile========: ', {'name': fileItem.file.name, 'type': fileItem.file.type});
                vm.getUploadUrl({
                    'name': fileItem.file.name,
                    'type': fileItem.file.type,
                    'objectUuid': uploadParams.objectUuid,
                }).then(function (res) {
                    if (res.success) {
                        fileItem.uuid = res.uuid;

                        $.ajax({
                            url: res.data,
                            method: 'PUT',
                            data: fileItem._file,
                            headers: uploader.headers,
                            processData: false,
                            success: function (d) {
                                fileItem.formData = [];
                                uploader.formData = [];
                                uploader.uploadAll();
                            }, error: function (err) {
                                throw new Error(err);
                            }
                        });

                    } else {
                        console.log('ERROR======', res);
                    }
                }, function (err) {
                    console.log('ERROR======', res);
                });
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
         * Setup Uploader Folder Upload Url
         * @param uploader
         * @param folderUuid
         * @returns {*}
         */
        vm.setUploaderFolderUploadUrl = function (uploader, folderUuid) {
            var uploadUrl = vm.getFolderUploadUrl();
            uploader.onBeforeUploadItem = function (item) {
                item.url = uploadUrl;
            };
            return uploader;
        }
        /**
         * get Folder Upload Url
         * @param folderUuid
         * @returns {string|*}
         */
        vm.getFolderUploadUrl = function (folderUuid) {
            var uploadUrl = vm.config.defaultUploadUrl;
            if (folderUuid !== undefined && folderUuid != '') {
                uploadUrl = uploadUrl + '?folderUuid=' + folderUuid;
            }
            return uploadUrl
        }

        /**
         * upload
         * @param item
         */
        vm.downloadMediaByUrl = function (item) {
            $window.location.href = item.image_data.url_download;
        };

        /**
         * upload Image Public
         * @param formData
         * @returns {*}
         */
        vm.uploadImagePublic = function (formData) {
            var deferred = $q.defer();
            AppHttp.post('/app/media/uploadImagePublic', formData, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            }).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        /**
         * upload File Public
         * @param formData
         * @returns {*}
         */
        vm.uploadPublic = function (formData) {
            var deferred = $q.defer();
            AppHttp.post('/app/media/uploadPublic', formData, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            }).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };
        /**
         * make Media Public
         * @param uuid
         * @returns {*}
         */
        vm.makeMediaPublic = function (uuid) {
            var deferred = $q.defer();
            AppHttp.put('/app/media/makePublic/' + uuid).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        /**
         * make Media Public
         * @param uuid
         * @returns {*}
         */
        vm.getUploadUrl = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/app/media/getUploadUrl', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        /**
         * remove the Media FIle and the attachments from all;
         * @param data
         * @returns {*}
         */
        vm.removeMedia = function (uuid) {
            var deferred = $q.defer();

            if (angular.isUndefined(uuid) || uuid == '') {
                deferred.resolve({
                    success: true,
                    message: 'DATA_NOT_FOUND_TEXT'
                });
                return deferred.promise;
            }

            AppHttp.delete('/app/media/remove/' + uuid).then(function (response) {
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
         * remove the Media FIle and the attachments from all;
         * @param data
         * @returns {*}
         */
        vm.renameMedia = function (data) {
            var deferred = $q.defer();

            if (angular.isUndefined(data.uuid) || data.uuid == '' ||
                angular.isUndefined(data.name) || data.name == '') {
                deferred.resolve({
                    success: true,
                    message: 'DATA_NOT_FOUND_TEXT'
                });
                return deferred.promise;
            }

            AppHttp.put('/app/media/rename/' + data.uuid, data).then(function (response) {
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
         * move the Media File to another folder;
         * @param data
         * @returns {*}
         */
        vm.moveMedia = function (data) {
            var deferred = $q.defer();

            if (angular.isUndefined(data.uuid) || data.uuid == '' ||
                angular.isUndefined(data.folder_uuid) || data.folder_uuid == '') {
                deferred.resolve({
                    success: true,
                    message: 'DATA_NOT_FOUND_TEXT'
                });
                return deferred.promise;
            }

            AppHttp.put('/app/media/moveFile/' + data.uuid, data).then(function (response) {
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
         * move the Attachment File to folder;
         * @param data
         * @returns {*}
         */
        vm.moveAttachment = function (data) {
            console.log('function running');
            var deferred = $q.defer();

            if (angular.isUndefined(data.uuid) || data.uuid == '' ||
                angular.isUndefined(data.folder_uuid)) {
                deferred.resolve({
                    success: true,
                    message: 'DATA_NOT_FOUND_TEXT'
                });
                return deferred.promise;
            }

            AppHttp.put('/app/attachments/moveAttachment/' + data.uuid, data).then(function (response) {
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
         * create folder of the current user
         * @returns {*}
         */
        vm.createMyFolder = function (data) {
            var deferred = $q.defer();

            if (angular.isUndefined(data.name) || data.name == '') {
                deferred.resolve({
                    success: true,
                    message: 'DATA_NOT_FOUND_TEXT'
                });
                return deferred.promise;
            }

            AppHttp.post('/app/media/createMyFolder', data).then(function (response) {
                if (angular.isDefined(response.data.success) && response.data.success == true) {
                    deferred.resolve(response.data);
                } else {
                    deferred.reject(response.data);
                }
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         * create folder of the assignee
         * @returns {*}
         */
        vm.createAssigneeFolder = function (data) {
            var deferred = $q.defer();

            if (angular.isUndefined(data.name) || data.name == ''
                || angular.isUndefined(data.employeeUuid) || data.employeeUuid == '') {
                deferred.resolve({
                    success: true,
                    message: 'DATA_NOT_FOUND_TEXT'
                });
                return deferred.promise;
            }

            AppHttp.post('/app/media/createAssigneeFolder', data).then(function (response) {
                if (angular.isDefined(response.data.success) && response.data.success == true) {
                    deferred.resolve(response.data);
                } else {
                    deferred.reject(response.data);
                }
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        /**
         * get the current folders of the current user profile
         * @returns {*}
         */
        vm.getMyFoldersList = function (data) {
            var deferred = $q.defer();
            AppHttp.put('/app/media/getMyFoldersList', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         * get the current folders of the assignee
         * @returns {*}
         */
        vm.getAssigneeFoldersList = function (data) {
            var deferred = $q.defer();
            if (angular.isUndefined(data.employeeUuid) || data.employeeUuid == '') {
                deferred.resolve({
                    success: true,
                    message: 'DATA_NOT_FOUND_TEXT'
                });
                return deferred.promise;
            }
            AppHttp.put('/app/media/getAssigneeFoldersList', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         * remove the Media FIle and the attachments from all;
         * @param data
         * @returns {*}
         */
        vm.renameFolder = function (data) {
            var deferred = $q.defer();

            if (angular.isUndefined(data.uuid) || data.uuid == '' ||
                angular.isUndefined(data.name) || data.name == '') {
                deferred.resolve({
                    success: true,
                    message: 'DATA_NOT_FOUND_TEXT'
                });
                return deferred.promise;
            }

            AppHttp.put('/app/media/renameFolder/' + data.uuid, data).then(function (response) {
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
         * remove the Media FIle and the attachments from all;
         * @param data
         * @returns {*}
         */
        vm.removeFolder = function (data) {

            var deferred = $q.defer();

            if (angular.isUndefined(data.password) || data.password == '' ||
                angular.isUndefined(data.uuid) || data.uuid == '') {
                deferred.reject({
                    success: false,
                    message: 'DATA_NOT_FOUND_TEXT'
                });
                return deferred.promise;
            }

            AppHttp.put('/app/media/removeFolder', data).then(function (response) {
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
         * Add Folder to Media (attache Media to Folder)
         * @param data
         * @returns {*}
         */
        vm.addMediaToFolder = function (data) {
            var deferred = $q.defer();

            if (angular.isUndefined(data.folderUuid) || data.folderUuid == '' ||
                angular.isUndefined(data.mediaUuid) || data.mediaUuid == '') {
                deferred.resolve({
                    success: true,
                    message: 'DATA_NOT_FOUND_TEXT'
                });
                return deferred.promise;
            }

            AppHttp.put('/app/media/addMediaToFolder', data).then(function (response) {
                if (angular.isDefined(response.data.success) && response.data.success == true) {
                    deferred.resolve(response.data);
                } else {
                    deferred.reject(response.data);
                }
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        /**
         * check if Media File Name Exists
         * @param data
         * @returns {*}
         */
        vm.checkMediaName = function (data) {
            var deferred = $q.defer();

            if (angular.isUndefined(data.name) || data.name == '') {
                deferred.resolve({
                    success: true,
                    message: 'DATA_NOT_FOUND_TEXT'
                });
                return deferred.promise;
            }

            AppHttp.put('/app/media/checkMediaName', data).then(function (response) {
                if (angular.isDefined(response.data.success) && response.data.success == true) {
                    deferred.resolve(response.data);
                } else {
                    deferred.reject(response.data);
                }
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }
        /**
         * return size total of Users Private Media Library
         * @returns {*}
         */
        vm.getUserTotalSize = function () {
            var deferred = $q.defer();
            AppHttp.get('/app/media/getUserMediaSize').then(function (response) {
                if (angular.isDefined(response.data.success) && response.data.success == true) {
                    deferred.resolve(response.data);
                } else {
                    deferred.reject(response.data);
                }
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         *  Replace Single file
         * Uploader Engine
         * @param uploadParams
         * @returns {*}
         */
        vm.replaceMediaContent = function (uploadParams) {
            let uploadUrl = __env.apiHostname + '/app/media/replaceMediaContent';
            let uploader = new FileUploader({
                url: uploadUrl,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Token-Key': window.localStorage.getItem('token_key')
                },
                formData: [
                    {}
                ],
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
         * Make a media copy
         * @param data
         * @returns {*}
         */
        vm.copyMediaItem = function (data) {
            var deferred = $q.defer();

            if (angular.isUndefined(data.uuid) || data.uuid == '') {
                deferred.resolve({
                    success: true,
                    message: 'DATA_NOT_FOUND_TEXT'
                });
                return deferred.promise;
            }

            AppHttp.post('/app/media/copyMedia', data).then(function (response) {
                if (angular.isDefined(response.data.success) && response.data.success == true) {
                    deferred.resolve(response.data);
                } else {
                    deferred.reject(response.data);
                }
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         * Change Media Status (Private or Public)
         * @param data
         * @returns {*}
         */
        vm.changeMediaStatus = function (data) {
            var deferred = $q.defer();

            if (angular.isUndefined(data.isPrivate) ||
                angular.isUndefined(data.mediaUuid) || data.mediaUuid == '') {
                deferred.resolve({
                    success: false,
                    message: 'DATA_NOT_FOUND_TEXT'
                });
                return deferred.promise;
            }

            AppHttp.put('/app/media/changeMediaStatus', data).then(function (response) {
                if (angular.isDefined(response.data.success) && response.data.success == true) {
                    deferred.resolve(response.data);
                } else {
                    deferred.reject(response.data);
                }
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         * Add Folder to Media (attache Media to Folder)
         * @param data
         * @returns {*}
         */
        vm.addFolderToMedia = function (data) {
            var deferred = $q.defer();

            if (angular.isUndefined(data.folderUuid) || data.folderUuid == '' ||
                angular.isUndefined(data.mediaUuid) || data.mediaUuid == '') {
                deferred.resolve({
                    success: true,
                    message: 'DATA_NOT_FOUND_TEXT'
                });
                return deferred.promise;
            }

            AppHttp.put('/app/media/addMediaToFolder', data).then(function (response) {
                if (angular.isDefined(response.data.success) && response.data.success == true) {
                    deferred.resolve(response.data);
                } else {
                    deferred.reject(response.data);
                }
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        vm.checkExistedAttachments = function (uuid) {
            var deferred = $q.defer();
            if (angular.isUndefined(uuid) || uuid == '') {
                deferred.resolve(false);
            }
            AppHttp.get('/app/attachments/checkExitedAttachments/' + uuid)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        /**
         * Clone multiple attachments
         * @param data
         * @returns {*}
         */
        vm.copyMultipleAttachments = function (data) {
            var deferred = $q.defer();

            if (angular.isUndefined(data.attachment_uuids) || data.attachment_uuids == '') {
                deferred.resolve({
                    success: false,
                    message: 'DATA_NOT_FOUND_TEXT'
                });
                return deferred.promise;
            }

            AppHttp.put('/app/attachments/copyMultipleFiles', data).then(function (response) {
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

        vm.getAttachment = function (data) {
            var deferred = $q.defer();
            if (angular.isUndefined(data.uuid) || data.uuid == '' ||
                angular.isUndefined(data.type) || data.type == '') {
                deferred.resolve({
                    success: false,
                    message: 'PARAMS_NOT_FOUND_TEXT'
                });
                return deferred.promise;
            }

            AppHttp.post('/app/attachments/getAttachment', data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }
    }
})();
