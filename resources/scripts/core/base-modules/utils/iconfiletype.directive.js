(function () {
    'use strict';

    angular
        .module('app.utils')
        .directive('iconFileType', iconFileType);

    iconFileType.$inject = ['urlBase'];

    function iconFileType(urlBase) {
        var directive = {
            restrict: 'E',
            templateUrl: urlBase.tplBase('base-modules/utils', 'file-icon'),
            replace: true,
            scope:{
                type:'<?',
                extension:'<?',
            },
            link: function (scope) {
            },
        };
        return directive;
    }


})();
