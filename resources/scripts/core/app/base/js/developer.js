/**
 * Created by anmeo at 10/11/16.
 * Edited by thinhdev at 07/03/2016 merge with Binhdev at 07/03/2016
 */

(function () {
    'use strict';


    App.controller('DeveloperController', ['$scope', '$translate', '$http', '$q', 'mentioUtil', 'ngDialog', 'WaitingService',
        function ($scope, $translate, $http, $q, mentioUtil, ngDialog, WaitingService) {

            $scope.object = {
                selected_assignees: [],
                selected_companies: [],
                property_id:  null,
                selected_countries_origin: []
            }

        }]);

})();
