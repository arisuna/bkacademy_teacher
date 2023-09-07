(function () {
    'use strict';

    angular
        .module('app.app-services')
        .service('AppCategoryService', AppCategoryService);

    AppCategoryService.$inject = ['$http', '$q', '$httpParamSerializer', '$localStorage', '$filter', 'moment', 'AppHttp'];

    function AppCategoryService($http, $q, $httpParamSerializer, $localStorage, $filter, moment, AppHttp) {

        var vm = this;

        
        this.search = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/app/category/search', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }
        
        this.getList = function () {
            let deferred = $q.defer();
            AppHttp.get('/app/category/getList').then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }



        this.deleteCategory = function (id) {
            var deferred = $q.defer();
            AppHttp.delete('/app/category/delete/' + id).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };


        this.createCategory = function (data) {
            var deferred = $q.defer();
            AppHttp.post('/app/category/create', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.updateCategory = function (data) {
            var deferred = $q.defer();
            AppHttp.put('/app/category/update/' + data.id, data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.detailCategory = function (id) {
            var deferred = $q.defer();
            AppHttp.get('/app/category/detail/' + id).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };


        this.getLevel1Items = function () {
            var deferred = $q.defer();
            AppHttp.get('/app/category/getLevel1Items/').then(function (response) {
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

        this.getChildrenItems = function (uuid) {
            var deferred = $q.defer();
            AppHttp.put('/app/category/getChildrenItems/' + uuid).then(function (response) {
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

        this.getParentCategories = function (data) {
            var deferred = $q.defer();
            AppHttp.post('/app/category/getParentCategories/',  data).then(function (response) {
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

        this.setCategoryPosition = function (positions) {
            var deferred = $q.defer();
            AppHttp.put('/app/category/setPosition', {positions: positions}).then(function (response) {
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
    }
})();
