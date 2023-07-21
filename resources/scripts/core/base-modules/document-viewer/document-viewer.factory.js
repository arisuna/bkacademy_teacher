(function() {
  'use strict';

  angular
    .module('app.document-viewer')
    .factory('DocumentViewerFactory', DocumentViewerFactory);

    DocumentViewerFactory.$inject = ['$window', '$compile', '$rootScope'];

    function DocumentViewerFactory($window, $compile, $rootScope) {
        var $ = $window.$;
        var $scope = null;

        this.openDocumentViewer = function(url, type, extension ) {
            $scope = $rootScope.$new();
            $scope.url = url;
            $scope.type = type;
            $scope.extension = extension;

            var documentViewerDirective = '<document-viewer url="url" type="type" extension="extension"></document-viewer>';
            var element = $compile(documentViewerDirective)($scope);
            $('body').append(element).addClass('overflow-hidden');
        };

        this.closeDocumentViewer = function() {
            if ($scope) {
                $scope.$destroy();
                $scope = null;
            }

            $('#document-viewer-modal').remove();
            $('body').removeClass('overflow-hidden');
        };

        return this;
    }

})();