/**
 * [avatar upload directive]
 * @return {[type]} [created by thinh@expatfinder.com]
 */
(function () {
    'use strict';

    angular
        .module('app.thumb')
        .directive('userAvatarThumb', userAvatarThumb);

    userAvatarThumb.$inject = ['$http', '$localStorage', '$timeout', 'urlBase', 'DataService', '$cacheFactory', 'DataHttp', '$base64', 'Utils', 'DataThumbCache', 'GmsAvatarService'];

    function userAvatarThumb($http, $localStorage, $timeout, urlBase, DataService, $cacheFactory, DataHttp, $base64, Utils, DataThumbCache, GmsAvatarService) {
        var directiveAvatarUpload = {
            restrict: 'E',
            replace: true,
            scope: {
                uuid: '@uuid',
                size: '@',
                type: '@?',
                isShowIcon: '<?'
            },
            templateUrl: urlBase.tplBase('base-modules/thumb', 'avatar-url'),
            link: function (scope, element, attrs, timeout) {
                scope.imageUrl = "";
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

                if (angular.isUndefined(scope.isShowIcon)) {
                    scope.isShowIcon = true;
                }
            },
            controller: function ($scope, $element, $attrs, $timeout) {

                $scope.getUrlImage = function () {
                    if ($scope.uuid != "" && !angular.isUndefined($scope.uuid)) {
                        if (angular.isDefined(DataThumbCache.get($scope.uuid)) && DataThumbCache.get($scope.uuid)) {
                            $scope.imageUrl = DataThumbCache.get($scope.uuid);
                        }else{
                            $scope.getAvatarUrl();
                        }
                    }
                };

                $scope.getAvatarUrl = function () {
                    if ($scope.type == '' || $scope.type == undefined || $scope.type == null) {
                        $scope.imageUrl = GmsAvatarService.getAvatarObjectDirect($scope.uuid);
                    }
                    if ($scope.type == 'contact') {
                        $scope.imageUrl = GmsAvatarService.getContactAvatarObjectDirect($scope.uuid);
                    }
                    DataThumbCache.put($scope.uuid, $scope.imageUrl);
                };


                $timeout(function () {
                    $scope.getUrlImage();
                }, 500)


                $scope.$watch("uuid", function (newValue, oldValue) {
                    if ($scope.uuid != '' && !_.isNull($scope.uuid) && newValue != oldValue) {
                        $scope.getAvatarUrl();
                    }
                });

                $scope.subscribe('updateAvatarAfterChange', function(uuid){
                    if (angular.isDefined(uuid) && uuid != '' && $scope.uuid == uuid){
                        if (DataThumbCache.get(uuid)){
                            $scope.imageUrl = DataThumbCache.get(uuid);
                        } else{
                            $scope.getAvatarUrl();
                        }
                    }
                    console.log('updateAvatarAfterChange');
                });


            }
        };
        return directiveAvatarUpload;
    }
})();
