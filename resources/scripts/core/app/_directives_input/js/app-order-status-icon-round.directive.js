(function () {
    'use strict';

    angular
        .module('app.app-directives')
        .directive('appOrderStatusIconRound', appOrderStatusIconRound);

    appOrderStatusIconRound.$inject = ['$timeout', 'urlBase', 'AppBusinessOrderService', 'WaitingService', 'HistoryService'];

    function appOrderStatusIconRound($timeout, urlBase, AppBusinessOrderService, WaitingService, HistoryService) {

        var directive = {
            restrict: 'EA',
            replace: true,
            scope: {
                uuid: '<?',
                model: '=ngModel',
                order: '=?',
                title: '@?',
                hasTitle: '<?',
                required: '<?',
                isEditable: '<?',
                isLabel: '<?',
                isRadioButton: '<?',
                isSelectBox: '<?',
                isCircle: '<?',
                statusList: '<?',
                isRightAlign: '<?'
            },
            template: `
            <div class="btn-group dropdown text-left" uib-dropdown="dropdown">
                <button class="selected-status btn btn-flat btn-circle flex text-center flex-vertical"
                        uib-dropdown-toggle=""
                        aria-haspopup="true"
                        aria-expanded="false"
                        tooltip-placement="bottom"
                        uib-tooltip="{{ tooltipLabel | translate }}"
                        ng-class="{'done': model == 3, 'in-progress': model == 1, 'awaiting-final-review': model == 2, 'cancelled': model == -1, 'btn-round-40': !!isRightAlign}">
                        <em ng-show="isEditable" class="fa fa-caret-down text-white"></em>
                </button>

                <ul class="dropdown-menu dropdown-menu-right" role="menu" ng-show="isEditable">
                    <li ng-repeat="status in __status_list">
                        <a ng-click="setStatus(status)" ng-class="{
                        'text-yellow': status.color == 'yellow',
                        'text-bright-blue': status.color == 'blue',
                        'text-green': status.color == 'green',
                        'text-red': status.color == 'red',
                        'text-plum-red': status.color == 'plum-red',
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

                if (angular.isUndefined(scope.isRightAlign)) {
                    scope.isRightAlign = false;
                }

                if (scope.model == -1) {
                    scope.tooltipLabel = 'CANCELLED_STATUS_TEXT';
                }  else if (scope.model == 1) {
                    scope.tooltipLabel = 'PENDING_STATUS_TEXT';
                } else if (scope.model == 2) {
                    scope.tooltipLabel = 'CONFIRMED_STATUS_TEXT';
                } else if (scope.model == 3) {
                    scope.tooltipLabel = 'COMPLETED_STATUS_TEXT';
                }

            },
            controller: function ($scope, $element, $attrs) {
                $scope.__status_list = AppBusinessOrderService.getStatusList();
                $scope.currentStatus = {};
                $scope.oldCurrentStatus = {};
                

                $scope.$watch('model', function () {
                    $scope.currentStatus = {};
                    if (angular.isUndefined($scope.__status_list) || $scope.__status_list == null) {
                        $scope.__status_list = AppBusinessOrderService.getStatusList();
                    }

                    if (angular.isDefined($scope.__status_list)) {
                        angular.forEach($scope.__status_list, function (status) {
                            if (status.value == $scope.model) {
                                $scope.currentStatus = status;
                            }
                        })
                    }

                    if ($scope.model == -1) {
                        $scope.tooltipLabel = 'CANCELLED_TEXT';
                    } else if ($scope.model == 0) {
                        $scope.tooltipLabel = 'NOT_STARTED_TEXT';
                    } else if ($scope.model == 1) {
                        $scope.tooltipLabel = 'ONGOING_TEXT';
                    } else if ($scope.model == 2) {
                        $scope.tooltipLabel = 'AWAITING_FINAL_REVIEW_TEXT';
                    }else if ($scope.model == 3) {
                        $scope.tooltipLabel = 'DONE_TEXT';
                    }
                });


                $scope.setStatus = function (status) {
                    if (status.value ==  $scope.currentStatus.value) {
                        return;
                    }

                    $scope.oldCurrentStatus = $scope.currentStatus;

                    $scope.currentStatus = status;
                    $scope.model = $scope.currentStatus.value;
                    $timeout(function () {

                    });
                };
            }
        };
        return directive;
    }

})();
