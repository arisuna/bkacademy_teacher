/**
 * Created by anmeo on 10/26/16.
 */

(function () {
    'use strict';

    angular
        .module('app.media-library')
        .directive('mediaLibrary', mediaLibrary);

    mediaLibrary.$inject = ['$http', '$localStorage', '$timeout', 'ngDialog', 'toaster', 'urlBase', '$filter'];

    function mediaLibrary($http, $localStorage, $timeout, ngDialog, toaster, urlBase, $filter) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                options: '=libraryOptions',
                onSelectItem: '&onSelectItem'
            },
            templateUrl: urlBase.tplBase('base-modules/uploader', 'media-library'),
            link: function (scope, element, attrs) {
                /**
                 * Define options
                 */
                if (angular.isUndefined(attrs.libraryOptions)) {
                    scope.options = {
                        multiSelect: true,
                    };
                }

                if (angular.isUndefined(scope.options)) {
                    scope.options = {
                        multiSelect: true,
                    };
                }

                scope.fileType = [];

                var fileType = [
                    {name: 'Image', value: 'image'},
                    {name: 'Document', value: 'document'},
                    {name: 'Audio', value: 'audio'},
                    {name: 'Video', value: 'video'},
                    {name: 'Compressed', value: 'compressed'},
                    {name: 'Other', value: 'other'}
                ];

                var fileFilter = 'all';

                /*scope.fileType = fileType;

                 if (angular.isDefined(scope.options.fileType) && scope.options.fileType.length > 0) {
                 angular.forEach(fileType, function (typeValue, typeKey) {
                 angular.forEach(scope.options.fileType, function (optsValue, optsKey) {
                 if (typeValue.value === optsValue) {
                 scope.fileType.push(typeValue);
                 }
                 });
                 });

                 fileFilter = scope.options.fileType;
                 }*/

                /**
                 * Get Media Items
                 */

                

                scope.mediaItems = [];
                scope.page = [];
                scope.search = '';
                scope.currentPage = 1;
                scope.numPerPage = 10;
                scope.maxSize = 5;
                scope.maxLength = 0;
                scope.totalItems = 0;
                scope.currentMedia = [];
                //scope.currentMediaId = 0;

                scope.pageChanged = function () {
                    console.log('Page changed to: ' + scope.currentPage);
                };

                scope.searchMedia = function () {
                    $http
                        .post('/media/uploader/index', {search: scope.search, page: scope.currentPage}, {
                            headers: {
                                'X-Requested-With': 'XMLHttpRequest',
                                'Token-Key': window.localStorage.getItem('token_key')
                            }
                        })
                        .success(function (data) {
                            if (data.success) {
                                scope.mediaItems = data.data;
                                scope.totalItems = data.page.totalItems;
                            }
                        });
                }


                scope.$watch('currentPage', function () {
                    scope.searchMedia();
                });

                scope.searchMedia();

            },
            controller: function ($scope, $element, $attrs, ngDialog, $filter) {

                /**
                 * SELECTED ITEM
                 */

                $scope.itemsSelect = [];

                $scope.selected = function ($event, $index) {

                    if (angular.isDefined($attrs.onSelectItem)) {
                        if (angular.isDefined($scope.options.multiSelect)) {
                            if ($scope.options.multiSelect == true) {
                                $($event.currentTarget).toggleClass('selected');
                            }
                            else {
                                $('.media-management-list > .item-box').removeClass('selected');
                                $($event.currentTarget).toggleClass('selected');
                                $scope.itemsSelect = [];
                            }
                        }

                        if ($scope.itemsSelect.length > 0) {
                            var found = $filter('filter')($scope.itemsSelect, {id: $scope.mediaItems[$index].id}, true);

                            if (found.length > 0) {
                                $scope.itemsSelect.splice($scope.itemsSelect.indexOf(found[0]), 1);
                            }
                            else {
                                $scope.itemsSelect.push($scope.mediaItems[$index]);
                            }
                        }
                        else {
                            $scope.itemsSelect.push($scope.mediaItems[$index]);
                        }
                    }

                };

                $scope.showSelected = function () {
                    $scope.onSelectItem({items: $scope.itemsSelect});
                }
            }
        }
    }
})();