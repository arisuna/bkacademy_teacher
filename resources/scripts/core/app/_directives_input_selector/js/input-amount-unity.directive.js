(function () {
    'use strict';

    angular
        .module('app.input-selector')
        .directive('inputAmountUnity', inputAmountUnity);

    inputAmountUnity.$inject = ['$translate', '$http', 'urlBase'];

    function inputAmountUnity($translate, $http, urlBase) {
        var directive = {
            restrict: 'E',
            replace: true,
            scope: {
                model: '=ngModel',
                isRequired: '<',
                disabled: '<?',
                label: '@',
                requiredMessage: '@',
                toolTipText: '@?',
                placeholder: '@?',
                showLabel: '<?',
                step: '@',
                prefix: '<',
                name: '@',
                id: '@',
            },

            template: `
                <div class="form-group">
                    <label class="label-text-form" ng-show="showLabel == true">
                        {{ label | translate }}
                        <tooltip text="{{ toolTipText | translate }}" ng-if="toolTipText" class="ml-sm"></tooltip>
                        <span ng-if="isRequired" class="text-danger ml-sm">*</span>
                    </label>
                    <div class="mda-form-control pd-0">
                        <div class="input-group">
                            <span class="input-group-addon text-center pd-l-1x pd-r-1x relo-bg-bright-gray bd-radius-t-3x bd-radius-l-3x"
                                  ng-if="prefix != '' && prefix  != undefined">
                                {{ prefix }}
                            </span>
                            <span class="input-group-addon text-center pd-l-1x pd-r-1x relo-bg-bright-gray bd-radius-t-3x bd-radius-l-3x"
                                  ng-if="prefix == '' || prefix == null || prefix  == undefined">
                                <em class="fa fa-info-circle"></em>
                            </span>
<!--                            todo review rm format-number-decimal : cause form invalid, seems bus from angular -->
                            <input class="form-control form-control-custom-radius"
                                   ng-class="{'relo-bg-bright-blue-10': !disabled}"
                                   step="0.01"
                                   fraction-size="2"
                                   min="0"
                                   ng-disabled="disabled"
                                   placeholder="{{ placeholder != '' ? ( placeholder | translate ) : '' }}"
                                   type="text"
                                   data-parsley-excluded=true
                                   onfocus="angular.element(this).scope().useNumber(this)"
                                   onblur="angular.element(this).scope().useText(this)"
                                   name="{{inputName}}"
                                   id="{{inputName}}" ng-model="numberDisplay"/>
                        </div>
                        <input  ng-show="false"
                                type="text"
                                ng-model="model"
                                ng-required="isRequired"
                                data-parsley-required-message="{{ requiredMessage | translate }}"/>
                    </div>
                </div>
                `,
            link: function (scope, element, attrs) {
                scope.inputName = "inputTextUnity_" + parseInt(Math.random() * 100).toString();
                if (angular.isUndefined(scope.requiredMessage) || scope.requiredMessage == '') {
                    scope.requiredMessage = 'INFORMATION_REQUIRED_TEXT';
                }

                if (angular.isUndefined(scope.labelFloating) || scope.labelFloating == false) {
                    scope.labelFloating = false;
                    scope.className = ''
                    scope.placeholder = 'ENTER_TEXT';
                } else {
                    scope.className = 'float-label'
                    scope.placeholder = '_';
                }

                if (angular.isUndefined(scope.showLabel) || scope.showLabel == true) {
                    scope.showLabel = true;
                } else {
                    scope.showLabel = false;
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
                        // console.log(_newValue)
                        $scope.model = Number(newValue.toString().replace(/,/g, ''));
                    }else{
                        $scope.model = 0;
                    }

                    console.log('$scope model', $scope.model);
                })

                $scope.showNumber = function(){
                    $scope.inputType = 'number';
                }

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
                    })
                };
            }
        };
        return directive;
    }

})();
