/**
 * Created on dd/mm/yyyy.
 */

(function () {
    'use strict';

    App.controller('TopicFormController', ['$scope', '$http', '$stateParams', '$state', '$location', '$anchorScroll',
        'WaitingService', 'AppDataService', 'AppTopicService', 'AppSystem',
        function ($scope, $http, $stateParams, $state, $location, $anchorScroll,
                  WaitingService, AppDataService, AppTopicService, AppSystem) {
            $scope.page_loading = true;
            $scope.object = {};
            $scope.data_translated = [];
            $scope.supported_language = {};
            $scope.languages = AppSystem.getLanguages();
            $scope.arrayHasDelete = [];

            $scope.isClone = angular.isDefined($state.params.clone) ? $state.params.clone : false;

            $scope.getDetailFn = function () {
                var id = angular.isDefined($stateParams.id) ? $stateParams.id : 0;
                if (id == 0) {
                    $scope.page_loading = false;
                    return;
                }

                AppTopicService.detailTopic(id).then(
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

            $scope.saving = false;

            $scope.saveFn = function () {
                $scope.saving = true;
                $scope.object.data_translated = angular.copy($scope.data_translated);

                if ($scope.arrayHasDelete.length > 0) {
                    $scope.object.arrayHasDelete = $scope.arrayHasDelete;
                }



                if ($scope.object.id > 0) {
                    AppTopicService.updateTopic($scope.object).then(function (res) {
                        if (res.success) {
                            WaitingService.popSuccess(res.message);
                            $scope.closeThisDialog({address: res.data});
                        } else {
                            WaitingService.error(res.message);
                        }
                        $scope.saving = false;
                    }, function (err) {
                        WaitingService.error(err);
                    })
                } else {
                    AppTopicService.createTopic($scope.object).then(function (res) {
                        if (res.success) {

                            WaitingService.popSuccess(res.message);
                            $scope.closeThisDialog({address: res.data});
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
                WaitingService.questionSimple('DO_YOU_WANT_TO_DELETE_TOPIC_TEXT',
                    function (res) {
                        AppTopicService.deleteTopic(id).then(function (res) {
                            if (res.success) {
                                WaitingService.popSuccess(res.message);
                                $scope.closeThisDialog();
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