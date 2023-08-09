(function () {
    'use strict';

    App.controller('EmailTemplateCreateController', ['$scope', '$http', '$stateParams', '$state', '$timeout', 'ngDialog', 'urlBase', 'WaitingService', 'AppEmailTemplateService',
        function ($scope, $http, $stateParams, $state, $timeout, ngDialog, urlBase, WaitingService, AppEmailTemplateService) {

            $scope.emailTemplate = {
                name: null, description: null
            };

            $scope.saveFn = function () {
                WaitingService.begin();
                AppEmailTemplateService.create($scope.emailTemplate).then(function (res) {
                    if (res.success) {
                        $scope.closeThisDialog(res.data)
                    } else {
                        WaitingService.expire(res);
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