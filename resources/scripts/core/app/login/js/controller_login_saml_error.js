/**
 * Created on dd/mm/yyyy.
 */

(function () {
    'use strict';

    App.controller('SamlInvalidController', ['$scope', '$stateParams', '$rootScope', '$timeout', '$http', '$state', '$window',
        '$translate', 'WaitingService', 'DataService', 'Utils',
        function ($scope, $stateParams, $rootScope, $timeout, $http, $state, $window, $translate, WaitingService, DataService, Utils) {

            $scope.gotoLoginFn = function () {
                $state.go('login.auth');
            };

            //detected IE browser
            if (Utils.checkBrowser()) {
                $window.location.href = '/#/browser-detected';
            }
    }]);

})();
