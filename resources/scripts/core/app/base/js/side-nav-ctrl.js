/**
 * Created on dd/mm/yyyy.
 */

(function () {
    'use strict';

    App.controller('sideNavCtrl', ['$rootScope', '$scope', 'sideNavFactory', '$timeout', 'AppAuthService',
        function ($rootScope, $scope, sideNavFactory, $timeout, AppAuthService) {

            $scope.getTheme = function(){
                $scope.company = AppAuthService.getCompany();
                if(angular.isDefined($scope.company.theme) && angular.isDefined($scope.company.theme.id)) {
                    $scope.theme = $scope.company.theme;
                } else {
                    $scope.theme = {
                        main_color: '#0A142B',
                        logo_url: '/app/assets/img/logo.png',
                        icon_url: '/app/assets/img/logo-single.png',
                        secondary_color: '#0098FF'
                    };
                }
                console.log($scope.theme);

                $scope.$broadcast("change_theme");
            };

            $scope.getTheme();


            $rootScope.menuItems = sideNavFactory.getSideNavItems();

            // $timeout(function () {
            //     setNavStyle();
            // }, 1000);

            // $(window).on('load',function(){
            //     alert('asdf');
            //     setNavStyle();
            // });


            $(document).ready(function () {
                //alert('asdf');
                setNavStyle();
            });

            // $(document).on('mouseover', '.has-children', function(){
            //     let left = $(this).width();
            //     let top = $(this).offset().top - 30;
            //
            //     $(this).children('.dropdown-menu').css('top',top+'px').css('left',left+'px');
            // });

            $(document).on('click', '.has-children', function () {
                let left = $(this).width();
                let top = $(this).offset().top - 30;

                $(this).children('.dropdown-menu').css('top', top + 'px').css('left', left + 'px');
                $(this).addClass('dropdown-menu-visible');

                var that = $(this);

                $(document).on('click', removeClassDropdownVisible);

                function removeClassDropdownVisible(e) {
                    if ($(e.target).closest('.dropdown-menu-visible').length > 0) {
                        if ($(e.target).hasClass('dropdown-menu-visible')) {
                            $(e.target).removeClass('dropdown-menu-visible');
                            $(document).off('click', removeClassDropdownVisible);
                        }
                    } else if ($(e.target).hasClass('dropdown-menu')) {
                        $('.dropdown-menu-visible').removeClass('dropdown-menu-visible');
                        $(e.target).addClass('dropdown-menu-visible');
                    } else {
                        $('.dropdown-menu-visible').removeClass('dropdown-menu-visible');
                        $(document).off('click', removeClassDropdownVisible);
                    }
                }

            });

            $(window).on('resize', function () {
                setNavStyle();
            });


            function setNavStyle() {

                if ($('#relo-ver-nav-header').height() + $('#relo-nav-top').height() + $('#relo-nav-bottom').height() + 30 >= $(window).height()) {
                    $('#relo-nav-bottom').removeClass('relo-nav-bottom');
                } else {
                    $('#relo-nav-bottom').addClass('relo-nav-bottom');
                }
            }


        }
    ]);

    App.factory('sideNavFactory', function ($http, $q) {

        let service = {
            menuItems: [
                {
                    "text": "DASHBOARD_TEXT",
                    "sref": "app.dashboard",
                    "icon": "fa-solid fa-gauge",
                    "iconType": "fontawesome",
                    "gmsAclAllow": "dashboard/index",
                    "aclRemove": true,
                    "class": "",
                    "controller": ""
                },
                {
                    "text": "ASSIGNMENTS_TEXT",
                    "sref": "app.assignment.list",
                    "icon": "fa-solid fa-compass",
                    "iconType": "fontawesome",
                    "gmsAclAllow": "assignment/index",
                    "aclRemove": true,
                    "class": ""
                },
                {
                    "text": "RELOCATIONS_TEXT",
                    "sref": "app.relocation.list",
                    "icon": "fa-solid fa-plane",
                    "iconType": "fontawesome",
                    "gmsAclAllow": "relocation/index",
                    "aclRemove": true,
                    "class": ""
                },
                {
                    "text": "SERVICES_TEXT",
                    "sref": "app.relocation-service.list",
                    "icon": "fa-solid fa-puzzle-piece",
                    "iconType": "fontawesome",
                    "gmsAclAllow": "relocation-service/index",
                    "aclRemove": true,
                    "class": "side-nav-service"
                },
                {
                    "text": "TASKS_TEXT",
                    "sref": "app.tasks.list",
                    "icon": "fa-solid fa-list-check",
                    "iconType": "fontawesome",
                    "gmsAclAllow": "task/index",
                    "aclRemove": true,
                    "class": ""
                },
                {
                    "text": "INVOICING_TEXT",
                    "sref": "app.finance-page.dashboard",
                    "icon": "fa-solid fa-sack-dollar",
                    "iconType": "fontawesome",
                    "gmsAclAllow": "invoicing/index",
                    "aclRemove": true,
                    "class": ""
                },
                {
                    "text": "REPORTS_TEXT",
                    "sref": "app.report.index",
                    "icon": "fa-solid fa-chart-pie",
                    "iconType": "fontawesome",
                    "gmsAclAllow": "report/index",
                    "aclRemove": true,
                    "class": ""
                }
            ]
        };

        service.getSideNavItems = function () {
            return service.menuItems;
        }

        return service;
    });


})();
