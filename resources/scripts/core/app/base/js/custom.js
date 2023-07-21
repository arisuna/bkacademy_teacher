/**
 * Created by binhnt on 2/24/17.
 */
(function() {

    'use strict';
    /**
     * Directive check load image source fail
     */
    App.directive('errSrc', function() {
        return {
            link: function(scope, element, attrs) {
                element.bind('error', function() {
                    if (attrs.src != attrs.errSrc) {
                        attrs.$set('src', attrs.errSrc);
                    }
                });
            }
        }
    });

})();