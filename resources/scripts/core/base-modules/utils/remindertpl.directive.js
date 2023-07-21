/**=========================================================
 * Module: now.js
 * Provides a simple way to display the current time formatted
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('app.utils')
        .directive('reminderBodyTpl', reminderBodyTpl);
    reminderBodyTpl.$inject = ['$http', 'toaster', '$translate', '$rootScope', 'urlBase','AppDataService'];
    function reminderBodyTpl($http, toaster, $translate, $rootScope, urlBase, AppDataService) {
        var directiveReminder = {
            restrict: 'A',
            data: '=directiveData',
            templateUrl: urlBase.tplBase('base-modules/utils', 'reminder_pop'),
            link: function (scope, element, attrs) {

            },
            controller: function ($scope, $element, $attrs) {
                $scope.dissmissReminder = function (item) {
                    AppDataService.clearAllReminderOfUser({
                        uuid: item.uuid,
                        task_uuid: item.task_uuid
                    }).then(function(res){

                    },function(err){
                        console.log(err);
                    })
                }
            }
        };
        return directiveReminder;
    }
})();
