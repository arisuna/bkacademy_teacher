/**
 * Created on dd/mm/yyyy.
 */

(function () {
    'use strict';

    App.controller('AppProfileMenuController', [ '$rootScope', '$scope','AppAuthService', 'ngDialog', 'urlBase',
        function ($rootScope, $scope, AppAuthService, ngDialog, urlBase) {
            $scope.user = AppAuthService.getUser();
            $scope.user.avatar_url = AppAuthService.getAvatarUrl();
            $scope.company = AppAuthService.getCompany();

            $scope.openLeftDialog = function($event){
                let dialog = ngDialog.open({
                    template: urlBase.tplApp('app', 'base', 'profile-dialog'),
                    className: 'ngdialog-theme-left-box lg-box ng-dialog-btn-close-dark-blue left-60',
                    data: {
                        user: $scope.user,
                    },
                    controller: ['$scope', '$element', '$timeout', 'WaitingService', '$state', 'AppDataService', 'AppAuthService',
                        function ($scope, $element, $timeout, WaitingService, $state, AppDataService, AppAuthService) {
                            $scope.user = $scope.ngDialogData.user;

                            $scope.saveFn = function(){
                                AppDataService.updateMyProfile($scope.user).then(function(res) {
                                    if(res.data){
                                        AppAuthService.setUser($scope.user);
                                        WaitingService.popSuccess(res.message);
                                        $scope.closeThisDialog();
                                    }else{
                                        WaitingService.popError(res.message);
                                    }
                                })
                            }
                        }]
                });
            }


            $scope.showDropDown = function() {
                $('#userAccessTrigger').trigger('click');
                $('#userAccessMenu').show();
            }

            $scope.hideDropDown = function() {
                $('#userAccessMenu').hide();
            }

        }
    ]);
})();