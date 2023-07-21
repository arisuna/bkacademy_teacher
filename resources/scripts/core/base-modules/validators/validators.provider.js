/**
 * validator - v1.1.6 - 2016-09-14
 * https://github.com/netceteragroup/validator
 * Copyright (c) 2016 Netcetera AG
 * License: MIT
 */
(function (window, document) {
    'use strict';

    angular.module('app.validators', ['ng'])
        .constant('validatorEvents', {
            'revalidate': 'validator-revalidate'
        })
        .value('validatorConfig', {
            addFormGroupClass: true
        })
        .value('validatorClasses', {
            formGroup: 'form-group',
            valid: 'ng-valid',
            invalid: 'ng-invalid',
            dirty: 'ng-dirty',
            pristine: 'ng-pristine',
            touched: 'ng-touched',
            untouched: 'ng-untouched',
            invalidDirtyTouchedGroup: 'validator-invalid-dirty-touched-group'
        });
    angular.module('app.validators')

    /**
     * Exposes utility functions used in validators and validator core.
     */
        .factory('validatorUtil', [function () {

            var substringAfterDot = function (string) {
                if (string.lastIndexOf('.') === -1) {
                    return string;
                } else {
                    return string.substring(string.lastIndexOf('.') + 1, string.length);
                }
            };

            var SLUG_CASE_REGEXP = /[A-Z]/g;
            var slugCase = function (string) {
                return string.replace(SLUG_CASE_REGEXP, function(letter, pos) {
                    return (pos ? '-' : '') + letter.toLowerCase();
                });
            };

            /**
             * Converts the given validator name to a validation token. Uses the last part of the validator name after the
             * dot (if present) and converts camel case to slug case (fooBar -> foo-bar).
             * @param validatorName the validator name
             * @returns {string} the validation token
             */
            var validatorNameToToken = function (validatorName) {
                if (angular.isString(validatorName)) {
                    var name = substringAfterDot(validatorName);
                    name = slugCase(name);
                    return 'validator-' + name;
                } else {
                    return validatorName;
                }
            };

            return {
                validatorNameToToken: validatorNameToToken,

                isNaN: function (value) {
                    // `NaN` as a primitive is the only value that is not equal to itself
                    // (perform the [[Class]] check first to avoid errors with some host objects in IE)
                    return this.isNumber(value) && value !== +value;
                },

                isNumber: function (value) {
                    var type = typeof value;
                    return type === 'number' ||
                        value && type === 'object' && Object.prototype.toString.call(value) === '[object Number]' || false;
                },

                has: function (object, key) {
                    return object ? Object.prototype.hasOwnProperty.call(object, key) : false;
                },

                /**
                 * @param value the value
                 * @returns {boolean} true if the given value is not null, not undefined, not an empty string, NaN returns false
                 */
                notEmpty: function (value) {
                    if (this.isNaN(value)) {
                        return false;
                    }
                    if (angular.isArray(value) && value.length === 0){
                        return false;
                    }
                    return angular.isDefined(value) && value !== '' && value !== null;
                },

                /**
                 * @param value the value to validate
                 * @returns {boolean} true if the given value is null, undefined, an empty string, NaN returns false
                 */
                isEmpty: function (value) {
                    if (this.isNaN(value)) {
                        return false;
                    }
                    return !this.notEmpty(value);
                },

                /**
                 * Checks if a string value starts with a given prefix.
                 *
                 * @param value the value
                 * @param prefix the prefix
                 * @returns {boolean} true if the given value starts with the given prefix.
                 */
                startsWith: function (value, prefix) {
                    return angular.isString(value)  &&
                        angular.isString(prefix) &&
                        value.lastIndexOf(prefix, 0) === 0;
                }
            };
        }])
    ;

    angular.module('app.validators')

        .factory('validatorRequiredValidator', ['validatorUtil', function (validatorUtil) {
            return {
                name: 'required',

                /**
                 * Checks if the value is not empty.
                 *
                 * @param value the value to validate
                 * @returns {boolean} true if the value is not empty
                 */
                validate: function (value) {
                    return validatorUtil.notEmpty(value);
                }
            };
        }]);

    angular.module('app.validators')

        .factory('validatorMinValidator', ['validatorUtil', function (validatorUtil) {

            return {
                name: 'min',

                /**
                 * Checks if the value is a number and higher or equal as the value specified in the constraint.
                 *
                 * @param value the value to validate
                 * @param constraint the validation constraint
                 * @returns {boolean} true if valid
                 */
                validate: function (value, constraint) {
                    var minValue = Number(constraint.value),
                        valueAsNumber = Number(value);


                    if (validatorUtil.isNaN(value)) {
                        return false;
                    }

                    return validatorUtil.isEmpty(value) || valueAsNumber >= minValue;
                }
            };
        }]);

    angular.module('app.validators')

        .factory('validatorMaxValidator', ['validatorUtil', function (validatorUtil) {

            return {
                name: 'max',

                /**
                 * Checks if the value is a number and lower or equal as the value specified in the constraint.
                 *
                 * @param value the value to validate
                 * @param constraint the validation constraint
                 * @returns {boolean} true if valid
                 */
                validate: function (value, constraint) {
                    var maxValue = Number(constraint.value),
                        valueAsNumber = Number(value);

                    if (validatorUtil.isNaN(value)) {
                        return false;
                    }

                    return validatorUtil.isEmpty(value) || valueAsNumber <= maxValue;
                }
            };
        }]);

    angular.module('app.validators')

        .factory('validatorSizeValidator', ['validatorUtil', function (validatorUtil) {
            return {
                name: 'size',

                /**
                 * Checks if the values length is in the range specified by the constraints min and max properties.
                 *
                 * @param value the value to validate
                 * @param constraint with optional values: min, max
                 * @returns {boolean} true if valid
                 */
                validate: function (value, constraint) {
                    var minLength = constraint.min || 0,
                        maxLength = constraint.max;

                    value = value || '';

                    if (validatorUtil.isEmpty(value)) {
                        return true;
                    }

                    return value.length >= minLength &&
                        (maxLength === undefined || value.length <= maxLength);
                }
            };
        }]);

    angular.module('app.validators')

        .factory('validatorEmailValidator', ['validatorUtil', function (validatorUtil) {

            // the e-mail pattern used in angular.js
            var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

            return {
                name: 'email',

                /**
                 * Checks if the value is a valid email address.
                 *
                 * @param value the value to validate
                 * @returns {boolean} true if valid
                 */
                validate: function (value) {
                    return validatorUtil.isEmpty(value) || EMAIL_REGEXP.test(value);
                }
            };
        }]);

    angular.module('app.validators')

        .factory('validatorUrlValidator', ['validatorUtil', function (validatorUtil) {

            // the url pattern used in angular.js
            var URL_REGEXP = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/;

            return {
                name: 'url',

                /**
                 * Checks if the value is a valid url.
                 *
                 * @param value the value to validate
                 * @returns {boolean} true if valid
                 */
                validate: function (value) {
                    return validatorUtil.isEmpty(value) || URL_REGEXP.test(value);
                }
            };
        }]);

    angular.module('app.validators')

        .factory('validatorDigitsValidator', ['validatorUtil', function (validatorUtil) {

            // matches everything except digits and '.' as decimal separator
            var regexp = new RegExp('[^.\\d]', 'g');

            /**
             * By converting to number and back to string using toString(), we make sure that '.' is used as decimal separator
             * and not the locale specific decimal separator.
             * As we already checked for NaN at this point, we can do this safely.
             */
            var toStringWithoutThousandSeparators = function (value) {
                return Number(value).toString().replace(regexp, '');
            };

            var isNotLongerThan = function (valueAsString, maxLengthConstraint) {
                return !valueAsString ? true : valueAsString.length <= maxLengthConstraint;
            };

            var doValidate = function (value, constraint) {
                var integerConstraint = constraint.integer,
                    fractionConstraint = constraint.fraction,
                    cleanValueAsString, integerAndFraction;

                cleanValueAsString = toStringWithoutThousandSeparators(value);
                integerAndFraction = cleanValueAsString.split('.');

                return isNotLongerThan(integerAndFraction[0], integerConstraint) &&
                    isNotLongerThan(integerAndFraction[1], fractionConstraint);
            };

            return {
                name: 'digits',

                /**
                 * Checks if the value is a number within accepted range.
                 *
                 * @param value the value to validate
                 * @param constraint the validation constraint, it is expected to have integer and fraction properties (maximum
                 *                   number of integral/fractional digits accepted for this number)
                 * @returns {boolean} true if valid
                 */
                validate: function (value, constraint) {

                    if (validatorUtil.isEmpty(value)) {
                        return true;
                    }
                    if (validatorUtil.isNaN(Number(value))) {
                        return false;
                    }

                    return doValidate(value, constraint);
                }
            };
        }]);

    angular.module('app.validators')

        .factory('futureAndPastSharedValidator', ['validatorUtil', function (validatorUtil) {

            var someAlternativeDateFormats = ['D-M-YYYY', 'D.M.YYYY', 'D/M/YYYY', 'D. M. YYYY', 'YYYY.M.D'];

            return {
                validate: function (value, comparison) {
                    var now = moment(), valueAsMoment;

                    if (validatorUtil.isEmpty(value)) {
                        return true;
                    }

                    valueAsMoment = moment(value);

                    for (var i = 0; i < someAlternativeDateFormats.length && !valueAsMoment.isValid(); i++) {
                        valueAsMoment = moment(value, someAlternativeDateFormats[i], true);
                    }

                    return valueAsMoment.isValid() && comparison(valueAsMoment, now);
                }
            };
        }]);

    angular.module('app.validators')

        .factory('validatorPastValidator', ['futureAndPastSharedValidator', function (futureAndPastSharedValidator) {

            return {
                name: 'past',

                /**
                 * Checks if the value is a date in the past.
                 *
                 * @param value the value to validate
                 * @returns {boolean} true if empty, null, undefined or a date in the past, false otherwise
                 */
                validate: function (value) {
                    return futureAndPastSharedValidator.validate(value, function (valueAsMoment, now) {
                        return valueAsMoment.isBefore(now);
                    });
                }
            };
        }]);

    angular.module('app.validators')

        .factory('validatorFutureValidator', ['futureAndPastSharedValidator', function (futureAndPastSharedValidator) {

            return {
                name: 'future',

                /**
                 * Checks if the value is a date in the future.
                 *
                 * @param value the value to validate
                 * @returns {boolean} true if empty, null, undefined or a date in the future, false otherwise
                 */
                validate: function (value) {

                    return futureAndPastSharedValidator.validate(value, function (valueAsMoment, now) {
                        return valueAsMoment.isAfter(now);
                    });
                }
            };
        }]);

    angular.module('app.validators')

        .factory('validatorPatternValidator', ['validatorUtil', function (validatorUtil) {

            var REGEXP_PATTERN = /^\/(.*)\/([gim]*)$/;

            /**
             * Converts the given pattern to a RegExp.
             * The pattern can either be a RegExp object or a string containing a regular expression (`/regexp/`).
             * This implementation is based on the AngularJS ngPattern validator.
             * @param pattern the pattern
             * @returns {RegExp} the RegExp
             */
            var asRegExp = function (pattern) {
                var match;

                if (pattern.test) {
                    return pattern;
                } else {
                    match = pattern.match(REGEXP_PATTERN);
                    if (match) {
                        return new RegExp(match[1], match[2]);
                    } else {
                        throw ('Expected ' + pattern + ' to be a RegExp');
                    }
                }
            };

            return {
                name: 'pattern',

                /**
                 * Checks if the value matches the pattern defined in the constraint.
                 *
                 * @param value the value to validate
                 * @param constraint the constraint with the regexp as value
                 * @returns {boolean} true if valid
                 */
                validate: function (value, constraint) {
                    var pattern = asRegExp(constraint.value);
                    return validatorUtil.isEmpty(value) || pattern.test(value);
                }
            };
        }]);

    angular.module('app.validators')

        .factory('validatorMinLengthValidator', ['validatorUtil', function (validatorUtil) {
            return {
                name: 'minLength',

                /**
                 * Checks if the value is a string and if it's at least 'constraint.number' of characters long.
                 *
                 * @param value the value to validate
                 * @param constraint with property 'number'
                 * @returns {boolean} true if valid
                 */
                validate: function (value, constraint) {
                    var minLength = constraint.number;

                    if (validatorUtil.isEmpty(value)) {
                        return true;
                    }

                    if (typeof value === 'string') {
                        return value.length >= minLength;
                    } else {
                        return false;
                    }
                }
            };
        }]);

    angular.module('app.validators')

        .factory('validatorMaxLengthValidator', ['validatorUtil', function (validatorUtil) {
            return {
                name: 'maxLength',

                /**
                 * Checks if the value is a string and if it's at most 'constraint.number' of characters long.
                 *
                 * @param value the value to validate
                 * @param constraint with property 'number'
                 * @returns {boolean} true if valid
                 */
                validate: function (value, constraint) {
                    var maxLength = constraint.number;

                    if (validatorUtil.isEmpty(value)) {
                        return true;
                    }

                    if (typeof value === 'string') {
                        return value.length <= maxLength;
                    } else {
                        return false;
                    }
                }
            };
        }]);

    angular.module('app.validators')

        .factory('validatorHibernateEmailValidator', ['validatorUtil', function (validatorUtil) {
            var ATOM = '[a-z0-9!#$%&\'*+/=?^_`{|}~-]';
            var DOMAIN = '^' + ATOM + '+(\\.' + ATOM + '+)*$';
            var IP_DOMAIN = '^\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\]$';

            var localPattern = new RegExp('^' + ATOM + '+(\\.' + ATOM + '+)*$', 'i');
            var domainPattern = new RegExp(DOMAIN + '|' + IP_DOMAIN, 'i');

            return {
                name: 'hibernateEmail',

                /**
                 * Checks if the value is a valid email address using the same patterns as Hibernate uses in its bean validation
                 * implementation.
                 *
                 * @param value the value to validate
                 * @returns {boolean} true if valid
                 */
                validate: function (value) {
                    if (validatorUtil.isEmpty(value)) {
                        return true;
                    }

                    // split email at '@' and consider local and domain part separately
                    var emailParts = value.split('@');
                    if (emailParts.length !== 2) {
                        return false;
                    }

                    if (!localPattern.test(emailParts[0])) {
                        return false;
                    }

                    return domainPattern.test(emailParts[1]);
                }
            };
        }]);

    angular.module('app.validators')

        .provider('validator', function () {

            var constraints = {}, validators = {}, constraintUrl, constraintsLoading, constraintAliases = {},
                validatorNames = [
                    'validatorRequiredValidator',
                    'validatorSizeValidator',
                    'validatorMinLengthValidator',
                    'validatorMaxLengthValidator',
                    'validatorMinValidator',
                    'validatorMaxValidator',
                    'validatorEmailValidator',
                    'validatorUrlValidator',
                    'validatorDigitsValidator',
                    'validatorFutureValidator',
                    'validatorPastValidator',
                    'validatorPatternValidator',
                    'validatorHibernateEmailValidator'
                ];

            var addConstraints = function (newConstraints) {
                angular.extend(constraints, newConstraints);
            };

            this.addConstraints = addConstraints;

            var removeConstraints = function (constraintNames) {
                if (angular.isArray(constraintNames)) {
                    angular.forEach(constraintNames, function (name) {
                        delete constraints[name];
                    });
                } else if (angular.isString(constraintNames)) {
                    delete constraints[constraintNames];
                }
            };

            this.removeConstraints = removeConstraints;

            this.setConstraintUrl = function (url) {
                constraintUrl = url;
            };

            this.addValidator = function (validatorName) {
                validatorNames.push(validatorName);
            };

            this.addConstraintAlias = function (validatorName, alias) {
                if(!angular.isArray(constraintAliases[validatorName])) {
                    constraintAliases[validatorName] = [];
                }
                constraintAliases[validatorName].push(alias);
            };

            this.$get =
                ['$log', '$injector', '$rootScope', '$http', 'validatorEvents', 'validatorUtil', 'validatorClasses',
                    function ($log, $injector, $rootScope, $http, validatorEvents, validatorUtil, validatorClasses) {

                        // inject all validators
                        angular.forEach(validatorNames, function (validatorName) {
                            var validator = $injector.get(validatorName);
                            validators[validator.name] = validator;

                            // register validator with aliases
                            if(angular.isArray(constraintAliases[validator.name])) {
                                angular.forEach(constraintAliases[validator.name], function (alias) {
                                    validators[alias] = validator;
                                });
                            }

                        });

                        // load constraints via $http if constraintUrl is configured
                        if (constraintUrl) {
                            constraintsLoading = true;
                            $http.get(constraintUrl).then(function (response) {
                                constraintsLoading = false;
                                addConstraints(response.data);
                                $rootScope.$broadcast(validatorEvents.revalidate);
                            })['finally'](function () {
                                constraintsLoading = false;
                            });
                        }

                        var constraintsForType = function (type) {
                            if (validatorUtil.has(constraints, type)) {
                                return constraints[type];
                            } else if (!constraintsLoading) {
                                $log.warn('No constraints for type \'' + type + '\' available.');
                            }
                        };

                        return {
                            /**
                             * Validates the value of the given type with the constraints for the given field name.
                             *
                             * @param typeName the type name
                             * @param fieldName the field name
                             * @param value the value to validate
                             * @returns {*}
                             */
                            validate: function (typeName, fieldName, value) {

                                var validResult = { valid: true },
                                    typeConstraints = constraintsForType(typeName);

                                if (validatorUtil.has(typeConstraints, fieldName)) {
                                    var fieldConstraints = typeConstraints[fieldName],
                                        fieldIsValid = true,
                                        validationResults = [],
                                        violations = [];

                                    angular.forEach(fieldConstraints, function (constraint, validatorName) {
                                        var validator = validators[validatorName];

                                        if (angular.isUndefined(validator)) {
                                            $log.warn('No validator defined for \'' + validatorName +
                                                '\'. Can not validate field \'' + fieldName + '\'');
                                            return validResult;
                                        }

                                        var valid = validator.validate(value, constraint);
                                        var validationResult = {
                                            valid: valid,
                                            value: value,
                                            field: fieldName,
                                            type: typeName,
                                            validator: validatorName
                                        };
                                        angular.extend(validationResult, constraint);

                                        validationResults.push(validationResult);
                                        if (!valid) {
                                            violations.push(validationResult);
                                        }
                                        fieldIsValid = fieldIsValid && valid;
                                    });

                                    return {
                                        valid: fieldIsValid,
                                        violations: violations.length === 0 ? undefined : violations,
                                        validationResults: validationResults.length === 0 ? undefined : validationResults
                                    };
                                } else {
                                    return validResult;
                                }
                            },
                            addConstraints: function (newConstraints) {
                                addConstraints(newConstraints);
                                $rootScope.$broadcast(validatorEvents.revalidate);
                            },
                            removeConstraints: function (constraintNames) {
                                removeConstraints(constraintNames);
                                $rootScope.$broadcast(validatorEvents.revalidate);
                            },
                            getConstraints: function () {
                                return constraints;
                            },
                            setClasses: function (newClasses) {
                                angular.extend(validatorClasses, newClasses);
                                $rootScope.$broadcast(validatorEvents.revalidate);
                            }
                        };
                    }];
        });
    /**
     * This directive adds the validity state to a form group element surrounding validator validated input fields.
     * If validator-messages is loaded, it also adds the validation messages as last element to the element this this
     * directive is applied on.
     */
    var validatorFormGroupDirectiveDefinition =
        ['validatorClasses', 'validatorConfig', function (validatorClasses, validatorConfig) {
            return  {
                restrict: 'EA',
                link: function (scope, element) {
                    if (validatorConfig.addFormGroupClass) {
                        element.addClass(validatorClasses.formGroup);
                    }
                },
                controller: ['$scope', '$element', function ($scope, $element) {

                    var formItems = [],
                        messageElements = {};

                    /**
                     * Checks the state of all validator validated form items below this element.
                     * @returns {Object} an object containing the states of all form items in this form group
                     */
                    var getFormGroupState = function () {

                        var formGroupState = {
                            // true if an item in this form group is currently dirty, touched and invalid
                            invalidDirtyTouchedGroup: false,
                            // true if all form items in this group are currently valid
                            valid: true,
                            // contains the validity states of all form items in this group
                            itemStates: []
                        };

                        angular.forEach(formItems, function (formItem) {
                            if (formItem.$touched && formItem.$dirty && formItem.$invalid) {
                                formGroupState.invalidDirtyTouchedGroup = true;
                            }

                            if (formItem.$invalid) {
                                formGroupState.valid = false;
                            }

                            var itemState = {
                                name: formItem.$name,
                                touched: formItem.$touched,
                                dirty: formItem.$dirty,
                                valid: formItem.$valid
                            };

                            formGroupState.itemStates.push(itemState);
                        });

                        return formGroupState;
                    };

                    /**
                     * Updates the classes on this element and the validator message elements based on the validity states
                     * of the items in this form group.
                     * @param formGroupState the current state of this form group and its items
                     */
                    var updateClasses = function (formGroupState) {
                        // form group state
                        $element.toggleClass(validatorClasses.invalidDirtyTouchedGroup, formGroupState.invalidDirtyTouchedGroup);
                        $element.toggleClass(validatorClasses.valid, formGroupState.valid);
                        $element.toggleClass(validatorClasses.invalid, !formGroupState.valid);

                        // validator message states
                        angular.forEach(formGroupState.itemStates, function (itemState) {
                            var messageElement = messageElements[itemState.name];
                            if (messageElement) {
                                messageElement.toggleClass(validatorClasses.valid, itemState.valid);
                                messageElement.toggleClass(validatorClasses.invalid, !itemState.valid);
                                messageElement.toggleClass(validatorClasses.dirty, itemState.dirty);
                                messageElement.toggleClass(validatorClasses.pristine, !itemState.dirty);
                                messageElement.toggleClass(validatorClasses.touched, itemState.touched);
                                messageElement.toggleClass(validatorClasses.untouched, !itemState.touched);
                            }
                        });
                    };

                    $scope.$watch(getFormGroupState, updateClasses, true);

                    this.addFormItem = function (ngModelController) {
                        formItems.push(ngModelController);
                    };

                    this.removeFormItem = function (ngModelController) {
                        var index = formItems.indexOf(ngModelController);
                        if (index >= 0) {
                            formItems.splice(index, 1);
                        }
                    };

                    this.addMessageElement = function (ngModelController, messageElement) {
                        $element.append(messageElement);
                        messageElements[ngModelController.$name] = messageElement;
                    };

                    this.removeMessageElement = function (ngModelController) {
                        if (messageElements[ngModelController.$name]) {
                            messageElements[ngModelController.$name].remove();
                            delete messageElements[ngModelController.$name];
                        }
                    };

                }]
            };
        }];

    angular.module('app.validators')
        .directive('validatorFormGroup', validatorFormGroupDirectiveDefinition);

    angular.module('app.validators')

    /**
     * The validatorType directive defines the type of the model to be validated.
     * The directive exposes the type through the controller to allow access to it by wrapped directives.
     */
        .directive('validatorType', function () {
            return  {
                priority: 1,
                controller: ['$attrs', function ($attrs) {

                    this.getType = function () {
                        return $attrs.validatorType;
                    };

                }]
            };
        });

    /**
     * This controller is used if no validatorEnabled parent directive is available.
     */
    var nullValdrEnabledController = {
        isEnabled: function () {
            return true;
        }
    };

    /**
     * This controller is used if no validatorFormGroup parent directive is available.
     */
    var nullValdrFormGroupController = {
        addFormItem: angular.noop,
        removeFormItem: angular.noop
    };

    /**
     * This directive adds validation to all input and select fields as well as to explicitly enabled elements which are
     * bound to an ngModel and are surrounded by a validatorType directive. To prevent adding validation to specific fields,
     * the attribute 'validator-no-validate' can be added to those fields.
     */
    var validatorFormItemDirectiveDefinitionFactory = function (restrict) {
            return ['validatorEvents', 'validator', 'validatorUtil', function (validatorEvents, validator, validatorUtil) {
                return {
                    restrict: restrict,
                    require: ['?^validatorType', '?^ngModel', '?^validatorFormGroup', '?^validatorEnabled'],
                    link: function (scope, element, attrs, controllers) {

                        var validatorTypeController = controllers[0],
                            ngModelController = controllers[1],
                            validatorFormGroupController = controllers[2] || nullValdrFormGroupController,
                            validatorEnabled = controllers[3] || nullValdrEnabledController,
                            validatorNoValidate = attrs.validatorNoValidate,
                            fieldName = attrs.name;

                        /**
                         * Don't do anything if
                         * - this is an <input> that's not inside of a validator-type block
                         * - there is no ng-model bound to input
                         * - there is the 'validator-no-validate' attribute present
                         */
                        if (!validatorTypeController || !ngModelController || angular.isDefined(validatorNoValidate)) {
                            return;
                        }

                        validatorFormGroupController.addFormItem(ngModelController);

                        if (validatorUtil.isEmpty(fieldName) && validatorEnabled.isEnabled()) {
                            console.warn('Form element with ID "' + attrs.id + '" is not bound to a field name.');
                        }

                        var updateNgModelController = function (validationResult) {

                            if (validatorEnabled.isEnabled()) {
                                var validatorTokens = ['validator'];

                                // set validity state for individual validator validators
                                angular.forEach(validationResult.validationResults, function (result) {
                                    var validatorToken = validatorUtil.validatorNameToToken(result.validator);
                                    ngModelController.$setValidity(validatorToken, result.valid);
                                    validatorTokens.push(validatorToken);
                                });

                                // set overall validity state of this form item
                                ngModelController.$setValidity('validator', validationResult.valid);
                                ngModelController.validatorViolations = validationResult.violations;

                                // remove errors for validator validators which no longer exist
                                angular.forEach(ngModelController.$error, function (value, validatorToken) {
                                    if (validatorTokens.indexOf(validatorToken) === -1 && validatorUtil.startsWith(validatorToken, 'validator')) {
                                        ngModelController.$setValidity(validatorToken, true);
                                    }
                                });
                            } else {
                                angular.forEach(ngModelController.$error, function (value, validatorToken) {
                                    if (validatorUtil.startsWith(validatorToken, 'validator')) {
                                        ngModelController.$setValidity(validatorToken, true);
                                    }
                                });
                                ngModelController.validatorViolations = undefined;
                            }
                        };

                        var validate = function (modelValue) {
                            var validationResult = validator.validate(validatorTypeController.getType(), fieldName, modelValue);
                            updateNgModelController(validationResult);
                            return validatorEnabled.isEnabled() ? validationResult.valid : true;
                        };

                        ngModelController.$validators.validator = validate;

                        scope.$on(validatorEvents.revalidate, function () {
                            validate(ngModelController.$modelValue);
                        });

                        scope.$on('$destroy', function () {
                            validatorFormGroupController.removeFormItem(ngModelController);
                        });

                    }
                };
            }];
        },
        validatorFormItemElementDirectiveDefinition = validatorFormItemDirectiveDefinitionFactory('E'),
        validatorFormItemAttributeDirectiveDefinition = validatorFormItemDirectiveDefinitionFactory('A');

    angular.module('app.validators')
        .directive('input', validatorFormItemElementDirectiveDefinition)
        .directive('select', validatorFormItemElementDirectiveDefinition)
        .directive('textarea', validatorFormItemElementDirectiveDefinition)
        .directive('enableValdrValidation', validatorFormItemAttributeDirectiveDefinition);

    angular.module('app.validators')

    /**
     * This directive allows to dynamically enable and disable the validation with validator.
     * All form elements in a child node of an element with the 'validator-enabled' directive will be affected by this.
     *
     * Usage:
     *
     * <div validator-enabled="isValidationEnabled()">
     *   <input type="text" name="name" ng-model="mymodel.field">
     * </div>
     *
     * If multiple validator-enabled directives are nested, the one nearest to the validated form element
     * will take precedence.
     */
        .directive('validatorEnabled', ['validatorEvents', function (validatorEvents) {
            return  {
                controller: ['$scope', '$attrs', function($scope, $attrs) {
                    $scope.$watch($attrs.validatorEnabled, function () {
                        $scope.$broadcast(validatorEvents.revalidate);
                    });

                    this.isEnabled = function () {
                        var evaluatedExpression = $scope.$eval($attrs.validatorEnabled);
                        return evaluatedExpression === undefined ? true : evaluatedExpression;
                    };
                }]
            };
        }]);

})(window, document);



(function (window, document) {
    'use strict';

    angular.module('app.validators')

    /**
     * This service provides shared configuration between all validator-message directive instances like the configured
     * template to render the violation messages and whether or not angular-translate is available.
     */
        .provider('validatorMessage', function () {

            var userDefinedTemplateUrl, userDefinedTemplate,
                messages = {},
                defaultTemplateUrl = 'validator/default-message.html',
                defaultTemplate =   '<div class="validator-message">' +
                    '{{ violation.message }}' +
                    '</div>',
                translateTemplate = '<div class="validator-message" ng-show="violation">' +
                    '<span ' +
                    'translate="{{ violation.message }}" ' +
                    'translate-values="violation"></span>' +
                    '</div>';

            this.setTemplate = function (template) {
                userDefinedTemplate = template;
            };

            this.setTemplateUrl = function (templateUrl) {
                userDefinedTemplateUrl = templateUrl;
            };

            this.addMessages = function (newMessages) {
                angular.extend(messages, newMessages);
            };
            var addMessages = this.addMessages;

            this.getMessage = function (typeName, fieldName, validatorName) {
                var fullMessageKey = typeName + '.' + fieldName + '.' + validatorName;
                return messages[fullMessageKey] || messages[validatorName] || '[' + validatorName + ']';
            };
            var getMessage = this.getMessage;

            this.$get = ['$templateCache', '$injector', function ($templateCache, $injector) {

                var angularMessagesEnabled = false;

                function getTranslateService() {
                    try {
                        return $injector.get('$translate');
                    } catch (error) {
                        return undefined;
                    }
                }

                function getFieldNameKeyGenerator() {
                    try {
                        return $injector.get('validatorFieldNameKeyGenerator');
                    } catch (error) {
                        return function(violation) {
                            return violation.type + '.' + violation.field;
                        };
                    }
                }

                var $translate = getTranslateService(),
                    translateAvailable = angular.isDefined($translate),
                    fieldNameKeyGenerator = getFieldNameKeyGenerator();

                function determineTemplate() {
                    if (angular.isDefined(userDefinedTemplate)) {
                        return userDefinedTemplate;
                    } else if (translateAvailable) {
                        return translateTemplate;
                    } else {
                        return defaultTemplate;
                    }
                }

                function updateTemplateCache() {
                    $templateCache.put(defaultTemplateUrl, determineTemplate());
                    if (userDefinedTemplateUrl && userDefinedTemplate) {
                        $templateCache.put(userDefinedTemplateUrl, userDefinedTemplate);
                    }
                }

                updateTemplateCache();

                return {
                    templateUrl: userDefinedTemplateUrl || defaultTemplateUrl,
                    setTemplate: function (newTemplate) {
                        userDefinedTemplate = newTemplate;
                        updateTemplateCache();
                    },
                    translateAvailable: translateAvailable,
                    $translate: $translate,
                    fieldNameKeyGenerator: fieldNameKeyGenerator,
                    addMessages: addMessages,
                    getMessage: getMessage,
                    angularMessagesEnabled: angularMessagesEnabled
                };
            }];
        });

    /**
     * This directive appends a validation message to the parent element of any input, select or textarea element, which
     * is nested in a validator-type directive and has an ng-model bound to it.
     * If the form element is wrapped in an element marked with the class defined in validatorClasses.formGroup,
     * the messages is appended to this element instead of the direct parent.
     * To prevent adding messages to specific input fields, the attribute 'validator-no-message' can be added to those input
     * or select fields. The validator-message directive is used to do the actual rendering of the violation messages.
     */
    var validatorMessageDirectiveDefinitionFactory = function (restrict) {
            return ['$compile', function ($compile) {
                return {
                    restrict: restrict,
                    require: ['?^validatorType', '?^ngModel', '?^validatorFormGroup'],
                    link: function (scope, element, attrs, controllers) {

                        var validatorTypeController = controllers[0],
                            ngModelController = controllers[1],
                            validatorFormGroupController = controllers[2],
                            validatorNoValidate = attrs.validatorNoValidate,
                            validatorNoMessage = attrs.validatorNoMessage,
                            fieldName = attrs.name;

                        /**
                         * Don't do anything if
                         * - this is an <input> that's not inside of a validator-type or validator-form-group block
                         * - there is no ng-model bound to input
                         * - there is a 'validator-no-validate' or 'validator-no-message' attribute present
                         */
                        if (!validatorTypeController || !validatorFormGroupController || !ngModelController ||
                            angular.isDefined(validatorNoValidate) || angular.isDefined(validatorNoMessage)) {
                            return;
                        }

                        var validatorMessageElement = angular.element('<span validator-message="' + fieldName + '"></span>');
                        $compile(validatorMessageElement)(scope);
                        validatorFormGroupController.addMessageElement(ngModelController, validatorMessageElement);

                        scope.$on('$destroy', function () {
                            validatorFormGroupController.removeMessageElement(ngModelController);
                        });

                    }
                };
            }];
        },
        validatorMessageElementDirectiveDefinition = validatorMessageDirectiveDefinitionFactory('E'),
        validatorMessageAttributeDirectiveDefinition = validatorMessageDirectiveDefinitionFactory('A');


    var nullValdrType = {
        getType: angular.noop
    };

    angular.module('app.validators')
        .directive('input', validatorMessageElementDirectiveDefinition)
        .directive('select', validatorMessageElementDirectiveDefinition)
        .directive('textarea', validatorMessageElementDirectiveDefinition)
        .directive('enableValdrMessage', validatorMessageAttributeDirectiveDefinition)

        /**
         * The validator-message directive is responsible for the rendering of violation messages. The template used for rendering
         * is defined in the validatorMessage service where it can be overridden or a template URL can be configured.
         */
        .directive('validatorMessage',
            ['$rootScope', '$injector', 'validatorMessage', 'validatorUtil', function ($rootScope, $injector, validatorMessage, validatorUtil) {
                return {
                    replace: true,
                    restrict: 'A',
                    scope: {
                        formFieldName: '@validatorMessage'
                    },
                    templateUrl: function () {
                        return validatorMessage.templateUrl;
                    },
                    require: ['^form', '?^validatorType'],
                    link: function (scope, element, attrs, controllers) {
                        var formController = controllers[0],
                            validatorTypeController = controllers[1] || nullValdrType;

                        var updateTranslations = function () {
                            if (validatorMessage.translateAvailable && angular.isArray(scope.violations)) {
                                angular.forEach(scope.violations, function (violation) {
                                    validatorMessage.$translate(validatorMessage.fieldNameKeyGenerator(violation)).then(function (translation) {
                                        violation.fieldName = translation;
                                    });
                                });
                            }
                        };

                        var createViolation = function (validatorName) {
                            var typeName = validatorTypeController.getType(),
                                fieldName = scope.formFieldName;

                            return {
                                type: typeName,
                                field: fieldName,
                                validator: validatorName,
                                message: validatorMessage.getMessage(typeName, fieldName, validatorName)
                            };
                        };

                        var addViolationsToScope = function () {
                            scope.violations = [];

                            angular.forEach(scope.formField.validatorViolations, function (violation) {
                                scope.violations.push(violation);
                            });

                            if (validatorMessage.angularMessagesEnabled) {
                                angular.forEach(scope.formField.$error, function (isValid, validatorName) {
                                    if (!validatorUtil.startsWith(validatorName, 'validator')) {
                                        scope.violations.push(createViolation(validatorName));
                                    }
                                });
                            }

                            scope.violation = scope.violations[0];
                            updateTranslations();
                        };
                        var removeViolationsFromScope = function () {
                            scope.violations = undefined;
                            scope.violation = undefined;
                        };

                        var watchFormFieldErrors = function () {
                            scope.formField = formController[scope.formFieldName];
                            if (scope.formField) {
                                return {
                                    validator: scope.formField.validatorViolations,
                                    error: scope.formField.$error
                                };
                            }
                        };


                        scope.$watch(watchFormFieldErrors, function () {
                            if (scope.formField && scope.formField.$invalid) {
                                addViolationsToScope();
                            } else {
                                removeViolationsFromScope();
                            }
                        }, true);

                        var unregisterTranslateChangeHandler = $rootScope.$on('$translateChangeSuccess', function () {
                            updateTranslations();
                        });

                        scope.$on('$destroy', function () {
                            unregisterTranslateChangeHandler();
                        });
                    }
                };
            }]);

})(window, document);