(function () {
    'use strict';

    angular
        .module('app.input-selector')
        .directive('inputPriorityButton', inputPriorityButton);

    inputPriorityButton.$inject = ['$timeout', 'urlBase', '$translate', 'GmsTaskService'];

    function inputPriorityButton($timeout, urlBase, $translate, GmsTaskService) {
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
                priorityList: '=',
                isFullWidth: '<?',
                showIcon: '<?',
                noColor: '<?',
            },
            template: `
                <div class="project-filter-list">
                    <input-text is-info="true" ng-if="!isEditable" is-editable="false" ng-model="currentPriority.text_translate"></input-text>
                    <ui-select ng-model="model"
                               ng-if="isEditable"
                               on-select="setPriority($item)"
                               class="custom-radius "
                               ng-disabled="!isEditable"
                               theme="bootstrap">
                        <ui-select-match placeholder="{{'SELECT_TEXT' | translate}}"
                                        class="position-relative {{ !showIcon && (currentPriority.value == 1) ? 'ui-select-bright-blue': '' }} {{ !showIcon && (currentPriority.value == 0) ? 'ui-select-bright-grey': '' }} {{ !showIcon && (currentPriority.value == 2) ? 'ui-select-bright-red': '' }} {{ showIcon ? 'ui-select-bright-blue': '' }}">

                            <span class="txt-ellipsis" uib-tooltip="{{currentPriority.tooltip_text | translate}}" ng-class="{
                                    'text-bright-blue': !showIcon && currentPriority.value == 1,
                                    'txt-grey': !showIcon && currentPriority.value == 0,
                                    'text-red': !showIcon && currentPriority.value == 2
                                    }">
                                 <i class="mr-sm fas fa-angle-down txt-20 txt-grey txt-20" ng-if="showIcon && currentPriority.value == 0"></i>
                                <i class="mr-sm fas fa-equals txt-20 txt-bright-blue txt-14" ng-if="showIcon && currentPriority.value == 1"></i>
                                <i class="mr-sm fas fa-angle-up txt-20 text-red txt-20" ng-if="showIcon && currentPriority.value == 2"></i>

                             {{ currentPriority.text != '' && currentPriority.text != undefined ? ( currentPriority.text | translate ) : ('SELECT_TEXT' | translate ) }}
                              </span>
                        </ui-select-match>
                        <ui-select-choices class="country-list list-choices list-choices-priority"
                            repeat="priority in priorityList | filter: $select.search">
                            <div class="txt-ellipsis"  uib-tooltip="{{priority.tooltip_text | translate}}" ng-if="priority.is_visible == true || priority.is_visible == undefined">
                                <a ng-click="setPriority(priority)" ng-class="{
                                     'text-bright-blue': priority.color == 'blue',
                                    'txt-grey': priority.color == 'grey',
                                    'text-red': priority.color == 'red'
                                    }">
                                    <em class="fa fa-check-circle mr-sm" ng-if="currentPriority.value == priority.value"></em>
                                    <em class="fa fa-circle-o mr-sm" ng-if="currentPriority.value !== priority.value"></em>
                                    <span>{{ priority.text | translate}}</span>
                                </a>
                            </div>
                        </ui-select-choices>
                    </ui-select>
                </div>`,
            link: function (scope, element, attrs, GmsTaskService) {
                if (angular.isUndefined(scope.isEditable)) {
                    scope.isEditable = true;
                }
                if (angular.isUndefined(scope.hasLabel)) {
                    scope.hasLabel = true;
                }
                if (angular.isUndefined(scope.label)) {
                    scope.label = 'PRIORITY_TEXT';
                }
                if (angular.isUndefined(scope.isFullWidth)) {
                    scope.isFullWidth = false;
                }

                if (angular.isUndefined(scope.appendBody)) {
                    scope.appendBody = false;
                }

                if (angular.isUndefined(scope.noColor)) {
                    scope.noColor = false;
                }
                if (angular.isUndefined(scope.showIcon)) {
                    scope.showIcon = false;
                }
            },
            controller: function ($scope, $element, $attrs, GmsTaskService) {
                $scope.currentPriority = {};

                $scope.loadPriority = function () {
                    if (angular.isDefined($scope.priorityList)) {
                        $scope.currentPriority = $scope.priorityList.find(o => o.value == $scope.model);
                    } else {
                        $scope.priorityList = GmsTaskService.getPriorityList();
                        $scope.currentPriority = $scope.priorityList.find(o => o.value == $scope.model);
                    }
                };
                $scope.loadPriority();
                $scope.$watch('model', function (newValue, oldValue) {
                    if (newValue != oldValue) {
                        $scope.currentPriority = {};
                        $scope.loadPriority();
                    }
                });

                $scope.setPriority = function (priority) {
                    if (priority.value != $scope.model) {
                        $scope.currentPriority = priority;
                        $scope.model = $scope.currentPriority.value;
                        $timeout(function () {
                            if (angular.isFunction($scope.ngChange)) {
                                $scope.ngChange();
                            }
                        });
                    }
                };
            }
        };
        return directive;
    }

})();
