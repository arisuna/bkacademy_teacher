/**=========================================================
 * Module: animate-enabled.js
 * Enable or disables ngAnimate for element with directive
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('app.utils')
        .directive('appCues', appCues);

    appCues.$inject = ['DataService', '$interval', '$compile', '$timeout'];

    function appCues(DataService, $interval, $compile, $timeout) {
        var directive = {
            link: link,
            restrict: 'E',
        };
        return directive;

        function link(scope, element, attrs) {
            DataService.getAppCues().then(function (res) {
                if (res.success) {
                    var appCuesUrl = res.data;
                    //appCuesUrl = "//" + appCuesUrl;
                    var scriptEl = document.createElement("script");
                    scriptEl.src = "//" + appCuesUrl;
                    document.body.appendChild(scriptEl);

                    var interval = $interval(function () {
                        if (document.querySelector("script[src='" + appCuesUrl + "']")) {
                            console.log('script  loaded, ' + src);
                            $timeout(function () {  // give some time to execute the script
                                $interval.cancel(interval);
                            }, 100);
                        }
                    }, 100, 10);
                }
            })
        }
    }
})();
