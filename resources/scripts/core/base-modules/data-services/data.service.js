(function () {
    'use strict';

    angular
        .module('app.data-services')
        .service('DataService', DataService);

    DataService.$inject = ['$http', '$q', '$httpParamSerializer', '$localStorage', 'DataHttp', '$cacheFactory', '__env'];

    function DataService($http, $q, $httpParamSerializer, $localStorage, DataHttp, $cacheFactory, __env) {


        this.getFromCache = function (url, data) {
            var $httpDefaultCache = $cacheFactory.get('$http');
            return $httpDefaultCache.get(__env.apiHostname + url, data);
        };

        this.getServerTimeZone = function () {
            var deferred = $q.defer();
            DataHttp.get('/app/setting/getServerTimeZone')
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, a) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getClientTimeZone = function () {
            var deferred = $q.defer();
            DataHttp.get('/app/setting/getClientTimeZone')
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.executeAllPromises = function (promises) {
            $q.all(promises).then(function (values) {
            }, function (err) {
                console.log(err);
            });
        }


        this.resetPassword = function (data) {
            var deferred = $q.defer();
            console.log(data);
            if (angular.isUndefined(data.email) || data.email == '') {
                deferred.reject({success: false});
            } else {
                DataHttp.post('/app/password/reset', data)
                    .then(function (response) {
                        deferred.resolve(response.data);
                    }).catch(function (err, status) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }

        this.checkRequestPassword = function (data) {
            var deferred = $q.defer();
            console.log(data);
            if (angular.isUndefined(data.hash) || data.hash == '') {
                deferred.reject({success: false});
            } else {
                DataHttp.post('/app/password/checkrequest', data)
                    .then(function (response) {
                        deferred.resolve(response.data);
                    }).catch(function (err, status) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }


        this.submitNewPassword = function (data) {
            var deferred = $q.defer();
            console.log(data);
            if (angular.isUndefined(data.email) || data.email == '' ||
                angular.isUndefined(data.password) || data.password == '' ||
                angular.isUndefined(data.repeatpassword) || data.repeatpassword == '' ||
                angular.isUndefined(data.hash) || data.hash == '') {
                deferred.reject({success: false});
            } else {
                DataHttp.post('/app/password/resetsubmit', data)
                    .then(function (response) {
                        deferred.resolve(response.data);
                    }).catch(function (err, status) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }


        this.getAvatarObject = function (uuid) {
            var deferred = $q.defer();
            if (uuid == undefined) {
                deferred.reject({success: false});
            } else {
                DataHttp.get('/media/avatar/getObject/' + uuid)
                    .then(function (response) {
                        deferred.resolve(response.data);
                    }).catch(function (err, status) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }

        this.getAvatarObjectDirect = function (uuid) {
            return __env.apiHostname + '/media/avatar/thumbdirect/' + uuid + '?token=' + localStorage.getItem('token_key') + '&getAvatarObjectDirect=true';
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

        this.getEmployeeAvatar = function (uuid) {
            var deferred = $q.defer();
            DataHttp.get('/media/avatar/employee/' + uuid)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getLogoObject = function (uuid, type) {
            var deferred = $q.defer();
            DataHttp.get('/media/avatar/getObject/' + uuid + '?type=' + type)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getMediaListByUuid = function (uuid, type) {
            var deferred = $q.defer();
            DataHttp.put('/media/uploader/list/' + uuid, {
                uuid: uuid,
                type: type
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


        this.getMediaListPayload = function (data) {
            var deferred = $q.defer();
            if (angular.isUndefined(data.uuid) || data.uuid == '') {
                deferred.reject({success: false});
            } else {
                DataHttp.put('/media/uploader/list/' + data.uuid, data)
                    .then(function (response) {
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


        this.getMediaSharedListByUuid = function (uuid) {
            var deferred = $q.defer();
            DataHttp.get('/media/uploader/listShared/' + uuid)
                .then(function (response) {
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
         * upload file
         * @param uuid
         * @param attachments
         * @param objectType
         */
        this.attachFileByUuid = function (data) {
            var deferred = $q.defer();
            if (angular.isUndefined(data.uuid) || data.uuid == '' ||
                angular.isUndefined(data.attachments) || data.attachments == null ||
                angular.isUndefined(data.type) || data.type == '') {
                deferred.resolve({
                    success: true,
                    message: 'DATA_NOT_FOUND_TEXT'
                });
            } else {
                DataHttp.post('/media/uploader/attach_payload', {
                    uuid: data.uuid,
                    attachments: data.attachments,
                    shared: angular.isDefined(data.shared) ? data.shared : null,
                    type: angular.isDefined(data.type) ? data.type : "document"
                }).then(function (response) {
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

        this.attachLogo = function (data) {
            var deferred = $q.defer();
            if (data.uuid == undefined || data.media == undefined || data.type == undefined) {
                deferred.resolve({
                    success: true,
                    message: 'DATA_NOT_FOUND_TEXT'
                });
            } else {
                $http({
                    method: 'POST',
                    url: '/media/avatar/attach_logo',
                    data: jQuery.param({
                        uuid: data.uuid,
                        media: data.media,
                        type: !angular.isUndefined(data.type) && data.type != '' && data.type != undefined ? data.type : ""
                    }),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(function (response) {
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
        /**
         *
         * @param data
         */
        this.attachAvatar = function (data) {
            var deferred = $q.defer();
            if (data.uuid == undefined || data.media == undefined || data.type == undefined) {
                deferred.resolve({
                    success: true,
                    message: 'DATA_NOT_FOUND_TEXT'
                });
            } else {
                $http({
                    method: 'POST',
                    url: '/media/avatar/attach',
                    data: jQuery.param({
                        uuid: data.uuid,
                        media: data.media,
                        type: !angular.isUndefined(data.type) && data.type != '' && data.type != undefined ? data.type : ""
                    }),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(function (response) {
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

        this.getNeedFormRequest = function (uuid) {
            var deferred = $q.defer();
            DataHttp.get('/app/needform/item/' + uuid)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.saveNeedFormRequest = function (data) {
            var deferred = $q.defer();
            if (angular.isUndefined(data.uuid) || data.uuid == '' || data.uuid == 'undefined') {
                deferred.resolve({success: false, msg: 'DATA_NOT_FOUND_TEXT'});
            } else {
                DataHttp.post('/app/needform/saveItem/' + data.uuid, data)
                    .then(function (response) {
                        deferred.resolve(response.data);
                    }).catch(function (err, status) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }

        this.getNationalities = function (lang) {
            var deferred = $q.defer();
            if (lang == undefined || lang == '') lang = 'en';
            DataHttp.get('/app/setting/nationalities/' + lang)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getCountryIsoList = function (lang) {
            var deferred = $q.defer();
            DataHttp.get('/app/setting/getCountryIsoList/' + lang)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getZoneLangList = function () {
            var deferred = $q.defer();
            DataHttp.getFromCacheName('/app/setting/getZoneLangList', {cacheName: 'zoneLangCacheList'}).then(function (response) {
                if (response.data.success) {
                    deferred.resolve({
                        success: true,
                        data: response.data.data,
                    });
                } else {
                    deferred.resolve({
                        success: false,
                        data: [],
                    });
                }
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        this.getCountryList = function (lang) {
            var deferred = $q.defer();
            DataHttp.getFromCacheName('/app/setting/countries/' + lang, {cacheName: 'countriesCacheList'}).then(function (response) {
                if (response.data.success) {
                    deferred.resolve({
                        success: true,
                        data: response.data.data,
                    });
                } else {
                    deferred.resolve({
                        success: false,
                        data: [],
                    });
                }
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.createAppForCompanyFn = function (data) {
            var deferred = $q.defer();
            if (angular.isUndefined(data.hash) || angular.isUndefined(data.company) || angular.isUndefined(data.url)) {
                deferred.resolve({success: false, msg: 'DATA_NOT_FOUND_TEXT'});
            } else {
                DataHttp.post('/app/auth/createApplication', data)
                    .then(function (response) {
                        deferred.resolve(response.data);
                    }).catch(function (err, status) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }

        this.createAppFromInvitationRequestFn = function (data) {
            var deferred = $q.defer();
            DataHttp.post('/app/auth/createAppFromInvitationRequest', data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.checkRegisterRequestToken = function (data) {
            var deferred = $q.defer();
            if (angular.isUndefined(data.hash)) {
                deferred.resolve({success: false, msg: 'DATA_NOT_FOUND_TEXT'});
            } else {
                DataHttp.post('/app/auth/checkRegisterRequestToken', data)
                    .then(function (response) {
                        deferred.resolve(response.data);
                    }).catch(function (err, status) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }

        this.getLoginUrl = function (data) {
            var deferred = $q.defer();

            DataHttp.post('/app/subscription/getLoginUrl/' + data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });

            return deferred.promise;
        }

        this.checkInvitationRequestToken = function (data) {
            var deferred = $q.defer();
            if (angular.isUndefined(data.hash)) {
                deferred.resolve({success: false, msg: 'DATA_NOT_FOUND_TEXT'});
            } else {
                DataHttp.post('/app/auth/checkInvitationRequestToken', data)
                    .then(function (response) {
                        deferred.resolve(response.data);
                    }).catch(function (err, status) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }

        this.registerAccountRequestFn = function (data) {
            var deferred = $q.defer();
            if (angular.isUndefined(data.company) ||
                angular.isUndefined(data.email) ||
                angular.isUndefined(data.email) ||
                angular.isUndefined(data.firstname) ||
                angular.isUndefined(data.firstname) ||
                angular.isUndefined(data.app_type)
            ) {
                deferred.resolve({success: false, msg: 'DATA_NOT_FOUND_TEXT'});
            } else {
                DataHttp.post('/app/auth/saveRegisterRequest', data)
                    .then(function (response) {
                        deferred.resolve(response.data);
                    }).catch(function (err, status) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }

        this.getListCurrencies = function () {
            var deferred = $q.defer();
            var currencies = angular.fromJson($localStorage['currencies']);
            if (currencies && currencies.length > 0) {
                deferred.resolve({
                    success: true,
                    data: currencies,
                });
            } else {
                DataHttp.get('/app/setting/currencies').then(function (response) {
                    if (response.data.success) {
                        currencies = response.data.data;
                        $localStorage['currencies'] = angular.toJson(currencies);
                        deferred.resolve({
                            success: true,
                            data: currencies,
                        });
                    } else {
                        deferred.resolve({
                            success: false,
                            data: [],
                        });
                    }
                }).catch(function (err, status) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }

        this.getListCountries = function () {
            var deferred = $q.defer();
            var countries = angular.fromJson($localStorage['countries']);
            if (countries && countries.length > 0) {
                deferred.resolve({
                    success: true,
                    data: countries,
                });
            } else {
                DataHttp.get('/app/setting/countries').then(function (response) {
                    if (response.data.success) {
                        countries = response.data.data;
                        $localStorage['countries'] = angular.toJson(countries);
                        deferred.resolve({
                            success: true,
                            data: countries,
                        });
                    } else {
                        deferred.resolve({
                            success: false,
                            data: [],
                        });
                    }
                }).catch(function (err, status) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }

        this.getTimezoneList = function () {
            var deferred = $q.defer();
            var timezones = angular.fromJson($localStorage['timezones']);
            if (timezones && timezones.length > 0) {
                deferred.resolve({
                    success: true,
                    data: timezones,
                });
            } else {
                DataHttp.get('/app/setting/timezones').then(function (response) {
                    if (response.data.success) {
                        timezones = response.data.data;
                        $localStorage['timezones'] = angular.toJson(timezones);
                        deferred.resolve({
                            success: true,
                            data: timezones,
                        });
                    } else {
                        deferred.resolve({
                            success: false,
                            data: [],
                        });
                    }
                }).catch(function (err, status) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }


        this.getSpokenLanguages = function (lang = 'en') {
            var deferred = $q.defer();
            DataHttp.get('/app/setting/getSpokenLanguages/' + lang)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getSpokenLanguagesIsoList = function (lang = 'en') {
            var deferred = $q.defer();
            DataHttp.get('/app/setting/getSpokenLanguagesIsoList/' + lang)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        this.getDependantRelations = function () {
            var deferred = $q.defer();
            DataHttp.get('/app/setting/getDependantRelations')
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         *
         * @param email
         */

        this.verfifyAccountEmail = function (email) {
            var deferred = $q.defer();
            DataHttp.put('/app/auth/verifyAccount', {email: email})
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.verifyEmailLogin = function (email) {
            var deferred = $q.defer();
            DataHttp.post('/app/login/check', {email: email})
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        this.resetPassword = function (data) {
            var deferred = $q.defer();
            DataHttp.post('/app/auth/resetPasswordRequest', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.changePasswordWithConfirmCodeFn = function (data) {
            var deferred = $q.defer();
            DataHttp.post('/app/auth/changePasswordWithConfirmCode', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.resendCodeFn = function (data) {
            var deferred = $q.defer();
            if (angular.isUndefined(data.email) || data.email == '') {
                deferred.reject({success: false, message: 'DATA_NOT_FOUND_TEXT'});
            } else {
                DataHttp.post('/app/auth/resendCode', {
                    'credential': data.email,
                    'token': data._token
                }).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        };

        this.verifyCodeFn = function (data) {
            var deferred = $q.defer();
            if (angular.isUndefined(data.email) || data.email == '' || angular.isUndefined(data.verification_code) || data.verification_code == '') {
                deferred.reject({success: false, message: 'DATA_NOT_FOUND_TEXT'});
            } else {
                DataHttp.post('/app/auth/verifyCode', {
                    'credential': data.email,
                    'code': data.verification_code,
                    'token': data._token
                }).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        };

        this.getHrPlansFn = function (data) {
            var deferred = $q.defer();
            DataHttp.post('/app/subscription/getHrPlans', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.getAllPlansFn = function (data) {
            var deferred = $q.defer();
            DataHttp.post('/app/subscription/getAllPlans', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.getCheckoutPage = function (data) {
            var deferred = $q.defer();
            if (angular.isDefined(data.plan_id) && data.plan_id != '') {
                DataHttp.post('/app/subscription/getCheckoutPage', data)
                    .then(function (response) {
                        deferred.resolve(response.data);
                    }).catch(function (err, status) {
                    deferred.reject(err.data);
                });
            } else {
                deferred.reject({success: false});
            }
            return deferred.promise;
        };

    }
})();
