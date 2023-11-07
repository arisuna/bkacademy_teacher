(function () {
    'use strict';

    angular
        .module('app.app-directives')
        .directive('appBasicContent', appBasicContent);

    appBasicContent.$inject = ['Utils', 'urlBase', 'AppBasicContentService', 'ngDialog', 'WaitingService'];

    function appBasicContent(Utils, urlBase, AppBasicContentService, ngDialog, WaitingService) {
        var directive = {
            restrict: 'E',
            replace: true,
            scope: {
                descriptionId: '=ngModel',
                isRequired: '<?',
                label: '@?',
                requiredMessage: '@?',
                isEditable: '<?',
                showLabel: '<?',
                ngChange: '&?',
            },

            templateUrl: urlBase.tplApp('app', '_directives_input', 'basic-content'),

            link: function (scope, element, attrs) {

                if (angular.isUndefined(scope.label) || scope.label == '') {
                    scope.label = 'DESCRIPTION_TEXT';
                }

                if (angular.isUndefined(scope.isEditable) || scope.isEditable == null) {
                    scope.isEditable = true;
                }

                if (angular.isUndefined(scope.showLabel) || scope.showLabel == null) {
                    scope.showLabel = true;
                }

                if (angular.isUndefined(scope.requiredMessage) || scope.requiredMessage == '') {
                    scope.requiredMessage = 'DESCRIPTION_IS_REQUIRED_TEXT';
                }


            },

            controller: function ($scope, $element, $attrs) {
                $scope.data = {
                    id: null,
                    uuid: null,
                    description: null,
                };
                $scope.isLoading = true;


                $scope.initFn = function () {
                    if ($scope.descriptionId != undefined) {
                        AppBasicContentService.detail($scope.descriptionId).then(function (res) {
                            if (res.success) {
                                $scope.data = res.data;
                            }
                        });
                    } else {
                        $scope.data = {
                            id: null,
                            uuid: null,
                            description: null
                        };
                    }
                };


                $scope.resetModel = function () {
                    $scope.data = angular.copy({id: null, uuid: null, description: null});
                    $scope.descriptionId = null;
                    // if (typeof $scope.ngChange == 'function' && angular.isDefined($scope.ngChange)) {
                    //     $scope.ngChange({id: null, uuid: null, description: null});
                    // }
                }


                $scope.$watch('descriptionId', function () {
                    $scope.initFn();
                });

                $scope.removeFn = function(data){
                    AppBasicContentService.delete(data.uuid).then(function(res){
                        if(res.success){
                            $scope.data = angular.copy({id: null, uuid: null, description: null});
                            if (typeof $scope.ngChange == 'function' && angular.isDefined($scope.ngChange)) {
                                $scope.ngChange({descriptionId: null});
                            }
                            $scope.descriptionId = null;
                            WaitingService.success(res.message);
                        } else {
                            WaitingService.error(res.message);
                        }
                    })
                }


                $scope.openDialog = function ($event) {

                    let dialogPosition = Utils.getPositionDropdownDialog($event, 300, 300);

                    let searchDialog = ngDialog.open({
                        template: urlBase.tplApp('app', '_directives_input', 'basic-content-dialog'),
                        className: 'ngdialog-theme-default md-box',
                        showClose: false,
                        closeByDocument: true,
                        disableAnimation: true,
                        cache: true,
                        width: 300,
                        data: dialogPosition,
                        resolve: {
                            descriptionId: ['AppDataService', function (AppDataService) {
                                return $scope.descriptionId;
                            }],
                        },
                        controller: ['$scope', '$element', '$timeout', 'AppBasicContentService', 'Utils', 'WaitingService', 'descriptionId',
                            function ($scope, $element, $timeout, AppBasicContentService, Utils, WaitingService, descriptionId) {

                            $scope.model = {};
                            $scope.descriptionId = descriptionId;
                            $scope.isLoadingDialog = false;
                            $scope.saving = false;

                            Utils.setPositionDropdownDialog(dialogPosition);


                            $scope.selectItem = function (item) {
                                $scope.closeThisDialog(item);
                            }

                            $scope.initContent = function () {
                                if ($scope.descriptionId != undefined) {
                                    $scope.isLoadingDialog = true;
                                    AppBasicContentService.detail($scope.descriptionId).then(function (res) {
                                        if (res.success) {
                                            $scope.model = res.data;
                                        }

                                        $scope.isLoadingDialog = false;
                                    });
                                }
                            }

                            $scope.initContent();


                            $scope.saveFn = function(){
                                $scope.saving = true;
                                if($scope.model.uuid){
                                    AppBasicContentService.update($scope.model).then(function(res){
                                        if(res.success){
                                            $scope.closeThisDialog(res.data);
                                        } else {
                                            WaitingService.error(res.message);
                                        }

                                        setTimeout(function(){
                                            $scope.saving = false;
                                        }, 500)
                                    })
                                }else{
                                    let params = angular.copy($scope.model);
                                    console.log('$scope.model', $scope.model);
                                    AppBasicContentService.create($scope.model).then(function(res){
                                        if(res.success){
                                            $scope.closeThisDialog(res.data);
                                        } else {
                                            WaitingService.error(res.message);
                                        }

                                        setTimeout(function(){
                                            $scope.saving = false;
                                        }, 500)
                                    })
                                }
                            }

                            $scope.cancelFn = function(){
                                $scope.closeThisDialog();
                            }

                        }]
                    });

                    searchDialog.closePromise.then(function (returnData) {
                        if (angular.isDefined(returnData.id) && angular.isDefined(returnData.value.id) && returnData.value.id != '') {
                            $scope.data = returnData.value;
                            if (typeof $scope.ngChange == 'function' && angular.isDefined($scope.ngChange)) {
                                $scope.$evalAsync(function () {
                                    $scope.ngChange({descriptionId: $scope.data.id});
                                });
                            }
                            $scope.descriptionId = returnData.value.id;
                        }
                    })
                };
            }
        };

        return directive;
    }

})();
