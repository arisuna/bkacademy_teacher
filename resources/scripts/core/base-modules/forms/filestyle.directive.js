/**=========================================================
 * Module: filestyle.js
 * Initializes the fielstyle plugin
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('app.forms')
        .directive('filestyle', filestyle)
        .directive('filestylev2', filestylev2);

    filestyle.$inject = ['$translate', '$rootScope'];

    function filestyle($translate, $rootScope) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element) {
            var dataOptions = element.data();
            dataOptions.classInput = element.data('classinput') || dataOptions.classInput;

            element.filestyle(dataOptions);

            $rootScope.$on('$translateChangeSuccess', function () {
                $translate(dataOptions.buttonText).then(function (translateText) {
                    if (translateText != dataOptions.buttonText) {
                        element.filestyle('buttonText', translateText);
                    }
                });
            });
            $translate.onReady().then(function () {
                $translate(dataOptions.buttonText).then(function (translateText) {
                    if (translateText != dataOptions.buttonText) {
                        element.filestyle('buttonText', translateText);
                    }
                });
            })


        }
    }

    filestylev2.$inject = ['$translate', '$rootScope'];

    function filestylev2($translate, $rootScope) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element) {
            console.log('dataOptions', dataOptions);
            if ($(element).next('div.bootstrap-filestyle.input-group').length == 0){
                var dataOptions = element.data();
                dataOptions.classInput = element.data('classinput') || dataOptions.classInput;
                element.filestyle(dataOptions);
                $rootScope.$on('$translateChangeSuccess', function () {
                    $translate(dataOptions.buttonText).then(function (translateText) {
                        if (translateText != dataOptions.buttonText) {
                            element.filestyle('buttonText', translateText);
                        }
                    });
                });
                $translate.onReady().then(function () {
                    $translate(dataOptions.buttonText).then(function (translateText) {
                        if (translateText != dataOptions.buttonText) {
                            element.filestyle('buttonText', translateText);
                        }
                    });
                })
            }


        }
    }

})();
