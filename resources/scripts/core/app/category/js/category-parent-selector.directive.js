(function () {
    'use strict';

    App.directive('appCategoryParentSelector', appCategoryParentSelector);

    appCategoryParentSelector.$inject = ['urlBase', 'AppCategoryService', '$timeout'];

    function appCategoryParentSelector(urlBase, AppCategoryService, $timeout) {
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
                scope.placeholder = 'SELECT_PARENT_CATEGORY_TEXT';
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
                $scope.parentCategories = [];
                $scope.loadParentCategories = function () {
                    // TODO: Load services
                    let params = {};
                    params.level = $scope.level;
                    params.parentCategoryId = $scope.model;
                    params.currentId = $scope.currentId;
                    AppCategoryService.getParentCategories(params).then(function (res) {
                        if (res.success) {
                            $scope.parentCategories = res.data;
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
                $scope.loadParentCategories();
            },
        };

    }

})();
