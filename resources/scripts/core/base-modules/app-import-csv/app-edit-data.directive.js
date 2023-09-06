(function () {
    'use strict';

    angular
        .module('app.app-directives')
        .directive('appEditData', appEditData);

    appEditData.$inject = ['$translate', '$location', '$http', 'urlBase', 'ngDialog', 'AppFieldService', 'AppValidatorService'];

    function appEditData($translate, $location ,$http, urlBase, ngDialog, AppFieldService, AppValidatorService) {

        var directive = {
            restrict: 'EA',
            replace: true,
            scope: {
                model: '=ngModel',
                mapFields: '<?',
            },
            templateUrl: urlBase.tplBase('base-modules/app-import-csv', 'app-edit-data-button'),
            link: function (scope, element, attrs) {

            },
            controller: function ($scope, $element, $attrs) {

                $scope.fields = [];

                angular.forEach(Object.keys($scope.model), function (fieldName) {
                });


                $scope.openEditDialogFn = function () {
                    var dialog = ngDialog.open({
                        templateUrl: urlBase.tplBase('base-modules/app-import-csv', 'app-edit-data-dialog'),
                        className: 'ngdialog-theme-default',
                        scope: $scope,
                        closeByDocument: false,
                        data: $scope.model,
                        controller: ['$rootScope', '$scope', '$http', '$q', 'AppFieldService', 

                            function ($rootScope, $scope, $http, $q, AppFieldService) {
                                //$scope.model = $scope.ngDialogData;
                                $scope.fields = [];
                                console.log('$scope.openEditDialogFn ==> ', $scope.model);
                                angular.forEach(Object.keys($scope.model), function (attribute) {
                                    $scope.fields.push({
                                        name: attribute,
                                        label: AppFieldService.getFieldLabelFromName(attribute),
                                        type: angular.isDefined($scope.mapFields[attribute]) && angular.isDefined($scope.mapFields[attribute].type) ?
                                            $scope.mapFields[attribute].type : AppFieldService.getFieldTypeFromName(attribute),
                                        isEditable: angular.isDefined($scope.mapFields[attribute]) && angular.isDefined($scope.mapFields[attribute].isEditable) ?
                                            $scope.mapFields[attribute].isEditable : true,
                                        isRequired: angular.isDefined($scope.mapFields[attribute]) && angular.isDefined($scope.mapFields[attribute].required) ?
                                            $scope.mapFields[attribute].required : false,
                                    });
                                });

                                var hash = window.location.hash; // #/app/office/import-office
                                var formImport = $location.search().form;
                                
                                console.log('$scope.openEditDialogFn  22222 ==> ', $scope.fields);

                                /** createTaskFn **/
                                $scope.submitDataFn = function () {
                                    //$parent.model = $scope.model;

                                    var hash = window.location.hash; 

                                    console.log('$scope.submitDataFn ==>> ', $scope.model);
                                    $scope.closeThisDialog($scope.model);
                                }
                            }]
                    });
                }
            }
        };
        return directive;
    }

})();
