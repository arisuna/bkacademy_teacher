(function() {
    'use strict';

    angular
        .module('app.includeReplace')
        .directive('includeReplace', includeReplace);
    function includeReplace () {
        var directive = {
            require: 'ngInclude',
            restrict: 'A',
            link: function(scope, el, attrs) {
                el.replaceWith(el.children());
            }
        };
        return directive;
    }
})();
