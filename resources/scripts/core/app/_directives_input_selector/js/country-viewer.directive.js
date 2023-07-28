/**=========================================================
 * Filter: capitalize
 =========================================================*/

(function () {
    'use strict';
    angular
        .module('app.input-selector')
        .directive('countryViewer', countryViewer)

    countryViewer.$inject = ['DataSystem'];

    function countryViewer(DataSystem) {
        return {
            restrict: 'E',
            scope: {
                countryId: '<?',
                countryIsoCode: '<',
                label: '@?',
                showLabel: '<?',
                circle: '<?'
            },
            template: `
                <div class="">
                    <label class="label-text-form" ng-if="showLabel">{{ label | translate }}</label>
                    <div class="user-profile-view border-0">
                        <div class="" ng-show="country.id">
                            <country-flag   size="32"
                                            circle="circle"
                                            class="mr-sm"
                                            country-code="country.cio">
                            </country-flag>
                            <span class="">
                               {{country.name}}
                            </span>
                        </div>

                        <div class="item" ng-show="!country.id">
                            <span class="icon mr-sm"><em class="fa fa-globe text-32"></em></span>
                            <span class="c">
                                {{'EMPTY_TEXT' | translate }}
                            </span>
                        </div>
                    </div>
                </div>
            `,
            link: function (scope, element, attrs) {
                if (angular.isUndefined(scope.showLabel)) scope.showLabel = false;
                if (angular.isUndefined(scope.circle)) scope.circle = true;
            },
            controller: function ($scope, $element, $attrs) {
                $scope.country = {};
                let loadCountry = function () {
                    if ($scope.countryId > 0) {
                        let countries = DataSystem.getCountries();
                        let keyToCheck = _.find(countries, function (o) {
                            return angular.isDefined(o) && (o.id == $scope.countryId);
                        });
                        $scope.country = keyToCheck;
                    }
                    if ($scope.countryIsoCode) {
                        let countries = DataSystem.getCountries();
                        if (angular.isDefined(countries)) {
                            let keyToCheck = _.find(countries, function (o) {
                                return angular.isDefined(o) && (o.cio == $scope.countryIsoCode || o.iso3 == $scope.countryIsoCode);
                            });
                            $scope.country = keyToCheck;
                        }
                    }
                };
                (function init() {
                    loadCountry();
                })($scope);

                $scope.$watch('countryId', function () {
                    if ($scope.countryId > 0) {
                        loadCountry();
                    }
                });

                $scope.$watch('countryIsoCode', function () {
                    if ($scope.countryIsoCode != '') {
                        loadCountry();
                    }
                });

            }
        };
    }


})();
