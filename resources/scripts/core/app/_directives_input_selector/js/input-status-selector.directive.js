(function () {
    'use strict';

    angular
        .module('app.input-selector')
        .directive('inputStatusSelector', inputStatusSelector);

    inputStatusSelector.$inject = ['$translate', '$http', 'urlBase'];

    function inputStatusSelector($translate, $http, urlBase) {
        var directive = {
            restrict: 'EA',
            replace: true,
            scope: {
                model: '=ngModel',
                title: '@?',
                hasTitle: '<?',
                required: '<?',
                isEditable: '<?',
                isLabel: '<?',
                isRadioButton: '<?',
                isSelectBox: '<?',
                isCircle: '<?',
                statusList: '<?',
                hasText: '<?',
                hasIcon: '<?',
                isHorizontal: '<?',
            },
            templateUrl: urlBase.tplBase('base-modules/input-selector', 'status-selector'),
            link: function (scope, element, attrs) {
                if (angular.isUndefined(scope.isEditable)) {
                    scope.isEditable = true;
                }
                if (angular.isUndefined(scope.hasLabel)) {
                    scope.hasLabel = false;
                }
                if (angular.isUndefined(scope.label)) {
                    scope.label = 'STATUS_TEXT';
                }
                if (angular.isUndefined(scope.hasTitle)) {
                    scope.hasTitle = false;
                }

                if (angular.isUndefined(scope.hasIcon)) {
                    scope.hasIcon = false;
                }

                if(scope.hasIcon){
                    scope.iconClass="circle-25px";
                } else {
                    scope.iconClass="circle-lg";
                }
            },
            controller: function ($scope, $element, $attrs) {
                $scope.currentStatusItem = {};
                $scope.currentStatusItemValue = {selected: null};
                $scope.$watch('model', function () {
                    $scope.currentStatusItem = {};
                    if (angular.isDefined($scope.statusList)) {
                        angular.forEach($scope.statusList, function (status) {
                            if (status.value == parseInt($scope.model)) {
                                $scope.currentStatusItem = status;
                                $scope.currentStatusItemValue.selected = status.value;
                            }
                        })
                    }
                });

                $scope.changeStatus = function (status) {
                    console.info('changeStatus', $scope.currentStatusItemValue);
                    if ($scope.currentStatusItemValue.selected == status.value)
                        $scope.model = status.value;
                }

                $scope.setStatus = function (status) {
                    $scope.currentStatus = status;
                    $scope.model = $scope.currentStatus.value;
                    if (angular.isFunction($scope.ngChange)) {
                        $scope.ngChange();
                    }
                };
            }
        };
        return directive;
    }

})();
