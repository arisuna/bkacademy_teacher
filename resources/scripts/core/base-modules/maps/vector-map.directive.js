/**=========================================================
 * Module: vector-map.js.js
 * Init jQuery Vector Map plugin
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('app.maps')
        .directive('vectorMap', vectorMap);

    vectorMap.$inject = ['VectorMap'];
    function vectorMap(VectorMap) {
        var directive = {
            restrict: 'EA',
            scope: {
                seriesData: '=',
                markersData: '=',
                mapOptions: '='
            },
            link: link
        };
        return directive;

        function link(scope, element, attrs) {

            var defaultColors = {
                markerColor: '#23b7e5',      // the marker points
                bgColor: 'transparent',      // the background
                scaleColors: ['#878c9a'],    // the color of the region in the serie
                regionFill: '#bbbec6'       // the base region color
            };

            if (angular.isUndefined(attrs.mapOptions)) {
                scope.mapOptions = {};
            }

            var mapHeight = attrs.height || '300',
                options = {
                    markerColor: scope.mapOptions.markerColor || defaultColors.markerColor,
                    bgColor: scope.mapOptions.bgColor || defaultColors.bgColor,
                    scale: scope.mapOptions.scale || 1,
                    scaleColors: scope.mapOptions.scaleColors || defaultColors.scaleColors,
                    regionFill: scope.mapOptions.regionFill || defaultColors.regionFill,
                    mapName: scope.mapOptions.mapName || 'world_mill_en',
                    labelText: scope.mapOptions.labelText || 'visitors',
                    zoomScroll: angular.isDefined(scope.mapOptions.zoomScroll) ? scope.mapOptions.zoomScroll : false
                };

            element.css('height', mapHeight);

            VectorMap.init(element, options, scope.seriesData, scope.markersData);
        }
    }

})();
