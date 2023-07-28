(function () {
    'use strict';
    angular
        .module('app.input-selector')
        .directive('labelListViewer', labelListViewer)

    function labelListViewer() {
        return {
            restrict: 'E',
            scope: {
                model: '<?ngModel',
            },
            template: `
                <div>
                    <label class="label label-primary custom-size mr-sm inline-block" ng-repeat="label in labels">{{ label }}</label>
                </div>
            `,
            link: function (scope, element, attrs) {

            },
            controller: function ($scope) {
                $scope.labels = [];
                $scope.$watch('model', function () {
                    if (_.isString($scope.model)) {
                        $scope.labels = _.split($scope.model, ",");
                    }
                    if (_.isArray($scope.model)) {
                        $scope.labels = angular.copy($scope.model);
                    }
                })
            }
        };
    }
})();
