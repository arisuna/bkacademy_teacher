/**
 * Created on dd/mm/yyyy.
 */

(function () {
    'use strict';

    App.controller('EvaluationFormController', ['$scope', '$timeout','$http', '$stateParams', '$state', 'ngDialog', 'urlBase', 'WaitingService', 'AppAddressService', 'AppSystem', 'AppAclService', 'AppDataService',
        function ($scope, $timeout, $http, $stateParams, $state, ngDialog, urlBase, WaitingService, AppAddressService, AppSystem, AppAclService, AppDataService) {
            $scope.page_loading = true;
            $scope.evaluation = {
                category_code: "",
                type_code: ""
            };
            $scope.canSave = false;
            $scope.isEditable = false;
            $scope.tabActive = 1;
            $scope.types = [
                "HOMEWORK",
                "CLASSWORK"
            ];
            $scope.categories = [
                "ATTITUDE",
                "SKILL",
                "KNOWLEDGE",
                "OTHER"
            ];

            $scope.canSave =  angular.isDefined($stateParams.id) ? AppAclService.validateAction('evaluation', 'edit') : AppAclService.validateAction('evaluation', 'create');

            $scope.onEditable = ($event, isEditable) => {
                $scope.$evalAsync(function () {
                    $scope.isEditable = !isEditable
                })
            }

            $scope.getDetailFn = function () {
                var id = angular.isDefined($stateParams.id) ? $stateParams.id : 0;
                if (id == 0) {
                    $scope.page_loading = false;
                    return;
                }
                AppDataService.getEvaluationDetail(id).then(
                    function (res) {
                        if (res.success) {
                            $scope.evaluation = res.data;
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

                if ($scope.evaluation.id > 0) {
                    AppDataService.updateEvaluation($scope.evaluation).then(function (res) {
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
                    AppDataService.createEvaluation($scope.evaluation).then(function (res) {
                        if (res.success) {
                            // WaitingService.success(res.message, function () {
                            //     $state.go('app.evaluation.list');
                            // });

                            WaitingService.popSuccess(res.message);
                            $state.go('app.evaluation.list');
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
                WaitingService.questionSimple('QUESTION_DELETE_EVALUATION_TEXT',
                    function (res) {
                        AppDataService.deleteEvaluation(id).then(function (res) {
                            if (res.success) {
                                // WaitingService.success(res.message, function () {
                                //     $state.go('app.evaluation.list');
                                // });

                                WaitingService.popSuccess(res.message);
                                console.log('go', res.message);
                                $state.go('app.evaluation.list');
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