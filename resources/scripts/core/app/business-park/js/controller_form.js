/**
 * Created on dd/mm/yyyy.
 */

(function () {
    'use strict';

    App.controller('BusinessParkFormController', ['$scope', '$http', '$stateParams', '$state', '$location', '$anchorScroll',
        'WaitingService', 'AppDataService', 'AppBusinessParkService', 'AppSystem',
        function ($scope, $http, $stateParams, $state, $location, $anchorScroll,
                  WaitingService, AppDataService, AppBusinessParkService, AppSystem) {
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

                AppBusinessParkService.detailBusinessPark(id).then(
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

                if ($scope.arrayHasDelete.length > 0) {
                    $scope.object.arrayHasDelete = $scope.arrayHasDelete;
                }



                if ($scope.object.id > 0) {
                    AppBusinessParkService.updateBusinessPark($scope.object).then(function (res) {
                        if (res.success) {
                            WaitingService.popSuccess(res.message);
                            $state.go('app.business-park.list');
                        } else {
                            WaitingService.error(res.message);
                        }
                        $scope.saving = false;
                    }, function (err) {
                        WaitingService.error(err);
                    })
                } else {
                    AppBusinessParkService.createBusinessPark($scope.object).then(function (res) {
                        if (res.success) {
                            // WaitingService.success(res.message, function () {
                            //     $state.go('app.system-attribute.list');
                            // });

                            WaitingService.popSuccess(res.message);
                            $state.go('app.business-park.list');
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
                WaitingService.questionSimple('DO_YOU_WANT_TO_DELETE_BUSINESS_ZONE_TEXT',
                    function (res) {
                        AppBusinessParkService.deleteBusinessPark(id).then(function (res) {
                            if (res.success) {
                                // WaitingService.success(res.message, function () {
                                //     $state.go('app.system-attribute.list');
                                // });

                                WaitingService.popSuccess(res.message);
                                console.log('go', res.message);
                                $state.go('app.system-attribute.list');
                            } else {
                                WaitingService.error(res.message);
                            }
                        }, function (err) {
                            WaitingService.error(err);
                        });
                    });
            }; // End delete function


            $scope.addBusinessParkValueFn = function (key) {
                if (!angular.isDefined($scope.object.data_value)) {
                    $scope.object.data_value = [];
                }

                $scope.object.data_value.push({
                    value: '',
                    standard: 0,
                    data_translation: {}
                });
                $location.hash('panelValue_' + ($scope.object.data_value.length - 1));
                $anchorScroll();
            };

            $scope.removeValueFn = function (index, attribute_id, $event) {
                $event.preventDefault();
                $event.stopPropagation();
                $scope.arrayHasDelete.push(attribute_id);
                $scope.object.data_value.splice(index, 1);
            };
        }]);
})();