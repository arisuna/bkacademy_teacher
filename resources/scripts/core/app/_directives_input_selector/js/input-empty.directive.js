(function () {
    'use strict';

    angular
        .module('app.input-selector')
        .directive('inputEmpty', inputEmpty);

    inputEmpty.$inject = ['$translate', 'urlBase'];

    function inputEmpty($translate, urlBase) {
        var directive = {
            restrict: 'EA',
            replace: true,
            template: '<span class="label label-default custom-size mr-sm text-black">\n' +
            '    <i>{{ \'NOT_SET_TEXT\' | translate }}</i>\n' +
            '</span>\n',
            link: function (scope, element, attrs) {
            },
        };
        return directive;
    }

})();
