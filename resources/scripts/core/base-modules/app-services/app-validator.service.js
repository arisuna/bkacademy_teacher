(function () {
    'use strict';

    angular
        .module('app.app-services')
        .service('AppValidatorService', AppValidatorService);

    AppValidatorService.$inject = ['$http', '$q', '$location', '$httpParamSerializer', '$localStorage', '$filter', 'Utils'];

    function AppValidatorService($http, $q, $location, $httpParamSerializer, $localStorage, $filter, Utils) {

        var vm = this;

        vm.config = {
            nationalities: [],
        };

        vm.config.gender = [
            {
                value: null,
                name: "not set"
            },
            {
                value: 0,
                name: "female"
            },
            {
                value: 1,
                name: "male"
            },
            {
                value: -1,
                name: "other"
            },
        ];

        vm.isBoolean = function (d) {
            return parseInt(d) == 0 || parseInt(d) == 1 || d === true || d === false;
        };

        vm.isYesNo = function (d) {
            return _.lowerCase(d) == 'y' || _.lowerCase(d) == 'n';
        };


        vm.isNumber = function (d) {
            var regex = /^[0-9\.]*$/;
            return regex.test(d);
        };

        vm.isLink = function (d) {
            if (d == '') return true;
            var regex = /^(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?$/;
            return regex.test(d);
        };

        vm.isUrl = function (d) {
            if (d == '') return true;
            return Utils.isUrl(d);
        };

        vm.isPhoneNumber = function (d) {
            if (d == null || d.length === 0) {
                return true;
            }
            var phoneRegEx = /^[(]?[\+]?[0-9]{1,3}[)]?([-\s\.0-9]{2,20})$/im;
            return phoneRegEx.test(d.trim());
        };

        vm.isEmail = function (d) {
            if (d == '') return false;
            return Utils.isEmail(d);
        };

        vm.isDate = function (d) {
            if (d == '') return false;

            var t = d.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
            if (t === null)
                return false;
            var d = +t[1], m = +t[2], y = +t[3];

            // Below should be a more acurate algorithm
            if (m >= 1 && m <= 12 && d >= 1 && d <= 31) {
                return true;
            }

            return false;
        }

        vm.validateObject = function (object, mapFields) {

            var fields = Object.keys(object);

            object.isUploaded = false;
            object.hasError = false;
            object.hasSuccess = false;
            object.messageError = '';

            angular.forEach(fields, function (fieldName) {
                if (angular.isDefined(mapFields[fieldName])) {

                    if (mapFields[fieldName].required == true && object[fieldName] === '') {
                        object.hasError = true;
                        object.messageError = 'Field ' + fieldName + ' Required';
                        console.log('Field' + fieldName + ' Required !!! ');
                        return object
                    }
                    if (mapFields[fieldName].notEmpty == true && object[fieldName].trim() == '') {
                        object.hasError = true;
                        object.messageError = 'Field ' + fieldName + ' Not empty';
                        console.log('Field' + fieldName + ' Not empty !!! ');
                        return object
                    }

                    if (mapFields[fieldName].type == "email") {
                        object = vm.validateObjectEmail(object, fieldName);
                    }

                    if (mapFields[fieldName].type === "telephone") {
                        object = vm.validateObjectTelephone(object, fieldName);
                    }

                    if (mapFields[fieldName].type == "url") {
                        object = vm.validateObjectUrl(object, fieldName);
                    }

                    if (mapFields[fieldName].type == "yesNo") {
                        object = vm.validateObjectYesNo(object, fieldName);
                    }

                    if (mapFields[fieldName].type == "sex") {
                        object = vm.validateObjectGender(object, fieldName);
                    }

                    if (mapFields[fieldName].type == "date") {
                        object = vm.validateObjectDate(object, fieldName);
                    }

                } else {
                    if (fieldName.indexOf("email") !== -1) {
                        object = vm.validateObjectEmail(object, fieldName);
                    }

                    if (fieldName.indexOf("phone") !== -1 || fieldName.indexOf("fax") !== -1 || fieldName.indexOf("mobile") !== -1) {
                        object = vm.validateObjectTelephone(object, fieldName);
                    }

                    if (fieldName.indexOf("url") !== -1 || fieldName.indexOf("website") !== -1) {
                        object = vm.validateObjectUrl(object, fieldName);
                    }

                    if (fieldName.indexOf("yesNo") !== -1) {
                        object = vm.validateObjectYesNo(object, fieldName);
                    }

                }
            });

            return object;
        };

        vm.validateObjectDate = function (object, fieldName) {
            let isValidDate = vm.isDate(object[fieldName]);
            if (object[fieldName] === '' || object[fieldName] == null) {
                object.hasSuccess = true;
                return object;
            }

            if (isValidDate == false) {
                object.hasError = true;
                object.messageError = 'Field ' + fieldName + ' Date  invalid';
                object[fieldName + '_id'] = null;
            }else{
                object.hasSuccess = true;
            }

            return object;
        }

        vm.validateObjectNumber = function (object, fieldName) {
            if (vm.isNumber(object[fieldName]) == false) {
                object.hasError = true;
                object.messageError = 'Field ' + fieldName + ' Number invalid';
            }else{
                object.hasSuccess = true;
            }
            return object;
        };

        vm.validateObjectEmail = function (object, fieldName) {
            if (object[fieldName] === '' || _.isNull(object[fieldName])) {
                object.hasSuccess = true;
                return object;
            }

            if (angular.isDefined(object[fieldName]) && object[fieldName] != null && object[fieldName] != '') {
                object[fieldName] = object[fieldName].toLowerCase();
            }
            if (vm.isEmail(object[fieldName]) == false) {
                object.hasError = true;
                object.messageError = 'Field ' + fieldName + ' Email/Workemail/Private-email invalid';
            }else{
                object.hasSuccess = true;
            }
            return object;
        };

        vm.validateObjectUrl = function (object, fieldName) {
            if (vm.isUrl(object[fieldName]) == false) {
                object.hasError = true;
                object.messageError = 'Field ' + fieldName + ' Url/Website/Link  Invalid : ' + object[fieldName];
            }else{
                object.hasSuccess = true;
            }
            return object;
        };

        vm.validateObjectTelephone = function (object, fieldName) {
            if (vm.isPhoneNumber(object[fieldName]) == false) {
                object.hasError = true;
                object.messageError = 'Field ' + fieldName + ' Phone/Fax/Mobile invalid';
            }else{
                object.hasSuccess = true;
            }
            return object;
        };


        vm.validateObjectYesNo = function (object, fieldName) {
            if (vm.isBoolean(object[fieldName]) == false) {
                if (vm.isYesNo(object[fieldName]) == false) {
                    object.hasError = true;
                    object.messageError = 'Field ' + fieldName + ' yes no invalid';
                }else{
                    object.hasSuccess = true;
                }
            }

            if (vm.isYesNo(object[fieldName]) == true) {
                if (_.lowerCase(object[fieldName]) == 'y') {
                    object[fieldName] = true;
                } else {
                    object[fieldName] = false;
                }
            }

            return object;
        };
    }

})();
