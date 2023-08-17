(function () {
    'use strict';

    angular
        .module('app.input-selector')
        .directive('inputPrice', inputPrice);

    inputPrice.$inject = ['$translate', '$timeout', 'urlBase', '$filter'];

    function inputPrice($translate, $timeout, urlBase, $filter) {

        var directive = {
            restrict: 'AE',
            require: 'ngModel',
            replace: true,
            scope: {
                model: '=ngModel',
                modelReference: '=?',
                required: '<ngRequired',
                placeholder: '@?',
                requiredMessage: '@?',
                maxLengthMessage: '@?',
                isRequired: '<?',
                isShowErrorMessage: '<?',
                errorMessage: '@?',
                isEditable: '<?',
                step: '<?',
                toolTipText: '@',
                label: '@label',
                noMargin: '<?',
                isDisabled: '<?',
                ngChange: '&?',
                min: '<?',
                pattern: '@?',
                patternErrorMessage: '@?',
                hasPattern: '<?',
                showLabel: '<?',
            },
            templateUrl: urlBase.tplApp('app', '_directives_input_selector', 'price'),
            link: function (scope, element, attrs, ngModelCtrl) {
                scope.required = scope.required || scope.isRequired;
                if (angular.isUndefined(scope.requiredMessage)) {
                    scope.requiredMessage = 'FIELD_IS_REQUIRED_TEXT';
                }

                if (angular.isUndefined(scope.hasPattern)) {
                    scope.hasPattern = false;
                }

                if (angular.isDefined(scope.label) && angular.isUndefined(scope.showLabel)) {
                    scope.showLabel = true;
                }

                if (angular.isUndefined(scope.min)) {
                    scope.min = 0;
                }

                if (angular.isUndefined(scope.isShowErrorMessage)) {
                    scope.isShowErrorMessage = true;
                }

            },
            controller: function ($scope, $element, $attrs) {
                if($scope.model != '' && $scope.model != null && $scope.model != undefined){
                    $scope.numberDisplay = angular.copy($scope.model.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2}));
                }else{
                    $scope.numberDisplay = '';
                }
                $scope.inputType = 'text';


                $scope.$watch('numberDisplay', function(newValue){
                    if(newValue != null && newValue != ''){
                        let _newValue = newValue;
                        $scope.model = Number(newValue.toString().replace(/,/g, ''));
                    }else{
                        $scope.model = '';
                    }
                });


                $scope.$watch('modelReference', function(newValue){
                    if(newValue != null && newValue != ''){
                        if(!$scope.isEditable){
                            let _newValue = newValue;
                            $scope.numberDisplay = angular.copy($scope.model.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2}));
                        }else{
                            if($scope.numberDisplay == '' || $scope.numberDisplay == null || $scope.numberDisplay == undefined){
                                $scope.numberDisplay = angular.copy($scope.modelReference.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2}));
                            }
                        }

                    }


                });

                $scope.useNumber = function(node) {
                    $scope.inputType = 'number';
                    var empty_val = false;
                    const value = $scope.numberDisplay;
                    if ($scope.numberDisplay == ''){
                        empty_val = true;
                    }
                    node.type = 'number';
                    $(node).attr('type', 'number');

                    $scope.$evalAsync(function(){
                        if (!empty_val){
                            $scope.numberDisplay = Number(value.toString().replace(/,/g, '')); // or equivalent per locale
                        }
                    })
                }

                $scope.useText = function(node) {
                    var empty_val = false;
                    const value = Number($scope.numberDisplay);

                    $scope.$evalAsync(function(){
                        $scope.inputType = 'text';
                        $(node).attr('type', 'text');
                        if ($scope.numberDisplay == ''){
                            empty_val = true;
                        }
                        if (!empty_val){
                            $scope.numberDisplay = value.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2});  // or other formatting
                        }
                    });
                };
            }
        };
        return directive;
    }


})();
