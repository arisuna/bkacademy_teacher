/**=========================================================
 * Filter: capitalize
 =========================================================*/

(function () {
    'use strict';
    angular
        .module('app.filters')
        .filter('nl2br', nl2br);
    nl2br.$inject = ['$sce', '$sanitize'];

    function nl2br($sce, $sanitize) {
        return filter;

        function filter(msg) {
            var breakTag = (/xhtml/i).test(document.doctype) ? '<br />' : '<br>';
            msg = (msg + '').replace(/(\r\n|\n\r|\r|\n|&#10;&#13;|&#13;&#10;|&#10;|&#13;)/g, breakTag + '$1');
            return $sanitize(msg);
        }
    }

})();
