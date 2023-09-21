(function () {
    'use strict';

    angular
        .module('app.app-services')
        .service('AppAttributeService', AppAttributeService);

    AppAttributeService.$inject = ['$http', '$q', '$httpParamSerializer', '$localStorage', '$filter', 'moment', 'AppHttp'];

    function AppAttributeService($http, $q, $httpParamSerializer, $localStorage, $filter, moment, AppHttp) {

        var vm = this;


        this.initialize = function () {
            let deferred = $q.defer();
            AppHttp.get('/app/attribute-company/initialize').then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getList = function (data) {
            let deferred = $q.defer();
            AppHttp.put('/app/attribute/search', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.export = function () {
            let deferred = $q.defer();
            AppHttp.get('/app/attribute-company/export').then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.detail = function (attribute_id = 0, company_id = 0) {
            let deferred = $q.defer();
            AppHttp.get('/app/attribute-company/detail/' + attribute_id + '/' + company_id).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getListAttributeValue = function (company_id = 0, attribute_id = 0) {
            let deferred = $q.defer();
            AppHttp.get('/app/attribute-company/getListAttributeValue/' + company_id + '/' + attribute_id).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getDetailAttributeCompany = function (attribute_id = 0, company_id = 0) {
            let deferred = $q.defer();
            AppHttp.get('/app/attribute-company/getDetail/' + attribute_id + '/' + company_id).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        // arg ='update' | 'create'
        this.saveAttributeCompany = function (arg, data) {
            let deferred = $q.defer();
            AppHttp.post('/app/attribute-company/' + arg, data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.attributeDelete = function (id) {
            let deferred = $q.defer();
            AppHttp.delete('/app/attribute/delete', {id: id}).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }


        this.getAttributesList = function () {
            var deferred = $q.defer();
            AppHttp.get('/app/attribute/index').then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };


        this.initAttributes = function () {
            var deferred = $q.defer();
            AppHttp.get('/app/attribute/initialize').then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };


        this.deleteAttribute = function (id) {
            var deferred = $q.defer();
            AppHttp.delete('/app/attribute/delete/' + id).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };


        this.createAttribute = function (data) {
            var deferred = $q.defer();
            AppHttp.post('/app/attribute/create', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.updateAttribute = function (data) {
            var deferred = $q.defer();
            AppHttp.put('/app/attribute/update/' + data.id, data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.detailAttribute = function (id) {
            var deferred = $q.defer();
            AppHttp.get('/app/attribute/detail/' + id).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.getAttribute = function (name) {
            let deferred = $q.defer();
            AppHttp.get('/app/attribute/item/' + name).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.getAttributeValues = function (companyId, attributeName) {
            var deferred = $q.defer();
            AppHttp.get('/app/attribute/item/' + companyId + '/' + attributeName + '?_random=' + Math.random()).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.getAttributeValuesById = async function (id) {
            var deferred = $q.defer();
            await AppHttp.get('/app/attribute/getAttributeValuesById/' + id + '?_random=' + Math.random()).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.getAttributeByCode = function (code) {
            var deferred = $q.defer();
            AppHttp.get('/app/attributes/getByCode?code=' + code).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

    }
})();
