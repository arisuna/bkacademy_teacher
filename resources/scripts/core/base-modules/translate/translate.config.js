(function () {
    'use strict';

    angular
        .module('app.translate')
        .config(translateConfig);
    translateConfig.$inject = ['__env', '$translateProvider', '$translatePartialLoaderProvider'];

    function translateConfig(__env, $translateProvider, $translatePartialLoader) {

        $translateProvider.useStaticFilesLoader({
            prefix: '/app/assets/translate/',
            suffix: ''
        });
        $translateProvider.useLoader('$translatePartialLoader', {
            urlTemplate: '/app/assets/translate/{lang}.json'
        });

        $translateProvider.translations(
            localStorage.getItem('NG_TRANSLATE_LANG_KEY') ? localStorage.getItem('NG_TRANSLATE_LANG_KEY') : 'vi', {
                'LOGIN_TEXT': '{{ LOGIN_TEXT }}',
                'ENTER_EMAIL_TEXT': '{{ ENTER_EMAIL_TEXT }}',
                'ENTER_PASSWORD_TEXT': '{{ ENTER_PASSWORD_TEXT }}',
                'REMEMBER_ME_TEXT': '{{ REMEMBER_ME_TEXT }}',
                'FORGOT_PASSWORD_TEXT': '{{ FORGOT_PASSWORD_TEXT }}',
                'LOGIN_BTN_TEXT': '{{ LOGIN_BTN_TEXT }}',
                'RESET_PASSWORD_BTN_TEXT': '{{ RESET_PASSWORD_BTN_TEXT }}',
                'NEED_TO_SIGN_UP_TEXT': '{{ NEED_TO_SIGN_UP_TEXT }}',
                'REGISTER_NOW_TEXT': '{{ REGISTER_NOW_TEXT }}',
                'SORRY_TEXT': '{{ SORRY_TEXT }}',
                'RESET_PASSWORD_TEXT': '{{ RESET_PASSWORD_TEXT }}',
                'ENTER_NEW_PASSWORD_TEXT': '{{ ENTER_NEW_PASSWORD_TEXT }}',
                'REENTER_NEW_PASSWORD_TEXT': '{{ REENTER_NEW_PASSWORD_TEXT }}',
                'SUBMIT_BTN_TEXT': '{{ SUBMIT_BTN_TEXT }}'
            });

        $translateProvider.preferredLanguage('vi');
        $translateProvider.useLocalStorage();
        $translateProvider.usePostCompiling(true);
        $translateProvider.useSanitizeValueStrategy('sanitizeParameters');

    }
})();
