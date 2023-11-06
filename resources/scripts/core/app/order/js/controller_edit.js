/**
 * Created on dd/mm/yyyy.
 */

(function () {
    'use strict';

    App.controller('OrderEditController', ['$scope', '$http', '$stateParams', '$state', 'WaitingService', 'AppDataService', 'AppSystem', 'AppAclService', 'AppBusinessOrderService',
        function ($scope, $http, $stateParams, $state, WaitingService, AppDataService, AppSystem, AppAclService, AppBusinessOrderService) {
            $scope.page_loading = true;
            $scope.order = {};
            $scope.product = {};
            $scope.canSave = false;
            $scope.selectedGroup = undefined;
            // $scope.periodList = AppBusinessOrderService.getPeriodList();
            // $scope.statuses = AppBusinessOrderService.getStatusList($scope.product.status);

            // $scope.canSave =  angular.isDefined($stateParams.id) ? AppAclService.validateAction('product', 'edit') : AppAclService.validateAction('product', 'create');

            $scope.currentTab = 'basic';
            $scope.openDetail = true;
            $scope.openBuyerInformation = true;
            $scope.openProduct = true;
            $scope.openSummary = true;
            $scope.openRelocation = false;
            $scope.openTask = false;
            $scope.openComment = false;
            $scope.openActivity = false;
            $scope.changeCurrentTab = function (currentTab) {
                $scope.currentTab = currentTab;

                if (currentTab === 'basic') {
                    $scope.openDetail = true;
                    $scope.openBuyerInformation = true;
                    $scope.openProduct = true;
                }

                if (currentTab === 'task') {
                    $scope.openSummary = false;
                    $scope.openTask = true;
                }

                if (currentTab === 'activity') {
                    $scope.openSummary = false;
                    $scope.openActivity = true;
                }

                if (currentTab == 'comment') {
                    $scope.openSummary = false;
                    $scope.openComment = true;
                }

                if (currentTab === 'communication') {
                    $scope.openSummary = false;
                    $scope.openCommunication = true;
                }

                if (currentTab === 'invoice') {
                    $scope.openSummary = false;
                    $scope.openInvoice = true;
                }

                if (currentTab === 'timelog') {
                    $scope.openSummary = false;
                    $scope.openTimelog = true;
                }


            }

            $scope.getDetailFn = function () {
                var uuid = angular.isDefined($stateParams.uuid) ? $stateParams.uuid : '';
                if (uuid == '') {
                    $scope.page_loading = false;
                    return;
                }

                AppBusinessOrderService.detailBusinessOrder(uuid).then(
                    function (res) {
                        if (res.success) {
                            $scope.order = res.data;
                            $scope.product = res.data.product;
                            $scope.product.statusSelected = $scope.statuses.find(o => o.value === $scope.product.status);
                            $scope.statuses = AppBusinessOrderService.getStatusList($scope.order.status);
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
                // $scope.saving = true;
                //     AppBusinessOrderService.updateOrder($scope.product).then(function (res) {
                //         if (res.success) {
                //             WaitingService.popSuccess(res.message);
                //             $scope.product.product_field_groups = res.data.product_field_groups;
                //             $scope.statuses = AppBusinessOrderService.getStatusList($scope.product.status);
                //         } else {
                //             WaitingService.error(res.message);
                //         }
                //         $scope.saving = false;
                //     }, function (err) {
                //         WaitingService.error(err);
                //     })
            }; // End save function

            $scope.deleteFn = function () {
                WaitingService.questionSimple('QUESTION_DELETE_PRODUCT_TEXT',
                    function () {
                        AppBusinessOrderService.deleteBusinessOrder($scope.order.uuid).then(function (res) {
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

            $scope.setCancelled = function(){
                AppBusinessOrderService.setCancelled($scope.order).then(function(res){
                    if(res.success){
                        $scope.order.status = res.data.status;
                        WaitingService.popSuccess(res.message);
                    }else {
                        WaitingService.popError(res.message);
                    }
                })
            }

            $scope.setConfirmed = function(){
                AppBusinessOrderService.setConfirmed($scope.order).then(function(res){
                    if(res.success){
                        $scope.order.status = res.data.status;
                        WaitingService.popSuccess(res.message);
                    }else {
                        WaitingService.popError(res.message);
                    }
                })
            }

            $scope.setCompleted = function(){
                AppBusinessOrderService.setCompleted($scope.order).then(function(res){
                    if(res.success){
                        $scope.order.status = res.data.status;
                        WaitingService.popSuccess(res.message);
                    }else {
                        WaitingService.popError(res.message);
                    }
                })
            }
        }]);
})();