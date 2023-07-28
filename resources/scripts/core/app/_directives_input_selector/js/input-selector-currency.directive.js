(function () {
    'use strict';

    angular
        .module('app.input-selector')
        .directive('inputSelectorCurrency', inputSelectorCurrency);

    inputSelectorCurrency.$inject = ['$translate','$http','urlBase','DataService'];

    function inputSelectorCurrency($translate, $http, urlBase, DataService ) {
        var directive = {
            restrict: 'E',
            replace: true,
            scope: {
                model: '=ngModel',
                required: '<',
                disabled: '<?',
                label:'@',
                requiredMessage:'@',
                labelFloating:'<?',
                showLabel:'<?',
                step:'@',
                name:'@',
                id:'@',
            },

            templateUrl: urlBase.tplBase('base-modules/input-selector', 'currency'),
            link: function (scope, element, attrs ) {
                scope.realName = scope.name + "_" + parseInt(Math.random()*100).toString();
                if( angular.isUndefined( scope.label) || scope.label == ''){
                    scope.label = 'CURRENCY_TEXT';
                }

                if( angular.isUndefined( scope.requiredMessage) || scope.requiredMessage == ''){
                    scope.requiredMessage = 'CURRENCY_REQUIRED_TEXT';
                }

                if( angular.isUndefined( scope.labelFloating ) || scope.labelFloating == false ){
                    scope.labelFloating = false;
                    scope.className = ''
                    scope.placeholder = 'SELECT_TEXT';
                }else{
                    scope.className = 'float-label'
                    scope.placeholder = '_';
                }

                if( angular.isUndefined( scope.showLabel ) || scope.showLabel == true ){
                    scope.showLabel = true;
                }else{
                    scope.showLabel = false;
                }
            },

            controller: function ($scope, $element, $attrs) {
                $scope.currencies = [];
                $scope.getListCurrencies = function() {
                    DataService.getListCurrencies().then(
                        function(res){
                            if (res.success) {
                                $scope.currencies = res.data;
                            }
                        },function(err){
                            //
                        }
                    );
                }
                $scope.getListCurrencies();
            }
        };
        return directive;
    }

})();
