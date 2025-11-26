(function () {
    'use strict';

    angular
        .module('app.app-directives')
        .directive('appKnowledgePointLevelSelector', appKnowledgePointLevelSelector);

        appKnowledgePointLevelSelector.$inject = ['Utils', 'urlBase', 'ngDialog'];

    function appKnowledgePointLevelSelector(Utils, urlBase, ngDialog) {
        var directive = {
            restrict: 'E',
            replace: true,
            scope: {
                knowledgePointLevel: '=ngModel',
                isRequired: '<?',
                label: '@?',
                requiredMessage: '@?',
                isEditable: '<?',
                showLabel: '<?',
                ngChange: '&?'
            },

            templateUrl: urlBase.tplApp('app', '_directives_input', 'app-knowledge-point-level-selector-item'),

            link: function (scope, element, attrs) {

                if (angular.isUndefined(scope.label) || scope.label == '') {
                    scope.label = 'LEVEL_TEXT';
                }

                if (angular.isUndefined(scope.isEditable) || scope.isEditable == null) {
                    scope.isEditable = true;
                }

                if (angular.isUndefined(scope.showLabel) || scope.showLabel == null) {
                    scope.showLabel = true;
                }

                if (angular.isUndefined(scope.requiredMessage) || scope.requiredMessage == '') {
                    scope.requiredMessage = 'FIELD_IS_REQUIRED_TEXT';
                }
                if (angular.isUndefined(scope.knowledgePointLevel)) {
                    scope.knowledgePointLevel = null;
                }

                scope.realName = "knowledge_point_level_selector_" + _.uniqueId();
            },

            controller: function ($scope, $element, $attrs) {
                $scope.items = [
                    {value : 1, label: 'BASIC_TEXT'},
                    {value : 2, label: 'ADVANCE_TEXT'}
                ];
                $scope.data = {
                    selected: {
                        id: null,
                        uuid: null
                    }
                };

                $scope.initFn = function(){

                    if($scope.knowledgePointLevel > 0){
                        $scope.data.selected = _.find($scope.items, function(o){
                            return o.value == $scope.knowledgePointLevel;
                        });

                    }
                    console.log($scope.knowledgePointLevel);
                    console.log($scope.data.selected);
                    console.log($scope.items);
                }

                $scope.resetItem = function () {
                    $scope.knowledgePointLevel = null;
                    if (typeof $scope.ngChange == 'function' && angular.isDefined($scope.ngChange)) {
                        $scope.ngChange();
                    }
                }

                $scope.selectItem = function (selectedItem) {
                    $scope.knowledgePointLevel = angular.copy(selectedItem.value);
                    $scope.data.selected = angular.copy(selectedItem);
                    if (typeof $scope.ngChange == 'function' && angular.isDefined($scope.ngChange)) {
                        $scope.ngChange();
                    }
                };

                $scope.$watch('knowledgePointLevel', function () {
                    $scope.initFn();
                });
                $scope.initFn();
                


                $scope.openSearchDialog = function ($event) {

                    let dialogPosition = Utils.getPositionDropdownDialog($event, 300, 300);

                    console.log("open");

                    let searchDialog = ngDialog.open({
                        template: urlBase.tplApp('app', '_directives_input', 'app-knowledge-point-level-selector-search-dialog'),
                        className: 'ngdialog-custom-position no-background ' + dialogPosition['className'],
                        showClose: false,
                        closeByDocument: true,
                        disableAnimation: true,
                        cache: true,
                        width: 300,
                        data: dialogPosition,
                        controller: ['$scope', '$element', '$timeout', 'Utils', function ($scope, $element, $timeout, Utils) {

                            $scope.items = [
                                {value : 1, label: 'BASIC_TEXT'},
                                {value : 2, label: 'ADVANCE_TEXT'}
                            ];

                            $scope.totalItems = 7;
                            $scope.totalPages = 1;
                            $scope.currentPage = 1;
                            $scope.totalRestItems = 0;

                            $scope.isLoading = false;

                            Utils.setPositionDropdownDialog(dialogPosition);

                            $scope.applyFilter = function () {
                                $scope.searchConfig.filterQuery = $scope.searchConfig.query;
                            }

                            $scope.selectItem = function (item) {
                                $scope.closeThisDialog(item);
                            }

                        }]
                    });

                    searchDialog.closePromise.then(function (returnData) {
                        if (angular.isDefined(returnData.value) && returnData.value.value > 0) {
                            $scope.selectItem(returnData.value);
                        }
                    })
                };
            }
        };

        return directive;
    }

})();
