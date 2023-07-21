/**
 * [filter selector directive]
 * @return {[type]}
 */
(function () {
    'use strict';

    angular
        .module('app.filters')
        .filter('companyDateFormat', companyDateFormat);
    companyDateFormat.$inject = ['AppAuthService', '$filter'];

    function companyDateFormat(AppAuthService, $filter) {
        return function (input) {
            let settingFormat = AppAuthService.getCompanyDateFormat();

            let output = input;

            if (angular.isDefined(input) && input != '') {
                output = $filter('amDateFormat')(input, settingFormat);
            }

            return output;
        }
    }

    angular
        .module('app.filters')
        .filter('companyDateTimeFormat', companyDateTimeFormat);
    companyDateTimeFormat.$inject = ['AppAuthService', '$filter'];

    function companyDateTimeFormat(AppAuthService, $filter) {
        return function (input) {
            let settingFormat = AppAuthService.getCompanyDateFormat() + ' HH:mm:ss';

            let output = input;

            if (angular.isDefined(input) && input != '') {
                output = $filter('amDateFormat')(input, settingFormat);
            }

            return output;
        }
    }

    angular
        .module('app.filters')
        .filter('companyDateTimeFormatV2', companyDateTimeFormatV2);
    companyDateTimeFormatV2.$inject = ['AppAuthService', '$filter'];

    function companyDateTimeFormatV2(AppAuthService, $filter) {
        return function (input) {
            let settingFormat = AppAuthService.getCompanyDateFormat() + ' h:mm a';

            let output = input;

            if (angular.isDefined(input) && input != '') {
                output = $filter('amDateFormat')(input, settingFormat);
            }

            return output;
        }
    }

    angular
        .module('app.filters')
        .filter('companyDateFormatLocalUtc', companyDateFormatLocalUtc);
    companyDateFormatLocalUtc.$inject = ['AppAuthService', '$filter'];

    function companyDateFormatLocalUtc(AppAuthService, $filter) {
        return function (input) {
            let settingFormat = AppAuthService.getCompanyDateFormat();

            let output = input;

            if (angular.isDefined(input) && input != '') {
                output = $filter('amDateFormat')($filter('amLocal')($filter('amUtc')(input)), settingFormat);
            }

            return output;
        }
    }

    angular
        .module('app.filters')
        .filter('companyDateFormatByTime', companyDateFormatByTime);
    companyDateFormatByTime.$inject = ['AppAuthService', '$filter'];

    function companyDateFormatByTime(AppAuthService, $filter) {
        return function (input) {
            let settingFormat = AppAuthService.getCompanyDateFormat();

            let output = input;

            if (angular.isDefined(input) && input != '') {
                output = $filter('dateF')(new Date(input), settingFormat);
            }

            return output;
        }
    }

    angular
        .module('app.filters')
        .filter('companyDateFormatFromUnix', companyDateFormatFromUnix);
    companyDateFormatFromUnix.$inject = ['AppAuthService', '$filter', 'Utils'];

    function companyDateFormatFromUnix(AppAuthService, $filter, Utils) {
        return function (input) {
            let settingFormat = AppAuthService.getCompanyDateFormat();

            let output = input;

            if (input == 0 || input =='0' || input == '' || input == null) {
                return null;
            }

            if (angular.isDefined(input) && input != '') {
                if (_.isNull(input) || input == 0) {
                    output = null;
                } else if (_.isNumber(input) && Utils.isUtc(input)) {
                    output = $filter('amDateFormat')($filter('amFromUnix')(input), settingFormat);
                } else {
                    output = $filter('amDateFormat')($filter('amLocal')($filter('amUtc')(input)), settingFormat);
                }
            }

            return output;
        }
    }

    angular
        .module('app.filters')
        .filter('companyDateFormatFromUnixUtc', companyDateFormatFromUnixUtc);
    companyDateFormatFromUnixUtc.$inject = ['AppAuthService', '$filter', 'Utils'];

    function companyDateFormatFromUnixUtc(AppAuthService, $filter, Utils) {
        return function (input) {
            let settingFormat = AppAuthService.getCompanyDateFormat();

            let output = input;

            if (input == 0 || input =='0' || input == '' || input == null) {
                return null;
            }

            if (angular.isDefined(input) && input != '') {
                if (_.isNull(input) || input == 0) {
                    output = null;
                } else if (_.isNumber(input) && Utils.isUtc(input)) {
                    output = moment.unix(input).utc().format(settingFormat);
                } else {
                    output = moment(input).utc().format(settingFormat);
                }
            }

            return output;
        }
    }

    angular
        .module('app.filters')
        .filter('companyTimezoneDateFormat', companyTimezoneDateFormat);
    companyTimezoneDateFormat.$inject = ['AppAuthService', '$filter', 'Utils'];

    function companyTimezoneDateFormat(AppAuthService, $filter, Utils) {
        return function (input) {
            let settingFormat = AppAuthService.getCompanyDateFormat();
            let companyTimezoneOffset = AppAuthService.getCompanyTimezoneOffset();
            console.log('companyTimezoneOffset', companyTimezoneOffset);

            let output = input;

            if (input == 0 || input =='0' || input == '' || input == null) {
                return null;
            }

            if (angular.isDefined(input) && input != '') {
                if (_.isNull(input) || input == 0) {
                    output = null;
                } else if (_.isNumber(input) && Utils.isUtc(input)) {
                    output = moment.unix(input).utcOffset(companyTimezoneOffset).format(settingFormat);
                } else {
                    output = moment(input).utcOffset(companyTimezoneOffset).format(settingFormat);
                }
            }

            return output;
        }
    }

})();
