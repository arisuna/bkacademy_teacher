(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('ngClickOutside', ngClickOutside);

    ngClickOutside.$inject = ['$document'];

    function ngClickOutside ( $document ) {
        return {
            restrict: 'A',
            scope: {
                ngClickOutside: '&'
            },
            link: function (scope, el, attr) {

                $document.on('click', function (e) {
                    if (el !== e.target && !el[0].contains(e.target)) {
                        scope.$apply(function () {
                            scope.$eval(scope.ngClickOutside);
                        });
                    }
                });
            }
        }
    }

})();
