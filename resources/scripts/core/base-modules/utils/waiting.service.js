(function () {
    'use strict';

    angular
        .module('app.utils')
        .service('WaitingService', WaitingService);

    WaitingService.$inject = ['$translate', '$state', 'toaster', '$timeout'];

    function WaitingService($translate, $state, toaster, $timeout) {

        var self = this;
        this.begin = begin;
        this.end = end;
        this.expire = expire;
        this.error = error;
        this.info = info;
        this.success = success;
        this.message = message;
        this.question = question;
        this.prompt = prompt;
        this.popInfo = popInfo;
        this.popSuccess = popSuccess;
        this.popError = popError;
        this.popExpire = popExpire;
        this.popWaiting = popWaiting;
        this.popClear = popClear;
        this.questionSimple = questionSimple;
        this.warning = warning;
        this.questionWithPassword = questionWithPassword;
        this.infoWithTitle = infoWithTitle;
        this.questionCheckbox = questionCheckbox;
        this.questionWithSelect = questionWithSelect;
        this.questionWithTextArea = questionWithTextArea;
        this.promptWithDefault = promptWithDefault;
        this.questionWithInputText = questionWithInputText;
        this.errorWithTitle = errorWithTitle;
        this.questionWithPasswordDefault = questionWithPasswordDefault;
        this.promptWithSelect = promptWithSelect;
        this.questionSimpleWithTitle = questionSimpleWithTitle;

        let SwalColors = {
            blur: "rgba(0,0,0,.4)",
            white: "rgba(255, 255, 255, 0.90)",
        };

        function SwalOverlayColor(color) {
            $timeout(function () {
                $(".swal2-container").addClass('swal2-overlay-white');
            }, 100);
        }

        function begin() {
            if (typeof window.swal !== "undefined") {
                SwalOverlayColor('white');
                window.swal({
                    title: $translate.instant(''),
                    allowOutsideClick: false,
                    background: 'transparent',
                    html: [
                        '<div ng-show="show">',
                        '<div class="sk-fading-circle2" >',
                        '<div class="sk-circle1 sk-circle"></div>',
                        '<div class="sk-circle2 sk-circle"></div>',
                        '<div class="sk-circle3 sk-circle"></div>',
                        '<div class="sk-circle4 sk-circle"></div>',
                        '<div class="sk-circle5 sk-circle"></div>',
                        '<div class="sk-circle6 sk-circle"></div>',
                        '<div class="sk-circle7 sk-circle"></div>',
                        '<div class="sk-circle8 sk-circle"></div>',
                        '<div class="sk-circle9 sk-circle"></div>',
                        '<div class="sk-circle10 sk-circle"></div>',
                        '<div class="sk-circle11 sk-circle"></div>',
                        '<div class="sk-circle12 sk-circle"></div>',
                        '</div>',
                        '</div>'
                    ].join(''),
                    showConfirmButton: false
                });
            }
        }

        function end() {
            if (typeof window.swal !== "undefined") {
                window.swal.close();
            }
        }

        /**
         * Network error
         * get expired message
         */
        function expire(err = null) {
            self.end();
            if (angular.isDefined(err) && !_.isNull(err) && angular.isDefined(err.message)) {
                return self.error(err.message);
            } else {
                window.swal({
                    title: $translate.instant('SORRY_TEXT'),
                    allowOutsideClick: false,
                    type: 'error',
                });
            }
        }

        /**
         * get message success
         * @param constant
         * @param state_name
         */
        function success(constant, callback, params) {
            window.swal({
                title: $translate.instant('CONGRATULATION_TEXT'),
                text: $translate.instant(constant),
                allowOutsideClick: false,
                type: 'success'
            }).then(function () {
                if (typeof callback !== 'function') {
                    if (callback != '' && callback !== undefined) {
                        if (params !== undefined) {
                            $state.go(callback, params);
                        } else {
                            $state.go(callback);
                        }
                    }
                } else {
                    callback();
                }
            });
        }

        /**
         * get message success
         * @param constant
         * @param state_name
         */
        function info(constant, callback) {
            window.swal({
                title: $translate.instant('INFORMATION_TEXT'),
                text: $translate.instant(constant),
                allowOutsideClick: false,
                type: 'info'
            }).then(function () {
                if (typeof callback == 'function') {
                    callback();
                }
            });
        }


        /**
         * get message success
         * @param constant
         * @param state_name
         */
        function infoWithTitle(title, text, callback) {
            window.swal({
                title: $translate.instant(title),
                text: $translate.instant(text),
                allowOutsideClick: false,
                type: 'info'
            }).then(function () {
                if (typeof callback == 'function') {
                    callback();
                }
            });
        }


        /**
         * get message success
         * @param constant
         * @param state_name
         */
        function message(title, text, callback) {
            window.swal({
                title: $translate.instant(title),
                text: $translate.instant(text),
                allowOutsideClick: false,
                type: 'info'
            }).then(function () {
                if (typeof callback == 'function') {
                    callback();
                }
            });
        }

        /**
         * get message success
         * @param constant
         * @param state_name
         */
        function warning(constant, callback) {
            window.swal({
                title: $translate.instant('INFORMATION_TEXT'),
                text: $translate.instant(constant),
                allowOutsideClick: false,
                type: 'warning'
            }).then(function () {
                if (typeof callback == 'function') {
                    callback();
                }
            });
        }

        /**
         * question
         * @param question
         * @param callback
         */
        function question(question, confirmFn, cancelFn) {
            swal({
                title: $translate.instant('ARE_YOU_SURE_TEXT'),
                text: $translate.instant(question),
                type: "warning",
                showCancelButton: true,
                allowOutsideClick: false,
                confirmButtonText: $translate.instant('YES_TEXT'),
                cancelButtonText: $translate.instant('NO_TEXT'),
                reverseButtons: true,
                showLoaderOnConfirm: true,
                preConfirm: (confirmResult) => {
                    return new Promise((resolve) => {
                        setTimeout(() => {
                            resolve()
                        }, 1000)
                    })
                },
            }).then(
                function onConfirm(result) {
                    if (result == true) {
                        confirmFn();
                        self.end();
                    } else {
                        if (typeof cancelFn == 'function') {
                            cancelFn();
                        }
                    }
                }, function onCancel(err) {
                    //if cancel
                    if (typeof cancelFn == 'function') {
                        cancelFn();
                    }
                }
            ).catch(function onCancel(err) {
                if (typeof rollback == 'function') {
                    rollback();
                }
            });
        }

        /**
         * question
         * @param question
         * @param callback
         */
        function questionSimple(question, callback, rollback) {
            swal({
                title: $translate.instant('ARE_YOU_SURE_TEXT'),
                text: $translate.instant(question),
                type: "question",
                showCancelButton: true,
                confirmButtonText: $translate.instant('YES_TEXT'),
                cancelButtonText: $translate.instant('NO_TEXT'),
                reverseButtons: true,
                showLoaderOnConfirm: false,
                allowOutsideClick: false,
                preConfirm: (confirmResult) => {
                    return new Promise((resolve) => {
                        resolve();
                    })
                },
            }).then(function onConfirm(result) {
                    if (typeof callback == 'function') {
                        callback();
                    }
                }, function onCancel() {
                    if (typeof rollback == 'function') {
                        rollback();
                    }
                }
            ).catch(function onCancel() {
                if (typeof rollback == 'function') {
                    rollback();
                }
            });
        }

        /**
         *
         * @param constant
         */
        function error(constant, callback, params) {
            let title = $translate.instant('ERROR_TEXT');

            if (params && params.title) {
                title = $translate.instant(params.title);
            }
            window.swal({
                title: title,
                text: $translate.instant(constant),
                reverseButtons: true,
                type: 'warning',
                allowOutsideClick: false,
            }).then(function () {
                if (typeof callback !== 'function') {
                    if (callback != '' && callback !== undefined) {
                        if (params !== undefined) {
                            $state.go(callback, params);
                        } else {
                            $state.go(callback);
                        }
                    }
                } else {
                    callback();
                }
            });
        }

        /**
         *
         */
        function errorWithTitle(title, message, callback, params) {
            window.swal({
                title: $translate.instant(title),
                text: $translate.instant(message),
                reverseButtons: true,
                type: 'warning',
                allowOutsideClick: false,
            }).then(function () {
                if (typeof callback !== 'function') {
                    if (callback != '' && callback !== undefined) {
                        if (params !== undefined) {
                            $state.go(callback, params);
                        } else {
                            $state.go(callback);
                        }
                    }
                } else {
                    callback();
                }
            });
        }

        /**
         *
         * @param title
         * @param message
         */
        function popInfo(title, message) {
            toaster.pop({
                type: 'info',
                body: 'notification-info',
                showCloseButton: false,
                bodyOutputType: 'directive',
                timeout: 2500,
                directiveData: {
                    message: $translate.instant(message),
                    type: 'info',
                    title: $translate.instant(title),
                }
            });
        }

        /**
         *
         * @param title
         * @param message
         */
        function popSuccess(title, message) {
            end();
            toaster.pop({
                type: 'success',
                body: 'notification-success',
                showCloseButton: false,
                bodyOutputType: 'directive',
                timeout: 2500,
                directiveData: {
                    message: $translate.instant(message),
                    type: 'success',
                    title: $translate.instant(title),
                }
            });
        }

        /**
         *
         * @param title
         * @param message
         */
        function popError(title, message) {
            toaster.pop({
                type: 'error',
                body: 'notification-error',
                showCloseButton: false,
                bodyOutputType: 'directive',
                timeout: 2500,
                directiveData: {
                    message: $translate.instant(message),
                    type: 'error',
                    title: $translate.instant(title),
                }
            });
        }

        /**
         *
         * @param title
         * @param message
         */
        function popExpire(err) {
            self.end();
            if (angular.isDefined(err) && !_.isNull(err) && angular.isDefined(err.message)) {
                return self.popError(err.message);
            } else {
                toaster.pop({
                    type: 'warning',
                    body: 'notification-warning',
                    showCloseButton: false,
                    bodyOutputType: 'directive',
                    timeout: 2500,
                    directiveData: {
                        message: $translate.instant('SORRY_TEXT'),
                        type: 'warning',
                        title: $translate.instant('WARNING_TEXT'),
                    }
                });
            }
        }


        function popWaiting(title = '', message = 'PLEASE_WAIT_MESSAGE_TEXT', timeout = 100000) {
            toaster.pop({
                type: 'wait',
                body: 'notification-waiting',
                showCloseButton: false,
                bodyOutputType: 'directive',
                timeout: timeout,
                directiveData: {
                    message: $translate.instant(message),
                    title: $translate.instant(title),
                }
            });
        }

        function popClear() {
            toaster.clear();
        }

        /**
         * @param title
         * @param message
         * @param callback
         */
        function prompt(title, message, callback, placeholder = 'ENTER_TEXT') {
            window.swal({
                title: $translate.instant(title),
                text: $translate.instant(message),
                input: 'text',
                showCancelButton: true,
                animation: 'slide-from-top',
                showLoaderOnConfirm: true,
                reverseButtons: true,
                allowOutsideClick: false,
                inputPlaceholder: $translate.instant('ENTER_TEXT'),
                preConfirm: () => {
                    return new Promise((resolve) => {
                        resolve();
                    });
                },
            }).then((inputValue) => {
                if (inputValue === false || inputValue === "") {
                    return false;
                }
                if (inputValue !== '') {
                    callback(inputValue);
                }
            }).catch((result) => {
                console.log(result);
            });
        }

        /**
         *
         * @param message
         * @param onConfirm
         * @param onCancel
         */
        function questionWithPasswordDefault(message, onConfirm, onCancel) {
            questionWithPassword('YOU_SHOULD_ENTER_YOUR_PASSWORD_TO_CONFIRM_ACTION_TEXT', message, onConfirm, onCancel);
        }

        /**
         * @param title
         * @param message
         * @param callback
         */
        function questionWithPassword(title, message, onConfirm, onCancel, onError) {
            window.swal({
                title: $translate.instant(title),
                text: $translate.instant(message),
                input: "password",
                allowOutsideClick: false,
                inputPlaceholder: $translate.instant('ENTER_YOUR_PASSWORD_TEXT'),
                showCancelButton: true,
                reverseButtons: true,
                type: 'question',
                animation: "slide-from-top",
                showLoaderOnConfirm: false,
                preConfirm: (password) => {
                    return new Promise((resolve) => {
                        setTimeout(() => {
                            if (password === '') {
                                window.swal.showValidationError(
                                    'This password not valid.'
                                )
                            }
                            resolve();
                        }, 1000)
                    })
                },
            }).then((result) => {
                if (result) {
                    onConfirm(result);
                } else {
                    self.error('PASSWORD_INCORRECT_TEXT');
                    onError();
                }
            }).catch((result) => {
                onCancel();
            });
        }

        /**
         * @param title
         * @param message
         * @param callback
         */
        function questionWithInputText(title, message, inputDefaultValue, callback) {
            window.swal({
                title: $translate.instant(title),
                text: $translate.instant(message),
                input: 'text',
                inputValue: inputDefaultValue,
                allowOutsideClick: false,
                showCancelButton: true,
                animation: 'slide-from-top',
                showLoaderOnConfirm: true,
                reverseButtons: true,
                inputPlaceholder: $translate.instant('ENTER_TEXT'),
                preConfirm: () => {
                    return new Promise((resolve) => {
                        resolve();
                    });
                },
            }).then((inputValue) => {
                // if (inputValue === false || inputValue === "") {
                //     return false;
                // }
                // if (inputValue !== '') {
                //     callback(inputValue);
                // }

                callback(inputValue);
            }).catch((result) => {
                console.log(result);
            });
        }

        /**
         * @param title
         * @param message
         * @param callback
         */
        function questionCheckbox(question, text, callback, rollback) {

            swal({
                text: $translate.instant(question),
                type: "warning",
                allowOutsideClick: false,
                // input: 'checkbox',
                inputPlaceholder: $translate.instant(text),
                showCancelButton: false,
                confirmButtonText: $translate.instant('CONTINUE_TEXT'),
                reverseButtons: true,
                showLoaderOnConfirm: false,
                preConfirm: (confirmResult) => {
                    return new Promise((resolve) => {
                        resolve();
                    })
                },
            }).then(function onConfirm(result) {
                    if (typeof callback == 'function') {
                        callback();
                    }
                }
            ).catch(function onCancel(err) {
                if (typeof rollback == 'function') {
                    rollback();
                }
            });
        }

        /**
         * @param title
         * @param message
         * @param callback
         */

        function questionWithSelect(question, inputOptions, callback, rollback) {

            swal({
                text: $translate.instant(question),
                type: "question",
                input: 'select',
                inputOptions: inputOptions,
                allowOutsideClick: false,
                showCancelButton: true,
                confirmButtonText: $translate.instant('CONTINUE_BTN_TEXT'),
                reverseButtons: true,
                showLoaderOnConfirm: false,
                inputClass: "form-control text-center-select-tag",
                preConfirm: (confirmResult) => {
                    return new Promise((resolve) => {
                        resolve();
                    })
                },

            }).then(function onConfirm(result) {
                    if (typeof callback == 'function') {
                        callback(result);
                    }
                }
            ).catch(function onCancel(err) {
                if (typeof rollback == 'function') {
                    rollback();
                }
            });
        }

        /**
         * @param title
         * @param message
         * @param callback
         */

        function questionWithTextArea(question, title_justify, justify_text, additional_cost, courtesy_text, note, callback, rollback) {

            swal({
                text: $translate.instant(question),
                html: '<div class="text-left">' +
                    '   <div class="mt-lg mb-sm row"><b>' + title_justify + '</b></div>' +
                    '   <div class="mt-sm mb-sm text-dark row">' + justify_text + '</div>' +
                    '   <div class="mt-sm mb-sm text-dark row">' + additional_cost + '</div>' +
                    '   <div class="mt-sm mb-sm text-dark row">' + courtesy_text + '</div>' +
                    '   <div class="mt-sm mb-sm"><b>' + $translate.instant(note) +
                    '   </b><textarea id="input-assignments" class="textarea-custom border-5 ml-lg" placeholder="'
                    + $translate.instant('LIST_OF_PREVIOUS_ASSIGNMENTS') + '"></textarea>' +
                    '   <label for="file-upload" class="custom-file-upload">' +
                    '       <i class="icon-paper-clip"></i>' +
                    '   </label>' +
                    '   <input id="file-upload" type="file" class="hidden-element"/></div>' +
                    '</div>'
                ,
                confirmButtonText: $translate.instant('CONTINUE_TEXT'),
                showCancelButton: true,
                allowOutsideClick: false,
                reverseButtons: true,
                showLoaderOnConfirm: false,
                width: '850px',
                cancelButtonClass: '',
                confirmButtonClass: 'confirm-button',
                preConfirm: (confirmResult) => {
                    return new Promise((resolve) => {
                        resolve();
                    })
                },

            }).then(function onConfirm(result) {
                    let list_of_previous_assignments = $('#input-assignments').val();
                    let file_upload = $('#file-upload').val();

                    if (typeof callback == 'function') {
                        callback(list_of_previous_assignments, file_upload);
                    }
                }
            ).catch(function onCancel(err) {
                if (typeof rollback == 'function') {
                    rollback(err);
                }
            });
        }

        /**
         * @param title
         * @param message
         * @param callback
         */
        function promptWithDefault(title, message, valueDefault, callback) {
            window.swal({
                title: $translate.instant(title),
                text: $translate.instant(message),
                input: 'text',
                inputValue: valueDefault,
                allowOutsideClick: false,
                showCancelButton: true,
                animation: "slide-from-top",
                showLoaderOnConfirm: true,
                reverseButtons: true,
                inputPlaceholder: $translate.instant('ENTER_TEXT'),
                preConfirm: (text) => {
                    return new Promise((resolve) => {
                        resolve()
                    })
                },
            }).then((inputValue) => {
                callback(inputValue)
            }).catch((result) => {
                //
            });
        }

        /**
         * @param title
         * @param inputOptions
         * @param inputValue
         * @param callback
         * @param rollback
         */

        function promptWithSelect(title, inputOptions, inputValue, callback, rollback) {

            swal({
                text: $translate.instant(title),
                input: 'select',
                inputOptions: inputOptions,
                inputValue: inputValue != undefined ? inputValue : '',
                allowOutsideClick: false,
                showCancelButton: true,
                reverseButtons: true,
                showLoaderOnConfirm: false,
                inputClass: "form-control text-center-select-tag",
                preConfirm: (confirmResult) => {
                    return new Promise((resolve) => {
                        resolve();
                    })
                },

            }).then(function onConfirm(result) {
                    if (typeof callback == 'function') {
                        callback(result);
                    }
                }
            ).catch(function onCancel(err) {
                if (typeof rollback == 'function') {
                    rollback();
                }
            });
        }


        /**
         * question
         * @param question
         * @param callback
         */
        function questionSimpleWithTitle(title, question, callback, rollback) {
            swal({
                title: title != undefined ? $translate.instant(title) : $translate.instant('ARE_YOU_SURE_TEXT'),
                text: $translate.instant(question),
                type: "question",
                showCancelButton: true,
                confirmButtonText: $translate.instant('YES_TEXT'),
                cancelButtonText: $translate.instant('NO_TEXT'),
                reverseButtons: true,
                showLoaderOnConfirm: false,
                allowOutsideClick: false,
                preConfirm: (confirmResult) => {
                    return new Promise((resolve) => {
                        resolve();
                    })
                },
            }).then(function onConfirm(result) {
                    if (typeof callback == 'function') {
                        callback();
                    }
                }, function onCancel() {
                    if (typeof rollback == 'function') {
                        rollback();
                    }
                }
            ).catch(function onCancel() {
                if (typeof rollback == 'function') {
                    rollback();
                }
            });
        }

    }
})();
