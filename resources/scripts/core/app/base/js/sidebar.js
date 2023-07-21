/**
 * Created by anmeo on 10/11/16.
 */

(function () {
    'use strict';
    angular
        .module('app.sidebar')
        .controller('SidebarController', SidebarController);

    SidebarController.$inject = ['$rootScope', '$scope', '$state', 'SidebarLoader', 'Utils', '$http', 'ngDialog', 'RouteHelpers','$stateParams','AppAuthService'];
    function SidebarController($rootScope, $scope, $state, SidebarLoader, Utils, $http, ngDialog, helper, $stateParams, AppAuthService) {

        if( !$rootScope.defaultMenuItems || angular.isUndefined( $rootScope.defaultMenuItems ) ){
            $rootScope.defaultMenuItems = AppAuthService.getMenuItems();
        }

        activate();

        $scope.$watch(function () {
            if (angular.isDefined($state.params.leftSidebarColor)) {
                $rootScope.leftSidebarColor = $state.params.leftSidebarColor;
            }
            else {
                $rootScope.leftSidebarColor = '';
            }
            return $state.params.sideBar;
        }, function () {
            activate();
        }, true);

        /**
         *  activated menu
         */
        function activate() {

            $rootScope.leftSidebarColor = '';
            var collapseList = [];

            // demo: when switch from collapse to hover, close all items
            var watchOff1 = $rootScope.$watch('app.layout.asideHover', function(oldVal, newVal){
                if ( newVal === false && oldVal === true) {
                    closeAllBut(-1);
                }
            });


            // Load menu from json file
            // -----------------------------------
            function sidebarReady(items) {
                $scope.sideMenuItems2 = items;
            }

            // Check load menu by custom
            if (angular.isDefined($state.params.sideBar) && $state.params.sideBar != '') {
                $scope.sideMenuItems2 = [];
                if( typeof $state.params.sideBar  == 'string' ) {
                    switch ($state.params.sideBar) {
                        default:
                            var menuJsonUrl = $state.params.sideBar + '?v=' + (new Date().getTime());
                            SidebarLoader.getMenu(menuJsonUrl, sidebarReady);
                            break;
                    }
                }else if( typeof $state.params.sideBar  == 'array' ) {
                    sidebarReady($state.params.sideBar);
                }
            } else {
                // Main menu


                var menuJson = '/app/menu/base.json?v=' + (new Date().getTime());
                SidebarLoader.getMenu(menuJson, sidebarReady);
            }



            // Handle sidebar and collapse items
            // ----------------------------------

            $scope.getMenuItemPropClasses = function (item) {
                return (item.heading ? 'nav-heading' : '') +
                    (isActive(item) ? ' active' : '') + ((item.info_class) ? (' ' + item.info_class) : '');
            };

            $scope.addCollapse = function ($index, item) {
                collapseList[$index] = $rootScope.app.layout.asideHover ? true : !isActive(item);
            };

            $scope.isCollapse = function($index) {
                return (collapseList[$index]);
            };

            $scope.toggleCollapse = function($index, isParentItem) {

                // collapsed sidebar doesn't toggle drodopwn
                if((typeof Utils.isSidebarCollapsed == 'function' && Utils.isSidebarCollapsed()) || $rootScope.app.layout.asideHover ) return true;

                // make sure the item index exists
                if( angular.isDefined( collapseList[$index] ) ) {
                    if ( ! $scope.lastEventFromChild ) {
                        collapseList[$index] = !collapseList[$index];
                        closeAllBut($index);
                    }
                }
                else if ( isParentItem ) {
                    closeAllBut(-1);
                }

                $scope.lastEventFromChild = isChild($index);

                return true;

            };

            // Controller helpers
            // -----------------------------------

            // Check item and children active state
            function isActive(item) {

                if (!item) return;

                if (!item.sref || item.sref === '#') {
                    var foundActive = false;
                    angular.forEach(item.submenu, function (value) {
                        if (isActive(value)) foundActive = true;
                    });
                    return foundActive;
                }
                else
                    return $state.is(item.sref) || $state.includes(item.sref);
            }

            function closeAllBut(index) {
                index += '';
                for (var i in collapseList) {
                    if (index < 0 || index.indexOf(i) < 0)
                        collapseList[i] = true;
                }
            }

            function isChild($index) {
                /*jshint -W018*/
                return (typeof $index === 'string') && !($index.indexOf('-') < 0);
            }

            $scope.$on('$destroy', function () {
                watchOff1();
            });



        } // activate
    }

})();
