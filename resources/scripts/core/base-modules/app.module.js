// GMS APP START
// -----------------------------------
var App;
var Routes;


(function () {
    'use strict';

    App = angular
        .module('smxd', [
            'app.core',
            'app.routes',
            'app.sidebar',
            'app.navsearch',
            'app.preloader',
            'app.loadingbar',
            'app.translate',
            'app.settings',
            'app.icons',
            'app.flatdoc',
            'app.notify',
            'app.bootstrapui',
            'app.elements',
            'app.panels',
            'app.charts',
            'app.forms',
            'app.locale',
            'app.maps',
            'app.pages',
            'app.tables',
            'app.extras',
            'app.mailbox',
            'app.utils',
            'app.colors',
            'app.toaster',
            'app.edit-inline',
            'app.flexslider',
            'app.password-generator',
            'app.avatar-upload',
            'app.spinner',
            'app.date-picker-input',
            'app.time-picker-input',
            'mentio',
            'app.includeReplace',
            'app.img-onload',
            'app.img-carousel',
            'app.thumb',
            'app.data-member',
            'app.input-selector',
            'app.button-directives',
            'app.data-services',
            'app.auth',
            'app.empty-string',
            'app.country-flag',
            'app.expat-map',
            'app.line-loading-spinner',
            'app.document-viewer',
            'app.notification',
            'app.layout-directives',
            'app.angular-table',
            'app.rating-star',
            'app.validators',
            'app.filters',
            'app.app-services',
            'app.app-services-auth',
            'app.app-directives',
            'app.app-components',
            'app.app-directives-media-zone'
        ]).config(function ($sceProvider) {
            $sceProvider.enabled(false);
        });
})();
