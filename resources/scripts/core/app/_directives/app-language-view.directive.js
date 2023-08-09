(function () {
    'use strict';

    angular
        .module('app.app-directives')
        .directive('appLanguageView', appLanguageView);

    appLanguageView.$inject = ['AppSystem'];

    function appLanguageView(AppSystem) {
        var directive = {
            restrict: 'E',
            replace: true,
            scope: {
                code: '<',
            },
            template: '<span><em class="fa fa-language mr-sm"></em>dsfh {{code}}}-{{ value }}</span>',
            link: function (scope) {

                debugger

            },
            controller: function ($scope) {
                let languages = AppSystem.getLanguages();

                let current_language = AppSystem.getCurrentLanguage();
                console.log("current_language", current_language)
                $scope.value = angular.isDefined(languages[$scope.code]) ? languages[$scope.code].options[current_language] : "";
            }
        };
        return directive;
    }
})();
