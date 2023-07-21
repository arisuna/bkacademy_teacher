/**=========================================================
 * Filter: capitalize
 =========================================================*/

(function () {
    'use strict';
    angular
        .module('app.filters')
        .filter('gmsFrontendState', gmsFrontendState);

    gmsFrontendState.$inject = ['$filter'];

    function gmsFrontendState($filter) {

        return filter;

        function filter(input, params) {

            if (input !== null && !angular.isUndefined(input)) {
                if (angular.isObject(input)) {
                    if (input.object_uuid != "") {
                        if (input.type == "T") {
                            return "app.tasks.page({uuid:'" + input.object_uuid + "'})";
                        }
                        if (input.type == "A") {
                            return "app.assignment.dashboard({uuid:'" + input.object_uuid + "'})";
                        }
                        if (input.type == "R") {
                            return "app.relocation.dashboard({uuid:'" + input.object_uuid + "'})";
                        }
                        if (input.type == "S") {
                            return "app.relocation.service-detail({uuid:'" + input.object_uuid + "'})";
                        }
                    }
                }
            }
            return "";
        }
    }

})();
