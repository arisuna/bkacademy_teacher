(function () {
    'use strict';

    window.ParsleyConfig = {
        excluded: 'input[type=button], input[type=submit], input[type=reset]',
        inputs: 'input, textarea, select, input[type=hidden], :hidden',
    };

    angular.module('app.forms')
        .directive('validateForm', validateForm);

    validateForm.$inject = ['$window', 'Utils'];

    function validateForm($window, Utils) {
        var directive = {
            link: link,
            restrict: 'A'
        };

        return directive;

        function link(scope, element) {

            $window.ParsleyConfig = {
                excluded: 'input[type=button], input[type=submit], input[type=reset]',
                inputs: 'input, textarea, select, input[type=hidden], :hidden',
            };

            window.ParsleyConfig = {
                excluded: 'input[type=button], input[type=submit], input[type=reset]',
                inputs: 'input, textarea, select, input[type=hidden], :hidden',
            };

            if (!$window.Parsley.hasValidator('subdomain')) {
                $window.Parsley.addValidator('subdomain', {
                    requirementType: 'string',
                    validateString: function (value) {
                        var test = Utils.isSubdomain(value);
                        return Utils.isSubdomain(value);
                    },
                    messages: {
                        en: 'Subdomain should contains only alphanumeric and hyphen character. Min Length = 4 characters and Max Length = 64 characters and should be Unique',
                    }
                });
            }

            if (!$window.Parsley.hasValidator('password')) {
                $window.Parsley.addValidator('password', {
                    requirementType: 'string',
                    validateString: function (value) {
                        var test = Utils.isPassword(value);
                        return Utils.isPassword(value);
                    },
                    messages: {
                        en: 'Invalid password. Password must be minimum 8 characters, contain at least 1 number, 1 upper case, 1 special character (!@$%^&*)',
                    }
                });
            }

            if (!$window.Parsley.hasValidator('telephone')) {
                $window.Parsley.addValidator('telephone', {
                    requirementType: 'string',
                    validateString: function (value) {
                        var test = Utils.isPhoneNumber(value);
                        return Utils.isPhoneNumber(value);
                    },
                    messages: {
                        en: 'Telphone should contain only number and parentheses(optional) and underscore, hyphen, plus, white space (optional)',
                    }
                });
            }

            if (!$window.Parsley.hasValidator('maxFileSize')) {
                $window.Parsley.addValidator('maxFileSize', {
                    validateString: function (_value, maxSize, parsleyInstance) {
                        if (!window.FormData) {
                            alert('You are making all developpers in the world cringe. Upgrade your browser!');
                            return true;
                        }
                        var files = parsleyInstance.$element[0].files;
                        return files.length != 1 || files[0].size <= maxSize * 1024;
                    },
                    requirementType: 'integer',
                    messages: {
                        en: 'This file should not be larger than %s Kb',
                        fr: 'Ce fichier est plus grand que %s Kb.'
                    }
                });
            }

            var $elem = $(element);
            if ($.fn.parsley) {
                $elem.parsley({
                    excluded: 'input[type=button], input[type=submit], input[type=reset]',
                    inputs: 'input, textarea, select, input[type=hidden], :hidden',
                });
            }
        }
    }
})();
