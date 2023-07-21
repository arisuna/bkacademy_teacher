(function () {
    'use strict';

    angular
        .module('app.app-services-auth')
        .service('AppAuthService', AppAuthService);

    AppAuthService.$inject = ['$rootScope', '$q', 'AppHttp', '$timeout', 'AppDataService', '$location', '$window', '$localStorage', '$state', 'AppSystem'];

    function AppAuthService($rootScope, $q, AppHttp, $timeout, AppDataService, $location, $window, $localStorage, $state, AppSystem) {

        var vm = this;

        this.data = {
            user: null,
            avatar: {},
            avatar_url: {},
            company: {},
            configurations: {}, //TODO for USER CONFIGURATIONS
            permissions: {},
            menuItems: {},
            connected: false,
            redirectUrl: '',
            paymentMethods: {},
            subscription: {},
            modules: [],
            limitations: []
        };

        this.config = {
            __plan_basic: 15,
        };


        /**
         * check if Limit exist
         * @param limitName
         * @returns {boolean}
         */
        this.checkLimit = function (limitName) {
            if (angular.isDefined(vm.data.limitations[limitName])) {
                return true;
            }
            return false;
        }
        /**
         * get limit value
         * @param limitName
         * @returns {*}
         */
        this.getLimitValue = function (limitName) {
            if (angular.isDefined(vm.data.limitations[limitName])) {
                return vm.data.limitations[limitName].value;
            }
            return null
        }
        /**
         * get limit object
         * @param limitName
         * @returns {*}
         */
        this.getLimitObject = function (limitName) {
            if (angular.isDefined(vm.data.limitations[limitName])) {
                return vm.data.limitations[limitName];
            }
            return null
        }
        /**
         * get Module By Name
         * @param moduleName
         * @returns {*}
         */
        this.getModule = function (moduleName) {
            if (angular.isDefined(vm.data.modules[moduleName])) {
                let module = vm.data.modules[moduleName];
                module.is_visible = vm.checkVisibleModule(moduleName);
                module.is_blocked = vm.checkBlockedModule(moduleName);
                module.is_premium = vm.checkPremiumModule(moduleName);
                module.in_trial = vm.checkInTrialModule(moduleName);
                module.has_limit = vm.checkHasLimitModule(moduleName);
                module.is_accessible = module.is_visible == true && module.is_blocked == false && module.is_active == true;
                return module;
            }
        }

        this.getModuleFromController = function (controllerName) {
            let module = _.find(vm.data.modules, function (item) {
                if (_.isObject(item.actions)) {
                    if (_.has(item.actions, controllerName) == true) {
                        return true;
                    }
                }
            });
            return module;
        }


        /**
         * check Premium Module Is Visibled
         * @param moduleName
         * @returns {*}
         */
        this.checkVisibleModule = function (moduleName) {
            if (angular.isDefined(vm.data.modules[moduleName])) {
                return true;
            }
        }
        /**
         * check if amodule is Locked
         * @param moduleName
         * @returns {*}
         */
        this.checkBlockedModule = function (moduleName) {
            if (angular.isDefined(vm.data.modules[moduleName])
                && angular.isDefined(vm.data.modules[moduleName].is_active)
                && vm.data.modules[moduleName].is_active == false) {
                return true;
            }
            return false;
        }

        /**
         * check if amodule is Locked
         * @param moduleName
         * @returns {*}
         */
        this.checkActiveModule = function (moduleName) {
            if (angular.isDefined(vm.data.modules[moduleName]) && angular.isDefined(vm.data.modules[moduleName].is_active) && vm.data.modules[moduleName].is_active == true) {
                return true;
            }
            return false;
        }

        /**
         *
         * @param moduleName
         * @returns {*}
         */
        this.checkHasLimitModule = function (moduleName) {
            if (angular.isDefined(vm.data.modules[moduleName]) && angular.isDefined(vm.data.modules[moduleName].is_active) && vm.data.modules[moduleName].is_active == false) {
                return vm.data.modules[moduleName].is_limited;
            }
            return false;
        }


        /**
         * check if amodule is Locked
         * @param moduleName
         * @returns {*}
         */
        this.checkPremiumModule = function (moduleName) {
            if (angular.isDefined(vm.data.modules[moduleName]) && angular.isDefined(vm.data.modules[moduleName].is_premium)) {
                return vm.data.modules[moduleName].is_premium;
            }
            return false;
        }

        /**
         * check if amodule is Locked
         * @param moduleName
         * @returns {*}
         */
        this.checkInTrialModule = function (moduleName) {
            if (angular.isDefined(vm.data.modules[moduleName]) && angular.isDefined(vm.data.modules[moduleName].in_trial)) {
                return vm.data.modules[moduleName].in_trial > 0 ? vm.data.modules[moduleName].in_trial : false;
            }
            return false;
        }

        this.getPlanBasic = function () {
            return this.config.__plan_basic;
        }

        /**
         * check if employee is connected
         * @returns {boolean}
         */
        this.isConnected = function () {
            if (vm.connected == true) {
                return true;
            } else {
                return false;
            }
        }

        this.isAdmin = function () {
            return angular.isDefined(vm.data.user.isAdmin) && vm.data.user.isAdmin == true;
        }

        this.isAdminOrManager = function () {
            return angular.isDefined(vm.data.user.isAdminOrManager) && vm.data.user.isAdminOrManager == true;
        }

        this.getMenuItems = function () {
            return vm.data.menuItems;
        }

        this.getAclList = function () {
            return vm.data.permissions;
        }

        this.getCompany = function () {
            return this.data.company;
        }

        this.getSubscription = function () {
            return this.data.subscription;
        }

        this.getModules = function () {
            return this.data.modules;
        }

        this.getCompanyCurrency = function () {
            return this.data.company.currency_code;
        }

        this.getCompanyTimezoneOffset = function () {
            return this.data.company.timezone_offset;
        }

        this.getCompanyTimezoneUtc = function () {
            return this.data.company.timezone_utc;
        }

        this.getCompanyTimezoneName = function () {
            return this.data.company.timezone_name;
        }

        this.getConfigurations = function () {
            return vm.data.configurations;
        }

        this.getRedirectUrl = function () {
            if (vm.data.redirectUrl !== undefined && vm.data.redirectUrl !== '' && vm.data.redirectUrl.includes('app')) {
                return vm.data.redirectUrl
            }

            if (angular.isDefined($localStorage.redirectUrl) && !_.isNull($localStorage.redirectUrl) && _.includes($localStorage.redirectUrl, 'app')) {
                return $localStorage.redirectUrl;
            } else {
                return undefined;
            }
        }

        this.setRedirectUrlNull = function () {
            vm.data.redirectUrl = undefined;
            $localStorage.redirectUrl = undefined;
        }

        this.setRedirectUrl = function (url) {
            vm.data.redirectUrl = url;
            $localStorage.redirectUrl = url;
        }

        this.getUser = function () {
            return this.data.user;
        }

        this.getAvatar = function () {
            return this.data.avatar;
        }

        this.getAvatarUrl = function () {
            return this.data.avatar_url;
        }

        this.getConfigurationValue = function (name) {
            return angular.isDefined(vm.data.configurations[name]) ? vm.data.configurations[name].value : '';
        }

        this.getPermissions = function () {
            return vm.data.permissions;
        }

        this.getPaymentMethods = function () {
            return vm.data.paymentMethods;
        }

        this.setCompanyData = function (company) {
            vm.data.company = company;
        }
        /**
         * reset connection
         */
        this.resetConnection = function () {
            localStorage.setItem('token_key', null);
            localStorage.setItem('refresh_token', null);
            vm.connected = false;
        }
        /**
         * should reset before check
         * @returns {*}
         */
        this.checkLoginProcess = function () {
            var deferredAll = $q.defer();
            if (vm.isConnected() == true) {
                deferredAll.resolve({success: true});
            } else {
                AppDataService.checkLogin().then(
                    function (res) {
                        console.log(res);
                        var current_url = window.location.href;
                        if (res.success) {
                            vm.data.profile = res.user;
                            vm.data.user = res.user;
                            vm.connected = true;
                            deferredAll.resolve(res);
                        } else if (angular.isDefined(res.required)) {
                            vm.connected = false;
                            if (!current_url.includes('/#/login') && current_url.includes('app')) {
                                vm.setRedirectUrl(current_url);
                            }
                            deferredAll.reject(res);
                        }
                    },
                    function (err) {
                        console.log(err);
                        let current_url = window.location.href;
                        if (!current_url.includes('/#/login') && current_url.includes('app')) {
                            vm.setRedirectUrl(current_url);
                        }
                        deferredAll.reject(err);
                    }
                )
            }
            return deferredAll.promise;
        }

        this.getAuthData = function () {
            var promises = [];
            var deferredAll = $q.defer();

            $q.all([
                AppDataService.getCurrentProfile().then(
                    function (res) {
                        if (res.success) {
                            vm.data.user = res.profile;
                            vm.data.user.name = res.profile.firstname + ' ' + res.profile.lastname;
                            vm.data.avatar = res.avatar;
                            vm.data.avatar_url = res.avatar_url;
                            return res.data;
                        } else {
                            deferredAll.reject(res);
                        }
                    },
                    function (err) {
                        deferredAll.reject(err.data);
                    }
                ),
                AppDataService.getMyCompanyInfo().then(
                    function (res) {
                        if (res.success) {
                            vm.data.company = res.data;
                            vm.data.subscription = res.subscription;
                            vm.data.modules = res.modules;
                            vm.data.limitations = res.limites;
                            return res.data;
                        } else {
                            deferredAll.reject(res);
                        }
                    },
                    function (err) {
                        deferredAll.reject(err.data);
                    }
                ),

                AppDataService.getMyCompanyConfiguration().then(
                    function (res) {
                        if (res.success) {
                            vm.data.configurations = res.data;
                            return res.data;
                        } else {
                            deferredAll.reject(res);
                        }
                    },
                    function (err) {
                        deferredAll.reject(err.data);
                    }
                ),

                AppDataService.getPermissionsList().then(
                    function (res) {
                        console.log('system:permissions');
                        if (res.success) {
                            vm.data.permissions = res.data;
                            return res.data;
                        } else {
                            deferredAll.reject(res);
                        }
                    },
                    function (err) {
                        deferredAll.reject(err.data);
                    }
                ),


                AppDataService.getMenuItems().then(
                    function (res) {
                        if (res.success) {
                            vm.data.menuItems = res.data;
                            return res.data;
                        }
                        return res.data;
                    },
                    function (err) {
                        deferredAll.reject(err.data);
                    }
                ).catch(function (err) {
                    deferredAll.reject(err);
                }),

                AppDataService.getPaymentMethodList().then(
                    function (res) {
                        if (res.success) {
                            vm.data.paymentMethods = res.data;
                            return res.data;
                        }
                        return res.data;
                    },
                    function (err) {
                        deferredAll.reject(err.data);
                    }
                ).catch(function (err) {
                    deferredAll.reject(err);
                }),


            ]).then(function (values) {
                console.log('system:base company initied');
                deferredAll.resolve(values);
            }, function (err) {
                console.log('system:base company error');
                deferredAll.reject(err);
            }).catch(function (err) {
                console.log('system:base company failed');
                deferredAll.reject(err);
            });
            return deferredAll.promise;
        }

        this.gotoLoginPage = function () {
            $state.go('login.auth');
        }

        this.gotoWelcomePage = function () {
            if ($location.absUrl().indexOf('app/#/login') == -1) {
                $location.path('/app/#/login');
            }
        }

        this.checkTotal = function () {

            var deferredAll = $q.defer();

            vm.checkLoginProcess().then(function () {

                if (vm.isConnected() == true) {

                    $q.all([
                        AppSystem.getSystemData().then(function onSuccess(res) {
                            console.log('system:system data inited');
                        }, function onError() {
                            deferredAll.reject({success: false, message: 'LOGIN_FAILED_TEXT'});
                        }),

                        vm.getAuthData().then(function (res) {
                            console.log('system:auth data inited');
                            var currentUser = vm.getUser();
                            if (currentUser.id > 0) {
                                $rootScope.currentUser = currentUser;
                            } else {
                                deferredAll.reject({success: false, message: 'LOGIN_FAILED'});
                                $rootScope.currentUser = null;
                            }
                        }, function (err) {
                            console.log('system:auth data failed');
                            deferredAll.reject({success: false, message: 'LOGIN_FAILED'});
                        })

                    ]).then(function onSuccess() {

                        if (typeof Appcues != 'undefined' &&
                            angular.isDefined(Appcues) &&
                            angular.isDefined($rootScope.currentUser) &&
                            $rootScope.currentUser != null &&
                            angular.isDefined($rootScope.currentUser.id)) {
                            Appcues.identify($rootScope.currentUser.id, {
                                name: $rootScope.currentUser.firstname + ' ' + $rootScope.currentUser.lastname,
                                email: $rootScope.currentUser.workemail,
                                created_at: $rootScope.currentUser.created_at
                            });
                        }

                        deferredAll.resolve({success: true, message: 'LOGIN_SUCCESS_TEXT'});

                    }, function onError() {
                        deferredAll.reject({success: false, message: 'LOGIN_FAILED'});
                    })


                } else {
                    console.log('authservice login failed')
                    deferredAll.reject({success: false, message: 'LOGIN_FAILED'});
                    $rootScope.currentUser = null;

                    vm.gotoLoginPage();
                }
            }, function (err) {
                console.log('authservice err', err);
                deferredAll.reject({success: false, message: 'LOGIN_FAILED'});
                $rootScope.currentUser = null;
                vm.gotoLoginPage();
            });

            return deferredAll.promise;
        }

        this.setSubscription = function (subscription) {
            vm.data.subscription = subscription;
        }

        this.getCompanyDateFormat = function () {
            if (angular.isDefined(this.data.company.date_format) && this.data.company.date_format != '' && this.data.company.date_format != null) {
                return this.data.company.date_format;
            } else {
                return 'DD/MM/YYYY';
            }
        }

        /**
         * switch version
         * @param moduleName
         * @returns {*}
         */
        this.switchUiVersion = function (moduleName) {
            var deferred = $q.defer();
            AppHttp.put('/app/profile/switchVersion', {moduleName: moduleName}).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.setVersion = function (moduleName, version) {
            if (_.isObject(vm.data.user.versions) && angular.isDefined(vm.data.user.versions[moduleName])) {
                vm.data.user.versions[moduleName] = version;
            } else {
                vm.data.user.versions = {};
                vm.data.user.versions[moduleName] = version;
            }
        };

        this.getVersion = function (moduleName) {
            if (_.isObject(vm.data.user.versions) && angular.isDefined(vm.data.user.versions[moduleName])) {
                return vm.data.user.versions[moduleName];
            }
            return null;
        };
    }
})
();
