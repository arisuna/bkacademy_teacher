(function () {
    'use strict';

    angular
        .module('app.layout-directives')
        .directive('sideNavSecond', sideNavSecond);

    sideNavSecond.$inject = ['urlBase', '$rootScope', 'ngDialog'];

    function sideNavSecond(urlBase, $rootScope, ngDialog) {
        var directive = {
            restrict: 'EA',
            replace: true,
            templateUrl: urlBase.tplBase('base-modules/layout-directives', 'side-nav-second'),
            link: function (scope, element, attrs) {

            },
            controller: function($scope, $element, $attrs){
                $scope.openDialog = function (event) {
                    $scope.btnLoading = true;
                    let className = '';
                    if ($rootScope.app.layout.isCollapsedNav) {
                        className = 'ngdialog-theme-left-box no-background left-60';
                    }else{
                        className = 'ngdialog-theme-left-box no-background left-full';
                    }

                    ngDialog.open({
                        template: urlBase.tplBase('base-modules/layout-directives', 'side-nav-second.dialog'),
                        className: className,
                        showClose: false,
                        closeByDocument: true,
                        width: 250,
                        resolve: {
                        },
                        data: {
                        },
                        controller: ['$scope', '$element', '$timeout', function ($scope, $element, $timeout) {
                        }]
                    });
                }
            }
        };
        return directive;
    }

})();
