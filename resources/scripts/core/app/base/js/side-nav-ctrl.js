/**
 * Created on dd/mm/yyyy.
 */

(function () {
    'use strict';

    App.controller('sideNavCtrl', ['$rootScope', '$scope', 'sideNavFactory', '$timeout', '$translate', 'AppAuthService', 'AppDataService', 'WaitingService', '$state',
        function ($rootScope, $scope, sideNavFactory, $timeout, $translate, AppAuthService, AppDataService, WaitingService, $state) {

            $scope.getTheme = function () {
                $scope.company = AppAuthService.getCompany();
                if (angular.isDefined($scope.company.theme) && angular.isDefined($scope.company.theme.id)) {
                    $scope.theme = $scope.company.theme;
                } else {
                    $scope.theme = {
                        main_color: '#0A142B',
                        logo_url: '/app/assets/img/logo.png',
                        icon_url: '/app/assets/img/logo-single.png',
                        secondary_color: '#0098FF'
                    };
                }

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
                $('.has-children').removeClass('dropdown-menu-visible');

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

            $scope.removeDropdown = function(event, sref){
                event.preventDefault();
                event.stopPropagation();
                $('.has-children').removeClass('dropdown-menu-visible');
                $state.go(sref);

            }


            function setNavStyle() {

                if ($('#relo-ver-nav-header').height() + $('#relo-nav-top').height() + $('#relo-nav-bottom').height() + 30 >= $(window).height()) {
                    $('#relo-nav-bottom').removeClass('relo-nav-bottom');
                } else {
                    $('#relo-nav-bottom').addClass('relo-nav-bottom');
                }
            }

            $scope.changeLanguage = function (language) {
                WaitingService.begin();
                AppDataService.changeLanguage(language).then(
                    function (res) {
                        WaitingService.end();
                        if (res.success) {
                            if (!angular.isObject($rootScope.setting.language)) {
                                $rootScope.setting.language = {};
                            }
                            $translate.use(language);
                            WaitingService.popSuccess('SAVE_LANGUAGE_SUCCESS_TEXT');
                        } else {
                            WaitingService.error(res.message);
                        }
                    },
                    function (err) {
                        console.info('err', err);
                        WaitingService.expire();
                    }
                )
            };

        }
    ]);

    App.factory('sideNavFactory', function ($http, $q, AppAclService) {

        let service = {
            menuItems: [
                {
                    "text": "DASHBOARD_TEXT",
                    "sref": "app.dashboard",
                    "icon": "fa-solid fa-gauge",
                    "iconType": "fontawesome",
                    "appAclAllow": "dashboard/index",
                    "aclRemove": true,
                    "class": "",
                    "controller": ""
                },
                {
                    "text": "LESSON_TEXT",
                    "sref": "app.lesson.list",
                    "icon": "fa-solid fa-person-chalkboard",
                    "iconType": "fontawesome",
                    "gmsAclAllow": "lesson/index",
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
                },
                {
                    "text": "MORE_TEXT",
                    "icon": "fa-solid fa-ellipsis",
                    "iconType": "fontawesome",
                    "noRender": !(AppAclService.validateAction('classroom', 'index')) && !(AppAclService.validateAction('student', 'index')),
                    "aclRemove": false,
                    "hasChild": true,
                    "class": "",
                    "items": [
                        {
                            "text": "STUDENTS_TEXT",
                            "sref": "app.student.list",
                            "appAclAllow": "student/index",
                            "aclRemove": true,
                        },
                        {
                            "text": "CLASSROOM_TEXT",
                            "sref": "app.classroom.list",
                            "appAclAllow": "classroom/index",
                            "aclRemove": true,
                        }
                    ]
                }
            ]
        };

        service.getSideNavItems = function () {
            return service.menuItems;
        }

        return service;
    });

})();
