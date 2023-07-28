/**=========================================================
 * Filter: capitalize
 =========================================================*/

(function () {
    'use strict';
    angular
        .module('app.input-selector')
        .directive('zoneLangViewer', zoneLangViewer)

    zoneLangViewer.$inject = ['DataSystem'];

    function zoneLangViewer(DataSystem) {
        return {
            restrict: 'E',
            scope: {
                code: '<?',
            },
            template: '<div>\n' +
            '    <div class="user-profile-view">\n' +
            '        <div class="" ng-show="zone.code">\n' +
            '            <country-flag size="26"\n' +
            '                  size="32" circle="true" class="mr-sm" country-code="zone.code"\n' +
            '                  circle="true">\n' +
            '            </country-flag>' +
            '            <span class="">\n' +
            '               {{zone.name}}' +
            '            </span>\n' +
            '        </div>\n' +
            '\n' +
            '        <div class="not-found" ng-show="!zone.code">\n' +
            '            <icon class="icon-globe text-32 mr-lg text-gray"></icon>\n' +
            '            <span class="c">\n' +
            '            {{\'EMPTY_TEXT\' | translate }}\n' +
            '        </span>\n' +
            '        </div>\n' +
            '    </div>\n' +
            '</div>\n',
            link: function (scope, element, attrs) {

            },
            controller: function ($scope, $element, $attrs) {
                $scope.zone = {};
                (function init() {
                    if ($scope.code) {
                        var zones = DataSystem.getZoneLangList();
                        $scope.zone = _.find(zones, function (o) {
                            return o.code == $scope.code;
                        });
                    }
                })($scope);

                $scope.$watch('code', function () {
                    (function init() {
                        if ($scope.code) {
                            var zones = DataSystem.getZoneLangList();
                            $scope.zone = _.find(zones, function (o) {
                                return o.code == $scope.code;
                            });
                        }
                    })($scope);
                });

            }
        };
    }


})();
