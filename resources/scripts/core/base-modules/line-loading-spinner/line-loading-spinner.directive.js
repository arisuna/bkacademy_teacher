(function () {
    'use strict';

    angular
        .module('app.line-loading-spinner')
        .directive('lineLoadingSpinner', lineLoadingSpinner);

    lineLoadingSpinner.$inject = ['urlBase'];

    function lineLoadingSpinner(urlBase) {
        return {
            restrict: 'E',
            scope: {
                options: '@',
                lines: '=',
                animateDisabled:'<?'
            },
            templateUrl: urlBase.tplBase('base-modules/line-loading-spinner', 'index'),
            controller: LineLoadingSpinnerController,
        };
    }

    function LineLoadingSpinnerController($scope) {
        // $scope.createId = function(item) {
        //     item.id = Date.now();
        // };

        $scope.items = $scope.options.toString().split('-');
    }

})();
