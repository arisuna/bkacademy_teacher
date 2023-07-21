/**
 * Created on dd/mm/yyyy.
 */

(function () {
    'use strict';

    App.controller('AppProfileMenuController', [ '$rootScope', '$scope','AppAuthService',
        function ($rootScope, $scope, AppAuthService ) {
            $scope.user = AppAuthService.getUser();
            $scope.user.avatar_url = AppAuthService.getAvatarUrl();
            $scope.company = AppAuthService.getCompany();

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