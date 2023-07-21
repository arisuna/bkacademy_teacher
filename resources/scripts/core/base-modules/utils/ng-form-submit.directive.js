(function () {
    'use strict';

    angular.module('app.utils').directive('ngFormSubmit', ngFormSubmit);

    ngFormSubmit.$inject = ['$timeout'];

    function ngFormSubmit($timeout) {
        return {
            require: "form",
            link: function ($scope, $el, $attr) {
                $scope.$on('makeSubmit', function (event, data) {
                    if (angular.isDefined(data.formName) && data.formName === $attr.name) {
                        $timeout(function () {
                            $el.triggerHandler('submit'); //<<< This is Important
                            //$el[0].dispatchEvent(new Event('submit')) //equivalent with native event
                        }, 0, false);
                    }
                })
            }
        };
    };

})();
