(function () {
    'use strict';

    angular
        .module('app.app-services')
        .service('AppFieldService', AppFieldService);

    function AppFieldService() {

        var vm = this;
        /**
         * @param name
         * @returns {string}
         */
        this.getFieldLabelFromName = function (name) {
            var label = name.replace("-", " ");
            label = label.replace("_", " ");
            label = label.toLowerCase().replace(/\b[a-z]/g, function (letter) {
                return letter.toUpperCase();
            });
            return label;
        };
        /**
         * @param name
         * @returns {string}
         */
        this.getFieldTypeFromName = function (name) {

            var type = "text";

            if (name.includes('name')) {
                type = "text";
            }

            if (name.includes('phone')) {
                type = "telephone";
            }

            if (name.includes('mobile')) {
                type = "telephone";
            }

            if (name.includes('fax')) {
                type = "telephone";
            }

            if (name.includes('email')) {
                type = "email";
            }

            if (name.includes('website')) {
                type = "url";
            }

            if (name.includes('price') || name.includes('amount') || name.includes('quantity')) {
                type = "number";
            }

            if (name.includes('order') || name.includes('sequence')) {
                type = "sequence";
            }

            if (name.includes('isUploaded') || name.includes('valid') || name.includes('Valid') || name.includes('Error') || name.includes('error') || name.includes('hashKey') || name.includes("ngDialogId")) {
                type = null;
            }

            return type;
        }
    }
})();