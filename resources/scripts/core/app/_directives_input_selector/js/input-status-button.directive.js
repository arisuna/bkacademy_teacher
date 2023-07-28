(function () {
    'use strict';

    angular
        .module('app.input-selector')
        .directive('inputStatusButton', inputStatusButton);

    inputStatusButton.$inject = ['$timeout', 'urlBase'];

    function inputStatusButton($timeout, urlBase) {
        var directive = {
            restrict: 'EA',
            replace: true,
            require: 'ngModel',
            scope: {
                model: '=ngModel',
                title: '@?',
                hasTitle: '<?',
                required: '<?',
                isEditable: '<?',
                isLabel: '<?',
                isRadioButton: '<?',
                isBtnBlock: '<?',
                ngChange: '&?',
                isSelectBox: '<?',
                isCircle: '<?',
                statusList: '<?',
            },
            template: `<div class="" uib-dropdown="dropdown" style="">
                <span class="btn {{ isBtnBlock == true ? 'btn-block' : ''}} btn-oval btn-flat btn-sm text-white"
                      ng-disabled="!isEditable" uib-dropdown-toggle=""
                      aria-haspopup="true"
                      aria-expanded="false"
                      ng-class="{
                      'relo-bg-gray': currentStatus.color == 'gray' || currentStatus.color == null || currentStatus.color == undefined || currentStatus.color == '',
                      'relo-bg-yellow': currentStatus.color == 'yellow',
                      'relo-bg-bright-blue': currentStatus.color == 'blue',
                      'relo-bg-orange': currentStatus.color == 'orange',
                      'relo-bg-green': currentStatus.color == 'green',
                      'relo-bg-dark-blue': currentStatus.color == 'dark',
                      'relo-bg-dark-gray': currentStatus.color == 'darkgray',
                      'relo-bg-red': currentStatus.color == 'red'
                      }">
                    {{ currentStatus.text != '' && currentStatus.text != undefined ? ( currentStatus.text | translate ) :
                    ('SELECT_TEXT' | translate ) }}
                    <span class="caret"></span>
                </span>
                <ul class="dropdown-menu" role="menu">
                    <li ng-repeat="status in statusList" ng-if="status.is_visible == true || status.is_visible == undefined">
                        <a ng-click="setStatus(status)" ng-class="{
                        'text-yellow': status.color == 'yellow',
                        'text-bright-blue': status.color == 'blue',
                        'text-orange': status.color == 'orange',
                        'text-green': status.color == 'green',
                        'text-dark-blue': status.color == 'dark',
                        'text-gray': status.color == 'gray',
                        'text-dark-gray': status.color == 'darkgray',
                        'text-red': status.color == 'red'
                        }">
                            <em class="fa fa-check-circle mr-sm" ng-if="currentStatus.value == status.value"></em>
                            <em class="fa fa-circle-o mr-sm" ng-if="currentStatus.value !== status.value"></em>
                            {{ status.text | translate}}
                        </a>
                    </li>
                </ul>
            </div>
            `,
            link: function (scope, element, attrs) {
                if (angular.isUndefined(scope.isEditable)) {
                    scope.isEditable = true;
                }
                if (angular.isUndefined(scope.hasLabel)) {
                    scope.hasLabel = true;
                }
                if (angular.isUndefined(scope.label)) {
                    scope.label = 'STATUS_TEXT';
                }
            },
            controller: function ($scope, $element, $attrs) {
                $scope.currentStatus = {};
                $scope.$watch('model', function () {
                    $scope.currentStatus = {};
                    if (angular.isDefined($scope.statusList)) {
                        angular.forEach($scope.statusList, function (status) {
                            if (status.value == $scope.model) {
                                $scope.currentStatus = status;
                            }
                        })
                    }
                });
                $scope.setStatus = function (status) {
                    $scope.currentStatus = status;
                    $scope.model = $scope.currentStatus.value;
                    $timeout(function () {
                        if (angular.isFunction($scope.ngChange)) {
                            $scope.ngChange();
                        }
                    });
                };
            }
        };
        return directive;
    }

})();
