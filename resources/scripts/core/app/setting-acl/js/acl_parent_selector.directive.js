(function () {
    'use strict';

    App.directive('appAclParentSelector', appAclParentSelector);

    appAclParentSelector.$inject = ['urlBase', 'AppAclService', '$timeout'];

    function appAclParentSelector(urlBase, AppAclService, $timeout) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: urlBase.tplApp('app', 'setting-acl', 'acl_parent_selector'),
            scope: {
                model: '=ngModel',
                currentId: '=?',
                companyType: '<?',
                level: '<?',
                labelFloating: '=?',
                required: '<',
                label: '@?',
                type: '@',
                requiredMessage: '@',
                disabled: '<?',
                showLabel: '<?',
                ngChange: '&?',
            },
            link: function (scope, element, attrs) {
                scope.placeholder = '- Service Parent';
                if (scope.labelFloating == '' || scope.labelFloating == null) {
                    scope.labelFloating = false;
                }

                if (angular.isUndefined(scope.required)) {
                    scope.required = false;
                    scope.requiredMessage = '';
                }

                scope.realName = _.random(1000);
            },
            controller: function ($scope, $element, $attrs) {
                $scope.parentAcls = [];
                $scope.loadParentAcls = function () {
                    // TODO: Load services
                    let params = {};
                    params.level = $scope.level;
                    if($scope.companyType == 1){
                        params.is_hr = true;
                    }else if($scope.companyType == 2){
                        params.is_gms = true;
                    }
                    params.parentAclId = $scope.model;
                    params.currentId = $scope.currentId;
                    AppAclService.getParentAcls(params).then(function (res) {
                        if (res.success) {
                            $scope.parentAcls = res.data;
                        }
                    })
                };
                $scope.changeValue = function () {
                    $timeout(function () {
                        if ($scope.model > 0) {
                            if (angular.isFunction($scope.ngChange)) {
                                $scope.ngChange();
                            }
                        }
                    }, 500);
                };
                $scope.loadParentAcls();
            },
        };

    }

})();
