(function () {
    'use strict';

    angular
        .module('app.input-selector')
        .directive('inputTextHtml', inputTextHtml);

    inputTextHtml.$inject = ['$translate', '$http', 'urlBase', '$filter'];

    function inputTextHtml($translate, $http, urlBase, $filter) {
        var directive = {
            restrict: 'AE',
            require: 'ngModel',
            replace: true,
            scope: {
                model: '=ngModel',
                isRequired: '<',
                errorMessage: '@?',
                isEditable: '<?',
                isUpperCase: '<?',
                isLowerCase: '<?',
                isNumeric: '<?',
                isAlphabetic: '<?',
                isDigits: '<?',
                isLabel: '<?',
                label: '@label',
                toolTipText: '@?',
                rows: '@?',
            },
            templateUrl: urlBase.tplApp('app', '_directives_input_selector', 'text-html'),
            link: function (scope, element, attrs, ngModelCtrl) {
                if (angular.isUndefined(scope.rows)){
                    scope.rows = 5;
                } else{
                    scope.rows = parseInt(scope.rows);
                }

                if(angular.isDefined(scope.toolTipText)){
                    scope.toolTipText = '';
                }
            },
            controller: function ($scope, $element, $attrs) {
                //load all policy of company

                $scope.changeValue = function () {
                    if (angular.isDefined($scope.isUpperCase) && $scope.isUpperCase == true && $scope.model) {
                        $scope.model = $scope.model.toUpperCase();
                    }

                    if (angular.isDefined($scope.isLowerCase) && $scope.isLowerCase == true && $scope.model) {
                        $scope.model = $scope.model.toLowerCase();
                    }

                    if (angular.isDefined($scope.isNumeric) && $scope.isNumeric == true && $scope.model) {
                        var inputNumber = $scope.model.toString().replace(/[^0-9]/g, '');
                        $scope.model = inputNumber;
                    }

                    if (angular.isDefined($scope.isAlphabetic) && $scope.isAlphabetic == true && $scope.model) {
                        var inputNumber = $scope.model.toString().replace(/[^A-Za-z]/g, '');
                        $scope.model = inputNumber;
                    }

                    if (angular.isDefined($scope.isLabel) && $scope.isLabel == true && $scope.model) {
                        if (angular.isDefined($scope.isUpperCase) && $scope.isUpperCase == true && $scope.model) {
                            $scope.model = $scope.model.toUpperCase();
                        }
                        var inputNumber = $scope.model.toString().replace(/[^A-Za-z0-9\_]/g, '');
                        $scope.model = inputNumber.toUpperCase();
                    }
                }
            }
        };
        return directive;
    }


})();
