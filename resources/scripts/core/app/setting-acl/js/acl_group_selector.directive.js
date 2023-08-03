(function () {
    'use strict';

    App.directive('appAclGroupSelector', appAclGroupSelector);

    appAclGroupSelector.$inject = ['urlBase', 'AppAclService', '$timeout'];

    function appAclGroupSelector(urlBase, AppAclService, $timeout) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: urlBase.tplApp('app', 'setting-acl', 'acl_group_selector'),
            scope: {
                isRequired: "<",
                model: '=ngModel',
            },
            link: function (scope, element, attrs) {

            },
            controller: function ($scope, $element, $attrs) {
                $scope.groups = AppAclService.getGroups();
                $scope.data = {
                    selectedId: null
                }

                $scope.changeValue = function () {
                    $scope.model = $scope.data.selectedId;
                }
                $scope.$watch('model', function (oldValue, newValue) {
                    if (oldValue != newValue) {
                        $scope.data.selectedId = _.parseInt($scope.model);
                    }
                })

                $timeout(function () {
                    if($scope.model != null){
                        $scope.data.selectedId = _.parseInt($scope.model);
                    }
                });
            },
        };

    }

})();
