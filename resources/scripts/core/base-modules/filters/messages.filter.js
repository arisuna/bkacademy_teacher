/**=========================================================
 * Filter: capitalize
 =========================================================*/

(function () {
    'use strict';
    angular
        .module('app.filters')
        .filter('notify_message', notify_message);

    notify_message.$inject = ['$filter', '$translate'];

    function notify_message($filter, $translate) {
        return filter;

        function filter(input, inputParams) {

            if (input !== null && !angular.isUndefined(input)) {


                var message = inputParams.message;
                var object = inputParams.object;
                var data = inputParams.data;
                var user = inputParams.user;
                var variables = inputParams.params;


                var object_number = "";
                var object_label = "";
                var object_username = "";
                var object_email = "";
                var object_date = "";

                if (angular.isDefined(message) && message != null) {
                    if (angular.isDefined(message.username)) object_username = message.username;
                    if (angular.isDefined(message.user_name)) object_username = message.user_name;
                    if (angular.isDefined(message.email)) object_email = message.email;
                    if (angular.isDefined(message.time)) object_date = $filter('date')(parseInt(message.time) * 1000, 'dd/MM/yyyy HH:mm');
                    if (angular.isDefined(message.created_at)) object_date = $filter('date')(parseInt(message.created_at) * 1000, 'dd/MM/yyyy HH:mm');
                    if (angular.isDefined(message.number)) object_number = message.number;
                }

                if (angular.isDefined(object) && object != null) {
                    if (angular.isDefined(object.object_label)) object_label = object_label = object.object_label;
                    if (angular.isDefined(object.email)) object_email = object.email;
                    if (angular.isDefined(object.username)) object_username = object.username;
                    if (angular.isDefined(object.user_name)) object_username = object.user_name;

                    if (angular.isDefined(object.identify)) object_number = object.identify;
                    if (angular.isDefined(object.reference)) object_number = object.reference;
                    if (angular.isDefined(object.number)) object_number = object.number;
                }

                if (angular.isDefined(data) && data != null) {
                    if (angular.isDefined(data.object_label)) object_label = data.object_label;
                    if (angular.isDefined(data.identify)) object_number = data.identify;
                    if (angular.isDefined(data.reference)) object_number = data.reference;
                    if (angular.isDefined(data.number)) object_number = data.number;
                }

                if (angular.isDefined(object) && object != null) {
                    if (angular.isDefined(object.object_label)) object_label = object.object_label;
                    if (angular.isDefined(object.identify)) object_number = object.identify;
                    if (angular.isDefined(object.reference)) object_number = object.reference;
                    if (angular.isDefined(object.number)) object_number = object.number;
                }

                if (object_email != '') input = input.replace('{#email}', object_email);
                if (object_date != '') input = input.replace('{#time}', object_date);
                if (object_username != '') input = input.replace('{#name}', object_username);
                if (object_label != "") {
                    object_label = $translate.instant(object_label);
                }


                if (object_number != '') input = input.replace('{#number}', object_label + " " + object_number);
                if (object_number != '') input = input.replace('{#object}', object_label + " " + object_number);
                if (object_number != '') input = input.replace('{#task_number}', object_label + " " + object_number);


                // input = input.replace('{#assignee_name}', '');

                if (angular.isDefined(variables)) {
                    angular.forEach(variables, function (value, index) {
                        input = input.replace('{#' + index + '}', value);
                    })
                }
                ;

            }
            return input;
        }
    }


    angular
        .module('app.filters')
        .filter('paramsMessage', paramsMessage);
    paramsMessage.$inject = ['$filter', '$translate'];

    function paramsMessage($filter, $translate) {
        return filter;

        function filter(input, params) {
            if (input !== null && !angular.isUndefined(input)) {
                angular.forEach(params, function (value, key) {
                    input = input.replace('{#' + key + '}', value);
                    input = input.replace('{' + key + '}', value);
                })
                return input;
            }
            return input;
        }
    }
})();
