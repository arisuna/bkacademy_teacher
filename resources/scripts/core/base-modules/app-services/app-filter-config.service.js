(function () {
    'use strict';

    angular
        .module('app.app-services')
        .service('AppFilterConfigService', AppFilterConfigService);

    AppFilterConfigService.$inject = ['DataHttp', '$timeout', '$q', '$translate', 'AppDataService', 'DataThumbCache'];

    function AppFilterConfigService(DataHttp, $timeout, $q, $translate, AppDataService, DataThumbCache) {

        var vm = this;

        this.filterFields = {
            'START_DATE_TEXT': 'date',
            'END_DATE_TEXT': 'date',
            'CREATED_ON_TEXT': 'date',
            'ESTIMATED_START_DATE_TEXT': 'date',
            'EFFECTIVE_START_DATE_TEXT': 'date',
            'ESTIMATED_END_DATE_TEXT': 'date',
            'EFFECTIVE_END_DATE_TEXT': 'date',
            'STATUS_TEXT': 'int',
            'ORIGIN_ARRAY_TEXT': 'array',
            'DESTINATION_ARRAY_TEXT': 'array',
            'ACCOUNT_ARRAY_TEXT': 'array',
            'BOOKER_ARRAY_TEXT': 'array',
            'ASSIGNEE_ARRAY_TEXT': 'array',
            'OWNER_ARRAY_TEXT': 'array',
            'REPORTER_ARRAY_TEXT': 'array',
            'STATUS_ARRAY_TEXT': 'array',
            'HAS_VISA_TEXT': 'boolean',
            'HAS_PASSPORT_TEXT': 'boolean',
            'HAS_DEPENDENT_TEXT': 'boolean',
            'HAS_SOCIAL_SECURITY_TEXT': 'boolean',
            'INVOICE_TEMPLATE_ARRAY_TEXT': 'array',
            'DUE_DATE_TEXT': 'date',
            'BILL_TO_TEXT': 'int',
            'CURRENCY_TEXT': 'string',
            'DATE_TEXT': 'date',
            'SERVICE_CREATION_DATE_TEXT': 'date',
            'SERVICE_START_DATE_TEXT': 'date',
            'SERVICE_END_DATE_TEXT': 'date',
            'SERVICE_AUTHORISED_DATE_TEXT': 'date',
            'SERVICE_COMPLETION_DATE_TEXT': 'date',
            'SERVICE_EXPIRY_DATE_TEXT': 'date',
            'HAS_RELOCATION_TEXT': 'boolean',
            'HAS_ACCESS_TEXT': 'boolean',
            'POLICY_ARRAY_TEXT': 'array',
            'SERVICE_ARRAY_TEXT': 'array',
            'INITIATION_ON_TEXT': 'date',
            'START_OF_WORK_DATE_TEXT': 'date',
            'PROVIDER_ARRAY_TEXT': 'array',
            'PAYMENT_METHOD_ARRAY_TEXT': 'array',
            'TYPE_ARRAY_TEXT': 'array',
            'ROLE_ARRAY_TEXT': 'array',
            'COUNTRY_ARRAY_TEXT': 'array',
            'LANGUAGE_TEXT': 'string',
            'ARCHIVING_DATE_TEXT': 'date',
            'ARCHIVED_TEXT': 'boolean',
            'PRIORITY_ARRAY_TEXT': 'array',
            'FLAG_TEXT': 'boolean',
            'MILESTONE_TEXT': 'boolean',
        };

        this.filterComparations = [
            {id: '1', value: 'equal', label: 'EQUAL_TEXT'},
            {id: '2', value: 'notequal', label: 'NOT_EQUAL_TEXT'},
            {id: '3', value: 'before', label: 'BEFORE_TEXT'},
            {id: '4', value: 'after', label: 'AFTER_TEXT'},
            {id: '5', value: 'contain', label: 'CONTAIN_TEXT'},
            {id: '6', value: 'is', label: 'IS_TEXT'},
            {id: '7', value: 'not existed', label: 'NO_TEXT'},
            {id: '8', value: 'existed', label: 'YES_TEXT'},
            {id: '9', value: 'between', label: 'BETWEEN_TEXT'},
            {id: '10', value: 'in', label: 'IN_TEXT'},
            {id: '11', value: 'older', label: 'OLDER_THAN_TEXT'},
            {id: '12', value: 'today', label: 'IS_TODAY_TEXT'},
        ];

        this.config = {
            __assignment_terminated_status_list: [
                {
                    name: 'ACTIVE_TEXT',
                    value: 0,
                    id: 0,
                    color: 'yellow',
                    text: 'ACTIVE_TEXT',
                    is_visible: true,
                    selected: false
                },
                {
                    name: 'COMPLETED_TEXT',
                    value: 1,
                    id: 1,
                    color: 'red',
                    text: 'COMPLETED_TEXT',
                    is_visible: true,
                    selected: false
                },
            ],
            __relocation_status_list: [
                {name: 'NOT_STARTED_TEXT', value: 0, id: 0, color: 'yellow', text: 'NOT_STARTED_TEXT', selected: false}, //INITITAL
                //{name: 'STARTING_SOON_TEXT', value: '1'},
                {name: 'ONGOING_TEXT', value: 2, id: 2, color: 'blue', text: 'ONGOING_TEXT', selected: false},
                //{name: 'ENDING_SOON_TEXT', value: '3'},
                {name: 'TERMINATED_TEXT', value: 4, id: 4, color: 'dark', text: 'TERMINATED_TEXT', selected: false},
            ],

            __relocation_status_list_2: [
                {name: 'NOT_STARTED_TEXT', value: 0, id: 0, color: 'yellow', text: 'NOT_STARTED_TEXT', selected: false}, //INITITAL
                //{name: 'STARTING_SOON_TEXT', value: '1'},
                {name: 'ONGOING_TEXT', value: 2, id: 2, color: 'blue', text: 'ONGOING_TEXT', selected: false},
                //{name: 'ENDING_SOON_TEXT', value: '3'},
                {name: 'TERMINATED_TEXT', value: 4, id: 4, color: 'dark', text: 'TERMINATED_TEXT', selected: false},

                {name: 'CANCELLED_TEXT', value: -1, id: -1, color: 'red', text: 'CANCELLED_TEXT', selected: false} //INITITAL
            ],

            __archived_relocation_status_list: [
                {name: 'TERMINATED_TEXT', value: 4, id: 4, color: 'dark', text: 'TERMINATED_TEXT', selected: false},
                {name: 'CANCELLED_TEXT', value: -1, id: -1, color: 'red', text: 'CANCELLED_TEXT', selected: false} //INITITAL
            ],

            __assignee_status_list: [
                {
                    name: 'INACTIVE_TEXT',
                    value: 0,
                    id: 0,
                    color: 'yellow',
                    text: 'INACTIVE_TEXT',
                    is_visible: true,
                    selected: false
                },
                {
                    name: 'ACTIVE_TEXT',
                    value: 1,
                    id: 1,
                    color: 'yellow',
                    text: 'ACTIVE_TEXT',
                    is_visible: true,
                    selected: false
                },
            ],

            __invoice_quote_status_list: [
                {
                    name: $translate.instant('DRAFT_TEXT'),
                    value: 0,
                    id: 0,
                    color: 'gray',
                    text: 'DRAFT_TEXT',
                    selected: false
                },
                {
                    name: $translate.instant('PENDING_APPROVAL_TEXT'),
                    value: 1,
                    id: 1,
                    color: 'yellow',
                    text: 'PENDING_APPROVAL_TEXT',
                    selected: false
                },
                {
                    name: $translate.instant('REJECTED_TEXT'),
                    value: 2,
                    id: 2,
                    color: 'yellow',
                    red: 'REJECTED_TEXT',
                    selected: false
                },
                {
                    name: $translate.instant('APPROVED_TEXT'),
                    value: 3,
                    id: 3,
                    color: 'blue',
                    text: 'APPROVED_TEXT',
                    selected: false
                },
                {
                    name: $translate.instant('PARTIAL_PAID_TEXT'),
                    value: 4,
                    id: 4,
                    color: 'turquoise',
                    text: 'PARTIAL_PAID_TEXT',
                    selected: false
                },
                {
                    name: $translate.instant('PAID_TEXT'),
                    value: 5,
                    id: 5,
                    color: 'green',
                    text: 'PAID_TEXT',
                    selected: false
                },
            ],

            __credit_notes_status_list: [
                {
                    name: $translate.instant('DRAFT_TEXT'),
                    value: 0,
                    id: 0,
                    color: 'gray',
                    text: 'DRAFT_TEXT',
                    selected: false
                },
                {
                    name: $translate.instant('PENDING_APPROVAL_TEXT'),
                    value: 1,
                    id: 1,
                    color: 'yellow',
                    text: 'PENDING_APPROVAL_TEXT',
                    selected: false
                },
                {
                    name: $translate.instant('REJECTED_TEXT'),
                    value: 2,
                    id: 2,
                    color: 'yellow',
                    red: 'REJECTED_TEXT',
                    selected: false
                },
                {
                    name: $translate.instant('APPROVED_TEXT'),
                    value: 3,
                    id: 3,
                    color: 'blue',
                    text: 'APPROVED_TEXT',
                    selected: false
                },
                {
                    name: $translate.instant('PARTIAL_PAID_TEXT'),
                    value: 4,
                    id: 4,
                    color: 'turquoise',
                    text: 'PARTIAL_PAID_TEXT',
                    selected: false
                },
                {
                    name: $translate.instant('PAID_TEXT'),
                    value: 5,
                    id: 5,
                    color: 'green',
                    text: 'PAID_TEXT',
                    selected: false
                },
            ],

            __invoice_quote_bill_to_list: [
                {
                    name: $translate.instant('ACCOUNT_TEXT'),
                    value: 1,
                    id: 1,
                    color: 'yellow',
                    text: 'ACCOUNT_TEXT',
                    selected: false
                },
                {
                    name: $translate.instant('ASSIGNEE_TEXT'),
                    value: 2,
                    id: 2,
                    color: 'green',
                    text: 'ASSIGNEE_TEXT',
                    selected: false
                },
            ],

            __service_status_list: [
                {
                    name: $translate.instant('TODO_TEXT'),
                    value: 0,
                    id: 0,
                    color: 'yellow',
                    text: 'TODO_TEXT',
                    selected: false
                },
                {
                    name: $translate.instant('IN_PROGRESS_TEXT'),
                    value: 1,
                    id: 1,
                    color: 'blue',
                    text: 'IN_PROGRESS_TEXT',
                    selected: false
                },
                {
                    name: $translate.instant('COMPLETED_TEXT'),
                    value: 3,
                    id: 3,
                    color: 'green',
                    text: 'COMPLETED_TEXT',
                    selected: false
                },
            ],

            __task_status_list: [
                {
                    name: $translate.instant('TODO_TEXT'),
                    value: 0,
                    id: 0,
                    color: 'yellow',
                    text: 'TODO_TEXT',
                    selected: false
                },
                {
                    name: $translate.instant('IN_PROGRESS_TEXT'),
                    value: 1,
                    id: 1,
                    color: 'blue',
                    text: 'IN_PROGRESS_TEXT',
                    selected: false
                },
                {
                    name: $translate.instant('DONE_TEXT'),
                    value: 3,
                    id: 3,
                    color: 'green',
                    text: 'DONE_TEXT',
                    selected: false
                },
            ],

            __task_priority_list: [
                {
                    name: $translate.instant('TASK_PRIORITY_LOW_TASK_TEXT'),
                    value: 0,
                    id: 0,
                    color: 'grey',
                    text: 'TASK_PRIORITY_LOW_TASK_TEXT',
                    selected: false
                },
                {
                    name: $translate.instant('TASK_PRIORITY_MEDIUM_TASK_TEXT'),
                    value: 1,
                    id: 1,
                    color: 'blue',
                    text: 'TASK_PRIORITY_MEDIUM_TASK_TEXT',
                    selected: false
                },
                {
                    name: $translate.instant('TASK_PRIORITY_HIGH_TASK_TEXT'),
                    value: 2,
                    id: 2,
                    color: 'plum-red',
                    text: 'TASK_PRIORITY_HIGH_TASK_TEXT',
                    selected: false
                },
            ],

            __assignment_request_status_list: [
                {name: 'PENDING_TEXT', value: 0, id: 0, color: 'yellow', text: 'PENDING_TEXT', selected: false}, //INITITAL
                //{name: 'STARTING_SOON_TEXT', value: '1'},
                {name: 'REJECTED_TEXT', value: 1, id: 1, color: 'red', text: 'REJECTED_TEXT', selected: false},
                //{name: 'ENDING_SOON_TEXT', value: '3'},
                {name: 'ACCEPTED_TEXT', value: 2, id: 2, color: 'green', text: 'ACCEPTED_TEXT', selected: false},
            ],
            __quote_status_list: [
                {name: $translate.instant('DRAFT_TEXT'), value: 0, id: 0, color: 'gray', text: 'DRAFT_TEXT'},
                {name: $translate.instant('PENDING_TEXT'), value: 1, id: 1, color: 'yellow', text: 'PENDING_TEXT'},
                {name: $translate.instant('REJECTED_TEXT'), value: 2, id: 2, color: 'red', text: 'REJECTED_TEXT'},
                {name: $translate.instant('APPROVED_TEXT'), value: 3, id: 3, color: 'green', text: 'APPROVED_TEXT'},
            ],
            __transaction_type_list: [
                {name: $translate.instant('CASH_IN_TEXT'), value: 1, id: 1, color: 'blue', text: 'CASH_IN_TEXT'},
                {name: $translate.instant('CASH_OUT_TEXT'), value: -1, id: -1, color: 'yellow', text: 'CASH_OUT_TEXT'},
            ],
            __transaction_method_list: [
                {name: $translate.instant('CHEQUE_TEXT'), value: 1, id: 1, color: 'blue', text: 'CHEQUE_TEXT'},
                {name: $translate.instant('CASH_TEXT'), value: 2, id: 2, color: 'yellow', text: 'CASH_TEXT'},
                {
                    name: $translate.instant('CREDIT_CARD_TEXT'),
                    value: 3,
                    id: 3,
                    color: 'yellow',
                    text: 'CREDIT_CARD_TEXT'
                },
                {name: $translate.instant('PAYPAL_TEXT'), value: 4, id: 4, color: 'yellow', text: 'PAYPAL_TEXT'},
                {name: $translate.instant('OTHER_TEXT'), value: 5, id: 5, color: 'yellow', text: 'OTHER_TEXT'},
                {
                    name: $translate.instant('BANK_TRANSFER_TEXT'),
                    value: 6,
                    id: 6,
                    color: 'yellow',
                    text: 'BANK_TRANSFER_TEXT'
                },
            ],
            __bill_status_list: [
                {name: $translate.instant('DRAFT_TEXT'), value: 0, id: 0, color: 'gray', text: 'DRAFT_TEXT'},
                {
                    name: $translate.instant('PENDING_APPROVAL_TEXT'),
                    value: 4,
                    id: 4,
                    color: 'yellow',
                    text: 'PENDING_APPROVAL_TEXT'
                },
                {name: $translate.instant('REJECTED_TEXT'), value: 5, id: 5, color: 'red', text: 'REJECTED_TEXT'},
                {name: $translate.instant('UNPAID_TEXT'), value: 1, id: 1, color: 'blue', text: 'UNPAID_TEXT'},
                {
                    name: $translate.instant('PARTIAL_PAID_TEXT'),
                    value: 2,
                    id: 2,
                    color: 'turquoise',
                    text: 'PARTIAL_PAID_TEXT'
                },
                {name: $translate.instant('PAID_TEXT'), value: 3, id: 3, color: 'green', text: 'PAID_TEXT'},
            ],

            __app_member_status_list: [
                {name: $translate.instant('INACTIVE_TEXT'), value: 1, id: 1, color: 'gray', text: 'INACTIVE_TEXT'},
                {
                    name: $translate.instant('LOGIN_MISSING_TEXT'),
                    value: 2,
                    id: 2,
                    color: 'yellow',
                    text: 'LOGIN_MISSING_TEXT'
                },
                {name: $translate.instant('PENDING_TEXT'), value: 3, id: 3, color: 'red', text: 'PENDING_TEXT'},
                {name: $translate.instant('HAS_ACCESS_TEXT'), value: 4, id: 4, color: 'blue', text: 'HAS_ACCESS_TEXT'},
            ],
            __app_member_role_list: [
                {name: $translate.instant('GMS_ADMIN_TEXT'), value: 1, id: 1, color: 'gray', text: 'GMS_ADMIN_TEXT'},
                {
                    name: $translate.instant('GMS_MANAGER_TEXT'),
                    value: 6,
                    id: 6,
                    color: 'yellow',
                    text: 'GMS_MANAGER_TEXT'
                },
                {name: $translate.instant('GMS_MEMBER_TEXT'), value: 7, id: 7, color: 'red', text: 'GMS_MEMBER_TEXT'},
                {
                    name: $translate.instant('GMS_CONSULTANT_TEXT'),
                    value: 11,
                    id: 11,
                    color: 'blue',
                    text: 'GMS_CONSULTANT_TEXT'
                },
            ],

            __hr_account_status_list: [
                {name: $translate.instant('ACTIVE_TEXT'), value: 1, id: 1, color: 'green', text: 'ACTIVE_TEXT'},
                {name: $translate.instant('INACTIVE_TEXT'), value: 0, id: 0, color: 'yellow', text: 'INACTIVE_TEXT'},
            ],

            __employee_status_list: [
                {name: $translate.instant('INACTIVE_TEXT'), value: 1, id: 1, color: 'gray', text: 'INACTIVE_TEXT'},
                {name: $translate.instant('LOGIN_MISSING_TEXT'),value: 2, id: 2,color: 'yellow',text: 'LOGIN_MISSING_TEXT'},
                {name: $translate.instant('PENDING_TEXT'), value: 3, id: 3, color: 'red', text: 'PENDING_TEXT'},
                {name: $translate.instant('HAS_ACCESS_TEXT'), value: 4, id: 4, color: 'blue', text: 'HAS_ACCESS_TEXT'},
            ],

            __relocation_service_progress_list: [
                {
                    name: $translate.instant('TODO_TEXT'),
                    value: 0,
                    id: 0,
                    color: 'yellow',
                    text: 'TODO_TEXT',
                    selected: false
                },
                {
                    name: $translate.instant('IN_PROGRESS_TEXT'),
                    value: 1,
                    id: 1,
                    color: 'blue',
                    text: 'IN_PROGRESS_TEXT',
                    selected: false
                },
                {
                    name: $translate.instant('COMPLETED_TEXT'),
                    value: 3,
                    id: 3,
                    color: 'green',
                    text: 'COMPLETED_TEXT',
                    selected: false
                },

                {
                    name: $translate.instant('CANCELLED_TEXT'),
                    value: -1,
                    id: -1,
                    color: 'red',
                    text: 'CANCELLED_TEXT',
                    selected: false
                },
            ],

            __team_status_list: [
                {text: 'DRAFT_STATUS_TEXT', name: 'DRAFT_STATUS_TEXT', value: 0, id: 0, color: 'yellow'},
                {text: 'ACTIVE_STATUS_TEXT', name: 'ACTIVE_STATUS_TEXT', value: 1, id: 1, color: 'green'},
            ],

            __department_status_list: [
                {text: 'DRAFT_STATUS_TEXT', name: 'DRAFT_STATUS_TEXT', value: 0, id: 0, color: 'yellow'},
                {text: 'ACTIVE_STATUS_TEXT', name: 'ACTIVE_STATUS_TEXT', value: 1, id: 1, color: 'green'},
            ],

            __make_status_list: [
                {text: 'DELETE_STATUS_TEXT', name: 'DELETE_STATUS_TEXT', value: -1, id: -1, color: 'red'},
                {text: 'INACTIVE_STATUS_TEXT', name: 'INACTIVE_STATUS_TEXT', value: 0, id: 0, color: 'yellow'},
                {text: 'ACTIVE_STATUS_TEXT', name: 'ACTIVE_STATUS_TEXT', value: 1, id: 1, color: 'green'},
            ],
        };

        this.filters = {
            assignments: {
                config: {},
                query: null,
                hr_company_id: null,
                employee_id: null,
                owner_uuid: null,
            },
            relocations: {
                config: {},
                query: null,
                hr_company_id: null,
                employee_id: null,
                owner_uuid: null,
            },
            tasks: {
                config: {},
                query: null,
                hr_company_id: null,
                employee_id: null,
                owner_uuid: null,
            },
            assignment_requests: {
                config: {},
                query: null,
                hr_company_id: null,
                employee_id: null,
                owner_uuid: null,
            },
            services: {
                config: {},
                query: null,
                hr_company_id: null,
                employee_id: null,
                owner_uuid: null,
                relocation_uuid: null,
                relocation_id: 0,
            },
            service_extract: {
                config: {},
                orders: [],
                query: null,
                service_company_id: null,
                specific_selected_fields: {},
            },

            archived_relocations: {
                config: {},
                query: null,
                hr_company_id: null,
                employee_id: null,
                owner_uuid: null,
            }
        };

        this.resetFilters = {
            assignments: {
                config: {},
                query: null,
                hr_company_id: null,
                employee_id: null,
                owner_uuid: null,
            },
            relocations: {
                config: {},
                query: null,
                hr_company_id: null,
                employee_id: null,
                owner_uuid: null,
            },
            tasks: {
                config: {},
                query: null,
                hr_company_id: null,
                employee_id: null,
                owner_uuid: null,
            },
            assignment_requests: {
                config: {},
                query: null,
                hr_company_id: null,
                employee_id: null,
                owner_uuid: null,
            },
            services: {
                config: {},
                query: null,
                hr_company_id: null,
                employee_id: null,
                owner_uuid: null,
                relocation_uuid: null,
                relocation_id: 0,
            },
            service_extract: {
                config: {},
                orders: [],
                query: null,
                service_company_id: null,
            },
            archived_relocations: {
                config: {},
                query: null,
                hr_company_id: null,
                employee_id: null,
                owner_uuid: null,
            }
        };


        this.getFilterFields = function () {
            return vm.filterFields;
        };

        this.getFilterComparations = function () {
            return vm.filterComparations;
        };

        this.setFilterListOperator = function (field) {
            let list1 = [
                'ACCOUNT_TEXT',
                'OWNER_TEXT',
                'ORIGIN_TEXT',
                'DESTINATION_TEXT',
                'SERVICE_TEXT',
                'APPROVAL_STATUS_TEXT',
                'ACTIVE_TEXT',
                'PROGRESS_TEXT',
                'COUNTRY_TEXT',
                'TYPE_TEXT',
            ];
            let list2 = [
                'START_DATE_TEXT',
                'END_DATE_TEXT',
                'DUE_DATE_TEXT',
                'DATE_TEXT',
                'SUBMISSION_DATE_TEXT',
                'ESTIMATED_START_DATE_TEXT',
                'ESTIMATED_END_DATE_TEXT',
                'EFFECTIVE_START_DATE_TEXT',
                'EFFECTIVE_END_DATE_TEXT',
                'CREATED_ON_TEXT',
                'DUE_DATE_TEXT',
                'SERVICE_CREATION_DATE_TEXT',
                'SERVICE_START_DATE_TEXT',
                'SERVICE_END_DATE_TEXT',
                'SERVICE_AUTHORISED_DATE_TEXT',
                'SERVICE_COMPLETION_DATE_TEXT',
                'SERVICE_EXPIRY_DATE_TEXT',
                'INITIATION_ON_TEXT',
                'START_OF_WORK_DATE_TEXT',
                'ARCHIVING_DATE_TEXT',

            ];
            let list3 = [
                'NUMBER_TEXT',
                'TAG_TEXT',
            ];
            let list4 = [];
            let list5 = [
                'ACCESS_TEXT',
                'STATUS_TEXT',
                'INITIATION_TEXT',
                'BILL_TO_TEXT',
                'CURRENCY_TEXT',
                'LANGUAGE_TEXT'
            ];
            //array_int
            let list6 = [
                'STATUS_ARRAY_TEXT',
                'COUNTRY_ARRAY_TEXT',
                'COUNTRY_ISO2_ARRAY_TEXT',
                'ACCOUNT_ARRAY_TEXT',
                'BOOKER_ARRAY_TEXT',
                'ASSIGNEE_ARRAY_TEXT',
                'OWNER_ARRAY_TEXT',
                'ORIGIN_ARRAY_TEXT',
                'DESTINATION_ARRAY_TEXT',
                'INVOICE_TEMPLATE_ARRAY_TEXT',
                'POLICY_ARRAY_TEXT',
                'SERVICE_ARRAY_TEXT',
                'REPORTER_ARRAY_TEXT',
                'PROVIDER_ARRAY_TEXT',
                'PAYMENT_METHOD_ARRAY_TEXT',
                'TYPE_ARRAY_TEXT',
                'ROLE_ARRAY_TEXT',
                'PRIORITY_ARRAY_TEXT',
            ];

            let list7 = [
                'INVOICE_STATUS_TEXT',
                'HAS_VISA_TEXT',
                'HAS_PASSPORT_TEXT',
                'HAS_DEPENDENT_TEXT',
                'HAS_SOCIAL_SECURITY_TEXT',
                'HAS_RELOCATION_TEXT',
                'HAS_ACCESS_TEXT',
                'ARCHIVED_TEXT',
                'FLAG_TEXT',
                'MILESTONE_TEXT'
            ];
            let list8 = [
                'DATE_RANGE_TEXT'
            ];

            if (list1.indexOf(field) != -1) {
                return [
                    {id: '1', value: 'equal', label: 'EQUAL_TEXT'},
                    {id: '2', value: 'notequal', label: 'NOT_EQUAL_TEXT'},
                    {id: '7', value: 'not existed', label: 'IS_NULL_TEXT'},
                    {id: '8', value: 'existed', label: 'NOT_NULL_TEXT'}
                ]
            } else if (list2.indexOf(field) != -1) {
                return [
                    {id: '3', value: 'before', label: 'BEFORE_TEXT'},
                    {id: '4', value: 'after', label: 'AFTER_TEXT'},
                    {id: '9', value: 'between', label: 'BETWEEN_TEXT'},
                    {id: '11', value: 'older', label: 'OLDER_THAN_TEXT'},
                    {id: '12', value: 'today', label: 'IS_TODAY_TEXT'}
                ]
            } else if (list3.indexOf(field) != -1) {
                return [
                    {id: '5', value: 'contain', label: 'CONTAIN_TEXT'}
                ]
            } else if (list4.indexOf(field) != -1) {
                return [
                    {id: '6', value: 'is', label: 'IS_TEXT'}
                ]
            } else if (list5.indexOf(field) != -1) {
                return [
                    {id: '1', value: 'equal', label: 'EQUAL_TEXT'},
                    {id: '2', value: 'notequal', label: 'NOT_EQUAL_TEXT'}
                ]
            } else if (list6.indexOf(field) != -1) {
                return [
                    {id: '10', value: 'in', label: 'IN_TEXT'},
                ]
            } else if (list7.indexOf(field) != -1) {
                return [
                    {id: '7', value: 'not existed', label: 'NO_TEXT'},
                    {id: '8', value: 'existed', label: 'YES_TEXT'}
                ]
            } else if (list8.indexOf(field) != -1) {
                return [
                    {id: '9', value: 'between', label: 'BETWEEN_TEXT'}
                ]
            } else {
                return null;
            }
        }

        this.getAssignmentTerminatedStatusList = function () {
            return vm.config.__assignment_terminated_status_list;
        };

        this.getRelocationStatusList = function () {
            return vm.config.__relocation_status_list;
        };


        this.getRelocationStatusList2 = function () {
            return vm.config.__relocation_status_list_2;
        };

        this.getArchivedRelocationStatusList2 = function () {
            return vm.config.__archived_relocation_status_list;
        };

        this.getAssigneeStatusList = function () {
            return vm.config.__assignee_status_list;
        };

        this.getInvoiceQuoteStatusList = function () {
            return vm.config.__invoice_quote_status_list;
        };

        this.getCreditNoteStatusList = function () {
            return vm.config.__credit_notes_status_list;
        };

        this.getInvoiceQuoteBillToList = function () {
            return vm.config.__invoice_quote_bill_to_list;
        };

        this.getServiceStatusList = function () {
            return vm.config.__service_status_list;
        };

        this.getTaskStatusList = function () {
            return vm.config.__task_status_list;
        };

        this.getTaskPriorityList = function () {
            return vm.config.__task_priority_list;
        };

        this.getAssignmentRequestStatusList = function () {
            return vm.config.__assignment_request_status_list;
        };

        this.getQuoteStatusList = function () {
            return vm.config.__quote_status_list;
        };

        this.getTransactionTypeList = function () {
            return vm.config.__transaction_type_list;
        };

        this.getTransactionPaymentMethodList = function () {
            return vm.config.__transaction_method_list;
        };

        this.getBillStatusList = function () {
            return vm.config.__bill_status_list;
        };

        this.getGmsMemberStatusList = function () {
            return vm.config.__app_member_status_list;
        };

        this.getGmsMemberRoleList = function () {
            return vm.config.__app_member_role_list;
        };

        this.getHrAccountStatusList = function () {
            return vm.config.__hr_account_status_list;
        };

        this.getEmployeeStatusList = function () {
            return vm.config.__employee_status_list;
        };

        this.getRelocationServiceProgressList = function () {
            return vm.config.__relocation_service_progress_list;
        };

        this.getTeamStatusList = function () {
            return vm.config.__team_status_list;
        };

        this.getDepartmentStatusList = function () {
            return vm.config.__department_status_list;
        };

        this.getMakeStatusList = function () {
            return vm.config.__make_status_list;
        };


        this.getFilterConfig = function (module, user_profile_uuid) {
            let _filter = DataThumbCache.get(module + '_' + user_profile_uuid);
            if (angular.isUndefined(_filter)) {
                _filter = vm.filters[module]
            }
            return _filter.config;
        };

        this.setFilterConfig = function (module, user_profile_uuid, data) {
            let _filter = DataThumbCache.get(module + '_' + user_profile_uuid);
            if (angular.isUndefined(_filter)) {
                _filter = vm.filters[module];
            }
            _filter.config = data;
            console.log('_filter', _filter);
            DataThumbCache.put(module + '_' + user_profile_uuid, _filter);
        };

        this.getFilterQuery = function (module, user_profile_uuid) {
            let _filter = DataThumbCache.get(module + '_' + user_profile_uuid);
            if (angular.isUndefined(_filter)) {
                _filter = vm.filters[module]
            }
            return _filter.query;
        };

        this.setFilterQuery = function (module, user_profile_uuid, data) {
            let _filter = DataThumbCache.get(module + '_' + user_profile_uuid);
            if (angular.isUndefined(_filter)) {
                _filter = vm.filters[module];
            }
            _filter.query = data;
            DataThumbCache.put(module + '_' + user_profile_uuid, _filter);
        };

        this.getFilterHrCompanyId = function (module, user_profile_uuid) {
            let _filter = DataThumbCache.get(module + '_' + user_profile_uuid);
            if (angular.isUndefined(_filter)) {
                _filter = vm.filters[module]
            }
            return _filter.hr_company_id;
        };

        this.setFilterHrCompanyId = function (module, user_profile_uuid, data) {
            let _filter = DataThumbCache.get(module + '_' + user_profile_uuid);
            if (angular.isUndefined(_filter)) {
                _filter = vm.filters[module];
            }
            _filter.hr_company_id = data;
            DataThumbCache.put(module + '_' + user_profile_uuid, _filter);
        };

        this.getFilterEmployeeId = function (module, user_profile_uuid) {
            let _filter = DataThumbCache.get(module + '_' + user_profile_uuid);
            if (angular.isUndefined(_filter)) {
                _filter = vm.filters[module]
            }
            return _filter.employee_id;
        };

        this.setFilterEmployeeId = function (module, user_profile_uuid, data) {
            let _filter = DataThumbCache.get(module + '_' + user_profile_uuid);
            if (angular.isUndefined(_filter)) {
                _filter = vm.filters[module];
            }
            _filter.employee_id = data;
            DataThumbCache.put(module + '_' + user_profile_uuid, _filter);
        };

        this.getFilterOwnerUuid = function (module, user_profile_uuid) {
            let _filter = DataThumbCache.get(module + '_' + user_profile_uuid);
            if (angular.isUndefined(_filter)) {
                _filter = vm.filters[module]
            }
            return _filter.owner_uuid;
        };

        this.setFilterOwnerUuid = function (module, user_profile_uuid, data) {
            let _filter = DataThumbCache.get(module + '_' + user_profile_uuid);
            if (angular.isUndefined(_filter)) {
                _filter = vm.filters[module];
            }
            _filter.owner_uuid = data;
            DataThumbCache.put(module + '_' + user_profile_uuid, _filter);
        };

        this.setFilterServiceCompanyId = function (module, user_profile_uuid, data) {
            let _filter = DataThumbCache.get(module + '_' + user_profile_uuid);
            if (angular.isUndefined(_filter)) {
                _filter = vm.filters[module];
            }
            _filter.service_company_id = data;
            DataThumbCache.put(module + '_' + user_profile_uuid, _filter);
        };

        this.getFilterServiceCompanyId = function (module, user_profile_uuid) {
            let _filter = DataThumbCache.get(module + '_' + user_profile_uuid);
            if (angular.isUndefined(_filter)) {
                _filter = vm.filters[module]
            }
            return _filter.service_company_id;
        };

        this.setFilterServiceSpecificFields = function (module, user_profile_uuid, data) {
            let _filter = DataThumbCache.get(module + '_' + user_profile_uuid);
            if (angular.isUndefined(_filter)) {
                _filter = vm.filters[module];
            }
            _filter.specific_selected_fields = data;
            DataThumbCache.put(module + '_' + user_profile_uuid, _filter);
        };

        this.getFilterServiceSpecificFields = function (module, user_profile_uuid) {
            let _filter = DataThumbCache.get(module + '_' + user_profile_uuid);
            if (angular.isUndefined(_filter)) {
                _filter = vm.filters[module]
            }
            return _filter.specific_selected_fields;
        };

        this.setFilterRelocationId = function (module, user_profile_uuid, data) {
            let _filter = DataThumbCache.get(module + '_' + user_profile_uuid);
            if (angular.isUndefined(_filter)) {
                _filter = vm.filters[module];
            }
            _filter.relocation_id = data;
            DataThumbCache.put(module + '_' + user_profile_uuid, _filter);
        };

        this.getFilterRelocationId = function (module, user_profile_uuid) {
            let _filter = DataThumbCache.get(module + '_' + user_profile_uuid);
            if (angular.isUndefined(_filter)) {
                _filter = vm.filters[module];
            }
            return _filter.relocation_id;
        };

        this.setFilterRelocationUuid = function (module, user_profile_uuid, data) {
            let _filter = DataThumbCache.get(module + '_' + user_profile_uuid);
            if (angular.isUndefined(_filter)) {
                _filter = vm.filters[module];
            }
            _filter.relocation_uuid = data;
            DataThumbCache.put(module + '_' + user_profile_uuid, _filter);
        };

        this.getFilterRelocationUuid = function (module, user_profile_uuid) {
            let _filter = DataThumbCache.get(module + '_' + user_profile_uuid);
            if (angular.isUndefined(_filter)) {
                _filter = vm.filters[module];
            }
            return _filter.relocation_uuid;
        };

        /**
         *
         * @param module
         * @param user_profile_uuid
         * @param data
         */
        this.setFilterOrders = function (module, user_profile_uuid, data) {
            let _filter = DataThumbCache.get(module + '_' + user_profile_uuid);
            if (angular.isUndefined(_filter)) {
                _filter = vm.filters[module];
            }
            _filter.orders = data;
            DataThumbCache.put(module + '_' + user_profile_uuid, _filter);
        };

        this.resetFilterCached = function (module, user_profile_uuid) {
            let _filter = DataThumbCache.get(module + '_' + user_profile_uuid);
            if (angular.isUndefined(_filter)) {
                _filter = vm.filters[module];
            }
            _filter.config = {};
            DataThumbCache.put(module + '_' + user_profile_uuid, _filter);
        };


        this.deleteFilterConfig = function (id) {
            var deferred = $q.defer();
            if (id == undefined || id == '') {
                deferred.resolve({success: false, msg: 'DATA_NOT_FOUND_TEXT'});
            } else {
                DataHttp.delete('/app/filter-config/deleteFilterConfig/' + id).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err, status) {
                    deferred.reject(err.data);
                });
            }
            return deferred.promise;
        };

        this.tmpSaveFilterConfig = function (data) {
            var deferred = $q.defer();
            DataHttp.post('/app/filter-config/tmpSaveFilterConfig', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.listItemsByFilter = function (data) {
            var deferred = $q.defer();
            DataHttp.post('/app/filter-config/listItemsByFilter', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.listFilterConfig = function (data) {
            var deferred = $q.defer();
            DataHttp.post('/app/filter-config/listFilterConfig', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.filterConfig = function (data) {
            var deferred = $q.defer();
            DataHttp.post('/app/filter-config/filterConfig', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        }

        this.saveFilterForUser = function (data) {
            var deferred = $q.defer();
            DataHttp.post('/app/filter-config/saveFilterConfig', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };

        this.listFilterField = function (data) {
            var deferred = $q.defer();
            DataHttp.post('/app/filter-config/listFilterField', data).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (err, status) {
                deferred.reject(err.data);
            });
            return deferred.promise;
        };
    }

})();


