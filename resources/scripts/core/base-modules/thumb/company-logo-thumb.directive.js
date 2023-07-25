/**
 * [avatar upload directive]
 * @return {[type]} [created by thinh@expatfinder.com]
 */
(function () {
    'use strict';

    angular
        .module('app.thumb')
        .directive('companyLogoThumb', companyLogoThumb);

    companyLogoThumb.$inject = ['$http', 'urlBase', 'DataService', 'DataThumbCache', 'AppAvatarService'];

    function companyLogoThumb($http, urlBase, DataService, DataThumbCache, AppAvatarService) {
        var directiveAvatarUpload = {
            restrict: 'E',
            replace: true,
            scope: {
                uuid: '@uuid',
                format: '@?',
                size: '@',
                isFieldIcon: '<?',
            },
            template: `
            <div class="inline">
                <ng-if ng-if="logo.image_data.url_thumb && logo.image_data.url_thumb != undefined && logo.image_data.url_thumb != '' && logo.image_data.url_thumb != 'image_url' ">
                    <img ng-src="{{ logo.image_data.url_thumb }}"
                         class="{{ formatClass }}"
                         err-image-on-load=""
                         x-uuid="{{uuid}}"
                         ng-class="{
                            'thumb16': size == 'xxsmall',
                            'thumb24': size == 'xsmall',
                            'thumb32': size == 'small',
                            'thumb64': size == 'medium',
                            'thumb75': size == 'large',
                            'thumb96': size == 'xlarge',
                            'thumb128': size == 'xxlarge',
                            'thumb256': size == 'xxxlarge',
                         }"/>
                </ng-if>
                <ng-if ng-if="!logo.image_data.url_thumb || logo.image_data.url_thumb == '' || logo.image_data.url_thumb  == undefined">

                     <span class="" ng-show="!isFieldIcon">
                         <i class="icon fa-solid fa-hotel txt-16 text-dark-gray mg-t-3 mg-r-7 mg-l-8"
                            ng-class="{
                                'txt-16': size == 'xxsmall',
                                'txt-24': size == 'xsmall',
                                'txt-32': size == 'small',
                                'txt-32': size == 'small',
                                'txt-64': size == 'medium',
                                'txt-75': size == 'large',
                                'txt-96': size == 'xlarge',
                                'txt-128': size == 'xxlarge',
                                'txt-256': size == 'xxxlarge',
                         }"/></i>
                    </span>


                     <span class="" ng-show="isFieldIcon">
                        <i class="icon fa-solid fa-hotel txt-dark-gray txt-16 mg-t-15"></i>
                    </span>
                </ng-if>
            </div>
            `,
            link: function (scope, element, attrs, timeout) {
                scope.image_url = '';
                scope.sizes = ['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge', 'xxxlarge'];

                if (angular.isUndefined(scope.size) || scope.size == '' || scope.size == undefined || scope.sizes.indexOf(scope.size) < 0) {
                    scope.size = 'xxsmall';
                }

                if (angular.isUndefined(scope.format) || scope.format == '' || scope.format == undefined || scope.format == 'circle') {
                    scope.format = 'circle';
                    scope.formatClass = 'img-circle';
                }
                if (scope.format == 'rectangle') {
                    scope.formatClass = '';
                }

                if(angular.isUndefined(scope.isFieldIcon)  || scope.isFieldIcon == '' ){
                    scope.isFieldIcon = false;
                }
            },
            controller: function ($scope, $element, $attrs, $timeout) {

                $scope.logo = {};

                $scope.loadLogoThumb = function () {

                    // console.log(DataThumbCache.info());

                    if (!angular.isUndefined($scope.uuid) && $scope.uuid != '') {
                        if (DataThumbCache.get($scope.uuid)) {
                            $scope.logo = DataThumbCache.get($scope.uuid);
                        } else {
                            $scope.getLogoUrl();
                        }
                    }
                };

                $scope.getLogoUrl = function(){
                    AppAvatarService.getAvatarObject($scope.uuid).then(function (response) {
                        if (response.success == true) {
                            DataThumbCache.put($scope.uuid, response.data);
                            $scope.logo = response.data;
                        } else {
                            DataThumbCache.put($scope.uuid, '');
                            $scope.logo = {};
                        }
                    });
                };

                $scope.$watch("uuid", function (newValue, oldValue) {
                    if ($scope.uuid != '' && !_.isNull($scope.uuid) && newValue != oldValue) {
                        $scope.getLogoUrl();
                    }
                });
                $scope.loadLogoThumb();

                $scope.subscribe('updateLogoAfterChange', function(uuid){
                    console.log('updateLogoAfterChange', uuid);
                    if (angular.isDefined(uuid) && uuid != '' && $scope.uuid == uuid){
                        if (DataThumbCache.get(uuid)){
                            $scope.logo = DataThumbCache.get(uuid);
                        } else{
                            $scope.getLogoUrl();
                        }
                    }
                    console.log('updateLogoAfterChange');
                });
            }
        };
        return directiveAvatarUpload;
    }

})();
