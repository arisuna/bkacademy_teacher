(function () {
    'use strict';

    angular
        .module('app.input-selector')
        .directive('inputRadio', inputRadio);

    inputRadio.$inject = ['$translate','urlBase'];

    function inputRadio($translate, urlBase ) {
        var directive = {
            restrict: 'EA',
            replace: true,
            scope: {
                model: '=ngModel',
                required: '<',
                label:'@',
                requiredMessage:'@',
                items:'=',
                step:'@',
                name:'@',
                ngChange: "&?",
            },
            templateUrl: urlBase.tplBase('base-modules/input-selector', 'radio'),
            link: function (scope, element, attrs ) {
            },
            controller: function ($scope, $element, $attrs) {
                $scope.$watch('model', function(){
                    if( $scope.model != ''){
                        if( angular.isDefined( $scope.ngChange )) {
                            $scope.ngChange();
                        }
                    }
                })
            }
        };
        return directive;
    }

})();