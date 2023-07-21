(function () {
    'use strict';

    angular
        .module('app.utils')
        .directive('whenScrolled', whenScrolled);

    whenScrolled.$inject = ['$window'];

    function whenScrolled($window) {
        // Get the specified element's computed style (height, padding, etc.) in integer form
        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {

                // we get a list of elements of size 1 and need the first element
                let raw = elem[0];

                // we load more elements when scrolled past a limit
                elem.bind("scroll", function () {
                    if (raw.scrollTop + raw.offsetHeight + 5 >= raw.scrollHeight) {
                        scope.loading = true;

                        // we can give any function which loads more elements into the list
                        scope.$apply(attrs.whenScrolled);
                    }
                });
            }
        }
    };
})();
