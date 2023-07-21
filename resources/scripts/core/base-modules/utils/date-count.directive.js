/**
 * [filter selector directive]
 * @return {[type]}
 */
(function () {
    'use strict';

    angular
        .module('app.utils')
        .directive('dateCount', dateCount);

    dateCount.$inject = ['$http', 'urlBase', 'moment'];

    function dateCount($http, urlBase, moment) {
        var directive = {
            restrict: 'E',
            replace: true,
            scope: {
                toNow: '<?',
                from: '@?',
                to: '@?',
                distance: '@'
            },
            templateUrl: urlBase.tplBase('base-modules/utils', 'date-count'),
            controller: function ($scope) {
                $scope.convert = function () {
                    var fromDate = moment(new Date($scope.from));
                    if ($scope.toNow == true) {
                        var toDate = moment();
                    } else {
                        var toDate = moment(new Date($scope.to));
                    }


                    console.info('fromDate', $scope.from);
                    console.info('fromDate', fromDate);
                    console.info('toDate', toDate);

                    $scope.longdays = toDate.diff(fromDate, 'days');
                    var years = toDate.diff(fromDate, 'year');
                    fromDate.add(years, 'years');
                    var months = toDate.diff(fromDate, 'months');
                    fromDate.add(months, 'months');
                    var days = toDate.diff(fromDate, 'days');


                    if ($scope.longdays > 0) {
                        $scope.isExpired = true;
                    } else {
                        $scope.isExpired = false;
                        $scope.longdays = Math.abs($scope.longdays);


                        console.info('longdays', $scope.longdays);

                        $scope.output = '';
                        $scope.moreYears = true;

                        if ((Math.abs(years) >= 1)) {
                            $scope.moreYears = true;
                            $scope.output += ((Math.abs(years) > 0) ? Math.abs(years) + 'y' : '');
                        }
                        else {
                            $scope.moreYears = false;
                            $scope.output += ((Math.abs(months) > 0) ? Math.abs(months) + 'm' : '');
                            $scope.output += ((Math.abs(days) > 0) ? Math.abs(days) + 'd' : '');
                        }
                    }
                }
                $scope.convert();
            }
        };

        return directive;
    }

})();
