(function () {
    'use strict';

    angular
        .module('app.input-selector')
        .directive('buttonDeleteIcon', buttonDeleteIcon);

    buttonDeleteIcon.$inject = ['$state'];

    function buttonDeleteIcon($state) {
        return {
            restrict: 'EA',
            replace: true,
            template:
                '<button class="btn btn-round-cus btn-delete-grey btn-outline" type="button" title=" {{ \'DELETE_BTN_TEXT\'|translate }}"><em class="fa-solid fa-trash"></em></button>',
            link: function (scope, element, attrs) {

            },
            controller: function ($scope, $element, $attrs) {
                $scope.ngClickOn = function () {
                    if (typeof $scope.ngClick == 'function') {
                        $scope.ngClick()
                    }
                }
            }
        };
    }

})();
