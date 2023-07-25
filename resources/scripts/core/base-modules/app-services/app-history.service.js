(function () {
    'use strict';

    angular
        .module('app.app-services')
        .service('HistoryService', HistoryService);

    HistoryService.$inject = ['$q', '$http', '$timeout', 'AppDataService', 'WaitingService', '$rootScope'];

    function HistoryService($q, $http, $timeout, AppDataService, WaitingService, $rootScope) {

        var vm = this;

        this.data = {
            types: ["T", "A", "R", "C", "O", "I", "Q"],
            action_list: [
                'HISTORY_ADD_COMMENT',
                'HISTORY_ADD_VIEWER',
                'HISTORY_ARCHIVE',
                'HISTORY_CHANGE_STATUS',
                'HISTORY_CREATE',
                'HISTORY_CREATE_SUBTASK',
                'HISTORY_REMOVE',
                'HISTORY_REMOVE_VIEWER',
                'HISTORY_SAVE_SERVICE_EVENTS',
                'HISTORY_SEND_COMMENTS',
                'HISTORY_SET_DONE',
                'HISTORY_SET_IN_PROGRESS',
                'HISTORY_SET_OWNER',
                'HISTORY_SET_REMINDER',
                'HISTORY_SET_REPORTER',
                'HISTORY_SET_SVP',
                'HISTORY_SET_TODO',
                'HISTORY_STOP_REMINDER',
                'HISTORY_TAG_USER',
                'HISTORY_UPDATE',
                'HISTORY_USER_CREATE',
                'HISTORY_ADD_ITEM',
                'HISTORY_UPDATE_ITEM',
                'HISTORY_REMOVE_ITEM',
                'HISTORY_SET_AWAITING_FINAL_REVIEW',
            ]
        }

        this.getTypeTask = function () {
            return "T";
        }

        this.getTypeAssignment = function () {
            return "A";
        }

        this.getTypeRelocation = function () {
            return "R";
        }

        this.getTypeService = function () {
            return "S";
        }

        this.getTypeComment = function () {
            return "C";
        }

        this.getTypeObject = function () {
            return "O";
        }

        this.getTypeInvoice = function () {
            return "I";
        }

        this.getTypeQuote = function () {
            return "Q";
        }
        /**
         * save data history
         * @param action
         */
        this.saveHistory = function (data) {

            data = vm.cleanDataHistory( data);

            $q.all([
                AppDataService.saveHistoryData(data).then(
                    function (res) {
                        if (res.success) {
                            $rootScope.$broadcast('reload_history_data', {
                                data: data,
                            });
                            return res;
                        }
                    }
                ),
                /*
                not need to send notification data
                AppDataService.saveNofificationData(data).then(
                    function onSuccess(res) {
                        if (res.success) {
                            console.log('save send request notification ok');
                        } else {
                            console.log('save send request notification failed');
                        }
                    }, function onError(res) {
                        console.log('check internet');
                    }
                ),
                */

                AppDataService.saveNofificationForUser(data).then(function onSuccess(res) {
                    if (res.success) {
                        console.log('save send history notification ok');
                    } else {
                        console.log('save send history notification failed');
                    }
                }, function onError(res) {
                    console.log('check internet');
                }),
                AppDataService.sendPushNotificationForUser(data).then(function onSuccess(res) {
                    if (res.success) {
                        console.log('send push notification ok');
                    } else {
                        console.log('send push notification failed');
                    }
                }, function onError(res) {
                    console.log('check internet');
                }),
            ]).then(function (values) {
                console.log('save history ok');
            }, function (err) {
                WaitingService.popExpire();
            });
        }


        /**
         * @TODO this method execute all request member whithout any promises => to check;
         * save data history
         * @param action
         */
        this.saveHistoryPromise = function (data) {
            var deferredAll = $q.defer();

            data = vm.cleanDataHistory( data);


            $q.all([
                AppDataService.saveHistoryData(data),
                AppDataService.saveNofificationData(data),
                AppDataService.saveNofificationForUser(data),
                AppDataService.sendPushNotificationForUser(data)
            ]).then(function (values) {
                $rootScope.$broadcast('reload_history_data', {
                    data: data,
                });
                deferredAll.resolve(values);
            }, function (err) {
                WaitingService.popExpire();
                deferredAll.reject(err);
            });
            return deferredAll.promise;
        }


        /**
         *
         * @param data
         */
        this.saveComplexHistoryData = function (data) {
            AppDataService.saveHistoryData({
                uuid: data.uuid,
                action: data.action,
                target_uuid: data.target_uuid,
                type: data.type,
            }).then(function (response) {
                if (response.success) {
                    console.log('save history ok');
                } else {
                    console.log('save history failed');
                }
            }, function (error) {
                console.log('check internet');
            });
        }


        /**
         * save request send notification
         * @param task
         * @param action
         * @param type
         */
        this.saveSendRequestNotification = function (data) {
            AppDataService.saveNofificationData(data).then(
                function onSuccess(res) {
                    if (res.success) {
                        console.log('save send request notification ok');
                    } else {
                        console.log('save send request notification failed');
                    }
                }, function onError(res) {
                    console.log('check internet');
                }
            );
        }

        /**
         * save history notification
         * @param object
         * @param action
         * @param type
         */
        this.saveSendHistoryNotification = function (data) {
            AppDataService.saveNofificationForUser(data).then(function onSuccess(res) {
                if (res.success) {
                    console.log('save send history notification ok');
                } else {
                    console.log('save send history notification failed');
                }
            }, function onError(res) {
                console.log('check internet');
            });
        }
        /**
         * clean data input before send to server
         * @param data
         */
        this.cleanDataHistory = function (data) {
            let task = {};
            let resultData = {};
            if (angular.isDefined(data.task)) {

                if (angular.isDefined(data.task.assignment) && angular.isObject(data.task.assignment)) {
                    task.assignment = {
                        id: data.task.assignment.id,
                        uuid: data.task.assignment.uuid,
                        number: data.task.assignment.number
                    }
                }
                if (angular.isDefined(data.task.relocation) && angular.isObject(data.task.relocation)) {
                    task.relocation = {
                        id: data.task.relocation.id,
                        uuid: data.task.relocation.uuid,
                        number: data.task.relocation.identify
                    }
                }
                if (angular.isDefined(data.task.service) && angular.isObject(data.task.service)) {
                    task.service = {
                        id: data.task.service.id,
                        uuid: data.task.service.uuid,
                        number: data.task.service.number
                    }
                }
                if (angular.isDefined(data.task.id)) {
                    task.id = data.task.id;
                }
                if (angular.isDefined(data.task.uuid)) {
                    task.uuid = data.task.uuid;
                }
                if (angular.isDefined(data.task.company_id)) {
                    task.company_id = data.task.company_id;
                }
                if (angular.isDefined(data.task.company_id)) {
                    task.link_type = data.task.link_type;
                }
                if (angular.isDefined(data.task.relocation_id)) {
                    task.relocation_id = data.task.relocation_id;
                }
                if (angular.isDefined(data.task.assignment_id)) {
                    task.assignment_id = data.task.assignment_id;
                }
                if (angular.isDefined(data.task.assignment_id)) {
                    task.assignment_id = data.task.assignment_id;
                }
            }

            if (angular.isDefined(data.target_user) && angular.isObject(data.target_user)) {
                let target_user = {
                    id: angular.isDefined(data.target_user.id) ? data.target_user.id : null,
                    uuid: angular.isDefined(data.target_user.uuid) ? data.target_user.uuid : null,
                    nickname: angular.isDefined(data.target_user.nickname) ? data.target_user.nickname : null,
                    firstname: angular.isDefined(data.target_user.firstname) ? data.target_user.firstname : null,
                    lastname: angular.isDefined(data.target_user.lastname) ? data.target_user.lastname : null,
                    workemail: angular.isDefined(data.target_user.workemail) ? data.target_user.workemail : null,
                }
                resultData.target_user = target_user;
            }

            if (angular.isDefined(data.user) && angular.isObject(data.user)) {
                let user = {
                    id: angular.isDefined(data.user.id) ? data.user.id : null,
                    uuid: angular.isDefined(data.user.uuid) ? data.user.uuid : null,
                    nickname: angular.isDefined(data.user.nickname) ? data.user.nickname : null,
                    firstname: angular.isDefined(data.user.firstname) ? data.user.firstname : null,
                    lastname: angular.isDefined(data.user.lastname) ? data.user.lastname : null,
                    workemail: angular.isDefined(data.user.workemail) ? data.user.workemail : null,
                }
                resultData.user = user;
            }

            resultData.task = task;
            resultData.type = angular.isDefined(data.type) ? data.type : null;
            resultData.uuid = angular.isDefined(data.uuid) ? data.uuid : null;
            resultData.comment = angular.isDefined(data.comment) ? data.comment : null;
            resultData.action = angular.isDefined(data.action) ? data.action : null;
            resultData.target_uuid = angular.isDefined(data.target_uuid) ? data.target_uuid : null;

            resultData.object = angular.isDefined(data.object) ? data.object : null;
            resultData.assignment = angular.isDefined(data.assignment) ? data.assignment : null;
            resultData.relocation = angular.isDefined(data.relocation) ? data.relocation : null;
            resultData.service = angular.isDefined(data.service) ? data.service : null;
            resultData.task_uuid = angular.isDefined(data.task_uuid) ? data.task_uuid : null;

            resultData.assignment_uuid = angular.isDefined(data.assignment_uuid) ? data.assignment_uuid : null;
            resultData.object_uuid = angular.isDefined(data.object_uuid) ? data.object_uuid : null;
            resultData.relocation_uuid = angular.isDefined(data.relocation_uuid) ? data.relocation_uuid : null;
            resultData.relocation_service_company_uuid = angular.isDefined(data.relocation_service_company_uuid) ? data.relocation_service_company_uuid : null;
            resultData.questionnaire = angular.isDefined(data.questionnaire) ? data.questionnaire : null;
            resultData.property = angular.isDefined(data.property) ? data.property : null;

            return resultData;
        }
    }
})();
