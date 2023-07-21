/**
 * Created on dd/mm/yyyy.
 */

(function () {
    'use strict';


    App.controller('DashboardController', ['$q', '$scope', '$http', '$state', '$window', 'SidebarLoader', '$rootScope', '$translate', '$timeout', 'AppDataService',
        'AppAclService', 'urlBase', 'AppAuthService', 'ngDialog', 'GmsFilterConfigService', 'WaitingService', 'GmsDashboardService',
        function ($q, $scope, $http, $state, $window, SidebarLoader, $rootScope, $translate, $timeout, AppDataService,
                  AppAclService, urlBase, AppAuthService, ngDialog, GmsFilterConfigService, WaitingService, GmsDashboardService) {
            WaitingService.end();
            $scope.assignment_on_going_count = 0;
            $scope.assignment_ending_soon_count = 0;

            $scope.relocation_on_going_count = 0;
            $scope.relocation_ending_soon_count = 0;

            $scope.task_on_going_count = 0;
            $scope.task_todo_count = 0;

            $scope.myCompany = AppAuthService.getCompany();
            $scope.currentUser = AppAuthService.getUser();
            console.log('$scope.myCompany', $scope.myCompany);

            $scope.panel = {
                'activated_assignees': 0,
                'total_assignees': 0,
                'ongoing_assignments': 0,
                'average_services_per_relocation': 0,
                'all_relocation_active': 0,
                'all_relocation_cancel': 0,
                'requests_of_service': 0,
                'total_hr_accounts': 0,
                'invitations': 0,
                'all_questionnaire_answered': 0,
            };

            $scope.searchModules = {
                topAccount: {
                    name: 'topAccount',
                    searchConfig: {
                        created_at_period: ''
                    }
                },
                topBooker: {
                    name: 'topBooker',
                    searchConfig: {
                        created_at_period: ''
                    }
                },
                taskDue: {
                    name: 'taskDue',
                    searchConfig: {
                        created_at_period: ''
                    }
                },
                reminder: {
                    name: 'reminder',
                    searchConfig: {
                        created_at_period: ''
                    }
                },
            };

            $scope.AppAclService = AppAclService;

            $scope.templateRelocation = urlBase.tplApp('gms', 'dashboard', 'relocation');

            $scope.mapCountryUrl = urlBase.tplApp('gms', 'dashboard', 'dashboad_country_map');

            $scope.showBox1 = false;

            $scope.toggleBox1 = function () {
                $scope.showBox1 = !$scope.showBox1;
            };


            $scope.worker = $scope.user = AppAuthService.getUser();
            $scope.comparations = GmsFilterConfigService.getFilterComparations();
            $scope.aFieldKind = GmsFilterConfigService.getFilterFields();
            $scope.setListOperator = function (field) {
                return GmsFilterConfigService.setFilterListOperator(field);
            };

            $scope.setFilterConfig = function (moduleName, filter = '') {
                let data = {
                    'moduleName': moduleName,
                    'user_profile_id': $scope.user.id,
                    'company_id': $scope.user.company_id,
                    'is_admin': $scope.user.isAdmin,
                    'is_manager': false,
                    'target_active': 1,
                    'filter': filter
                };

                GmsFilterConfigService.filterConfig(data).then(function (res) {
                    if (res.data) {
                        let compilationLabel = $scope.comparations.find(filter => filter.id === res.data.operator).label;
                        let itemData = null;

                        if (moduleName === 'relocations') {
                            switch (filter) {
                                case 'FILTER_STATUS_IN_PROGRESS_TEXT':
                                    itemData = [{
                                        name: 'ONGOING_TEXT',
                                        value: 2,
                                        id: 2,
                                        color: 'blue',
                                        text: 'ONGOING_TEXT',
                                        selected: false
                                    }];
                                    break;
                                case 'FILTER_END_NEXT_MONTH_TEXT':
                                    itemData = res.data.value
                                    break;
                                default:
                                    break;
                            }
                        } else if (moduleName === "tasks") {
                            switch (filter) {
                                case 'FILTER_STATUS_IN_PROGRESS_TEXT':
                                    itemData = [{
                                        name: $translate.instant('IN_PROGRESS_TEXT'),
                                        value: 1,
                                        id: 1,
                                        color: 'blue',
                                        text: 'IN_PROGRESS_TEXT',
                                        selected: false
                                    }];
                                    break;
                                case 'FILTER_STATUS_TO_DO_TEXT':
                                    itemData = [{
                                        name: $translate.instant('TODO_TEXT'),
                                        value: 0,
                                        id: 0,
                                        color: 'yellow',
                                        text: 'TODO_TEXT',
                                        selected: false
                                    }];
                                    break;
                                default:
                                    break;
                            }
                        }

                        let dataSet = {
                            "id": res.data.id,
                            "name": res.data.name,
                            "target_active": res.data.target_active,
                            "user_profile_id": res.data.user_profile_id ? res.data.user_profile_id : 0,
                            "creator_user_profile_id": res.data.creator_user_profile_id ? res.data.creator_user_profile_id : 0,
                            "items": [{
                                "type": {
                                    "id": res.data.field_id,
                                    "name": res.data.field_name,
                                },
                                "comparation": {
                                    "id": res.data.operator,
                                    "label": compilationLabel
                                },
                                "data": itemData,
                                "kind": $scope.aFieldKind[res.data.field_name],
                                "filter_config_item_id": res.data.item_id,
                                'listOperator': $scope.setListOperator(res.data.field_name),
                                "dataSelection": !!res.data.value
                            }]
                        };

                        console.log("dataSet", dataSet)

                        GmsFilterConfigService.setFilterConfig(moduleName, $scope.user.uuid, dataSet);
                    }
                });
            };

            $scope.goToRelocations = function (filter) {
                if (!$scope.user.isAdminOrManager) {
                    return;
                }

                $scope.setFilterConfig('relocations', filter);

                $timeout(function () {
                    $state.go('app.relocation.list', {filter: filter});
                }, 1000);
            };

            $scope.goToTask = function (filter) {
                if (!$scope.user.isAdminOrManager) {
                    return;
                }

                $scope.setFilterConfig('tasks', filter);

                $timeout(function () {
                    $state.go('app.tasks.list');
                }, 1000);
            };

            $scope.initFn = function () {

                if (AppAclService.validateAction('communication', 'index')) {
                    AppDataService.checkCommunicationTokenExpired().then(function (res) {
                        if (res.success) {
                            if (res.data.length > 0) {
                                let warningModal = ngDialog.open({
                                    template: urlBase.tplApp('gms', 'communication-setting', 'warning_dialog', '_=' + Math.random()),
                                    className: 'ngdialog-theme-default sm-box',
                                    scope: $scope,
                                    closeByDocument: true,
                                    showClose: true
                                });
                            }
                        } else {
                            WaitingService.error(res.message);
                        }
                    }, function (err) {
                        WaitingService.expire(err.message);
                    });
                }
                if (AppAclService.validateAction('dashboard', 'index')) {

                    $q.all([
                        AppDataService.relocationCountEndingSoon().then(function (res) {
                            $scope.relocation_ending_soon_count = _.isNumber(res.count) ? res.count : 0;
                        }),
                        AppDataService.relocationCountOngoing().then(function (res) {
                            $scope.relocation_on_going_count = _.isNumber(res.count) ? res.count : 0;
                        }),
                        AppDataService.assignmentCountEndingSoon().then(function (res) {
                            $scope.assignment_ending_soon_count = _.isNumber(res.count) ? res.count : 0;
                        }),

                        AppDataService.taskCountOngoing().then(function (res) {
                            $scope.task_on_going_count = _.isNumber(res.count) ? res.count : 0;
                        }),

                        AppDataService.taskCountTodo().then(function (res) {
                            $scope.task_todo_count = _.isNumber(res.count) ? res.count : 0;
                        }),
                        // AppDataService.getMoreDashboardInfos().then(function (res) {
                        //     console.log('more infos', res);
                        //     $scope.panel.activated_assignees = res.data.activated_assignees;
                        //     $scope.panel.total_assignees = res.data.total_assignees;
                        //     $scope.panel.ongoing_assignments = res.data.ongoing_assignments;
                        //     $scope.panel.average_services_per_relocation = res.data.average_services_per_relocation;
                        //     $scope.panel.average_services_duration = res.data.average_services_duration;
                        //     $scope.panel.all_relocation_active = res.data.all_relocation_active;
                        //     $scope.panel.all_relocation_cancel = res.data.all_relocation_cancel;
                        //     $scope.panel.requests_of_service = res.data.requests_of_service;
                        //     $scope.panel.invitations = res.data.invitations;
                        //     $scope.panel.total_hr_accounts = res.data.total_hr_accounts;
                        //     $scope.panel.all_questionnaire_answered = res.data.all_questionnaire_answered;
                        // }),

                        GmsDashboardService.getDashboardAssignmentCounting().then(function(res){
                            $scope.panel.ongoing_assignments = res.data;
                        }),
                        GmsDashboardService.getDashboardAssigneeCounting().then(function(res){
                            $scope.panel.activated_assignees = res.data.activated_assignees;
                            $scope.panel.total_assignees = res.data.total_assignees;
                        }),
                        GmsDashboardService.getDashboardRelocationCounting().then(function(res){
                            $scope.panel.all_relocation_active = res.data.all_relocation_active;
                            $scope.panel.all_relocation_cancel = res.data.all_relocation_cancel;
                            $scope.panel.average_services_per_relocation = res.data.average_services_per_relocation;

                        }),
                        GmsDashboardService.getDashboardRequestServicesCounting().then(function(res){
                            $scope.panel.requests_of_service = res.data;
                        }),
                        GmsDashboardService.getDashboardAverageServiceDuration().then(function(res){
                            $scope.panel.average_services_duration = res.data;
                        }),

                        GmsDashboardService.getDashboardInvitedAccountCounting().then(function(res){
                            $scope.panel.invitations = res.data.invitations;
                            $scope.panel.total_hr_accounts = res.data.total_hr_accounts;
                        }),

                    ]).then(function (res) {
                        //
                    }, function (err) {
                        //
                    })
                }
            }
            $scope.initFn();

            $scope.dataTest3 = {
                title: 'TASKS_TO_DO_TEXT',
                lists: [
                    {
                        label: 'TODAY_TEXT',
                        fullPageLink: 'xxx/xxx/xxx',
                        items: [
                            {
                                employee_uuid: '41d9f308-a332-4a02-9d83-3f5d14b3b565',
                                employee_name: 'fasdf sa dfsadf',
                                name: 'sdfsdf sdfsd'
                            },
                            {
                                employee_uuid: '41d9f308-a332-4a02-9d83-3f5d14b3b565',
                                employee_name: 'fasdf sa dfsadf',
                                name: 'sdfsdf sdfsd'
                            }
                        ]
                    },
                    {
                        label: 'YESTERDAY_TEXT',
                        fullPageLink: 'xxx/xxx/xxx',
                        items: [
                            {
                                employee_uuid: '41d9f308-a332-4a02-9d83-3f5d14b3b565',
                                employee_name: 'fasdf sa dfsadf',
                                name: 'sdfsdf sdfsd'
                            },
                            {
                                employee_uuid: '41d9f308-a332-4a02-9d83-3f5d14b3b565',
                                employee_name: 'fasdf sa dfsadf',
                                name: 'sdfsdf sdfsd'
                            },
                            {
                                employee_uuid: '41d9f308-a332-4a02-9d83-3f5d14b3b565',
                                employee_name: 'fasdf sa dfsadf',
                                name: 'sdfsdf sdfsd'
                            }
                        ]
                    },
                    {
                        label: 'LAST_7_DAY_TEXT',
                        fullPageLink: 'xxx/xxx/xxx',
                        items: [
                            {
                                employee_uuid: '41d9f308-a332-4a02-9d83-3f5d14b3b565',
                                employee_name: 'fasdf sa dfsadf',
                                name: 'sdfsdf sdfsd'
                            },
                            {
                                employee_uuid: '41d9f308-a332-4a02-9d83-3f5d14b3b565',
                                employee_name: 'fasdf sa dfsadf',
                                name: 'sdfsdf sdfsd'
                            },
                            {
                                employee_uuid: '41d9f308-a332-4a02-9d83-3f5d14b3b565',
                                employee_name: 'fasdf sa dfsadf',
                                name: 'sdfsdf sdfsd'
                            },
                            {
                                employee_uuid: '41d9f308-a332-4a02-9d83-3f5d14b3b565',
                                employee_name: 'fasdf sa dfsadf',
                                name: 'sdfsdf sdfsd'
                            }
                        ]
                    },
                    {
                        label: 'LAST_7_DAY_TEXT',
                        fullPageLink: 'xxx/xxx/xxx',
                        items: [
                            {
                                employee_uuid: '41d9f308-a332-4a02-9d83-3f5d14b3b565',
                                employee_name: 'fasdf sa dfsadf',
                                name: 'sdfsdf sdfsd'
                            },
                            {
                                employee_uuid: '41d9f308-a332-4a02-9d83-3f5d14b3b565',
                                employee_name: 'fasdf sa dfsadf',
                                name: 'sdfsdf sdfsd'
                            },
                            {
                                employee_uuid: '41d9f308-a332-4a02-9d83-3f5d14b3b565',
                                employee_name: 'fasdf sa dfsadf',
                                name: 'sdfsdf sdfsd'
                            },
                            {
                                employee_uuid: '41d9f308-a332-4a02-9d83-3f5d14b3b565',
                                employee_name: 'fasdf sa dfsadf',
                                name: 'sdfsdf sdfsd'
                            }
                        ]
                    }
                ]
            };

            $scope.dataTest4 = {
                title: 'REMINDERS_TEXT',
                lists: [
                    {
                        label: 'TODAY_TEXT',
                        fullPageLink: 'xxx/xxx/xxx',
                        items: [
                            {
                                employee_uuid: '41d9f308-a332-4a02-9d83-3f5d14b3b565',
                                employee_name: 'fasdf sa dfsadf',
                                name: 'sdfsdf sdfsd'
                            },
                            {
                                employee_uuid: '41d9f308-a332-4a02-9d83-3f5d14b3b565',
                                employee_name: 'fasdf sa dfsadf',
                                name: 'sdfsdf sdfsd'
                            }
                        ]
                    },
                    {
                        label: 'YESTERDAY_TEXT',
                        fullPageLink: 'xxx/xxx/xxx',
                        items: [
                            {
                                employee_uuid: '41d9f308-a332-4a02-9d83-3f5d14b3b565',
                                employee_name: 'fasdf sa dfsadf',
                                name: 'sdfsdf sdfsd'
                            },
                            {
                                employee_uuid: '41d9f308-a332-4a02-9d83-3f5d14b3b565',
                                employee_name: 'fasdf sa dfsadf',
                                name: 'sdfsdf sdfsd'
                            },
                            {
                                employee_uuid: '41d9f308-a332-4a02-9d83-3f5d14b3b565',
                                employee_name: 'fasdf sa dfsadf',
                                name: 'sdfsdf sdfsd'
                            }
                        ]
                    },
                    {
                        label: 'LAST_7_DAY_TEXT',
                        fullPageLink: 'xxx/xxx/xxx',
                        items: [
                            {
                                employee_uuid: '41d9f308-a332-4a02-9d83-3f5d14b3b565',
                                employee_name: 'fasdf sa dfsadf',
                                name: 'sdfsdf sdfsd'
                            },
                            {
                                employee_uuid: '41d9f308-a332-4a02-9d83-3f5d14b3b565',
                                employee_name: 'fasdf sa dfsadf',
                                name: 'sdfsdf sdfsd'
                            },
                            {
                                employee_uuid: '41d9f308-a332-4a02-9d83-3f5d14b3b565',
                                employee_name: 'fasdf sa dfsadf',
                                name: 'sdfsdf sdfsd'
                            },
                            {
                                employee_uuid: '41d9f308-a332-4a02-9d83-3f5d14b3b565',
                                employee_name: 'fasdf sa dfsadf',
                                name: 'sdfsdf sdfsd'
                            }
                        ]
                    },
                    {
                        label: 'LAST_7_DAY_TEXT',
                        fullPageLink: 'xxx/xxx/xxx',
                        items: [
                            {
                                employee_uuid: '41d9f308-a332-4a02-9d83-3f5d14b3b565',
                                employee_name: 'fasdf sa dfsadf',
                                name: 'sdfsdf sdfsd'
                            },
                            {
                                employee_uuid: '41d9f308-a332-4a02-9d83-3f5d14b3b565',
                                employee_name: 'fasdf sa dfsadf',
                                name: 'sdfsdf sdfsd'
                            },
                            {
                                employee_uuid: '41d9f308-a332-4a02-9d83-3f5d14b3b565',
                                employee_name: 'fasdf sa dfsadf',
                                name: 'sdfsdf sdfsd'
                            },
                            {
                                employee_uuid: '41d9f308-a332-4a02-9d83-3f5d14b3b565',
                                employee_name: 'fasdf sa dfsadf',
                                name: 'sdfsdf sdfsd'
                            }
                        ]
                    }
                ]
            };

            $scope.showTopAccount = false;
            $scope.toggleTopAccount = function () {
                $scope.showTopAccount = !$scope.showTopAccount;
            };
            $scope.accounts = [];
            $scope.topAccountLoading = true;
            $scope.topBookerLoading = true;
            $scope.getTopAccounts = function () {
                $scope.topAccountLoading = true;
                AppDataService.getAccountsOriginRelocationDashboard($scope.searchModules.topAccount.searchConfig).then(function (res) {
                    if (res.success) {
                        $scope.$evalAsync(function () {
                            $scope.accounts = angular.copy(res.data);
                        });
                    }

                    $timeout(function () {
                        $scope.topAccountLoading = false;
                    }, 100);
                }, function () {
                    $timeout(function () {
                        $scope.topAccountLoading = false;
                    }, 100);
                });
            };
            $scope.getTopAccounts();

            $scope.showTopBooker = false;
            $scope.toggleTopBooker = function () {
                $scope.showTopBooker = !$scope.showTopBooker;
            };
            $scope.bookers = [];
            $scope.getTopBookers = function () {
                $scope.topBookerLoading = true;
                AppDataService.getBookersOriginRelocationDashboard($scope.searchModules.topBooker.searchConfig).then(function (res) {
                    if (res.success) {
                        $scope.$evalAsync(function () {
                            $scope.bookers = angular.copy(res.data);
                        });
                    }

                    $timeout(function () {
                        $scope.topBookerLoading = false;
                    }, 100);
                }, function () {
                    $timeout(function () {
                        $scope.topBookerLoading = false;
                    }, 100);
                });
            };

            $scope.getTopBookers();


            $scope.showCoMap = true;
            $scope.toggleCountriesMap = function () {
                $scope.showCoMap = !$scope.showCoMap;
            };

            $scope.showOriginCountriesMap = function () {
                $scope.showCoMap = true;
            }

            $scope.showDestinationCountriesMap = function () {
                $scope.showCoMap = false;
                console.log($scope.showCoMap);
            };

            $scope.isAdmin = AppAuthService.isAdmin();
            $scope.isAdminOrManager = AppAuthService.isAdminOrManager();

            // Move from welcome : dashboard became now 1st page
            $scope.checkAppSetting = function () {
                $scope.company = AppAuthService.getCompany();
                if (angular.isUndefined($scope.company.language) || $scope.company.language == null ||$scope.company.language == "" ||
                    angular.isUndefined($scope.company.timezone_id) || $scope.company.timezone_id == null || $scope.company.timezone_id == "" ||
                    angular.isUndefined($scope.company.currency_code) || $scope.company.currency_code == null || $scope.company.currency_code == "" ||
                    angular.isUndefined($scope.company.date_format) || $scope.company.date_format == null || $scope.company.date_format == "") {
                    let settingModal = ngDialog.open({
                        template: urlBase.tplApp('gms', 'my-company', 'setting_dialog'),
                        className: 'ngdialog-theme-default md-box',
                        scope: $scope,
                        closeByDocument: false,
                        showClose: false,
                        closeByEscape: false,
                    });
                }
            }
            $scope.checkAppSetting();

            //Load data by filter
            $scope.subscribe('loadDataAfterSearchByModule_' + $scope.searchModules.topAccount.name, function (data) {
                $scope.searchModules.topAccount.searchConfig = data;
                $scope.getTopAccounts();
            });

            $scope.subscribe('loadDataAfterSearchByModule_' + $scope.searchModules.topBooker.name, function (data) {
                $scope.searchModules.topBooker.searchConfig = data;
                $scope.getTopBookers();
            });

        }]);

    App.controller('DashboardActivitiesController', ['$scope', '$http', '$state', '$window', 'SidebarLoader', '$rootScope', '$translate', '$timeout', '$filter',
        'AppDataService',
        function ($scope, $http, $state, $window, SidebarLoader, $rootScope, $translate, $timeout, $filter, AppDataService) {

            $scope.activities = [];
            $scope.loading_activities = true;

            $scope.todayActivities = function () {
                $scope.loading_activities = true;

                AppDataService.getTodayActivities().then(function (res) {
                    if (res.success) {

                        $scope.activities = res.data;
                        $scope.last_notification = angular.isDefined(res.last) ? res.last : '';
                        $scope.lastevaluatedtime = angular.isDefined(res.lastevaluatedtime) ?
                            res.lastevaluatedtime : 0;
                        /** time out to read **/
                        $timeout(function () {
                            $scope.loading_activities = false;
                        }, 1000)
                    }
                });
            }
            $scope.todayActivities();
        }]);

    App.controller('DashboardTodayTasksController', ['$scope', '$http', '$state', '$window', 'SidebarLoader', '$rootScope', 'AppDataService', 'ngDialog',
        function ($scope, $http, $state, $window, SidebarLoader, $rootScope, AppDataService, ngDialog) {

            $scope.loading = true;
            $scope.hasTask = false;

            $scope.todayTask = function () {
                $scope.loading = true;
                AppDataService.getTaskTodayDashboard().then(function (res) {
                    if (res.success) {
                        $scope.tasks = res.data;
                        if ($scope.tasks.length > 0) $scope.hasTask = true;
                        else $scope.hasTask = false;
                        $scope.loading = false;
                    } else {
                        $scope.loading = false;
                    }
                });
            }

            $scope.todayTask();
        }]);

    App.controller('DashboardRelocationController', ['$scope', '$http', '$state', '$window', 'SidebarLoader', '$rootScope', '$translate',
        'AppDataService',
        function ($scope, $http, $state, $window, SidebarLoader, $rootScope, $translate, AppDataService) {
            $scope.getRelocation = function () {
                // all task with due date = today
                $scope.loading = true;
                AppDataService.getRelocationTodayDashboard().then(function (res) {
                    if (res.success) {
                        $scope.relocations = res.data;
                        $scope.loading = false;
                    } else {
                        $scope.loading = false;
                    }
                });
            }
            $scope.getRelocation();
        }]);


    App.controller('DashboardAssignmentController', ['$scope', '$http', '$state', '$window', 'SidebarLoader', '$rootScope', '$translate',
        'AppDataService',
        function ($scope, $http, $state, $window, SidebarLoader, $rootScope, $translate, AppDataService) {

            $scope.getAssignment = function () {
                // all task with due date = today
                $scope.loading = true;

                AppDataService.getAssignmentTodayDashboard().then(function (res) {
                    if (res.success) {
                        $scope.assignments = res.data;
                        $scope.loading = false;
                    } else {
                        $scope.loading = false;
                    }
                });
            }

            $scope.getAssignment();

        }]);


    App.controller('DashboardWorkerActivitiesController', ['$scope', '$http', '$state', '$window', 'SidebarLoader', '$rootScope', '$translate',
        'AppDataService',
        function ($scope, $http, $state, $window, SidebarLoader, $rootScope, $translate, AppDataService) {

            $scope.workers = [];
            $scope.initWorkers = function () {
                // all task with due date = today

                AppDataService.getDashboardMembers().then(function (res) {
                    if (res.success) {
                        $scope.workers = res.data;
                        //for each worker
                        //load ONGOING
                        angular.forEach($scope.workers, function (worker) {
                            // load assignment on going assignment
                            worker.relocations = [];
                            worker.assignments = [];
                            worker.tasks = [];
                            // loading on going relocation

                            AppDataService.getRelocationOnGoing({
                                user_profile_uuid: worker.uuid
                            }).then(function (res) {
                                if (res.success) {
                                    worker.relocations = res.data;
                                    worker.relocations_count = res.total_items;
                                }
                            });

                            AppDataService.getAssignmentOnGoing({
                                user_profile_uuid: worker.uuid
                            }).then(function (res) {
                                if (res.success) {
                                    worker.assignments = res.data;
                                    worker.assignments_count = res.count;
                                }
                            });

                            AppDataService.getTaskActiveByUser({
                                user_profile_uuid: worker.uuid
                            }).then(function (res) {
                                if (res.success) {
                                    worker.tasks = res.data;
                                    worker.tasks_count = res.count;
                                }
                            });
                        })
                    }
                });
            }
            $scope.initWorkers();
        }]);

})();
