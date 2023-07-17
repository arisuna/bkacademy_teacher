/**
 * Created on dd/mm/yyyy.
 */

(function () {
    'use strict';

    Routes.config(['$stateProvider', 'RouteHelpersProvider', function($stateProvider, helper){
        $stateProvider.state('state_name', {
            url: 'URL_Page',
            title: 'Title_Page',
            templateUrl: helper.modulePath('[zone_name]', '[module_name/template_name]'),
            resolve: helper.resolveFor('')
        });
    }]);

})();