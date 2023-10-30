(function () {
    'use strict';

    angular
        .module('app.app-directives-media-zone')
        .controller('AppMediaLibraryController', AppMediaLibraryController);

    AppMediaLibraryController.$inject = ['$scope', '$http', '$localStorage', '$timeout', 'ngDialog', 'toaster', 'urlBase', '$filter',
        'AppMediaService', 'WaitingService', '$window', '$rootScope',
        'AppSystem', 'AppAuthService', '$pusher'
    ];


    function AppMediaLibraryController($scope, $http, $localStorage, $timeout, ngDialog, toaster, urlBase, $filter,
                                       AppMediaService, WaitingService, $window, $rootScope,
                                       AppSystem, AppAuthService, $pusher) {
        console.log('objectType', $scope.objectType);
        $scope.settingActive = 1;

        $scope.totalItems = 0;
        $scope.isLoading = false;
        $scope.isLoadingMore = false;

        $scope.createFolder = function($event, type = ''){
            $event.preventDefault();
            $event.stopPropagation();

            $scope.createMyFolder();
        };



        $scope.gotoToFolders = function (folder, type) {
            let data = {};

            $scope.getFileList(data);
        };

        $scope.search = {
            fileType: '',
            query: '',
            folderUuid: '',
            creationDate: null,
            creationDateFolder: null,
            page: 0,
            isPrivate: true,
        };

        $scope.searchFolder = {
            query: '',
        };

        $scope.searchAttachment = {
            query: '',
            uuid: null,
            employeeUuid: null,
            companyUuid: null,
            shared: null,
            nullFolder: null,
            creationDate: null,
            folderUuid: '',
            page: 0,
        };

        $scope.folders = [];
        $scope.assigneeFolders = [];
        $scope.hrFolders = [];
        $scope.dspFolders = [];
        $scope.attachmentFolders = [];
        $scope.selectFolders = {};
        $scope.selectAssigneeFolders = {};
        $scope.selectAttachmentFolders = {};
        $scope.itemsSelect = [];
        $scope.attachmentsSelect = [];

        $scope.mediaItems = [];
        $scope.page = 1;
        $scope.numPerPage = 10;
        $scope.maxSize = 5;
        $scope.maxLength = 0;
        $scope.totalItems = 0;
        $scope.currentMedia = [];
        $scope.mediaTotalSize = 0;
        $scope.mediaTotalSizeHuman = '';
        $scope.mediaTotalFolders = 0;
        $scope.mediaMyItems = 0;
        $scope.mediaTotalItems = 0;
        $scope.loadCount = 0;
        $scope.currentPage = 1;
        $scope.totalPages = 1;

        $scope.loadAttachCount = 0;
        $scope.currentAttachPage = 1;
        $scope.totalAttachPages = 1;
        //scope.currentMediaId = 0;

        $scope.attachmentItems = [];

        $scope.displayModeValue = 1;
        $scope.$watch('displayModeValue', function () {
            if ($scope.displayModeValue == 1) {
                $scope.displayMode = 'list';
            } else {
                $scope.displayMode = 'grid';
            }
        });

        $scope.changeMode = function (mode) {
            $scope.displayModeValue = mode;
            if (mode == 1) {
                $scope.displayMode = 'list';
            } else {
                $scope.displayMode = 'grid';
            }
        };

        $scope.mediaContentWidth = $('.media-content').innerWidth();

        $scope.dataShared = {
            employeeUuid: $scope.employeeUuid,
            companyUuid: $scope.companyUuid,
            isShareDocument: $scope.isShareDocument,
            isShareHr: $scope.isShareHr,
            isShareAssignee: $scope.isShareAssignee,
            folderDspUuid: $scope.folderDspUuid,
            folderHrUuid: $scope.folderHrUuid,
            folderEeUuid: $scope.folderEeUuid,
        };

        $scope.pageChanged = function () {
        };

        $scope.getUserTotalSize = function () {
            AppMediaService.getUserTotalSize().then(
                function (res) {
                    if (res.success) {
                        $scope.mediaTotalSize = res.totalSize;
                        $scope.mediaTotalSizeHuman = res.totalSizeHuman;
                        $scope.mediaTotalFolders = res.totalFolders;
                        $scope.mediaTotalItems = res.totalItems;
                        $scope.mediaMyItems = res.myItems;
                    }
                }
            );
        };

        $scope.searchMedia = function () {
            $scope.isLoading = true;
            $scope.resetData();
            AppMediaService.searchMediaFromLibrary($scope.search).then(
                function (res) {
                    if (res.success) {
                        $scope.mediaItems = res.data;
                        $scope.totalItems = res.totalItems;
                        $scope.currentPage = res.page;
                        $scope.totalPages = res.total_pages;

                        $scope.checkStatusSelected($scope.mediaItems);
                    }
                    $timeout(function () {
                        $scope.isLoadingMore = false;
                        $scope.isLoading = false;
                    }, 200);
                },
                function () {
                    $timeout(function () {
                        $scope.isLoadingMore = false;
                        $scope.isLoading = false;
                    }, 200);
                }
            );

            $scope.getUserTotalSize();
        };

        $scope.loadMore = function () {
            if ($scope.isLoadingMore == false) {
                $scope.isLoadingMore = true;
                $scope.loadCount += 1;
                if ($scope.loadCount < $scope.totalPages) {
                    $scope.search.page = $scope.loadCount + 1;

                    AppMediaService.searchMediaFromLibrary($scope.search).then(function (res) {
                        if (res.success) {
                            $scope.mediaItems = _.concat($scope.mediaItems, res.data);
                            $scope.currentPage = res.page;
                            $scope.totalPages = res.total_pages;

                            $scope.checkStatusSelected($scope.mediaItems);
                        } else {
                            WaitingService.expire();
                        }
                        $timeout(function () {
                            $scope.isLoadingMore = false;
                            $scope.isLoading = false;
                        }, 200);
                    }, function () {
                        WaitingService.expire();
                        $timeout(function () {
                            $scope.isLoadingMore = false;
                            $scope.isLoading = false;
                        }, 200);
                    });
                } else {
                    $scope.isLoadingMore = false;
                    $scope.isLoading = false;
                }
            }
        };

        $scope.resetData = function () {
            $scope.loadCount = 0;
            $scope.currentPage = 1;
            $scope.totalPages = 1;
            $scope.search.page = 0;
        }

        $scope.initProcess = function () {
            $scope.currentFolder = {};
            $scope.loadCount = 0;
            $scope.search = {
                fileType: '',
                query: '',
                folderUuid: '',
                creationDate: null,
                creationDateFolder: null,
                page: 0,
                isPrivate: true,
            };
            $scope.searchMedia();
        };

        $scope.initProcess();


        // $scope.$watch('search.page', function () {
        //     $scope.searchMedia();
        // });

        // $scope.$watch('search.fileType', function () {
        //     $scope.searchMedia();
        // });

        $scope.$watch('search.creationDate', function (newValue, oldValue) {
            if (newValue != oldValue) {
                $scope.searchMedia();
            }

        });

        $scope.$watch('search.creationDateFolder', function (newValue, oldValue) {
            if (newValue != oldValue) {
                $scope.searchMedia();
            }

        });

        $scope.$watch('search.isPrivate', function (newValue, oldValue) {
            if (newValue != oldValue && newValue == true) {
                $scope.search.creationDate = null;
            }

        });

        $scope.$watch('searchAttachment.creationDate', function (newValue, oldValue) {
            console.log('searchAttachment.creationDate', newValue);
            if (newValue != oldValue) {
                $scope.getSharedWithMe();
            }

        });

        $scope.gotoMyFiles = function () {
            $scope.currentSharedFolder = "";
            if ($scope.settingActive != 1 || angular.isDefined($scope.currentFolder.id)) {
                $scope.settingActive = 1;
                $scope.currentFolder = {};
                $scope.search.folderUuid = null;
                // $scope.search.page = 0;
                $scope.search.isPrivate = true;
                $scope.searchMedia();
            }
        };

        $scope.gotoSharedWithEverybody = function () {
            $scope.currentSharedFolder = "";
            if ($scope.settingActive > 0) {
                $scope.currentFolder = {};
                $scope.settingActive = 0;

                $scope.search = {
                    fileType: '',
                    query: '',
                    folderUuid: '',
                    creationDate: null,
                    creationDateFolder: null,
                    page: 0,
                    isPrivate: false,
                };
                $scope.searchMedia();
            }
        }


        $scope.onAddItems = function (items) {
            console.info('onAddItems', items);
            $timeout(function () {
                $scope.getUserTotalSize();
                if (angular.isArray(items)) {
                    angular.forEach(items, function (item) {
                        $scope.mediaItems.unshift(item);
                    });
                } else {
                    $scope.mediaItems.unshift(items);
                }
            }, 1500);

        };

        $scope.$on('onCopyMediaItem', function (event, data) {
            if ($scope.settingActive != 1) {
                $scope.settingActive = 1;
            }
            $scope.gotoMyFiles();
            $scope.onAddItems(data.item);
            // $scope.selectMediaItem(data.item);
        });

        $scope.createMyFolder = function () {
            WaitingService.questionWithInputText('', 'YOUR_FOLDER_NAME_TEXT', '', function (inputValue) {
                // $scope.$apply();
                if (inputValue != '') {
                    AppMediaService.createMyFolder({name: inputValue}).then(function (res) {
                        if (res.success) {
                            WaitingService.popSuccess('FOLDER_CREATE_SUCCESS_TEXT');
                            $scope.refreshFolder();
                            $scope.getUserTotalSize();
                            $scope.$evalAsync(function () {
                                $scope.folders.push(res.data);
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



        $scope.renameFolder = function ($event, folder, index, type) {
            $event.preventDefault();
            $event.stopPropagation();
            WaitingService.questionWithInputText('', 'YOUR_FOLDER_NAME_TEXT', folder.name, function (inputValue) {
                // $scope.$apply();
                if (inputValue != '') {
                    AppMediaService.renameFolder({name: inputValue, uuid: folder.uuid}).then(function (res) {
                        if (res.success) {
                            WaitingService.popSuccess('FOLDER_CREATE_SUCCESS_TEXT');
                            if (type == 1) {
                                $scope.refreshFolder();
                                $scope.$evalAsync(function () {
                                    $scope.folders[index] = res.data;

                                    if($scope.currentFolder.id == $scope.folders[index].id){
                                        $scope.currentFolder = res.data;
                                    }
                                });
                            } else if (type == 2) {
                                $scope.refreshAssigneeFolder();
                                $scope.$evalAsync(function () {
                                    $scope.assigneeFolders[index] = res.data;
                                    $scope.attachmentFolders[index] = res.data;
                                });
                            }else if (type == 3) {
                                $scope.refreshFolders({objectUuid: $scope.folderDspUuid, type: 'dsp'});
                                $scope.$evalAsync(function () {
                                    $scope.dspFolders[index] = res.data;
                                    $scope.attachmentFolders[index] = res.data;
                                });
                            }else if (type == 4) {
                                $scope.refreshFolders({objectUuid: $scope.folderHrUuid, type: 'hr'});
                                $scope.$evalAsync(function () {
                                    $scope.hrFolders[index] = res.data;
                                    $scope.attachmentFolders[index] = res.data;
                                });
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
            });
        };

        $scope.removeFolder = function ($event, folder, index, type) {
            $event.preventDefault();
            $event.stopPropagation();
            WaitingService.questionWithPassword('YOU_SHOULD_ENTER_YOUR_PASSWORD_TO_CONFIRM_ACTION_TEXT', 'QUESTION_DELETE_FOLDER_TEXT', function (inputValue) {
                // $scope.$apply();

                if (inputValue != '') {
                    WaitingService.begin();
                    AppMediaService.removeFolder({password: inputValue, uuid: folder.uuid}).then(function (res) {
                        if (res.success) {
                            WaitingService.popSuccess('FOLDER_DELETE_SUCCESS_TEXT');
                            if (type == 1) {
                                // $scope.refreshFolder();
                                $scope.getUserTotalSize();
                                $scope.$evalAsync(function () {
                                    let folderIndex = _.findIndex($scope.folders, function (_folder) {
                                        return _folder.uuid == folder.uuid;
                                    });
                                    $scope.folders.splice(folderIndex, 1);

                                    $scope.goBackToFolder();
                                });
                            } else if (type == 2) {
                                // $scope.refreshAssigneeFolder();
                                $scope.$evalAsync(function () {
                                    $scope.publish('MediaUpdateDocument', {isUpdate: true});
                                    $scope.publish('reload_attachments', {uuid: $scope.folderEeUuid});
                                    $scope.publish('check_attachment_existed', $scope.folderEeUuid);
                                    let folderIndex = _.findIndex($scope.assigneeFolders, function (_folder) {
                                        return _folder.uuid == folder.uuid;
                                    });
                                    console.log(folder);
                                    console.log(folderIndex);
                                    $scope.assigneeFolders.splice(folderIndex, 1);
                                    $scope.attachmentFolders.splice(folderIndex, 1);

                                    $scope.initSharedWithAssignee();
                                });
                            }else if (type == 3) {
                                $scope.$evalAsync(function () {
                                    $scope.publish('MediaUpdateDocument', {isUpdate: true});
                                    $scope.publish('reload_attachments', {uuid: $scope.folderDspUuid});
                                    $scope.publish('check_attachment_existed', $scope.folderDspUuid);
                                    let folderIndex = _.findIndex($scope.dspFolders, function (_folder) {
                                        return _folder.uuid == folder.uuid;
                                    });
                                    console.log(folder);
                                    console.log(folderIndex);
                                    $scope.dspFolders.splice(folderIndex, 1);
                                    $scope.attachmentFolders.splice(folderIndex, 1);
                                    $scope.initMyDocument();
                                });
                            }else if (type == 4) {
                                $scope.$evalAsync(function () {
                                    $scope.publish('MediaUpdateDocument', {isUpdate: true});
                                    $scope.publish('reload_attachments', {uuid: $scope.folderHrUuid});
                                    $scope.publish('check_attachment_existed', $scope.folderHrUuid);

                                    let folderIndex = _.findIndex($scope.hrFolders, function (_folder) {
                                        return _folder.uuid == folder.uuid;
                                    });
                                    console.log(folder);
                                    console.log(folderIndex);
                                    $scope.hrFolders.splice(folderIndex, 1);
                                    $scope.attachmentFolders.splice(folderIndex, 1);
                                    $scope.initSharedWithCompany();
                                });
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
            });
        };

        $scope.goBackToFolder = function () {
            $scope.currentFolder = {};
            $scope.search.folderUuid = null;
            $scope.search.isPrivate = true;
            $scope.searchMedia();
            $scope.settingActive = 1;
        };

        $scope.gotoFolder = function (folder) {
            $scope.currentSharedFolder = "";
            $scope.currentFolder = folder;
            $scope.search.folderUuid = folder.uuid;
            $scope.search.isPrivate = true;
            $scope.searchMedia();
            $scope.settingActive = 1;
        };


        $scope.selectMediaItem = function (item, $event, $index) {
            if (angular.isDefined($scope.onSelectItem)) {
                let itemSelected = item;
                if (angular.isDefined($scope.options.multiSelect)) {
                    if ($scope.options.multiSelect == true) {

                    } else {
                        $scope.itemsSelect = [];
                    }
                }
                if (angular.isDefined(itemSelected.is_selected) && itemSelected.is_selected == true) {
                    if ($scope.itemsSelect.length > 0) {
                        let found = $filter('filter')($scope.itemsSelect, {uuid: itemSelected.uuid}, true);
                        if (found.length > 0) {
                            $scope.itemsSelect.splice($scope.itemsSelect.indexOf(found[0]), 1);
                        } else {
                            $scope.itemsSelect.push(itemSelected);
                        }
                    } else {
                        $scope.itemsSelect.push(itemSelected);
                    }
                } else {
                    let _index = _.findIndex($scope.itemsSelect, function (_item) {
                        return _item.uuid == itemSelected.uuid
                    });
                    if (_index != -1) {
                        $scope.itemsSelect.splice(_index, 1);
                    }
                }
            }
        };

        $scope.selectAttachmentItem = function (item) {
            let itemSelected = item;
            console.log('itemSelected', itemSelected);
            if (angular.isDefined(itemSelected.is_selected) && itemSelected.is_selected == true) {
                if ($scope.attachmentsSelect.length > 0) {
                    let found = $filter('filter')($scope.attachmentsSelect, {media_attachment_uuid: itemSelected.media_attachment_uuid}, true);
                    if (found.length > 0) {
                        $scope.attachmentsSelect.splice($scope.attachmentsSelect.indexOf(found[0]), 1);
                    } else {
                        $scope.attachmentsSelect.push(itemSelected);
                    }
                } else {
                    $scope.attachmentsSelect.push(itemSelected);
                }
            } else {
                let _index = _.findIndex($scope.attachmentsSelect, function (_item) {
                    return _item.media_attachment_uuid == itemSelected.media_attachment_uuid
                });
                if (_index != -1) {
                    $scope.attachmentsSelect.splice(_index, 1);
                }
            }
        };


        $scope.showSelected = function () {
            $scope.onSelectItem({items: $scope.itemsSelect});
        };

        $scope.afterDeleteSuccessFn = function (item, $index) {
            angular.forEach($scope.mediaItems, function (mediaItem, mediaIndex) {
                if (item.uuid == mediaItem.uuid) {
                    $scope.mediaItems.splice(mediaIndex, 1);
                }
            });
            item.is_selected = false;
            $scope.selectMediaItem(item, null, $index);
        };

        $scope.afterDeleteSuccessFn2 = function (item) {
            let index = _.findIndex($scope.mediaItems, function (mediaItem) {
                return mediaItem.uuid == item.uuid;
            });
            console.log('index', index);
            $scope.mediaItems.splice(index, 1);

            item.is_selected = false;
            $scope.selectMediaItem(item, null, index);

            // $scope.selectMediaItem(item, null, index);
            $scope.getUserTotalSize();
            console.log('itemsSelect', $scope.itemsSelect);
        };

        $scope.afterDeleteAttachmentSuccessFn2 = function (item, $index) {
            let index = _.findIndex($scope.sharedItems, function (sharedItem) {
                return sharedItem.media_attachment_uuid == item.media_attachment_uuid;
            });
            $scope.sharedItems.splice(index, 1);

            $scope.selectAttachmentItem(item, null, $index);

            $rootScope.$emit('assignmentUpdateDocument', {isUpdate: true});
            // console.log('attachmentsSelect', $scope.attachmentsSelect);
        };

        $scope.refreshFolder = function () {
            // $scope.searchFolder = {
            //     query: '',
            // };
            // $scope.selectFolders = {};
            // AppMediaService.getMyFoldersList().then(function (res) {
            //     if (res.success) {
            //         $scope.folders = res.data;
            //         angular.forEach(res.data, function (folder) {
            //             $scope.selectFolders[folder.uuid] = folder.name;
            //         });
            //     }
            // });
        };


        $scope.refreshFolder();

        $scope.searchFolderFn = function () {
            // AppMediaService.getMyFoldersList($scope.searchFolder).then(function (res) {
            //     if (res.success) {
            //         $scope.folders = res.data;
            //         angular.forEach(res.data, function (folder) {
            //             $scope.selectFolders[folder.uuid] = folder.name;
            //         })
            //     }
            // });
        };

        $scope.checkStatusSelected = function (items) {
            if (angular.isDefined($scope.itemsSelect) && $scope.itemsSelect.length > 0) {
                angular.forEach($scope.itemsSelect, function (item) {
                    let index = _.findIndex(items, function (mediaItem) {
                        return mediaItem.uuid == item.uuid;
                    });
                    if (angular.isDefined(items[index])) {
                        items[index].is_selected = true;
                    }
                });
            }

        };

        $scope.downloadSelectedFiles = function () {
            if (angular.isDefined($scope.itemsSelect) && $scope.itemsSelect.length > 0) {
                let files = [];
                angular.forEach($scope.itemsSelect, function (item, index) {
                    files.push(Promise.resolve(item.image_data.url_download));
                });
                $scope.download(files);
            } else {
                WaitingService.error('NO_FILE_SELECTED_TO_DOWNLOAD_TEXT');
            }
        };

        $scope.downloadAttachmentFiles = function () {
            if (angular.isDefined($scope.attachmentsSelect) && $scope.attachmentsSelect.length > 0) {
                let files = [];
                angular.forEach($scope.attachmentsSelect, function (item, index) {
                    files.push(Promise.resolve(item.image_data.url_download));
                    let _index = _.findIndex($scope.sharedItems, function (_item) {
                        return _item.media_attachment_uuid == item.media_attachment_uuid
                    });
                    if (_index != -1) {
                        $scope.sharedItems[_index].is_selected = false;
                    }
                });
                $scope.download(files);
                $scope.attachmentsSelect = [];
                // console.log($scope.attachmentsSelect);
            } else {
                WaitingService.error('NO_FILE_SELECTED_TO_DOWNLOAD_TEXT');
            }
        };

        $scope.bulkDeleteAttachments = function () {
            if (angular.isDefined($scope.attachmentsSelect) && $scope.attachmentsSelect.length > 0) {
                let files = [];

                WaitingService.questionSimple('QUESTION_DELETE_DOCUMENT_TEXT', function () {
                    // $scope.$apply();
                    let media_attachment_uuids = [];
                    angular.forEach($scope.attachmentsSelect, function (item, index) {
                        // console.log('item', item);
                        media_attachment_uuids.push(item.media_attachment_uuid);
                    });

                    AppMediaService.removeMultipleAttachments({
                        'media_attachment_uuids': media_attachment_uuids,
                        'type': $scope.objectType
                    }).then(function (res) {
                        if (res.success) {
                            $scope.$evalAsync(function () {
                                $scope.publish('MediaUpdateDocument', {isUpdate: true});
                                if (angular.isDefined($scope.object) && angular.isDefined($scope.object.uuid)) {
                                    $scope.publish('check_attachment_existed', $scope.object.uuid);
                                }

                                if (angular.isUndefined($scope.object) && angular.isDefined($scope.uuid)) {
                                    $scope.publish('check_attachment_existed', $scope.uuid);
                                }
                                let attachmentsSelect = angular.copy($scope.attachmentsSelect);
                                angular.forEach(attachmentsSelect, function (item, index) {
                                    $scope.afterDeleteAttachmentSuccessFn2(item);
                                });
                            });
                            WaitingService.popSuccess('DOCUMENT_DELETE_SUCCESS_TEXT');

                        } else {
                            WaitingService.error(res.message);
                        }
                    }).catch(function (err) {
                        WaitingService.popError(err.message);
                    });
                });

            } else {
                WaitingService.error('NO_FILE_SELECTED_TO_DELETE_TEXT');
            }
        };

        $scope.bulkDeleteMedias = function () {
            if (angular.isDefined($scope.itemsSelect) && $scope.itemsSelect.length > 0) {
                let files = [];

                WaitingService.questionSimple('QUESTION_DELETE_DOCUMENT_TEXT', function () {
                    // $scope.$apply();
                    let media_uuids = [];
                    angular.forEach($scope.itemsSelect, function (item, index) {
                        media_uuids.push(item.uuid);
                    });

                    AppMediaService.removeMultipleMedias({
                        'media_uuids': media_uuids,
                    }).then(function (res) {
                        if (res.success) {
                            $scope.$evalAsync(function () {
                                let itemSelects = angular.copy($scope.itemsSelect);
                                angular.forEach(itemSelects, function (item, index) {
                                    $scope.afterDeleteSuccessFn2(item);
                                });
                            });
                            WaitingService.popSuccess('DOCUMENT_DELETE_SUCCESS_TEXT');

                        } else {
                            WaitingService.error(res.message);
                        }
                    }).catch(function (err) {
                        WaitingService.popError(err.message);
                    });
                });

            } else {
                WaitingService.error('NO_FILE_SELECTED_TO_DELETE_TEXT');
            }
        };

        $scope.download = function (files) {
            files[0].then(function (result) {
                $window.location.href = result;
                if (files.length > 1) {
                    setTimeout(function () {
                        return $scope.download(files.slice(1));
                    }, 2500);
                }
            });
        };

        // GET ALL ATTACHMENT SHARED WITH ME

        $scope.resetAttachmentParams = function () {
            $scope.searchAttachment.page = 0;
            // $scope.searchAttachment.query = '';
            $scope.currentAttachPage = 1;
            $scope.totalAttachPages = 1;
            $scope.loadAttachCount = 0;
        }


        // GET ALL ATTACHMENT INVOLVE WITH CONTENT (ASSIGNMENT/RELOCATION/TASK/...)




        $scope.getFileList = function (data, type = '') {
            $scope.isLoading = true;
            $scope.searchMediaQuery = "";
            $scope.resetAttachmentParams();
            AppMediaService.getAttachments(data).then(function (res) {
                if (res.success == true) {
                    $scope.currentSharedFolder = type;
                    $scope.sharedItems = res.data;
                    $scope.searchMediaQuery = '';
                }
                $scope.isLoading = false;
            }, function () {
                $scope.isLoading = false;
            });
        }

        // DRAG AND DROP TO FOLDER EVENT
        $scope.droppedMediaToFolder = function (mediaUuid, folderUuid) {
            if (angular.isDefined(folderUuid) && folderUuid != '' && angular.isDefined(mediaUuid) && mediaUuid != '') {
                AppMediaService.moveMedia({uuid: mediaUuid, folder_uuid: folderUuid}).then(function (res) {
                    if (res.success) {
                        WaitingService.popSuccess('FILE_MOVE_SUCCESS_TEXT');
                        $scope.$evalAsync(function () {
                            let media = res.data;
                            if (Object.keys($scope.currentFolder).length > 0) {
                                if (media.folder_uuid !== $scope.currentFolder.uuid) {
                                    $scope.afterDeleteSuccessFn2(media);
                                }
                            } else {
                                $scope.selectMediaItem(media);
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
        };


        $scope.selectedAttachments = function () {
            if (angular.isDefined($scope.attachmentsSelect) && $scope.attachmentsSelect.length > 0) {
                let attachment_uuids = [];
                let data = {};
                data.isAttachFiles = false
                angular.forEach($scope.attachmentsSelect, function (item, index) {
                    attachment_uuids.push(item.media_attachment_uuid);
                });

                data.attachment_uuids = attachment_uuids;
                WaitingService.begin();
                AppMediaService.copyMultipleAttachments(data).then(function (res) {
                    WaitingService.end();
                    if (res.success) {
                        $scope.$evalAsync(function () {
                            $scope.onSelectItem({items: res.mediaList});
                        });
                        WaitingService.popSuccess('ATTACH_SUCCESS_TEXT');

                    } else {
                        WaitingService.error(res.message);
                    }
                }).catch(function (err) {
                    WaitingService.end();
                    WaitingService.popError(err.message);
                });
            } else {
                WaitingService.error('NO_FILE_SELECTED_TEXT');
            }
        }

        // Copy attachment files
        $scope.copyMultipleFiles = function (data = {}) {
            if (angular.isDefined($scope.attachmentsSelect) && $scope.attachmentsSelect.length > 0) {
                let files = [];
                WaitingService.questionSimple('QUESTION_COPY_MEDIA_TEXT', function () {
                    // $scope.$apply();
                    let attachment_uuids = [];
                    angular.forEach($scope.attachmentsSelect, function (item, index) {
                        attachment_uuids.push(item.media_attachment_uuid);
                    });

                    data.attachment_uuids = attachment_uuids;
                    WaitingService.begin();
                    AppMediaService.copyMultipleAttachments(data).then(function (res) {
                        WaitingService.end();
                        if (res.success) {
                            $scope.$evalAsync(function () {
                                $scope.publish('MediaUpdateDocument', {isUpdate: true});
                                if (angular.isDefined($scope.object) && angular.isDefined($scope.object.uuid)) {
                                    $scope.publish('check_attachment_existed', $scope.object.uuid);
                                }

                                if (angular.isUndefined($scope.object) && angular.isDefined($scope.uuid)) {
                                    $scope.publish('check_attachment_existed', $scope.uuid);
                                }

                                let attachmentsSelect = angular.copy($scope.attachmentsSelect);
                                $scope.attachmentsSelect = [];
                                console.log('$scope.attachmentItems', $scope.sharedItems);

                                angular.forEach(attachment_uuids, function (item, index) {
                                    console.log('item', item);
                                    let _index = _.findIndex($scope.sharedItems, function (o) {
                                        return o.media_attachment_uuid === item
                                    });
                                    if (_index > -1) {
                                        $scope.sharedItems[_index].is_selected = false;
                                        $scope.sharedItems[_index].can_attach_to_my_library = false;
                                    }
                                });
                            });
                            WaitingService.popSuccess('FILE_COPY_SUCCESS_TEXT');

                        } else {
                            WaitingService.error(res.message);
                        }
                    }).catch(function (err) {
                        WaitingService.end();
                        WaitingService.popError(err.message);
                    });
                });
            } else {
                WaitingService.error('NO_FILE_SELECTED_TO_COPY_TEXT');
            }
        };


        //Attach multiple file
        $scope.attachMultipleFiles = function(data = {}){
            if (angular.isDefined($scope.itemsSelect) && $scope.itemsSelect.length > 0) {
                WaitingService.begin();
                data.attachments = angular.copy($scope.itemsSelect);
                AppMediaService.attachMultipleFiles(data).then(function (res) {
                    WaitingService.end();
                    if (res.success) {
                        $scope.publish('reload_attachments', {uuid: data.uuid});

                        if (angular.isDefined($scope.object) && angular.isDefined($scope.object.uuid)) {
                            $scope.publish('check_attachment_existed', $scope.object.uuid);
                        }

                        if (angular.isUndefined($scope.object) && angular.isDefined($scope.uuid)) {
                            $scope.publish('check_attachment_existed', $scope.uuid);
                        }

                        //Update file on object detail
                        $scope.publish('MediaUpdateDocument', {isUpdate: true});
                        WaitingService.popSuccess(res.message);

                        $scope.$evalAsync(function () {
                            $scope.publish('refreshSelected');
                        });

                    } else {
                        if (angular.isDefined(res.message)) {
                            WaitingService.popError(res.message);
                        } else {
                            WaitingService.popError('ATTACH_FILE_FAILED_TEXT');
                        }
                    }
                }, function (err) {
                    WaitingService.end();
                    if (angular.isDefined(err.detail) && angular.isDefined(err.detail.file_name) && angular.isDefined(err.detail.message)) {
                        WaitingService.errorWithTitle(err.detail.file_name, err.detail.message);
                        WaitingService.popError(err.detail.message);
                        return;
                    }
                    if (angular.isDefined(err.message)) {
                        WaitingService.popError(err.message);
                    } else {
                        WaitingService.popExpire();
                    }
                })
            } else {
                WaitingService.error('NO_FILE_SELECTED_TO_COPY_TEXT');
            }

        }









        $scope.subscribe('refreshSelected', function(){
            $scope.attachmentsSelect = [];
            if(_.size($scope.attachmentsSelect) > 0){
                let _select = angular.copy($scope.attachmentsSelect);
                angular.forEach(_select, function (item, index) {
                    let _index = _.findIndex($scope.sharedItems, function (_item) {
                        return _item.media_attachment_uuid == item.media_attachment_uuid
                    });
                    if (_index != -1) {
                        $scope.sharedItems[_index].is_selected = false;
                    }
                });

                $scope.attachmentsSelect = [];
            }

            if(_.size($scope.itemsSelect) > 0){
                let _select = angular.copy($scope.itemsSelect);
                angular.forEach(_select, function (item, index) {
                    let _index = _.findIndex($scope.mediaItems, function (_item) {
                        return _item.uuid == item.uuid
                    });
                    if (_index != -1) {
                        $scope.mediaItems[_index].is_selected = false;
                    }
                });

                $scope.itemsSelect = [];
            }

        })


        //Add attach from personal document
        $scope.subscribe('attachment_selected', function(data){
            console.log('data', data);
            if(data.action == 'add'){
                let _index = _.findIndex($scope.attachmentsSelect, function(o){
                    return o.uuid ==  data.data.uuid
                });
                if(_index == -1){
                    $scope.attachmentsSelect.push(data.data)
                }
            }

            if(data.action == 'remove'){
                let _index = _.findIndex($scope.attachmentsSelect, function(o){
                    return o.uuid == data.data.uuid
                });
                if(_index > -1){
                    $scope.attachmentsSelect.splice(_index, 1)
                }
            }
        })

        //Pusher

        let settings = AppSystem.getSettings();
        let profile = AppAuthService.getUser();

        let client = new Pusher(settings.pusher_app_key, {
            cluster: settings.pusher_app_cluster,
            encrypted: true
        });
        let pusher = $pusher(client);
        pusher.subscribe('RELOAD_MEDIA_LIBRARY');

        pusher.bind('reload', function (mediaData) {
            if (angular.isDefined(mediaData) && angular.isDefined(mediaData.uuid)) {
                // if ($scope.settingActive === 1){
                //     $scope.search.page = 0;
                //     $scope.search.isPrivate= true;
                //     $scope.searchMedia();
                // }
                //
                // if ($scope.settingActive === 0){
                //     $scope.search = {
                //         fileType: '',
                //         query: '',
                //         folderUuid: '',
                //         creationDate: null,
                //         page: 0,
                //         isPrivate: false,
                //     };
                //     $scope.searchMedia();
                // }
            }
            // let _index = _.findIndex($scope.mediaItems, function(mediaItem) { return mediaItem.uuid == mediaData.uuid; });
            //
            // if(angular.isDefined($scope.mediaItems[_index])){
            //     $scope.mediaItems[_index] = mediaData;
            // }else{
            //     $scope.mediaItems.unshift(mediaData);
            // }
        });

    };

})();

