(function () {
    'use strict';

    angular
        .module('app.app-components')
        .component('appRoot', {
            bindings: {},
            styleUrls: ['/app/assets/css/app.css'],
            controller: function ($rootScope, $filter, ngDialog, urlBase, $scope) {
                let vm = this;

                vm.theme = {
                    main_color: '#0A142B',
                    logo_url: '/app/assets/img/logo.png',
                    icon_url: '/app/assets/img/logo-single.png',
                    secondary_color: '#0098FF'
                };

                vm.changeTheme = function () {
                    document.documentElement.style.setProperty('--main-color', vm.theme.main_color);
                    document.documentElement.style.setProperty('--secondary-color', vm.theme.secondary_color);
                    // console.log('set color');
                };

                vm.changeTheme();

                $scope.$on("change_theme", function (ev) {
                    console.log('set color from broadcast');
                    vm.changeTheme();
                })

            }
        });
})();


