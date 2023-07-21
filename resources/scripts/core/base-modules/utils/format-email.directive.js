(function () {
    'use strict';

    angular
        .module('app.utils')
        .directive('formatEmail', formatEmail);

    function formatEmail() {
        var directive = {
            require: 'ngModel',
            link: function ($scope, elem, attrs, ngModelCtrl) {

                var lowercase = function (inputValue) {
                    if (inputValue == undefined) inputValue = '';
                    let pattern = /^([\w.$-]+\@[\w.]+(?=[^\w.$-])|[\w.$-]+\@(?=[^\w.-])|[\w.@-]+(?=[^\w.$@-])).$|\.(?=[^\w-@]).|[^\w.$@-]|^[^\w$-]|\.(?=@).|@(?=\.)./i;

                    //let pattern = /^([\w.$-]+\@[\w.]+(?=[^\w.])|[\w.$-]+\@(?=[^\w.-])|[\w.@-]+(?=[^\w.$@-])).$|\.(?=[^\w-@]).|[^\w.$@-]|^[^\w]|\.(?=@).|@(?=\.)./i;
                    let lowercased = inputValue.toLowerCase();
                    lowercased = _.replace(lowercased, pattern, '$1');
                    if (lowercased !== inputValue) {
                        ngModelCtrl.$setViewValue(lowercased);
                        ngModelCtrl.$render();
                    }
                    return lowercased;
                }

                ngModelCtrl.$parsers.unshift(lowercase);
                lowercase($scope[attrs.ngModel]);
            }
        };

        return directive;
    }
})();
