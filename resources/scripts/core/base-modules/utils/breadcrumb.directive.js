/**=========================================================
 * Module: breadcrumb.js
 * Provides a simple way to display the current time formatted
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('app.utils')
        .directive('breadcrumbs', breadcrumbs);

    breadcrumbs.$inject = ['$state', '$stateParams', '$rootScope', 'urlBase'];

    function breadcrumbs($state, $stateParams, $rootScope, urlBase) {
        var directive = {
            restrict: 'E',
            templateUrl: urlBase.tplBase('base-modules/utils', 'breadcrumb'),
            replace: true,
            link: function (scope) {

            },
            controller: function ($scope) {

                if (_.isArray($rootScope.breadcrumbs) && $rootScope.breadcrumbs.length > 0) {
                    //do nothing
                } else {
                    $rootScope.breadcrumbs = [];
                }

                activateBreadcrumb();

                $rootScope.$on('$stateChangeStart', function () {
                    $rootScope.breadcrumbs = [];
                });

                $rootScope.$on('$stateChangeSuccess', function () {
                    activateBreadcrumb();
                });

                function activateBreadcrumb() {

                    /*
                    if (angular.isDefined($stateParams.breadcrumbsEnable) && $stateParams.breadcrumbsEnable == false) {
                        $rootScope.breadcrumbs = [];
                        return;
                    }
                    */

                    //enable custom breacrumb
                    if (angular.isDefined($stateParams.breadcrumbsCustomEnable)) {
                        $rootScope.breadcrumbsCustomEnable = $stateParams.breadcrumbsCustomEnable;
                    } else {
                        $rootScope.breadcrumbsCustomEnable = false;
                    }

                    if (angular.isUndefined($rootScope.breadcrumbs) || !angular.isArray($rootScope.breadcrumbs)) {
                        $rootScope.breadcrumbs = [];
                    }


                    if (angular.isDefined($stateParams.breadcrumbsArray) && angular.isArray($stateParams.breadcrumbsArray)) {
                        if ($stateParams.breadcrumbsArray == [] || $stateParams.breadcrumbsArray.length == 0) {
                            //nothing to do here
                        } else {
                            angular.forEach($stateParams.breadcrumbsArray, function (stateName) {
                                $rootScope.breadcrumbs.push({
                                    name: stateName.name,
                                    value: stateName.text,
                                    params: angular.isDefined(stateName.params) ? stateName.params : null,
                                });
                            });

                            angular.forEach($state.$current.path, function (currentState) {
                                if (currentState.abstract != true) {
                                    $rootScope.breadcrumbs.push({
                                        name: currentState.name,
                                        value: currentState.title,
                                        params: angular.isDefined(currentState.params) ? currentState.params : null,
                                    });
                                }
                            });
                        }

                    } else {

                        if ($rootScope.breadcrumbs.length == 0) {
                            angular.forEach($state.$current.path, function (currentState) {
                                if (currentState.abstract != true) {
                                    $rootScope.breadcrumbs.push({
                                        name: currentState.name,
                                        value: currentState.title,
                                        params: angular.isDefined(currentState.params) ? currentState.params : null,
                                    });
                                }
                            });
                        }
                    }
                }

                function getStateInfo(state_name) {
                    angular.forEach($state.get(), function (checkState) {
                        if (checkState.name == state_name) {
                            return checkState;
                        }
                    });
                }

                $scope.backToPreviousState = function () {
                    if ($scope.$root.breadcrumbs.length > 1) {
                        let dist = $scope.$root.breadcrumbs[$scope.$root.breadcrumbs.length - 2];

                        if (dist.reload) {
                            $scope.$root.$state.reload(dist.name, dist.params);
                        } else {
                            $scope.$root.$state.go(dist.name, dist.params);
                        }
                    } else {
                        $scope.$root.$state.go('app.dashboard');
                    }
                };

                $scope.goToState = function (dist) {
                    $scope.$root.$state.go(dist.name, dist.params);
                };
            }
        };
        return directive;
    }


})();
