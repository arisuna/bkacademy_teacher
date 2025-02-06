(function () {
    'use strict';

    angular
        .module('app.app-services')
        .service('AppDataService', AppDataService);

    AppDataService.$inject = ['$http', '$q', '$httpParamSerializer', '$localStorage', '$filter', 'moment', 'AppHttp'];

    function AppDataService($http, $q, $httpParamSerializer, $localStorage, $filter, moment, AppHttp) {

        var vm = this;

        this.clearCache = function () {
            var deferred = $q.defer();
            AppHttp.get('/app/setting/clearCache').then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.loginFn = function (data) {
            let deferred = $q.defer();
            if (angular.isUndefined(data.credential) || data.credential == '' || angular.isUndefined(data.password) || data.password == '') {
                deferred.resolve({success: false, msg: 'LOGIN_NOT_FOUND_TEXT'});
            } else {
                AppHttp.post('/app/auth/login?_=' + Math.random(), data)
                    .then(function (response) {
                        deferred.resolve(response.data);
                    }).catch(function (err) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }

        this.autoLoginFn = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/app/auth/autoLogin?_=' + Math.random(), data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        this.checkLogin = function () {
            let deferred = $q.defer();
            AppHttp.get('/app/auth/checkAuthConnected?_=' + Math.random())
                .then(function (response) {
                    if (response.data.success) deferred.resolve(response.data);
                    else deferred.reject(response.data);
                }).catch(function (err) {
                deferred.reject({success: false});
            });
            return deferred.promise;
        }


        this.getPermissionsList = function () {
            let deferred = $q.defer();
            AppHttp.get('/app/setting/getPermissionsList?_=' + Math.random())
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.checkPermission = function (controller, action) {
            let deferred = $q.defer();
            AppHttp.put('/app/setting/checkPermission', {
                controller: controller,
                action: action
            }).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getMenuItems = function () {
            let deferred = $q.defer();
            deferred.resolve({success: true, data: []});
            return deferred.promise;
        }

        this.initAllSetting = function () {
            let deferred = $q.defer();
            AppHttp.get('/app/setting/init?_=' + Math.random())
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        this.getCurrentProfile = function () {
            let deferred = $q.defer();
            AppHttp.get('/app/profile/index')
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        this.getInitMyCompanyInfo = function () {
            let deferred = $q.defer();
            AppHttp.get('/app/my_company/init')
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }
        /**
         * get all attributes values with languages
         */
        this.getAttributesValues = function (lang) {
            let deferred = $q.defer();
            if (lang == undefined || lang == '') lang = 'en';
            AppHttp.get('/app/setting/attributes/' + lang)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.reloadCacheAttributesValues = function (lang) {
            let deferred = $q.defer();
            if (lang == undefined || lang == '') lang = 'en';
            AppHttp.get('/app/setting/reloadAttributes/' + lang)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         * get all attributes values with languages
         */
        this.getSettingVariables = function (lang) {
            let deferred = $q.defer();
            if (lang == undefined || lang == '') lang = 'en';
            AppHttp.get('/app/setting/getSettingVariables/' + lang)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        /**
         * get all attributes values with languages
         */
        this.getSettingGroup = function () {
            let deferred = $q.defer();
            AppHttp.get('/app/setting/getSettingGroup')
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getCompanySetting;


        /**
         * get all attributes values with languages
         */
        this.getSettingNationalities = function (lang) {
            let deferred = $q.defer();
            if (lang == undefined || lang == '') lang = 'en';
            AppHttp.get('/app/setting/nationalities/' + lang)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         *
         * @param lang
         */
        this.getSettingUserGroups = function (lang) {
            let deferred = $q.defer();
            if (lang == undefined || lang == '') lang = 'en';
            AppHttp.get('/app/setting/user_groups/' + lang)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         * get profile of user
         */
        this.getProfile = function () {
            let deferred = $q.defer();
            AppHttp.get('/app/profile/index').then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getMyProfileSettings = function () {
            let deferred = $q.defer();
            AppHttp.get('/app/profile/getSettingGroup').then(function (response) {
                deferred.resolve(response.data);
            }, function (err) {
                deferred.reject(err.data);
            })
            return deferred.promise;
        }


        /**
         * get attributes list
         * @param kind
         */
        this.getAttributesList = function (kind) {
            let deferred = $q.defer();
            AppHttp.get('/app/attributes/list?' + kind)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        /**
         * get notifications list
         * @param kind
         */
        this.getNotificationsList = function (kind) {
            let deferred = $q.defer();
            $http.get('/app/notifications/list?' + kind)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });

            return deferred.promise;
        };


        /**
         * reload attributes
         * @param kind
         */
        this.reloadAttributesList = function (kind) {
            let deferred = $q.defer();
            AppHttp.post('/app/attributes/reload?' + kind)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getAvatarObject = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/media/avatar/getObject/' + uuid)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         *
         * @param uuid
         */
        this.getAvatarObjectDirect = function (uuid) {
            return '/media/avatar/thumbdirect/' + uuid + '?token=' + localStorage.getItem('token_key') + '&getAvatarObjectDirect=true';
        }

        this.getContactAvatarObjectDirect = function (uuid) {
            return '/media/avatar/contactThumb/' + uuid + '?token=' + localStorage.getItem('token_key') + '&getAvatarObjectDirect=true';
        }


        /**
         *
         * @param id
         */
        this.updateMyProfile = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/app/profile/update', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.uploadMediaByUrl = function (data) {
            let deferred = $q.defer();
            if (data != undefined) {
                AppHttp.post('/media/upload-by-url/upload', data).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                    deferred.reject(err.data);
                });
            } else {
                deferred.resolve({success: false});
            }
            return deferred.promise;
        }

        this.getHistoryListOfObject = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/app/history/list/' + uuid).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         *
         * @param data
         */
        this.saveHistoryData = function (data) {
            let deferred = $q.defer();
            if (angular.isUndefined(data.action)) {
                deferred.resolve({success: false, msg: 'DATA_NOT_FOUND_'});
            } else {
                AppHttp.post('/app/history/saveHistory' + '?_action=' + data.action, data)
                    .then(function (response) {
                        deferred.resolve(response.data);
                    }).catch(function (err) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }


        /**
         *
         * @param data
         */
        this.saveNofificationData = function (data) {
            let deferred = $q.defer();
            if (angular.isUndefined(data.action)) {
                deferred.resolve({success: false, msg: 'DATA_NOT_FOUND_TEXT'});
            } else {
                AppHttp.post('/app/notification/addNotification' + '?action=' + data.action, data)
                    .then(function (response) {
                        deferred.resolve(response.data);
                    }).catch(function (err) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }

        this.countNotification = function () {
            let deferred = $q.defer();
            AppHttp.get('/app/notification/countNotification' + '?action=' + 'countNotification')
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         * set read time for notification
         * @returns {*}
         */
        this.setReadTimeNotification = function () {
            let deferred = $q.defer();
            AppHttp.post('/app/notification/setReadTimeNotification' + '?action=' + 'setReadTimeNotification')
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         *
         * @param data
         */
        this.saveNofificationForUser = function (data) {
            let deferred = $q.defer();
            if (angular.isUndefined(data.action)) {
                deferred.resolve({success: false, msg: 'DATA_NOT_FOUND_TEXT'});
            } else {
                AppHttp.post('/app/notification/addNotificationForUser' + '?action=' + data.action, data)
                    .then(function (response) {
                        deferred.resolve(response.data);
                    }).catch(function (err) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }

        this.sendPushNotificationForUser = function (data) {
            let deferred = $q.defer();
            if (angular.isUndefined(data.action) || angular.isUndefined(data.uuid)) {
                deferred.resolve({success: false, msg: 'DATA_NOT_FOUND_TEXT'});
            } else {
                AppHttp.post('/app/notification/sendPushNotificationForUser' + '?action=' + data.action, data)
                    .then(function (response) {
                        deferred.resolve(response.data);
                    }).catch(function (err) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }


        this.getLastNotification = function () {
            let deferred = $q.defer();
            AppHttp.get('/app/notification/getLastNotification')
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getSimpleListNotification = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/app/notification/getSimpleListNotification', data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.readNotificationSimple = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/app/notification/readNotificationSimple/' + uuid)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getCompanyDetailById = function (id) {
            let deferred = $q.defer();
            if (id == undefined || id == 0) {
                deferred.resolve({success: false});
            } else {
                AppHttp.get('/app/company/detail/' + id).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }

        this.getCompanySimpleData = function (id) {
            let deferred = $q.defer();
            if (id == undefined || id == 0) {
                deferred.resolve({success: false});
            } else {
                AppHttp.get('/app/company/simpleData/' + id).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }

        this.addNewValueAttribute = function (data) {
            let deferred = $q.defer();
            if (data.name == undefined || data.name == '' || data.value == undefined || data.value == '') {
                deferred.resolve({success: false, msg: 'DATA_NOT_FOUND_TEXT'});
            } else {
                AppHttp.post('/app/attributes/addNewValue/?name=' + data.name, data).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }

        this.addAclItem = function (data) {
            let deferred = $q.defer();
            if (angular.isUndefined(data.role_id) || angular.isUndefined(data.acl)) {
                deferred.resolve({success: false, msg: 'DATA_NOT_FOUND_TEXT'});
            } else {
                AppHttp.post('/app/role/addAclItem', data).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }

        this.removeAclItem = function (data) {
            let deferred = $q.defer();
            if (angular.isUndefined(data.role_id) || angular.isUndefined(data.acl)) {
                deferred.resolve({success: false, msg: 'DATA_NOT_FOUND_TEXT'});
            } else {
                AppHttp.put('/app/role/removeAclItem', data).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }

        this.resetAclGroup = function (id) {
            let deferred = $q.defer();
            AppHttp.put('/app/role/reset/' + id).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.checkImageFromUrl = function (url) {
            let deferred = $q.defer();
            const imgElement = new Image();
            imgElement.addEventListener('load', function imgOnLoad() {
                if (this.naturalWidth < 300 || this.naturalHeight < 200) {
                    deferred.reject({success: false});
                } else {
                    deferred.resolve(this);
                }
            });
            imgElement.addEventListener('error', function imgOnError() {
                deferred.reject({success: false});
            });

            imgElement.onerror = function () {
                deferred.reject({success: false});
            };

            imgElement.src = url;
            return deferred.promise;
        }


        this.attachMediaToObject = function (data) {
            let deferred = $q.defer();
            if (angular.isUndefined(data.uuid) || data.uuid == '' ||
                angular.isUndefined(data.type) || data.type == '' || angular.isUndefined(data.media)) {
                deferred.reject();
            } else {
                AppHttp.post('/app/uploader/createAttachment', data).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }


        this.removeAttachment = function (data) {
            let deferred = $q.defer();
            if (angular.isUndefined(data.media_uuid) || data.media_uuid == '' ||
                angular.isUndefined(data.object_uuid) || data.object_uuid == '') {
                deferred.reject();
            } else {
                AppHttp.delete('/app/uploader/removeAttachment/object/' + data.object_uuid + '/media/' + data.media_uuid).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }

        this.getMediaListByUuid = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/app/uploader/getListByUuid/' + uuid)
                .then(function (response) {
                    if (angular.isDefined(response.data.success) && response.data.success == true) {
                        deferred.resolve(response.data);
                    } else {
                        deferred.reject(response.data);
                    }
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        this.searchMediaList = function (data) {
            let deferred = $q.defer();
            if (angular.isUndefined(data.keyword) && angular.isUndefined(data.page)) {
                deferred.reject();
            } else {
                AppHttp.get('/app/uploader/searchMedia', data).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }


        /*** save settings of company **/
        this.saveSettingCompany = function (data) {
            let deferred = $q.defer();
            if (angular.isUndefined(data.name) || data.name == '' || angular.isUndefined(data.value)
            ) {
                deferred.reject();
            } else {
                AppHttp.put('/app/setting/save', data).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }

        /*** save settings of company **/
        this.saveSettingCompanyMultiple = function (data) {
            let deferred = $q.defer();
            if (data != undefined && data.length > 0) {
                var promises = [];
                angular.forEach(data, function (settingData) {
                    promises.push(vm.saveSettingCompany({
                        name: settingData.name,
                        value: settingData.value
                    }).then(
                        function (res) {
                            return res;
                        },
                        function (err) {
                            deferred.reject(err);
                        }
                    ))
                });

                $q.all(promises).then(function (values) {
                    deferred.resolve({success: true});
                }, function (err) {
                    deferred.reject(err);
                });

            } else {
                deferred.resolve({success: false});
            }
            return deferred.promise;
        }

        this.getSystemLanguages = function () {
            let deferred = $q.defer();
            AppHttp.get('/app/setting/language').then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.setSystemLanguage = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/app/setting/setLanguage', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getTodayActivities = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/app/notification/today', data).then(function (response) {
                deferred.resolve(response.data);
                return response.data;
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;

        }

        this.getObjectActivities = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/app/notification/getObjectFeed', data).then(function (response) {
                deferred.resolve(response.data);
                return response.data;
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;

        }

        this.getAttributeDetail = function (id) {
            let deferred = $q.defer();
            AppHttp.get('/app/attributes/detail/' + id).then(function (response) {
                deferred.resolve(response.data);
                return response.data;
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        this.editAttribute = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/app/attributes/edit/', data).then(function (response) {
                deferred.resolve(response.data);
                return response.data;
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        this.saveSettingProfile = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/app/profile/saveSetting', data).then(function (response) {
                deferred.resolve(response.data);
                return response.data;
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        this.changeLanguage = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/app/profile/changeLanguage/' + data).then(function (response) {
                deferred.resolve(response.data);
                return response.data;
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        this.getUserSettingVariables = function () {
            let deferred = $q.defer();
            AppHttp.get('/app/profile/getSettingVariables')
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.saveSettingProfileMultiple = function (data) {
            let deferred = $q.defer();
            if (data != undefined && data.length > 0) {
                var promises = [];
                angular.forEach(data, function (settingData) {
                    promises.push(vm.saveSettingProfile({
                        id: settingData.id,
                        name: settingData.name,
                        value: settingData.value
                    }).then(
                        function (res) {
                            return res;
                        },
                        function (err) {
                            deferred.reject(err);
                        }
                    ))
                });

                $q.all(promises).then(function (values) {
                    deferred.resolve({success: true});
                }, function (err) {
                    deferred.reject(err);
                });

            } else {
                deferred.resolve({success: false});
            }
            return deferred.promise;
        }


        this.editCompany = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/app/company/update/' + data.id, data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.createCompany = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/app/company/create/', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.generateNicknameGmsMember = function (uuid) {

            let deferred = $q.defer();
            AppHttp.get('/app/app_member/generate_nickname/' + uuid).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.checkValidation = function (controller, action) {
            let deferred = $q.defer();
            AppHttp.put('/app/acl/checkValidation', {controller: controller, action: action}).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        this.verfifyAccountEmail = function (email) {
            let deferred = $q.defer();
            AppHttp.put('/app/auth/verifyAccount', {email: email})
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.changeSecurityFn = function (data) {
            let deferred = $q.defer();
            if (angular.isUndefined(data.email) || data.email == '' || angular.isUndefined(data.new_password) || data.new_password == '') {
                deferred.reject({success: false, message: 'DATA_NOT_FOUND_TEXT'});
            } else {
                AppHttp.post('/app/auth/changeSecurity', data).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }

        this.verifyCodeFn = function (data) {
            let deferred = $q.defer();
            if (angular.isUndefined(data.email) || data.email == '' || angular.isUndefined(data.verification_code) || data.verification_code == '') {
                deferred.reject({success: false, message: 'DATA_NOT_FOUND_TEXT'});
            } else {
                AppHttp.post('/app/auth/verifyCode', {
                    'credential': data.email,
                    'code': data.verification_code,
                    'token': data._token
                }).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }

        this.resendCodeFn = function (data) {
            let deferred = $q.defer();
            if (angular.isUndefined(data.email) || data.email == '') {
                deferred.reject({success: false, message: 'DATA_NOT_FOUND_TEXT'});
            } else {
                AppHttp.post('/app/auth/resendCode', {
                    'credential': data.email,
                    'token': data._token
                }).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }

        this.resetFn = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/app/auth/reset', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        this.getAttribute = function (name) {
            let deferred = $q.defer();
            AppHttp.get('/app/attributes/item/' + name).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.uploadPublic = function (formData) {
            let deferred = $q.defer();
            AppHttp.post('/media/uploader/uploadPublic', formData).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.listItemsByFilter = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/app/filter-config/listItemsByFilter', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.listFilterConfig = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/app/filter-config/listFilterConfig', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         * get countries by ids
         */
        this.getCountriesByIds = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/app/setting/getCountriesByIds/', data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getTimeZone = function (id) {
            let deferred = $q.defer();
            let timeZone = angular.fromJson($localStorage['timezone_' + id]);
            if (timeZone && timeZone.length > 0) {
                deferred.resolve({
                    success: true,
                    data: timeZone,
                });
            } else {
                AppHttp.get('/app/setting/getTimeZone/' + id).then(function (response) {
                    if (response.data.success) {
                        timeZone = response.data.data;
                        $localStorage['timezone_' + id] = angular.toJson(timeZone);
                        deferred.resolve({
                            success: true,
                            data: timeZone,
                        });
                    } else {
                        deferred.resolve({
                            success: false,
                            data: null,
                        });
                    }
                }).catch(function (err) {
                    deferred.reject(err.data);
                });

            }
            return deferred.promise;
        }

        /**
         * get Zone Lang Item from code
         * @param zoneLangCode
         * @returns {*}
         */
        this.getZoneLangItem = function (zoneLangCode) {
            let deferred = $q.defer();
            AppHttp.get('/app/setting/getZoneLangItem?code=' + zoneLangCode)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         * get sso idp config of company
         */
        this.checkSamlAuthentication = function (data) {
            var deferred = $q.defer();
            AppHttp.post('/app/auth/checkSamlAuthentication', data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }
        //Notification
        this.changeReadNotification = function (data) {
            var deferred = $q.defer();
            AppHttp.post('/app/notification/changeReadNotification', data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.markAllRead = function () {
            var deferred = $q.defer();
            AppHttp.get('/app/notification/markAllRead')
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /** get list contracts with pagination **/
        this.synchronizeConstant = function () {
            var deferred = $q.defer();
            AppHttp.put('/app/constant/synchronize')
                .then(function (response) {
                    if (angular.isDefined(response.data.success) && response.data.success === true) {
                        deferred.resolve(response.data);
                    } else {
                        deferred.reject(response.data);
                    }
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.getConstantInit = function () {
            var deferred = $q.defer();
            AppHttp.get('/app/constant/initialize')
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.getConstantDetail = function (id) {
            var deferred = $q.defer();
            AppHttp.get('/app/constant/detail/' + id)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.getConstantList = function (params) {
            var deferred = $q.defer();
            AppHttp.put('/app/constant/search', params)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.deleteConstant = function (id) {
            var deferred = $q.defer();
            AppHttp.delete('/app/constant/delete/' + id)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.createConstant = function (data) {
            var deferred = $q.defer();
            AppHttp.post('/app/constant/create', data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };


        this.updateConstant = function (data) {
            var deferred = $q.defer();
            AppHttp.put('/app/constant/update/' + data.id, data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.getAdminUserDetail = function (id) {
            var deferred = $q.defer();
            AppHttp.get('/app/admin-user/detail/' + id)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.getAdminUserList = function (params) {
            var deferred = $q.defer();
            AppHttp.put('/app/admin-user/search', params)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.deleteAdminUser = function (id) {
            var deferred = $q.defer();
            AppHttp.delete('/app/admin-user/delete/' + id)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.createAdminUser = function (data) {
            var deferred = $q.defer();
            AppHttp.post('/app/admin-user/create', data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };


        this.updateAdminUser = function (data) {
            var deferred = $q.defer();
            AppHttp.put('/app/admin-user/update/' + data.id, data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };


        this.getUserGroupDetail = function (id) {
            var deferred = $q.defer();
            AppHttp.get('/app/user-group/detail/' + id)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.getUserGroupList = function (params) {
            var deferred = $q.defer();
            AppHttp.put('/app/user-group/search', params)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.deleteUserGroup = function (id) {
            var deferred = $q.defer();
            AppHttp.delete('/app/user-group/delete/' + id)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.createUserGroup = function (data) {
            var deferred = $q.defer();
            AppHttp.post('/app/user-group/create', data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };


        this.updateUserGroup = function (data) {
            var deferred = $q.defer();
            AppHttp.put('/app/user-group/update/' + data.id, data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.showGroupAcl = function (id) {
            let deferred = $q.defer();
            AppHttp.get('/app/user-group/showAcl/' + id).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getControllerActionItemList = function () {
            let deferred = $q.defer();
            AppHttp.get('/app/user-group/getControllerActionItemList?_=' + Math.random())
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        this.getAclList = function () {
            let deferred = $q.defer();
            AppHttp.get('/app/user-group/getAclList?_=' + Math.random())
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.addAclItem = function (data) {
            let deferred = $q.defer();
            if (angular.isUndefined(data.user_group_id) || angular.isUndefined(data.acl)) {
                deferred.resolve({success: false, msg: 'DATA_NOT_FOUND_TEXT'});
            } else {
                AppHttp.post('/app/user-group/addAclItem', data).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }

        this.removeAclItem = function (data) {
            let deferred = $q.defer();
            if (angular.isUndefined(data.user_group_id) || angular.isUndefined(data.acl)) {
                deferred.resolve({success: false, msg: 'DATA_NOT_FOUND_TEXT'});
            } else {
                AppHttp.put('/app/user-group/removeAclItem', data).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }

        this.getCrmUserDetail = function (id) {
            var deferred = $q.defer();
            AppHttp.get('/app/crm-user/detail/' + id)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.getCrmUserList = function (params) {
            var deferred = $q.defer();
            AppHttp.put('/app/crm-user/search', params)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.deleteCrmUser = function (id) {
            var deferred = $q.defer();
            AppHttp.delete('/app/crm-user/delete/' + id)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.createCrmUser = function (data) {
            var deferred = $q.defer();
            AppHttp.post('/app/crm-user/create', data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };
        
        this.updateCrmUser = function (data) {
            var deferred = $q.defer();
            AppHttp.put('/app/crm-user/update/' + data.id, data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.listCurrency = function (data) {
            const deferred = $q.defer();
            AppHttp.put('/app/currency/index', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.createCurrency = function (data) {
            const deferred = $q.defer();
            AppHttp.post('/app/currency/create', data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.updateCurrency = function (data) {
            const deferred = $q.defer();
            AppHttp.put('/app/currency/update', data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.deleteCurrency = function (code) {
            const deferred = $q.defer();
            AppHttp.delete('/app/currency/delete/' + code)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.getCountries = function (data) {
            var deferred = $q.defer();
            AppHttp.put('/app/country/index', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.createCountry = function (data) {
            var deferred = $q.defer();
            AppHttp.post('/app/country/create', data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.getCountryDetail = function (id) {
            var deferred = $q.defer();
            AppHttp.get('/app/country/detail/' +  id).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.importCountryTranslation = function (data) {
            var deferred = $q.defer();
            var url = '/app/country/importTranslation';
            AppHttp.post(url, data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.updateCountry = function (data) {
            var deferred = $q.defer();
            AppHttp.post('/app/country/update', data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.deleteCountry = function (id) {
            var deferred = $q.defer();
            AppHttp.delete('/app/country/delete/' +  id).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getBanks = function () {
            let deferred = $q.defer();

            $http.get('https://api.vietqr.io/v2/banks').then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });

            return deferred.promise;
        }
    }
})();
