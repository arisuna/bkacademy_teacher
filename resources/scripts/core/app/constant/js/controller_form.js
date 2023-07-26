/**
 * Created on dd/mm/yyyy.
 */

(function () {
    'use strict';

    App.controller('ConstantFormController', ['$scope', '$http', '$stateParams', '$state', 'WaitingService', 'AppDataService',
        function ($scope, $http, $stateParams, $state, WaitingService, AppDataService) {
            $scope.page_loading = true;
            $scope.object = {};
            $scope.data_translated = [];
            $scope.supported_language = {};

            $scope.isClone = angular.isDefined($state.params.clone);
            $scope.initializeFn = function () {
                AppDataService.getConstantInit().then(
                    function (res) {
                        if (res.success) {
                            $scope.supported_language = res.supported_language;
                        } else {
                            WaitingService.error(res.msg);
                        }
                    },
                    function (res) {
                        WaitingService.error(res.message);
                    }
                );
            };
            $scope.initializeFn();

            $scope.getDetailFn = function () {
                var id = angular.isDefined($stateParams.id) ? $stateParams.id : 0;
                if (id == 0) {
                    $scope.page_loading = false;
                    return;
                }

                AppDataService.getConstantDetail(id).then(
                    function (res) {
                        if (res.success) {
                            if ($scope.isClone) {
                                res.data.id = 0;
                            }
                            $scope.object = res.data;
                            $scope.data_translated = res.data_translated;
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

            $scope.addDataTranslate = function () {
                $scope.data_translated.push({
                    language: '',
                    value: ''
                });
            };

            $scope.removeDataTranslate = function (index) {
                $scope.data_translated.splice(index, 1);
            };

            $scope.saving = false;

            $scope.saveFn = function () {
                $scope.saving = true;
                $scope.object.data_translated = angular.copy($scope.data_translated);

                if ($scope.object.id > 0) {
                    AppDataService.updateConstant($scope.object).then(function (res) {
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
                    AppDataService.createConstant($scope.object).then(function (res) {
                        if (res.success) {
                            // WaitingService.success(res.message, function () {
                            //     $state.go('app.constant.list');
                            // });

                            WaitingService.popSuccess(res.message);
                            $state.go('app.constant.list');
                        } else {
                            WaitingService.error(res.message);
                        }
                        $scope.saving = false;
                    }, function (err) {
                        WaitingService.error(err);
                    })
                }
            }; // End save function

            $scope.deleteFn = function (id) {
                WaitingService.questionSimple('Are you sure want DELETE this constant?',
                    function (res) {
                        AppDataService.deleteConstant(id).then(function (res) {
                            if (res.success) {
                                // WaitingService.success(res.message, function () {
                                //     $state.go('app.constant.list');
                                // });

                                WaitingService.popSuccess(res.message);
                                console.log('go', res.message);
                                $state.go('app.constant.list');
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