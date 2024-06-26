(function () {
    'use strict';

    angular
        .module('app.locale')
        .config(localeConfig);

    localeConfig.$inject = ['tmhDynamicLocaleProvider'];

    function localeConfig(tmhDynamicLocaleProvider) {

        tmhDynamicLocaleProvider.localeLocationPattern('https://code.angularjs.org/1.8.2/i18n/angular-locale_{{locale}}.js');
        // tmhDynamicLocaleProvider.useStorage('$cookieStore');

    }
})();
