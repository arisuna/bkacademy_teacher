(function () {
    'use strict';

    angular
        .module('app.app-services')
        .service('AppSystem', AppSystem);

    AppSystem.$inject = ['AppHttp', '$timeout', '$window', '$q', '$translate', 'AppDataService', 'DataService', '$localStorage', '_', 'DataSystem'];

    function AppSystem(AppHttp, $timeout, $window, $q, $translate, AppDataService, DataService, $localStorage, _, DataSystem) {

        var vm = this;

        vm.initied_roles = false;

        this.data = {
            countries: [],
            currencies: [],
            nationalities: [],
            attributes: [],
            languages: [],
            current_language: '',
            zone_langs: [],
            user_groups: [],
            need_form_categories: [],
            service_companies: [],
            need_form_question_types: [],
            comment_templates: [],
            settings: [], //TODO for SYSTEM SETTINGS
            user_settings: [],
            roles: [],
            controller_action_items: [],
            acls: [],
            server_time_zone: '',
            document_types: [],
            levels: [
                {
                    id: 1,
                    label: 'ASSIGNED_TEXT'
                },
                {
                    id: 2,
                    label: 'OFFICE_TEXT'
                },
                {
                    id: 3,
                    label: 'ALL_TEXT'
                }
            ],
            scopes: [
                {
                    id: 1,
                    label: 'HANOI_TEXT'
                },
                {
                    id: 2,
                    label: 'DANANG_TEXT'
                },
                {
                    id: 3,
                    label: 'HOCHIMINHCITY_TEXT'
                }
            ]
        };

        this.initied = false;

        this.getServerTimeZone = function () {
            return vm.data.server_time_zone;
        }

        this.getSettingUserGroups = function () {
            return vm.data.user_groups;
        }

        this.getLevels = function () {
            return vm.data.levels;
        }

        this.getScopes = function () {
            return vm.data.scopes;
        }

        this.setSettingUserGroups = function (list) {
            vm.data.user_groups = angular.copy(list);
            return;
        }
        /**
         *
         * @returns {Array}
         */
        this.getServiceCompanies = function () {
            return vm.data.service_companies;
        }
        /**
         *
         * @returns {Array}service_companies
         */
        this.getNeedFormCategories = function () {
            return vm.data.need_form_categories;
        }

        this.getNeedFormQuestionTypes = function () {
            return vm.data.need_form_question_types;
        }

        this.getCommentTemplates = function () {
            return vm.data.comment_templates;
        }

        this.getCountries = function () {
            return vm.data.countries;
        }

        this.getNationalities = function () {
            return vm.data.nationalities;
        }

        this.getAttributes = function () {
            return vm.data.attributes;
        }

        this.getSettings = function () {
            return vm.data.settings;
        }

        this.getSettingVariable = function (setting_name) {
            return angular.isDefined(vm.data.settings[setting_name]) ? vm.data.settings[setting_name] : '';
        }

        this.getUserSettingVariable = function (setting_name) {
            return angular.isDefined(vm.data.user_settings) && vm.data.user_settings !== null && angular.isDefined(vm.data.user_settings[setting_name]) ? vm.data.user_settings[setting_name] : '';
        }

        this.setSettingVariable = function (setting_name, setting_value) {
            if (typeof vm.data.settings == 'object' &&
                angular.isDefined(vm.data.settings) &&
                vm.data.settings !== null) {
                vm.data.settings[setting_name] = setting_value;
            } else if (Array.isArray(vm.data.settings)) {
                vm.data.settings[setting_name] = setting_value;
            }
        }


        this.setUserSettingVariable = function (setting_name, setting_value) {
            if (typeof vm.data.user_settings == 'object' &&
                angular.isDefined(vm.data.user_settings) &&
                vm.data.user_settings !== null) {
                vm.data.user_settings[setting_name] = setting_value;
            } else if (Array.isArray(vm.data.settings)) {
                vm.data.user_settings[setting_name] = setting_value;
            }
        }

        this.getLanguages = function () {
            return vm.data.languages;
        }

        this.getCurrentLanguage = function () {
            return vm.data.current_language;
        }

        this.getCurrencies = function () {
            return vm.data.currencies;
        }

        this.reloadAttribute = function () {
            AppDataService.reloadCacheAttributesValues($translate.use()).then(
                function (response) {
                    if (response.success == true) {
                        vm.data.attributes = response.data;
                    }
                }, function (err) {
                    console.log(err);
                });
        }
        /**
         * get system data
         */
        this.getSystemData = function () {
            var deferred = $q.defer();
            var self = this;
            var promiseList = [];

            promiseList.push(
                DataSystem.getSystemData().then(function (res) {
                    self.data.currencies = DataSystem.getCurrencies();
                    self.data.nationalities = DataSystem.getNationalities();
                    self.data.countries = DataSystem.getCountries();
                }, function (err) {
                    deferred.reject(err);
                })
            )

            promiseList.push(
                DataService.getClientTimeZone().then(function (response) {
                    if (response.success == true) {
                        return response;
                    } else {
                        deferred.reject(response);
                    }
                }, function (err) {
                    deferred.reject(err);
                })
            );


            promiseList.push(DataService.getServerTimeZone().then(
                function (response) {
                    if (response.success == true) {
                        self.data.server_time_zone = response.data;
                        return response;
                    } else {
                        deferred.reject(response);
                    }
                }, function (err) {
                    deferred.reject(err);
                }));


            promiseList.push(AppDataService.getAttributesValues($translate.use()).then(
                function (response) {
                    if (response.success == true) {
                        self.data.attributes = response.data;
                    } else {
                        deferred.reject(response);
                    }
                }, function (err) {
                    deferred.reject(err);
                })
            );


            promiseList.push(AppDataService.getSettingUserGroups($translate.use()).then(
                function (response) {
                    if (response.success == true) {
                        self.data.user_groups = response.data;
                        return response;
                    } else {
                        deferred.reject(response);
                    }
                }, function (err) {
                    deferred.reject(err);
                }));


            promiseList.push(AppDataService.getSettingVariables().then(
                function (response) {
                    if (response.success == true) {
                        self.data.settings = response.data;
                        return response;
                    } else {
                        deferred.reject(response);
                    }
                }, function (err) {
                    deferred.reject(err);
                }));


            promiseList.push(AppDataService.getUserSettingVariables().then(
                function (response) {
                    if (response.success == true) {
                        self.data.user_settings = response.data;
                        return response;
                    } else {
                        deferred.reject(response);
                    }
                }, function (err) {
                    deferred.reject(err);
                }));

            promiseList.push(
                AppDataService.getSystemLanguages().then(
                    function (response) {
                        if (response.success == true) {
                            self.data.languages = response.data;
                            self.data.current_language = response.current;
                            $translate.use(self.data.current_language);
                            return response;
                        } else {
                            deferred.reject(response);
                        }
                    }, function (err) {
                        deferred.reject(err);
                    }));


            $q.all(promiseList)
                .then(function (values) {
                    console.log('system:inited');
                    self.inited = true;
                    deferred.resolve(values);
                }, function (err) {
                    deferred.reject(err);
                });

            return deferred.promise;
        }

        this.prepareDataNeedForm = function () {
            var deferredAll = $q.defer();
            if (vm.data.service_companies.length > 0 && vm.data.need_form_categories.length > 0) {
                deferredAll.resolve({success: true})
            } else {
                $q.all([
                    AppDataService.initDataNeedForm().then(
                        function (response) {
                            if (response.success == true) {
                                vm.data.need_form_categories = response.categories;
                                vm.data.service_companies = response.services;
                                if ($.isArray(response.option_list)) {
                                    for (var o in response.option_list) {
                                        vm.data.need_form_question_types [o] = {key: o, value: response.option_list[o]};
                                    }
                                }
                            }
                            return response;
                        }, function (err) {
                            console.log(err);
                        })
                ]).then(function (values) {
                    deferredAll.resolve(values)
                }, function (err) {
                    console.log('error');
                    deferredAll.reject(err)
                });
            }
            return deferredAll.promise;
        }

        /**
         *
         */
        this.prepareCommentData = function () {
            var deferredAll = $q.defer();
            if (vm.data.comment_templates.length > 0 && vm.data.comment_templates.length > 0) {
                deferredAll.resolve({success: true})
            } else {
                $q.all([
                    AppDataService.getCommentTemplatesSimple().then(
                        function (response) {
                            if (response.success == true) {
                                vm.data.comment_templates = response.data;
                            }
                            return response;
                        }, function (err) {
                            console.log(err);
                        })
                ]).then(function (values) {
                    deferredAll.resolve(values)
                }, function (err) {
                    console.log('error');
                    deferredAll.reject(err)
                });
            }
            return deferredAll.promise;
        };


        this.prepareRolesData = function () {
            var deferredAll = $q.defer();

            $q.all([
                AppDataService.getRolesList().then(
                    function (response) {
                        if (response.success == true) {
                            vm.data.roles = response.data;
                        }
                        return response;
                    }, function (err) {
                        console.log(err);
                    }),
                AppDataService.getAclList().then(
                    function (response) {
                        if (response.success == true) {
                            vm.data.acls = response.data;
                        }
                        return response;
                    }, function (err) {
                        console.log(err);
                    }),
                AppDataService.getControllerActionItemList().then(function (response) {
                    if (response.success == true) {
                        vm.data.controller_action_items = response.data;
                    }
                    return response;
                }, function (err) {
                    console.log(err);
                })
            ]).then(function (values) {
                deferredAll.resolve(values);
                vm.initied_roles = true;
            }, function (err) {
                deferredAll.reject(err);
                vm.initied_roles = false;
            });
            return deferredAll.promise;
        }

        this.isInitiedRoles = function () {
            return vm.initied_roles;
        }

        this.getRoles = function () {
            return vm.data.roles;
        }
        this.getAcls = function () {
            return vm.data.alcs;
        }
        this.getControllerActionItems = function () {
            return vm.data.controller_action_items;
        }

        this.getCountry = function (id) {

            let deferred = $q.defer();
            let countries = this.getCountries();

            let country = _.find(countries, function (o) {
                return o.id == id;
            });

            if (country) {
                deferred.resolve({
                    success: true,
                    data: country
                })
            } else {
                AppHttp.get('/app/setting/getCountry/' + id).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                    deferred.reject(err.data);
                });
            }

            return deferred.promise;

        }
    }
})();
