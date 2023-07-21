/**=========================================================
 * Filter: capitalize
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.filters')
        .filter('trustMe', trustMe);
    trustMe.$inject = ['$sce'];
    function trustMe($sce) {
        return filter;
        function filter(input){
            return $sce.trustAsHtml( input );
        }
    }


    angular
        .module('app.filters')
        .filter('trustAsResourceUrl', trustAsResourceUrl);
    trustMe.$inject = ['$sce'];
    function trustAsResourceUrl($sce) {
        return filter;
        function filter(input){
            return $sce.trustAsResourceUrl( input );
        }
    }
})();
