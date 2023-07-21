(function () {
    'use strict';


    angular
        .module('app.elements')
        .directive('editModeSelector', editModeSelector);

    editModeSelector.$inject = ['urlBase'];

    function editModeSelector(urlBase) {
        var directive = {
            scope: {
                isEditSelector: '='
            },
            templateUrl: urlBase.tplBase('base-modules/elements', 'edit-mode-selector-button'),
            controller: function ($scope) {
                var vm = this;
                $scope.changeEditMode = function () {
                    $scope.isEditSelector = !$scope.isEditSelector;
                }
            }
        };
        return directive;
    }

    angular
        .module('app.elements')
        .directive('editModeSelectorRadio', editModeSelectorRadio);

    editModeSelectorRadio.$inject = ['urlBase'];

    function editModeSelectorRadio(urlBase) {
        var directive = {
            scope: {
                isEditSelector: '='
            },
            templateUrl: urlBase.tplBase('base-modules/elements', 'edit-mode-selector-radio'),
            controller: function ($scope) {
                var vm = this;
                $scope.changeEditMode = function () {
                    $scope.isEditSelector = !$scope.isEditSelector;
                }
            }
        };
        return directive;
    }
})();
