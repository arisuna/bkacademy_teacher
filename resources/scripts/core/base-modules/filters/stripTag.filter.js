(function () {
    'use strict';
    angular
        .module('app.filters')
        .filter('stripTag', stripTag);

    function stripTag() {
        return filter;

        function filter(text) {
            //remove tag
            text = text ? String(text).replace(/<[^>]+>/gm, '') : '';

            //remove code space
            text = text.replace(/&nbsp;/g, '');

            return text;

        }
    }

    angular
        .module('app.filters')
        .filter('stripImgTag', stripImgTag);

    function stripImgTag() {
        return filter;

        function filter(text) {
            //remove tag
            text = text ? String(text).replace(/<img[^>]+>/gm, '[media]') : '';

            //remove code space
            // text = text.replace(/&nbsp;/g, '');

            return text;

        }
    }
})();
