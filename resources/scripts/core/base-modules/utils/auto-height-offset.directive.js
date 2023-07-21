(function () {
    'use strict';

    angular
        .module('app.utils')
        .directive('autoHeightOffset', autoHeightOffset);

    autoHeightOffset.$inject = ['$window', 'Utils'];

    function autoHeightOffset($window, Utils) {

        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                let positionOffset = Utils.getOffsetPosition(element);
                element.css('height', $window.innerHeight - positionOffset.top + 'px');
            }
        }
    }

})();
