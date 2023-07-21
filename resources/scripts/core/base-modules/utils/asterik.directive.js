(function () {
    'use strict';

    angular
        .module('app.utils')
        .directive('asterikRed', asterikRed);

    asterikRed.$inject = ['$animate'];

    function asterikRed($animate) {

        var directive = {
            template: `
            <span class="text-red">*</span>
            `,
            restrict: 'E'
        };
        return directive;
    }

})();
