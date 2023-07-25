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


        this.getRoleByName = function (name) {
            let deferred = $q.defer();
            AppHttp.put('/app/role/getRoleByName', {name: name})
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getRolesList = function () {
            let deferred = $q.defer();
            AppHttp.get('/app/role/getRolesList?_=' + Math.random())
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getAclList = function () {
            let deferred = $q.defer();
            AppHttp.get('/app/role/getAclList?_=' + Math.random())
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getControllerActionItemList = function () {
            let deferred = $q.defer();
            AppHttp.get('/app/role/getControllerActionItemList?_=' + Math.random())
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
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
        /**
         *
         * @returns {*}
         */
        this.getMyCompanyInfo = function () {
            let deferred = $q.defer();
            AppHttp.get('/app/my_company/index')
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
            AppHttp.get('/app/my_company/getApplication')
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
            AppHttp.get('/app/my_company/getBasicInfo')
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
            AppHttp.get('/app/my_company/getBusinessInfo')
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getMyCompanyFinancialInfo = function () {
            let deferred = $q.defer();
            AppHttp.get('/app/my_company/getFinancialInfo')
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

        this.updateMyCompanyApplication = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/app/my_company/updateApplication', data).then(function (response) {
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
            AppHttp.put('/app/my_company/saveBasicInfo', data).then(function (response) {
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
            AppHttp.put('/app/my_company/saveFinancialData', data).then(function (response) {
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
            AppHttp.put('/app/my_company/saveBusinessData', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };
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


        this.createContactFromAssignee = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/app/contacts/createContactFromAssignee', data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.createContactFromUserProfile = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/app/contacts/createContactFromUserProfile', data)
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
                var url = '/app/employee/getList/' + kind;
            else
                var url = '/app/employee/getList';
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
            AppHttp.put('/app/employee/searchAssigneeFull', data).then(function (response) {
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
                var url = '/app/employee/simple/' + kind;
            else
                var url = '/app/employee/simple';
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
            AppHttp.post('/app/employee/create', data)
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
            AppHttp.put('/app/employee/edit', data)
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
                AppHttp.get('/app/employee/detail/' + uuid)
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
                AppHttp.get('/app/employee/getFields/' + uuid)
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
                AppHttp.get('/app/employee/getLogin/' + uuid)
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
            AppHttp.get('/app/employee/item/' + id)
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
            AppHttp.get('/app/employee/getPermissions/' + uuid)
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
            AppHttp.delete('/app/employee/delete/' + employee.uuid)
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
            AppHttp.put('/app/employee/sendValidation/' + employee.uuid, {
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
            AppHttp.get('/app/login/detail/' + uuid)
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
            AppHttp.post('/app/login/save', data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.saveLoginInformation = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/app/login/save', data)
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
                AppHttp.get('/app/hr_member/detail/' + uuid).then(function (response) {
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
                AppHttp.delete('/app/hr_member/delete/' + data.member.uuid, {
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
            AppHttp.put('/app/hr_member/desactive/' + data.uuid).then(function (response) {
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
            AppHttp.put('/app/hr_member/reactive/' + data.uuid).then(function (response) {
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
            AppHttp.get('/app/hr_member/get_roles')
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
            AppHttp.get('/app/gms_member/get_roles')
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
            var url = '/app/hr_member/index';
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
            var url = '/app/hr_member/search';
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
            AppHttp.put('/app/hr_member/edit', data)
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
            AppHttp.post('/app/hr_member/create', data).then(function (response) {
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
            AppHttp.put('/app/gms_member/search', data).then(function (response) {
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
            var url = '/app/gms_member/index';
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
            var url = '/app/gms_member/searchGmsMember';

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
            AppHttp.get('/app/gms_member/detail/' + id).then(function (response) {
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
                AppHttp.delete('/app/gms_member/delete/' + data.member.uuid, {
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
            AppHttp.put('/app/profile/update', data).then(function (response) {
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
            AppHttp.put('/app/user/edit', data)
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
            AppHttp.post('/app/user/create', data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getUserProfileById = function (id) {
            let deferred = $q.defer();
            AppHttp.get('/app/user/item/' + id)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getUserProfileByUuid = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/app/user/simple/' + uuid)
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
            AppHttp.put('/app/gms_member/edit', data)
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
            AppHttp.post('/app/gms_member/create', data)
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
            AppHttp.post('/app/employee/create', data)
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
            AppHttp.put('/app/employee/edit', data)
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
            var url = '/app/service/events/' + id + '?_random=' + Math.random();
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
            var url = '/app/service/getEventsOfServiceCompany/' + id + '?_random=' + Math.random();
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
            var url = '/app/relocation/getEventsOfRelocation' + '?_random=' + Math.random();
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
            var url = '/app/assignment/getEventsOfAssignment' + '?_random=' + Math.random();
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
            var url = '/app/property/types/?_random=' + Math.random();
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
            var url = '/app/service/provider_types?_random=' + Math.random();
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
            var url = '/app/property/getPropertySetting?_random=' + Math.random();
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
            var url = '/app/property/savePropertySetting?_random=' + Math.random();
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
            var url = '/app/service/getServiceTemplates?_random=' + Math.random();
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
            var url = '/app/svp_company/saveProvider';
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
            var url = '/app/svp_company/saveBasicInfo/' + data.id;
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
            var url = '/app/svp_company/saveBusinessInfo/' + data.id;
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
            var url = '/app/svp_company/saveFinancialInfo/' + data.id;
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
            var url = '/app/svp_company/index?_random=' + Math.random();
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
            var url = '/app/svp_company/listArchived?_random=' + Math.random();
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
            var url = '/app/svp_company/getSimpleList';
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
            var url = '/app/svp_company/updateServiceCompanyProvider/' + data.id;
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
            var url = '/app/svp_company/createProvider';
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
            var url = '/app/task-template/createTaskTemplate';
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
            var url = '/app/service/editTaskTemplate/' + data.service_uuid;
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
            AppHttp.delete('/app/service/removeTaskTemplate/' + uuid).then(function (response) {
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
            AppHttp.post('/app/service/addProviderToService/' + data.service_uuid, data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.removeProviderFromService = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/app/service/removeProviderFromService/' + data.service_uuid, data).then(function (response) {
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
            var url = '/app/svp_company/detail/';
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
            var url = '/app/svp_company/member/';
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
            var url = '/app/svp_company/delete/';
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
            var url = '/app/service/simple';
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
            AppHttp.get('/app/task/list/?' + kind)
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
            AppHttp.put('/app/task/issues', data)
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
            AppHttp.get('/app/task/item_simple/' + uuid)
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
            AppHttp.get('/app/task/item/' + uuid)
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
            AppHttp.get('/app/task/getAssignment/' + uuid)
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
            AppHttp.get('/app/relocation/getDependants/' + uuid)
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
            AppHttp.get('/app/relocation/getParticipants/' + uuid)
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
            AppHttp.get('/app/task/getRelocation/' + uuid)
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
            AppHttp.get('/app/task/getRelocationServiceCompany/' + uuid)
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
            AppHttp.get('/app/task/getParentTask/' + uuid)
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
            AppHttp.put('/app/task/list/' + uuid, data)
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
                AppHttp.delete('/app/task/delete/' + data.uuid)
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
            AppHttp.delete('/app/task/delete/' + uuid)
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
            AppHttp.post('/app/task/create', new_data).then(function (response) {
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

            AppHttp.post('/app/task/create', new_data).then(function (response) {
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
            AppHttp.post('/app/task/create', new_data).then(function (response) {
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
            AppHttp.post('/app/office/create', data).then(function (response) {
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
            AppHttp.put('/app/office/update/' + data.id, data).then(function (response) {
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
            AppHttp.get('/app/office/detail/' + uuid)
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
            AppHttp.get('/app/office/index')
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
            AppHttp.put('/app/office/search', data).then(function (response) {
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
            AppHttp.delete('/app/office/delete/' + id).then(function (response) {
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
            AppHttp.post('/app/assignment/create', data).then(function (response) {
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
                AppHttp.put('/app/assignment/update/' + data.uuid, data).then(function (response) {
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
            AppHttp.get('/app/service_pack_pricing/index')
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getServicePricingList = function () {
            let deferred = $q.defer();
            AppHttp.get('/app/service_pricing/index')
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getServicePricingSimpleList = function () {
            let deferred = $q.defer();
            AppHttp.get('/app/service_pricing/simpleList')
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.createServicePricing = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/app/service_pricing/create', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.editServicePricing = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/app/service_pricing/edit/' + data.id, data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        this.createServicePackPricing = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/app/service_pack_pricing/create', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.editServicePackPricing = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/app/service_pack_pricing/edit/' + data.id, data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }
        this.detailServicePricing = function (id) {
            let deferred = $q.defer();
            AppHttp.get('/app/service_pricing/detail/' + id + '?_=' + Math.random())
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.detailServicePackPricing = function (id) {
            let deferred = $q.defer();
            AppHttp.get('/app/service_pack_pricing/detail/' + id + '?_=' + Math.random())
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.deleteServicePricing = function (id) {
            let deferred = $q.defer();
            AppHttp.delete('/app/service_pricing/del/' + id + '?_=' + Math.random())
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.deleteServicePackPricing = function (id) {
            let deferred = $q.defer();
            AppHttp.delete('/app/service_pack_pricing/del/' + id + '?_=' + Math.random())
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getInvoicePeriods = function () {
            let deferred = $q.defer();
            AppHttp.get('/app/service_pricing/getInvoicePeriods')
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
            AppHttp.get('/app/invoice-quote-config/init?_=' + Math.random())
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
            AppHttp.get('/app/invoice/getInvoiceList?_=' + Math.random())
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getInvoiceById = function (id) {
            let deferred = $q.defer();
            AppHttp.get('/app/invoice/detail/' + id + '?_=' + Math.random())
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getInvoiceByUuid = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/app/invoice/detailByUuid/' + uuid + '?_=' + Math.random())
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
            AppHttp.post('/app/invoice/create?_=' + Math.random(), data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.updateInvoice = function (data) {
            let deferred = $q.defer();
            data.is_invoice = true;
            AppHttp.put('/app/invoice/update?_=' + Math.random(), data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.deleteInvoice = function (id) {
            let deferred = $q.defer();
            AppHttp.delete('/app/invoice/delete/' + id + '?_=' + Math.random())
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
            AppHttp.get('/app/invoice/print/' + invoiceUuid + '?_=' + Math.random())
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
            AppHttp.get('/app/quote/getQuoteList/' + '?_=' + Math.random()).then(function (response) {
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
            AppHttp.post('/app/quote/create?_=' + Math.random(), data).then(function (response) {
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
                AppHttp.post('/app/quote/clone', data).then(function (response) {
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
                AppHttp.put('/app/quote/update/' + data.uuid + '?_=' + Math.random(), data).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }


        this.deleteQuoteByUuid = function (data) {
            let deferred = $q.defer();
            AppHttp.delete('/app/quote/deleteByUuid/' + data.uuid + '?_=' + Math.random())
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.deleteQuote = function (id) {
            let deferred = $q.defer();
            AppHttp.delete('/app/quote/delete/' + id + '?_=' + Math.random())
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.printQuote = function (invoiceUuid) {
            let deferred = $q.defer();
            AppHttp.get('/app/quote/print/' + invoiceUuid + '?_=' + Math.random())
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.deleteQuoteByUuid = function (data) {
            let deferred = $q.defer();
            AppHttp.delete('/app/quote/deleteByUuid/' + data.uuid + '?_=' + Math.random())
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getQuoteById = function (id) {
            let deferred = $q.defer();
            AppHttp.get('/app/quote/detail/' + id + '?_=' + Math.random())
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        this.getQuoteByUuid = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/app/quote/detailByUuid/' + uuid + '?_=' + Math.random())
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
            AppHttp.get('/app/quote/download/' + id + '?_=' + Math.random(), {
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
            AppHttp.get('/app/invoice/download/' + id + '?_=' + Math.random(), {
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
            AppHttp.put('/app/relocation-service/saveInfos', data).then(function (response) {
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
            AppHttp.put('/app/relocation-service/saveInfos', data).then(function (response) {
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
            AppHttp.post('/app/service_pack/create', new_data).then(function (response) {
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
            AppHttp.put('/app/service_pack/update/' + new_data.id, new_data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getServicePackDetail = function (id) {
            let deferred = $q.defer();
            AppHttp.get('/app/service_pack/detail/' + id + '?_=' + Math.random()).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getServiceListOfServicePack = function (id) {
            let deferred = $q.defer();
            AppHttp.get('/app/service_pack/getServiceList/' + id + '?_=' + Math.random()).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.searchProperties = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/app/property/search', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getAllProperties = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/app/property/getAll', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getPropertyDetail = function (id) {
            let deferred = $q.defer();
            AppHttp.get('/app/property/detail/' + id + '?_=' + Math.random()).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.deleteProperty = function (id) {
            let deferred = $q.defer();
            AppHttp.delete('/app/property/delete/' + id + '?_=' + Math.random()).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.deleteMultipleProperty = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/app/property/deleteMultiple', data).then(function (response) {
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
            AppHttp.post('/app/property/createProperty', new_data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };


        this.getAssignmentDetail = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/app/assignment/detail/' + uuid + '?_=' + Math.random()).then(function (response) {
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
                AppHttp.get('/app/assignment/get/' + id).then(function (response) {
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
            AppHttp.get('/app/assignment/getRelocation/' + uuid + '?_=' + Math.random()).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.deleteAssignment = function (uuid) {
            let deferred = $q.defer();
            AppHttp.delete('/app/assignment/delete/' + uuid + '?_=' + Math.random(), {uuid: uuid}).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.initiateRelocationAssignment = function (uuid) {
            let deferred = $q.defer();
            AppHttp.put('/app/assignment/initiate_relocation/' + uuid + '?_=' + Math.random(), {uuid: uuid}).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        this.approveAssignment = function (uuid) {
            let deferred = $q.defer();
            AppHttp.put('/app/assignment/approve/' + uuid + '?_=' + Math.random(), {uuid: uuid}).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        this.archiveAssignment = function (uuid) {
            let deferred = $q.defer();
            AppHttp.put('/app/assignment/delete/' + uuid + '?_=' + Math.random(), {uuid: uuid}).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        this.getRelocation = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/app/relocation/item/' + uuid).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        this.getHrCompanyOfRelocation = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/app/relocation/getAccountOfRelocation/' + uuid).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getRelocationBasicData = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/app/relocation/detail/' + uuid).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getRelocationServiceCompany = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/app/relocation-service/item/' + uuid + '?_=' + Math.random()).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getRelocationServiceReminders = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/app/relocation-service/getReminders/' + uuid).then(function (response) {
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
            AppHttp.get('/app/relocation-service/isExistAndActive/' + uuid + '?_=' + Math.random()).then(function (response) {
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
            AppHttp.get('/app/relocation-service/getRelocation/' + uuid + '?_=' + Math.random()).then(function (response) {
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
            AppHttp.get('/app/relocation-service/getAssignment/' + uuid + '?_=' + Math.random()).then(function (response) {
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
            AppHttp.get('/app/relocation-service/getAssignee/' + uuid + '?_=' + Math.random()).then(function (response) {
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
            AppHttp.get('/app/relocation-service/getServiceCompany/' + uuid + '?_=' + Math.random()).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getServiceTabsFromRSC = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/app/relocation-service/getServiceTabs/' + uuid + '?_=' + Math.random()).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getProvidersOfService = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/app/service/get_svp/' + uuid + '?_=' + Math.random()).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        this.getEventsFromRSC = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/app/relocation-service/getEvents/' + uuid + '?_=' + Math.random()).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        this.getFieldsFromRSC = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/app/relocation-service/getFields/' + uuid + '?_=' + Math.random()).then(function (response) {
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
            AppHttp.get('/app/relocation-service/getSvpCompany/' + uuid + '?_=' + Math.random()).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        this.getAssignmentFromRelocation = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/app/relocation/getAssignment/' + uuid + '?_=' + Math.random()).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getEmployeeFromRelocation = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/app/relocation/getAssgignee/' + uuid + '?_=' + Math.random()).then(function (response) {
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
            AppHttp.get('/app/svp_company/getAgentsList').then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getSvpCompaniesLandlordList = function () {
            let deferred = $q.defer();
            AppHttp.get('/app/svp_company/getLandlordsList').then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.getServiceProviderSimpleDetails = function (id) {
            let deferred = $q.defer();
            if (id > 0) {
                AppHttp.get('/app/svp_company/getDetailsSimple/' + id + '?_=' + Math.random()).then(function (response) {
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
            AppHttp.get('/app/service/get_svp/' + uuid + '?_=' + Math.random()).then(function (response) {
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
                AppHttp.put('/app/relocation-service/saveServiceProvider/' + data.uuid, data).then(function (response) {
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
                AppHttp.put('/app/relocation-service/saveSvpMember/' + data.uuid, data).then(function (response) {
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
            AppHttp.get('/app/assignment/list' + kind).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getAssignmentByEmployee = function (id) {
            let deferred = $q.defer();
            AppHttp.get('/app/assignment/employee_active/' + id).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.loadAssignmentsByEmployee = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/app/assignment/loadByEmployee', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
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


        /**
         *
         * @param uuid
         */
        this.getHomeSearchSuggestForm = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/app/home-search/getSuggestInformation/' + uuid + '?_=' + Math.random()).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        this.cancelHomeSearchSelectedProperty = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/app/home-search/cancelSelectedProperty', data).then(function (response) {
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
            AppHttp.get('/app/home-search/getHousingPropositionList/' + uuid + '?_=' + Math.random()).then(function (response) {
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
            AppHttp.get('/app/home-search/getHousingPropositionItem/' + uuid + '?_=' + Math.random()).then(function (response) {
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
            AppHttp.get('/app/home-search/getHomeSearchHousingPropositionItem/' + uuid + '?_=' + Math.random()).then(function (response) {
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
            AppHttp.get('/app/home-search/getCalendarEvents/' + uuid + '?_=' + Math.random()).then(function (response) {
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
            AppHttp.put('/app/home-search/addVisiteEvent/' + uuid, event).then(function (response) {
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
            AppHttp.delete('/app/home-search/cancelVisiteEvent/' + uuid).then(function (response) {
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
                AppHttp.post('/app/home-search/changeSelectedProposition', data).then(function (response) {
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
            AppHttp.get('/app/home-search/getSelectedProperty/' + uuid + '?_=' + Math.random()).then(function (response) {
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
                AppHttp.put('/app/home-search/changeStatusHousingProposition/' + data.uuid + '?_=' + Math.random(), data).then(function (response) {
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
            AppHttp.get('/app/home-search/getSuggestedProperties/' + uuid + '?_=' + Math.random()).then(function (response) {
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
            AppHttp.put('/app/home-search/checkPropertyAvailability', data).then(function (response) {
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
            AppHttp.get('/app/relocation-service/getTaskTemplate/' + uuid + '?_=' + Math.random()).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getCompanyPriceList = function (data) {
            let deferred = $q.defer();
            AppHttp.get('/app/company_pricelist/list/', {params: data}).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getCompanyPriceListSimpleData = function (id) {
            let deferred = $q.defer();
            AppHttp.get('/app/company_pricelist/simpleData/' + id).then(function (response) {
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

        this.getAccountsList = function (id) {
            let deferred = $q.defer();
            AppHttp.get('/app/company/index').then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getListHrAccounts = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/app/company/getListHrAccounts', data).then(function (response) {
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
                AppHttp.get('/app/company/simpleData/' + id).then(function (response) {
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
                AppHttp.post('/app/comments/sendToExternalRecipient', data).then(function (response) {
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
                AppHttp.get('/app/relocation/needAssessmentList/' + uuid).then(function (response) {
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
                AppHttp.get('/app/need-assessment/requestDetail/' + uuid).then(function (response) {
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
                AppHttp.get('/app/relocation-service/needAssessmentList/' + uuid).then(function (response) {
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
            AppHttp.post('/app/need-assessment/index', data).then(function (response) {
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
            AppHttp.get('/app/need-assessment/simple').then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.initDataNeedForm = function () {
            let deferred = $q.defer();
            AppHttp.get('/app/need-assessment/init?_=' + Math.random()).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.createNeedFormGabarit = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/app/need-assessment/createForm', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        this.saveNeedFormGabarit = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/app/need-assessment/saveForm/' + data.id, data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getNeedFormGabaritInfo = function (id) {
            let deferred = $q.defer();
            AppHttp.get('/app/need-assessment/detail/' + id + '?_=' + Math.random()).then(function (response) {
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
                AppHttp.delete('/app/need-assessment/removeQuestion/' + data.id + '?_=' + Math.random()).then(function (response) {
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
                AppHttp.post('/app/need-assessment/saveQuestion/', data).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                    deferred.reject(err.data);
                });
            } else {
                AppHttp.post('/app/need-assessment/saveQuestion/' + data.id, data).then(function (response) {
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
                AppHttp.put('/app/need-assessment/saveRankQuestion/' + data.id, data).then(function (response) {
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
            AppHttp.post('/app/need-assessment/cloneForm', data).then(function (response) {
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
            AppHttp.delete('/app/need-assessment/deleteNeedForm/' + id).then(function (response) {
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
                AppHttp.put('/app/relocation-service/sendNeedAssessmentFormOfRelocation/', data).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                    deferred.reject(err.data);
                });
            } else {
                AppHttp.put('/app/relocation-service/sendNeedAssessmentFormOfRelocation/' + data.request_uuid, data).then(function (response) {
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
                AppHttp.put('/app/communication-template/update/' + new_data.id, new_data).then(function (response) {
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
                AppHttp.put('/app/communication-template/preview/' + new_data.id, new_data).then(function (response) {
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
                AppHttp.post('/app/communication-template/create/', new_data).then(function (response) {
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

            AppHttp.post('/app/communication-template/clone/', data).then(function (response) {
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
                AppHttp.delete('/app/communication-template/delete/' + data.id, data).then(function (response) {
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
            AppHttp.get('/app/communication-template/item/' + id).then(function (response) {
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
            AppHttp.post('/app/communication-template/itemAutoFill/' + id, data).then(function (response) {
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
            AppHttp.get('/app/communication-template/index').then(function (response) {
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
            AppHttp.post('/app/communication-template/simple', data).then(function (response) {
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
            AppHttp.post('/app/communication-template/search', data).then(function (response) {
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
                AppHttp.put('/app/task/updateTask/' + new_data.uuid, new_data).then(function (response) {
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
                AppHttp.put('/app/reminder/generate/' + data.uuid, data).then(function (response) {
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
                AppHttp.put('/app/reminder/stop/' + data.uuid, data).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }

        this.getLastReminderItems = function () {
            let deferred = $q.defer();
            AppHttp.put('/app/reminder/getLastReminderItems').then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        this.standbyReminder = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/app/reminder/standByReminder', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.clearAllReminderOfUser = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/app/reminder/clearAllReminderOfUser', data).then(function (response) {
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
                AppHttp.post('/app/reminder/createReminderItem/' + data.task_uuid, data).then(function (response) {
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
                AppHttp.put('/app/task/setTodo/' + data.uuid, data).then(function (response) {
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
                AppHttp.put('/app/task/setInProgress/' + data.uuid, data).then(function (response) {
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
                AppHttp.put('/app/task/updateTask/' + new_data.uuid, new_data).then(function (response) {
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
                AppHttp.put('/app/task/setDone/' + data.uuid, data).then(function (response) {
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
                AppHttp.post('/app/need-assessment/addNewFormCategory/', data).then(function (response) {
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

        this.removeServiceCompany = function (uuid) {
            let deferred = $q.defer();
            AppHttp.delete('/app/service/removeService/' + uuid).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.createServiceCompany = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/app/service/createServiceCompany', data).then(function (response) {
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
                AppHttp.put('/app/service/editServiceCompany/' + data.uuid, data).then(function (response) {
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
                AppHttp.put('/app/service/saveTaskTemplateList/' + data.uuid, data).then(function (response) {
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
                AppHttp.put('/app/service/deleteTaskTemplateList/' + data.uuid, data).then(function (response) {
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
                AppHttp.put('/app/service/saveAttachements/' + data.uuid, data).then(function (response) {
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
                AppHttp.put('/app/service/saveProviderList/' + data.uuid, data).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }


        this.getServiceListActive = function (data = {}) {
            let deferred = $q.defer();
            AppHttp.post('/app/service/getServicesActive', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getServiceListActiveByIds = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/app/service/getServiceCompanyByIds', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getServiceRelocationCountListActive = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/app/relocation/getServicesActive/' + uuid).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        this.getServiceListDesactive = function (data) {
            let deferred = $q.defer();
            AppHttp.get('/app/service/getSimpleListDesactive').then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getServices = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/app/service/list', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.initServicedata = function () {

            let deferred = $q.defer();
            AppHttp.get('/app/service/init').then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        this.getServiceCompanyDetail = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/app/service/getServiceCompanyDetail/' + uuid).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getServiceFieldDetail = function (id) {
            let deferred = $q.defer();
            AppHttp.get('/app/service/getServiceFieldDetail/' + id).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getServiceCompanyEventsList = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/app/service/getServiceCompanyEventsList/' + uuid).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getServiceCompanyProviderList = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/app/service/getServiceCompanyProviderList/' + uuid).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getServiceCompanyTaskList = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/app/service/getServiceCompanyTaskList/' + uuid).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getServiceCompanyTasks = function (uuid, data) {
            let deferred = $q.defer();
            AppHttp.post('/app/service/getServiceCompanyTaskList/' + uuid, data).then(function (response) {
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

        this.showGroupAcl = function (id) {
            let deferred = $q.defer();
            AppHttp.get('/app/role/showgroup/' + id).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
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

        /**
         *
         * @returns {*}
         */
        this.getServicePackList = function () {
            let deferred = $q.defer();
            var url = '/app/service_pack/index';
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
            var url = '/app/service_pack/simpleList';
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
            AppHttp.delete('/app/service_pack/archive/' + id).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getServicePackFullList = function () {
            let deferred = $q.defer();
            var url = '/app/service_pack/getFullList';
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
            let url = '/app/service_pack/list';
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
            var url = '/app/service_pack/getActiveList';
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
            AppHttp.post('/app/home-search/addSuggest', data).then(function (response) {
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
            AppHttp.delete('/app/home-search/deleteHousingProposition/' + data.id).then(function (response) {
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
            AppHttp.post('/app/home-search/sendSuggestNotification', {uuid: serviceUuid}).then(function (response) {
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
                var url = '/app/property/loadByUrl';
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
                var url = '/app/property/getContentOfUrl';
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

        this.searchAssignee = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/app/employee/searchAssignee', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.searchService = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/app/service/searchService', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.searchAssignment = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/app/assignment/searchAssignment', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.searchAssignmentRequest = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/app/assignment/searchAssignmentRequest', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getRequest = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/app/assignment/getRequest/' + uuid).then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        this.rejectRequest = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/app/assignment/rejectRequest', data).then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };


        this.searchSender = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/app/communication/searchSender', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.searchSender = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/app/communication/searchSender', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.searchRelocation = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/app/relocation/searchRelocation', data).then(function (response) {
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

        /**
         *
         * @param uuid
         * @returns {*}
         */
        this.getServiceMenuItems = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/app/relocation-service/getMenuItems/' + uuid).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
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

        this.getSvpWorkerList = function () {
            let deferred = $q.defer();
            AppHttp.get('/app/svp_worker/index').then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getSvpWorkerListWithParams = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/app/svp_worker/index', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.createSvpWorker = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/app/svp_worker/create', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.deleteSvpWorker = function (uuid) {
            let deferred = $q.defer();
            AppHttp.delete('/app/svp_worker/delete/' + uuid).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.updateSvpWorker = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/app/svp_worker/update/' + data.uuid, data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getSvpWorkerDetail = function (id) {
            let deferred = $q.defer();
            AppHttp.get('/app/svp_worker/detail/' + id).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.serviceCompanyLoadProvider = function () {
            let deferred = $q.defer();
            AppHttp.get('/app/service/loadProviders?_=' + Math.random()).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.searchSvpMembers = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/app/svp_worker/search', data).then(function (response) {
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
                AppHttp.post('/app/reminder/createReminderConfig', data).then(function (response) {
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
                AppHttp.delete('/app/reminder/deleteReminderConfig/' + data.uuid).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }

        this.getListReminderOfTask = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/app/task/getRemindersList/' + uuid).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getListCompanies = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/app/hr_account/list', data).then(function (response) {
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
            AppHttp.post('/app/assignment/applyWorkflow',
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
            AppHttp.post('/app/relocation/applyWorkflow',
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
            AppHttp.post('/app/assignment/applyWorkflow',
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
            AppHttp.post('/app/relocation/applyWorkflow',
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
            AppHttp.post('/app/password/generatePasswordForUser', profile).then(function (response) {
                deferred.resolve(response.data);
                return response.data;
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }


        this.generatePasswordRandom = function () {
            let deferred = $q.defer();
            AppHttp.post('/app/password/generatePasswordRandom').then(function (response) {
                deferred.resolve(response.data);
                return response.data;
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        this.relocationCountOngoing = function () {
            let deferred = $q.defer();
            AppHttp.get('/app/dashboard/relocationCountOnGoing').then(function (response) {
                deferred.resolve(response.data);
                return response.data;
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        this.assignmentCountEndingSoon = function () {
            let deferred = $q.defer();
            AppHttp.get('/app/dashboard/assignmentCountEndingSoon').then(function (response) {
                deferred.resolve(response.data);
                return response.data;
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        this.taskCountTodo = function () {
            let deferred = $q.defer();
            AppHttp.get('/app/dashboard/taskCountTodo').then(function (response) {
                deferred.resolve(response.data);
                return response.data;
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        this.taskCountOngoing = function () {
            let deferred = $q.defer();
            AppHttp.get('/app/dashboard/taskCountOnGoing').then(function (response) {
                deferred.resolve(response.data);
                return response.data;
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        this.getMoreDashboardInfos = function () {
            let deferred = $q.defer();
            AppHttp.get('/app/dashboard/getMoreDashboardInfos').then(function (response) {
                deferred.resolve(response.data);
                return response.data;
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        this.getRelocationServiceDashboard = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/app/dashboard/getRelocationServicesList', data).then(function (response) {
                deferred.resolve(response.data);
                return response.data;
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        this.getDashboardMembers = function () {
            let deferred = $q.defer();
            AppHttp.get('/app/dashboard/getDashboardMembers').then(function (response) {
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
            AppHttp.put('/app/contacts/searchContact', data).then(function (response) {
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
                AppHttp.post('/app/contacts/createContact', data).then(function (response) {
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
                AppHttp.put('/app/contacts/getContact', data).then(function (response) {
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
                AppHttp.put('/app/contacts/updateContact/' + data.id, data).then(function (response) {
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
            AppHttp.delete('/app/contacts/delete/' + id).then(function (response) {
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
                AppHttp.put('/app/communication/saveCommunicationContacts', data).then(function (response) {
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
            AppHttp.get('/app/company_pricelist/init').then(function (response) {
                deferred.resolve(response.data);
                return response.data;
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        this.companyPriceListAvailableCompanies = function () {
            let deferred = $q.defer();
            AppHttp.get('/app/company_pricelist/getAvailableCompanies').then(function (response) {
                deferred.resolve(response.data);
                return response.data;
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        this.companyPriceListGetAll = function () {
            let deferred = $q.defer();
            AppHttp.get('/app/company_pricelist/index').then(function (response) {
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
            AppHttp.get('/app/company_pricelist/detail/' + parseInt(id)).then(function (response) {
                deferred.resolve(response.data);
                return response.data;
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        this.companyPriceListCreate = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/app/company_pricelist/create/', data).then(function (response) {
                deferred.resolve(response.data);
                return response.data;
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        this.companyPriceListUpdate = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/app/company_pricelist/update/' + data.id, data).then(function (response) {
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
                AppHttp.put('/app/company_pricelist/delete/', data).then(function (response) {
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
            AppHttp.get('/app/task/report_comments/' + uuid).then(function (response) {
                deferred.resolve(response.data);
                return response.data;
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        this.getReportStatusOfTask = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/app/task/report_status/' + uuid).then(function (response) {
                deferred.resolve(response.data);
                return response.data;
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        this.deleteTaxRule = function (id) {
            let deferred = $q.defer();
            AppHttp.delete('/app/tax_rule/del/' + id).then(function (response) {
                deferred.resolve(response.data);
                return response.data;
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        this.detailTaxRule = function (id) {
            let deferred = $q.defer();
            AppHttp.get('/app/tax_rule/detail/' + id).then(function (response) {
                deferred.resolve(response.data);
                return response.data;
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        this.createTaxRule = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/app/tax_rule/create', data).then(function (response) {
                deferred.resolve(response.data);
                return response.data;
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        this.updateTaxRule = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/app/tax_rule/update/' + data.id, data).then(function (response) {
                deferred.resolve(response.data);
                return response.data;
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        this.getTaxRuleList = function (data) {
            let deferred = $q.defer();
            AppHttp.get('/app/tax_rule/index').then(function (response) {
                deferred.resolve(response.data);
                return response.data;
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        this.getTaxRuleActive = function () {
            let deferred = $q.defer();
            AppHttp.get('/app/tax_rule/getTaxRuleActive').then(function (response) {
                deferred.resolve(response.data);
                return response.data;
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        this.getTaskTodayDashboard = function () {
            let deferred = $q.defer();
            AppHttp.get('/app/dashboard/taskTodayList').then(function (response) {
                deferred.resolve(response.data);
                return response.data;
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        this.getRelocationTodayDashboard = function () {
            let deferred = $q.defer();
            AppHttp.get('/app/dashboard/relocationTodayList').then(function (response) {
                deferred.resolve(response.data);
                return response.data;
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        this.getRelocationOnGoing = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/app/dashboard/relocationListOnGoing', data).then(function (response) {
                deferred.resolve(response.data);
                return response.data;
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        this.getAssignmentTodayDashboard = function () {
            let deferred = $q.defer();
            AppHttp.get('/app/dashboard/assignmentTodayList').then(function (response) {
                deferred.resolve(response.data);
                return response.data;
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        this.getAssignmentOnGoing = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/app/dashboard/assignmentListOnGoing', data).then(function (response) {
                deferred.resolve(response.data);
                return response.data;
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        this.getTaskActiveByUser = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/app/dashboard/getTaskActiveByUser', data).then(function (response) {
                deferred.resolve(response.data);
                return response.data;
            }).catch(function (err) {
                deferred.reject(err);
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

        this.relocationInviteAssignee = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/app/relocation/inviteAssignee', data).then(function (response) {
                deferred.resolve(response.data);
                return response.data;
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        this.verfifyPrincipalEmail = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/app/user/checkEmail', data).then(function (response) {
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


        /**
         *  getBookerLIst
         * @returns {*}
         */
        this.getBookersList = function () {
            let deferred = $q.defer();
            AppHttp.get('/app/bookers/index')
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
            AppHttp.put('/app/bookers/searchBookerAccounts', data)
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
            AppHttp.get('/app/bookers/detail/' + uuid)
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
            AppHttp.delete('/app/bookers/delete/' + data.uuid)
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
            AppHttp.get('/app/bookers/simple')
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        this.getBookersByIds = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/app/bookers/loadBookersByIds', data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.createBooker = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/app/bookers/create', data)
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
                AppHttp.put('/app/bookers/edit/' + data.uuid, data)
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
            AppHttp.put('/app/bookers/editFinancialData', data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.searchCompaniesAndBookers = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/app/company/search', data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.allCompaniesBookers = function (data) {
            var deferred = $q.defer();
            AppHttp.post('/app/company/allSimple', data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.searchBookers = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/app/bookers/search', data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getEmployeeDependants = function (id) {
            let deferred = $q.defer();
            AppHttp.get('/app/employee/getDependants/' + id)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.addEmployeeDependant = function (employee, dependant) {
            let deferred = $q.defer();
            AppHttp.post('/app/employee/addDependant', {
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
            AppHttp.put('/app/employee/editDependant/' + dependant.uuid, dependant).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.deleteEmployeeDependant = function (dependant) {
            let deferred = $q.defer();
            AppHttp.put('/app/employee/deleteDependant/' + dependant.uuid, dependant).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getDependantDetail = function (employee, dependantId) {
            let deferred = $q.defer();
            AppHttp.get('/app/employee/getDependantDetail/' + dependantId).then(function (response) {
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
            AppHttp.get('/app/team/index').then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getTeamsListWithParams = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/app/team/index', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.searchTeams = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/app/team/search', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.createTeam = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/app/team/create', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.editTeam = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/app/team/edit/' + data.id, data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.deleteTeam = function (teamUuid) {
            let deferred = $q.defer();
            AppHttp.delete('/app/team/delete/' + teamUuid).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.viewTeam = function (teamId) {
            let deferred = $q.defer();
            AppHttp.get('/app/team/detail/' + teamId).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getDepartmentsList = function () {
            let deferred = $q.defer();
            AppHttp.get('/app/department/index').then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getDepartmentsListWithParams = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/app/department/index', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getSimpleListDepartment = function () {
            let deferred = $q.defer();
            AppHttp.get('/app/department/simpleList').then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.searchDepartments = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/app/department/search', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.createDepartment = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/app/department/create', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.editDepartment = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/app/department/edit/' + data.id, data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.deleteDepartment = function (departmentId) {
            let deferred = $q.defer();
            AppHttp.delete('/app/department/delete/' + departmentId).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.viewDepartment = function (departUuid) {
            let deferred = $q.defer();
            AppHttp.get('/app/department/detail/' + departUuid).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
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

        this.initApplicationData = function (companyId) {
            let deferred = $q.defer();
            AppHttp.get('/app/company/initApplicationData/' + companyId).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getCompanyApplication = function (companyId) {
            let deferred = $q.defer();
            AppHttp.get('/app/company/getApplication/' + companyId).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.updateCompanyApplication = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/app/company/updateApplication/' + data.company_id, data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.createCompanyApplication = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/app/company/createApplication/' + data.company_id, data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        this.countInvoiceQuote = function () {
            let deferred = $q.defer();
            AppHttp.get('/app/invoice_quote/countInvoiceQuote').then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.generateNicknameGmsMember = function (uuid) {

            let deferred = $q.defer();
            AppHttp.get('/app/gms_member/generate_nickname/' + uuid).then(function (response) {
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

        this.loadServiceTemplateContent = function (id) {

            let deferred = $q.defer();
            AppHttp.get('/app/acl/loadServiceTemplateContent/' + id + '?_=' + Math.random()).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.loadServiceTemplateContent = function (id) {
            let deferred = $q.defer();
            AppHttp.get('/app/service/loadServiceTemplateContent/' + id + '?_=' + Math.random()).then(function (response) {
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
            AppHttp.put('/app/service/loadProviderRelationByType/' + '?_=' + Math.random(), data).then(function (response) {
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

        this.changePasswordWithConfirmCodeFn = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/app/auth/changePasswordWithConfirmCode', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.changeMyPassword = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/app/auth/changeMyPassword', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.changeUserPassword = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/app/auth/changeUserPassword', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.resetUserPassword = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/app/user/resetUserPassword', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getProperties = function (params) {
            let deferred = $q.defer();
            AppHttp.put('/app/property/index', params).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getSupportTicketsList = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/app/customer-support-ticket/tickets', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.createSupportTicket = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/app/customer-support-ticket/create', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.createSupportQuestion = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/app/customer-support-ticket/create', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getSupportRequestDetail = function (id) {
            let deferred = $q.defer();
            AppHttp.get('/app/customer-support-ticket/request/' + id).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getSupportRequestReplies = function (id) {
            let deferred = $q.defer();
            AppHttp.get('/app/customer-support-ticket/replies/' + id).then(function (response) {
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
                AppHttp.put('/app/customer-support-ticket/reply/' + data.ticket_id, data).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }

        this.getAllTaskServicesOfRelocation = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/app/task/getAllTasksServicesList/' + uuid).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getRelocationReminders = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/app/relocation/getReminders/' + uuid).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getCountriesOriginRelocationDashboard = function () {
            let deferred = $q.defer();
            AppHttp.get('/app/dashboard/getCountriesOriginRelocation').then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        this.getCountriesOriginRelocationMapDashboard = function () {
            let deferred = $q.defer();
            AppHttp.get('/app/dashboard/getCountriesOriginRelocationMap').then(function (response) {
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

        this.loadServiceOfRelocation = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/app/relocation/getServices/' + uuid).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        this.getPolicyDetail = function (id) {
            let deferred = $q.defer();
            AppHttp.get('/app/policy/detail/' + id).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        this.getPoliciesSimpleList = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/app/policy/getSimpleList', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getPoliciesList = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/app/policy/getList', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.setFaqReviewPositive = function (faqContentId) {
            let deferred = $q.defer();
            AppHttp.post('/app/faq/setReviewPositive/' + faqContentId, {faq_content_id: faqContentId}).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.setFaqReviewNative = function (faqContentId) {
            let deferred = $q.defer();
            AppHttp.post('/app/faq/setReviewNegative/' + faqContentId, {faq_content_id: faqContentId}).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getFaqList = function () {
            let deferred = $q.defer();
            AppHttp.get('/app/faq/index').then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.makeReportPdfFromHtml = function (html) {
            let deferred = $q.defer();
            AppHttp.post('/app/report/pdf', {
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
            AppHttp.post('/app/extract-data/assignment/', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getExtractDataAssignmentResult = function (execuationID, data) {
            let deferred = $q.defer();
            AppHttp.post('/app/extract-data/assignmentResult/' + execuationID, data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.getExtractDataRelocation = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/app/extract-data/relocation/', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.getExtractDataRelocationResult = function (execuationID, data) {
            let deferred = $q.defer();
            AppHttp.post('/app/extract-data/relocationResult/' + execuationID, data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.getExtractDataInvoice = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/app/extract-data/invoice/', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getExtractDataInvoiceResult = function (execuationID, data) {
            let deferred = $q.defer();
            AppHttp.post('/app/extract-data/invoiceResult/' + execuationID, data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.getExtractDataInvoiceItem = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/app/extract-data/invoiceItem/', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getExtractDataInvoiceItemResult = function (execuationID, data) {
            let deferred = $q.defer();
            AppHttp.post('/app/extract-data/invoiceItemResult/' + execuationID, data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.getExtractDataAssignee = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/app/extract-data/assignee', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getExtractDataAssigneeResult = function (execuationID, data) {
            let deferred = $q.defer();
            AppHttp.post('/app/extract-data/assigneeResult/' + execuationID, data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };


        this.getExtractDataService = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/app/extract-data/service/', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.getExtractDataServiceResult = function (execuationID, data) {
            let deferred = $q.defer();
            AppHttp.post('/app/extract-data/serviceResult/' + execuationID, data).then(function (response) {
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
            AppHttp.get('/app/member/checkApplication/' + userProfileUuid).then(function (response) {
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
            AppHttp.put('/app/member/getMembersByCompany', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getMemberProfile = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/app/member/getProfile', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        this.createEmployeeDocument = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/app/document/createDocument', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.updateEmployeeDocument = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/app/document/updateDocument/' + data.uuid, data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.deleteEmployeeDocument = function (data) {
            let deferred = $q.defer();
            AppHttp.delete('/app/document/deleteDocument/' + data.uuid).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getEmployeeDocuments = function (employee_uuid) {
            let deferred = $q.defer();
            AppHttp.get('/app/entity-document/getDocuments/' + employee_uuid).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.verifyDomain = function () {
            let deferred = $q.defer();
            AppHttp.get('/app/setting/checkDomain').then(function (response) {
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
            var url = '/app/workflow/index/' + data;
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
            var url = '/app/workflow/remove/' + data;
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
            var url = '/app/workflow/create';
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
            var url = '/app/workflow/edit';
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
            let url = '/app/workflow/detail/' + id;
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
            var url = '/app/workflow/createTaskWorkflow';
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
            var url = '/app/workflow/editTaskWorkflow';
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
            var url = '/app/workflow/removeTaskWorkflow/' + data;
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
            var url = '/app/workflow/getTaskList/' + data;
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
            var url = '/app/workflow/createSubTask';
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
            var url = '/app/workflow/editSubTask';
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
            var url = '/app/workflow/removeSubTask/' + data;
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
            AppHttp.get('/app/communication-email/index').then(function (response) {
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
            AppHttp.post('/app/communication-email/create', data).then(function (response) {
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
            AppHttp.post('/app/communication-email/update', data).then(function (response) {
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
            AppHttp.delete('/app/communication-email/delete/' + data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.activeSettingProvider = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/app/communication-email/active/', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.deactiveSettingProvider = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/app/communication-email/deactive/', data).then(function (response) {
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
            AppHttp.get('/app/communication-email/item/' + data).then(function (response) {
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
            AppHttp.get('/app/communication-email/getGoogleAuthUrl/').then(function (response) {
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
            AppHttp.get('/app/communication-email/getOutlookAuthUrl/').then(function (response) {
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
            AppHttp.post('/app/communication-email/updateSignature/', new_data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getMails = function () {
            let deferred = $q.defer();
            AppHttp.get('/app/communication-email/getMails')
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.checkCommunicationTokenExpired = function () {
            let deferred = $q.defer();
            AppHttp.get('/app/communication-email/checkTokenExpired').then(function (response) {
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
            var url = '/app/workflow/index/' + data;
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
            var url = '/app/workflow/remove/' + data;
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
            var url = '/app/workflow/create';
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
            var url = '/app/workflow/edit';
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
        //     var url = '/app/workflow/detail/' + data;
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
            var url = '/app/workflow/createTaskWorkflow';
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
            var url = '/app/workflow/editTaskWorkflow';
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
            var url = '/app/workflow/removeTaskWorkflow/' + data;
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
            var url = '/app/workflow/removeTaskTemplateWorkflow/' + data;
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
            var url = '/app/workflow/getTaskList/' + data;
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
            var url = '/app/workflow/createSubTask';
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
            var url = '/app/workflow/editSubTask';
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
            var url = '/app/workflow/removeSubTask/' + data;
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
            AppHttp.get('/app/communication-email/index').then(function (response) {
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
            AppHttp.post('/app/communication-email/create', data).then(function (response) {
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
            AppHttp.post('/app/communication-email/update', data).then(function (response) {
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
            AppHttp.delete('/app/communication-email/delete/' + data).then(function (response) {
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
            AppHttp.get('/app/communication-email/item/' + data).then(function (response) {
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
            AppHttp.get('/app/communication-email/getGoogleAuthUrl/').then(function (response) {
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
            AppHttp.get('/app/communication-email/getOutlookAuthUrl/').then(function (response) {
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
            AppHttp.post('/app/communication-email/updateSignature/', new_data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getMails = function () {
            let deferred = $q.defer();
            AppHttp.get('/app/communication-email/getMails')
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        this.initNotificationConfig = function () {
            let deferred = $q.defer();
            AppHttp.get('/app/notification-config/init')
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getNotificationGroupList = function () {
            let deferred = $q.defer();
            AppHttp.get('/app/notification-config/getGroupList')
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.getNotificationSettingList = function () {
            let deferred = $q.defer();
            AppHttp.get('/app/notification-config/getList')
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.saveNotificationSetting = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/app/notification-config/saveSetting/' + data.id, data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.bulkChangeNotitficationSetting = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/app/notification-config/bulkChange', data)
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
            AppHttp.get('/app/notification-config/getEventsList')
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.downloadProperty = function (id) {
            let deferred = $q.defer();
            AppHttp.get('/app/property/download/' + id + '?_=' + Math.random(), {
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
            AppHttp.get('/app/invoice_template/index')
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
            AppHttp.post('/app/invoice_template/getListByIds', data)
                .then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getInvoiceTemplateDetails = function (id) {
            let deferred = $q.defer();
            AppHttp.get('/app/invoice_template/details/' + id)
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
            AppHttp.post('/app/invoice_template/save', new_data)
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
            AppHttp.delete('/app/invoice_template/remove/' + uuid)
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
                AppHttp.put('/app/task/bulk/' + data.uuid, data).then(function (response) {
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
                AppHttp.put('/app/assignment/bulk/' + data.uuid, data).then(function (response) {
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
                AppHttp.put('/app/relocation/bulk/' + data.uuid, data).then(function (response) {
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
                AppHttp.put('/app/relocation-service/bulk/' + data.uuid, data).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }

        this.getServiceProviderTypeList = function () {
            let deferred = $q.defer();
            AppHttp.get('/app/svp_company/getTypes').then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.searchServiceProviderCompany = function (params) {
            let deferred = $q.defer();
            AppHttp.put('/app/svp_company/search', params).then(function (response) {
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
            AppHttp.get('/app/contacts/getListByBooker/' + uuid).then(function (response) {
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
                AppHttp.post('/app/object-mapping/create', data).then(function (response) {
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
            AppHttp.put('/app/contact-member/list', data).then(function (response) {
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
                AppHttp.put('/app/contact-member/remove', data).then(function (response) {
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
                AppHttp.post('/app/contact-member/add', data).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }

        this.getPlanList = function () {
            let deferred = $q.defer();
            AppHttp.get('/app/subscription/getPlanList').then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });

            return deferred.promise;
        };

        this.getCurrentPlan = function () {
            let deferred = $q.defer();
            AppHttp.get('/app/subscription/getCurrentPlan').then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });

            return deferred.promise;
        };

        this.getPlanDetail = function (uuid) {
            let deferred = $q.defer();
            AppHttp.get('/app/subscription/getPlan/' + uuid).then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });

            return deferred.promise;
        };

        this.reloadCurrentPlan = function () {
            let deferred = $q.defer();
            AppHttp.get('/app/subscription/reloadCurrentPlan').then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        this.getCheckoutPage = function (data) {
            let deferred = $q.defer();
            if (angular.isDefined(data.plan_id) && data.plan_id != '') {
                AppHttp.post('/app/subscription/getCheckoutPage', data)
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
            AppHttp.get('/app/subscription/getPortalUrl').then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getMyInvitations = function (data) {
            let deferred = $q.defer();
            AppHttp.get('/app/invitation/getMyInvitations').then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.createInvitation = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/app/invitation/create', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.createInvitationForExistedHr = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/app/invitation/createForExistedHr', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.resendInvitationRequest = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/app/invitation/resend', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.acceptInvitationRequest = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/app/invitation/accept', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.denyInvitationRequest = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/app/invitation/deny', data).then(function (response) {
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

        this.saveExtractDataSetting = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/app/extract-data/saveExtractDataSetting/', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getExtractDataSetting = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/app/extract-data/getExtractDataSetting/', data).then(function (response) {
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

        this.getServiceFieldsFromServiceId = function (id) {
            let deferred = $q.defer();
            AppHttp.get('/app/service/getServiceFieldsFromServiceId/' + id + '?_=' + Math.random()).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getServiceFieldsFromServiceCompanyUuid = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/app/service/getServiceFieldsFromServiceCompanyUuid/' + data.uuid, data).then(function (response) {
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
            AppHttp.post('/app/relocation-service/getListOrderSetting', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.saveListOrderSetting = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/app/relocation-service/saveListOrderSetting', data)
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
            AppHttp.post('/app/service/cloneServiceCompany', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.cloneServicePack = function (data) {
            let deferred = $q.defer();
            AppHttp.post('/app/service_pack/cloneServicePack', data).then(function (response) {
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


        this.getTags = function (data) {
            var deferred = $q.defer();
            AppHttp.put('/app/object-tag/getTags', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.addTag = function (data) {
            var deferred = $q.defer();
            AppHttp.post('/app/object-tag/addTag', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };


        this.removeTag = function (data) {
            var deferred = $q.defer();
            AppHttp.put('/app/object-tag/removeTag', data).then(function (response) {
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
            AppHttp.get('/app/setting/getZoneLangItem?code=' + zoneLangCode)
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
            AppHttp.get('/app/map-field/detail/' + uuid)
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
            AppHttp.data('/app/task/activeServiceAssigneeTasks', data)
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
        this.getEtlInformation = function () {
            let deferred = $q.defer();
            AppHttp.get('/app/extract-data/index').then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.switchSyncOwner = function(){
            var deferred = $q.defer();
            AppHttp.get('/app/profile/switchSyncOwner').then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        this.searchMapFields = function(params = {}){
            var deferred = $q.defer();
            AppHttp.post('/app/map-field/search', params).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err);
            });
            return deferred.promise;
        }
    }
})();
