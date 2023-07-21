(function () {
    'use strict';

    angular.module('app.utils').directive('ngOnload', function () {
        return {
            restrict: 'A',
            scope: {
                callback: "&ngOnload"
            },
            link: function (scope, element, attrs, ctrl) {
                element.on("load", (event) => scope.callback({ event: event }));
            }
        }
    });

})();
