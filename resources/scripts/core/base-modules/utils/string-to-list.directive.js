(function() {
    'use strict';
    angular
        .module('app.utils')
        .directive('stringToListHtml', stringToListHtml);

    function stringToListHtml() {
        return {
            scope:{
                text: '@',
                delimiter:'@?',
                type: '@?'
            },
            template: '<ul><li ng-repeat="item in items track by $index">{{ item.name }}</li></ul>',
            link: function(scope, element, attrs, ngModel) {
                if( scope.delimiter == '' || angular.isUndefined( scope.delimiter )){
                    scope.delimiter = ','
                }
                if( scope.type == '' || angular.isUndefined( scope.type )){
                    scope.type = 'string';
                }
            },
            controller: function ($scope, $element, $attrs) {
                $scope.items = [];
                if($scope.type == 'string'){
                    var items = $scope.text.split( $scope.delimiter );
                    angular.forEach(items, function( item ){
                        $scope.items.push({
                            name: item
                        });
                    })
                }else if( $scope.type == 'json'){
                    $scope.items = angular.fromJson($scope.text);
                }
            }
        };
    }
})();

