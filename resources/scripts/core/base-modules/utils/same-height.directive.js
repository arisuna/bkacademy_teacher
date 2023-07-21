(function () {
    'use strict';

    angular
        .module('app.utils')
        .directive('sameHeight', sameHeight);

    function sameHeight() {
        return {
            restrict: 'A',
            link: function ($scope, element, attrs) {
                setSameHeight();
                element.bind("DOMSubtreeModified", function () {
                    setSameHeight();
                });
            }
        }
    }

    function setSameHeight() {
        function doForThisElement(me) {
            var value = $(me).attr("bind-height");
            var elems = $("[same-height='" + value + "']");
            var heights = elems.toArray().map(function (elem) {
                return $(elem).height();
            });
            if (Math.max.apply(me, heights) > Math.min.apply(me, heights)) $(me).height(Math.max.apply(me, heights));
        }

        $("[same-height]").each(function () {
            doForThisElement(this);
        });
    }

})();
