(function () {
    'use strict';

    angular
        .module('app.app-directives-media-zone')
        .controller('AppMediaItemController', AppMediaItemController);

    AppMediaItemController.$inject = ['$scope', '$window', '$timeout', '$location', 'AppMediaService', 'urlBase', 'WaitingService', 'AppAuthService', '$rootScope', 'HistoryService'];

    function AppMediaItemController($scope, $window, $timeout, $location, AppMediaService, urlBase, WaitingService, AppAuthService, $rootScope, HistoryService) {

        $scope.currentUser = AppAuthService.getUser();

        $scope.currentCompany = AppAuthService.getCompany();

        $scope.downloadItem = function (item) {
            $window.location.href = item.image_data.url_download;
        };

        $scope.selectItemFn = function () {
            if (angular.isFunction($scope.ngSelectClick)) {
                $scope.ngSelectClick();
            }
        };

        $scope.selectAttachmentFn = function () {
            if (angular.isFunction($scope.attachmentSelect)) {
                $scope.attachmentSelect();
            }
        };

        $scope.removeAttachmentItem = function (item) {
            console.log(item);
            console.log($scope.object);
            WaitingService.questionSimple('DO_YOU_WANT_TO_DELETE_DOCUMENT_TEXT', function () {
                // $scope.$apply();
                if(angular.isDefined(item.media_attachment_uuid) && item.media_attachment_uuid != null && item.media_attachment_uuid != ""){
                    AppMediaService.removeAttachment({
                        'media_attachment_uuid': angular.isDefined(item.media_attachment_uuid) ? item.media_attachment_uuid : null,
                        'object_uuid': $scope.objectUuid,
                        'media_uuid': item.media_attachments.media_uuid,
                        'type':  $scope.objectType
                    }).then(function (res) {
                        if (res.success) {
                            WaitingService.popSuccess('FILE_DELETE_SUCCESS_TEXT');
                            $scope.publish('MediaUpdateDocument', {isUpdate: true});
                            $scope.publish('reload_thumb', {reload: true});
                            if (angular.isDefined($scope.object) && angular.isDefined($scope.object.uuid)){
                                $scope.publish('check_attachment_existed', $scope.object.uuid);
                            }

                            if (angular.isUndefined($scope.object) && angular.isDefined($scope.uuid)) {
                                $scope.publish('check_attachment_existed', $scope.uuid);
                            }
                            $scope.onDelete({item: item});
                        } else {
                            WaitingService.error(res.message);
                        }
                    }).catch(function (err) {
                        WaitingService.popError(err.message);
                    });
                }else{
                    $scope.$evalAsync(function () {
                        if (angular.isFunction($scope.onDelete)) {
                            $scope.onDelete({item: item});
                        }
                    });
                    WaitingService.end();
                }

            });
        };

        $scope.removeMediaItem = function (item) {
            WaitingService.questionSimple('DO_YOU_WANT_TO_DELETE_DOCUMENT_TEXT', function () {
                // $scope.$apply();
                if (item.uuid && item.uuid != "") {
                    AppMediaService.removeMedia(item.uuid).then(function (res) {
                        if (res.success) {
                            WaitingService.popSuccess('FILE_DELETE_SUCCESS_TEXT');
                            if (angular.isFunction($scope.onDelete)) {
                                $scope.onDelete({item: item});
                            }
                        } else {
                            WaitingService.error(res.message);
                        }
                    }).catch(function (err) {
                        WaitingService.error(err.message);
                    });
                } else {
                    if (angular.isFunction($scope.onDelete)) {
                        $scope.onDelete({item: item});
                    }
                    WaitingService.end();
                }
            });
        };

        $scope.renameMediaItem = function (item) {
            WaitingService.questionWithInputText('', 'YOUR_FILE_NAME_TEXT', $scope.item.name, function (inputValue) {
                $scope.$apply();
                if (item && item.uuid != "") {
                    AppMediaService.renameMedia({uuid: item.uuid, name: inputValue}).then(function (res) {
                        if (res.success) {
                            WaitingService.popSuccess('DOCUMENT_RENAME_SUCCESS_TEXT');
                            $scope.$evalAsync(function () {
                                $scope.item = res.data;
                                $scope.selectItemFn();
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
        };

        $scope.removeItem = function (item) {
            if ($scope.isMedia == true) {
                return $scope.removeMediaItem(item);
            } else {
                return $scope.removeAttachmentItem(item);
            }
        };


        $scope.moveMediaItem = function (item) {
            let oldFolderUuid = item.folder_uuid;
            WaitingService.promptWithSelect('MOVE_FILE_TEXT', $scope.folders, oldFolderUuid,  function (inputValue) {
                $scope.$apply();
                if (item && item.uuid != "") {
                    AppMediaService.moveMedia({uuid: item.uuid, folder_uuid: inputValue}).then(function (res) {
                        if (res.success) {
                            WaitingService.popSuccess('FILE_MOVE_SUCCESS_TEXT');
                            $scope.$evalAsync(function () {
                                $scope.item = res.data;
                                if(Object.keys($scope.currentFolder).length > 0){
                                    if($scope.item.folder_uuid !== $scope.currentFolder.uuid){
                                        $scope.onDelete({item: item});
                                    }
                                }else{
                                    $scope.selectItemFn();
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
            }, function(){
                WaitingService.end();
            });
        };

        $scope.changeMediaStatus = function (item) {
            if (item && item.uuid != "") {
                let params = {
                    mediaUuid: item.uuid,
                    isPrivate: item.is_private
                };
                AppMediaService.changeMediaStatus(params).then(function (res) {
                    if (res.success) {
                        WaitingService.popSuccess('FILE_CHANGE_SUCCESS_TEXT');
                        $scope.$evalAsync(function () {
                            $scope.item = res.data;
                            console.log('$scope.currentFolder', $scope.currentFolder);
                            if (!angular.isDefined($scope.currentFolder.id)){
                                $scope.onDelete({item: item});
                            }

                            // $scope.selectItemFn();
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
        };

        // Copy media
        $scope.copyMediaAddAttachmentFile = function(item, data = {}){
            if (item && item.uuid != "") {
                AppMediaService.copyMediaItem({uuid: item.uuid}).then(function (res) {
                    if (res.success) {
                        if (!_.isEmpty(data)){
                            if (angular.isDefined($scope.settingActive) && $scope.settingActive == 0){
                                let _mediaIndex = _.findIndex($scope.items, function(o){return o.uuid == item.uuid});
                                $scope.items[_mediaIndex].can_attach_to_my_library = false;
                            }
                            if ($scope.isAttachment){
                                let _attachIndex = _.findIndex($scope.items, function(o){return o.media_attachment_uuid == item.media_attachment_uuid});
                                $scope.items[_attachIndex].can_attach_to_my_library = false;
                            }
                            //Update media uuid
                            data.attachments = res.data.uuid;
                            AppMediaService.attachMultipleFiles(data).then(function (res) {
                                WaitingService.end();
                                if (res.success) {

                                    if (angular.isDefined($scope.object) && angular.isDefined($scope.object.uuid)){
                                        $scope.publish('check_attachment_existed', $scope.object.uuid);
                                    }

                                    if (angular.isUndefined($scope.object) && angular.isDefined($scope.uuid)) {
                                        $scope.publish('check_attachment_existed', $scope.uuid);
                                    }

                                    //Update file on object detail
                                    $scope.publish('MediaUpdateDocument', {isUpdate: true});
                                    WaitingService.popSuccess(res.message);

                                } else {
                                    if (angular.isDefined(res.message)){
                                        WaitingService.popError(res.message);
                                    } else{
                                        WaitingService.popError('ATTACH_FILE_FAILED_TEXT');
                                    }

                                }
                            }, function (err) {
                                WaitingService.end();
                                if (angular.isDefined(err.detail) && angular.isDefined(err.detail.file_name) && angular.isDefined(err.detail.message)) {
                                    WaitingService.errorWithTitle(err.detail.file_name, err.detail.message);
                                    WaitingService.popError(err.detail.message);
                                    return;
                                }if (angular.isDefined(err.message)){
                                    WaitingService.popError(err.message);
                                    return;
                                } else {
                                    WaitingService.popExpire();
                                }
                            })
                        }else{
                            WaitingService.popSuccess(res.message);
                            if (angular.isDefined($scope.settingActive) && $scope.settingActive == 1){
                                $scope.item = res.data;
                                $scope.items.push(res.data);
                            }
                            if (angular.isDefined($scope.settingActive) && $scope.settingActive == 0){
                                let _mediaIndex = _.findIndex($scope.items, function(o){return o.uuid == item.uuid});
                                $scope.items[_mediaIndex].can_attach_to_my_library = false;
                            }

                            if ($scope.isAttachment){
                                let _attachIndex = _.findIndex($scope.items, function(o){return o.media_attachment_uuid == item.media_attachment_uuid});
                                $scope.items[_attachIndex].can_attach_to_my_library = false;
                            }

                        }


                    } else {
                        WaitingService.error(res.message);
                    }
                }).catch(function (err) {
                    WaitingService.error(err.message);
                });
            } else {
                WaitingService.end();
            }
        }

        $scope.copyMediaItem = function (item) {
            WaitingService.questionSimple('QUESTION_COPY_MEDIA_TEXT', function () {
                $scope.copyMediaAddAttachmentFile(item)
            });
        };

        // $scope.copyToDsp = function (item) {
        //     WaitingService.questionSimple('QUESTION_COPY_MEDIA_TEXT', function () {
        //         let data = {
        //             uuid: $scope.folderDspUuid,
        //             attachments: item.uuid,
        //             employeeUuid: null,
        //             companyUuid: null,
        //             shared: false,
        //             type: null,
        //         }
        //         $scope.copyMediaAddAttachmentFile(item, data);
        //     });
        // };

        $scope.copyToHr = function (item) {
            WaitingService.questionSimple('QUESTION_COPY_MEDIA_TEXT', function () {
                let data = {
                    uuid: $scope.folderHrUuid,
                    attachments: item.uuid,
                    employeeUuid: null,
                    companyUuid: $scope.companyUuid,
                    shared: true,
                    type: null,
                }
                $scope.copyMediaAddAttachmentFile(item, data);
            });
        };

        $scope.copyToAssignee = function (item) {
            WaitingService.questionSimple('QUESTION_COPY_MEDIA_TEXT', function () {
                let data = {
                    uuid: $scope.folderEeUuid,
                    attachments: item.uuid,
                    employeeUuid: $scope.employeeUuid,
                    companyUuid: null,
                    shared: true,
                    nullFolder: 1,
                    type: null,
                };
                $scope.copyMediaAddAttachmentFile(item, data);
            });
        };
        //Replace media

        var uploader = $scope.newUploader = AppMediaService.replaceMediaContent();

        uploader.onBeforeUploadItem = function(fileItem) {
            fileItem.formData.push({ uuid: $scope.item.uuid, });
        };

        uploader.onAfterAddingFile = function (fileItem) {
            WaitingService.begin();
            $scope.newUploader.uploadAll();
        };

        uploader.onSuccessItem = function (fileItem, response, status, headers) {
            WaitingService.end();
            if (response.success == true) {
                $scope.item = response.data;
                WaitingService.popSuccess(response.message);
            }else{
                WaitingService.error(response.message);
            }
        };

        uploader.onErrorItem = function (fileItem, response, status, headers) {
            WaitingService.end();
            if (angular.isDefined(response.message)) {
                WaitingService.errorWithTitle(fileItem.file.name, response.message);
            }
        };

        // Shared with Assignee
        $scope.moveAttachmentItem = function (item) {
            let oldFolderUuid = item.assignee_folder_uuid;
            WaitingService.promptWithSelect('MOVE_FILE_TEXT', $scope.assigneeFolders, oldFolderUuid,  function (inputValue) {
                // $scope.$apply();
                if (item && item.media_attachment_uuid != "" && inputValue != null && inputValue != '') {
                    AppMediaService.moveAttachment({uuid: item.media_attachment_uuid, folder_uuid: inputValue}).then(function (res) {
                        if (res.success) {
                            WaitingService.popSuccess('FILE_MOVE_SUCCESS_TEXT');
                            $scope.$evalAsync(function () {
                                $scope.item = res.data;
                                if(Object.keys($scope.currentAssigneeFolder).length > 0){
                                    if($scope.item.assignee_folder_uuid !== $scope.currentAssigneeFolder.uuid){
                                        $scope.onDelete({item: item});
                                    }
                                }else{
                                    $scope.onDelete({item: item});
                                }
                                $rootScope.$emit('assignmentUpdateDocument', {isUpdate: true});
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
            }, function(){
                WaitingService.end();
            });
        };

        $scope.moveFileOutOfFolder = function(item){
            WaitingService.questionSimple('QUESTION_MOVE_FILE_OUT_OF_FOLDER_TEXT', function () {
                // $scope.$apply();
                if (item && item.media_attachment_uuid != "") {
                    AppMediaService.moveAttachment({uuid: item.media_attachment_uuid, folder_uuid: null}).then(function (res) {
                        if (res.success) {
                            WaitingService.popSuccess('MOVE_FILE_OUT_OF_FOLDER_SUCCESS_TEXT');
                            if (angular.isFunction($scope.onDelete)) {
                                $scope.onDelete({item: item});
                            }
                            $rootScope.$emit('assignmentUpdateDocument', {isUpdate: true});
                        } else {
                            WaitingService.error(res.message);
                        }
                    }).catch(function (err) {
                        WaitingService.error(err.message);
                    });
                } else {
                    WaitingService.error('PARAMS_NOT_FOUND_TEXT');
                    WaitingService.end();
                }
            });
        };

        $scope.setThumb = function (item) {
            console.log('is_thumb', item);

            if (item && item.is_thumb) {
                WaitingService.begin();
                AppMediaService.setThumb({
                    uuid: item.media_attachment_uuid
                }).then(function (res) {
                    if (res.success) {
                        $scope.publish('reload_thumb', {reload: true});
                        $timeout(() => {
                            WaitingService.popSuccess('DATA_SAVE_SUCCESS_TEXT');
                            // WaitingService.end();
                        }, 500);
                    } else {
                        item.is_thumb = !item.is_thumb;
                        WaitingService.popError(res.message);
                        $timeout(() => {
                            WaitingService.popError(res.message);
                            WaitingService.end();
                        }, 500);
                    }
                }).catch(function (err) {
                    item.is_thumb = !item.is_thumb;
                    WaitingService.popError(err.message);
                    WaitingService.end();
                });
            } else {
                item.is_thumb = !item.is_thumb;
            }
        };

    }
})();
