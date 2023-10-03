/**
 * Created on dd/mm/yyyy.
 */
(function () {
    'use strict';

    App.controller('EmailTemplateViewController', ['$scope', '$http', '$stateParams', '$state', '$timeout', 'ngDialog', 'urlBase', 'AppSystem', 'WaitingService', 'AppEmailTemplateService', 'emailTemplate',
        function ($scope, $http, $stateParams, $state, $timeout, ngDialog, urlBase, AppSystem, WaitingService, AppEmailTemplateService, emailTemplate) {
            $scope.page_loading = true;
            $scope.emailTemplate = emailTemplate;
            $scope.languages = AppSystem.getLanguages();
            $scope.current_language = AppSystem.getCurrentLanguage();

            console.log("$scope.emailTemplate.items", $scope.emailTemplate.items, $scope.languages)

            if (angular.isUndefined($scope.emailTemplate.items) || $scope.emailTemplate.items == null) {
                $scope.emailTemplate.items = [];
                angular.forEach($scope.languages, function (language) {
                    console.log('language', language.name)
                    $scope.emailTemplate.items.push({
                        id: null,
                        subject: null,
                        text: null,
                        language: language.name
                    });
                })
            }

            $scope.saveFn = function () {
                console.log($scope.emailTemplate);
                WaitingService.questionSimple('Do you want update content of this email template', function () {
                    WaitingService.begin();
                    AppEmailTemplateService.update($scope.emailTemplate).then(function (res) {
                        if (res.success) {

                            WaitingService.popSuccess(res.message);
                            $scope.closeThisDialog($scope.emailTemplate);
                        } else {
                            WaitingService.expire(res);
                        }
                    }, function (err) {
                        WaitingService.expire(err);
                    });
                })
            };

            $scope.getLangName = function (code) {
                // console.log($scope.languages[code])
                return angular.isDefined($scope.languages[code]) ? $scope.languages[code].description : "";
            }

            $scope.close = function () {
                $scope.closeThisDialog();
                // $state.go('app.email-template.list');
            };

        }
    ]);
})();