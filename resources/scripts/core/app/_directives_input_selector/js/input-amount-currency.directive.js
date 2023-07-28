(function () {
    'use strict';
    angular
        .module('app.input-selector')
        .directive('inputAmountCurrency', inputAmountCurrency)

    function inputAmountCurrency() {
        return {
            restrict: 'E',
            scope: {
                model: '<?ngModel',
                currency: '<?',
                isCurrencyEditable: '<?',
                isAmountEditable: '<?',
                placeholder: '@',
                requiredMessage: '@',
                isRequired: '<?'
            },
            template: `
            <div class="input-group">
                <input class="form-control"
                       type="text"
                       ng-model="model"
                       format-number-decimal
                       fraction-size="2"
                       data-parsley-required-message="{{ requiredMessage | translate}}"
                       placeholder="{{ placeholder | translate}}"
                       autocomplete="off"
                       ng-readonly="isAmountEditable == false"
                       ng-required="isRequired"
                       placeholder="">
                <span  class="input-group-addon text-center pd-l-1x pd-r-1x relo-bg-bright-gray"> 
                {{ currency }}
                </span>
            </div>
            `,
            link: function (scope, element, attrs) {

            },
        };
    }
})();
