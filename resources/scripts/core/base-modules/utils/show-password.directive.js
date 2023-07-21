(function() {
    'use strict';
    angular
        .module('app.utils')
        .directive('showPassword', showPassword);

    function showPassword() {
        return function linkFn(scope, elem, attrs) {
            scope.$watch(attrs.showPassword, function(newValue) {
                if (newValue) {
                    elem.attr("type", "text");
                } else {
                    elem.attr("type", "password");
                };
            });
        };
    }
})();

