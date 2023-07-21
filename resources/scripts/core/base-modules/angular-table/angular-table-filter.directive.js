(function () {
    'use strict';

    /*
    let filterValues = [
        {
            id:'plan_of_hrm',
            text: 'Plan of HRM',
            default: true,
            fields: [
                {field: 'company_type_id', value: 1},
                {field: 'is_active', value: 1}
            ]
        },
        {
            id:'plan_of_dsp',
            text: 'Plan of DSP',
            default: false,
            fields: [
                {field: 'company_type_id', value: 2},
                {field: 'is_active', value: 1}
            ]
        },
        {
            id:'plan_active',
            text: 'Active Plan',
            default: false,
            fields: [
                {field: 'is_active', value: 1}
            ]
        },
        {
            id:'plan_deleted',
            text: 'Deleted Plan',
            default: false,
            fields: [
                {field: 'is_active', value: 1}
            ]
        }
    ];
    */


    angular
        .module('app.angular-table')
        .directive('angularTableFilter', angularTableFilter);

    angularTableFilter.$inject = ['$timeout', '$http', 'urlBase', 'angularTableService'];

    function angularTableFilter($timeout, $http, urlBase, angularTableService) {
        var directive = {
            restrict: 'EA',
            replace: true,
            transclude: true,
            scope: {
                table: '=',
                filterValues: '<?', //[{value,text}]
                fieldName: '@',
                title: '@?',
                idFilterDefault: '@?',
            },
            templateUrl: urlBase.tplBase('base-modules/angular-table', 'table-filter'),
            link: function (scope, element, attrs) {
                if (angular.isUndefined(scope.title) || scope.title == '') scope.title = 'Select';
            },
            controller: function ($scope, $element, $attrs) {
                $scope.filter = {id: null, text: null};
                $scope.init = function () {
                    angular.forEach($scope.filterValues, function (filterValue, key) {
                        if (angular.isUndefined($scope.idFilterDefault) || _.isNull($scope.idFilterDefault) || _.isEmpty($scope.idFilterDefault)) {
                            if (filterValue.default == true) {
                                $scope.filter = filterValue;
                            }
                        } else {
                            if (filterValue.id == $scope.idFilterDefault) {
                                $scope.filter = filterValue;
                            }
                        }
                    });

                    $timeout(function () {
                        $scope.table.filter($scope.filter.fields);
                    }, 1000);

                };

                $scope.init();

                $scope.selectFilter = function () {
                    if (angular.isDefined($scope.filter.fields)) {
                        $scope.table.filter($scope.filter.fields);
                    } else {
                        $scope.table.filter();
                    }
                }
            }
        };
        return directive;
    }

})();
