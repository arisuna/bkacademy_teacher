(function () {
    'use strict';

    angular
        .module('app.elements')
        .directive('boxQuarantine', boxQuarantine);

    function boxQuarantine() {
        return {
            restrict: 'EA',
            scope: {
                text: '@',
            },

            link: function (scope) {

            },

            template: `
            <div class="box-quarantine text-center">
                <em class="fa fa-lock mr-sm txt-32 text-muted"></em>
                <h4 class="text-muted">{{text | translate}}</h4>
            </div>
            `
        }
    }

})();
