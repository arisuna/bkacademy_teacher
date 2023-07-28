(function () {
    'use strict';

    angular
        .module('app.app-directives')
        .directive('appRolesSelector', appRolesSelector);

    appRolesSelector.$inject = ['$translate', '$timeout', 'urlBase', 'AppDataService', 'Utils', 'ngDialog' , 'AppSystem'];

    function appRolesSelector($translate, $timeout, urlBase, AppDataService, Utils,ngDialog, AppSystem ) {
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
            templateUrl: urlBase.tplApp('app', '_directives_input', 'roles-selector-item'),
            link: function (scope, element, attrs) {

                scope.realName = "__role__" + _.uniqueId();
                if (scope.toolTipText == '' || scope.toolTipText == undefined) {
                    scope.toolTipText = '';
                }
            },

            controller: function ($scope, $element, $attrs) {

                $scope.roles = [];

                $scope.data = {
                    selected: {
                        id: null,
                        label: null
                    }
                };

                $scope.initFn = function () {
                    $scope.roles = AppSystem.getSettingUserGroups();
                    $scope.data.selected = _.find($scope.roles, function(o){
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



                $timeout(function () {
                    if ($scope.assignToMe == true) {
                        $scope.assignToMeAsWorker();
                    }
                })


                $scope.setRole = function (roleItem) {
                    $scope.model = angular.copy(roleItem.id);
                    $scope.data.selected = angular.copy(roleItem);
                }


                $scope.openSearchDialog = function ($event) {

                    let dialogPosition = Utils.getPositionDropdownDialog($event, 300, 300);

                    let searchDialog = ngDialog.open({
                        template: urlBase.tplApp('app', '_directives_input', 'roles-selector-search-dialog'),
                        className: 'ngdialog-custom-position no-background ' + dialogPosition['className'],
                        showClose: false,
                        closeByDocument: true,
                        disableAnimation: true,
                        cache: true,
                        width: 300,
                        data: {
                            roles: $scope.roles,
                        },

                        controller: ['$scope', '$element', '$timeout', 'GmsWorkersService', 'Utils', function ($scope, $element, $timeout, GmsMemberService, Utils) {

                            $scope.roles = $scope.ngDialogData.roles;

                            Utils.setPositionDropdownDialog(dialogPosition)

                            $scope.selectItem = function (roleItem) {
                                $scope.closeThisDialog(roleItem);
                            }
                        }]
                    });

                    searchDialog.closePromise.then(function (returnData) {
                        if (angular.isDefined(returnData.id) && angular.isDefined(returnData.value.id) && returnData.value.id != '') {
                            $scope.setRole(returnData.value);
                        }
                    })
                };

            }
        };
        return directive;
    }

})();
