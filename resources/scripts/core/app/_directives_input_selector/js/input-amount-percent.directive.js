(function () {
    'use strict';

    angular
        .module('app.input-selector')
        .directive('inputAmountPercent', inputAmountPercent);

    inputAmountPercent.$inject = ['$translate', '$http', 'urlBase'];

    function inputAmountPercent($translate, $http, urlBase) {
        var directive = {
            restrict: 'E',
            replace: true,
            scope: {
                model: '=ngModel',
                required: '<',
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
                <div class="mda-form-group">
                    <label class="text-muted" ng-show="showLabel == true">
                        {{ label | translate }}
                        <tooltip text="{{ toolTipText | translate }}" ng-if="toolTipText" class="ml-sm"></tooltip>
                        <span ng-if="required" class="text-danger ml-sm">*</span>
                    </label>
                    <div class="mda-form-control">
                        <div class="input-group">
                            <span class="input-group-addon text-center pd-l-1x pd-r-1x relo-bg-bright-gray">%</span>
                            
                            <input class="form-control"
                                   step="0.01"
                                   format-number-percent="."
                                   maxlength="4"
                                   ng-disabled="disabled"
                                   placeholder="{{ placeholder != '' ? ( placeholder | translate ) : '' }}"
                                   type="text"
                                   name="{{inputName}}"
                                   id="{{inputName}}" ng-model="model"/>
                        </div>
                        <input ng-show="false" type="text" ng-model="model" ng-required="required" data-parsley-required-message="{{ requiredMessage | translate }}"/>
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

            }
        };
        return directive;
    }

})();
