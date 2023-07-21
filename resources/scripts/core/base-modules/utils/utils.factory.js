/**
 * Created by anmeo on 10/26/16.
 */

(function () {
    'use strict';
    angular
        .module('app.utils')
        .factory('RelodayUtils', RelodayUtils);

    RelodayUtils.$inject = ['$q'];

    function RelodayUtils( $q ) {

        return {
            isImage: function (src) {

                var deferred = $q.defer();

                var image = new Image();
                image.onerror = function () {
                    deferred.resolve(false);
                };
                image.onload = function () {
                    deferred.resolve(true);
                };
                image.src = src;

                return deferred.promise;
            }


        };
    };
})
();
