(function () {
    'use strict';

    angular
        .module('app.input-selector')
        .directive('inputCheckbox', inputCheckbox);

    inputCheckbox.$inject = ['$translate', 'urlBase'];

    function inputCheckbox($translate, urlBase) {
        var directive = {
            restrict: 'EA',
            replace: true,
            scope: {
                model: '=ngModel',
                required: '<',
                label: '@',
                requiredMessage: '@',
                step: '@',
                disabled: '<?',
                name: '@',
                isBool: '<?',
                ngChange: "&?"
            },
            templateUrl: urlBase.tplBase('base-modules/input-selector', 'checkbox'),
            link: function (scope, element, attrs) {
                scope.realName = "inputTextCheckbox_" + parseInt(Math.random() * 100).toString();
                if (angular.isDefined(scope.isBool) && scope.isBool == true) {
                    scope.trueValue = true;
                    scope.falseValue = false;
                } else {
                    scope.trueValue = 1;
                    scope.falseValue = 0;
                }
            },
            controller: function ($scope, $element, $attrs) {
                $scope.$watch('model', function () {
                    if ($scope.model != '') {
                        if (angular.isDefined($scope.ngChange)) {
                            $scope.ngChange();
                        }
                    }
                })
            }
        };
        return directive;
    }

})();
