(function () {
    'use strict';

    angular
        .module('app.app-directives')
        .directive('appSpokenLanguagesSelector', appSpokenLanguagesSelector);

    appSpokenLanguagesSelector.$inject = ['ngDialog', 'Utils', 'urlBase', 'DataService', '$translate'];

    function appSpokenLanguagesSelector(ngDialog, Utils, urlBase, DataService, $translate) {
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
            templateUrl: urlBase.tplApp('app', '_directives_input', 'spoken-languages-selector-item'),
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
                    languages_selected: []
                };

                $scope.initFn = function () {
                    DataService.getSpokenLanguages($translate.use()).then(function (res) {
                        if (res.success) {
                            $scope.languages = res.data;
                            angular.forEach($scope.model, function (code) {
                                let findItem = _.find($scope.languages, function (o) {
                                    return o.code == code;
                                });
                                if (findItem) {
                                    $scope.data.languages_selected.push(findItem);
                                }
                            })
                        }
                    });
                };

                $scope.removeItems = function () {
                    $scope.model = angular.copy([]);
                    $scope.data.languages_selected = [];
                }

                $scope.initFn();

                $scope.$watch('model', function(newValue, oldValue){
                    if (newValue != oldValue){
                        $scope.data = {
                            languages_selected: []
                        };
                        angular.forEach($scope.model, function (code) {
                            let findItem = _.find($scope.languages, function (o) {
                                return o.code == code;
                            });
                            if (findItem) {
                                $scope.data.languages_selected.push(findItem);
                            }
                        })
                    }

                });

                $scope.removeLanguage = function (language) {
                    _.remove($scope.data.languages_selected, function (o) {
                        return o.code == language.code;
                    })

                    _.remove($scope.model, function (code) {
                        return code == language.code;
                    })
                }

                $scope.openSearchDialog = function ($event) {

                    let dialogPosition = Utils.getPositionDropdownDialog($event, 300, 300);


                    let searchDialog = ngDialog.open({
                        template: urlBase.tplApp('app', '_directives_input', 'spoken-languages-selector-search-dialog'),
                        className: 'ngdialog-custom-position no-background ' + dialogPosition['className'],
                        showClose: false,
                        closeByDocument: true,
                        disableAnimation: true,
                        cache: false,
                        width: 300,
                        data: {
                            languages: $scope.languages
                        },
                        controller: ['$scope', '$element', 'AppSystem', 'Utils', function ($scope, $element, AppSystem, Utils) {

                            $scope.languages = $scope.ngDialogData.languages;

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

                            $scope.selectItem = function (language) {
                                $scope.closeThisDialog(language);
                            };

                        }]
                    });

                    searchDialog.closePromise.then(function (returnData) {
                        if (angular.isDefined(returnData.value) && angular.isDefined(returnData.value.code)) {
                            $scope.updateValue(returnData.value);
                        }
                    });
                };

                $scope.updateValue = function (language_selected) {
                    if (language_selected) {

                        let findIndex = _.findIndex($scope.data.languages_selected, function (o) {
                            return o.code == language_selected.code;
                        });

                        if (findIndex < 0) {
                            $scope.data.languages_selected.push(language_selected);
                        }

                        $scope.model = angular.copy(_.map($scope.data.languages_selected, 'code'));
                    }
                }
            }
        };
        return directive;
    }


})();
