(function () {
    'use strict';

    angular
        .module('app.input-selector')
        .directive('inputSurface', inputSurface);

    inputSurface.$inject = ['$translate','$http','urlBase','$filter','GmsSystem'];

    function inputSurface( $translate, $http, urlBase, $filter , GmsSystem) {
        var directive = {
            restrict: 'AE',
            replace: true,
            scope: {
                model: '=ngModel',
            },
            templateUrl: urlBase.tplBase('base-modules/input-selector', 'surface'),
            link: function (scope, element, attrs, ctrl) {

            },
            controller: function ($scope, $element, $attrs) {
                //load all policy of company
                $scope.currency = "";
                $scope.amount = 0.00;

                if( $scope.currencies == null || $scope.currencies.length == 0 ){
                    $scope.currencies = GmsSystem.getCurrencies();
                }

                $scope.parseAmountValue = function(){
                    if( $scope.field.value != '' && $scope.field.value != null ){
                        var split_array = $scope.field.value.split('#');
                        $scope.amount = parseFloat( split_array[0] );
                        if(angular.isDefined(split_array[1])){
                            $scope.currency = split_array[1];
                        }
                    }
                }

                //if change set value of field
                $scope.setAmountValue = function(){
                    $scope.field.value = $scope.amount+"#"+$scope.currency;
                }

                $scope.parseAmountValue();
            }
        };
        return directive;
    }


})();