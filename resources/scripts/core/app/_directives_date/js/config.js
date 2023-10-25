/**
 * [avatar date-picker-input]
 * @return {[type]} [created by thinh@expatfinder.com]
 */
(function () {
    'use strict';

    angular
        .module('app.date-picker-input')
        .config(function ($provide) {
            $provide.decorator('uibDatepickerPopupDirective', ['$delegate', 'AppAuthService', '$rootScope', function ($delegate, AppAuthService, $rootScope) {

                $rootScope.$on('date_picker_update_format', function(){
                    var directive = $delegate[0];

                    let _inputMask = '99/99/9999';
                    let companyDateFormat = AppAuthService.getCompanyDateFormat() ? AppAuthService.getCompanyDateFormat() : 'DD/MM/YYYY';
                    console.log('companyDate', companyDateFormat);

                    switch (companyDateFormat){
                        case 'DD/MM/YYYY':
                            _inputMask = '99/99/9999';
                            break;
                        case 'MM/DD/YYYY':
                            _inputMask = '99/99/9999';
                            break;
                        case 'YYYY/MM/DD':
                            _inputMask = '9999/99/99';
                            break;
                        default:
                            _inputMask = '99/99/9999';
                            break;
                    }

                    var link = directive.link;
                    directive.compile = function () {
                        return function (scope, element, attrs) {

                            link.apply(this, arguments);
                            $(element).inputmask(_inputMask);
                        };
                    };

                    return $delegate;

                });

                var directive = $delegate[0];

                let _inputMask = '99/99/9999';
                let companyDateFormat = AppAuthService.getCompanyDateFormat() ? AppAuthService.getCompanyDateFormat() : 'DD/MM/YYYY';

                switch (companyDateFormat){
                    case 'DD/MM/YYYY':
                        _inputMask = '99/99/9999';
                        break;
                    case 'MM/DD/YYYY':
                        _inputMask = '99/99/9999';
                        break;
                    case 'YYYY/MM/DD':
                        _inputMask = '9999/99/99';
                        break;
                    default:
                        _inputMask = '99/99/9999';
                        break;
                }

                var link = directive.link;
                directive.compile = function () {
                    return function (scope, element, attrs) {

                        link.apply(this, arguments);
                        $(element).inputmask(_inputMask);
                    };
                };

                return $delegate;
            }]);
        });

})();
