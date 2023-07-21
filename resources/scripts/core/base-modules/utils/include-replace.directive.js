/**=========================================================
 * Module: include replace.js
 * Replace dynamic temple in ngInclude
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('includeReplace', includeReplace);
    function includeReplace () {
        var directive = {
            required: 'ngInclude',
            link: function (scope, el, attrs) {
                el.replaceWith(el.children());
            },
            restrict: 'A'
        };
        return directive;
    }
})();
