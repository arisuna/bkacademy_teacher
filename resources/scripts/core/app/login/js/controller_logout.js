/**
 * Created on dd/mm/yyyy.
 */

(function () {
    'use strict';

    App.controller('LogoutController', ['$scope', '$localStorage', '$state', '$http', '$window',

        function ($scope, $localStorage, $state, $http, $window) {
            $window.localStorage.clear();
            $state.go('login.auth');
        }]);

})();
