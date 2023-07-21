/**=========================================================
 * Module: clear-storage.js
 * Removes a key from the browser storage via element click
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('checkImage', checkImage);
    checkImage.$inject = ['$http','RelodayUtils']
    function checkImage ( $http , RelodayUtils) {

        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                attrs.$observe('ngSrc', function(ngSrc) {
                    RelodayUtils.isImage( ngSrc ).then(function(){
                        console.log('image exist');
                    },function(err){
                        element.hide();
                    })
                });
            }
        };;

    }

})();
