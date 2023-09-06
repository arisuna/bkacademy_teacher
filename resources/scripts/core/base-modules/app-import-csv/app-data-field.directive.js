(function () {
    'use strict';

    angular
        .module('app.app-directives')
        .directive('appDataField', appDataField);

    appDataField.$inject = ['$translate', 'urlBase'];

    function appDataField($translate, urlBase) {
        var directive = {
            restrict: 'E',
            scope: {
                model: '=ngModel',
                label: '<',
                type: '<',
                isEditable: '<',
                isRequired: '<',
            },
            templateUrl: urlBase.tplBase('base-modules/app-import-csv', 'app-data-field'),
        };
        return directive;
    }
})();