/**
 * Created on dd/mm/yyyy.
 */

(function () {
    'use strict';

    App.controller('ProductFormController', ['$scope', '$http', '$stateParams', '$state', 'WaitingService', 'AppDataService', 'AppSystem', 'AppAclService', 'AppProductService',
        function ($scope, $http, $stateParams, $state, WaitingService, AppDataService, AppSystem, AppAclService, AppProductService) {
            $scope.page_loading = true;
            $scope.product = {};
            $scope.canSave = false;

            $scope.statuses = AppProductService.getStatusList();

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

            $scope.saving = false;

            $scope.saveFn = function () {
                $scope.saving = true;

                if ($scope.product.id > 0) {
                    AppProductService.updateProduct($scope.product).then(function (res) {
                        if (res.success) {
                            WaitingService.popSuccess(res.message);
                        } else {
                            WaitingService.error(res.message);
                        }
                        $scope.saving = false;
                    }, function (err) {
                        WaitingService.error(err);
                    })
                } else {
                    AppProductService.createProduct($scope.product).then(function (res) {
                        if (res.success) {
                            // WaitingService.success(res.message, function () {
                            //     $state.go('app.product.list');
                            // });

                            WaitingService.popSuccess(res.message);
                            $state.go('app.product.edit', {id: res.data.uuid});
                        } else {
                            WaitingService.error(res.message);
                        }
                        $scope.saving = false;
                    }, function (err) {
                        WaitingService.error(err);
                    })
                }
            }; // End save function

            $scope.deleteFn = function (uuid) {
                WaitingService.questionSimple('QUESTION_DELETE_PRODUCT_TEXT',
                    function () {
                        AppProductService.deleteProduct(uuid).then(function (res) {
                            if (res.success) {
                                // WaitingService.success(res.message, function () {
                                //     $state.go('app.product.list');
                                // });

                                WaitingService.popSuccess(res.message);
                                $state.go('app.product.list');
                            } else {
                                WaitingService.error(res.message);
                            }
                        }, function (err) {
                            WaitingService.error(err);
                        });
                    });
            }; // End delete function

        }]);
})();