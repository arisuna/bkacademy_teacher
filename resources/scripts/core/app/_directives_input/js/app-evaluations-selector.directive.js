(function () {
    'use strict';

    angular
        .module('app.app-directives')
        .directive('appEvaluationsSelector', appEvaluationsSelector);

        appEvaluationsSelector.$inject = ['ngDialog', 'Utils', 'urlBase', 'AppCategoryService', 'AppSystem', '$translate'];

    function appEvaluationsSelector(ngDialog, Utils, urlBase, AppCategoryService, AppSystem, $translate) {
        var directive = {
            restrict: 'EA',
            replace: true,
            scope: {
                model: '=ngModel',
                isRequired: '<',
                isEditable: '<?',
                label: '@',
                showLabel: '<',
                isHomeEvaluation: '<',
            },
            templateUrl: urlBase.tplApp('app', '_directives_input', 'evaluations-selector-item'),
            link: function (scope, element, attrs) {

                if (!angular.isUndefined(scope.init)) {
                    if (scope.init != '') {
                        scope.model = scope.init;
                    }
                }

                if (angular.isUndefined(scope.isEditable)) {
                    scope.isEditable = true
                }

                if (angular.isUndefined(scope.isHomeEvaluation)) {
                    scope.isHomeEvaluation = false;
                }
            },
            controller: function ($scope, $element, $attrs) {

                $scope.model = $scope.model || [];

                $scope.items = [];

                $scope.data = {
                    selected: []
                };

                $scope.initFn = function () {
                    $scope.items = AppSystem.getEvaluations().filter(x => $scope.isHomeEvaluation ? (x.type_code == "HOMEWORK") : (x.type_code != "HOMEWORK"));
                    angular.forEach($scope.model, function (id) {
                        let findItem = _.find($scope.items, function (o) {
                            return o.id == id;
                        });
                        if (findItem) {
                            $scope.data.selected.push(findItem);
                        }
                    })
                };

                $scope.removeItems = function () {
                    $scope.model = angular.copy([]);
                }

                $scope.initFn();

                $scope.$watch('model', function(newValue, oldValue){
                    if (newValue != oldValue){
                        $scope.data = {
                            selected: []
                        };
                        angular.forEach($scope.model, function (id) {
                            let findItem = _.find($scope.items, function (o) {
                                return o.id == id;
                            });
                            if (findItem) {
                                $scope.data.selected.push(findItem);
                            }
                        })
                    }

                });

                $scope.removeItem = function (item) {
                    _.remove($scope.data.selected, function (o) {
                        return o.id == item.id;
                    })

                    _.remove($scope.model, function (id) {
                        return id == item.id;
                    })
                }

                $scope.openSearchDialog = function ($event) {
                    console.log($scope.items);

                    let dialogPosition = Utils.getPositionDropdownDialog($event, 300, 300);


                    let searchDialog = ngDialog.open({
                        template: urlBase.tplApp('app', '_directives_input', 'evaluations-selector-search-dialog'),
                        className: 'ngdialog-custom-position no-background ' + dialogPosition['className'],
                        showClose: false,
                        closeByDocument: true,
                        disableAnimation: true,
                        cache: false,
                        width: 300,
                        data: {
                            items: $scope.items
                        },
                        controller: ['$scope', '$element', 'AppSystem', 'Utils', function ($scope, $element, AppSystem, Utils) {

                            $scope.items = $scope.ngDialogData.items;

                            Utils.setPositionDropdownDialog(dialogPosition);

                            $scope.searchConfig = {
                                query: null,
                                currentItem: {
                                    id: null,
                                },
                                filterQuery: ""
                            };

                            $scope.applyFilter = function () {
                                $scope.searchConfig.filterQuery = $scope.searchConfig.query;
                            }

                            $scope.selectItem = function (item) {
                                $scope.closeThisDialog(item);
                            };

                        }]
                    });

                    searchDialog.closePromise.then(function (returnData) {
                        if (angular.isDefined(returnData.value) && angular.isDefined(returnData.value.id)) {
                            $scope.updateValue(returnData.value);
                        }
                    });
                };

                $scope.updateValue = function (item) {
                    if (item) {

                        let findIndex = _.findIndex($scope.data.selected, function (o) {
                            return o.id == item.id;
                        });
                        if (findIndex < 0) {
                            $scope.data.selected.push(item);
                            $scope.model.push(item.id);
                        }
                    }
                }
            }
        };
        return directive;
    }


})();
