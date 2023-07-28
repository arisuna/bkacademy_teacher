(function () {
    'use strict';
    angular
        .module('app.input-selector')
        .directive('amountViewer', amountViewer)

    function amountViewer() {
        return {
            restrict: 'E',
            scope: {
                model: '<?ngModel',
                currencyCode: '<?',
            },
            template: `
            <div>
                <div class="user-profile-view" ng-class="{'relo-bg-bright-gray': isDisabled == true, 'user-profile-short-view': isLongViewText == true}">
                    <div class="item">

                        <span class="icon">
                            <em class="fa fa-money text-dark-gray text-16"></em>
                        </span>
                        <span class="c" ng-if="model != null && model != '' && model != undefined">
                            {{ model | number:2 }} {{ currencyCode }}
                        </span>

                        <span class="c" ng-if="model == null || model == '' || model == undefined">
                            {{ model === 0 ? 0 : ''}}
                        </span>


                    </div>
                </div>
            </div>
            `,
            link: function (scope, element, attrs) {

            },
        };
    }
})();
