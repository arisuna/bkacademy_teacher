(function () {
    'use strict';

    angular
        .module('app.app-services')
        .service('AppMemberService', AppMemberService);

    AppMemberService.$inject = ['$state', '$q', 'AppHttp', '$timeout', '$location', '$window', '$localStorage', 'AppDataService'];

    function AppMemberService($state, $q, AppHttp, $timeout, $location, $window, $localStorage, AppDataService) {

        var vm = this;

        /**
         *
         * @param uuid
         */
        this.getPotentialReporters = function (uuid) {
            var deferred = $q.defer();
            AppHttp.get('/app/data-member/getPotentialReporters/' + uuid).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        /**
         *
         * @param uuid
         */
        this.getPotentialOwners = function () {
            var deferred = $q.defer();
            AppHttp.get('/app/data-member/getPotentialOwners').then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getReporter = function (objectUuid) {
            var deferred = $q.defer();
            AppHttp.get('/app/data-member/getReporter/' + objectUuid).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.getOwner = function (uuid) {
            var deferred = $q.defer();
            AppHttp.get('/app/data-member/getOwner/' + uuid).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };


        /**
         * data  = { uuid , user_profile_uuid }
         * @param data
         * @returns {*}
         */
        this.setOwner = function (data) {
            var deferred = $q.defer();
            AppHttp.put('/app/data-member/setOwner', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err);
            });
            return deferred.promise;
        }
        /**
         * data  = { uuid , user_profile_uuid, company_id }
         * @param data
         * @returns {*}
         */
        this.setOwnerHr = function (data) {
            var deferred = $q.defer();
            AppHttp.put('/app/data-member/setOwnerHr', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        /**
         * set owner uuid of object (for task)
         * !important
         * @param data
         * @returns {*}
         */
        this.setOwnerUuidOfObject = function (data) {
            var deferred = $q.defer();
            AppHttp.put('/app/data-member/setOwnerObject', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         * data = { uuid, user_profile_uuid }
         * @param data
         * @returns {*}
         */
        this.setReporter = function (data) {
            var deferred = $q.defer();
            AppHttp.put('/app/data-member/setReporter', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        /**
         *
         * @param uuid
         */
        this.getPotentialViewers = function (uuid) {
            var deferred = $q.defer();
            AppHttp.get('/app/data-member/getPotentialViewers/' + uuid).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.searchViewers = function (data) {
            var deferred = $q.defer();
            AppHttp.put('/app/data-member/searchViewers', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         *
         * @param uuid
         */
        this.getObjectMembersList = function (uuid) {
            var deferred = $q.defer();
            if (uuid != undefined && uuid != '') {
                AppHttp.get('/app/data-member/list/' + uuid).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                    deferred.reject(err.data);
                });
            } else {
                AppHttp.get('/app/data-member/list').then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        };

        /**
         * add viewer
         * @param data
         * @returns {*}
         */
        this.addViewer = function (data) {
            var deferred = $q.defer();
            data.selected = true;
            AppHttp.put('/app/data-member/setViewer', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err);
            });
            return deferred.promise;
        };
        /**
         * remove multiples viewers
         * @param uuid
         * @param persons
         * @returns {*}
         */
        this.addViewers = function (uuid, persons) {

            var promises = [];
            var deferredAll = $q.defer();
            if (persons.length > 0) {
                angular.forEach(persons, function (person) {
                    var deferred = $q.defer();
                    deferred.promise = vm.addViewer({
                        object_uuid: uuid,
                        member_uuid: person.uuid,
                    });
                    promises.push(deferred.promise);
                });
                $q.all(promises).then(function (res) {
                    deferredAll.resolve(res);
                }, function (err) {
                    deferredAll.reject(err.data);
                });

            } else {
                deferredAll.resolve({success: true, msg: 'NO_VIEWERS_TEXT'});
            }
            return deferredAll.promise;
        };
        /**
         * remove viewer
         * @param data
         * @returns {*}
         */
        this.removeViewer = function (data) {
            var deferred = $q.defer();
            data.selected = false;
            data.deleted = true;
            AppHttp.put('/app/data-member/removeViewer', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        /**
         * remove Owner
         * @param data
         * @returns {*}
         */
        this.removeOwner = function (data) {
            var deferred = $q.defer();
            data.selected = false;
            data.deleted = true;
            AppHttp.put('/app/data-member/removeOwner', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        /**
         * get creator
         * @param uuid
         * @returns {*}
         */
        this.getCreator = function (uuid) {
            var deferred = $q.defer();
            AppHttp.get('/app/data-member/getCreator/' + uuid).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };


        /**
         *
         * @param uuid
         * @returns {*}
         */
        this.getHrMemberProfile = function (uuid) {
            var deferred = $q.defer();
            if (angular.isDefined(uuid) && uuid != undefined) {
                AppHttp.get('/app/hr_member/detail/' + uuid).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                    deferred.reject(err.data);
                });
            } else {
                deferred.reject({success: false});
            }
            return deferred.promise;
        };

        this.getHrAdminProfiles = function (hrAccountId) {
            var deferred = $q.defer();
            if (angular.isDefined(hrAccountId) && hrAccountId != undefined && hrAccountId > 0) {
                AppHttp.put('/app/hr_member/getAdminProfiles', {company_id: hrAccountId}).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                    deferred.reject(err.data);
                });
            } else {
                deferred.reject({success: false});
            }
            return deferred.promise;
        };

        this.getHrOwnerProfile = function (objectUuid, companyId) {
            var deferred = $q.defer();
            AppHttp.put('/app/data-member/getHrOwner', {
                uuid: objectUuid,
                company_id: companyId
            }).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        this.changeMyPassword = function (data) {
            var deferred = $q.defer();
            AppHttp.post('/app/auth/changeMyPassword', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.changeUserPassword = function (data) {
            var deferred = $q.defer();
            AppHttp.post('/app/auth/changeUserPassword', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.resetUserPassword = function (data) {
            var deferred = $q.defer();
            AppHttp.post('/app/user/resetUserPassword', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.activateMember = function (uuid) {
            var deferred = $q.defer();
            AppHttp.post('/app/user/resetUserPassword', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        /**
         * add app members list
         * @param kind
         */
        this.searchMembers = function (data) {
            var deferred = $q.defer();
            AppHttp.put('/app/app_member/search', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

    }
})();
