/**
 * Created on dd/mm/yyyy.
 */
(function () {
    'use strict';

    App.controller('EmailTemplateCreateController', ['$scope', '$http', '$stateParams', '$state', '$timeout', 'ngDialog', 'urlBase', 'AppSystem', 'WaitingService', 'AppEmailTemplateService', 'emailTemplate',
        function ($scope, $http, $stateParams, $state, $timeout, ngDialog, urlBase, AppSystem, WaitingService, AppEmailTemplateService, emailTemplate) {

            $scope.emailTemplate = {
                name: null, description: null
            };

            $scope.saveFn = function () {
                WaitingService.begin();
                AppEmailTemplateService.create($scope.emailTemplate).then(function (res) {
                    if (res.success) {
                        WaitingService.popSuccess(res.message);
                        $scope.closeThisDialog(res.data)
                    } else {
                        WaitingService.error(res.message);
                        // WaitingService.expire(res);
                    }
                    WaitingService.end();
                }, function (error) {
                    WaitingService.end();
                    WaitingService.expire(error);
                });
            }; // End save function
        }
    ]);
})();