(function () {
    'use strict';

    angular
    .module('app.app-services')
        .service('AppImportService', AppImportService);

        AppImportService.$inject = ['$localStorage'];

    function AppImportService($localStorage) {

        var vm = this;

        vm.data = {
            productFieldFields: {
                name: {
                    name: 'field_name',
                    label: 'NAME_TEXT',
                    required: true,
                    notEmpty: true,
                    type: 'text',
                },
                name_vn: {
                    name: 'field_name_vn',
                    label: 'FIELD_DESCRIPTION_TEXT',
                    required: false,
                    notEmpty: false,
                    type: 'text',
                },
                label: {
                    name: 'label',
                    label: 'LABEL_TEXT',
                    required: true,
                    notEmpty: true,
                    type: 'text',
                },
                field_group: {
                    name: 'field_group',
                    label: 'FIELD_GROUP_TEXT',
                    required: true,
                    notEmpty: true,
                    type: 'text',
                },
                field_group_vn: {
                    name: 'field_group_vn',
                    label: 'FIELD_GROUP_DESCRIPTION_TEXT',
                    required: true,
                    notEmpty: true,
                    type: 'text',
                },
                mandatory: {
                    name: 'mandatory',
                    label: 'MANDATORY_TEXT',
                    required: true,
                    notEmpty: true,
                    type: 'number',
                }
            },
        };

        this.getProductFieldFields = function () {
            return vm.data.productFieldFields;
        };
    }

})();
