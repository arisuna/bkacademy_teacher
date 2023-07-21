(function () {
    'use strict';
    angular.module('app.utils')
        .directive('editableInputText', ['EditableTextHelper', function (EditableTextHelper) {
            return {
                restrict: 'A',
                scope: {
                    ngModel: '=',
                    placeholder: '@',
                    showButton: '<',
                    isRequired: '<?',
                    ngChange: '&'
                },
                transclude: true,
                template: '<span ng-class="{\'is-placeholder\': placeholder && !ngModel}"> ' +
                '<textarea ng-show="isEditing" ng-model="ngModel" placeholder="{{placeholder | translate}}"></textarea>' +
                '<div ng-hide="isEditing || isWorking" class="original-text" tabindex="0" ng-click="isEditing=true" ng-focus="isEditing=true;">{{placeholder ? (ngModel != "" ? ngModel : placeholder) : ngModel}}</div>' +
                '<span ng-hide="isEditing" ng-transclude></span>' +
                '<span ng-show="isWorking" class="' + EditableTextHelper.workingClassName + '">' + EditableTextHelper.workingText + '</span>' +
                '<div class="quick-save mt mr-sm" ng-show="isEditing">\n' +
                '            <span class="txt-red txt-12 pull-left" ng-show="isShowMsg">{{"MANDATORY_FIELD_TEXT" | translate}}</span>\n' +
                '            <button type="button" ng-disabled="isShowMsg" class="btn relo-bg-green btn-sm pull-right ml-sm" ng-click="saveFn()">\n' +
                '                <span class="fa fa-check"></span>\n' +
                '            </button>\n' +
                '            <button type="button" class="btn btn-default btn-sm pull-right" ng-click="cancelFn()">\n' +
                '                <span class="fa fa-remove text-gray"></span>\n' +
                '            </button>\n' + '<div class="clearfix"></div>' +
                '        </span>' +
                '</span>',
                link: function (scope, elem, attrs) {
                    var input = elem.find('textarea'),
                        lastValue;

                    scope.isEditing = false;
                    elem.addClass('gg-editable-text');

                    if(angular.isUndefined(scope.isRequired)){
                        scope.isRequired = false;
                    }

                    scope.$watch('isEditing', function (val, oldVal) {

                        scope.oldValue = scope.ngModel;

                        if (val == true) {
                            scope.oldValue = scope.ngModel;
                        } else {
                            scope.ngModel = scope.oldValue;
                        }
                    });

                    scope.$watch('isWorking', function () {
                        console.info('isWorking', scope.isWorking);
                    });

                },
                controller: function ($scope, $element, $attrs) {
                    $scope.cancelFn = function () {
                        $scope.ngModel = $scope.oldValue;
                        $scope.isEditing = false;
                    };
                    $scope.saveFn = function () {
                        $scope.ngChange();
                        $scope.isEditing = false;
                    };
                    $scope.isShowMsg = false;
                    $scope.$watch('ngModel', function(){
                        if($scope.isRequired){
                            if($scope.ngModel == '' || $scope.ngModel == null){
                                $scope.isShowMsg = true;
                            }else{
                                $scope.isShowMsg = false;
                            }
                        }
                    });
                }
            };
        }]);
})();


'use strict';
(function () {
    angular.module('app.utils')
        .provider('EditableTextHelper', function () {

            var workingText = 'Working..',
                workingClassName = '';

            this.setWorkingText = function (text) {
                workingText = text;
                return this;
            };

            this.setWorkingClassName = function (name) {
                workingClassName = name;
                return this;
            };

            this.$get = function () {
                return {
                    workingText: workingText,
                    workingClassName: workingClassName
                }
            };

        });
})();

