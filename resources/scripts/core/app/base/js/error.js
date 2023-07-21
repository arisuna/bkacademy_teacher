/**
 * Created on dd/mm/yyyy.
 */

(function () {
    'use strict';

    App.controller('AppErrorController', ['$scope', '$timeout', '$state', '$translate', 'AppDataService', 'WaitingService', 'AppAuthService', 'GmsSubscriptionService', 'urlBase',
        function ($scope, $timeout, $state, $translate, AppDataService, WaitingService, AppAuthService, GmsSubscriptionService, urlBase) {

            GmsSubscriptionService.checkSubcription();

            $scope.goPlanPremium = function () {
                $state.go('app.subscription.dashboard');
            };

        }
    ]);
})();
