/**
 * Created by anmeo on 11/1/16.
 */

(function () {
    'use strict';

    angular
        .module('app.app-directives-media-zone')
        .directive('appMediaButton', appMediaButton);

    appMediaButton.$inject = ['ngDialog', 'urlBase'];

    function appMediaButton(ngDialog, urlBase) {
        return {
            restrict: 'A',
            scope: {
                libraryOptions: '=libraryOptions',
                onSelectItem: '&onSelectItem',
                objectUuid: '<?',
                companyUuid: '<?',
                object: '=?',
                objectType: '@?',
                isAttachAttachment: '<?',
            },
            link: function (scope, element, attrs) {
                element.click(function () {
                    ngDialog.open({
                        template: urlBase.tplBase('base-modules/app-directives-media-zone', 'media-modal'),
                        className: 'ngdialog-theme-default ngdialog-theme-full-screen w-100 pt0 pb0',
                        scope: scope,
                        controller: ['$scope', function ($scope) {
                            $scope.libraryOpts = scope.libraryOptions;

                            $scope.itemsSelect = function (items) {
                                scope.onSelectItem({items: items});
                                $scope.closeThisDialog();
                            };
                            $scope.objectUuid = scope.objectUuid;
                            $scope.modelName = scope.modelName;
                            $scope.companyUuid = scope.companyUuid;
                            $scope.object = scope.object;
                            $scope.objectType = scope.objectType;
                            $scope.isAttachAttachment = scope.isAttachAttachment;

                        }]
                    })
                });
            },
            controller: function ($scope, $element, $attrs) {

            }
        }
    }
})();
