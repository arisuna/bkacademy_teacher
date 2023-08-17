(function () {
    'use strict';

    angular
        .module('app.app-directives')
        .directive('appDynamicLabelHover', appDynamicLabelHover);

    appDynamicLabelHover.$inject = ['$translate', '$timeout', 'urlBase', 'Utils', 'ngDialog'];

    function appDynamicLabelHover($translate, $timeout, urlBase, Utils,ngDialog ) {
        var directive = {
            restrict: 'A',
            replace: true,
            scope: {
            },
            link: function (scope, el, attrs) {
                function mouseOver(){
                    let _element = $(this).find('i.unhover');
                    if ($(_element).hasClass('unhover-hide')) {
                        $(_element).addClass('unhover-show');
                        $(_element).removeClass('unhover-hide');
                    }
                }

                function mouseLeave(){
                    let _element = $(this).find('i.unhover');
                    if ($(_element).hasClass('unhover-show')) {
                        $(_element).addClass('unhover-hide');
                        $(_element).removeClass('unhover-show');
                    }
                }
                $(el).on("mouseover", mouseOver);
                $(el).on("mouseleave", mouseLeave);

            },
            controller: function ($scope, $element, $attrs) {
            }
        };
        return directive;
    }

})();
