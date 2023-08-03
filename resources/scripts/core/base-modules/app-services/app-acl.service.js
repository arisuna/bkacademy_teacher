(function () {
    'use strict';

    angular
        .module('app.app-services')
        .service('AppAclService', AppAclService);

    AppAclService.$inject = ['$state', '$q', '$http', '$timeout', 'AppAuthService', '$location', '$window', '$localStorage', 'AppDataService', 'AppHttp'];

    function AppAclService($state, $q, $http, $timeout, AppAuthService, $location, $window, $localStorage, AppDataService, AppHttp) {
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

        this.data = {
            groups: [
                {id: 0, text: 'Index'},
                {id: 1, text: 'Create'},
                {id: 2, text: 'Update'},
                {id: 3, text: 'Delete'},
            ]
        };

        this.getGroups = function () {
            return vm.data.groups;
        };

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


        this.getAllItems = function () {
            var deferred = $q.defer();
            AppHttp.get('/app/acl/getItems').then(function (response) {
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


        this.getAllItemsByCompanyType = function (companyType) {
            var deferred = $q.defer();
            AppHttp.get('/app/acl/getItems/?company_type=' + companyType).then(function (response) {
                if (angular.isDefined(response.data.success) && response.data.success === true) {
                    deferred.resolve(response.data);
                } else {
                    deferred.reject(response.data);
                }
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        this.getAllItemsByUserGroupId = function (userGroupId) {
            var deferred = $q.defer();
            AppHttp.get('/app/acl/getItems/?user_group_id=' + userGroupId).then(function (response) {
                if (angular.isDefined(response.data.success) && response.data.success === true) {
                    deferred.resolve(response.data);
                } else {
                    deferred.reject(response.data);
                }
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        this.getItemsAppliedByUserGroupId = function (userGroupId) {
            var deferred = $q.defer();
            AppHttp.get('/app/acl/getItemsAppliedByUserGroupId/' + userGroupId).then(function (response) {
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


        this.getAclLevel1Items = function (companyTypeId) {
            var deferred = $q.defer();
            AppHttp.get('/app/acl/getLevel1Items/' + companyTypeId).then(function (response) {
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


        this.getAclChilrenItems = function (aclId) {
            var deferred = $q.defer();
            AppHttp.put('/app/acl/getChildrenItems/' + aclId).then(function (response) {
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


        this.deleteAclItem = function (id) {
            var deferred = $q.defer();
            AppHttp.delete('/app/acl/delete/' + id).then(function (response) {
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


        this.updateAclItem = function (data) {
            var deferred = $q.defer();
            AppHttp.put('/app/acl/update/' + data.id, data).then(function (response) {
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


        this.createAclItem = function (data) {
            var deferred = $q.defer();
            AppHttp.post('/app/acl/create', data).then(function (response) {
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


        this.getAclItem = function (id) {
            var deferred = $q.defer();
            AppHttp.get('/app/acl/getItem/' + id).then(function (response) {
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

        this.setAclPosition = function (positions) {
            var deferred = $q.defer();
            AppHttp.put('/app/acl/setPosition', {positions: positions}).then(function (response) {
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

        this.applyAclToUserGroup = function (aclId, userGroupId) {
            var deferred = $q.defer();
            AppHttp.put('/app/acl/apply', {aclId: aclId, userGroupId: userGroupId}).then(function (response) {
                if (angular.isDefined(response.data.success) && response.data.success === true) {
                    deferred.resolve(response.data);
                } else {
                    deferred.reject(response.data);
                }
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.relieveAclFromUserGroup = function (aclId, userGroupId) {
            var deferred = $q.defer();
            AppHttp.put('/app/acl/relieve', {aclId: aclId, userGroupId: userGroupId}).then(function (response) {
                if (angular.isDefined(response.data.success) && response.data.success === true) {
                    deferred.resolve(response.data);
                } else {
                    deferred.reject(response.data);
                }
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getParentAcls = function(data){
            var deferred = $q.defer();
            AppHttp.post('/app/acl/getParentAcls', data).then(function (response) {
                if (angular.isDefined(response.data.success) && response.data.success === true) {
                    deferred.resolve(response.data);
                } else {
                    deferred.reject(response.data);
                }
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }
    }
})();
