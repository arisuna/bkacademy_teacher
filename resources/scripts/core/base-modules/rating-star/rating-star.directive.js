(function () {
    'use strict';

    angular
        .module('app.rating-star')
        .directive('ratingStar', ratingStar);

    ratingStar.$inject = ['$timeout', '$http', 'urlBase'];

    function ratingStar($timeout, $http, urlBase) {
        var directive = {
            restrict: 'EA',
            replace: true,
            require:'^ngModel',
            scope: {
                model:'=ngModel',
                disabled: '<?',
            },

            templateUrl: urlBase.tplBase('base-modules/rating-star', 'index'),
            link: function (scope, element, attrs) {

            },
            controller: function ($scope, $element, $attrs) {
                $scope.maxRating = 5;

                let checkNumber = function(){
                    if( $scope.model && angular.isNumber($scope.model) ){
                        return $scope.model;
                    }else{
                         return false;
                    }
                };
                $scope.ratedBy = checkNumber() ? checkNumber() : 0;

                $scope.rateBy = function (star) {
                    $scope.model = $scope.ratedBy = star;
                };
            }
        };
        return directive;
    }

})();
