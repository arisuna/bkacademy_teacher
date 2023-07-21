(function () {
    'use strict';

    angular
        .module('app.app-services')
        .service('AppAclService', AppAclService);

    AppAclService.$inject = ['$state', '$q', '$http', '$timeout', 'AppAuthService', '$location', '$window', '$localStorage', 'AppDataService'];

    function AppAclService($state, $q, $http, $timeout, AppAuthService, $location, $window, $localStorage, AppDataService) {
        /**
         *
         * @type {AppAclService}
         */
        var vm = this;

        this.adminAclList = [
            {controller: 'role', action: 'index'},
            {controller: 'role', action: 'update'},
            {controller: 'role', action: 'reset'},
            {controller: 'notification_config', action: 'index'},
            {controller: 'notification_config', action: 'update'},
        ];

        this.getAdminAclList = function () {
            return vm.adminAclList;
        };

        this.checkRoutePermission = function (perm) {
            if (perm == undefined) return true;
            if (perm == '' || perm == null) return true;
            var [controller, action] = perm.split('/');
            if (vm.validateAction(controller, action) == true) {
                return true;
            } else {
                console.log(controller, action);
                throw new Error('ACL_FAILED');
            }
        }

        this.validateRoute = function (route) {
            if (route == undefined) return true;
            if (route == '' || route == null) return true;

            var [controller, action] = route.split('/');
            return vm.validateAction(controller, action);
        }

        /**
         * check if employee is connected
         * @returns {boolean}
         */
        this.validateAction = function (controller, action) {

            var acls = AppAuthService.getPermissions();

            if (acls == null || Object.keys(acls).length == 0) {
                return false;
            }


            if (AppAuthService.isAdmin() == false) {
                let adminAcl = _.find(this.getAdminAclList(), function (o) {
                    return o.controller == controller && o.action == action;
                });

                if (!_.isEmpty(adminAcl) && angular.isDefined(adminAcl)) {
                    return false;
                }
            }

            var valid = false;
            for (var o in acls) {
                if (controller == o) {
                    if (angular.isObject(acls[o])) {
                        for (var _act in acls[o]) {
                            if (acls[o][_act] == action) {
                                valid = true;
                                break;
                            }
                        }
                    }
                    break;
                }
            }

            return valid;
        }

        /**
         * check if employee is connected
         * @returns {boolean}
         */
        this.validateActionByHttp = function (controller, action) {
            return AppDataService.checkValidation(controller, action).then(function (res) {
                if (res.success) return true;
                else return false;
            }).catch(function (err) {
                return false;
            })
        }
    }
})();
