(function () {
    'use strict';

    angular
        .module('app.document-viewer')
        .directive('documentViewMedia', documentViewMedia);

    documentViewMedia.$inject = ['ngDialog', 'urlBase', '$location', '$window', '$timeout', '$sce'];

    function documentViewMedia(ngDialog, urlBase, $location, $window, $timeout, $sce) {
        return {
            restrict: 'EA',
            scope: {
                items: '=?items',
                element: '=element'
            },
            link: function (scope, element, attrs) {

                element.click(function () {
                    ngDialog.open({
                        template: urlBase.tplBase('base-modules/document-viewer', 'document-media-view'),
                        showClose: false,
                        scope: scope,
                        className: 'ngdialog-theme-default media-view',
                        controller: ['$scope', '$location', '$window', '$timeout', '$sce', 'GmsMediaService',
                            function ($scope, $location, $window, $timeout, $sce, GmsMediaService) {

                                $scope.index = 0;
                                $scope.zoom = 100;
                                $scope.loading_view = true;

                                if (angular.isUndefined($scope.items) || $scope.items.length == 0) {
                                    $scope.items = [$scope.element];
                                }


                                for (var o in $scope.items) {
                                    if (angular.isDefined($scope.element) && $scope.element.uuid == $scope.items[o].uuid) {
                                        $scope.index = o;
                                    }
                                }

                                $scope.$watch("index", function () {
                                    $scope.loading_view = true;
                                    $scope.pdfUrl = ($scope.items[$scope.index].image_data.url_download);
                                    $timeout(function () {
                                        $scope.loading_view = false;
                                    }, 1500);
                                });

                                $scope.gotoPage = function (url) {
                                    $window.location.href = url;
                                }

                                $scope.previousItem = function () {
                                    $scope.zoom = 100;
                                    if ($scope.index == 0) {
                                        $scope.index = $scope.items.length - 1;
                                    }
                                    else {
                                        $scope.index = parseInt($scope.index) - 1;
                                    }
                                    console.log($scope.index);
                                };
                                $scope.nextItem = function () {
                                    $scope.zoom = 100;
                                    if ($scope.index == $scope.items.length - 1) {
                                        $scope.index = 0;
                                    }
                                    else {
                                        $scope.index = parseInt($scope.index) + 1;
                                    }
                                    console.log($scope.index);
                                };
                                $scope.zoomIn = function () {
                                    if ($scope.zoom < 200) {
                                        $scope.zoom += 10;
                                    }
                                };

                                $scope.zoomOut = function () {
                                    if ($scope.zoom > 30) {
                                        $scope.zoom -= 10;
                                    }
                                };

                                $scope.zoomOrigin = function () {
                                    $scope.zoom = 100;
                                };

                                $scope.getFileType = function(extension){
                                    return GmsMediaService.getFileTypeFromExtension(extension);
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
