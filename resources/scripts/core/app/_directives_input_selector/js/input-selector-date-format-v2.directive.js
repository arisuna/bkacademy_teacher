(function () {
    'use strict';

    angular
        .module('app.input-selector')
        .directive('inputSelectorDateFormatV2', inputSelectorDateFormatV2);

    inputSelectorDateFormatV2.$inject = ['$translate','$http','urlBase', '$timeout', 'ngDialog', 'Utils'];

    function inputSelectorDateFormatV2($translate, $http, urlBase, $timeout, ngDialog, Utils) {
        var directive = {
            restrict: 'E',
            replace: true,
            scope: {
                model: '=ngModel',
                isRequired: '<',
                label: '@',
                showLabel: '<?',
                isEditable: '<?',
                requiredMessage: '@',
                ngChange: '&?'
            },
            templateUrl: urlBase.tplApp('app', '_directives_input_selector', 'date-format-selector-v2'),
            link: function (scope, element, attrs ) {
                scope.realName = scope.name + "_" + parseInt(Math.random()*100).toString();
                if( angular.isUndefined( scope.label) || scope.label == ''){
                    scope.label = 'DATE_FORMAT_TEXT';
                }

                if( angular.isUndefined( scope.requiredMessage) || scope.requiredMessage == ''){
                    scope.requiredMessage = 'DATE_FORMAT_REQUIRED_TEXT';
                }

                if( angular.isUndefined( scope.isEditable)){
                    scope.isEditable = true;
                }

                if( angular.isUndefined( scope.showLabel ) || scope.showLabel == true ){
                    scope.showLabel = true;
                }else{
                    scope.showLabel = false;
                }
            },

            controller: function ($scope, $element, $attrs) {
                $scope.dateFormat = [
                    {
                        code:'DD/MM/YYYY',
                        name:'DD/MM/YYYY',
                        index: 0
                    },
                    {
                        code:'MM/DD/YYYY',
                        name:'MM/DD/YYYY',
                        index: 1
                    },
                    {
                        code:'YYYY/MM/DD',
                        name:'YYYY/MM/DD',
                        index: 2
                    }
                ];

                $scope.data = {
                    selected: {
                        code: null,
                        name: null
                    }
                };

                $scope.removeItem = function () {
                    $scope.data.selected = {
                        code: null,
                    }
                    $scope.model = null;
                };

                $scope.initFn = function () {
                    if ($scope.model != '' || _.isNull($scope.model)) {
                        let findItem = _.find($scope.dateFormat, function (o) {
                            return o.code == $scope.model;
                        });
                        $scope.data.selected = findItem;
                    }
                };

                $scope.initFn();

                $scope.openSearchDialog = function ($event) {

                    let dialogPosition = Utils.getPositionDropdownDialog($event, 300, 350);

                    let searchDialog = ngDialog.open({
                        template: urlBase.tplApp('app', '_directives_input_selector', 'date-format-selector-dialog-v2'),
                        className: 'ngdialog-custom-position no-background ' + dialogPosition['className'],
                        showClose: false,
                        closeByDocument: true,
                        disableAnimation: true,
                        cache: true,
                        width: 300,
                        data: dialogPosition,
                        controller: ['$scope', '$element', '$timeout', 'GmsSystem', 'Utils', function ($scope, $element, $timeout, GmsSystem, Utils) {

                            $scope.dateFormats = [
                                {
                                    code:'DD/MM/YYYY',
                                    name:'DD/MM/YYYY',
                                    index: 0
                                },
                                {
                                    code:'MM/DD/YYYY',
                                    name:'MM/DD/YYYY',
                                    index: 1
                                },
                                {
                                    code:'YYYY/MM/DD',
                                    name:'YYYY/MM/DD',
                                    index: 2
                                }
                            ];

                            Utils.setPositionDropdownDialog(dialogPosition);
                            $scope.selectItem = function (data) {
                                $scope.closeThisDialog(data);
                            }
                        }]
                    });

                    searchDialog.closePromise.then(function (returnData) {
                        if (angular.isDefined(returnData.id) && angular.isDefined(returnData.value.code) && returnData.value.code != '') {
                            $scope.setData(returnData.value);
                        }
                    })
                };

                $scope.setData = function (data) {
                    $scope.data.selected = angular.copy(data);
                    $scope.model = angular.copy(data.code);
                    $timeout(function () {
                        if (angular.isDefined($scope.ngChange) && angular.isFunction($scope.ngChange)) {
                            $scope.ngChange();
                        }
                    })
                }
            }
        };
        return directive;
    }

})();
