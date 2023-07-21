/**
 * Created by anmeo on 11/3/16.
 */

(function () {
    'use strict';

    angular
        .module('app.password-generator')
        .directive('passwordGenerator', passwordGenerator);

    passwordGenerator.$inject = ['$translate','urlBase','WaitingService'];

    function passwordGenerator($translate, urlBase, WaitingService) {
        var directive = {
            restrict: 'AE',
            replace: true,
            scope: {
                field: '=field',
                passwordLength: '=?passwordLength',
                uppercase: '=?uppercase',
                numbers: '=?numbers',
                specials: '=?specials',
                config: '=?config',
            },
            templateUrl: urlBase.tplBase('base-modules/password-generator', 'input'),
            link: function (scope, element, attrs, ngModel, translate) {
                // Initialize the default values
                scope.passwordLength = (scope.passwordLength) && scope.passwordLength > 8 ? scope.passwordLength : 8;
                scope.uppercase = (scope.uppercase) ? scope.uppercase : false;
                scope.numbers = (scope.numbers) ? scope.numbers : false;
                scope.specials = (scope.specials) ? scope.specials : false;

                /*
                 if( angular.isUndefined( scope.config.buttonText) ){
                 scope.config.buttonText = 'Generate password';
                 }
                 */

                //scope.buttonText = ( scope.config.buttonText != undefined ) ? scope.config.buttonText : 'Generate password';

                // Enable password generation
                scope.generatePassword = function () {

                    // Create variables with characters, numbers and special
                    var lowerCharacters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
                        upperCharacters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
                        numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
                        specials = ['!', '"', '"', '#', '$', '%', '&', '\'', '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', '\\', ']', '^', '_', '`', '{', '|', '}', '~'];

                    // Concatenate the differents variables according to true/false
                    var finalCharacters = lowerCharacters;
                    var numberPart = 1;
                    var temporaryPassword = [];

                    if (scope.uppercase) finalCharacters = finalCharacters.concat(upperCharacters);
                    if (scope.numbers) finalCharacters = finalCharacters.concat(numbers);
                    if (scope.specials) finalCharacters = finalCharacters.concat(specials);

                    if (scope.uppercase) {
                        numberPart++;
                    }
                    if (scope.numbers) {
                        numberPart++;
                    }
                    if (scope.specials) {
                        numberPart++;
                    }

                    for (var i = 0; i < scope.passwordLength / numberPart; i++) {
                        temporaryPassword.push(lowerCharacters[Math.floor(Math.random() * lowerCharacters.length)]);
                    }

                    if (scope.uppercase) {
                        for (var i = 0; i < scope.passwordLength / numberPart; i++) {
                            temporaryPassword.push(upperCharacters[Math.floor(Math.random() * upperCharacters.length)]);
                        }
                    }

                    if (scope.numbers) {
                        for (var i = 0; i < scope.passwordLength / numberPart; i++) {
                            temporaryPassword.push(numbers[Math.floor(Math.random() * numbers.length)]);
                        }
                    }

                    if (scope.specials) {
                        for (var i = 0; i < scope.passwordLength / numberPart; i++) {
                            temporaryPassword.push(specials[Math.floor(Math.random() * specials.length)]);
                        }
                    }

                    // Iterate while the number is less than passwordLength
                    var finalPassword = [];
                    for (var i = 0; i < scope.passwordLength; i++) {
                        finalPassword.push(temporaryPassword[Math.floor(Math.random() * temporaryPassword.length)]);
                    }

                    // Save the result on field
                    //scope.field = finalPassword.join("");

                    window.swal({
                        title: finalPassword.join(""),
                        text: $translate.instant('COPY_PASSWORD_TEXT'),
                        type: "info",
                    });
                };
            },
            controller: function ($scope, $element, $attrs, $translate) {
                $scope.passwordField = '';
                $scope.options = {
                    passwordLength: 8,
                    uppercase: true,
                    numbers: true,
                    specials: true,
                    buttonText: 'Generate pasword'
                };
            }
        };
        return directive;
    }

})();