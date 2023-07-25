/**
 * Created on dd/mm/yyyy.
 */

(function () {
    'use strict';


    App.controller('DashboardController', ['$q', '$scope', '$http', '$state', '$window', 'SidebarLoader', '$rootScope', '$translate', '$timeout', 'AppDataService',
        'AppAclService', 'urlBase', 'AppAuthService', 'ngDialog',  'WaitingService', 
        function ($q, $scope, $http, $state, $window, SidebarLoader, $rootScope, $translate, $timeout, AppDataService,
                  AppAclService, urlBase, AppAuthService, ngDialog,  WaitingService) {
            WaitingService.end();

            $scope.myCompany = AppAuthService.getCompany();
            $scope.currentUser = AppAuthService.getUser();
        }]);

})();
