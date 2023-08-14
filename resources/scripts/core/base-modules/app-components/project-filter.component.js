(function () {
    'use strict';

    angular
        .module('app.app-components')
        .component('projectFilter', {
            bindings: {
                columns: '=?',
                moduleName: '<',
                isModuleArchived: '<',
                isSearch: '<?',
                isFilter: '<?',
                isSort: '<?',
                stateParams: '<?',
            },
            templateUrl: '/app/assets/views/base-modules/app-components/project-filter.html',
            controller: function ($rootScope, $filter, AppDataService, ngDialog, urlBase, AppAuthService, $scope,
                                  $timeout, AppFilterConfigService,
                                  $translate, moment, DataThumbCache) {
                let vm = this;

                if (angular.isUndefined(vm.isSearch)) {
                    vm.isSearch = true;
                }

                if (angular.isUndefined(vm.isFilter)) {
                    vm.isFilter = true;
                }

                if (angular.isUndefined(vm.isSort)) {
                    vm.isSort = true;
                }

                if (angular.isUndefined(vm.isModuleArchived)) {
                    vm.isModuleArchived = false;
                }


                vm.currentUser = AppAuthService.getUser();
                vm.filterModel = null;
                vm._listFilterCache = [
                    'assignments',
                    'relocations',
                    'tasks',
                    'assignment_requests',
                    'services',
                    'service_extract',
                    'archived_relocations',
                ];

                vm.dataItemsOrig = [];
                vm.filterDirty = false;
                vm.openFilter = false;
                vm.currentFilter = null;
                vm.reset = false;
                vm.numberFilters = 0;

                vm.aListValue = [];
                vm.aCollection = [];
                vm.aListFilterField = [];
                vm.aFieldKind = AppFilterConfigService.getFilterFields();
                vm.comparations = AppFilterConfigService.getFilterComparations()

                vm.__assignment_extract_status_list = angular.copy(AppFilterConfigService.getAssignmentTerminatedStatusList());
                vm.__relocation_extract_status_list = angular.copy(AppFilterConfigService.getRelocationStatusList());
                vm.__assignee_extract_status_list = angular.copy(AppFilterConfigService.getAssigneeStatusList());
                vm.__invoice_extract_status_list = angular.copy(AppFilterConfigService.getInvoiceQuoteStatusList());
                vm.__invoice_extract_bill_to_list = angular.copy(AppFilterConfigService.getInvoiceQuoteBillToList());
                vm.__service_extract_status_list = angular.copy(AppFilterConfigService.getServiceStatusList());
                vm.__assignments_status_list = angular.copy(AppFilterConfigService.getAssignmentTerminatedStatusList());
                vm.__relocations_status_list = angular.copy(AppFilterConfigService.getRelocationStatusList2());
                vm.__tasks_status_list = angular.copy(AppFilterConfigService.getTaskStatusList());
                vm.__tasks_priority_list = angular.copy(AppFilterConfigService.getTaskPriorityList());
                vm.__assignment_requests_status_list = angular.copy(AppFilterConfigService.getAssignmentRequestStatusList());

                vm.__invoices_status_list = angular.copy(AppFilterConfigService.getInvoiceQuoteStatusList());
                vm.__invoices_bill_to_list = angular.copy(AppFilterConfigService.getInvoiceQuoteBillToList());

                vm.__quotes_status_list = angular.copy(AppFilterConfigService.getQuoteStatusList());
                vm.__quotes_bill_to_list = angular.copy(AppFilterConfigService.getInvoiceQuoteBillToList());

                vm.__credit_notes_status_list = angular.copy(AppFilterConfigService.getCreditNoteStatusList());
                vm.__credit_notes_bill_to_list = angular.copy(AppFilterConfigService.getInvoiceQuoteBillToList());

                vm.__transactions_type_list = angular.copy(AppFilterConfigService.getTransactionTypeList());
                vm.__transactions_payment_method_list = angular.copy(AppFilterConfigService.getTransactionPaymentMethodList());

                vm.__bills_status_list = angular.copy(AppFilterConfigService.getBillStatusList());

                vm.__app_members_status_list = angular.copy(AppFilterConfigService.getGmsMemberStatusList());
                vm.__app_members_role_list = angular.copy(AppFilterConfigService.getGmsMemberRoleList());

                vm.__hr_accounts_status_list = angular.copy(AppFilterConfigService.getHrAccountStatusList());

                vm.__employees_status_list = angular.copy(AppFilterConfigService.getEmployeeStatusList());

                vm.__services_status_list = angular.copy(AppFilterConfigService.getRelocationServiceProgressList());
                vm.__archived_relocations_status_list = angular.copy(AppFilterConfigService.getArchivedRelocationStatusList2());

                // Field in this list have limited choices, no need to search
                vm.aListStatus = [
                    'STATUS_TEXT',
                    'APPROVAL_STATUS_TEXT',
                    'PROGRESS_TEXT',
                    'INVOICE_STATUS_TEXT',
                    'TYPE_TEXT',
                    'INITIATION_TEXT',
                ];

                vm.optionsStatusArray = [];
                vm.getStatusArray = function () {
                    console.log('vm.__' + vm.moduleName + '_status_list');
                    return eval('vm.__' + vm.moduleName + '_status_list');
                };

                vm.getPriorityArray = function () {
                    return eval('vm.__' + vm.moduleName + '_priority_list');
                };

                vm.getPaymentMethodArray = function () {
                    return eval('vm.__' + vm.moduleName + '_payment_method_list');
                };

                vm.getTypeArray = function () {
                    return eval('vm.__' + vm.moduleName + '_type_list');
                };

                vm.getRoleArray = function () {
                    return eval('vm.__' + vm.moduleName + '_role_list');
                };

                vm.query = '';

                // Dialog manager filter
                vm.dialogManageFilter = function () {
                    let mfDialog = ngDialog.open({
                        template: 'managerFilterDialog.html',
                        className: 'ngdialog-theme-right-box sm-box no-background manage-filter-dialog',
                        closeByDocument: true,
                        disableAnimation: true,
                        data: {
                            moduleName: vm.moduleName,
                            isModuleArchived: vm.isModuleArchived
                        }
                    });

                    mfDialog.closePromise.then(function () {
                        vm.getFilterConfig();
                    });
                };

                vm.onChangeFilter = function ($select, forced = true, overrideFilter = false) {
                    // if filter dirty, confirm discard
                    if ($select.selected.id == 0 &&
                        $select.selected.name != $translate.instant('LAST_30_DAY_TEXT') &&
                        $select.selected.name != 'LAST_30_DAY_TEXT') {
                        vm.numberFilters = 0;
                        vm.clearFilter();
                        return;
                    }
                    console.log('$select', $select)
                    if ($select.selected.id > 0) {
                        if (_.includes(vm._listFilterCache, vm.moduleName)) {
                            AppFilterConfigService.setFilterConfig(vm.moduleName, vm.currentUser.uuid, $select.selected)
                        }
                    } else {
                        if (_.includes(vm._listFilterCache, vm.moduleName)) {
                            AppFilterConfigService.setFilterConfig(vm.moduleName, vm.currentUser.uuid, {})
                            vm.filterModel = null;
                        }

                    }

                    // else load init filter
                    // init filter from filter collection
                    vm.currentFilter = vm.aCollection.find(filter => filter.id === $select.selected.id);
                    if (vm.currentFilter.items === undefined || vm.currentFilter.items.length === 0) {
                        let data = {
                            'filter_config_id': $select.selected.id,
                            'target': vm.moduleName
                        };

                        AppFilterConfigService.listItemsByFilter(data).then(function (res) {
                            if (res.success) {
                                vm.numberFilters = _.size(res.data);
                                console.log('_.size(res.data)', _.size(res.data));
                                vm.dataItemsOrig.push({
                                    'filter_config_id': $select.selected.id,
                                    'data': res.data,
                                });

                                angular.forEach(res.data, function (item) {
                                    vm.findDataByFieldOrig(item);
                                });
                                vm.applyFilterConfig(false);
                                $timeout(function () {
                                    let data = {
                                        'filter_config_id': $select.selected.id,
                                        'items': res.data
                                    };
                                    $scope.publish('tmp_save_filter_config_' + vm.moduleName);
                                    if (overrideFilter == true) {
                                        let _data = $select.selected;
                                        _data.items = vm.currentFilter.items;
                                        vm.filterModel = _data;
                                        vm.currentFilter = _data;
                                    }
                                    AppFilterConfigService.tmpSaveFilterConfig(data).then(function (res) {
                                        if (res.success) {
                                            $scope.publish('apply_filter_config_' + vm.moduleName, vm.currentFilter.id);
                                        } else {
                                            $scope.publish('tmp_save_filter_config_' + vm.moduleName + '_error', res);
                                        }
                                    });
                                }, 200);
                            } else {
                                $scope.publish('apply_filter_config_' + vm.moduleName, null);
                                vm.numberFilters = 0;
                            }
                        });
                    } else {
                        vm.numberFilters = vm.currentFilter.items.length;
                        console.log('vm.numberFilters', vm.numberFilters);
                        vm.filterModel = vm.currentFilter;
                        if (forced) {
                            $timeout(function () {
                                vm.applyFilterConfig();
                            }, 50);
                        }

                    }
                    vm.reset = false;


                    // vm.toggleFilterOpen();
                };
                vm.initLastMonth = function (forced = true) {
                    let name = $translate.instant('LAST_30_DAY_TEXT');
                    let start_date_local = moment().subtract(29, 'days').unix();
                    let end_date_local = moment().unix();
                    let filterDueDate = {
                        selected: {
                            'id': 0,
                            'name': name,
                            'items': [{
                                type: {
                                    'id': 0,
                                    'name': 'DATE_RANGE_TEXT'
                                },
                                comparation: {
                                    'id': '9',
                                    'label': 'BETWEEN_TEXT',
                                },
                                data: {startDate: start_date_local, endDate: end_date_local},
                                kind: 'date',
                                dataSelection: true,
                                listOperator: [
                                    _.find(vm.comparations, function (o) {
                                        return o.label == 'BETWEEN_TEXT';
                                    })
                                ]
                            }]
                        }
                    };

                    vm.aCollection.push(filterDueDate.selected);

                    vm.filterModel = filterDueDate.selected;
                    vm.onChangeFilter(filterDueDate, forced);
                    vm.toggleFilterOpen();
                };
                vm.initFilter = function () {
                    if (vm.moduleName == 'reports' || vm.moduleName == 'finance_dashboard') {
                        vm.initLastMonth(false);
                    } else {
                        let name = $translate.instant('ALL_' + vm.moduleName.toUpperCase() + '_TEXT');
                        vm.aCollection.push({
                            'id': 0,
                            'name': name,
                            'target_active': vm.isModuleArchived ? 0 : 1,
                            'user_profile_id': 0,
                            'items': []
                        });
                    }
                };

                vm.clearFilter = function () {
                    let resetFilter = vm.aCollection.find(filter => filter.id == 0);

                    // console.log('vm.currentFilter', vm.currentFilter)
                    // console.log('vm.resetFilter', resetFilter)

                    vm.clearSearchDefault();
                    if (_.includes(vm._listFilterCache, vm.moduleName)) {
                        AppFilterConfigService.setFilterConfig(vm.moduleName, vm.currentUser.uuid, {})
                        AppFilterConfigService.setFilterQuery(vm.moduleName, vm.currentUser.uuid, '')
                        vm.filterModel = null;
                    }
                    // toggle filter config panel
                    if (vm.openFilter == true) {
                        vm.toggleFilter();
                    }
                    if (resetFilter != undefined && (resetFilter.name == $translate.instant('LAST_30_DAY_TEXT') ||
                        resetFilter.name == 'LAST_30_DAY_TEXT')) {
                        let _index = _.findIndex(vm.aCollection, function (o) {
                            return o.id == 0
                        });
                        vm.aCollection.splice(_index, 1);
                        vm.initLastMonth(true);
                        return;
                    } else {
                        let currentData = vm.dataItemsOrig.find(filter => filter.filter_config_id == vm.currentFilter.id);
                        let resetData = angular.isDefined(currentData) ? currentData.data : [];

                        vm.filterModel = resetFilter;
                        // console.log('resetData', resetData)
                        // angular.forEach(resetData, function (item) {
                        //     vm.findDataByFieldOrig(item);
                        // });
                        // console.log(vm.currentFilter);
                        // if (angular.isDefined(vm.currentFilter) && vm.currentFilter != null && vm.currentFilter != ''){
                        //     vm.currentFilter.items = {};
                        // }

                        vm.numberFilters = 0;
                        vm.reset = true;
                        vm.query = '';
                        // Refresh items list
                        $scope.publish('clear_filter_config');
                    }

                };

                vm.setFieldKind = function (field) {
                    return vm.aFieldKind[field]
                }

                vm.setFieldData = function (field, item) {
                }

                vm.toggleFilter = function () {
                    vm.openFilter = !vm.openFilter;
                };

                vm.toggleFilterOpen = function () {
                    if (vm.openFilter === false) {
                        vm.openFilter = true;
                    }
                };

                vm.sortByColumnAndOrder = function (module, columnName, isDescending, columnIndex) {
                    let aCriteria = {
                        column: columnName.toUpperCase(),
                        descending: isDescending
                    };
                    angular.forEach(vm.columns, function (item, index) {
                        if (index == columnIndex) {
                            item.default = true;
                        } else {
                            item.default = false;
                        }
                    });

                    $scope.publish('sort_by_column_and_order_' + module, aCriteria);
                };

                vm.executeSearch = function () {
                    $scope.publish('text_search_' + vm.moduleName, vm.query);
                };

                vm.$onChanges = function () {
                    vm.getFilterConfig();
                    vm.getFilterField();
                    $timeout(function () {
                        let _configFilterCache = {};
                        if (_.includes(vm._listFilterCache, vm.moduleName)) {
                            _configFilterCache = AppFilterConfigService.getFilterConfig(vm.moduleName, vm.currentUser.uuid);
                            console.log('_configFilterCache', _configFilterCache);
                            vm.query = AppFilterConfigService.getFilterQuery(vm.moduleName, vm.currentUser.uuid);
                            if (angular.isDefined(_configFilterCache) && angular.isDefined(_configFilterCache.id) && _configFilterCache.id > 0) {
                                vm.currentFilter = _configFilterCache;
                                vm.filterModel = _configFilterCache;
                                console.log('vm.query', vm.query);
                                vm.applyFilterConfig();
                                return;
                            }

                        }
                        if (angular.isUndefined(_configFilterCache.id)) {
                            let resetFilter = vm.aCollection.find(filter => filter.id == 0);
                            vm.openFilter = false;
                            vm.filterModel = resetFilter;
                            if (resetFilter != undefined && (resetFilter.name == $translate.instant('LAST_30_DAY_TEXT') ||
                                resetFilter.name == 'LAST_30_DAY_TEXT')) {
                                vm.reset = false;
                            } else {
                                vm.reset = true;
                            }
                            vm.applyFilterParamUrl();
                        }

                    }, 500);
                };

                vm.getFilterConfig = function () {
                    if(vm.isFilter){
                        vm.aCollection = [];
                        vm.initFilter();
                        let connectedUser = AppAuthService.getUser();
                        let data = {
                            'moduleName': vm.moduleName,
                            'user_profile_id': connectedUser.id,
                            'company_id': connectedUser.company_id,
                            'is_admin': connectedUser.isAdmin,
                            'is_manager': false,
                            'target_active': vm.isModuleArchived ? 0 : 1
                        };

                        AppFilterConfigService.listFilterConfig(data).then(function (res) {
                            angular.forEach(res.data, function (filterConfig) {
                                vm.aCollection.push({
                                    'id': filterConfig.id,
                                    'name': filterConfig.name,
                                    'target_active': filterConfig.target_active,
                                    'user_profile_id': filterConfig.user_profile_id ? filterConfig.user_profile_id : 0,
                                    'creator_user_profile_id': filterConfig.creator_user_profile_id ? filterConfig.creator_user_profile_id : 0,
                                    'items': []
                                });

                                if (vm.moduleName == 'assignment_requests' && filterConfig.name == 'FILTER_STATUS_PENDING_TEXT') {
                                    let filterCached = DataThumbCache.get(vm.moduleName + '_' + vm.currentUser.uuid);
                                    if (angular.isUndefined(filterCached)) {
                                        let filterPending = {
                                            selected: {
                                                'id': filterConfig.id,
                                                'name': filterConfig.name,
                                                'target_active': filterConfig.target_active,
                                                'user_profile_id': filterConfig.user_profile_id ? filterConfig.user_profile_id : 0,
                                                'creator_user_profile_id': filterConfig.creator_user_profile_id ? filterConfig.creator_user_profile_id : 0,
                                                'items': []
                                            }
                                        };

                                        vm.onChangeFilter(filterPending, true, true);

                                    }
                                }
                            });

                        });
                    }
                };


                vm.getFilterField = function () {
                    if(vm.isFilter){
                        let data = {
                            'target': vm.moduleName
                        };

                        AppFilterConfigService.listFilterField(data).then(function (res) {
                            angular.forEach(res.data, function (field) {
                                vm.aListFilterField.push(
                                    {
                                        'id': field.id,
                                        'name': field.name,
                                    }
                                );
                            });
                        });
                    }
                };

                vm.setListOperator = function (field) {
                    return AppFilterConfigService.setFilterListOperator(field);
                }

                // Allow get value list on typing search
                vm.findDataByField = function (fieldName, query) {
                    let oValueSet = vm.aListValue.find(filter => filter.name === fieldName);
                    // If value set of this field not existed, init it
                    if (!angular.isDefined(oValueSet)) {
                        oValueSet = {
                            'name': fieldName
                        };
                        vm.aListValue.push(oValueSet);
                    }

                    // Apply text search except elements in kind of status
                    switch (fieldName) {
                        case 'STATUS_TEXT':
                            let data = [];
                            angular.forEach(eval('vm.__' + vm.moduleName + '_status_list'), function (status) {
                                data.push({
                                    id: status.value,
                                    name: status.name
                                })
                            });
                            oValueSet.data = data;
                            break;
                        case 'BILL_TO_TEXT':
                            let _billto = [];
                            angular.forEach(eval('vm.__' + vm.moduleName + '_bill_to_list'), function (status) {
                                _billto.push({
                                    id: status.value,
                                    name: status.name
                                })
                            });
                            oValueSet.data = _billto;
                            break;
                        default:
                            break;
                    }
                };

                // On loading page, get saved value then store it as original set (to use after to reset)
                vm.findDataByFieldOrig = function (item) {

                    let fieldName = item.field_name;
                    let id = item.value;

                    switch (fieldName) {
                        case 'NUMBER_TEXT':
                        case 'START_DATE_TEXT':
                        case 'END_DATE_TEXT':
                        case 'SUBMISSION_DATE_TEXT':
                        case 'ESTIMATED_START_DATE_TEXT':
                        case 'ESTIMATED_END_DATE_TEXT':
                        case 'EFFECTIVE_START_DATE_TEXT':
                        case 'EFFECTIVE_END_DATE_TEXT':
                        case 'CREATED_ON_TEXT':
                        case 'DUE_DATE_TEXT':
                        case 'DATE_TEXT':
                        case 'DATE_RANGE_TEXT':
                        case 'SERVICE_CREATION_DATE_TEXT':
                        case 'SERVICE_START_DATE_TEXT':
                        case 'SERVICE_END_DATE_TEXT':
                        case 'SERVICE_AUTHORISED_DATE_TEXT':
                        case 'SERVICE_COMPLETION_DATE_TEXT':
                        case 'SERVICE_EXPIRY_DATE_TEXT':
                        case 'INITIATION_ON_TEXT':
                        case 'START_OF_WORK_DATE_TEXT':
                            vm.fillCurrentItem(item);
                            break;
                        case 'COUNTRY_TEXT':
                        case 'LANGUAGE_TEXT':
                        case 'CURRENCY_TEXT':
                            vm.fillCurrentItem(item, null);
                            break;
                        // case 'OWNER_TEXT':
                        //     // Case of SELF_TEXT : current user
                        //     if (item.value == 'SELF_TEXT') {
                        //         let currentUser = AppAuthService.getUser();
                        //         item.value = currentUser.id;
                        //         item.name = currentUser.firstname + ' ' + currentUser.lastname;
                        //     }

                        //     if (item.value != null) {
                        //         GmsMemberService.getObjectMembersList().then(function (res) {
                        //             let owner = _.find(res.data, function (o) {
                        //                 return o.id == item.value;
                        //             });

                        //             let resData = [
                        //                 {
                        //                     id: item.value,
                        //                     name: owner.firstname + ' ' + owner.lastname
                        //                 }
                        //             ];

                        //             if (res.success) {
                        //                 vm.fillCurrentItem(item, resData);
                        //             }
                        //         });
                        //     } else {
                        //         vm.fillCurrentItem(item, null);
                        //     }
                        //     break;
                        case 'STATUS_TEXT':
                            let data = [];
                            angular.forEach(eval('vm.__' + vm.moduleName + '_status_list'), function (status) {
                                data.push({
                                    id: status.value,
                                    name: status.name
                                })
                            });
                            vm.fillCurrentItem(item, data);
                            break;
                        case 'STATUS_ARRAY_TEXT':
                            let ids = item.value.split(',');
                            let results = [];
                            angular.forEach(ids, function (id) {
                                let __item = _.find(vm.getStatusArray(), function (o) {
                                    return o.id == id;
                                });
                                results.push(__item);
                            });
                            vm.fillCurrentItem(item, results);
                            break;
                        case 'PRIORITY_TEXT':
                            let arr = [];
                            angular.forEach(eval('vm.__' + vm.moduleName + '_priority_list'), function (priority) {
                                data.push({
                                    id: priority.value,
                                    name: priority.name
                                })
                            });
                            vm.fillCurrentItem(item, arr);
                            break;
                        case 'PRIORITY_ARRAY_TEXT':
                            let priorityIds = item.value.split(',');
                            let resPriority = [];
                            angular.forEach(priorityIds, function (id) {
                                let __item = _.find(vm.getPriorityArray(), function (o) {
                                    return o.id == id;
                                });
                                resPriority.push(__item);
                            });
                            vm.fillCurrentItem(item, resPriority);
                            break;
                        case 'PAYMENT_METHOD_ARRAY_TEXT':
                            let payment_ids = item.value.split(',');
                            let _results = [];
                            angular.forEach(payment_ids, function (id) {
                                let __item = _.find(vm.getPaymentMethodArray(), function (o) {
                                    return o.id == id;
                                });
                                _results.push(__item);
                            });
                            vm.fillCurrentItem(item, _results);
                            break;
                        case 'TYPE_ARRAY_TEXT':
                            let type_ids = item.value.split(',');
                            let typeResults = [];
                            angular.forEach(type_ids, function (id) {
                                let __item = _.find(vm.getTypeArray(), function (o) {
                                    return o.id == id;
                                });
                                typeResults.push(__item);
                            });
                            vm.fillCurrentItem(item, typeResults);
                            break;
                        case 'ROLE_ARRAY_TEXT':
                            let role_ids = item.value.split(',');
                            let roleResults = [];
                            angular.forEach(role_ids, function (id) {
                                let __item = _.find(vm.getRoleArray(), function (o) {
                                    return o.id == id;
                                });
                                roleResults.push(__item);
                            });
                            vm.fillCurrentItem(item, roleResults);
                            break;
                        case 'COUNTRY_ARRAY_TEXT':
                        case 'ORIGIN_ARRAY_TEXT':
                        case 'DESTINATION_ARRAY_TEXT':
                            AppDataService.getCountriesByIds({ids: item.value}).then(function (res) {
                                if (res.success) {
                                    vm.fillCurrentItem(item, res.data);
                                }
                            });
                            break;
                        case 'OWNER_ARRAY_TEXT':
                        // case 'REPORTER_ARRAY_TEXT':
                        //     GmsWorkersService.searchWorkers({
                        //         limit: 10000,
                        //         ids: item.value
                        //     }).then(function (res) {
                        //         if (res.success == true) {
                        //             vm.fillCurrentItem(item, res.data);
                        //         }
                        //     });
                        //     break;
                        case 'ACCOUNT_ARRAY_TEXT':
                            AppDataService.getListCompanies({
                                ids: item.value,
                                hasBooker: true,
                                pageSize: 1000
                            }).then(function (res) {
                                if (res.success) {
                                    vm.fillCurrentItem(item, res.data);
                                } else {
                                    vm.fillCurrentItem(item, null);
                                }
                            }, function () {
                                vm.fillCurrentItem(item, null);
                            });
                            break;
                        case 'BOOKER_ARRAY_TEXT':
                            AppDataService.getBookersByIds({ids: item.value}).then(function (res) {
                                if (res.success) {
                                    vm.fillCurrentItem(item, res.data);
                                } else {
                                    vm.fillCurrentItem(item, null);
                                }
                            }, function () {
                                vm.fillCurrentItem(item, null);
                            });
                            break;
                        case 'ASSIGNEE_ARRAY_TEXT':
                            AppDataService.searchAssignee({
                                limit: 10000,
                                ids: item.value
                            }).then(function (res) {
                                if (res.success) {
                                    vm.fillCurrentItem(item, res.data);
                                }
                            })
                            break;
                        case 'BILL_TO_TEXT':
                            let _billto = [];
                            angular.forEach(eval('vm.__' + vm.moduleName + '_bill_to_list'), function (status) {
                                _billto.push({
                                    id: status.value,
                                    name: status.name
                                })
                            });
                            console.log('_billto', _billto);
                            vm.fillCurrentItem(item, _billto);
                            break;
                        case 'INVOICE_TEMPLATE_ARRAY_TEXT':
                            AppDataService.getListInvoiceTemplateByIds({ids: item.value}).then(function (res) {
                                if (res.success) {
                                    vm.fillCurrentItem(item, res.data);
                                } else {
                                    vm.fillCurrentItem(item, null);
                                }
                            });
                            break;
                        case 'POLICY_ARRAY_TEXT':
                            AppDataService.getPoliciesList({ids: item.value}).then(function (res) {
                                if (res.success) {
                                    vm.fillCurrentItem(item, res.data);
                                } else {
                                    vm.fillCurrentItem(item, null);
                                }
                            });
                            break;
                        case 'SERVICE_ARRAY_TEXT':
                            AppDataService.getServiceListActiveByIds({ids: item.value}).then(function (res) {
                                if (res.success) {
                                    vm.fillCurrentItem(item, res.data);
                                } else {
                                    vm.fillCurrentItem(item, null);
                                }
                            });
                            break;
                        case 'PROVIDER_ARRAY_TEXT':
                            AppDataService.getServiceProviderSimpleList({ids: item.value}).then(function (res) {
                                if (res.success) {
                                    vm.fillCurrentItem(item, res.data);
                                } else {
                                    vm.fillCurrentItem(item, null);
                                }
                            });
                            break;
                        default:
                            vm.fillCurrentItem(item);
                            break;
                    }
                };

                // After get value saved in DB, fill current model as a collection
                vm.fillCurrentItem = function (item, resData, forced = false) {

                    let data;
                    let dataSelection = false;
                    let comparation_label = vm.comparations.find(filter => filter.id === item.operator).label;
                    if (item.value == null) {
                        data = null;
                    } else {
                        dataSelection = true;
                        if (vm.aFieldKind[item.field_name] === 'int') {
                            if (item.field_name == 'COUNTRY_TEXT' || item.field_name == 'LANGUAGE_TEXT') {
                                data = item.value;
                            } else if (item.field_name == 'INVOICE_STATUS_TEXT') {
                                dataSelection = false;
                            } else {
                                let aResData = {
                                    'name': item.field_name,
                                    'data': resData
                                };
                                vm.aListValue.push(aResData);
                                // let name = resData[0].name;
                                let name = _.find(resData, function (o) {
                                    return o.id == item.value;
                                }).name;

                                data = {
                                    'id': item.value,
                                    'name': name
                                };
                            }
                        } else if (vm.aFieldKind[item.field_name] === 'date') {
                            if (comparation_label == 'BETWEEN_TEXT') {
                                if (_.isObject(item.value)) {
                                    data = item.value
                                } else {
                                    if (item.value === 'TODAY') {
                                        data = {
                                            'startDate': moment.utc(moment.utc().format('YYYY-MM-DD')).unix(),
                                            'endDate': moment.utc(moment.utc().format('YYYY-MM-DD')).unix(),
                                        }
                                    } else {
                                        data = JSON.parse(item.value);
                                    }
                                }
                            } else {
                                data = item.value;
                            }
                        } else if (vm.aFieldKind[item.field_name] === 'string') {
                            data = item.value;
                        } else if (vm.aFieldKind[item.field_name] === 'boolean') {
                            data = item.value;
                        } else if (vm.aFieldKind[item.field_name] === 'array') {
                            data = resData;
                        }
                    }

                    let itemData = {
                        'type': {
                            'id': item.field_id,
                            'name': item.field_name
                        },
                        'comparation': {
                            'id': item.operator,
                            'label': comparation_label,
                        },
                        'data': data,
                        'kind': vm.setFieldKind(item.field_name),
                        'filter_config_item_id': item.item_id,
                        listOperator: vm.setListOperator(item.field_name),
                        'dataSelection': dataSelection
                    };
                    console.log('itemData', itemData);
                    vm.currentFilter.items.push(itemData);

                };

                vm.changeField = function (index) {

                    // set data
                    vm.currentFilter.items[index]['comparation'] = null;
                    vm.currentFilter.items[index]['data'] = null;
                    vm.currentFilter.items[index]['kind'] = vm.aFieldKind[vm.currentFilter.items[index].type.name];
                    if (vm.currentFilter.items[index]['kind'] == 'array') {
                        vm.currentFilter.items[index]['data'] = [];
                    } else {
                        vm.currentFilter.items[index]['data'] = null;
                    }
                    vm.currentFilter.items[index].listOperator = vm.setListOperator(vm.currentFilter.items[index].type.name)

                    // remove error
                    vm.currentFilter.items[index].typeError = false;
                    vm.currentFilter.items[index].comparationError = false;
                    vm.currentFilter.items[index].dataError = false;

                    // Use to show/hide the data selector column
                    if (vm.currentFilter.items[index].type.name == 'INVOICE_STATUS_TEXT') {
                        vm.currentFilter.items[index].dataSelection = false;
                    } else {
                        vm.currentFilter.items[index].dataSelection = true;
                    }
                };

                vm.changeComparation = function (index, label) {

                    // For elements in this list, do not show data selector
                    let list = [
                        'IS_NULL_TEXT',
                        'NOT_NULL_TEXT',
                        'YES_TEXT',
                        'NO_TEXT'
                    ];
                    if (list.indexOf(label) != -1) {
                        vm.currentFilter.items[index].dataSelection = false;
                    } else {
                        vm.currentFilter.items[index].dataSelection = true;
                        // vm.findDataByField(vm.currentFilter.items[index].type.name, null);
                    }

                    // Case of change from dates range to delay
                    // Clean value then choose type int or obj
                    if (label == 'BEFORE_TEXT' || label == 'AFTER_TEXT') {
                        if (typeof (vm.currentFilter.items[index].data) == 'object') {
                            vm.currentFilter.items[index].data = '';
                        }
                    } else if (label == 'BETWEEN_TEXT') {
                        if (typeof (vm.currentFilter.items[index].data) == 'string') {
                            vm.currentFilter.items[index].data = {
                                startDate: '',
                                endDate: ''
                            };
                        }
                    }

                    vm.currentFilter.items[index].comparationError = false;
                }

                vm.changeData = function (index) {
                    if (vm.currentFilter.items[index].data != null && vm.currentFilter.items[index].data != '') {
                        vm.currentFilter.items[index].dataError = false;
                    } else {
                        console.log('vm.currentFilter.items[index].comparation', vm.currentFilter.items[index].comparation);
                        if (vm.currentFilter.items[index].comparation.id == 7
                            || vm.currentFilter.items[index].comparation.id == 8) {
                            vm.currentFilter.items[index].dataError = false;
                            vm.currentFilter.items[index].data = null;
                        } else {
                            vm.currentFilter.items[index].dataError = true;
                        }
                    }
                }

                vm.changeSearch = function (query, index) {
                    let typeName = vm.currentFilter.items[index].type.name;
                    vm.findDataByField(typeName, query);
                };

                // Remove filter item
                vm.removeFilterItem = function (index) {
                    vm.currentFilter.items.splice(index, 1);
                    vm.filterDirty = true;
                };

                // add filter item
                vm.addFilterItem = function () {
                    vm.currentFilter.items.push({
                        'type': null,
                        'comparation': null,
                        'data': null
                    });
                    vm.filterDirty = true;
                };

                // Apply filter
                vm.applyFilterConfig = function (forced = true) {

                    let items = [];
                    // vm.numberFilters = _.size(vm.currentFilter.items);
                    vm.currentFilter.items.forEach(function (item) {
                        let value = '';
                        if (item.dataSelection) {
                            if (item.kind === 'int') {
                                if (_.isObject(item.data)) {
                                    value = item.data.id;
                                } else {
                                    value = item.data
                                }
                            } else if (item.kind === 'date' || item.kind === 'string') {
                                value = item.data;
                            } else if (item.kind === 'array') {
                                angular.forEach(item.data, function (o) {
                                    if (_.isObject(o)) {
                                        if (item.type.name == 'COUNTRY_ISO2_ARRAY_TEXT') {
                                            if (value) {
                                                value += ',' + o.iso2;
                                            } else {
                                                value = o.iso2;
                                            }
                                        } else {
                                            if (value || _.isNumber(value)) {
                                                value += ',' + o.id;
                                            } else {
                                                value = o.id;
                                            }
                                        }
                                    } else {
                                        if (value) {
                                            value += ',' + o;
                                        } else {
                                            value = o;
                                        }
                                    }
                                });
                            }
                        }
                        items.push({
                            'field_name': item.type.name,
                            'operator': item.comparation.id,
                            'value': value,
                        });
                    });

                    if (vm.numberFilters <= 0) {
                        vm.numberFilters = _.size(vm.currentFilter.items);
                    }


                    let data = {
                        'filter_config_id': vm.currentFilter.id,
                        'items': items
                    };
                    if (forced) {
                        $scope.publish('tmp_save_filter_config_' + vm.moduleName);
                        AppFilterConfigService.tmpSaveFilterConfig(data).then(function (res) {
                            if (res.success) {
                                $scope.publish('apply_filter_config_' + vm.moduleName, vm.currentFilter.id);
                            } else {
                                $scope.publish('tmp_save_filter_config_' + vm.moduleName + '_error', res);
                            }
                        });
                    }
                };

                // Save filter
                vm.openSaveFiltersDialog = function () {

                    let error;

                    angular.forEach(vm.currentFilter.items, function (item, index) {
                        if (item.type == null) {
                            vm.currentFilter.items[index].typeError = true;
                            error = true;
                        }

                        if (item.comparation == null) {
                            vm.currentFilter.items[index].comparationError = true;
                            error = true;
                        }

                        if (
                            vm.currentFilter.items[index].dataSelection &&
                            (item.kind != 'boolean' && (item.data == null || item.data == ''))) {
                            vm.currentFilter.items[index].dataError = true;
                            error = true;
                        }
                    })

                    if (error) return;

                    ngDialog.open({
                        template: urlBase.tplBase('base-modules/app-components', 'save-filters-dialog'),
                        className: 'ngdialog-theme-default sm-box',
                        controller: 'SaveFilterDialogController',
                        data: {
                            target: vm.moduleName,
                            current_filter: vm.currentFilter
                        }
                    });
                };

                vm.deleteFilterConfig = function () {
                    AppFilterConfigService.deleteFilterConfig(vm.currentFilter.id).then(function (res) {
                    });
                }

                $scope.subscribe('clear_text_search_' + vm.moduleName, function (){
                    vm.query = '';
                });

                $scope.subscribe('after_save_manage_filter', function () {
                    // Refresh after change on Manage panel

                    let data = {
                        'filter_config_id': vm.currentFilter && vm.currentFilter.id != undefined ? vm.currentFilter.id : null,
                        'target': vm.moduleName
                    };

                    if (vm.currentFilter && vm.currentFilter.items != undefined) {
                        vm.currentFilter.items = [];
                    }

                    AppFilterConfigService.listItemsByFilter(data).then(function (res) {

                        let currentFilterDataOrig = _.find(vm.dataItemsOrig, function (o) {
                            return o.filter_config_id == vm.currentFilter.id;
                        });

                        currentFilterDataOrig.data = res.data;

                        angular.forEach(res.data, function (item) {
                            vm.findDataByFieldOrig(item);
                        });
                    });
                });

                // Redirection from dashboard with dates range
                vm.applyFilterParamUrl = function () {
                    if (vm.moduleName == 'task' && vm.stateParams.due_date_begin != '' && vm.stateParams.due_date_end != '') {

                        let fieldDue = _.find(vm.aListFilterField, function (o) {
                            return o.name == 'DUE_DATE_TEXT';
                        });

                        //vm.comparations
                        let opBetween = _.find(vm.comparations, function (o) {
                            return o.label == 'BETWEEN_TEXT';
                        });

                        // Add a tempo filter
                        let filterDueDate = {
                            selected: {
                                'id': 999,
                                'name': 'UNTITLED_VIEW_TEXT',
                                'items': [{
                                    type: fieldDue,
                                    comparation: opBetween,
                                    data: {
                                        startDate: vm.stateParams.due_date_begin,
                                        endDate: vm.stateParams.due_date_end
                                    },
                                    kind: 'date',
                                    dataSelection: true,
                                    listOperator: [
                                        _.find(vm.comparations, function (o) {
                                            return o.label == 'BEFORE_TEXT';
                                        }),
                                        _.find(vm.comparations, function (o) {
                                            return o.label == 'AFTER_TEXT';
                                        }),
                                        _.find(vm.comparations, function (o) {
                                            return o.label == 'BETWEEN_TEXT';
                                        })
                                    ]
                                }]
                            }
                        };

                        vm.aCollection.push(filterDueDate.selected);

                        vm.filterModel = filterDueDate.selected;

                        vm.onChangeFilter(filterDueDate);

                        vm.toggleFilterOpen();

                    }
                };

                //Bind enter key search
                $timeout(function () {
                    let filterSearch = angular.element('.filter-search-' + vm.moduleName);
                    filterSearch.bind("keydown keypress", function (event) {
                        if (event.which === 13) {
                            event.preventDefault();
                            vm.executeSearch();
                        }
                    });

                }, 1000);

                vm.popupFilter = function () {
                    let dtDialog = ngDialog.open({
                        template: urlBase.tplBase('base-modules/app-components', 'project-filter-detail.dialog'),
                        className: 'ngdialog-theme-default md-box',
                        controller: 'DetailFilterDialogController',
                        data: {
                            target: vm.moduleName,
                            current_filter: vm.currentFilter,
                            isModuleArchived: vm.isModuleArchived,
                        }
                    });

                    dtDialog.closePromise.then(function (returnData) {
                        if (angular.isDefined(returnData.value)) {
                            if (angular.isDefined(returnData.value.numberFilters)) {
                                vm.numberFilters = returnData.value.numberFilters;
                            }

                            if (angular.isDefined(returnData.value.currentFilter)) {
                                vm.getFilterConfig();
                                vm.currentFilter = returnData.value.currentFilter;
                                angular.forEach(vm.aCollection, function (item) {
                                    if (item.id == vm.currentFilter.id) {
                                        item.name = vm.currentFilter.name;
                                    }
                                })
                            }

                            if (angular.isDefined(returnData.value.cloneFilter)) {
                                vm.aCollection.push(returnData.value.cloneFilter);
                                $timeout(function () {
                                    let data = {
                                        selected: returnData.value.cloneFilter,
                                    };
                                    vm.onChangeFilter(data, true);
                                }, 100)

                            }
                        }
                    });
                }

                vm.customFilterDialog = function () {
                    let dtDialog = ngDialog.open({
                        template: urlBase.tplBase('base-modules/app-components', 'project-filter-detail.dialog'),
                        className: 'ngdialog-theme-default md-box',
                        controller: 'DetailFilterDialogController',
                        data: {
                            target: vm.moduleName,
                            current_filter: {
                                id: Date.now(),
                                name: $translate.instant('SELECT_FILTERS_TEXT'),
                                items: []
                            },
                            isModuleArchived: vm.isModuleArchived,
                        }
                    });

                    dtDialog.closePromise.then(function (returnData) {
                        if (angular.isDefined(returnData.value)) {
                            if (angular.isDefined(returnData.value.numberFilters)) {
                                vm.numberFilters = returnData.value.numberFilters;
                            }

                            if (angular.isDefined(returnData.value.currentFilter)) {
                                vm.getFilterConfig();
                                vm.currentFilter = returnData.value.currentFilter;
                                angular.forEach(vm.aCollection, function (item) {
                                    if (item.id == vm.currentFilter.id) {
                                        item.name = vm.currentFilter.name;
                                    }
                                })
                            }

                            if (angular.isDefined(returnData.value.cloneFilter)) {
                                vm.aCollection.push(returnData.value.cloneFilter);
                                $timeout(function () {
                                    let data = {
                                        selected: returnData.value.cloneFilter,
                                    };
                                    vm.onChangeFilter(data, true);
                                }, 100)

                            }
                        }
                    });
                }

                vm.clearSearchDefault = function () {
                    angular.forEach(vm.columns, function (item, index) {
                        item.default = false;
                    });
                }
            }
        });
})();


