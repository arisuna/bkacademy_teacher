/**
 * [avatar upload directive]
 * @return {[type]} [created by thinh@expatfinder.com]
 */
(function () {
    'use strict';

    angular
        .module('app.thumb')
        .directive('entityPhotoThumb', entityPhotoThumb);

    entityPhotoThumb.$inject = ['$http', 'urlBase', 'DataService'];

    function entityPhotoThumb($http, urlBase, DataService) {

        var directive = {
            restrict: 'E',
            replace: true,
            scope: {
                uuid: '@uuid',
                format: '@?',
                size: '@',
            },
            templateUrl: urlBase.tplBase('base-modules/thumb', 'photo'),
            link: function (scope, element, attrs, timeout) {
                scope.image_url = '';
                if (angular.isUndefined(scope.size) || scope.size == '' || scope.size == undefined) {
                    scope.size = 'medium';
                }

                if (angular.isUndefined(scope.format) || scope.format == '' || scope.format == undefined || scope.format == 'circle') {
                    scope.format = 'circle';
                    scope.formatClass = 'img-circle';
                }
                if (scope.format == 'rectangle') {
                    scope.formatClass = '';
                }
            },
            controller: function ($scope, $element, $attrs, $timeout) {
                $scope.loadAvatarThumb = function () {
                    if (!angular.isUndefined($scope.uuid) && $scope.uuid != '') {
                        if ($scope.uuid != "") {
                            $scope.image_url = DataService.getEntiyPublicPhotoUrl($scope.uuid);
                        }
                    }
                }
                $scope.$watch("uuid", function () {
                    if ($scope.uuid != "") {
                        $scope.image_url = DataService.getEntiyPublicPhotoUrl($scope.uuid);
                    }
                });
                $scope.loadAvatarThumb();
            }
        };
        return directive;
    }

})();
