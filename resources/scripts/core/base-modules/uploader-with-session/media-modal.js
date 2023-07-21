/**
 * Created by anmeo on 11/1/16.
 */

(function () {
    'use strict';

    angular
        .module('app.media-library-session')
        .directive('mediaButtonSession', mediaButton);

    mediaButton.$inject = ['ngDialog', 'urlBase'];

    function mediaButton(ngDialog, urlBase) {
        return {
            restrict: 'A',
            scope: {
                libraryOptions: '=libraryOptions',
                onSelectItem: '&onSelectItem'
            },
            link: function (scope, element, attrs) {
                element.click(function () {
                    ngDialog.open({
                        template: urlBase.tplBase('base-modules/uploader-with-session', 'media-modal'),
                        className: 'ngdialog-theme-default xl-box',
                        scope: scope,
                        controller: ['$scope', function ($scope) {
                            $scope.libraryOpts = scope.libraryOptions;

                            $scope.itemsSelect = function (items) {
                                scope.onSelectItem({items: items});
                                $scope.closeThisDialog();
                            }
                        }]
                    })
                });
            },
            controller: function ($scope, $element, $attrs) {

            }
        }
    }
})();