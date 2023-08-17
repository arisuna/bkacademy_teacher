(function () {
    'use strict';

    angular
        .module('app.app-directives')
        .directive('appLevelSelector', appLevelSelector);

    appLevelSelector.$inject = ['$translate', '$timeout', 'urlBase', 'AppDataService', 'Utils', 'ngDialog' , 'AppSystem'];

    function appLevelSelector($translate, $timeout, urlBase, AppDataService, Utils,ngDialog, AppSystem ) {
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
                toolTipText: '@?',
                ngChange: '&?'
            },
            templateUrl: urlBase.tplApp('app', '_directives_input', 'level-selector-item'),
            link: function (scope, element, attrs) {

                scope.realName = "__role__" + _.uniqueId();
                if (scope.toolTipText == '' || scope.toolTipText == undefined) {
                    scope.toolTipText = '';
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
                    $scope.items = AppSystem.getLevels();
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
                    if (typeof $scope.ngChange == 'function' && angular.isDefined($scope.ngChange)) {
                        $scope.ngChange();
                    }
                };


                $scope.setItem = function (item) {
                    $scope.model = angular.copy(item.id);
                    $scope.data.selected = angular.copy(item);
                    if (typeof $scope.ngChange == 'function' && angular.isDefined($scope.ngChange)) {
                        $scope.ngChange();
                    }
                }


                $scope.openSearchDialog = function ($event) {

                    let dialogPosition = Utils.getPositionDropdownDialog($event, 300, 300);

                    let searchDialog = ngDialog.open({
                        template: urlBase.tplApp('app', '_directives_input', 'level-selector-search-dialog'),
                        className: 'ngdialog-custom-position no-background ' + dialogPosition['className'],
                        showClose: false,
                        closeByDocument: true,
                        disableAnimation: true,
                        cache: true,
                        width: 300,
                        data: {
                            items: $scope.items,
                            height: 'height-120px'
                        },

                        controller: ['$scope', '$element', '$timeout', 'Utils', function ($scope, $element, $timeout, Utils) {

                            $scope.height = $scope.ngDialogData.height ? $scope.ngDialogData.height : 'height-200px';

                            $scope.items = $scope.ngDialogData.items;

                            Utils.setPositionDropdownDialog(dialogPosition)

                            $scope.selectItem = function (item) {
                                $scope.closeThisDialog(item);
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
