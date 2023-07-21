(function () {
    'use strict';

    angular
        .module('app.notification')
        .directive('notificationSuccess', notificationSuccess);

    notificationSuccess.$inject = ['$translate', 'urlBase', '$state'];

    function notificationSuccess($translate, urlBase, $state) {

        var directive = {
            restrict: 'EA',
            replace: true,
            templateUrl: urlBase.tplBase('base-modules/notification', 'success'),
            link: function (scope, element, attrs) {

            },
            controller: function ($scope, $element, $attrs) {
                $scope.type = angular.isDefined($scope.directiveData) && angular.isDefined($scope.directiveData.type) ? $scope.directiveData.type : 'info';
                $scope.message = angular.isDefined($scope.directiveData) && angular.isDefined($scope.directiveData.message) ? $scope.directiveData.message : '';
                $scope.title = angular.isDefined($scope.directiveData) && angular.isDefined($scope.directiveData.title) ? $scope.directiveData.title : '';
            }
        };
        return directive;
    }

})();
