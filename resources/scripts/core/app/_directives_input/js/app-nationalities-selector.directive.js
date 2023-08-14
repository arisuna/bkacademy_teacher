(function () {
    'use strict';

    angular
        .module('app.app-directives')
        .directive('appNationalitiesSelector', appNationalitiesSelector);

    appNationalitiesSelector.$inject = ['ngDialog', 'Utils', 'urlBase', 'DataService', '$translate'];

    function appNationalitiesSelector(ngDialog, Utils, urlBase, DataService, $translate) {
        var directive = {
            restrict: 'EA',
            replace: true,
            scope: {
                model: '=ngModel',
                isRequired: '<',
                isEditable: '<?',
                label: '@',
                step: '@',
                showLabel: '<',
                init: '<'
            },
            templateUrl: urlBase.tplApp('app', '_directives_input', 'nationalities-selector-item'),
            link: function (scope, element, attrs) {

                if (!angular.isUndefined(scope.init)) {
                    if (scope.init != '') {
                        scope.model = scope.init;
                    }
                }

                if (angular.isUndefined(scope.isEditable)) {
                    scope.isEditable = true
                }
            },
            controller: function ($scope, $element, $attrs) {

                $scope.model = $scope.model || [];

                $scope.data = {
                    nationalities_selected: []
                };

                $scope.initFn = function () {
                    DataService.getNationalities($translate.use()).then(function (res) {
                        if (res.success) {
                            $scope.nationalities = res.data;
                            angular.forEach($scope.model, function (code) {
                                let findItem = _.find($scope.nationalities, function (o) {
                                    return o.code == code;
                                });
                                if (findItem) {
                                    $scope.data.nationalities_selected.push(findItem);
                                }
                            })
                        }
                    });
                };

                $scope.removeItems = function () {
                    $scope.model = angular.copy([]);
                    $scope.data.nationalities_selected = [];
                }

                $scope.initFn();

                $scope.$watch('model', function(newValue, oldValue){
                    if (newValue != oldValue){
                        $scope.data = {
                            nationalities_selected: []
                        };
                        angular.forEach($scope.model, function (code) {
                            let findItem = _.find($scope.nationalities, function (o) {
                                return o.code == code;
                            });
                            if (findItem) {
                                $scope.data.nationalities_selected.push(findItem);
                            }
                        })
                    }

                });

                $scope.removeNationality = function (nationality) {
                    _.remove($scope.data.nationalities_selected, function (o) {
                        return o.code == nationality.code;
                    })

                    _.remove($scope.model, function (code) {
                        return code == nationality.code;
                    })
                }

                $scope.openSearchDialog = function ($event) {

                    let dialogPosition = Utils.getPositionDropdownDialog($event, 300, 300);


                    let searchDialog = ngDialog.open({
                        template: urlBase.tplApp('app', '_directives_input', 'nationalities-selector-search-dialog'),
                        className: 'ngdialog-custom-position no-background ' + dialogPosition['className'],
                        showClose: false,
                        closeByDocument: true,
                        disableAnimation: true,
                        cache: false,
                        width: 300,
                        data: {
                            nationalities: $scope.nationalities
                        },
                        controller: ['$scope', '$element', 'AppSystem', 'Utils', function ($scope, $element, AppSystem, Utils) {

                            $scope.nationalities = $scope.ngDialogData.nationalities;

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

                            $scope.selectItem = function (nationality) {
                                $scope.closeThisDialog(nationality);
                            };

                        }]
                    });

                    searchDialog.closePromise.then(function (returnData) {
                        if (angular.isDefined(returnData.value) && angular.isDefined(returnData.value.code)) {
                            $scope.updateValue(returnData.value);
                        }
                    });
                };

                $scope.updateValue = function (nationality_selected) {
                    if (nationality_selected) {

                        let findIndex = _.findIndex($scope.data.nationalities_selected, function (o) {
                            return o.code == nationality_selected.code;
                        });

                        if (findIndex < 0) {
                            $scope.data.nationalities_selected.push(nationality_selected);
                        }

                        $scope.model = angular.copy(_.map($scope.data.nationalities_selected, 'code'));
                    }
                }
            }
        };
        return directive;
    }


})();
