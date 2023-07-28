/**=========================================================
 * Filter: capitalize
 =========================================================*/

(function () {
    'use strict';
    angular
        .module('app.input-selector')
        .directive('currencyViewer', currencyViewer)

    function currencyViewer() {
        return {
            restrict: 'E',
            scope: {
                model: '<?ngModel',
            },
            template:
                `<div> 
                    <div class="user-profile-view"> 
                        <div class="not-found"> 
                            <span class="round-32 mr-sm">
                                <icon class="fa fa-money text-16 text-dark-blue"></icon> 
                            </span>
                            <span class="c"> 
                                {{ model | translate }} 
                            </span> 
                        </div> 
                    </div> 
                </div>`,
            link: function (scope, element, attrs) {

            },
        };
    }
})();
