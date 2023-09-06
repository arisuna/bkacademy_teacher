(function () {
    'use strict';

    App.controller('ProductFieldImportController', ['$q', '$scope', '$http', '$state', '$window', '$rootScope', '$translate', '$timeout',
        'WaitingService', 'AppImportService', 'AppProductFieldService',

        function ($q, $scope, $http, $state, $window, $rootScope, $translate, $timeout, WaitingService, AppImportService, AppProductFieldService) {
            // Page loading
            $scope.loading = true;
            $scope.data = [];
            $scope.mapFields = AppImportService.getProductFieldFields();
            $scope.uploading = false;
            $scope.started_upload = false;


            $scope.uploadItemFn = function (item, index) {
                AppProductFieldService.importProductField(item).then(function (res) {
                    if (res.success) {
                        $scope.data[index].isUploaded = true;
                        $scope.data[index].hasError = false;
                        $scope.data[index].messageError = '';
                    } else {
                        $scope.data[index].isUploaded = false;
                        $scope.data[index].hasError = true;
                        $scope.data[index].messageError = res.message;
                    }
                }, function (res) {
                    $scope.data[index].isUploaded = false;
                    $scope.data[index].hasError = true;
                    $scope.data[index].messageError = res.message;
                })
            };


            $scope.uploadFn = function () {
                WaitingService.questionSimple('IMPORT_PRODUCT_FIELD_QUESTION_TEXT', function () {
                    WaitingService.begin();
                    let requestList = [];
                    let i = 0;
                    angular.forEach($scope.data, function (item, index) {
                        if (item.isUploaded == false) {
                            requestList.push(
                                AppProductFieldService.importProductField(item).then(function (res) {
                                    if (res.success) {
                                        i++;
                                        $scope.data[index].isUploaded = true;
                                    } else {
                                        $scope.data[index].isUploaded = false;
                                        $scope.data[index].hasError = true;
                                        $scope.data[index].messageError = res.message;
                                    }
                                }, function (res) {
                                    $scope.data[index].isUploaded = false;
                                    $scope.data[index].hasError = true;
                                    $scope.data[index].messageError = res.message;
                                })
                            );
                        } else {
                            i++;
                        }
                    });

                    $scope.loading = true;

                    $q.all(requestList).then(function () {
                        WaitingService.popSuccess($translate.instant("IMPORT_TEXT") + ' ' + i + '/' + $scope.data.length + ' ' +$translate.instant("SUCCESS_TEXT") + '!');
                        $scope.loading = false;
                    }, function () {
                        WaitingService.error('IMPORT_FAIL_TEXT');
                        $scope.loading = false;
                    });
                });
            };
        }]);

})();