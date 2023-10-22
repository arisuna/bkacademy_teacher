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
                contentUuid: '=ngModel',
                objectUuid: '=?',
                isRequired: '<?',
                label: '@?',
                requiredMessage: '@?',
                isEditable: '<?',
                showLabel: '<?',
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
                    if ($scope.contentUuid) {
                        AppBasicContentService.detail($scope.contentUuid).then(function (res) {
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
                    $scope.contentUuid = null;
                    if (typeof $scope.ngChange == 'function' && angular.isDefined($scope.ngChange)) {
                        $scope.ngChange();
                    }
                }


                $scope.$watch('contentUuid', function () {
                    $scope.initFn();
                });

                $scope.removeFn = function(data){
                    AppBasicContentService.delete(data.uuid).then(function(res){
                        if(res.success){
                            $scope.data = angular.copy({id: null, uuid: null, description: null});
                            $scope.contentUuid = null;
                            WaitingService.success(res.message);
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
                            contentUuid: ['AppDataService', function (AppDataService) {
                                return $scope.contentUuid;
                            }],
                        },
                        controller: ['$scope', '$element', '$timeout', 'AppBasicContentService', 'Utils', 'WaitingService', 'contentUuid',
                            function ($scope, $element, $timeout, AppBasicContentService, Utils, WaitingService, contentUuid) {

                            $scope.model = {};
                            $scope.contentUuid = contentUuid;
                            $scope.isLoadingDialog = false;
                            $scope.saving = false;

                            Utils.setPositionDropdownDialog(dialogPosition);


                            $scope.selectItem = function (item) {
                                $scope.closeThisDialog(item);
                            }

                            $scope.initContent = function () {
                                if ($scope.contentUuid) {
                                    $scope.isLoadingDialog = true;
                                    AppBasicContentService.detail($scope.contentUuid).then(function (res) {
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
                                        }

                                        setTimeout(function(){
                                            $scope.saving = false;
                                        }, 500)
                                    })
                                }else{
                                    AppBasicContentService.create($scope.model).then(function(res){
                                        if(res.success){
                                            $scope.closeThisDialog(res.data);
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
                            $scope.contentUuid = returnData.value.uuid;
                        }
                    })
                };
            }
        };

        return directive;
    }

})();
