(function () {
    'use strict';

    angular
        .module('app.data-member')
        .directive('contactInfo', contactInfo);

    contactInfo.$inject = ['urlBase'];

    function contactInfo(urlBase) {
        var directive = {
            restrict: 'E',
            replace: true,
            scope: {
                userProfile: '<',
            },
            templateUrl: urlBase.tplBase('base-modules/data-member', 'contact-info'),
            link: function (scope, element, attrs) {

            },
        };

        return directive;
    }

})();
