(function () {
    'use strict';

    angular
        .module('app.utils')
        .directive('emailCase', emailCaseDirective);

    function emailCaseDirective() {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, modelCtrl) {

                var pattern = /^([\w.$-]+\@[\w.]+(?=[^\w.])|[\w.$-]+\@(?=[^\w.-])|[\w.@-]+(?=[^\w.$@-])).$|\.(?=[^\w-@]).|[^\w.$@-]|^[^\w]|\.(?=@).|@(?=\.)./i

                modelCtrl.$parsers.push(function (inputValue) {
                    var transformedInput = inputValue.replace(pattern, '');

                    if (transformedInput != inputValue) {
                        modelCtrl.$setViewValue(transformedInput);
                        modelCtrl.$render();
                    }

                    return transformedInput;
                });
            }
        };
    }
})();
