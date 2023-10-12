(function () {
    'use strict';

    angular
        .module('app.app-directives')
        .directive('appSystemAttributeSeletor', appSystemAttributeSeletor);

    appSystemAttributeSeletor.$inject = ['$translate', '$window', 'urlBase', 'ngDialog', 'WaitingService', 'AppDataService', 'AppSystem', 'AppAttributeService', 'Utils', '$timeout'];

    function appSystemAttributeSeletor($translate, $window, urlBase, ngDialog, WaitingService, AppDataService, AppSystem, AppAttributeService, Utils, $timeout) {
        var directive = {
            restrict: 'EA',
            replace: true,
            scope: {
                model: '=ngModel',
                isRequired: '<',
                label: '@',
                requiredMessage: '@',
                attributeName: '@',
                step: '@',
                name: '@',
                id: '@',
                init: '<',
                isEditable: '<?',
                labelFloating: '<?',
                toolTipText: '@?',
                addAttribute: '<?',
                noMarginBottom: '<?',
                isQuestionnaire: '<?',
                classItem: '@?',
                formId: '@?',
                showRemoveLabel: '<?',
            },
            templateUrl: urlBase.tplApp('app', '_directives_input', 'attribute'),
            link: function (scope, element, attrs) {

                if (angular.isUndefined(scope.labelFloating) || scope.labelFloating === false) {
                    scope.className = ''
                    scope.placeholder = 'SELECT_TEXT';
                } else {
                    scope.className = 'float-label';
                    scope.placeholder = '';
                }
                if (scope.toolTipText == '' || scope.toolTipText == undefined) {
                    scope.toolTipText = '';
                } else {
                    scope.className = scope.className + " has-tool-tip";
                }

                if (scope.addAttribute == '' || scope.addAttribute == undefined) {
                    scope.addAttribute = false;
                }

                if (scope.isQuestionnaire == '' || scope.isQuestionnaire == undefined) {
                    scope.isQuestionnaire = false;
                }

                if (scope.classItem == '' || scope.classItem == undefined) {
                    scope.classItem = '';
                }

                if (scope.formId == '' || scope.formId == undefined) {
                    scope.formId = '';
                }

                scope.realName = scope.attributeName + "_attribute_" + _.uniqueId();

                if (angular.isUndefined(scope.showLabel) || scope.showLabel == '' || _.isNull(scope.showLabel)) {
                    scope.showLabel = true;
                }

                if (angular.isUndefined(scope.isEditable)) {
                    scope.isEditable = true;
                }

                if (angular.isUndefined(scope.showRemoveLabel)) {
                    scope.showRemoveLabel = true;
                }

                if (angular.isUndefined(scope.noMarginBottom)) {
                    scope.noMarginBottom = false;
                }
            },
            controller: function ($scope, $element, $attrs) {

                $scope.data = {
                    selected: {
                        code: null
                    }
                };

                $scope.isValid = true;

                $scope.attribute = {};

                $scope.getAttribute = function () {
                    AppAttributeService.getAttribute($scope.attributeName).then(function (res) {
                        if (res.success) {
                            $scope.attribute = res.data;
                        }
                    });
                };

                $scope.getAttribute();
                console.log('addAttribute', $scope.addAttribute);
                $scope.addNewValueForAttribute = function () {
                    if($scope.isQuestionnaire){
                        WaitingService.questionSimple('ADD_NEW_ATTRIBUTE_VALUE_QUESTION_TEXT', function () {
                            WaitingService.prompt('CREATE_NEW_CATEGORY_TEXT', 'ENTER_CATEGORY_NAME_TEXT', function (inputValue) {
                                $scope.addAttributeFn(inputValue);
                            }, 'ENTER_CATEGORY_NAME_TEXT');

                        });
                    }else{
                        WaitingService.questionSimple('ADD_NEW_ATTRIBUTE_VALUE_QUESTION_TEXT', function () {
                            WaitingService.prompt('ENTER_ATTRIBUTE_NAME_TEXT', 'ENTER_VALUE_TEXT', function (inputValue) {
                                $scope.addAttributeFn(inputValue);
                            });

                        });
                    }

                };

                $scope.addAttributeFn = function(inputValue){
                    AppDataService.addNewValueAttribute({
                        name: $scope.attributeName,
                        value: inputValue
                    }).then(function (res) {
                        if (res.success) {
                            if (angular.isDefined(res.data.complex_id)) {
                                $scope.model = res.data.complex_id;
                            }
                            AppSystem.reloadAttribute();
                            $scope.getAttribute();
                        } else {
                            WaitingService.popError(res.message)
                        }
                    }, function () {
                        WaitingService.popExpire();
                    })
                };


                $scope.$watch('model', function (newValue, oldValue) {
                    console.log('attribute', $scope.model);
                    if (angular.isDefined($scope.model) && $scope.model != '' && $scope.model != null) {
                        $scope.isValid = true;
                        if($scope.isRequired && $element.find('.parsley-required')[0] != undefined){
                            $element.find('.parsley-required')[0].innerHTML = '';
                        }
                        AppAttributeService.getAttributeByCode($scope.model).then(function (res) {
                            if (res.success) {
                                $scope.data.selected = angular.copy(res.data);
                            }
                        });
                    }else{
                        $scope.removeItem();
                    }
                });


                $scope.openSearchDialog = function ($event) {

                    let dialogPosition = Utils.getPositionDropdownDialog($event, 300, 300);


                    let searchDialog = ngDialog.open({
                        template: urlBase.tplApp('app', '_directives_input', 'attribute-selector-search-dialog'),
                        className: 'ngdialog-custom-position no-background ' + dialogPosition['className'],
                        showClose: false,
                        closeByDocument: true,
                        disableAnimation: true,
                        cache: false,
                        width: 300,
                        data: {
                            attribute: $scope.attribute,
                            attributeName: $scope.attributeName
                        },
                        controller: ['$scope', '$element', 'AppSystem', 'Utils', 'AppAttributeService', function ($scope, $element, AppSystem, Utils, AppAttributeService) {

                            $scope.attribute = {};
                            $scope.attributeName = $scope.ngDialogData.attributeName;
                            $scope.isLoading = false;

                            $scope.initFn = function () {
                                $scope.isLoading = true;
                                AppAttributeService.getAttribute($scope.attributeName).then(function (res) {
                                    $scope.isLoading = false;
                                    if (res.success) {
                                        $scope.attribute = res.data;
                                        console.log('$scope.attribute', $scope.attribute);
                                    }
                                }, function () {
                                    $scope.isLoading = false;
                                });
                            };

                            $scope.initFn();

                            Utils.setPositionDropdownDialog(dialogPosition);

                            $scope.searchConfig = {
                                query: null,
                                currentItem: {
                                    code: null,
                                },
                                filterQuery: ""
                            };


                            $scope.applyFilter = function () {
                                $scope.searchConfig.filterQuery = $scope.searchConfig.query;
                            }

                            $scope.selectItem = function (attributeValue) {
                                $scope.closeThisDialog(attributeValue);
                            }

                        }]
                    });

                    searchDialog.closePromise.then(function (returnData) {
                        if (angular.isDefined(returnData.value) && angular.isDefined(returnData.value.code) && returnData.value.code != '') {
                            $scope.data.selected = angular.copy(returnData.value);
                            $scope.model = returnData.value.code;
                        }
                    })
                };


                $scope.removeItem = function () {
                    $scope.data.selected = angular.copy({
                        code: null
                    });
                    $scope.model = null;
                }

                console.log('formId', $scope.formId);
                if($scope.formId){
                    console.log('formId', $scope.formId);
                    $('#' + $scope.formId).parsley().on('field:error', function(fieldInstance){
                        // get messages & alert
                        console.log('error', $scope.data.selected.code);
                        if($(fieldInstance.$element[0]).attr('ng-model') === 'data.selected.code'){
                            if($scope.isRequired){
                                $timeout(function(){
                                    $scope.isValid = false;
                                }, 50);
                            }
                        }
                    });
                }
                // $window.Parsley.on('field:error', function(fieldInstance){
                //     // get messages & alert
                //     console.log('error', $scope.data.selected.code);
                //     if($(fieldInstance.$element[0]).attr('ng-model') === 'data.selected.code'){
                //         if($scope.isRequired){
                //             $timeout(function(){
                //                 $scope.isValid = false;
                //             }, 50);
                //         }
                //     }
                // });

            }
        };
        return directive;
    }

})();
