(function () {
    'use strict';

    angular
        .module('app.utils')
        .directive('contenteditable', contentEditable);

    contentEditable.$inject = ['Utils'];

    function contentEditable(Utils) {
        return {
            restrict: "A",
            require: "ngModel",
            link: function (scope, element, attrs, ngModel) {

                function read() {
                    ngModel.$setViewValue(element.html());
                }

                ngModel.$render = function () {
                    element.text(Utils.stripTags(ngModel.$viewValue) || "");
                };

                element.bind("blur keyup change", function () {
                    scope.$apply(read);
                });
            }
        };
    };

})();
