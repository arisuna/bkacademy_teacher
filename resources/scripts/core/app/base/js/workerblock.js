/**
 * Created by anmeo on 10/11/16.
 */

(function () {
    'use strict';
    angular
        .module('app.sidebar')
        .controller('SidebarWorkerBlockController', SidebarWorkerBlockController);

    SidebarWorkerBlockController.$inject = ['$scope'];
    function SidebarWorkerBlockController($scope) {

        activate();

        ////////////////

        function activate() {

            $scope.userBlockVisible = false;

            var detach = $scope.$on('toggleUserBlock', function (/*event, args*/) {
                $scope.userBlockVisible = !$scope.userBlockVisible;
            });

            $scope.$on('$destroy', detach);
        }
    }
})();