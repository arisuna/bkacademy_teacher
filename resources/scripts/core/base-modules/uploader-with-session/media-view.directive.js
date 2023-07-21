/**
 * Created by anmeo on 1/18/17.
 */

(function () {
    'use strict';

    angular
        .module('app.media-library-session')
        .directive('mediaViewSession', mediaView);

    mediaView.$inject = ['ngDialog', 'urlBase','$location','$window','$timeout'];

    function mediaView(ngDialog, urlBase) {
        return {
            restrict: 'EA',
            scope: {
                items: '=items',
                element:'=element'
            },
            link: function (scope, element, attrs){

                element.click(function(){
                    ngDialog.open({
                        template: urlBase.tplBase('base-modules/uploader-with-session', 'media-view'),
                        showClose: false,
                        scope: scope,
                        className: 'ngdialog-theme-default media-view',
                        controller: ['$scope','$location','$window','$timeout', function($scope, $location, $window, $timeout){

                            $scope.index = 0;
                            $scope.zoom = 100;
                            $scope.loading_view = true;

                            for (var o in $scope.items) {
                                if( angular.isDefined( $scope.element ) && $scope.element.uuid == $scope.items[o].uuid ) {
                                    $scope.index = o;
                                }
                            }
                            //console.log( $scope.index );
                            $scope.pdfUrl = $scope.items[o].image_data.url_full;
                            console.log( $scope.pdfUrl );

                            $scope.$watch("index",function(){
                                $scope.loading_view = true;
                                $timeout(function(){ $scope.loading_view = false;}, 1500 );
                            });

                            $scope.gotoPage = function( url ){
                                url = $location.protocol() + "://" + $location.host() + url;
                                console.log( url );
                                $window.location.href = url;
                            }

                            $scope.previousItem = function() {
                                $scope.zoom = 100;
                                if ($scope.index == 0) {
                                    $scope.index = $scope.items.length - 1;
                                }
                                else {
                                    $scope.index = parseInt($scope.index) - 1 ;
                                }
                                console.log( $scope.index );
                            };
                            $scope.nextItem = function() {
                                $scope.zoom = 100;
                                if ($scope.index == $scope.items.length - 1) {
                                    $scope.index = 0;
                                }
                                else {
                                    $scope.index = parseInt($scope.index) + 1;
                                }
                                console.log( $scope.index );
                            };
                            $scope.zoomIn = function () {
                                if ($scope.zoom < 200){
                                    $scope.zoom += 10;
                                }
                            };

                            $scope.zoomOut = function() {
                                if ($scope.zoom > 30 ) {
                                    $scope.zoom -= 10;
                                }
                            };

                            $scope.zoomOrigin = function() {
                                $scope.zoom = 100;
                            };
                        }]
                    });
                });
            },
            controller: function ($scope, $element, $attrs, ngDialog, $filter) {

            }
        }
    }
})();