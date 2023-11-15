(function () {
    'use strict';

    angular
        .module('app.app-services')
        .service('AppWebAclService', AppWebAclService);

    AppWebAclService.$inject = ['$state', '$q', '$http', '$timeout', 'AppAuthService', '$location', '$window', '$localStorage', 'AppDataService', 'AppHttp'];

    function AppWebAclService($state, $q, $http, $timeout, AppAuthService, $location, $window, $localStorage, AppDataService, AppHttp) {
        /**
         *
         * @type {AppWebAclService}
         */
        var vm = this;

        this.data = {
            groups: [
                {id: 0, text: 'Index'},
                {id: 1, text: 'Create'},
                {id: 2, text: 'Update'},
                {id: 3, text: 'Delete'},
            ],
            end_user_levels: [
                {id: 0, text: 'LEVEL_0_TEXT'},
                {id: 1, text: 'LEVEL_1_TEXT'},
                {id: 2, text: 'LEVEL_2_TEXT'},
                {id: 3, text: 'LEVEL_3_TEXT'},
            ],
            lvl1_acls: [
                
            ]
        };

        this.getGroups = function () {
            return vm.data.groups;
        };

        this.getEndUserLevels = function () {
            return vm.data.end_user_levels;
        };

        this.setLvl1WebAcls = function (list) {
            vm.data.lvl1_acls = angular.copy(list);
            return;
        }

        this.showAcl = function (id) {
            let deferred = $q.defer();
            AppHttp.get('/app/web-acl/showAcl/' + id).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }



        this.addAclItem = function (data) {
            let deferred = $q.defer();
            if (angular.isUndefined(data.web_acl_id) || angular.isUndefined(data.acl)) {
                deferred.resolve({success: false, msg: 'DATA_NOT_FOUND_TEXT'});
            } else {
                AppHttp.post('/app/web-acl/addAclItem', data).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }

        this.removeAclItem = function (data) {
            let deferred = $q.defer();
            if (angular.isUndefined(data.web_acl_id) || angular.isUndefined(data.acl)) {
                deferred.resolve({success: false, msg: 'DATA_NOT_FOUND_TEXT'});
            } else {
                AppHttp.put('/app/web-acl/removeAclItem', data).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        }

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
            AppHttp.get('/app/web-acl/getItems').then(function (response) {
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


        this.getAllItemsByUserGroupId = function (userGroupId) {
            var deferred = $q.defer();
            AppHttp.get('/app/web-acl/getItems/?user_group_id=' + userGroupId).then(function (response) {
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
            AppHttp.get('/app/web-acl/getItemsAppliedByUserGroupId/' + userGroupId).then(function (response) {
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


        this.getAclLevel1Items = function () {
            var deferred = $q.defer();
            AppHttp.get('/app/web-acl/getLevel1Items/').then(function (response) {
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
            AppHttp.put('/app/web-acl/getChildrenItems/' + aclId).then(function (response) {
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
            AppHttp.delete('/app/web-acl/delete/' + id).then(function (response) {
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


        this.updateWebAcl = function (data) {
            var deferred = $q.defer();
            AppHttp.put('/app/web-acl/update/' + data.id, data).then(function (response) {
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
            AppHttp.post('/app/web-acl/create', data).then(function (response) {
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
            AppHttp.get('/app/web-acl/getItem/' + id).then(function (response) {
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
            AppHttp.put('/app/web-acl/setPosition', {positions: positions}).then(function (response) {
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
            AppHttp.put('/app/web-acl/apply', {aclId: aclId, userGroupId: userGroupId}).then(function (response) {
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
            AppHttp.put('/app/web-acl/relieve', {aclId: aclId, userGroupId: userGroupId}).then(function (response) {
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
            AppHttp.post('/app/web-acl/getParentAcls', data).then(function (response) {
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
