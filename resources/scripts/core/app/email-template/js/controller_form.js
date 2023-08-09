/**
 * Created on dd/mm/yyyy.
 */
(function () {
    'use strict';

    App.controller('EmailTemplateFormController', ['$scope', '$http', '$stateParams', '$state', '$timeout', 'ngDialog', 'urlBase', 'WaitingService',
        function ($scope, $http, $stateParams, $state, $timeout, ngDialog, urlBase, WaitingService) {
            $scope.page_loading = true;
            $scope.object = {'items': {}};
            $scope.languages = {}; // Iso - name
            $scope.isClone = angular.isDefined($state.params.clone);
            $scope.isEdit = true;
            $scope.page_working = false;
            $scope.save_working = false;

            $scope.getDetailFn = function () {
                var id = angular.isDefined($stateParams.id) ? $stateParams.id : '';
                if (id == '') {
                    $scope.page_loading = false;
                    $scope.isEdit = false;
                    return;
                }
                $http({
                    method: 'GET',
                    url: '/app/email-template/detail/' + id
                }).success(
                    function (res) {
                        if (res.success) {
                            if ($scope.isClone) {
                                res.data.id = 0;
                            }
                            $scope.object = res.data;
                            if ($.isArray($scope.object.items) && $scope.object.items.length === 0) {
                                $scope.object.items = {};
                            }
                        } else {
                            WaitingService.error(res.msg);
                        }
                        $scope.page_loading = false;
                    }
                ).error(function (res) {
                        WaitingService.error(res.message);
                        $scope.page_loading = false;
                    }
                );
            };
            /**
             * Load language supported
             */
            $scope.initializeFn = function () {
                $http({
                    method: 'GET',
                    url: '/app/email-template/initialize'
                }).success(
                    function (res) {
                        if (res.success) {
                            $scope.languages = res.languages;
                            $scope.getDetailFn();
                        } else {
                            WaitingService.error(res.msg, function () {
                                $scope.page_loading = false;
                            });
                        }
                    }
                ).error(
                    function (res) {
                        WaitingService.error(res.message);
                        $scope.page_loading = false;
                    }
                );
            };
            $scope.initializeFn();

            $scope.saveFn = function () {
                WaitingService.begin();
                $scope.page_working = true;
                $scope.save_working = true;
                $http({
                    method: 'POST',
                    url: '/app/email-template/' + ($scope.object.id ? 'update' : 'save'),
                    data: jQuery.param($scope.object),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).success(
                    function (res) {
                        if (res.success) {
                            if (parseInt($scope.object.id) > 0) {
                                $state.go('app.email-template.list');
                            } else {
                                // Redirect to edit page
                                if (angular.isDefined(res.id) && !isNaN(res.id)) {
                                    $state.go('app.email-template.edit', {id: parseInt(res.id)});
                                } else {
                                    $state.go('app.email-template.list');
                                }
                            }
                        } else {
                            var msg = res.msg + "<br/>";
                            if (($.isArray(res.detail) && res.detail.length > 0) || ($.isPlainObject(res.detail) && Object.keys(res.detail).length > 0)) {
                                for (var o in res.detail) {
                                    msg += res.detail[o] + "<br/>";
                                }
                            }
                            WaitingService.error(msg);
                        }
                        WaitingService.end();
                        $scope.page_working = false;
                        $scope.save_working = false;
                    }
                ).error(
                    function (res) {
                        WaitingService.end();
                        WaitingService.error(res.message, function () {
                            $scope.page_working = false;
                            $scope.save_working = false;
                        });
                    }
                );
            }; // End save function

            $scope.deleteFn = function (id) {
                $scope.page_working = true;
                WaitingService.questionSimple('Are you sure want DELETE this email template?',
                    function () {
                        $http({
                            method: 'DELETE',
                            url: '/app/email-template/delete',
                            data: jQuery.param({id: id}),
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        }).success(function (res) {
                            if (res.success) {
                                $state.go('app.email-template.list');
                            } else {
                                var msg = res.msg + "<br/>";
                                if (($.isArray(res.detail) && res.detail.length > 0) || ($.isPlainObject(res.detail) && Object.keys(res.detail).length > 0)) {
                                    for (var o in res.detail) {
                                        msg += res.detail[o] + "<br/>";
                                    }
                                }
                                WaitingService.error(msg, function () {
                                    $scope.save_working = false;
                                    $scope.page_working = false;
                                });
                            }
                        });
                    }, function () {
                        $timeout(function () {
                            $scope.page_working = false;
                        }, 100);
                    });
            }; // End delete function
        }
    ]);
})();