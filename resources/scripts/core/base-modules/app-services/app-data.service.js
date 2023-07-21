(function () {
    'use strict';

    angular
        .module('app.app-services')
        .service('AppDataService', AppDataService);

    AppDataService.$inject = ['$http', '$q', '$httpParamSerializer', '$localStorage', '$filter', 'moment', 'AppHttp'];

    function AppDataService($http, $q, $httpParamSerializer, $localStorage, $filter, moment, AppHttp) {

        var vm = this;

        /**
         * function login
         * @param data
         * @returns {*}
         */

        this.loginFn = function (data) {
            let deferred = $q.defer();
            if (angular.isUndefined(data.credential) || data.credential == '' || angular.isUndefined(data.password) || data.password == '') {
                deferred.resolve({success: false, msg: 'LOGIN_NOT_FOUND_TEXT'});
            } else {
                AppHttp.post('/gms/auth/login?_=' + Math.random(), data)
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
            AppHttp.post('/gms/auth/autoLogin?_=' + Math.random(), data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        this.checkLogin = function () {
            let deferred = $q.defer();
            AppHttp.get('/gms/auth/checkAuthConnected?_=' + Math.random())
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
            AppHttp.get('/gms/setting/getPermissionsList?_=' + Math.random())
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.checkPermission = function (controller, action) {
            let deferred = $q.defer();
            AppHttp.put('/gms/setting/checkPermission', {
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


        this.getRoleByName = function (name) {
            let deferred = $q.defer();
            AppHttp.put('/gms/role/getRoleByName', {name: name})
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getRolesList = function () {
            let deferred = $q.defer();
            AppHttp.get('/gms/role/getRolesList?_=' + Math.random())
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getAclList = function () {
            let deferred = $q.defer();
            AppHttp.get('/gms/role/getAclList?_=' + Math.random())
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getControllerActionItemList = function () {
            let deferred = $q.defer();
            AppHttp.get('/gms/role/getControllerActionItemList?_=' + Math.random())
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.initAllSetting = function () {
            let deferred = $q.defer();
            AppHttp.get('/gms/setting/init?_=' + Math.random())
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        this.getCurrentProfile = function () {
            let deferred = $q.defer();
            AppHttp.get('/gms/profile/index')
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }
        /**
         *
         * @returns {*}
         */
        this.getMyCompanyInfo = function () {
            let deferred = $q.defer();
            AppHttp.get('/gms/my_company/index')
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         *
         * @returns {*}
         */
        this.getMyCompanyApplication = function () {
            let deferred = $q.defer();
            AppHttp.get('/gms/my_company/getApplication')
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         *
         * @returns {*}
         */
        this.getMyCompanyBasicInfo = function () {
            let deferred = $q.defer();
            AppHttp.get('/gms/my_company/getBasicInfo')
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         *
         * @returns {*}
         */
        this.getMyCompanyBusinessInfo = function () {
            let deferred = $q.defer();
            AppHttp.get('/gms/my_company/getBusinessInfo')
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getMyCompanyFinancialInfo = function () {
            let deferred = $q.defer();
            AppHttp.get('/gms/my_company/getFinancialInfo')
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        this.getInitMyCompanyInfo = function () {
            let deferred = $q.defer();
            AppHttp.get('/gms/my_company/init')
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.updateMyCompanyApplication = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/gms/my_company/updateApplication', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }
        /**
         *
         * @returns {*}
         */
        this.saveMyCompanyBasic = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/gms/my_company/saveBasicInfo', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };
        /**
         *
         * @returns {*}
         */
        this.saveMyCompanyFinancialData = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/gms/my_company/saveFinancialData', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        /**
         *
         * @returns {*}
         */
        this.saveMyCompanyBusinessData = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/gms/my_company/saveBusinessData', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        /**
         * test update
         * @returns {*}
         */
        this.getMyCompanyConfiguration = function () {
            let deferred = $q.defer();
            AppHttp.get('/gms/my_company/getConfigurationList')
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
            AppHttp.get('/gms/setting/attributes/' + lang)
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
            AppHttp.get('/gms/setting/reloadAttributes/' + lang)
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
        this.getSettingCountries = function (lang) {
            let deferred = $q.defer();
            if (lang == undefined || lang == '') lang = 'en';
            AppHttp.get('/app/setting/countries/' + lang)
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
            AppHttp.get('/gms/setting/getSettingVariables/' + lang)
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
            AppHttp.get('/gms/setting/getSettingGroup')
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
            AppHttp.get('/gms/setting/user_groups/' + lang)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         *
         */
        this.getSettingSvpUserGroups = function (lang) {
            let deferred = $q.defer();
            if (lang == undefined || lang == '') lang = 'en';
            AppHttp.get('/gms/setting/svp_user_groups/' + lang)
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
            AppHttp.get('/gms/profile/index').then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getMyProfileSettings = function () {
            let deferred = $q.defer();
            AppHttp.get('/gms/profile/getSettingGroup').then(function (response) {
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
            AppHttp.get('/gms/attributes/list?' + kind)
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
            $http.get('/gms/notifications/list?' + kind)
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
            AppHttp.post('/gms/attributes/reload?' + kind)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        this.createContactFromAssignee = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/contacts/createContactFromAssignee', data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.createContactFromUserProfile = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/contacts/createContactFromUserProfile', data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        /**
         * get list of employee
         * @param kind
         */
        this.getEmployeeList = function (kind) {
            if (kind != undefined)
                var url = '/gms/employee/getList/' + kind;
            else
                var url = '/gms/employee/getList';
            let deferred = $q.defer();
            AppHttp.get(url)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.searchEmployeesFull = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/gms/employee/searchAssigneeFull', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         * get list of employee
         * @param kind
         */
        this.getEmployeeSimpleList = function (kind) {
            if (kind != undefined)
                var url = '/gms/employee/simple/' + kind;
            else
                var url = '/gms/employee/simple';
            let deferred = $q.defer();
            AppHttp.get(url)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }
        /**
         * create employee profile
         * @param data
         */
        this.createEmployeeProfile = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/employee/create', data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        /**
         * save employee profile
         * @param data
         */
        this.saveEmployeeProfile = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/gms/employee/edit', data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         * save employee profile
         * @param data
         */
        this.getEmployeeDetails = function (uuid) {
            let deferred = $q.defer();
            if (uuid == undefined || uuid == 0) {
                deferred.resolve({success: false});
            } else {
                AppHttp.get('/gms/employee/detail/' + uuid)
                    .then(function (response) {
                        deferred.resolve(response.data);
                    }).catch(function (err) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }

        /**
         * save employee profile
         * @param data
         */
        this.getEmployeeFields = function (uuid) {
            let deferred = $q.defer();
            if (uuid == undefined || uuid == 0) {
                deferred.resolve({success: false});
            } else {
                AppHttp.get('/gms/employee/getFields/' + uuid)
                    .then(function (response) {
                        deferred.resolve(response.data);
                    }).catch(function (err) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }

        /**
         * save employee profile
         * @param data
         */
        this.getEmployeeLogin = function (uuid) {
            let deferred = $q.defer();
            if (uuid == undefined || uuid == 0) {
                deferred.resolve({success: false});
            } else {
                AppHttp.get('/gms/employee/getLogin/' + uuid)
                    .then(function (response) {
                        deferred.resolve(response.data);
                    }).catch(function (err) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }

        /**
         * save employee profile
         * @param data
         */
        this.getEmployeeProfileSimple = function (id) {
            let deferred = $q.defer();
            AppHttp.get('/gms/employee/item/' + id)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }
        /**
         * get Permissions
         * @param uuid
         * @returns {*}
         */
        this.getEmployeePermissions = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/gms/employee/getPermissions/' + uuid)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         * save employee profile
         * @param data
         */
        this.removeEmployee = function (employee) {
            let deferred = $q.defer();
            AppHttp.delete('/gms/employee/delete/' + employee.uuid)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        /**
         * send validationb employee profile
         * @param data
         */
        this.sendValidationEmployee = function (employee) {
            let deferred = $q.defer();
            AppHttp.put('/gms/employee/sendValidation/' + employee.uuid, {
                uuid: employee.uuid,
            }).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         * get login profile (of employee or of user profile)
         * @param data
         */
        this.getLoginInformation = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/gms/login/detail/' + uuid)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }
        /**
         * create login profile
         * @param data
         */
        this.createLoginInformation = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/login/save', data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.saveLoginInformation = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/gms/login/save', data)
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

        this.getEmployeeAvatar = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/media/avatar/employee/' + uuid)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         *
         * @param id
         */
        this.getHrMemberProfile = function (uuid) {
            let deferred = $q.defer();
            if (angular.isDefined(uuid) && uuid != undefined) {
                AppHttp.get('/gms/hr_member/detail/' + uuid).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                    deferred.reject(err.data);
                });
            } else {
                deferred.reject({success: false});
            }
            return deferred.promise;
        }


        /**
         * @param data
         * @returns {*}
         */
        this.deleteHrMember = function (data) {
            let deferred = $q.defer();
            if (angular.isDefined(data.member) && angular.isDefined(data.member.uuid) && angular.isDefined(data.password)) {
                AppHttp.delete('/gms/hr_member/delete/' + data.member.uuid, {
                    password: data.password
                }).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                    deferred.reject(err.data);
                });
            } else {
                deferred.reject({success: false, message: 'PASSWORD_REQUIRED_TEXTs'});
            }
            return deferred.promise;
        }

        /**
         *
         * @param id
         */
        this.desactiveHrMember = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/gms/hr_member/desactive/' + data.uuid).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         *
         * @param id
         */
        this.reactiveHrMemberFn = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/gms/hr_member/reactive/' + data.uuid).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         * get all roles of HR
         */
        this.getHrRoles = function () {
            let deferred = $q.defer();
            AppHttp.get('/gms/hr_member/get_roles')
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         * get all roles of GMS
         */
        this.getGmsRoles = function () {
            let deferred = $q.defer();
            AppHttp.get('/gms/gms_member/get_roles')
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        /**
         * get Hr Memeber
         * @param kind
         */
        this.getHrMemberList = function (kind) {
            let deferred = $q.defer();
            var url = '/gms/hr_member/index';
            if (kind != undefined) {
                url = url + kind;
            }
            AppHttp.get(url)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        /**
         * get Hr Memeber
         * @param kind
         */
        this.searchHrWorkers = function (data) {
            let deferred = $q.defer();
            var url = '/gms/hr_member/search';
            AppHttp.put(url, data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        /**
         * edit hr member profile
         */
        this.saveHrMemberProfile = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/gms/hr_member/edit', data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         * create hr member profile
         */
        this.createHrMemberProfile = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/hr_member/create', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         * add gms members list
         * @param kind
         */
        this.searchMembers = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/gms/gms_member/search', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        /**
         * add gms members list
         * @param kind
         */
        this.getGmsMembersList = function (kind) {
            let deferred = $q.defer();
            var url = '/gms/gms_member/index';
            if (kind != undefined) {
                url = url + kind;
            }
            AppHttp.get(url)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         * add gms members list
         * @param data
         */
        this.searchGmsMembersList = function (data = {}) {
            let deferred = $q.defer();
            var url = '/gms/gms_member/searchGmsMember';

            AppHttp.put(url, data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         *
         * @param id
         */
        this.getGmsMemberProfile = function (id) {
            let deferred = $q.defer();
            AppHttp.get('/gms/gms_member/detail/' + id).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }
        /**
         *
         * @param id
         */
        this.deleteGmsMember = function (data) {
            let deferred = $q.defer();
            if (angular.isDefined(data.member) && angular.isDefined(data.member.uuid) && angular.isDefined(data.password)) {
                AppHttp.delete('/gms/gms_member/delete/' + data.member.uuid, {
                    password: data.password
                }).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                    deferred.reject(err.data);
                });
            } else {
                deferred.reject({success: false, message: 'PASSWORD_REQUIRED_TEXTs'});
            }
            return deferred.promise;
        }


        /**
         *
         * @param id
         */
        this.updateMyProfile = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/gms/profile/update', data).then(function (response) {
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
        this.editUserProfile = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/gms/user/edit', data)
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
        this.createUserProfile = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/user/create', data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getUserProfileById = function (id) {
            let deferred = $q.defer();
            AppHttp.get('/gms/user/item/' + id)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getUserProfileByUuid = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/gms/user/simple/' + uuid)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         * edit hr member profile
         */
        this.saveGmsMember = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/gms/gms_member/edit', data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        /**
         * create hr member profile
         */
        this.createGmsMember = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/gms_member/create', data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }
        /**
         * create employee
         * @param data
         */
        this.createEmployee = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/employee/create', data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         * edit employee
         * @param data
         */
        this.editEmployee = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/gms/employee/edit', data)
                .then(function (response) {
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

        /**
         * get events of services
         * @param id
         */
        this.getEventsOfService = function (id) {
            let deferred = $q.defer();
            var url = '/gms/service/events/' + id + '?_random=' + Math.random();
            AppHttp.get(url)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         * get events of services
         * @param id
         */
        this.getEventsOfServiceCompany = function (id) {
            let deferred = $q.defer();
            var url = '/gms/service/getEventsOfServiceCompany/' + id + '?_random=' + Math.random();
            AppHttp.get(url)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         * get events of services
         * @param id
         */
         this.getEventsOfRelocation = function () {
            let deferred = $q.defer();
            var url = '/gms/relocation/getEventsOfRelocation' + '?_random=' + Math.random();
            AppHttp.get(url)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         * get events of services
         * @param id
         */
         this.getEventsOfAssignment = function () {
            let deferred = $q.defer();
            var url = '/gms/assignment/getEventsOfAssignment' + '?_random=' + Math.random();
            AppHttp.get(url)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         * get events of services
         * @param id
         */
        this.getPropertyTypes = function () {
            let deferred = $q.defer();
            var url = '/gms/property/types/?_random=' + Math.random();
            AppHttp.get(url)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         * get all provider types
         */
        this.getProviderTypes = function () {
            let deferred = $q.defer();
            var url = '/gms/service/provider_types?_random=' + Math.random();
            AppHttp.get(url)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         * get all provider types
         */
        this.getPropertySetting = function () {
            let deferred = $q.defer();
            var url = '/gms/property/getPropertySetting?_random=' + Math.random();
            AppHttp.get(url)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         * get all provider types
         */
        this.savePropertySetting = function (data) {
            let deferred = $q.defer();
            var url = '/gms/property/savePropertySetting?_random=' + Math.random();
            AppHttp.post(url, data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        /**
         * get services template
         * @returns {*}
         */
        this.getServiceTemplates = function () {
            let deferred = $q.defer();
            var url = '/gms/service/getServiceTemplates?_random=' + Math.random();
            AppHttp.get(url)
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
         * @returns {*}
         */
        this.saveServiceProvider = function (data) {
            let deferred = $q.defer();
            var url = '/gms/svp_company/saveProvider';
            AppHttp.put(url, data)
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
         * @returns {*}
         */
        this.saveServiceProviderBasicInfo = function (data) {
            let deferred = $q.defer();
            var url = '/gms/svp_company/saveBasicInfo/' + data.id;
            AppHttp.put(url, data)
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
         * @returns {*}
         */
        this.saveServiceProviderBusinessInfo = function (data) {
            let deferred = $q.defer();
            var url = '/gms/svp_company/saveBusinessInfo/' + data.id;
            AppHttp.put(url, data)
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
         * @returns {*}
         */
        this.saveServiceProviderFinancialInfo = function (data) {
            let deferred = $q.defer();
            var url = '/gms/svp_company/saveFinancialInfo/' + data.id;
            AppHttp.put(url, data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getServiceProviderList = function (data = {}) {
            let deferred = $q.defer();
            var url = '/gms/svp_company/index?_random=' + Math.random();
            AppHttp.put(url, data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getServiceProviderArchivedList = function (data = {}) {
            let deferred = $q.defer();
            var url = '/gms/svp_company/listArchived?_random=' + Math.random();
            AppHttp.put(url, data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getServiceProviderSimpleList = function (data) {
            let deferred = $q.defer();
            var url = '/gms/svp_company/getSimpleList';
            AppHttp.put(url, data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.quickUpdateServiceProvider = function (data) {
            let deferred = $q.defer();
            var url = '/gms/svp_company/updateServiceCompanyProvider/' + data.id;
            AppHttp.put(url, data)
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
         * @returns {*}
         */
        this.createServiceProvider = function (data) {
            let deferred = $q.defer();
            var url = '/gms/svp_company/createProvider';
            AppHttp.post(url, data)
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
         * @returns {*}
         */
        this.createTaskTemplate = function (data) {
            let deferred = $q.defer();
            let new_data = angular.copy(data);
            new_data.description = btoa(encodeURIComponent(new_data.description));
            var url = '/gms/task-template/createTaskTemplate';
            AppHttp.post(url, new_data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        /**
         *
         * @param data
         * @returns {*}
         */
        this.editTaskTemplate = function (data) {
            let deferred = $q.defer();
            let new_data = angular.copy(data);
            new_data.description = btoa(encodeURIComponent(new_data.description));
            var url = '/gms/service/editTaskTemplate/' + data.service_uuid;
            AppHttp.put(url, new_data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.removeTaskTemplate = function (uuid) {
            let deferred = $q.defer();
            AppHttp.delete('/gms/service/removeTaskTemplate/' + uuid).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }
        /**
         * data = {service_uuid, others data}
         * @param data
         * @returns {*}
         */
        this.addProviderToService = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/service/addProviderToService/' + data.service_uuid, data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.removeProviderFromService = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/gms/service/removeProviderFromService/' + data.service_uuid, data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        /**
         *
         * @param id
         * @returns {*}
         */
        this.getInfoServiceProvider = function (id) {
            let deferred = $q.defer();
            var url = '/gms/svp_company/detail/';
            AppHttp.get(url + id)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        /**
         *
         * @param id
         * @returns {*}
         */
        this.getMembersServiceProvider = function (id) {
            let deferred = $q.defer();
            var url = '/gms/svp_company/member/';
            AppHttp.get(url + id)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         *
         * @param id
         * @returns {*}
         */
        this.deleteServiceProvider = function (id) {
            let deferred = $q.defer();
            var url = '/gms/svp_company/delete/';
            AppHttp.delete(url + id)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         *
         */
        this.getServiceList = function () {
            let deferred = $q.defer();
            var url = '/gms/service/simple';
            AppHttp.get(url).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         * get task list
         * @param kind
         */
        this.getTaskList = function (kind) {
            let deferred = $q.defer();
            if (kind != undefined) {
                kind = $httpParamSerializer(kind);
            }
            AppHttp.get('/gms/task/list/?' + kind)
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

        /**
         * get task list
         * @param kind
         */
        this.getTaskListWithParams = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/gms/task/issues', data)
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

        this.getTaskItemSimple = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/gms/task/item_simple/' + uuid)
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

        /**
         *
         * @returns {*}
         */
        this.getTaskItem = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/gms/task/item/' + uuid)
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

        /**
         *
         * @returns {*}
         */
        this.getTaskAssignment = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/gms/task/getAssignment/' + uuid)
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

        this.getRelocationDependants = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/gms/relocation/getDependants/' + uuid)
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

        this.getRelocationParticipants = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/gms/relocation/getParticipants/' + uuid)
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

        /**
         *
         * @returns {*}
         */
        this.getTaskRelocation = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/gms/task/getRelocation/' + uuid)
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

        /**
         *
         * @returns {*}
         */
        this.getTaskRelocationServiceCompany = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/gms/task/getRelocationServiceCompany/' + uuid)
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


        /**
         *
         * @returns {*}
         */
        this.getTaskParentTask = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/gms/task/getParentTask/' + uuid)
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
        /**
         * @param data
         * @param uuid
         */
        this.getTaskListByUuid = function (uuid, data = {}) {
            let deferred = $q.defer();
            AppHttp.put('/gms/task/list/' + uuid, data)
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
        /**
         *
         * @param task
         */
        this.removeTaskByObject = function (data) {
            let deferred = $q.defer();
            if (angular.isDefined(data.uuid) && data.uuid != '') {
                AppHttp.delete('/gms/task/delete/' + data.uuid)
                    .then(function (response) {
                        if (angular.isDefined(response.data.success) && response.data.success == true) {
                            deferred.resolve(response.data);
                        } else {
                            deferred.reject(response.data);
                        }
                    }).catch(function (err) {
                    deferred.reject(err.data);
                });
            } else {
                deferred.reject({success: false, message: 'DATA_NOT_FOUND_TEXT'});
            }
            return deferred.promise;
        }

        /**
         *
         * @param uuid
         */
        this.removeTaskByUuid = function (uuid) {
            let deferred = $q.defer();
            AppHttp.delete('/gms/task/delete/' + uuid)
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
        /**
         *
         * @param data
         */
        this.createTaskByPayload = function (data) {
            let deferred = $q.defer();
            let new_data = angular.copy(data);
            new_data.description = btoa(encodeURIComponent(new_data.description));
            AppHttp.post('/gms/task/create', new_data).then(function (response) {
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
        this.createTask = function (data) {
            let deferred = $q.defer();
            let new_data = angular.copy(data);
            if(new_data.description != undefined && new_data.description != null && new_data.description != ''){
                new_data.description = btoa(encodeURIComponent(new_data.description));
            }

            AppHttp.post('/gms/task/create', new_data).then(function (response) {
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
        this.createTaskByPost = function (data) {
            let deferred = $q.defer();
            let new_data = angular.copy(data);
            new_data.description = btoa(encodeURIComponent(new_data.description));
            AppHttp.post('/gms/task/create', new_data).then(function (response) {
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


        /**
         *
         * @param data
         */
        this.createOffice = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/office/create', data).then(function (response) {
                if (angular.isDefined(response.data.success)) {
                    deferred.resolve(response.data);
                } else {
                    deferred.reject(response.data);
                }
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.editOffice = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/gms/office/update/' + data.id, data).then(function (response) {
                if (angular.isDefined(response.data.success)) {
                    deferred.resolve(response.data);
                } else {
                    deferred.reject(response.data);
                }
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        /**
         * get office item
         * @param id
         * @returns {*}
         */
        this.getOfficeItem = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/gms/office/detail/' + uuid)
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

        /**
         *
         * @param id
         * @returns {*}
         */
        this.getOfficeList = function () {
            let deferred = $q.defer();
            AppHttp.get('/gms/office/index')
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

        /**

         */
        this.searchOffices = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/gms/office/search', data).then(function (response) {
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

        this.deleteOffice = function (id) {
            let deferred = $q.defer();
            AppHttp.delete('/gms/office/delete/' + id).then(function (response) {
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
        /**
         *
         */
        this.createAssignment = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/assignment/create', data).then(function (response) {
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
        /**
         *
         * @param data
         */
        this.editAssignment = function (data) {
            let deferred = $q.defer();
            if (angular.isUndefined(data.uuid) || data.uuid == '') {
                deferred.reject({success: false});
            } else {
                AppHttp.put('/gms/assignment/update/' + data.uuid, data).then(function (response) {
                    if (angular.isDefined(response.data.success) && response.data.success == true) {
                        deferred.resolve(response.data);
                    } else {
                        deferred.resolve(response.data);
                    }
                }).catch(function (err) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }

        /**
         *
         */
        this.getServicePackPricingList = function () {
            let deferred = $q.defer();
            AppHttp.get('/gms/service_pack_pricing/index')
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getServicePricingList = function () {
            let deferred = $q.defer();
            AppHttp.get('/gms/service_pricing/index')
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getServicePricingSimpleList = function () {
            let deferred = $q.defer();
            AppHttp.get('/gms/service_pricing/simpleList')
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.createServicePricing = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/service_pricing/create', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.editServicePricing = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/gms/service_pricing/edit/' + data.id, data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        this.createServicePackPricing = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/service_pack_pricing/create', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.editServicePackPricing = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/gms/service_pack_pricing/edit/' + data.id, data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }
        this.detailServicePricing = function (id) {
            let deferred = $q.defer();
            AppHttp.get('/gms/service_pricing/detail/' + id + '?_=' + Math.random())
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.detailServicePackPricing = function (id) {
            let deferred = $q.defer();
            AppHttp.get('/gms/service_pack_pricing/detail/' + id + '?_=' + Math.random())
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.deleteServicePricing = function (id) {
            let deferred = $q.defer();
            AppHttp.delete('/gms/service_pricing/del/' + id + '?_=' + Math.random())
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.deleteServicePackPricing = function (id) {
            let deferred = $q.defer();
            AppHttp.delete('/gms/service_pack_pricing/del/' + id + '?_=' + Math.random())
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getInvoicePeriods = function () {
            let deferred = $q.defer();
            AppHttp.get('/gms/service_pricing/getInvoicePeriods')
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         *
         */
        this.getInvoiceQuoteInitData = function () {
            let deferred = $q.defer();
            AppHttp.get('/gms/invoice-quote-config/init?_=' + Math.random())
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }
        /**
         *
         */
        this.getInvoiceList = function () {
            let deferred = $q.defer();
            AppHttp.get('/gms/invoice/getInvoiceList?_=' + Math.random())
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getInvoiceById = function (id) {
            let deferred = $q.defer();
            AppHttp.get('/gms/invoice/detail/' + id + '?_=' + Math.random())
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getInvoiceByUuid = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/gms/invoice/detailByUuid/' + uuid + '?_=' + Math.random())
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.createInvoice = function (data) {
            let deferred = $q.defer();
            data.is_invoice = true;
            AppHttp.post('/gms/invoice/create?_=' + Math.random(), data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.updateInvoice = function (data) {
            let deferred = $q.defer();
            data.is_invoice = true;
            AppHttp.put('/gms/invoice/update?_=' + Math.random(), data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.deleteInvoice = function (id) {
            let deferred = $q.defer();
            AppHttp.delete('/gms/invoice/delete/' + id + '?_=' + Math.random())
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        /**
         *
         */
        this.printInvoice = function (invoiceUuid) {
            let deferred = $q.defer();
            AppHttp.get('/gms/invoice/print/' + invoiceUuid + '?_=' + Math.random())
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /************INVOICE QUOTE*********/

        /************INVOICE QUOTE*********/

        /************ QUOTE*********/

        this.quoteList = function () {
            let deferred = $q.defer();
            AppHttp.get('/gms/quote/getQuoteList/' + '?_=' + Math.random()).then(function (response) {
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
        this.createQuote = function (data) {
            let deferred = $q.defer();
            data.is_quote = true;
            AppHttp.post('/gms/quote/create?_=' + Math.random(), data).then(function (response) {
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
        this.cloneQuote = function (data) {
            let deferred = $q.defer();
            if (angular.isUndefined(data.uuid) || data.uuid == '') {
                deferred.resolve({success: false});
            } else {
                data.is_quote = true;
                AppHttp.post('/gms/quote/clone', data).then(function (response) {
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
        this.updateQuote = function (data) {
            let deferred = $q.defer();
            if (angular.isUndefined(data.uuid) || data.uuid == '') {
                deferred.reject(data);
            } else {
                AppHttp.put('/gms/quote/update/' + data.uuid + '?_=' + Math.random(), data).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }


        this.deleteQuoteByUuid = function (data) {
            let deferred = $q.defer();
            AppHttp.delete('/gms/quote/deleteByUuid/' + data.uuid + '?_=' + Math.random())
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.deleteQuote = function (id) {
            let deferred = $q.defer();
            AppHttp.delete('/gms/quote/delete/' + id + '?_=' + Math.random())
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.printQuote = function (invoiceUuid) {
            let deferred = $q.defer();
            AppHttp.get('/gms/quote/print/' + invoiceUuid + '?_=' + Math.random())
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.deleteQuoteByUuid = function (data) {
            let deferred = $q.defer();
            AppHttp.delete('/gms/quote/deleteByUuid/' + data.uuid + '?_=' + Math.random())
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getQuoteById = function (id) {
            let deferred = $q.defer();
            AppHttp.get('/gms/quote/detail/' + id + '?_=' + Math.random())
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        this.getQuoteByUuid = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/gms/quote/detailByUuid/' + uuid + '?_=' + Math.random())
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        /**
         *
         */
        this.downloadQuote = function (id) {
            let deferred = $q.defer();
            AppHttp.get('/gms/quote/download/' + id + '?_=' + Math.random(), {
                responseType: 'blob'
            }).then(function (response) {
                deferred.resolve(response);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         *
         */
        this.downloadInvoice = function (id) {
            let deferred = $q.defer();
            AppHttp.get('/gms/invoice/download/' + id + '?_=' + Math.random(), {
                responseType: 'blob'
            }).then(function (response) {
                deferred.resolve(response);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }
        /**
         *
         * @param data
         */
        this.saveSpecificDataRelocationService = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/gms/relocation-service/saveInfos', data).then(function (response) {
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
        this.saveSpecificDataRelocationServicePayLoad = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/gms/relocation-service/saveInfos', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        this.createServicePack = function (data) {
            let deferred = $q.defer();
            let new_data = angular.copy(data);
            new_data.description = btoa(encodeURIComponent(new_data.description));
            AppHttp.post('/gms/service_pack/create', new_data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.updateServicePack = function (data) {
            let deferred = $q.defer();
            let new_data = angular.copy(data);
            new_data.description = btoa(encodeURIComponent(new_data.description));
            AppHttp.put('/gms/service_pack/update/' + new_data.id, new_data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getServicePackDetail = function (id) {
            let deferred = $q.defer();
            AppHttp.get('/gms/service_pack/detail/' + id + '?_=' + Math.random()).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getServiceListOfServicePack = function (id) {
            let deferred = $q.defer();
            AppHttp.get('/gms/service_pack/getServiceList/' + id + '?_=' + Math.random()).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.searchProperties = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/gms/property/search', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getAllProperties = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/gms/property/getAll', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getPropertyDetail = function (id) {
            let deferred = $q.defer();
            AppHttp.get('/gms/property/detail/' + id + '?_=' + Math.random()).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.deleteProperty = function (id) {
            let deferred = $q.defer();
            AppHttp.delete('/gms/property/delete/' + id + '?_=' + Math.random()).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.deleteMultipleProperty = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/property/deleteMultiple', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };


        this.createProperty = function (data) {
            let deferred = $q.defer();
            let new_data = angular.copy(data);
            if(new_data.description){
                new_data.description = btoa(encodeURIComponent(new_data.description));
            }
            AppHttp.post('/gms/property/createProperty', new_data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };


        this.getAssignmentDetail = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/gms/assignment/detail/' + uuid + '?_=' + Math.random()).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.getAssignmentDetailById = function (id) {
            let deferred = $q.defer();
            if (id == undefined || id == 0) {
                deferred.resolve({success: false});
            } else {
                AppHttp.get('/gms/assignment/get/' + id).then(function (response) {
                    if (angular.isUndefined(response.data.success)) {
                        deferred.reject(response.data);
                    } else {
                        deferred.resolve(response.data);
                    }
                }).catch(function (err) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        };

        this.getRelocationFromAssignment = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/gms/assignment/getRelocation/' + uuid + '?_=' + Math.random()).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.deleteAssignment = function (uuid) {
            let deferred = $q.defer();
            AppHttp.delete('/gms/assignment/delete/' + uuid + '?_=' + Math.random(), {uuid: uuid}).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.initiateRelocationAssignment = function (uuid) {
            let deferred = $q.defer();
            AppHttp.put('/gms/assignment/initiate_relocation/' + uuid + '?_=' + Math.random(), {uuid: uuid}).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        this.approveAssignment = function (uuid) {
            let deferred = $q.defer();
            AppHttp.put('/gms/assignment/approve/' + uuid + '?_=' + Math.random(), {uuid: uuid}).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        this.archiveAssignment = function (uuid) {
            let deferred = $q.defer();
            AppHttp.put('/gms/assignment/delete/' + uuid + '?_=' + Math.random(), {uuid: uuid}).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        this.getRelocation = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/gms/relocation/item/' + uuid).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        this.getHrCompanyOfRelocation = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/gms/relocation/getAccountOfRelocation/' + uuid).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getRelocationBasicData = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/gms/relocation/detail/' + uuid).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getRelocationServiceCompany = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/gms/relocation-service/item/' + uuid + '?_=' + Math.random()).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getRelocationServiceReminders = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/gms/relocation-service/getReminders/' + uuid).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        /**
         *
         * @param uuid
         * @returns {*}
         */
        this.checkRelocationServiceCompany = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/gms/relocation-service/isExistAndActive/' + uuid + '?_=' + Math.random()).then(function (response) {
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
        this.getRelocationFromRSC = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/gms/relocation-service/getRelocation/' + uuid + '?_=' + Math.random()).then(function (response) {
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
        this.getAssignmentFromRSC = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/gms/relocation-service/getAssignment/' + uuid + '?_=' + Math.random()).then(function (response) {
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
        this.getEmployeeFromRSC = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/gms/relocation-service/getAssignee/' + uuid + '?_=' + Math.random()).then(function (response) {
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
        this.getServiceCompanyFromRSC = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/gms/relocation-service/getServiceCompany/' + uuid + '?_=' + Math.random()).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getServiceTabsFromRSC = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/gms/relocation-service/getServiceTabs/' + uuid + '?_=' + Math.random()).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getProvidersOfService = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/gms/service/get_svp/' + uuid + '?_=' + Math.random()).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        this.getEventsFromRSC = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/gms/relocation-service/getEvents/' + uuid + '?_=' + Math.random()).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        this.getFieldsFromRSC = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/gms/relocation-service/getFields/' + uuid + '?_=' + Math.random()).then(function (response) {
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
        this.getSVPFromRSC = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/gms/relocation-service/getSvpCompany/' + uuid + '?_=' + Math.random()).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        this.getAssignmentFromRelocation = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/gms/relocation/getAssignment/' + uuid + '?_=' + Math.random()).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getEmployeeFromRelocation = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/gms/relocation/getAssgignee/' + uuid + '?_=' + Math.random()).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.removeRelocation = function (uuid) {

        }

        this.getSvpCompaniesAgentsList = function () {
            let deferred = $q.defer();
            AppHttp.get('/gms/svp_company/getAgentsList').then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getSvpCompaniesLandlordList = function () {
            let deferred = $q.defer();
            AppHttp.get('/gms/svp_company/getLandlordsList').then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.getServiceProviderSimpleDetails = function (id) {
            let deferred = $q.defer();
            if (id > 0) {
                AppHttp.get('/gms/svp_company/getDetailsSimple/' + id + '?_=' + Math.random()).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                    deferred.reject(err.data);
                });
            } else {
                deferred.resolve({success: false});
            }
            return deferred.promise;
        }

        this.getServiceProviderListOfService = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/gms/service/get_svp/' + uuid + '?_=' + Math.random()).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.setProviderForRelocationService = function (data) {
            let deferred = $q.defer();
            if (angular.isUndefined(data.uuid) || data.uuid == '') {
                deferred.reject(data);
            } else {
                AppHttp.put('/gms/relocation-service/saveServiceProvider/' + data.uuid, data).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        };

        this.setSvpMemberForRelocationService = function (data) {
            let deferred = $q.defer();
            if (angular.isUndefined(data.uuid) || data.uuid == '') {
                deferred.reject(data);
            } else {
                AppHttp.put('/gms/relocation-service/saveSvpMember/' + data.uuid, data).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        };

        this.getAssignmentList = function (kind) {
            if (kind == undefined) kind = '';
            let deferred = $q.defer();
            AppHttp.get('/gms/assignment/list' + kind).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getAssignmentByEmployee = function (id) {
            let deferred = $q.defer();
            AppHttp.get('/gms/assignment/employee_active/' + id).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.loadAssignmentsByEmployee = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/gms/assignment/loadByEmployee', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getHistoryListOfObject = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/gms/history/list/' + uuid).then(function (response) {
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
                AppHttp.post('/gms/history/saveHistory' + '?_action=' + data.action, data)
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
                AppHttp.post('/gms/notification/addNotification' + '?action=' + data.action, data)
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
            AppHttp.get('/gms/notification/countNotification' + '?action=' + 'countNotification')
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
            AppHttp.post('/gms/notification/setReadTimeNotification' + '?action=' + 'setReadTimeNotification')
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
                AppHttp.post('/gms/notification/addNotificationForUser' + '?action=' + data.action, data)
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
                AppHttp.post('/gms/notification/sendPushNotificationForUser' + '?action=' + data.action, data)
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
            AppHttp.get('/gms/notification/getLastNotification')
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getSimpleListNotification = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/gms/notification/getSimpleListNotification', data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.readNotificationSimple = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/gms/notification/readNotificationSimple/' + uuid)
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
        this.getHomeSearchSuggestForm = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/gms/home-search/getSuggestInformation/' + uuid + '?_=' + Math.random()).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        this.cancelHomeSearchSelectedProperty = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/gms/home-search/cancelSelectedProperty', data).then(function (response) {
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
        this.getHousingPropositionList = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/gms/home-search/getHousingPropositionList/' + uuid + '?_=' + Math.random()).then(function (response) {
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
        this.getHousingPropositionItem = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/gms/home-search/getHousingPropositionItem/' + uuid + '?_=' + Math.random()).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }
        /**
         * @param uuid
         * @returns {*}
         */
        this.getHomeSearchHousingPropositionItem = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/gms/home-search/getHomeSearchHousingPropositionItem/' + uuid + '?_=' + Math.random()).then(function (response) {
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
        this.getHomeSearchCalendar = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/gms/home-search/getCalendarEvents/' + uuid + '?_=' + Math.random()).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        /**
         *
         * @param uuid
         * @param event
         * @returns {*}
         */
        this.addHomeSearchVisiteEvent = function (uuid, event) {
            let deferred = $q.defer();
            AppHttp.put('/gms/home-search/addVisiteEvent/' + uuid, event).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        /**
         * cancel the current visite of housing proposition
         * @param uuid
         * @returns {*}
         */
        this.cancelHousingPropositionVisite = function (uuid) {
            let deferred = $q.defer();
            AppHttp.delete('/gms/home-search/cancelVisiteEvent/' + uuid).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.setSelectedProperty = function (data) {

            let deferred = $q.defer();
            if (angular.isUndefined(data.relocation_service_company_uuid) || angular.isUndefined(data.housing_proposition_uuid)) {
                deferred.reject({success: false});
            } else {
                AppHttp.post('/gms/home-search/changeSelectedProposition', data).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                    deferred.reject(err);
                });
            }
            return deferred.promise;
        };

        /**
         *
         */
        this.getHomeSearchSelectedProperty = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/gms/home-search/getSelectedProperty/' + uuid + '?_=' + Math.random()).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }
        /**
         *
         * @param uuid
         * @returns {*}
         */
        this.changeHomeSearchPropositionStatus = function (data) {
            let deferred = $q.defer();
            if (angular.isUndefined(data.uuid) || angular.isUndefined(data.status)) {
                deferred.reject({success: false});
            } else {
                AppHttp.put('/gms/home-search/changeStatusHousingProposition/' + data.uuid + '?_=' + Math.random(), data).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        };


        /**
         *
         * @param propositions
         * @returns {*}
         */
        this.changeHomeSearchPropositionStatusMultiple = function (propositions) {
            let deferred = $q.defer();
            var vm = this;
            if (propositions.length == 0) {
                deferred.reject({success: false});
            } else {
                let promises = [];
                angular.forEach(propositions, function (proposition) {
                    promises.push(vm.changeHomeSearchPropositionStatus(proposition));
                });
                $q.all(promises).then(function (res) {
                    console.log('res', res);
                    deferred.resolve({success: true});
                }, function (err) {
                    deferred.reject(err.data);
                })
            }
            return deferred.promise;
        };

        /**
         *
         * @param uuid
         */
        this.getHomeSearchSuggestedProperties = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/gms/home-search/getSuggestedProperties/' + uuid + '?_=' + Math.random()).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }
        /**
         *
         * @param propertyId
         * @returns {*}
         */
        this.checkPropertyAvailability = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/gms/home-search/checkPropertyAvailability', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         * get task template
         * @param uuid
         */
        this.getServiceTaskTemplates = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/gms/relocation-service/getTaskTemplate/' + uuid + '?_=' + Math.random()).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getCompanyPriceList = function (data) {
            let deferred = $q.defer();
            AppHttp.get('/gms/company_pricelist/list/', {params: data}).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getCompanyPriceListSimpleData = function (id) {
            let deferred = $q.defer();
            AppHttp.get('/gms/company_pricelist/simpleData/' + id).then(function (response) {
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
                AppHttp.get('/gms/company/detail/' + id).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }

        this.getAccountsList = function (id) {
            let deferred = $q.defer();
            AppHttp.get('/gms/company/index').then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getListHrAccounts = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/gms/company/getListHrAccounts', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getCompanySimpleData = function (id) {
            let deferred = $q.defer();
            if (id == undefined || id == 0) {
                deferred.resolve({success: false});
            } else {
                AppHttp.get('/gms/company/simpleData/' + id).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }

        /**
         * send external comment
         * @param data
         * @returns {*}
         */
        this.sendExternalComment = function (data) {
            let deferred = $q.defer();
            if (angular.isUndefined(data.comment) && angular.isUndefined(data.task_uuid)) {
                deferred.resolve({success: false});
            } else {
                AppHttp.post('/gms/comments/sendToExternalRecipient', data).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }

        /**
         *
         * @param uuid
         * @returns {*}
         */
        this.getNeedAssessmentOfRelocation = function (uuid) {
            let deferred = $q.defer();
            if (uuid == undefined || uuid == 0) {
                deferred.resolve({success: false});
            } else {
                AppHttp.get('/gms/relocation/needAssessmentList/' + uuid).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }

        /**
         *
         * @param uuid
         */
        this.getNeedAssessmentRequestDetail = function (uuid) {
            let deferred = $q.defer();
            if (uuid == undefined || uuid == 0) {
                deferred.resolve({success: false});
            } else {
                AppHttp.get('/gms/need-assessment/requestDetail/' + uuid).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }

        /**
         *
         * @param uuid
         * @returns {*}
         */
        this.getNeedAssessmentOfRelocationService = function (uuid) {
            let deferred = $q.defer();
            if (uuid == undefined || uuid == 0) {
                deferred.resolve({success: false});
            } else {
                AppHttp.get('/gms/relocation-service/needAssessmentList/' + uuid).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }

        /**
         *
         * @returns {*}
         */
        this.getNeedAssessmentList = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/need-assessment/index', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         *
         * @returns {*}
         */
        this.getNeedAssessmentSimpleList = function () {
            let deferred = $q.defer();
            AppHttp.get('/gms/need-assessment/simple').then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.initDataNeedForm = function () {
            let deferred = $q.defer();
            AppHttp.get('/gms/need-assessment/init?_=' + Math.random()).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.createNeedFormGabarit = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/need-assessment/createForm', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        this.saveNeedFormGabarit = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/gms/need-assessment/saveForm/' + data.id, data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getNeedFormGabaritInfo = function (id) {
            let deferred = $q.defer();
            AppHttp.get('/gms/need-assessment/detail/' + id + '?_=' + Math.random()).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.removeNeedFormGabaritItem = function (data) {
            let deferred = $q.defer();
            if (angular.isUndefined(data.id)) {
                deferred.resolve({success: false, msg: 'DATA_NOT_FOUND_TEXT'});
            } else {
                AppHttp.delete('/gms/need-assessment/removeQuestion/' + data.id + '?_=' + Math.random()).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }

        this.saveNeedFormGabaritItem = function (data) {
            let deferred = $q.defer();
            if (angular.isUndefined(data.id)) {
                AppHttp.post('/gms/need-assessment/saveQuestion/', data).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                    deferred.reject(err.data);
                });
            } else {
                AppHttp.post('/gms/need-assessment/saveQuestion/' + data.id, data).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }
        /**
         * save rank
         * @param data
         * @returns {*}
         */
        this.saveRankNeedFormGabaritItem = function (data) {
            let deferred = $q.defer();
            if (angular.isUndefined(data.id) || angular.isUndefined(data.position)) {
                deferred.resolve({success: false});
            } else {
                AppHttp.put('/gms/need-assessment/saveRankQuestion/' + data.id, data).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }


        /**
         * save rank of all items
         * @param items
         */
        this.saveRankNeedFormGabaritItems = function (items) {
            var promises = [];
            angular.forEach(items, function (item) {
                promises.push(vm.saveRankNeedFormGabaritItem(item));
            });
            $q.all(promises).then(function (values) {
                return values;
            });
        }

        /**
         * clone needs assessment
         * @param id
         * @returns {*}
         */
        this.cloneNeedFormGabarit = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/need-assessment/cloneForm', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });

            return deferred.promise;
        }

        /**
         *
         * @param id
         * @returns {*}
         */
        this.deleteNeedFormGabarit = function (id) {
            let deferred = $q.defer();
            AppHttp.delete('/gms/need-assessment/deleteNeedForm/' + id).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         *
         * @param data
         * @returns {*}
         */
        this.sendNeedFormRequest = function (data) {
            let deferred = $q.defer();
            if (angular.isUndefined(data.request_uuid) || data.request_uuid == '' || data.request_uuid == undefined) {
                AppHttp.put('/gms/relocation-service/sendNeedAssessmentFormOfRelocation/', data).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                    deferred.reject(err.data);
                });
            } else {
                AppHttp.put('/gms/relocation-service/sendNeedAssessmentFormOfRelocation/' + data.request_uuid, data).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }

        /**
         * update comments template
         * @param data
         * @returns {*}
         */

        this.updateCommentsTemplate = function (data) {
            let deferred = $q.defer();
            if (angular.isUndefined(data.id) || angular.isUndefined(data.uuid)) {
                deferred.resolve({success: false});
            } else {
                let new_data = angular.copy(data);
                new_data.message = btoa(encodeURIComponent(new_data.message));
                AppHttp.put('/gms/communication-template/update/' + new_data.id, new_data).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }

        /**
         * preview comments template
         * @param data
         * @returns {*}
         */

        this.previewCommentsTemplate = function (data) {
            let deferred = $q.defer();
            if (angular.isUndefined(data.id) || angular.isUndefined(data.uuid)) {
                deferred.resolve({success: false});
            } else {
                let new_data = angular.copy(data);
                new_data.message = btoa(encodeURIComponent(new_data.message));
                AppHttp.put('/gms/communication-template/preview/' + new_data.id, new_data).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }
        /**
         * create comments template
         * @param data
         * @returns {*}
         */

        this.createCommentsTemplate = function (data) {
            let deferred = $q.defer();
            if (angular.isUndefined(data.subject) || angular.isUndefined(data.message)) {
                deferred.resolve({success: false});
            } else {
                let new_data = angular.copy(data);
                new_data.message = btoa(encodeURIComponent(new_data.message));
                AppHttp.post('/gms/communication-template/create/', new_data).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }

        /**
         * create comments template
         * @param data
         * @returns {*}
         */

        this.cloneCommentsTemplate = function (data) {
            let deferred = $q.defer();

            AppHttp.post('/gms/communication-template/clone/', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });

            return deferred.promise;
        }

        /**
         * delete comments template
         * @param data
         * @returns {*}
         */

        this.deleteCommentsTemplate = function (data) {
            let deferred = $q.defer();
            if (angular.isUndefined(data.id) && angular.isUndefined(data.id)) {
                deferred.resolve({success: false});
            } else {
                AppHttp.delete('/gms/communication-template/delete/' + data.id, data).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }

        /**
         * update comments template
         * @param data
         * @returns {*}
         */

        this.detailCommentsTemplate = function (id) {
            let deferred = $q.defer();
            AppHttp.get('/gms/communication-template/item/' + id).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         * update comments template
         * @param data
         * @returns {*}
         */

        this.detailCommentsTemplateAutoFill = function (id, data = {}) {
            let deferred = $q.defer();
            AppHttp.post('/gms/communication-template/itemAutoFill/' + id, data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        /**
         *
         * @returns {*}
         */
        this.getCommentTemplates = function () {
            let deferred = $q.defer();
            AppHttp.get('/gms/communication-template/index').then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         *
         * @returns {*}
         */
        this.getCommentTemplatesSimple = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/communication-template/simple', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         *
         * @returns {*}
         */
        this.searchCommentTemplates = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/communication-template/search', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         *
         * @param data
         * @returns {*}
         */
        this.updataTaskData = function (data) {
            let deferred = $q.defer();
            if (data.uuid == undefined || data.uuid == '') {
                deferred.resolve({success: false, msg: 'DATA_NOT_FOUND_TEXT'});
            } else {

                let new_data = angular.copy(data);
                new_data.description = btoa(encodeURIComponent(new_data.description));
                AppHttp.put('/gms/task/updateTask/' + new_data.uuid, new_data).then(function (response) {
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
        this.saveRemindersInfo = function (data) {
            let deferred = $q.defer();
            if (data.uuid == undefined || data.uuid == '') {
                deferred.resolve({success: false, msg: 'DATA_NOT_FOUND_TEXT'});
            } else {
                AppHttp.put('/gms/reminder/generate/' + data.uuid, data).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }

        this.removeRemindersInfo = function (data) {
            let deferred = $q.defer();
            if (data.uuid == undefined || data.uuid == '') {
                deferred.resolve({success: false, msg: 'DATA_NOT_FOUND_TEXT'});
            } else {
                AppHttp.put('/gms/reminder/stop/' + data.uuid, data).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }

        this.getLastReminderItems = function () {
            let deferred = $q.defer();
            AppHttp.put('/gms/reminder/getLastReminderItems').then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        this.standbyReminder = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/gms/reminder/standByReminder', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.clearAllReminderOfUser = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/gms/reminder/clearAllReminderOfUser', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.createReminderItem = function (data) {
            let deferred = $q.defer();
            if (data.task_uuid == undefined || data.task_uuid == '') {
                deferred.resolve({success: false, msg: 'DATA_NOT_FOUND_TEXT'});
            } else {
                AppHttp.post('/gms/reminder/createReminderItem/' + data.task_uuid, data).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }

        this.setProgressTaskTodo = function (data) {
            let deferred = $q.defer();
            if (data.uuid == undefined || data.uuid == '') {
                deferred.resolve({success: false, msg: 'DATA_NOT_FOUND_TEXT'});
            } else {
                AppHttp.put('/gms/task/setTodo/' + data.uuid, data).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }


        this.setProgressTaskInProgresss = function (data) {
            let deferred = $q.defer();
            if (data.uuid == undefined || data.uuid == '') {
                deferred.resolve({success: false, msg: 'DATA_NOT_FOUND_TEXT'});
            } else {
                AppHttp.put('/gms/task/setInProgress/' + data.uuid, data).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }

        /**
         *
         */
        this.quickSaveTask = function (data) {
            let deferred = $q.defer();
            if (data.uuid == undefined || data.uuid == '') {
                deferred.resolve({success: false, msg: 'DATA_NOT_FOUND_TEXT'});
            } else {
                let new_data = angular.copy(data);
                new_data.description = btoa(encodeURIComponent(new_data.description));
                AppHttp.put('/gms/task/updateTask/' + new_data.uuid, new_data).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }

        this.setProgressTaskDone = function (data) {
            let deferred = $q.defer();
            if (data.uuid == undefined || data.uuid == '') {
                deferred.resolve({success: false, msg: 'DATA_NOT_FOUND_TEXT'});
            } else {
                AppHttp.put('/gms/task/setDone/' + data.uuid, data).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        };

        this.addNewNeedFormCategory = function (data) {
            let deferred = $q.defer();
            if (data.name == undefined || data.name == '') {
                deferred.resolve({success: false, msg: 'DATA_NOT_FOUND_TEXT'});
            } else {
                AppHttp.post('/gms/need-assessment/addNewFormCategory/', data).then(function (response) {
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
                AppHttp.post('/gms/attributes/addNewValue/?name=' + data.name, data).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }

        this.removeServiceCompany = function (uuid) {
            let deferred = $q.defer();
            AppHttp.delete('/gms/service/removeService/' + uuid).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.createServiceCompany = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/service/createServiceCompany', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.editServiceCompany = function (data) {
            let deferred = $q.defer();
            if (angular.isUndefined(data.uuid)) {
                deferred.resolve({success: false, msg: 'DATA_NOT_FOUND_TEXT'});
            } else {
                AppHttp.put('/gms/service/editServiceCompany/' + data.uuid, data).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }

        this.saveServiceTaskList = function (data) {
            let deferred = $q.defer();
            if (angular.isUndefined(data.uuid) || angular.isUndefined(data.tasks)) {
                deferred.resolve({success: true, msg: 'DATA_NOT_FOUND_TEXT'});
            } else {
                AppHttp.put('/gms/service/saveTaskTemplateList/' + data.uuid, data).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }

        this.deleteServiceTaskList = function (data) {
            let deferred = $q.defer();
            if (angular.isUndefined(data.uuid) || angular.isUndefined(data.tasks)) {
                deferred.resolve({success: true, msg: 'DATA_NOT_FOUND_TEXT'});
            } else {
                AppHttp.put('/gms/service/deleteTaskTemplateList/' + data.uuid, data).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }

        this.saveServiceAttachments = function (data) {
            let deferred = $q.defer();
            if (angular.isUndefined(data.uuid) || angular.isUndefined(data.attachments)) {
                deferred.resolve({success: true, msg: 'DATA_NOT_FOUND_TEXT'});
            } else {
                AppHttp.put('/gms/service/saveAttachements/' + data.uuid, data).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }

        this.saveServiceProviderList = function (data) {
            let deferred = $q.defer();
            if (angular.isUndefined(data.uuid) || angular.isUndefined(data.providers)) {
                deferred.resolve({success: true, msg: 'DATA_NOT_FOUND_TEXT'});
            } else {
                AppHttp.put('/gms/service/saveProviderList/' + data.uuid, data).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }


        this.getServiceListActive = function (data = {}) {
            let deferred = $q.defer();
            AppHttp.post('/gms/service/getServicesActive', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getServiceListActiveByIds = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/gms/service/getServiceCompanyByIds', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getServiceRelocationCountListActive = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/gms/relocation/getServicesActive/' + uuid).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        this.getServiceListDesactive = function (data) {
            let deferred = $q.defer();
            AppHttp.get('/gms/service/getSimpleListDesactive').then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getServices = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/service/list', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.initServicedata = function () {

            let deferred = $q.defer();
            AppHttp.get('/gms/service/init').then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        this.getServiceCompanyDetail = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/gms/service/getServiceCompanyDetail/' + uuid).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getServiceFieldDetail = function (id) {
            let deferred = $q.defer();
            AppHttp.get('/gms/service/getServiceFieldDetail/' + id).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getServiceCompanyEventsList = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/gms/service/getServiceCompanyEventsList/' + uuid).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getServiceCompanyProviderList = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/gms/service/getServiceCompanyProviderList/' + uuid).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getServiceCompanyTaskList = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/gms/service/getServiceCompanyTaskList/' + uuid).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getServiceCompanyTasks = function (uuid, data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/service/getServiceCompanyTaskList/' + uuid, data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.addAclItem = function (data) {
            let deferred = $q.defer();
            if (angular.isUndefined(data.role_id) || angular.isUndefined(data.acl)) {
                deferred.resolve({success: false, msg: 'DATA_NOT_FOUND_TEXT'});
            } else {
                AppHttp.post('/gms/role/addAclItem', data).then(function (response) {
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
                AppHttp.put('/gms/role/removeAclItem', data).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }

        this.showGroupAcl = function (id) {
            let deferred = $q.defer();
            AppHttp.get('/gms/role/showgroup/' + id).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.resetAclGroup = function (id) {
            let deferred = $q.defer();
            AppHttp.put('/gms/role/reset/' + id).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         *
         * @returns {*}
         */
        this.getServicePackList = function () {
            let deferred = $q.defer();
            var url = '/gms/service_pack/index';
            AppHttp.get(url)
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

        /**
         *
         * @returns {*}
         */
        this.getServicePackSimpleList = function () {
            let deferred = $q.defer();
            var url = '/gms/service_pack/simpleList';
            AppHttp.get(url)
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


        /**
         *
         * @param id
         * @returns {*}
         */
        this.removeServicePack = function (id) {
            let deferred = $q.defer();
            AppHttp.delete('/gms/service_pack/archive/' + id).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getServicePackFullList = function () {
            let deferred = $q.defer();
            var url = '/gms/service_pack/getFullList';
            AppHttp.get(url)
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

        this.getServicePacks = function (data) {
            let deferred = $q.defer();
            let url = '/gms/service_pack/list';
            AppHttp.post(url, data)
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

        this.getServicePackActiveList = function () {
            let deferred = $q.defer();
            var url = '/gms/service_pack/getActiveList';
            AppHttp.get(url)
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

        this.suggestPropertyToEmployee = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/home-search/addSuggest', data).then(function (response) {
                if (angular.isDefined(response.data.success) && response.data.success == true) {
                    deferred.resolve(response.data);
                } else {
                    deferred.reject(response.data);
                }
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        this.deleteHousingProposition = function (data) {
            let deferred = $q.defer();
            AppHttp.delete('/gms/home-search/deleteHousingProposition/' + data.id).then(function (response) {
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

        this.sendSuggestNotificationPropertyToEmployee = function (serviceUuid) {
            let deferred = $q.defer();
            AppHttp.post('/gms/home-search/sendSuggestNotification', {uuid: serviceUuid}).then(function (response) {
                if (angular.isDefined(response.data.success) && response.data.success == true) {
                    deferred.resolve(response.data);
                } else {
                    deferred.reject(response.data);
                }
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

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
        /**
         *
         * @param data
         * @returns {*}
         */
        this.loadPropertyDataByUrl = function (data) {
            let deferred = $q.defer();
            if (angular.isUndefined(data.url) || data.url == '') {
                deferred.reject();
            } else {
                var url = '/gms/property/loadByUrl';
                AppHttp.post(url, data)
                    .then(function (response) {
                        if (angular.isDefined(response.data)) {
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
         *
         * @param data
         * @returns {*}
         */
        this.propertyGetContentHtml = function (data) {
            let deferred = $q.defer();
            if (angular.isUndefined(data.url) || data.url == '') {
                deferred.reject();
            } else {
                var url = '/gms/property/getContentOfUrl';
                AppHttp.post(url, data)
                    .then(function (response) {
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


        this.attachMediaToObject = function (data) {
            let deferred = $q.defer();
            if (angular.isUndefined(data.uuid) || data.uuid == '' ||
                angular.isUndefined(data.type) || data.type == '' || angular.isUndefined(data.media)) {
                deferred.reject();
            } else {
                AppHttp.post('/gms/uploader/createAttachment', data).then(function (response) {
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
                AppHttp.delete('/gms/uploader/removeAttachment/object/' + data.object_uuid + '/media/' + data.media_uuid).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }

        this.getMediaListByUuid = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/gms/uploader/getListByUuid/' + uuid)
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
                AppHttp.get('/gms/uploader/searchMedia', data).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }

        this.searchAssignee = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/gms/employee/searchAssignee', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.searchService = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/service/searchService', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.searchAssignment = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/gms/assignment/searchAssignment', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.searchAssignmentRequest = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/gms/assignment/searchAssignmentRequest', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getRequest = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/gms/assignment/getRequest/' + uuid).then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        this.rejectRequest = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/assignment/rejectRequest', data).then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };


        this.searchSender = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/gms/communication/searchSender', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.searchSender = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/gms/communication/searchSender', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.searchRelocation = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/gms/relocation/searchRelocation', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        /*** save settings of company **/
        this.saveSettingCompany = function (data) {
            let deferred = $q.defer();
            if (angular.isUndefined(data.name) || data.name == '' || angular.isUndefined(data.value)
            ) {
                deferred.reject();
            } else {
                AppHttp.put('/gms/setting/save', data).then(function (response) {
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

        /**
         *
         * @param uuid
         * @returns {*}
         */
        this.getServiceMenuItems = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/gms/relocation-service/getMenuItems/' + uuid).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getSystemLanguages = function () {
            let deferred = $q.defer();
            AppHttp.get('/gms/setting/language').then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.setSystemLanguage = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/gms/setting/setLanguage', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getSvpWorkerList = function () {
            let deferred = $q.defer();
            AppHttp.get('/gms/svp_worker/index').then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getSvpWorkerListWithParams = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/svp_worker/index', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.createSvpWorker = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/svp_worker/create', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.deleteSvpWorker = function (uuid) {
            let deferred = $q.defer();
            AppHttp.delete('/gms/svp_worker/delete/' + uuid).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.updateSvpWorker = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/gms/svp_worker/update/' + data.uuid, data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getSvpWorkerDetail = function (id) {
            let deferred = $q.defer();
            AppHttp.get('/gms/svp_worker/detail/' + id).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.serviceCompanyLoadProvider = function () {
            let deferred = $q.defer();
            AppHttp.get('/gms/service/loadProviders?_=' + Math.random()).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.searchSvpMembers = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/gms/svp_worker/search', data).then(function (response) {
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
        this.createNewReminder = function (data) {
            let deferred = $q.defer();
            if (data.object_uuid == undefined || data.object_uuid == '') {
                deferred.resolve({success: false, msg: 'DATA_NOT_FOUND_TEXT'});
            } else {
                if (angular.isDefined(data.reminder_date) && data.reminder_date != '') {
                    data.reminder_date_time = moment(data.reminder_date).utc().valueOf() / 1000;
                }
                AppHttp.post('/gms/reminder/createReminderConfig', data).then(function (response) {
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
        this.deleteReminderConfig = function (data) {
            let deferred = $q.defer();
            if (data.uuid == undefined || data.uuid == '') {
                deferred.resolve({success: false, msg: 'DATA_NOT_FOUND_TEXT'});
            } else {
                AppHttp.delete('/gms/reminder/deleteReminderConfig/' + data.uuid).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }

        this.getListReminderOfTask = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/gms/task/getRemindersList/' + uuid).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getListCompanies = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/gms/hr_account/list', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        /**
         *
         * @param data
         * @returns {*}
         */

        this.generateTaskFromWorflowAssignment = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/assignment/applyWorkflow',
                data
            ).then(function (response) {
                deferred.resolve(response.data);
                return response.data;
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }


        this.generateTaskFromWorflowRelocation = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/relocation/applyWorkflow',
                data
            ).then(function (response) {
                deferred.resolve(response.data);
                return response.data;
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        /**
         *
         * @param data
         * @returns {*}
         */

        this.generateTaskFromWorflowAssignment = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/assignment/applyWorkflow',
                data
            ).then(function (response) {
                deferred.resolve(response.data);
                return response.data;
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        this.generateTaskFromWorflowRelocation = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/relocation/applyWorkflow',
                data
            ).then(function (response) {
                deferred.resolve(response.data);
                return response.data;
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        this.generatePasswordForUser = function (profile) {
            let deferred = $q.defer();
            AppHttp.post('/gms/password/generatePasswordForUser', profile).then(function (response) {
                deferred.resolve(response.data);
                return response.data;
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }


        this.generatePasswordRandom = function () {
            let deferred = $q.defer();
            AppHttp.post('/gms/password/generatePasswordRandom').then(function (response) {
                deferred.resolve(response.data);
                return response.data;
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        this.relocationCountEndingSoon = function () {
            let deferred = $q.defer();
            AppHttp.get('/gms/dashboard/relocationCountEndingSoon').then(function (response) {
                deferred.resolve(response.data);
                return response.data;
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        this.relocationCountOngoing = function () {
            let deferred = $q.defer();
            AppHttp.get('/gms/dashboard/relocationCountOnGoing').then(function (response) {
                deferred.resolve(response.data);
                return response.data;
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        this.assignmentCountEndingSoon = function () {
            let deferred = $q.defer();
            AppHttp.get('/gms/dashboard/assignmentCountEndingSoon').then(function (response) {
                deferred.resolve(response.data);
                return response.data;
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        this.taskCountTodo = function () {
            let deferred = $q.defer();
            AppHttp.get('/gms/dashboard/taskCountTodo').then(function (response) {
                deferred.resolve(response.data);
                return response.data;
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        this.taskCountOngoing = function () {
            let deferred = $q.defer();
            AppHttp.get('/gms/dashboard/taskCountOnGoing').then(function (response) {
                deferred.resolve(response.data);
                return response.data;
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        this.getMoreDashboardInfos = function () {
            let deferred = $q.defer();
            AppHttp.get('/gms/dashboard/getMoreDashboardInfos').then(function (response) {
                deferred.resolve(response.data);
                return response.data;
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        this.getRelocationServiceDashboard = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/gms/dashboard/getRelocationServicesList', data).then(function (response) {
                deferred.resolve(response.data);
                return response.data;
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        this.getDashboardMembers = function () {
            let deferred = $q.defer();
            AppHttp.get('/gms/dashboard/getDashboardMembers').then(function (response) {
                deferred.resolve(response.data);
                return response.data;
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }
        /**
         *
         * @returns {*}
         */
        this.searchContact = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/gms/contacts/searchContact', data).then(function (response) {
                deferred.resolve(response.data);
                return response.data;
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        this.createContact = function (data) {
            let deferred = $q.defer();
            if (angular.isUndefined(data.email) || data.email == '') {
                deferred.reject({success: false});
            } else {
                AppHttp.post('/gms/contacts/createContact', data).then(function (response) {
                    deferred.resolve(response.data);
                    return response.data;
                }).catch(function (err) {
                    deferred.reject(err);
                });
            }
            return deferred.promise;
        }

        this.getContactDetail = function (data) {
            let deferred = $q.defer();
            if (angular.isUndefined(data.email) && data.email == '') {
                deferred.reject({success: false});
            } else {
                AppHttp.put('/gms/contacts/getContact', data).then(function (response) {
                    deferred.resolve(response.data);
                    return response.data;
                }).catch(function (err) {
                    deferred.reject(err);
                });
            }
            return deferred.promise;
        }

        this.editContact = function (data) {
            let deferred = $q.defer();
            if (angular.isUndefined(data.email) || data.email == '' || angular.isUndefined(data.id) || !data.id > 0) {
                deferred.reject({success: false});
            } else {
                AppHttp.put('/gms/contacts/updateContact/' + data.id, data).then(function (response) {
                    deferred.resolve(response.data);
                    return response.data;
                }).catch(function (err) {
                    deferred.reject(err);
                });
            }
            return deferred.promise;
        }

        this.deleteContact = function (id) {
            let deferred = $q.defer();
            AppHttp.delete('/gms/contacts/delete/' + id).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        this.saveCommunicationContacts = function (data) {
            let deferred = $q.defer();
            if (angular.isUndefined(data.uuid) || data.uuid == '') {
                deferred.reject({success: false});
            } else {
                AppHttp.put('/gms/communication/saveCommunicationContacts', data).then(function (response) {
                    deferred.resolve(response.data);
                    return response.data;
                }).catch(function (err) {
                    deferred.reject(err);
                });
            }
            return deferred.promise;
        }

        this.companyPriceListInit = function () {
            let deferred = $q.defer();
            AppHttp.get('/gms/company_pricelist/init').then(function (response) {
                deferred.resolve(response.data);
                return response.data;
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        this.companyPriceListAvailableCompanies = function () {
            let deferred = $q.defer();
            AppHttp.get('/gms/company_pricelist/getAvailableCompanies').then(function (response) {
                deferred.resolve(response.data);
                return response.data;
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        this.companyPriceListGetAll = function () {
            let deferred = $q.defer();
            AppHttp.get('/gms/company_pricelist/index').then(function (response) {
                deferred.resolve(response.data);
                return response.data;
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        /**
         *
         * @param id
         * @returns {*}
         */
        this.companyPriceListDetail = function (id) {
            let deferred = $q.defer();
            AppHttp.get('/gms/company_pricelist/detail/' + parseInt(id)).then(function (response) {
                deferred.resolve(response.data);
                return response.data;
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        this.companyPriceListCreate = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/company_pricelist/create/', data).then(function (response) {
                deferred.resolve(response.data);
                return response.data;
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        this.companyPriceListUpdate = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/gms/company_pricelist/update/' + data.id, data).then(function (response) {
                deferred.resolve(response.data);
                return response.data;
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        this.companyPriceListDelete = function (data) {
            let deferred = $q.defer();
            if (angular.isUndefined(data.id) || data.id == '' || data.id == 0) {
                deferred.resolve({success: false, message: 'DATA_NOT_FOUND_TEXT'});
            } else {
                AppHttp.put('/gms/company_pricelist/delete/', data).then(function (response) {
                    deferred.resolve(response.data);
                    return response.data;
                }).catch(function (err) {
                    deferred.reject(err);
                });
            }
            return deferred.promise;
        }

        this.getReportCommentsOfTask = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/gms/task/report_comments/' + uuid).then(function (response) {
                deferred.resolve(response.data);
                return response.data;
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        this.getReportStatusOfTask = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/gms/task/report_status/' + uuid).then(function (response) {
                deferred.resolve(response.data);
                return response.data;
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        this.deleteTaxRule = function (id) {
            let deferred = $q.defer();
            AppHttp.delete('/gms/tax_rule/del/' + id).then(function (response) {
                deferred.resolve(response.data);
                return response.data;
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        this.detailTaxRule = function (id) {
            let deferred = $q.defer();
            AppHttp.get('/gms/tax_rule/detail/' + id).then(function (response) {
                deferred.resolve(response.data);
                return response.data;
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        this.createTaxRule = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/tax_rule/create', data).then(function (response) {
                deferred.resolve(response.data);
                return response.data;
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        this.updateTaxRule = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/gms/tax_rule/update/' + data.id, data).then(function (response) {
                deferred.resolve(response.data);
                return response.data;
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        this.getTaxRuleList = function (data) {
            let deferred = $q.defer();
            AppHttp.get('/gms/tax_rule/index').then(function (response) {
                deferred.resolve(response.data);
                return response.data;
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        this.getTaxRuleActive = function () {
            let deferred = $q.defer();
            AppHttp.get('/gms/tax_rule/getTaxRuleActive').then(function (response) {
                deferred.resolve(response.data);
                return response.data;
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        this.getTaskTodayDashboard = function () {
            let deferred = $q.defer();
            AppHttp.get('/gms/dashboard/taskTodayList').then(function (response) {
                deferred.resolve(response.data);
                return response.data;
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        this.getRelocationTodayDashboard = function () {
            let deferred = $q.defer();
            AppHttp.get('/gms/dashboard/relocationTodayList').then(function (response) {
                deferred.resolve(response.data);
                return response.data;
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        this.getRelocationOnGoing = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/gms/dashboard/relocationListOnGoing', data).then(function (response) {
                deferred.resolve(response.data);
                return response.data;
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        this.getAssignmentTodayDashboard = function () {
            let deferred = $q.defer();
            AppHttp.get('/gms/dashboard/assignmentTodayList').then(function (response) {
                deferred.resolve(response.data);
                return response.data;
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        this.getAssignmentOnGoing = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/gms/dashboard/assignmentListOnGoing', data).then(function (response) {
                deferred.resolve(response.data);
                return response.data;
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        this.getTaskActiveByUser = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/gms/dashboard/getTaskActiveByUser', data).then(function (response) {
                deferred.resolve(response.data);
                return response.data;
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        this.getTodayActivities = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/gms/notification/today', data).then(function (response) {
                deferred.resolve(response.data);
                return response.data;
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;

        }

        this.getObjectActivities = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/gms/notification/getObjectFeed', data).then(function (response) {
                deferred.resolve(response.data);
                return response.data;
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;

        }

        this.getAttributeDetail = function (id) {
            let deferred = $q.defer();
            AppHttp.get('/gms/attributes/detail/' + id).then(function (response) {
                deferred.resolve(response.data);
                return response.data;
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        this.editAttribute = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/gms/attributes/edit/', data).then(function (response) {
                deferred.resolve(response.data);
                return response.data;
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        this.relocationInviteAssignee = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/gms/relocation/inviteAssignee', data).then(function (response) {
                deferred.resolve(response.data);
                return response.data;
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        this.verfifyPrincipalEmail = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/gms/user/checkEmail', data).then(function (response) {
                deferred.resolve(response.data);
                return response.data;
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        this.saveSettingProfile = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/gms/profile/saveSetting', data).then(function (response) {
                deferred.resolve(response.data);
                return response.data;
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        this.getUserSettingVariables = function () {
            let deferred = $q.defer();
            AppHttp.get('/gms/profile/getSettingVariables')
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


        /**
         *  getBookerLIst
         * @returns {*}
         */
        this.getBookersList = function () {
            let deferred = $q.defer();
            AppHttp.get('/gms/bookers/index')
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         *  getBookerLIst
         * @returns {*}
         */
        this.searchBookersList = function (data = {}) {
            let deferred = $q.defer();
            AppHttp.put('/gms/bookers/searchBookerAccounts', data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         *  getBookerLIst
         * @returns {*}
         */
        this.getBookerDetail = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/gms/bookers/detail/' + uuid)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         *  getBookerLIst
         * @returns {*}
         */
        this.deleteBooker = function (data) {
            let deferred = $q.defer();
            AppHttp.delete('/gms/bookers/delete/' + data.uuid)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        /**
         *  getBookerLIst
         * @returns {*}
         */
        this.getSimpleBookersList = function () {
            let deferred = $q.defer();
            AppHttp.get('/gms/bookers/simple')
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        this.getBookersByIds = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/bookers/loadBookersByIds', data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.createBooker = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/bookers/create', data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.editBooker = function (data) {
            let deferred = $q.defer();
            if (angular.isDefined(data.uuid) && data.uuid != '') {
                AppHttp.put('/gms/bookers/edit/' + data.uuid, data)
                    .then(function (response) {
                        deferred.resolve(response.data);
                    }).catch(function (err) {
                    deferred.reject(err.data);
                });
            } else {
                deferred.reject({success: false});
            }
            return deferred.promise;
        }

        this.editBookerFinancial = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/gms/bookers/editFinancialData', data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.searchCompaniesAndBookers = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/company/search', data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.allCompaniesBookers = function (data) {
            var deferred = $q.defer();
            AppHttp.post('/gms/company/allSimple', data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.searchBookers = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/gms/bookers/search', data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getEmployeeDependants = function (id) {
            let deferred = $q.defer();
            AppHttp.get('/gms/employee/getDependants/' + id)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.addEmployeeDependant = function (employee, dependant) {
            let deferred = $q.defer();
            AppHttp.post('/gms/employee/addDependant', {
                employee_uuid: employee.uuid,
                dependant: dependant
            }).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.editEmployeeDependant = function (dependant) {
            let deferred = $q.defer();
            AppHttp.put('/gms/employee/editDependant/' + dependant.uuid, dependant).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.deleteEmployeeDependant = function (dependant) {
            let deferred = $q.defer();
            AppHttp.put('/gms/employee/deleteDependant/' + dependant.uuid, dependant).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getDependantDetail = function (employee, dependantId) {
            let deferred = $q.defer();
            AppHttp.get('/gms/employee/getDependantDetail/' + dependantId).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.createEmployeeMultipleDependants = function (data) {

            let deferred = $q.defer();

            if (data != undefined || angular.isUndefined(data.employee) || angular.isUndefined(data.dependants)) {
                var promises = [];
                angular.forEach(data.dependants, function (dependant) {
                    promises.push(vm.addEmployeeDependant(data.employee, dependant).then(
                        function (res) {
                            return res;
                        },
                        function (err) {
                            deferred.reject(err);
                        }
                    ))
                });

                $q.all(promises).then(function (res) {
                    deferred.resolve({success: true});
                }, function (err) {
                    deferred.reject(res);
                });
            } else {
                deferred.resolve({success: false});
            }
            return deferred.promise;
        }
        this.getTeamsList = function () {
            let deferred = $q.defer();
            AppHttp.get('/gms/team/index').then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getTeamsListWithParams = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/team/index', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.searchTeams = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/gms/team/search', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.createTeam = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/team/create', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.editTeam = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/gms/team/edit/' + data.id, data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.deleteTeam = function (teamUuid) {
            let deferred = $q.defer();
            AppHttp.delete('/gms/team/delete/' + teamUuid).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.viewTeam = function (teamId) {
            let deferred = $q.defer();
            AppHttp.get('/gms/team/detail/' + teamId).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getDepartmentsList = function () {
            let deferred = $q.defer();
            AppHttp.get('/gms/department/index').then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getDepartmentsListWithParams = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/department/index', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getSimpleListDepartment = function () {
            let deferred = $q.defer();
            AppHttp.get('/gms/department/simpleList').then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.searchDepartments = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/gms/department/search', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.createDepartment = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/department/create', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.editDepartment = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/gms/department/edit/' + data.id, data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.deleteDepartment = function (departmentId) {
            let deferred = $q.defer();
            AppHttp.delete('/gms/department/delete/' + departmentId).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.viewDepartment = function (departUuid) {
            let deferred = $q.defer();
            AppHttp.get('/gms/department/detail/' + departUuid).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        this.editCompany = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/gms/company/update/' + data.id, data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.createCompany = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/company/create/', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.initApplicationData = function (companyId) {
            let deferred = $q.defer();
            AppHttp.get('/gms/company/initApplicationData/' + companyId).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getCompanyApplication = function (companyId) {
            let deferred = $q.defer();
            AppHttp.get('/gms/company/getApplication/' + companyId).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.updateCompanyApplication = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/gms/company/updateApplication/' + data.company_id, data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.createCompanyApplication = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/company/createApplication/' + data.company_id, data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        this.countInvoiceQuote = function () {
            let deferred = $q.defer();
            AppHttp.get('/gms/invoice_quote/countInvoiceQuote').then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.generateNicknameGmsMember = function (uuid) {

            let deferred = $q.defer();
            AppHttp.get('/gms/gms_member/generate_nickname/' + uuid).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.checkValidation = function (controller, action) {
            let deferred = $q.defer();
            AppHttp.put('/gms/acl/checkValidation', {controller: controller, action: action}).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.loadServiceTemplateContent = function (id) {

            let deferred = $q.defer();
            AppHttp.get('/gms/acl/loadServiceTemplateContent/' + id + '?_=' + Math.random()).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.loadServiceTemplateContent = function (id) {
            let deferred = $q.defer();
            AppHttp.get('/gms/service/loadServiceTemplateContent/' + id + '?_=' + Math.random()).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }
        /**
         * data = {type_id, providers}
         * @param data
         * @returns {*}
         */
        this.loadProviderRelationByType = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/gms/service/loadProviderRelationByType/' + '?_=' + Math.random(), data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        this.verfifyAccountEmail = function (email) {
            let deferred = $q.defer();
            AppHttp.put('/gms/auth/verifyAccount', {email: email})
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
                AppHttp.post('/gms/auth/changeSecurity', data).then(function (response) {
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
                AppHttp.post('/gms/auth/verifyCode', {
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
                AppHttp.post('/gms/auth/resendCode', {
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
            AppHttp.post('/gms/auth/reset', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.changePasswordWithConfirmCodeFn = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/auth/changePasswordWithConfirmCode', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getCompanyBuSubDomain = function (sub_domain) {
            let deferred = $q.defer();
            AppHttp.get('/gms/auth/getCompanyBySubDomain/' + sub_domain)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.changeMyPassword = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/auth/changeMyPassword', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.changeUserPassword = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/auth/changeUserPassword', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.resetUserPassword = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/user/resetUserPassword', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getProperties = function (params) {
            let deferred = $q.defer();
            AppHttp.put('/gms/property/index', params).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getSupportTicketsList = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/customer-support-ticket/tickets', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.createSupportTicket = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/customer-support-ticket/create', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.createSupportQuestion = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/customer-support-ticket/create', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getSupportRequestDetail = function (id) {
            let deferred = $q.defer();
            AppHttp.get('/gms/customer-support-ticket/request/' + id).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getSupportRequestReplies = function (id) {
            let deferred = $q.defer();
            AppHttp.get('/gms/customer-support-ticket/replies/' + id).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.replySupportRequest = function (data) {
            let deferred = $q.defer();
            if (angular.isUndefined(data.ticket_id) || !data.ticket_id > 0) {
                deferred.reject({success: false});
            } else {
                AppHttp.put('/gms/customer-support-ticket/reply/' + data.ticket_id, data).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }

        this.getAllTaskServicesOfRelocation = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/gms/task/getAllTasksServicesList/' + uuid).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getRelocationReminders = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/gms/relocation/getReminders/' + uuid).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getCountriesOriginRelocationDashboard = function () {
            let deferred = $q.defer();
            AppHttp.get('/gms/dashboard/getCountriesOriginRelocation').then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        this.getAccountsOriginRelocationDashboard = function (data) {
            let deferred = $q.defer();
            if (angular.isUndefined(data)) {
                data = {};
            }
            AppHttp.put('/gms/dashboard/getAccountsOriginRelocation', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        this.getCountriesOriginRelocationMapDashboard = function () {
            let deferred = $q.defer();
            AppHttp.get('/gms/dashboard/getCountriesOriginRelocationMap').then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getBookersOriginRelocationDashboard = function (data) {
            let deferred = $q.defer();
            if (angular.isUndefined(data)) {
                data = {};
            }
            AppHttp.put('/gms/dashboard/getBookersOriginRelocation', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        this.getAttribute = function (name) {
            let deferred = $q.defer();
            AppHttp.get('/gms/attributes/item/' + name).then(function (response) {
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

        this.loadServiceOfRelocation = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/gms/relocation/getServices/' + uuid).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        this.getPolicyDetail = function (id) {
            let deferred = $q.defer();
            AppHttp.get('/gms/policy/detail/' + id).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        this.getPoliciesSimpleList = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/gms/policy/getSimpleList', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getPoliciesList = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/gms/policy/getList', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.setFaqReviewPositive = function (faqContentId) {
            let deferred = $q.defer();
            AppHttp.post('/gms/faq/setReviewPositive/' + faqContentId, {faq_content_id: faqContentId}).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.setFaqReviewNative = function (faqContentId) {
            let deferred = $q.defer();
            AppHttp.post('/gms/faq/setReviewNegative/' + faqContentId, {faq_content_id: faqContentId}).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getFaqList = function () {
            let deferred = $q.defer();
            AppHttp.get('/gms/faq/index').then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.makeReportPdfFromHtml = function (html) {
            let deferred = $q.defer();
            AppHttp.post('/gms/report/pdf', {
                html: html
            }).then(function (data, status, headers, config) {
                deferred.resolve(data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            ;
            return deferred.promise;
        }

        this.getExtractDataAssignment = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/extract-data/assignment/', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getExtractDataAssignmentResult = function (execuationID, data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/extract-data/assignmentResult/' + execuationID, data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.getExtractDataRelocation = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/extract-data/relocation/', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.getExtractDataRelocationResult = function (execuationID, data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/extract-data/relocationResult/' + execuationID, data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.getExtractDataInvoice = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/extract-data/invoice/', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getExtractDataInvoiceResult = function (execuationID, data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/extract-data/invoiceResult/' + execuationID, data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.getExtractDataInvoiceItem = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/extract-data/invoiceItem/', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getExtractDataInvoiceItemResult = function (execuationID, data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/extract-data/invoiceItemResult/' + execuationID, data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.getExtractDataAssignee = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/extract-data/assignee', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getExtractDataAssigneeResult = function (execuationID, data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/extract-data/assigneeResult/' + execuationID, data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };


        this.getExtractDataService = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/extract-data/service/', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.getExtractDataServiceResult = function (execuationID, data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/extract-data/serviceResult/' + execuationID, data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        /**
         *
         * @param id
         */
        this.checkUserProfileApplication = function (userProfileUuid) {
            let deferred = $q.defer();
            AppHttp.get('/gms/member/checkApplication/' + userProfileUuid).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         *
         * @param data
         * @returns {*}
         */
        this.getMembersListByCompany = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/gms/member/getMembersByCompany', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getMemberProfile = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/gms/member/getProfile', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        this.createEmployeeDocument = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/document/createDocument', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.updateEmployeeDocument = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/gms/document/updateDocument/' + data.uuid, data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.deleteEmployeeDocument = function (data) {
            let deferred = $q.defer();
            AppHttp.delete('/gms/document/deleteDocument/' + data.uuid).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getEmployeeDocuments = function (employee_uuid) {
            let deferred = $q.defer();
            AppHttp.get('/gms/entity-document/getDocuments/' + employee_uuid).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         * get document type
         * @returns {*}
         */
        this.getDocumentTypes = function () {
            let deferred = $q.defer();
            AppHttp.get('/gms/setting/getDocumentTypeList')
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.verifyDomain = function () {
            let deferred = $q.defer();
            AppHttp.get('/gms/setting/checkDomain').then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        /**
         * get Assignment Workflow
         * @param kind
         */
        this.getWorkflowList = function (data) {
            let deferred = $q.defer();
            var url = '/gms/workflow/index/' + data;
            AppHttp.get(url)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         * get Assignment Workflow
         * @param kind
         */
        this.removeWorkflow = function (data) {
            let deferred = $q.defer();
            var url = '/gms/workflow/remove/' + data;
            AppHttp.delete(url)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         * get Workflow
         * @param kind
         */
        this.createWorkflow = function (data) {
            let deferred = $q.defer();
            var url = '/gms/workflow/create';
            AppHttp.post(url, data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         * get Workflow
         * @param kind
         */
        this.updateWorkflow = function (data) {
            let deferred = $q.defer();
            var url = '/gms/workflow/edit';
            AppHttp.post(url, data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }
        /**
         * get Workflow
         */
        this.getWorkflowById = function (id = 0, data = {}) {
            let deferred = $q.defer();
            let url = '/gms/workflow/detail/' + id;
            AppHttp.post(url, data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         * get Workflow
         * @param kind
         */
        this.createTaskWorkflow = function (data) {
            let deferred = $q.defer();
            var url = '/gms/workflow/createTaskWorkflow';
            AppHttp.post(url, data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         * get Workflow
         * @param kind
         */
        this.editTaskWorkflow = function (data) {
            let deferred = $q.defer();
            var url = '/gms/workflow/editTaskWorkflow';
            AppHttp.post(url, data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         * get Workflow
         * @param kind
         */
        this.removeTaskWorkflow = function (data) {
            let deferred = $q.defer();
            var url = '/gms/workflow/removeTaskWorkflow/' + data;
            AppHttp.delete(url)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         * get Workflow
         * @param kind
         */
        this.getTaskListOfWorkflow = function (data) {
            let deferred = $q.defer();
            var url = '/gms/workflow/getTaskList/' + data;
            AppHttp.get(url)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         * get Workflow
         * @param kind
         */
        this.createSubTaskWorkflow = function (data) {
            let deferred = $q.defer();
            var url = '/gms/workflow/createSubTask';
            AppHttp.post(url, data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         * get Workflow
         * @param kind
         */
        this.editSubTaskWorkflow = function (data) {
            let deferred = $q.defer();
            var url = '/gms/workflow/editSubTask';
            AppHttp.post(url, data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         * get Workflow
         * @param kind
         */
        this.removeSubTaskWorkflow = function (data) {
            let deferred = $q.defer();
            var url = '/gms/workflow/removeSubTask/' + data;
            AppHttp.delete(url)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         *
         * @returns {*}
         */
        this.getCommunicationEmails = function () {
            let deferred = $q.defer();
            AppHttp.get('/gms/communication-email/index').then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         *
         * @returns {*}
         */
        this.saveProviderSetting = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/communication-email/create', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         *
         * @returns {*}
         */
        this.updateProviderSetting = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/communication-email/update', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         *
         * @returns {*}
         */
        this.deleteSettingProvider = function (data) {
            let deferred = $q.defer();
            AppHttp.delete('/gms/communication-email/delete/' + data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.activeSettingProvider = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/communication-email/active/', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.deactiveSettingProvider = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/communication-email/deactive/', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         *
         * @returns {*}
         */
        this.detailSettingProvider = function (data) {
            let deferred = $q.defer();
            AppHttp.get('/gms/communication-email/item/' + data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         *
         * @returns {*}
         */
        this.getGoogleAuthUrl = function () {
            let deferred = $q.defer();
            AppHttp.get('/gms/communication-email/getGoogleAuthUrl/').then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         *
         * @returns {*}
         */
        this.getOutlookAuthUrl = function () {
            let deferred = $q.defer();
            AppHttp.get('/gms/communication-email/getOutlookAuthUrl/').then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         *
         * @returns {*}
         */
        this.updateSignature = function (data) {
            let deferred = $q.defer();
            let new_data = angular.copy(data);
            new_data.signature = btoa(encodeURIComponent(new_data.signature));
            AppHttp.post('/gms/communication-email/updateSignature/', new_data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getMails = function () {
            let deferred = $q.defer();
            AppHttp.get('/gms/communication-email/getMails')
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.checkCommunicationTokenExpired = function () {
            let deferred = $q.defer();
            AppHttp.get('/gms/communication-email/checkTokenExpired').then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         * get Assignment Workflow
         * @param kind
         */
        this.getWorkflowList = function (data) {
            let deferred = $q.defer();
            var url = '/gms/workflow/index/' + data;
            AppHttp.get(url)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         * get Assignment Workflow
         * @param kind
         */
        this.removeWorkflow = function (data) {
            let deferred = $q.defer();
            var url = '/gms/workflow/remove/' + data;
            AppHttp.delete(url)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         * get Workflow
         * @param kind
         */
        this.createWorkflow = function (data) {
            let deferred = $q.defer();
            var url = '/gms/workflow/create';
            AppHttp.post(url, data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         * get Workflow
         * @param kind
         */
        this.updateWorkflow = function (data) {
            let deferred = $q.defer();
            var url = '/gms/workflow/edit';
            AppHttp.post(url, data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }
        // /**
        //  * get Workflow
        //  * @param kind
        //  */
        // this.getWorkflowById = function (data) {
        //     let deferred = $q.defer();
        //     var url = '/gms/workflow/detail/' + data;
        //     AppHttp.get(url)
        //         .then(function (response) {
        //             deferred.resolve(response.data);
        //         }).catch(function (err) {
        //         deferred.reject(err.data);
        //     });
        //     return deferred.promise;
        // }

        /**
         * get Workflow
         * @param kind
         */
        this.createTaskWorkflow = function (data) {
            let deferred = $q.defer();
            var url = '/gms/workflow/createTaskWorkflow';
            AppHttp.post(url, data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         * get Workflow
         * @param kind
         */
        this.editTaskWorkflow = function (data) {
            let deferred = $q.defer();
            var url = '/gms/workflow/editTaskWorkflow';
            AppHttp.post(url, data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         * get Workflow
         * @param kind
         */
        this.removeTaskWorkflow = function (data) {
            let deferred = $q.defer();
            var url = '/gms/workflow/removeTaskWorkflow/' + data;
            AppHttp.delete(url)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.removeTaskTemplateWorkflow = function (data){
            let deferred = $q.defer();
            var url = '/gms/workflow/removeTaskTemplateWorkflow/' + data;
            AppHttp.delete(url)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        /**
         * get Workflow
         * @param kind
         */
        this.getTaskListOfWorkflow = function (data) {
            let deferred = $q.defer();
            var url = '/gms/workflow/getTaskList/' + data;
            AppHttp.get(url)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         * get Workflow
         * @param kind
         */
        this.createSubTaskWorkflow = function (data) {
            let deferred = $q.defer();
            var url = '/gms/workflow/createSubTask';
            AppHttp.post(url, data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         * get Workflow
         * @param kind
         */
        this.editSubTaskWorkflow = function (data) {
            let deferred = $q.defer();
            var url = '/gms/workflow/editSubTask';
            AppHttp.post(url, data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         * get Workflow
         * @param kind
         */
        this.removeSubTaskWorkflow = function (data) {
            let deferred = $q.defer();
            var url = '/gms/workflow/removeSubTask/' + data;
            AppHttp.delete(url)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         *
         * @returns {*}
         */
        this.getCommunicationEmails = function () {
            let deferred = $q.defer();
            AppHttp.get('/gms/communication-email/index').then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         *
         * @returns {*}
         */
        this.saveProviderSetting = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/communication-email/create', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         *
         * @returns {*}
         */
        this.updateProviderSetting = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/communication-email/update', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         *
         * @returns {*}
         */
        this.deleteSettingProvider = function (data) {
            let deferred = $q.defer();
            AppHttp.delete('/gms/communication-email/delete/' + data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         *
         * @returns {*}
         */
        this.detailSettingProvider = function (data) {
            let deferred = $q.defer();
            AppHttp.get('/gms/communication-email/item/' + data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         *
         * @returns {*}
         */
        this.getGoogleAuthUrl = function () {
            let deferred = $q.defer();
            AppHttp.get('/gms/communication-email/getGoogleAuthUrl/').then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         *
         * @returns {*}
         */
        this.getOutlookAuthUrl = function () {
            let deferred = $q.defer();
            AppHttp.get('/gms/communication-email/getOutlookAuthUrl/').then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         *
         * @returns {*}
         */
        this.updateSignature = function (data) {
            let deferred = $q.defer();
            let new_data = angular.copy(data);
            new_data.signature = btoa(encodeURIComponent(new_data.signature));
            AppHttp.post('/gms/communication-email/updateSignature/', new_data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getMails = function () {
            let deferred = $q.defer();
            AppHttp.get('/gms/communication-email/getMails')
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        this.initNotificationConfig = function () {
            let deferred = $q.defer();
            AppHttp.get('/gms/notification-config/init')
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getNotificationGroupList = function () {
            let deferred = $q.defer();
            AppHttp.get('/gms/notification-config/getGroupList')
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.getNotificationSettingList = function () {
            let deferred = $q.defer();
            AppHttp.get('/gms/notification-config/getList')
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.saveNotificationSetting = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/gms/notification-config/saveSetting/' + data.id, data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.bulkChangeNotitficationSetting = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/gms/notification-config/bulkChange', data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        /**
         * reload notifications
         * @param kind
         */
        this.getNotificationEventsList = function (kind) {
            let deferred = $q.defer();
            AppHttp.get('/gms/notification-config/getEventsList')
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.downloadProperty = function (id) {
            let deferred = $q.defer();
            AppHttp.get('/gms/property/download/' + id + '?_=' + Math.random(), {
                responseType: 'blob'
            }).then(function (response) {
                deferred.resolve(response);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         *
         * @returns {*}
         */
        this.getListInvoiceTemplate = function () {
            let deferred = $q.defer();
            AppHttp.get('/gms/invoice_template/index')
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }
        /**
         *
         * @returns {*}
         */
        this.getListInvoiceTemplateByIds = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/invoice_template/getListByIds', data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getInvoiceTemplateDetails = function (id) {
            let deferred = $q.defer();
            AppHttp.get('/gms/invoice_template/details/' + id)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         *
         * @returns {*}
         */
        this.saveInvoiceTemplate = function (data) {
            let deferred = $q.defer();
            let new_data = angular.copy(data);
            if(new_data.invoice_tc != undefined && new_data.invoice_tc != null && new_data.invoice_tc != ''){
                new_data.invoice_tc = btoa(encodeURIComponent(new_data.invoice_tc));
            }
            AppHttp.post('/gms/invoice_template/save', new_data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         *
         * @returns {*}
         */
        this.removeInvoiceTemplate = function (uuid) {
            let deferred = $q.defer();
            AppHttp.delete('/gms/invoice_template/remove/' + uuid)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.bulkChangeTask = function (data) {
            let deferred = $q.defer();
            if (data.uuid == undefined || data.uuid == '') {
                deferred.resolve({success: false, msg: 'DATA_NOT_FOUND_TEXT'});
            } else {
                AppHttp.put('/gms/task/bulk/' + data.uuid, data).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }

        this.bulkChangeAssignment = function (data) {
            let deferred = $q.defer();
            if (data.uuid == undefined || data.uuid == '') {
                deferred.resolve({success: false, msg: 'DATA_NOT_FOUND_TEXT'});
            } else {
                AppHttp.put('/gms/assignment/bulk/' + data.uuid, data).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }

        this.bulkChangeRelocation = function (data) {
            let deferred = $q.defer();
            if (data.uuid == undefined || data.uuid == '') {
                deferred.resolve({success: false, msg: 'DATA_NOT_FOUND_TEXT'});
            } else {
                AppHttp.put('/gms/relocation/bulk/' + data.uuid, data).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }

        this.bulkChangeService = function (data) {
            let deferred = $q.defer();
            if (data.uuid == undefined || data.uuid == '') {
                deferred.resolve({success: false, msg: 'DATA_NOT_FOUND_TEXT'});
            } else {
                AppHttp.put('/gms/relocation-service/bulk/' + data.uuid, data).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }

        this.getPaymentMethodList = function () {
            let deferred = $q.defer();
            AppHttp.get('/gms/transaction/getPaymentMethodList?_=' + Math.random())
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getServiceProviderTypeList = function () {
            let deferred = $q.defer();
            AppHttp.get('/gms/svp_company/getTypes').then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.searchServiceProviderCompany = function (params) {
            let deferred = $q.defer();
            AppHttp.put('/gms/svp_company/search', params).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }
        /**
         * get bookers contacts
         * @param uuid
         * @returns {*}
         */
        this.getBookerContacts = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/gms/contacts/getListByBooker/' + uuid).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         * object data
         * @param data
         * @returns {*}
         */
        this.createObjectMappingData = function (data) {
            let deferred = $q.defer();
            if (angular.isUndefined(data.table) || data.table == '' || !angular.isString(data.table)) {
                deferred.resolve({success: false, message: 'INFORMATION_REQUIRED_TEXT'});
            } else {
                AppHttp.post('/gms/object-mapping/create', data).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }
        /**
         *
         * @param uuid
         */
        this.getContactsMembers = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/gms/contact-member/list', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.removeContactMember = function (data) {
            let deferred = $q.defer();
            if (angular.isUndefined(data.uuid) || data.uuid == '' || !angular.isString(data.uuid) || angular.isUndefined(data.contactId) || angular.isUndefined(data.contactUuid)) {
                deferred.resolve({success: false, message: 'INFORMATION_REQUIRED_TEXT'});
            } else {
                AppHttp.put('/gms/contact-member/remove', data).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }

        this.addContactMember = function (data) {
            console.info('addContactMember', data);
            let deferred = $q.defer();
            if (angular.isUndefined(data.uuid) || data.uuid == '' || !angular.isString(data.uuid) || angular.isUndefined(data.contactId) || angular.isUndefined(data.contactUuid)) {
                deferred.resolve({success: false, message: 'INFORMATION_REQUIRED_TEXT'});
            } else {
                AppHttp.post('/gms/contact-member/add', data).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }

        this.getPlanList = function () {
            let deferred = $q.defer();
            AppHttp.get('/gms/subscription/getPlanList').then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });

            return deferred.promise;
        };

        this.getCurrentPlan = function () {
            let deferred = $q.defer();
            AppHttp.get('/gms/subscription/getCurrentPlan').then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });

            return deferred.promise;
        };

        this.getPlanDetail = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/gms/subscription/getPlan/' + uuid).then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });

            return deferred.promise;
        };

        this.reloadCurrentPlan = function () {
            let deferred = $q.defer();
            AppHttp.get('/gms/subscription/reloadCurrentPlan').then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        this.getCheckoutPage = function (data) {
            let deferred = $q.defer();
            if (angular.isDefined(data.plan_id) && data.plan_id != '') {
                AppHttp.post('/gms/subscription/getCheckoutPage', data)
                    .then(function (response) {
                        deferred.resolve(response.data);
                    }).catch(function (err) {
                    deferred.reject(err.data);
                });
            } else {
                deferred.reject({success: false});
            }
            return deferred.promise;
        };

        this.getPortalUrl = function (data) {
            let deferred = $q.defer();
            AppHttp.get('/gms/subscription/getPortalUrl').then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getMyInvitations = function (data) {
            let deferred = $q.defer();
            AppHttp.get('/gms/invitation/getMyInvitations').then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.createInvitation = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/invitation/create', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.createInvitationForExistedHr = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/invitation/createForExistedHr', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.resendInvitationRequest = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/invitation/resend', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.acceptInvitationRequest = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/invitation/accept', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.denyInvitationRequest = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/invitation/deny', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.listItemsByFilter = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/filter-config/listItemsByFilter', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.listFilterConfig = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/filter-config/listFilterConfig', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.saveExtractDataSetting = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/extract-data/saveExtractDataSetting/', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getExtractDataSetting = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/extract-data/getExtractDataSetting/', data).then(function (response) {
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
            AppHttp.post('/gms/setting/getCountriesByIds/', data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getServiceFieldsFromServiceId = function (id) {
            let deferred = $q.defer();
            AppHttp.get('/gms/service/getServiceFieldsFromServiceId/' + id + '?_=' + Math.random()).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getServiceFieldsFromServiceCompanyUuid = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/service/getServiceFieldsFromServiceCompanyUuid/' + data.uuid, data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         * Order setting
         */
        this.getListOrderSetting = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/relocation-service/getListOrderSetting', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.saveListOrderSetting = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/relocation-service/saveListOrderSetting', data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        // Clone Service
        this.cloneServiceCompany = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/service/cloneServiceCompany', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.cloneServicePack = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/gms/service_pack/cloneServicePack', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.getTimeZone = function (id) {
            let deferred = $q.defer();
            let timeZone = angular.fromJson($localStorage['timezone_' + id]);
            if (timeZone && timeZone.length > 0) {
                deferred.resolve({
                    success: true,
                    data: timeZone,
                });
            } else {
                AppHttp.get('/gms/setting/getTimeZone/' + id).then(function (response) {
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


        this.getTags = function (data) {
            var deferred = $q.defer();
            AppHttp.put('/gms/object-tag/getTags', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.addTag = function (data) {
            var deferred = $q.defer();
            AppHttp.post('/gms/object-tag/addTag', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };


        this.removeTag = function (data) {
            var deferred = $q.defer();
            AppHttp.put('/gms/object-tag/removeTag', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        /**
         * get Zone Lang Item from code
         * @param zoneLangCode
         * @returns {*}
         */
        this.getZoneLangItem = function (zoneLangCode) {
            let deferred = $q.defer();
            AppHttp.get('/gms/setting/getZoneLangItem?code=' + zoneLangCode)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         * Get map field item
         */
        this.getMapFieldDetail = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/gms/map-field/detail/' + uuid)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         * Get map field item
         */
        this.activeServiceAssigneeTasks = function (data) {
            let deferred = $q.defer();
            AppHttp.data('/gms/task/activeServiceAssigneeTasks', data)
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
            AppHttp.post('/gms/auth/checkSamlAuthentication', data)
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
            AppHttp.post('/gms/notification/changeReadNotification', data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.markAllRead = function () {
            var deferred = $q.defer();
            AppHttp.get('/gms/notification/markAllRead')
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }
        this.getEtlInformation = function () {
            let deferred = $q.defer();
            AppHttp.get('/gms/extract-data/index').then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.switchSyncOwner = function(){
            var deferred = $q.defer();
            AppHttp.get('/gms/profile/switchSyncOwner').then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        this.searchMapFields = function(params = {}){
            var deferred = $q.defer();
            AppHttp.post('/gms/map-field/search', params).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err);
            });
            return deferred.promise;
        }
    }
})();
