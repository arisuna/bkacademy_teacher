/**=========================================================
 * Filter: capitalize
 =========================================================*/

(function () {
    'use strict';
    angular
        .module('app.input-selector')
        .directive('telephoneViewer', telephoneViewer)

    telephoneViewer.$inject = ['$timeout', 'Utils', 'TELEPHONE_PREFIX'];

    function telephoneViewer($timeout, Utils, TELEPHONE_PREFIX) {
        return {
            restrict: 'E',
            scope: {
                model: '<?ngModel',
            },
            template: `
                <div>
                <div class="user-profile-view" ng-class="{'no-border' : noBorder == true}">
                    <div class="item mg-l-1x ">
                         <country-flag size="16"
                                  class="mr-sm"
                                  country-code="data.telephone_country_iso2"
                                  ng-if="data.telephone_prefix != null && data.telephone_prefix != undefined && data.telephone_prefix != ''"></country-flag>
                         <span
                            ng-if="data.telephone_prefix != null && data.telephone_prefix != undefined && data.telephone_prefix != ''">
                                {{ data.telephone_prefix }}
                            </span>

                         <span class="ml-sm"
                            ng-if="data.telephone_number != null && data.telephone_prefix != telephone_number && data.telephone_number != ''">
                            {{ data.telephone_number }}
                        </span>

                         <em class="fa fa-globe"
                            ng-if="data.telephone_prefix == null || data.telephone_prefix == undefined || data.telephone_prefix == ''"></em>
                    </div>
                </div>
            </div>
            `,
            link: function (scope, element, attrs) {

            },
            controller: function ($scope) {
                $scope.data = {
                    value: null,
                    telephone_number: null,
                    telephone_prefix: null,
                    telephone_country_iso2: null,
                };

                $scope.initFn = function () {
                    if (angular.isString($scope.model)) {
                        let telephoneSplit = _.split($scope.model, "|");
                        $scope.data.value = angular.copy($scope.model);
                        $scope.data.telephone_prefix = telephoneSplit[0];
                        $scope.data.telephone_number = telephoneSplit[1];
                        $scope.data.telephone_country_iso2 = null;

                        if (Utils.isNotEmpty($scope.data.telephone_prefix)) {
                            let telephonePrefixCountry = _.findLast(TELEPHONE_PREFIX, function (o) {
                                return o.dial_code == $scope.data.telephone_prefix;
                            });
                            if (telephonePrefixCountry) {
                                $scope.data.telephone_country_iso2 = telephonePrefixCountry.code;
                            } else {
                                $scope.data.telephone_prefix = null;
                                $scope.data.telephone_number = telephoneSplit[0];
                            }
                        }
                    }
                }

                $timeout(function () {
                    $scope.initFn();
                });

                $scope.$watch('model', function(newValue, oldValue){
                    if(newValue !== oldValue){
                        $scope.initFn();
                    }
                })
            }
        };
    }
})();
