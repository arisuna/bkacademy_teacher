/**
 * Created on dd/mm/yyyy.
 */

(function () {
    'use strict';

    App.controller('ProductEditController', ['$scope', '$http', '$stateParams', '$state', 'WaitingService', 'AppDataService', 'AppSystem', 'AppAclService', 'AppProductService',
        function ($scope, $http, $stateParams, $state, WaitingService, AppDataService, AppSystem, AppAclService, AppProductService) {
            $scope.page_loading = true;
            $scope.product = {};
            $scope.canSave = false;
            $scope.selectedGroup = undefined;
            $scope.periodList = AppProductService.getPeriodList();
            $scope.statuses = AppProductService.getStatusList($scope.product.status);

            $scope.canSave =  angular.isDefined($stateParams.id) ? AppAclService.validateAction('product', 'edit') : AppAclService.validateAction('product', 'create');

            $scope.getDetailFn = function () {
                var id = angular.isDefined($stateParams.id) ? $stateParams.id : 0;
                if (id == 0) {
                    $scope.page_loading = false;
                    return;
                }

                AppProductService.getProductDetail(id).then(
                    function (res) {
                        if (res.success) {
                            $scope.product = res.data;
                            $scope.product.statusSelected = $scope.statuses.find(o => o.value === $scope.product.status);
                            $scope.statuses = AppProductService.getStatusList($scope.product.status);
                        } else {
                            WaitingService.error(res.msg);
                        }
                        $scope.page_loading = false;
                    },
                    function (error) {
                        WaitingService.expire(error);
                        $scope.page_loading = false;
                    }
                );
            };
            $scope.getDetailFn();

            $scope.changeTab = function(group){
                $scope.settingActive = group.id + 4;
                $scope.selectedGroup = group;
            };

            $scope.changeStatus = (item) => {
                $scope.product.status = item.value;
                // $scope.company.status = item.value
            }

            $scope.saving = false;

            $scope.saveFn = function () {
                $scope.saving = true;
                    AppProductService.updateProduct($scope.product).then(function (res) {
                        if (res.success) {
                            WaitingService.popSuccess(res.message);
                            $scope.product.product_field_groups = res.data.product_field_groups;
                            $scope.statuses = AppProductService.getStatusList($scope.product.status);
                        } else {
                            WaitingService.error(res.message);
                        }
                        $scope.saving = false;
                    }, function (err) {
                        WaitingService.error(err);
                    })
            }; // End save function

            $scope.deleteFn = function () {
                WaitingService.questionSimple('QUESTION_DELETE_PRODUCT_TEXT',
                    function () {
                        AppProductService.deleteProduct($scope.product.uuid).then(function (res) {
                            if (res.success) {
                                // WaitingService.success(res.message, function () {
                                //     $state.go('app.product.list');
                                // });

                                WaitingService.popSuccess(res.message);
                                console.log('go', res.message);
                                $state.go('app.product.list');
                            } else {
                                WaitingService.error(res.message);
                            }
                        }, function (err) {
                            WaitingService.error(err);
                        });
                    });
            }; // End delete function

            $scope.updateDescription = function(data){
                console.log('data', data);
                if(data){
                    $scope.product.description_id = data.descriptionId;
                    $scope.saveFn();
                }
            }
        }]);
})();