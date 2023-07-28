(function () {
    'use strict';

    angular
        .module('app.input-selector')
        .directive('inputStatusButtonV2', inputStatusButtonV2);

    inputStatusButtonV2.$inject = ['$timeout', 'urlBase', '$translate'];

    function inputStatusButtonV2($timeout, urlBase, $translate) {
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
                isFullWidth: '<?',
                noColor: '<?',
            },
            template: `<div class="project-filter-list">
                        <input-text is-info="true" ng-if="!isEditable" is-editable="false" ng-model="currentStatus.text_translate"></input-text>
                        <ui-select ng-model="model"
                                   required="required"
                                   ng-if="isEditable"
                                   on-select="setStatus($item)"
                                   class="custom-radius "
                                   ng-disabled="!isEditable"
                                   theme="bootstrap">
                            <ui-select-match placeholder="{{'SELECT_TEXT' | translate}}"
                                            class="position-relative
                                            {{ !noColor && (currentStatus.color == undefined || currentStatus.color == 'gray' || currentStatus.color == null || currentStatus.color == '') ? 'ui-select-bg-gray' :
                                             !noColor && currentStatus.color == 'dark' ? 'ui-select-bg-dark' :
                                             !noColor && currentStatus.color == 'yellow' ? 'ui-select-bg-yellow' :
                                             !noColor && currentStatus.color == 'green' ? 'ui-select-bg-green' :
                                             !noColor && currentStatus.color == 'red' ? 'ui-select-bg-red' :
                                             !noColor && currentStatus.color == 'plum-red' ? 'ui-select-bg-plum-red' :
                                             !noColor && currentStatus.color == 'blue' ? 'ui-select-bg-blue' : '' }}">
                                <span class="txt-ellipsis" ng-class="{'txt-dark-blue': !isEditable}"
                                uib-tooltip="{{currentStatus.tooltip_text | translate}}">
                                 {{ currentStatus.text != '' && currentStatus.text != undefined ? ( currentStatus.text | translate ) :
                    ('SELECT_TEXT' | translate ) }}
                                  </span>
                            </ui-select-match>
                            <ui-select-choices class="country-list list-choices"
                                repeat="status in statusList | filter: $select.search">
                                <div class="txt-ellipsis"  uib-tooltip="{{status.tooltip_text | translate}}" ng-if="status.is_visible == true || status.is_visible == undefined">
                                    <a ng-click="setStatus(status)" ng-class="{
                                        'text-yellow-origin': status.color == 'yellow',
                                        'text-bright-blue': status.color == 'blue',
                                        'text-orange': status.color == 'orange',
                                        'text-green': status.color == 'green',
                                        'text-dark-blue': status.color == 'dark',
                                        'text-gray': status.color == 'gray',
                                        'text-dark-gray': status.color == 'darkgray',
                                        'text-red': status.color == 'red',
                                        'text-plum-red': status.color == 'plum-red'
                                        }">
                                        <em class="fa fa-check-circle mr-sm" ng-if="currentStatus.value == status.value"></em>
                                        <em class="fa fa-circle-o mr-sm" ng-if="currentStatus.value !== status.value"></em>
                                        <span>{{ status.text | translate}}</span>
                                    </a>
                                </div>
                                <!--<small ng-bind-html="item.id | highlight: $select.search"></small>-->
                            </ui-select-choices>
                        </ui-select>

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
                if (angular.isUndefined(scope.isFullWidth)) {
                    scope.isFullWidth = false;
                }

                if (angular.isUndefined(scope.appendBody)) {
                    scope.appendBody = false;
                }

                if (angular.isUndefined(scope.noColor)) {
                    scope.noColor = false;
                }
            },
            controller: function ($scope, $element, $attrs) {
                $scope.currentStatus = {};
                $scope.loadStatus = function(){
                    if (angular.isDefined($scope.statusList)) {
                        angular.forEach($scope.statusList, function (status) {
                            if (status.value == $scope.model) {
                                $scope.currentStatus = status;
                                if($scope.currentStatus && $scope.currentStatus.text != undefined && $scope.currentStatus.text != ''){
                                    $scope.currentStatus.text_translate = $translate.instant($scope.currentStatus.text);
                                }else{
                                    $scope.currentStatus.text_translate = '';
                                }
                            }
                        })

                    }
                };
                $scope.loadStatus();
                $scope.$watch('model', function (newValue, oldValue) {
                    if (newValue != oldValue) {
                        $scope.currentStatus = {};
                        $scope.loadStatus();
                    }
                });

                $scope.setStatus = function (status) {
                    if (status.value != $scope.model){
                        $scope.currentStatus = status;
                        $scope.model = $scope.currentStatus.value;
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
