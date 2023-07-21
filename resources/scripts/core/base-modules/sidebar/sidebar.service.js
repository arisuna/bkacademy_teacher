(function() {
    'use strict';

    angular
        .module('app.sidebar')
        .service('SidebarLoader', SidebarLoader);

    SidebarLoader.$inject = ['$http', '$timeout'];
    function SidebarLoader($http, $timeout) {
        this.getMenu = getMenu;

        ////////////////

        function getMenu(url, onReady, onError) {

          onError = onError || function() { console.log('Failure loading menu'); };

          $http
            .get(url)
            .success(onReady)
            .error(onError);
        }
    }
})();