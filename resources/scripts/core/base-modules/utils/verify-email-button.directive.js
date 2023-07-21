(function () {
    'use strict';

    angular
        .module('app.utils')
        .directive('verifyEmailButton', verifyEmailButton);

    verifyEmailButton.$inject = ['$http', '$localStorage', '$timeout', 'ngDialog', 'toaster', 'urlBase', '$translate', 'DataService', 'WaitingService'];

    function verifyEmailButton($http, $localStorage, $timeout, ngDialog, toaster, urlBase, $translate, DataService, WaitingService) {
        var verify_directive = {
            restrict: 'E',
            replace: true,
            scope: {
                field: '=field',
                toolTipText: '@?',
            },
            templateUrl: urlBase.tplBase('base-modules/utils', 'verify-email-button'),
            link: function (scope, element, attrs) {
                if (scope.toolTipText == '' || scope.toolTipText == undefined) {
                    scope.toolTipText = '';
                }
            },
            controller: function ($scope, $element, $attrs) {
                $scope.checkEmail = function () {
                    if (!angular.isUndefined($scope.field)) {
                        WaitingService.begin();
                        DataService.verifyEmailLogin($scope.field).then(function (res) {
                            if (res.success) {
                                WaitingService.info(res.message);
                            } else {
                                WaitingService.error(res.message);
                            }
                        });
                    }
                }
            }
        };
        return verify_directive;
    }
})();
