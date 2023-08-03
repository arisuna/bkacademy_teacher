(function () {
    'use strict';

    angular
        .module('app.app-directives')
        .directive('appYesNoInput', appYesNoInput);

    appYesNoInput.$inject = ['$translate', 'urlBase'];

    function appYesNoInput($translate, urlBase) {
        var directive = {
            restrict: 'EA',
            replace: true,
            scope: {
                model: '=ngModel',
                required: '<',
                isRequired: '<',
                label: '@',
                requiredMessage: '@',
                titleYes: '@?',
                titleNo: '@?',
                initValue: '<?',
                showLabel: '<?',
                toolTipText: '@?',
                isEditable: '<?',
                disabled: '<?',
                ngChange: '&?',
            },
            templateUrl: urlBase.tplApp('app', '_directives_input', 'yes_no'),

            link: function (scope, element, attrs) {

                if (scope.labelFloating == '' || scope.labelFloating == null) {
                    scope.labelFloating = false;
                }

                scope.realName = "yes_no_selector_" + _.uniqueId();

                if (angular.isUndefined(scope.showLabel) && scope.showLabel == '' || scope.showLabel == null) {
                    scope.showLabel = true;
                }

                if (angular.isUndefined(scope.labelFloating) || scope.labelFloating == false) {
                    scope.className = ''
                    scope.placeholder = $translate.instant('SELECT_TEXT');
                } else {
                    scope.className = 'float-label'
                    scope.placeholder = ' ';
                }

                if (scope.readonly == '' || scope.readonly == null) {
                    scope.readonly = false;
                }

                if (angular.isUndefined(scope.isRequired) || scope.isRequired == null) {
                    scope.isRequired = false;
                }

                if (scope.isEditable === '' || scope.isEditable === null || angular.isUndefined(scope.isEditable)) {
                    scope.isEditable = true;
                }

                if (scope.titleYes == '' || scope.titleYes == undefined) {
                    scope.titleYes = 'YES_TEXT';
                }

                if (scope.titleNo == '' || scope.titleNo == undefined) {
                    scope.titleNo = 'NO_TEXT';
                }

                if (scope.initValue == null || scope.initValue == '') {
                    if (scope.model == null || scope.model == '') scope.model = 0;
                } else {
                    scope.model = scope.initValue;
                }

                if (angular.isUndefined(scope.disabled)){
                    scope.disabled = false;
                }

                if (scope.toolTipText == '' || scope.toolTipText == undefined) {
                    scope.toolTipText = '';
                }

                scope.realName = scope.name + "_yes_no_" + _.uniqueId();

                scope.valueYes = 1;
                scope.valueNo = 0;

            },
            controller: function ($scope, $element, $attrs) {
                $scope.input = {
                    selected: $scope.initValue
                };

                $scope.$watch('model', function (newValue, oldValue) {
                    if (angular.isDefined(newValue)) {
                        $scope.input.selected = parseInt($scope.model);
                    }
                })


                $scope.$watch('input.selected', function (newValue, oldValue) {
                    if (angular.isDefined(newValue) && newValue !== oldValue && newValue !== $scope.model) {
                        $scope.model = $scope.input.selected;
                    }
                })


                $scope.changeValue = function () {
                    if (typeof $scope.ngChange == 'function') {
                        $scope.ngChange();
                    }
                }
            }
        };
        return directive;
    }

})();
