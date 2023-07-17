/**
 * Created by anmeo on 10/11/16.
 */

(function () {
    'use strict';
    angular
        .module('app.sidebar')
        .controller('UserBlockController', UserBlockController);

    UserBlockController.$inject = ['$scope'];
    function UserBlockController($scope) {

        activate();

        ////////////////

        function activate() {

            $scope.userBlockVisible = true;

            var detach = $scope.$on('toggleUserBlock', function (/*event, args*/) {
                $scope.userBlockVisible = !$scope.userBlockVisible;
            });

            $scope.$on('$destroy', detach);
        }
    }
})();