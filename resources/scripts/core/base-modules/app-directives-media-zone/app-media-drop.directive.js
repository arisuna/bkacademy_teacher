/**
 * Created by anmeo on 10/26/16.
 */

(function () {
    'use strict';

    angular
        .module('app.app-directives-media-zone')
        .directive('appMediaDrop', appMediaDrop);

    appMediaDrop.$inject = ['$http', '$window', '$timeout', '$location', 'urlBase', 'WaitingService', '$rootScope'];

    function appMediaDrop($http, $window, $timeout, $location, urlBase, WaitingService, $rootScope) {
        return {
            restrict: 'A',
            scope: {
                onDrop: '&'
            },
            link: function(scope, el, attrs, controller) {
                // var id = angular.element(el).attr("id");
                let id = attrs.id;
                el.bind("dragover", function(e) {
                    if (e.preventDefault) {
                        e.preventDefault(); // Necessary. Allows us to drop.
                    }

                    e.originalEvent.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
                    return false;
                });

                el.bind("dragenter", function(e) {
                    angular.element(e.target).addClass('folder-hover');
                });

                el.bind("dragleave", function(e) {
                    angular.element(e.target).removeClass('folder-hover');
                });

                el.bind("drop", function(e) {
                    if (e.preventDefault) {
                        e.preventDefault(); // Necessary. Allows us to drop.
                    }

                    if (e.stopPropogation) {
                        e.stopPropogation(); // Necessary. Allows us to drop.
                    }
                    let mediaUuid = e.originalEvent.dataTransfer.getData("mediaUuid");
                    angular.element(e.target).removeClass('folder-hover');

                    scope.onDrop({mediaUuid: mediaUuid, folderUuid: id});
                });

                // $rootScope.$on("LVL-DRAG-START", function() {
                //     var el = document.getElementById(id);
                //     console.log('LVL-DRAG-START');
                // });
                //
                // $rootScope.$on("LVL-DRAG-END", function() {
                //     var el = document.getElementById(id);
                //     console.log('LVL-DRAG-END');
                // });
            }
        }
    }
})();
