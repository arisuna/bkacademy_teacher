(function () {
    'use strict';

    angular
        .module('app.thumb')
        .directive('logoThumb', logoThumb);

    logoThumb.$inject = ['FileUploader', '$http', 'urlBase', '$translate', '$rootScope', '$timeout', 'DataService', 'WaitingService', 'AppAvatarService'];

    function logoThumb(FileUploader, $http, urlBase, $translate, $rootScope, $timeout, DataService, WaitingService, AppAvatarService) {

        var directive = {
            restrict: 'E',
            replace: true,
            scope: {
                uuid: '=',
                mediaType: '@?',
            },
            template: `
            <div class="user-block-picture" ng-show="logo.image_data.url_thumb">
                <div class="user-block-status text-center">
                    <img class="img-logo img-responsive"
                         ng-src="{{ logo.image_data.url_thumb }}"/>
                </div>
            </div>
            `,

            link: function (scope, element, attrs, timeout) {
                if (angular.isUndefined(scope.mediaType) || scope.mediaType == '' || scope.mediaType == 'undefined') {
                    scope.mediaType = 'avatar';
                }
            },
            controller: function ($scope, $element, $attrs, $timeout) {
                $scope.logo = null;
                $scope.getLogo = function () {
                    AppAvatarService.getAvatarObject($scope.uuid).then(
                        function (response) {
                            if (response.success == true) {
                                $scope.logo = response.data;
                            }
                        });
                }

                $scope.$watch('uuid', function (newValue, oldValue) {
                    if ($scope.uuid) {
                        $scope.getLogo();
                    }
                });
            }
        };

        return directive;
    }

})();
