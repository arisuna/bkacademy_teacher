/**
 * [avatar date-picker-input-2
 * @return {[type]} [created by thinh@expatfinder.com]
 */
(function () {
    'use strict';

    angular
        .module('app.date-picker-input')
        .directive('datePickerInput2', datePickerInput2);

    datePickerInput2.$inject = ['urlBase', 'moment', '$filter', '$rootScope', 'Utils', 'ngDialog'];

    function datePickerInput2(urlBase, moment, $filter, $rootScope, Utils, ngDialog) {
        var directive = {
            restrict: 'E',
            replace: true,
            scope: {
                model: '=ngModel',
                showLabel: '<?',
                isGray: '<?',
                label: '@?',
                name: '<',
                inputType: '@?',
                outputType: '@',
                required: '<?',
                disabled: '<?',
                onAfterSave: '&?onAfterSave',
                fullWidth: '<?',
            },
            templateUrl: urlBase.tplApp('gms', '_directives_date', 'date-picker-input-2'),
            link: function (scope, element, attrs, timeout) {

                function parseISO(s) {
                    if (_.isString(s)) {
                        var b = s.split(/\D/);
                        if (s.length > 10) {
                            return new Date(b[0], b[1] - 1, b[2], b[3], b[4], b[5]);
                        } else {
                            return new Date(b[0], b[1] - 1, b[2], b[3]);
                        }
                    }
                }

                if (angular.isUndefined(scope.name) || scope.name == '') {
                    scope.name = "date" + Math.random();
                }
                if (angular.isUndefined(scope.inputType) || scope.inputType == '') {
                    scope.inputType = "date";
                }
                if (angular.isUndefined(scope.outputType) || scope.outputType == '') {
                    scope.outputType = "date";
                }
                if (angular.isDefined(scope.showLabel) && scope.showLabel == true) {
                    scope.showLabel = true;
                } else {
                    scope.showLabel = false;
                }

                if (angular.isDefined(scope.disabled) && scope.disabled == true) {
                    scope.disabled = true;
                } else {
                    scope.disabled = false;
                }

            },
            controller: function ($scope, $element, $attrs, $timeout) {
                $scope.isOpen = false;
                $scope.isChangedInside = false;
                $scope.dateSelected = {
                    value: null,
                    value_formatted: null,
                };


                $scope.changeDate = function () {
                    if ($scope.dateSelected.value != '' && $scope.dateSelected.value != null && $scope.dateSelected.value != undefined) {
                        if (Utils.isDateValid($scope.dateSelected.value)) {
                            if ($scope.inputType == 'date') {
                                $scope.model = $filter('amDateFormat')($filter('amLocal')($filter('amUtc')($scope.dateSelected.value)), 'YYYY-MM-DD');
                            } else {
                                $scope.model = moment($scope.dateSelected.value).unix();
                            }
                            $scope.isChangedInside = true;
                        }
                    } else {
                        $scope.model = null;
                    }


                    if (angular.isFunction($scope.onAfterSave)) {
                        $timeout(function () {
                            if ($scope.promise) {
                                $timeout.cancel($scope.promise);
                            }
                            $scope.promise = $timeout(function () {
                                $scope.onAfterSave();
                                $timeout.cancel($scope.promise);
                            });
                        }, 1000);

                    }
                }

                $scope.initValue = function () {
                    if ($scope.inputType == 'date') {
                        if (($scope.model != '' && $scope.model != null) && ($scope.dateSelected.value == '' || $scope.dateSelected.value == null)) {
                            $scope.dateSelected.value = moment($scope.model, 'YYYY-MM-DD').toDate();
                        } else {
                            $scope.dateSelected.value = null;
                        }
                    } else {
                        if (_.isInteger($scope.model) && $scope.model > 0) {
                            var temporary_date = new Date(0);
                            temporary_date.setUTCSeconds($scope.model);
                            $scope.dateSelected.value = temporary_date;
                        } else {
                            $scope.dateSelected.value = '';
                        }
                    }

                };

                $timeout(function () {
                    $scope.initValue();
                });


                $scope.$watch('model', function (newValue, oldValue) {
                    if (angular.isUndefined(oldValue) || _.isEmpty(oldValue) || oldValue == '') {
                        //$scope.initValue();
                    }
                });


                $scope.openDatePickerDialog = function ($event) {

                    let dialogPosition = Utils.getPositionDropdownDialog($event, 300, 350);

                    let searchDialog = ngDialog.open({
                        template: urlBase.tplBase('base-modules/gms-directives-members', 'owner-selector-search-dialog'),
                        className: 'ngdialog-custom-position no-background ' + dialogPosition['className'],
                        showClose: false,
                        closeByDocument: true,
                        disableAnimation: true,
                        cache: true,
                        width: 300,
                        data: dialogPosition,
                        resolve: {
                            uuid: function () {
                                return $scope.uuid
                            }
                        },
                        controller: ['$scope', '$element', '$timeout', 'GmsMemberService', 'Utils', 'uuid', function ($scope, $element, $timeout, GmsMemberService, Utils, uuid) {
                            $scope.uuid = uuid;
                            $scope.members = [];
                            Utils.setPositionDropdownDialog(dialogPosition);
                            $scope.totalItems = 0;
                            $scope.totalRestItems = 0;
                            $scope.currentPage = 1;

                            $scope.searchConfig = {
                                query: null,
                                currentItem: {
                                    id: null,
                                },
                                filterQuery: ""
                            };

                            $scope.applyFilter = function () {
                                $scope.searchConfig.filterQuery = $scope.searchConfig.query;
                            }

                            $scope.selectItem = function (member) {
                                $scope.closeThisDialog(member);
                            }


                            $scope.searchMembers = function () {
                                $scope.members = [];
                                GmsMemberService.searchMembers({
                                    search_type: 'owner',
                                    object_uuid: $scope.uuid,
                                    query: $scope.searchConfig.query
                                }).then(
                                    function (res) {
                                        $timeout(function () {
                                            $scope.isLoading = false;
                                        }, 1000);
                                        if (res.success) {
                                            $scope.members = res.data;
                                            $scope.totalItems = res.total_items;
                                            $scope.totalRestItems = res.total_rest_items;
                                            $scope.currentPage = res.current;
                                        }
                                    }, function () {
                                        $timeout(function () {
                                            $scope.isLoading = false;
                                        }, 1000);
                                    }
                                )
                            };

                            $scope.searchMembers();


                            $scope.loadMore = function () {
                                GmsMemberService.searchMembers({
                                    query: $scope.searchConfig.query,
                                    page: $scope.currentPage + 1,
                                    object_uuid: $scope.uuid,
                                    search_type: 'owner',
                                }).then(
                                    function (res) {
                                        $timeout(function () {
                                            $scope.isLoading = false;
                                        }, 1000);
                                        if (res.success) {
                                            $scope.members = _.concat($scope.members, res.data);
                                            $scope.totalItems = res.total_items;
                                            $scope.totalRestItems = res.total_rest_items;
                                            $scope.currentPage = res.current;
                                        }
                                    }, function () {
                                        $timeout(function () {
                                            $scope.isLoading = false;
                                        }, 1000);
                                    }
                                )
                            }

                        }]
                    });

                    searchDialog.closePromise.then(function (returnData) {
                        if (angular.isDefined(returnData.id) && angular.isDefined(returnData.value.id) && returnData.value.id != '') {
                            $scope.setOwner(returnData.value);
                        }
                    })
                };
            }
        };

        return directive;
    }

})();
