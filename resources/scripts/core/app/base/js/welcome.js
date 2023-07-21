/**
 * Created on dd/mm/yyyy.
 */

(function () {
    'use strict';

    App.controller('WelcomeMessageController', ['$scope', '$timeout', 'ngDialog', 'urlBase', 'AppDataService', 'WaitingService', 'GmsTaskDialogService', 'AppAuthService',
        function ($scope, $timeout, ngDialog, urlBase, AppDataService, WaitingService, GmsTaskDialogService, AppAuthService) {
            $scope.userprofile = AppAuthService.getUser();
            $scope.addTaskDialog = function () {
                GmsTaskDialogService.addTask();
            }

            $scope.checkAppSetting = function(){
                $scope.company = AppAuthService.getCompany();
                console.log($scope.company);
                if(angular.isUndefined($scope.company.language) || $scope.company.language == null || $scope.company.language == "" ||
                    angular.isUndefined($scope.company.timezone_id) || $scope.company.timezone_id == null || $scope.company.timezone_id == "" ||
                    angular.isUndefined($scope.company.currency_code) || $scope.company.currency_code == null || $scope.company.currency_code == "" ||
                    angular.isUndefined($scope.company.date_format) || $scope.company.date_format == null || $scope.company.date_format == ""){
                    let settingModal = ngDialog.open({
                        template: urlBase.tplApp('gms', 'my-company', 'setting_dialog', '_=' + Math.random()),
                        className: 'ngdialog-theme-default md-box',
                        scope: $scope,
                        closeByDocument: false,
                        showClose: false
                    });
                }
            }
            $scope.checkAppSetting();
        }
    ]);
})();
