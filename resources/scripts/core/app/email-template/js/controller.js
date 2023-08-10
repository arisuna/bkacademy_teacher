/**
 * Created on dd/mm/yyyy.
 */
(function () {
    'use strict';
    App.controller('EmailTemplateListController', ['$scope', '$http', '$timeout', 'ngDialog', 'urlBase', 'WaitingService', 'AppEmailTemplateService',
        function ($scope, $http, $timeout, ngDialog, urlBase, WaitingService, AppEmailTemplateService) {
            $scope.isLoading = false;
            $scope.isInitialLoading = true;
            $scope.items = [];
            $scope.query = null

            $scope.module_name = 'email_template';

            $scope.column_array = []

            $scope.getListFn = function () {
                $scope.items = [];

                AppEmailTemplateService.getList({
                    query: $scope.query
                }).then(function (res) {
                    if (res.success) {
                        $scope.items = res.data;
                    } else {
                        WaitingService.error(res.msg);
                    }
                    $scope.isLoading = false;
                    $scope.isInitialLoading = false;
                }, function (res) {
                    WaitingService.error(res.message);
                    $scope.isLoading = false;
                    $scope.isInitialLoading = false;
                })
            };
            $scope.getListFn();

            $scope.openCreateDialog = function () {
                let createDialog = ngDialog.open({
                    template: urlBase.tplApp('app', 'email-template', 'create.dialog'),
                    className: 'ngdialog-theme-default sm-box',
                    controller: 'EmailTemplateCreateController',
                    scope: $scope,
                    closeByDocument: false,
                });

                createDialog.closePromise.then(function (dialogData) {
                    if (angular.isDefined(dialogData.value)) {
                        if (angular.isDefined(dialogData.value.id) && dialogData.value.id > 0) {
                            $scope.isLoading = true;
                            $scope.getListFn();
                        }
                    }
                });
            };

            $scope.openDetailEmailTemplate = function (emailTemplate) {
                console.log("emailTemplate", emailTemplate)
                let viewDialog = ngDialog.open({
                    template: urlBase.tplApp('app', 'email-template', 'view.dialog', '_=' + Math.random()),
                    className: 'ngdialog-theme-default ngdialog-theme-full-screen w-100 pt0 pb0',
                    scope: $scope,
                    closeByDocument: false,
                    showClose: false,
                    closeByEscape: false,
                    resolve: {
                        emailTemplate: ['AppEmailTemplateService', 'WaitingService', function (AppEmailTemplateService, WaitingService) {
                            WaitingService.begin();
                            return AppEmailTemplateService.get(emailTemplate.id).then(function (res) {
                                if (res.success == true) {
                                    WaitingService.end();
                                    return res.data;
                                } else {
                                    WaitingService.end();
                                    throw new Error('DATA_NOT_FOUND');
                                }
                            }, function () {
                                WaitingService.end();
                                throw new Error('DATA_NOT_FOUND');
                            })
                        }],
                    },
                    controller: 'EmailTemplateViewController',
                });

                viewDialog.closePromise.then(function (dialogData) {
                    if (angular.isDefined(dialogData.value)) {
                        if (angular.isDefined(dialogData.value.id) && dialogData.value.id > 0) {
                            $scope.isLoading = true;
                            $scope.getListFn();
                        }
                    }
                });
            };

            $scope.deleteFn = function (template) {
                WaitingService.questionSimple('Are you sure want DELETE this email template?',
                    function () {
                        AppEmailTemplateService.delete(template).then(function (res) {
                            if (res.success) {
                                _.remove($scope.items, function (o) {
                                    return o.id == template.id;
                                });
                            } else {
                                WaitingService.error(res.message);
                            }
                        })
                    }
                );
            };

            $scope.subscribe('text_search_' + $scope.module_name, function (data) {
                angular.element('.scroll-append').scrollTop(0);
                $scope.query = data;
                $scope.isLoading = true;
                $scope.getListFn();
            });
        }]);

})();