/**
 * [avatar upload directive]
 * @return {[type]} [created by thinh@expatfinder.com]
 */
(function () {
    'use strict';

    angular
        .module('app.thumb')
        .directive('employeeAvatarThumb', employeeAvatarThumb);

    employeeAvatarThumb.$inject = ['$http', 'urlBase', 'DataService', 'AppAvatarService'];

    function employeeAvatarThumb($http, urlBase, DataService, AppAvatarService) {
        var directiveAvatarUpload = {
            restrict: 'E',
            replace: true,
            scope: {
                uuid: '@uuid',
                size: '@', //xxsmall //xsmall , small, medium, large, xlarge
                isInline: '<?',
            },
            templateUrl: urlBase.tplBase('base-modules/thumb', 'index'),
            link: function (scope, element, attrs, timeout) {
                scope.image_url = '';
                if (angular.isUndefined(scope.size) || scope.size == '' || scope.size == undefined) {
                    scope.size = 'small';
                }
                if (angular.isUndefined(scope.format) || scope.format == '' || scope.format == undefined || scope.format == 'circle') {
                    scope.format = 'circle';
                    scope.formatClass = 'img-circle';
                }
                if (scope.format == 'rectangle') {
                    scope.formatClass = '';
                }

                if (angular.isUndefined(scope.isInline)) {
                    scope.isInline = true;
                }
            },
            controller: function ($scope, $element, $attrs, $timeout) {
                $scope.loadAvatarThumb = function () {
                    if (!angular.isUndefined($scope.uuid) && $scope.uuid != '') {
                        if ($scope.uuid != "") {
                            $scope.image_url = AppAvatarService.getAvatarObjectDirect($scope.uuid);
                        }
                    }
                }
                $scope.subscribe('load_avatar_thumb', function (url) {
                    $scope.image_url = AppAvatarService.getAvatarObjectDirect($scope.uuid);
                    if (url) {
                        $scope.image_url = url;
                    }
                });
                $scope.$watch("uuid", function () {
                    if ($scope.uuid != "") {
                        $scope.image_url = AppAvatarService.getAvatarObjectDirect($scope.uuid);
                    }
                });
                $scope.loadAvatarThumb();
            }
        };
        return directiveAvatarUpload;
    }

})();
