(function () {
    'use strict';

    angular
        .module('app.notification')
        .directive('notificationWaiting', notificationWaiting);

    notificationWaiting.$inject = ['$translate', 'urlBase', '$state'];

    function notificationWaiting($translate, urlBase, $state) {

        var directive = {
            restrict: 'EA',
            replace: true,
            templateUrl: urlBase.tplBase('base-modules/notification', 'waiting'),
            link: function (scope, element, attrs) {

            },
            controller: function ($scope, $element, $attrs) {
                $scope.message = angular.isDefined($scope.directiveData) && angular.isDefined($scope.directiveData.message) ? $scope.directiveData.message : '';
                $scope.title = angular.isDefined($scope.directiveData) && angular.isDefined($scope.directiveData.title) ? $scope.directiveData.title : '';
            }
        };
        return directive;
    }

})();
