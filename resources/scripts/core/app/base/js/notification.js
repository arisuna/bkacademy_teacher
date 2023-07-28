/**
 * Created on dd/mm/yyyy.
 */

(function () {
    'use strict';

    App.controller('HistoryNotificationController', ['$q', '$rootScope', '$scope', '$http', '$state', '$window',
        '$stateParams', '$translate', '$interval', '$timeout', 'toaster', '$filter', 'Utils', 'AppDataService',
        'WaitingService', 'HistoryService', 'AppAuthService', 'AppSystem', 'ngDialog', 'urlBase',
        '$pusher',
        function ($q, $rootScope, $scope, $http, $state, $window, $stateParams, $translate, $interval, $timeout, toaster,
                  $filter, Utils, AppDataService, WaitingService, HistoryService, AppAuthService, AppSystem, ngDialog, urlBase, $pusher) {
            $scope.notifications = [];
            $scope.count = "";
            $scope.lastread_number = $scope.n_number;
            $scope.loading = true;
            $scope.lastevaluatedtime = 0;
            $scope.last_notification = {};
            $scope.showDetail = false;
            $scope.currentPage = 0;
            $scope.totalPages = 0;
            $scope.user = AppAuthService.getUser();


            $scope.openLeftDialog = function($event){
                $scope.setTimeReadFn();
                let dialog = ngDialog.open({
                    template: urlBase.tplApp('app', '_directives-notification-hub', 'notification-hub-dialog'),
                    className: 'ngdialog-theme-left-box lg-box ng-dialog-btn-close-dark-blue left-60',
                    data: {},
                    controller:'NotificationHubController'
                });
            }

            /**
             * count number of unread notify
             */
            $scope.notifyCount = function () {
                $scope.count = 0;
                // AppDataService.countNotification().then(
                //     function (res) {
                //         if (res.success) {
                //             $scope.count = res.count;
                //         } else {
                //             $scope.count = "";
                //         }
                //     }
                // )
            }
            /**
             * read notifications
             */
            $scope.readNotificationMultiple = function () {
                var promises = [];
                angular.forEach($scope.notifications, function (notification, key) {
                    if (angular.isDefined(notification.readtime) &&
                        parseInt(notification.readtime) <= 0) {
                        promises.push(AppDataService.readNotificationSimple(notification.uuid));
                    }
                });
                $q.all(promises).then(
                    function (res) {
                        return res;
                    },
                    function (err) {
                        return err;
                    }
                );
            }

            /**
             *
             */
            $scope.setTimeReadFn = function () {
                AppDataService.setReadTimeNotification().then(function (res) {
                        $scope.notifyCount();
                        return res;
                    },
                    function (err) {
                        return err;
                    });
            }

            $scope.openNotificiation = function () {
                console.log('here');
                $scope.loading = true;
                AppDataService.getSimpleListNotification({
                    page_size: 10,
                }).then(
                    function (res) {
                        if (res.success) {
                            $scope.loading = false;
                            $scope.notifications = res.data;
                            $scope.currentPage = res.current;
                            $scope.totalPages = res.total_pages;
                            /** time out to read **/
                            $timeout(function () {
                                $scope.setTimeReadFn();
                            }, 1000);
                        }else{
                            $scope.loading = false;
                        }
                    }
                )
            }

            $scope.openDetail = function (item) {
                //console.log(item);
                $scope.showDetail = true;
                $scope.object = item;
            }

            $scope.returnNotifications = function () {
                $scope.showDetail = false;
                $scope.object = {};
            }

            /**
             * load Notifications
             * @param previous
             */
            $scope.loadNotifications = function (page) {
                $scope.loading = true;
                if ($scope.totalPages > $scope.currentPage) {
                    AppDataService.getSimpleListNotification({
                        page_size: 10,
                        page: $scope.currentPage + 1,
                    }).then(
                        function (res) {
                            if (res.success) {
                                $scope.loading = false;
                                $scope.notifications = res.data;
                                $scope.currentPage = res.current;
                                $scope.totalPages = res.total_pages;
                                /** time out to read **/
                                $timeout(function () {
                                    $scope.setTimeReadFn();

                                }, 1000);
                            }else{
                                $scope.loading = false;
                            }
                        }
                    )
                } else {
                    $scope.loading = false;
                    // AppDataService.getSimpleListNotification({
                    //     limit: 10,
                    // }).then(
                    //     function (res) {
                    //         if (res.success) {
                    //             $scope.loading = false;
                    //             $scope.notifications = res.data;
                    //             $scope.last_notification = angular.isDefined(res.last) ? res.last : '';
                    //             $scope.lastevaluatedtime = angular.isDefined(res.lastevaluatedtime) ?
                    //                 res.lastevaluatedtime : 0;
                    //             /** time out to read **/
                    //             $timeout(function () {
                    //                 $scope.setTimeReadFn();
                    //             }, 1000);
                    //         }
                    //     }
                    // )
                }
            };

            $scope.checkNotification = function () {
                var settings = AppSystem.getSettings();
                var profile = AppAuthService.getUser();

                var client = new Pusher(settings.pusher_app_key, {
                    cluster: settings.pusher_app_cluster,
                    encrypted: true
                });
                var pusher = $pusher(client);
                pusher.subscribe(profile.uuid);
                pusher.bind('get_new_notification',
                    function (data) {
                        toaster.pop({
                            type: 'info',
                            body: 'notification-info',
                            showCloseButton: false,
                            bodyOutputType: 'directive',
                            timeout: 60000,
                            directiveData: {
                                message: $filter('notify_message')($translate.instant(data.message), {params: data.params, message:{ user_name : data.user_name, time: data.created_at }, object: data.object }),
                                type: 'info',
                                title: $translate.instant('NEW_NOTIFICATION_TEXT'),
                            }
                        });
                        $scope.notifyCount();
                    }
                );


                pusher.bind('refresh_acl',
                    function (data) {
                        toaster.pop({
                            type: 'info',
                            title: $translate.instant('REFRESH_ACL_TEXT'),
                            body: ($translate.instant(data.message)),
                            bodyOutputType: 'trustedHtml'
                        });
                        $scope.notifyCount();
                    }
                );

                pusher.bind('get_new_reminder',
                    function (data) {
                        toaster.pop({
                            type: 'reminder',
                            body: 'app-notification-reminder',
                            showCloseButton: false,
                            bodyOutputType: 'directive',
                            timeout: 60000,
                            directiveData: {
                                reminderUuid: data.reminderUuid,
                                message: data.message,
                                params: data.params,
                                type: 'reminder',
                                title: $translate.instant('REMINDER_TEXT')
                            }
                        });
                    }
                );

                pusher.bind('get_new_reminders',
                    function (data) {
                        toaster.pop({
                            type: 'reminder',
                            body: 'app-notification-reminder',
                            showCloseButton: false,
                            bodyOutputType: 'directive',
                            timeout: 60000,
                            directiveData: {
                                reminderUuid: data.reminderUuid,
                                message: data.message,
                                params: data.params,
                                type: 'reminder',
                                title: $translate.instant('REMINDER_TEXT')
                            }
                        });
                    }
                );

                pusher.bind('send_success_message',
                    function (data) {
                        toaster.pop({
                            type: 'success',
                            body: 'notification-success',
                            showCloseButton: false,
                            bodyOutputType: 'directive',
                            timeout: 10000,
                            directiveData: {
                                message: $translate.instant(data.message),
                                type: 'success',
                                title: $translate.instant('NEW_NOTIFICATION_TEXT'),
                            }
                        });
                        $scope.notifyCount();
                    }
                );
            };
            $scope.notifyCount();

            $scope.checkNotification();
            $scope.notifyCount();
        }
    ]);
})();
