(function () {
    'use strict';

    angular
        .module('app.app-directives')
        .directive('appImportCsv', appImportCsv);

    appImportCsv.$inject = ['$translate', '$http', 'urlBase', 'Utils', '$timeout', 'AppValidatorService', 'WaitingService'];

    function appImportCsv($translate, $http, urlBase, Utils, $timeout, AppValidatorService, WaitingService) {

        var directive = {
            restrict: 'EA',
            replace: true,
            scope: {
                items: '=items',
                mapFields: '<',
                uploadFn: '&?',
                uploadItemFn: '&',
            },
            templateUrl: urlBase.tplBase('base-modules/app-import-csv', 'app-import-csv'),
            link: function (scope, element, attrs) {

            },


            controller: function ($scope) {
                $scope.loading = false;
                $scope.step = 0;
                $scope.countErrors = 0;
                $scope.countSuccess = 0;
                $scope.loading = false;
                $scope.csvData = {
                    csvFile: '',
                    fileContent: '',
                    columnDelimiter: '',
                    textDelimiter: '',
                };
                $scope.columnNames = [];
                $scope.csvFields = [];
                $scope.items = [];
                $scope.itemsTemporary = [];

                $scope.isEnableImportData = false;

                // Read file content
                $scope.handleErrors = function (data = []) {
                    // let tmp_valid_data = [],
                    //     tmp_invalid_data = []

                    for (let dataItem of data) {
                        console.log('+++++++_+results===$scope.items====', dataItem)
                        if (angular.isDefined(dataItem.hasError) && dataItem.hasError == true) {
                            // tmp_valid_data.push(dataItem);
                            $scope.countErrors++;
                        } else {
                            $scope.countSuccess++;
                            // tmp_invalid_data.push(dataItem);
                        }
                    }

                    $scope.items = data;
                }

                $scope.checkErrors = function () {

                    $scope.countErrors = 0;
                    $scope.countSuccess = 0;

                    var data = [],
                        data_valid = true,
                        tmp_valid_data = [],
                        tmp_invalid_data = [],
                        invalid_msg = '',
                        data_convert = {};

                    const promises = [];
                    for (let i = 0; i < $scope.items.length; i++) {
                        let dataItem = $scope.items[i]
                        promises.push(new Promise((resolve, reject) => {
                            setTimeout(() => {
                                data_valid = true;
                                invalid_msg = {};
                                data_convert = {};
                                if (dataItem) {
                                    dataItem = AppValidatorService.validateObject(dataItem, $scope.mapFields);
                                }

                                resolve(dataItem)
                            }, 1500)
                        }))
                    }

                    Promise.all(promises).then((results) => {
                        $timeout(function () {
                            console.log('+++++++_+results=======', results)

                            $scope.handleErrors(results);
                            $scope.isEnableImportData = true
                        }, $scope.items.length * 1000 + 1000);
                    });
                };

                $scope.getColumnHeadersFn = function () {
                    $scope.csvFields = Utils.csvGetHeaders($scope.csvData.fileContent, {columnDelimiter: $scope.csvData.columnDelimiter});
                };

                $scope.validateCsvFn = function () {
                    WaitingService.begin();
                    $scope.isEnableImportData = false;
                    $timeout(function () {
                        $scope.validating = true;
                        if ($scope.items.length == 0) {
                            $scope.itemsTemporary = [];
                            $scope.items = [];
                            if ($scope.items.length == 0) {

                                $scope.itemsTemporary = Utils.csvToArrayFormat2($scope.csvData.fileContent);

                                var hash = window.location.hash; 

                                angular.forEach($scope.itemsTemporary, function (itemTempo) {
                                    let item = {};
                                    angular.forEach($scope.mapFields, function (mapField) {
                                        if (angular.isDefined(mapField.csvColumnName) && mapField.csvColumnName != '' && mapField.csvColumnName != false && mapField.csvColumnName != null) {
                                            item[mapField.name] = (itemTempo[mapField.csvColumnName]);
                                        } else {
                                            item[mapField.name] = '';
                                        }
                                    });
                                    $scope.items.push(item);
                                });
                            }
                        }
                        $scope.checkErrors();
                        $scope.validating = false;
                        $scope.step = 2;
                        WaitingService.end();
                    }, 1000);
                };

                $scope.prePopulateFn = function () {
                    angular.forEach($scope.mapFields, function (mapField, keyMapField) {
                        angular.forEach($scope.csvFields, function (csvField, keyCsvField) {
                            if (mapField.name == csvField.name) {
                                mapField.csvColumnName = csvField.name;
                                return;
                            }
                        });
                    });
                };

                $scope.resetFn = function () {
                    $(":file").filestyle('clear');
                    $scope.columnNames = [];
                    $scope.csvFields = [];
                    $scope.csvData.fileContent = '';
                    $scope.items = [];
                    $scope.loading = false;
                    $scope.csvFile = '';
                    angular.element('#csvFile').val(null);
                    angular.forEach(angular.element("input[type='file']"),
                        function (inputElem) {
                            angular.element(inputElem).val(null);
                        });
                    $scope.step = 0;
                };

                $scope.stepMappingDataFn = function () {

                    $scope.step = 1;
                    $scope.columnNames = [];
                    $scope.csvFields = Utils.csvGetHeaders($scope.csvData.fileContent, {columnDelimiter: $scope.csvData.columnDelimiter});

                    var hash = window.location.hash; 
                };

                $scope.deleteItemFn = function (index) {
                    WaitingService.question('QUESTION_DELETE_ITEM_TEXT', function () {
                        $scope.$evalAsync(function () {
                            $scope.items.splice(index, 1);
                        });
                    }, function () {
                        //nothing
                    })
                };

                $scope.uploadOneItemFn = function (item, index) {
                    if (angular.isFunction($scope.uploadItemFn)) {
                        $scope.uploadItemFn({item: item, index: index});
                    }

                }

                $scope.importDataFn = function () {
                    if (angular.isFunction($scope.uploadFn)) {
                        $scope.uploadFn($scope.items);
                    }
                };

                $scope.checkItemFn = function (dataItem, indexKey) {
                    console.log('$scope.checkItemFn ==>> ', dataItem);
                    $scope.countSuccess--;
                    if (dataItem) {
                        dataItem = AppValidatorService.validateObject(dataItem, $scope.mapFields);
                        if (dataItem.hasError == false) {
                            $scope.countSuccess++;
                        } else {
                            $scope.countErrors++;
                        }
                        $scope.items[indexKey] = angular.copy(dataItem);
                    }
                }

            }
        };
        return directive;
    }

})();