(function () {
    'use strict';

    angular
        .module('app.input-selector')
        .directive('inputTextSearch', inputTextSearch);

    inputTextSearch.$inject = ['$translate', '$http', 'urlBase', 'DataService'];

    function inputTextSearch($translate, $http, urlBase, DataService) {
        var directive = {
            restrict: 'E',
            replace: true,
            scope: {
                model: '=ngModel',
                ngSearch: '&ngSearch',
                noMarginBottom: '<?',
                isOval: '<?',
            },

            template:`
            <div class="form-group" ng-class="{'mg-b-0': noMarginBottom == true}">
                <div class="input-group search">
                    <input type="text"
                           class="form-control form-control-custom-radius"
                           placeholder="{{ 'ENTER_TO_SEARCH_TEXT' | translate }}"
                           ng-enter-key="executeSearch()"
                           ng-style="isOval == true && {'border-top-left-radius':'15px', 'border-bottom-left-radius':'15px'} || {'border-radius':'3px'}"
                           ng-model="model" aria-invalid="false">
                    <span class="input-group-btn">
                        <button class="btn btn-default btn-flat" type="button"
                                ng-style="isOval == true && {'border-top-right-radius':'15px', 'border-bottom-right-radius':'15px'}"
                                ng-click="executeSearch()">
                            <em class="fa fa-search text-bright-blue"></em>
                        </button>
                     </span>
                </div>
            </div>
            `,
            controller: function ($scope, $element, $attrs) {
                $scope.executeSearch = function () {
                    if (angular.isFunction($scope.ngSearch)) {
                        $scope.ngSearch();
                    }
                }
            }
        };
        return directive;
    }

})();
