(function () {
    'use strict';

    App.controller('AppController', [
        '$rootScope', '$scope', '$localStorage', '$timeout', 'ngDialog', '$http', '$window', '$document',
        '$state', '$translate', '$translatePartialLoader', '$location', '$anchorScroll', 'toaster',
        'AppSystem', 'AppAuthService', 'urlBase', 'AppAclService',
        'uibPaginationConfig', 'DTDefaultOptions', '__env',
        function ($rootScope, $scope, $localStorage, $timeout, ngDialog, $http, $window, $document,
                  $state, $translate, $translatePartialLoader, $location, $anchorScroll, toaster,
                  AppSystem, AppAuthService, urlBase, AppAclService,
                  uibPaginationConfig, DTDefaultOptions, __env) {
            /**
             * [ACL REQUIRED]
             * @type {Object}
             */

            $rootScope.AppAclService = AppAclService;
            $rootScope.acl = {};
            $rootScope.cachedTemplate = true;
            $rootScope.countries = [];
            $rootScope.currencies = [];
            $rootScope.constants = [];
            $rootScope.attributes = [];
            $rootScope.zone_langes = [];
            $rootScope.user_groups = [];
            $rootScope.app.topMenuUrl = urlBase.tplApp('app', 'base', 'menu');
            $rootScope.app.breadcrumb = urlBase.tplApp('app', 'base', 'breadcrumb');
            $rootScope.svp_user_groups = [];
            $rootScope._token = localStorage.getItem('token_key');
            $rootScope.isEmployeeAvailable = false;
            $rootScope.baseEmployee = {};
            $rootScope.state_loading = false;

            // window.document.title = AppAuthService.getCompany().name;

            //$rootScope.app.layout.showSideNav2 = true;
            //$rootScope.app.layout.openSideNav2 = true;
            //$rootScope.showSideNav2 = true;
            //$rootScope.openSideNav2 = true;

            $rootScope.dataTableConfig = function () {
                $.extend($.fn.dataTableExt.oSort, {
                    'string-uuid-asc': function (a, b) {
                        return a.localeCompare(b, undefined, {numeric: true, sensitivity: 'base'});
                    },

                    'string-uuid-desc': function (a, b) {
                        return b.localeCompare(a, undefined, {numeric: true, sensitivity: 'base'});
                    }
                });

                $rootScope.defaultTranslateValueForSearch = 'SEARCH_BTN_TEXT';


                $rootScope.currentDTInstance = {};
                $rootScope.dtInstanceCallback = function (dtInstance) {
                    $rootScope.currentDTInstance = dtInstance;
                };

                $rootScope.$on('$translateChangeSuccess', function () {
                    // Sure that title has been translated
                    if ($rootScope.defaultTranslateValueForSearch != $translate.instant('SEARCH_BTN_TEXT')) {
                        $rootScope.reloadInitDatatable();
                        if (typeof $rootScope.currentDTInstance.rerender == 'function') {
                            $rootScope.currentDTInstance.rerender();
                        }
                    }

                    uibPaginationConfig.previousText = $translate.instant('PREVIOUS_BTN_TEXT');
                    uibPaginationConfig.nextText = $translate.instant('NEXT_BTN_TEXT');
                    uibPaginationConfig.firstText = $translate.instant('FIRST_BTN_TEXT');
                    uibPaginationConfig.lastText = $translate.instant('LAST_BTN_TEXT');
                });
            }

            $rootScope.reloadInitDatatable = function () {
                $rootScope.datatableOptionLang = {
                    "sSearch": '<em class="fa fa-search"></em> ' + $translate.instant('SEARCH_BTN_TEXT') + ':',
                    "sLengthMenu": '_MENU_ ' + $translate.instant('RECORD_PER_PAGE_TEXT'),
                    "sInfo": $translate.instant('SHOW_PAGE_TEXT') + ' _PAGE_ ' + $translate.instant('OF_TEXT') + ' _PAGES_',
                    "sZeroRecords": $translate.instant('DATA_NOT_FOUND_TEXT'),
                    "sInfoEmpty": $translate.instant('NO_RECORD_AVAILABLE_TEXT'),
                    "sEmptyTable": $translate.instant('NO_DATA_AVAILABLE_TEXT'),
                    "sInfoFiltered": '(' + $translate.instant('FILTER_FROM_TEXT') + ' _MAX_ ' + $translate.instant('TOTAL_RECORD_TEXT') + ')',
                    "oPaginate": {
                        "sPrevious": '<em class="fa fa-angle-left mr-sm"></em> ' + $translate.instant('PREVIOUS_BTN_TEXT'),
                        "sNext": $translate.instant('NEXT_BTN_TEXT') + ' <em class="fa fa-angle-right ml-sm"></em>'
                    }
                };
                DTDefaultOptions
                    .setDisplayLength(25)
                    .setLanguage(
                        $rootScope.datatableOptionLang
                    );
            };

            $rootScope.dataTableConfig();
            $rootScope.reloadInitDatatable();

            /**
             * Check size of object in view
             * @param obj
             * @returns {Number}
             */
            $rootScope.sizeOfObject = function (obj) {
                return Object.keys(obj).length;
            };

            /**
             * Handle hash linking
             * @param id
             */
            $scope.scrollTo = function (id) {
                $location.hash(id);
                $anchorScroll();
            };

            $translatePartialLoader.addPart('app');
            $translate.refresh();

            /**
             * Right Sidebar & Left sidebar
             */

            $scope.checkParamsMenu = function () {

                $rootScope.hasRightBar = false;
                $rootScope.hasLeftBar = true;

                if (angular.isDefined($state.params.hasRightBar)) {
                    $rootScope.hasRightBar = $state.params.hasRightBar;
                }

                if (angular.isDefined($state.params.hasLeftBar)) {
                    $rootScope.hasLeftBar = $state.params.hasLeftBar;
                }

                if (angular.isDefined($state.params.noPadding)) {
                    $rootScope.noPadding = $state.params.noPadding;
                } else {
                    $rootScope.noPadding = false;
                }

                if (angular.isDefined($state.params.hasEmployeeLeftBlock)) {
                    if ($state.params.hasEmployeeLeftBlock == true) {
                        $rootScope.hasEmployeeLeftBlock = true;
                    } else {
                        $rootScope.hasEmployeeLeftBlock = false;
                    }
                } else {
                    $rootScope.hasEmployeeLeftBlock = false;
                }

                if (angular.isDefined($state.params.hasWorkerLeftBlock)) {
                    if ($state.params.hasWorkerLeftBlock == true) {
                        $rootScope.hasWorkerLeftBlock = true;
                    } else {
                        $rootScope.hasWorkerLeftBlock = false;
                    }
                } else {
                    $rootScope.hasWorkerLeftBlock = false;
                }

                if (angular.isDefined($state.params.hasEmployeeAvatarBlock)) {
                    if ($state.params.hasEmployeeAvatarBlock == true) {
                        $rootScope.hasEmployeeAvatarBlock = true;
                    } else {
                        $rootScope.hasEmployeeAvatarBlock = false;
                    }
                } else {
                    $rootScope.hasEmployeeAvatarBlock = false;
                }

                if (angular.isDefined($state.params.hasCommunicationLeftBlock)) {
                    if ($state.params.hasCommunicationLeftBlock == true) {
                        $rootScope.hasCommunicationLeftBlock = true;
                    } else {
                        $rootScope.hasCommunicationLeftBlock = false;
                    }
                } else {
                    $rootScope.hasCommunicationLeftBlock = false;
                }

                if (angular.isDefined($state.params.hasOldCommunicationLeftBlock)) {
                    if ($state.params.hasOldCommunicationLeftBlock == true) {
                        $rootScope.hasOldCommunicationLeftBlock = true;
                    } else {
                        $rootScope.hasOldCommunicationLeftBlock = false;
                    }
                } else {
                    $rootScope.hasOldCommunicationLeftBlock = false;
                }

                if (angular.isDefined($state.params.hasTasksLeftBlock)) {
                    if ($state.params.hasTasksLeftBlock == true) {
                        $rootScope.hasTasksLeftBlock = true;
                    } else {
                        $rootScope.hasTasksLeftBlock = false;
                    }
                } else {
                    $rootScope.hasTasksLeftBlock = false;
                }

                if (angular.isDefined($state.params.hasInvoicingLeftBlock)) {
                    if ($state.params.hasInvoicingLeftBlock == true) {
                        $rootScope.hasInvoicingLeftBlock = true;
                    } else {
                        $rootScope.hasInvoicingLeftBlock = false;
                    }
                } else {
                    $rootScope.hasInvoicingLeftBlock = false;
                }


                if (angular.isDefined($state.params.hasWorkerLeftBlock)) {
                    if ($state.params.hasWorkerLeftBlock == true) {
                        $rootScope.hasWorkerLeftBlock = true;
                    } else {
                        $rootScope.hasWorkerLeftBlock = false;
                    }
                } else {
                    $rootScope.hasWorkerLeftBlock = false;
                }

                if (angular.isDefined($state.params.showGlobalMenu)) {
                    if ($state.params.showGlobalMenu == true) {
                        $rootScope.showGlobalMenu = true;
                    } else {
                        $rootScope.showGlobalMenu = false;
                    }
                } else {
                    $rootScope.showGlobalMenu = true;
                }

                if (angular.isDefined($state.params.hasServiceMenu)) {
                    if ($state.params.hasServiceMenu == true) {
                        $rootScope.hasServiceMenu = true;
                    } else {
                        $rootScope.hasServiceMenu = false;
                    }
                } else {
                    $rootScope.hasServiceMenu = false;
                }

                // show side navigation second on page per state router
                if (!angular.isDefined($state.params.showSideNav2) || $state.params.showSideNav2 == false) {
                    $rootScope.app.layout.showSideNav2 = false;
                } else {
                    $rootScope.app.layout.showSideNav2 = true;
                }

                if (!angular.isDefined($state.params.openSideNav2) || $state.params.openSideNav2 == false) {
                    $rootScope.app.layout.openSideNav2 = false;
                } else {
                    $rootScope.app.layout.openSideNav2 = true;
                }

                if (angular.isDefined($state.params.iconSideNav2) && _.isString($state.params.iconSideNav2)) {
                    $rootScope.app.layout.iconSideNav2 = $state.params.iconSideNav2;
                } else {
                    $rootScope.app.layout.iconSideNav2 = 'cog';//Admin page
                }

                if (!angular.isDefined($state.params.templateSideNav2) || $state.params.templateSideNav2 != '') {
                    if (angular.isString($state.params.templateSideNav2)) {
                        $rootScope.app.layout.templateSideNav2 = $state.params.templateSideNav2;
                    }
                } else {
                    $rootScope.app.layout.templateSideNav2 = null;
                }


                //console.info('app.layout.templateSideNav2', $rootScope.app.layout.templateSideNav2);

                // show side navigation second on page per state router
                if (!angular.isDefined($state.params.overflowDisable) || $state.params.overflowDisable == false) {
                    $rootScope.app.layout.overflowDisable = false;
                } else {
                    $rootScope.app.layout.overflowDisable = true;
                }

                if (!angular.isDefined($state.params.topButtons) || $state.params.topButtons.length === 0) {
                    $rootScope.app.layout.topButtons = null;
                } else {
                    $rootScope.app.layout.topButtons = $state.params.topButtons;
                }
            }

            $scope.checkParamsMenu();

            $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                $scope.checkParamsMenu();
                $scope.checkAppCues();
            });

            $scope.checkAppCues = function () {
                var user = AppAuthService.getUser();
                var company = AppAuthService.getCompany();

                if (typeof Appcues != 'undefined' && angular.isDefined(Appcues)) {
                    Appcues.identify(user.uuid, {
                        name: user.firstname + ' ' + user.lastname,
                        email: user.workemail,
                        created_at: user.created_at
                        // Additional user properties.
                    });

                }
            }

            $scope.storage = new CrossStorageClient(__env.hubCrossDomain, {
                timeout: 30000,
                frameId: 'storageFrame'
            });

            $scope.storage.onConnect().then(function () {
                let redirectUrl = $window.location.origin + "/app/#/app/admin-page/communication-setting/accounts";
                return $scope.storage.set('redirect_url', redirectUrl);
            }).catch(function (err) {
                console.info('cross storage error', err);
                console.log(__env.hubCrossDomain);
            });


            $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
                var isClearLocalStorage = false;

                if(toState.name === 'app.svp-companies.list' || fromState.name === 'app.svp-companies.view' || toState.name === 'app.svp-companies.view'){
                    isClearLocalStorage = false;
                }else{
                    isClearLocalStorage = true;
                }

                if(isClearLocalStorage === true){
                    $window.localStorage.removeItem('show_active_provider');
                }
            });
        }
    ]);

})();
