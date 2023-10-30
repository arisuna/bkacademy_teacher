/**
 * Created by anmeo on 10/26/16.
 */

(function () {
    'use strict';

    angular
        .module('app.app-directives-media-zone')
        .directive('appMediaDrag', appMediaDrag);

    appMediaDrag.$inject = ['$http', '$window', '$timeout', '$location', 'urlBase', 'WaitingService', '$rootScope'];

    function appMediaDrag($http, $window, $timeout, $location, urlBase, WaitingService, $rootScope) {
        return {
            restrict: 'A',
            link: function(scope, el, attrs, controller) {
                console.log("linking draggable element");

                angular.element(el).attr("draggable", "true");


                el.bind("dragstart", function(e) {
                    let id = attrs.id;
                    e.originalEvent.dataTransfer.setData('mediaUuid', id);
                    // $rootScope.$emit("LVL-DRAG-START");
                });

                el.bind("dragend", function(e) {
                    // $rootScope.$emit("LVL-DRAG-END");
                    // WaitingService.popSuccess('FILE_MOVE_SUCCESS_TEXT');
                });
            }
        }
    }
})();
