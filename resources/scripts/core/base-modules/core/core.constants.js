/**=========================================================
 * Module: constants.js
 * Define constants to inject across the application
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('app.core')
        .constant('APP_MEDIAQUERY', {
            'desktopLG': 1200,
            'desktop': 992,
            'tablet': 768,
            'mobile': 480
        })
        .constant('__currentApp', 'gms')
        .constant('_', window._)
        .constant('__env', window.__env)
        .constant('APP_SCROLLBAR_CONFIG', {
            "theme": "minimal-dark"
        });
})();
