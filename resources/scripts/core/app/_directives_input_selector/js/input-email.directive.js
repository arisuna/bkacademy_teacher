(function () {
    'use strict';

    angular
        .module('app.input-selector')
        .directive('inputEmail', inputEmail);

    inputEmail.$inject = ['$translate', '$http', 'urlBase', '$filter'];

    function inputEmail($translate, $http, urlBase, $filter) {
        var directive = {
            restrict: 'AE',
            require: 'ngModel',
            replace: true,
            scope: {
                model: '=ngModel',
                required: '<ngRequired',
                requireMessage: '@?',
                errorMessage: '@?',
                isMaterial: '<',
                label: '@label',
            },
            templateUrl: urlBase.tplBase('base-modules/input-selector', 'email-mda'),
            link: function (scope, element, attrs, ngModelCtrl) {

            },
            controller: function ($scope, $element, $attrs) {
                //load all poicy of company

                $scope.changeValue = function () {
                    $scope.model = $scope.model.toLowerCase();
                }
            }
        };
        return directive;
    }


})();
