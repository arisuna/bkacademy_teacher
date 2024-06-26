/**=========================================================
 * Module: app-repeat-n.js
 * Provides a simple way to display the current time formatted
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('ngRepeatN', ngRepeatN);

    ngRepeatN.$inject = ['$parse'];
    function ngRepeatN ($parse) {
        return {
            restrict: 'A',
            transclude: 'element',
            replace: true,
            scope: true,
            link: function (scope, element, attrs, ctrl, $transclude) {

                scope.last = element;
                scope.parentElem = element.parent();
                scope.elems = [element];
                var getter = $parse(attrs.ngRepeatN);

                scope.$watch(function () {
                    return parseInt(attrs.ngRepeatN) || getter(scope);
                }, function (newValue, oldValue) {

                    var newInt = parseInt(newValue)
                        , oldInt = parseInt(oldValue)
                        , bothValues = ! isNaN(newInt) && ! isNaN(oldInt)
                        , childScope
                        , i
                        , limit;
                    if (isNaN(newInt) || (bothValues && newInt < oldInt)) {
                        limit = bothValues ? newInt : 0;
                        scope.last = scope.elems[limit];
                        for (i = scope.elems.length - 1; i > limit; i -= 1) {
                            scope.elems[i].remove();
                            scope.elems.pop();
                        }
                    }
                    else {
                        i = scope.elems.length - 1;

                        for (i; i < newInt; i += 1) {
                            childScope = scope.$new();
                            childScope.$index = i;
                            $transclude(childScope, function (clone) {
                                scope.last.after(clone);
                                scope.last = clone;
                                scope.elems.push(clone);
                            });
                        }
                    }
                });
            }
        };
    }
})();
