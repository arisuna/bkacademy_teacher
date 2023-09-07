(function () {
    'use strict';

    angular
        .module('app.app-directives')
        .directive('appProductFieldTypesSelector', appProductFieldTypesSelector);

        appProductFieldTypesSelector.$inject = ['$translate', '$timeout', 'urlBase', 'AppDataService', 'Utils', 'ngDialog' , 'AppSystem'];

    function appProductFieldTypesSelector($translate, $timeout, urlBase, AppDataService, Utils,ngDialog, AppSystem ) {
        var directive = {
            restrict: 'EA',
            replace: true,
            scope: {
                model: '=ngModel',
                isRequired: '<?',
                isEditable: '<?',
                showLabel: '<?',
                label: '@',
                requiredMessage: '@',
                toolTipText: '@?'
            },
            templateUrl: urlBase.tplApp('app', '_directives_input', 'product-field-types-selector-item'),
            link: function (scope, element, attrs) {

                scope.realName = "__role__" + _.uniqueId();
                if (scope.toolTipText == '' || scope.toolTipText == undefined) {
                    scope.toolTipText = '';
                }

                if (angular.isUndefined(scope.isEditable) || scope.isEditable == null) {
                    scope.isEditable = true;
                }

                if (angular.isUndefined(scope.isRequired) || scope.isRequired == null) {
                    scope.isRequired = false;
                }

                if (angular.isUndefined(scope.showLabel) || scope.showLabel == null) {
                    scope.showLabel = true;
                }
            },

            controller: function ($scope, $element, $attrs) {

                $scope.items = [];

                $scope.data = {
                    selected: {
                        id: null,
                        label: null
                    }
                };

                $scope.initFn = function () {
                    $scope.items = AppSystem.getProductFieldTypes();
                    $scope.data.selected = _.find($scope.items, function(o){
                        return o.id == $scope.model;
                    });
                };
                $scope.initFn();


                $scope.removeItem = function () {
                    $scope.data.selected = {
                        id: null,
                        label: null
                    }
                    $scope.model = null;
                };


                $scope.setItem = function (item) {
                    $scope.model = angular.copy(item.id);
                    $scope.data.selected = angular.copy(item);
                }


                $scope.openSearchDialog = function ($event) {

                    let dialogPosition = Utils.getPositionDropdownDialog($event, 300, 300);

                    let searchDialog = ngDialog.open({
                        template: urlBase.tplApp('app', '_directives_input', 'product-field-types-selector-search-dialog'),
                        className: 'ngdialog-custom-position no-background ' + dialogPosition['className'],
                        showClose: false,
                        closeByDocument: true,
                        disableAnimation: true,
                        cache: true,
                        width: 300,
                        data: {
                            items: $scope.items,
                            height: 'height-200px'
                        },

                        controller: ['$scope', '$element', '$timeout', 'Utils', function ($scope, $element, $timeout, Utils) {

                            $scope.height = $scope.ngDialogData.height ? $scope.ngDialogData.height : 'height-200px';

                            $scope.items = $scope.ngDialogData.items;

                            Utils.setPositionDropdownDialog(dialogPosition)

                            $scope.selectItem = function (roleItem) {
                                $scope.closeThisDialog(roleItem);
                            }
                        }]
                    });

                    searchDialog.closePromise.then(function (returnData) {
                        if (angular.isDefined(returnData.id) && angular.isDefined(returnData.value.id) && returnData.value.id != '') {
                            $scope.setItem(returnData.value);
                        }
                    })
                };

            }
        };
        return directive;
    }

})();
