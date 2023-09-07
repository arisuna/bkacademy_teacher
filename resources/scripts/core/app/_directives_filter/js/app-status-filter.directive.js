/**
 * [filter selector directive]
 * @return {[type]}
 */
(function () {
    'use strict';

    angular
        .module('app.app-directives')
        .directive('appStatusFilter', appStatusFilter);

    appStatusFilter.$inject = ['urlBase', '$timeout', '$translate', '$rootScope'];

    function appStatusFilter(urlBase, $timeout, $translate) {
        var directive = {
            restrict: 'E',
            replace: true,
            scope: {
                model: '=',
                options: '=',
                hasAvatar: '=?',
                onSearch: '&',
                float: '=?',
                inlineList: '=?',
                dropdownSize: '@?',
                iconClass: '@?'
            },
            templateUrl: urlBase.tplApp('app', '_directives_filter', 'app-status-filter'),
            link: function (scope, element, attrs) {
                if (angular.isUndefined(scope.dropdownSize) || scope.dropdownSize == '') {
                    scope.dropdownSize = 'small';
                }
                if (angular.isUndefined(scope.model)) {
                    scope.model = [];
                }

                if (angular.isUndefined(scope.iconClass)) {
                    scope.iconClass = '';
                }
            },
            controller: function ($scope, $element, $attrs, $rootScope) {
                $scope.promise = null;
                $scope.filter_text = '';

                if (angular.isFunction($scope.onData)) {
                    $scope.options = $scope.onData();
                }
                console.log('$scope.options', $scope.options)

                $scope.filtered_options = $scope.options;

                if (angular.isUndefined($scope.float) || $scope.float == false) {
                    $scope.dropdown_style = {
                        position: 'relative'
                    };
                }

                $scope.update = function (option) {
                    $scope.model = [];
                    angular.forEach($scope.options, function (o) {
                        if (o.selected) {
                            $scope.model.push(o);
                        }
                    });
                };
                var inter_option = [];
                angular.forEach($scope.options, function (item) {
                    item.name = $translate.instant(item.name);
                    inter_option.push(item);
                });
                $scope.options = inter_option;

                $scope.$watch('filter_text', function () {
                    if ($scope.filter_text == '') {
                        $scope.filtered_options = $scope.options;
                    } else {
                        $scope.filtered_options = [];
                        if (angular.isDefined($scope.onSearch)) {
                            // Debounce
                            if ($scope.promise) {
                                $timeout.cancel($scope.promise);
                            }
                            $scope.promise = $timeout(function () {
                                $scope.onSearch({query: $scope.filter_text});
                                $timeout.cancel($scope.promise);
                            }, 500);
                        } else {
                            ///Nothing
                        }
                    }
                });

                $scope.$watch('options', function () {
                    $scope.filtered_options = $scope.options;
                });

                $rootScope.$on('clearFilter', function () {
                    $scope.clearThisFilter();
                });

                $scope.subscribe('clearFilter', function () {
                    $scope.clearThisFilter();
                });

                $scope.clearThisFilter = function () {
                    $scope.options && angular.forEach($scope.options, function (option) {
                        option.selected = false;
                    });
                    $scope.model = [];
                }
            }
        };

        return directive;
    }

})();
