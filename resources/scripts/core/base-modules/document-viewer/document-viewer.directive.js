(function() {
    'use strict';

    angular
        .module('app.document-viewer')
        .directive('imageOnload', function() {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {
                    element.bind('load', function() {
                        scope.$apply(attrs.imageOnload);
                    });
                }
            };
        })
        .directive('documentViewer', documentViewer);

        documentViewer.$inject = ['urlBase', 'DocumentViewerFactory'];

        function documentViewer(urlBase, DocumentViewerFactory) {
            var directive = {
                restrict: 'E',
                replace: true,
                scope: {
                    url: '<?',
                    type: '<?',
                    extension: '<?',
                },
                templateUrl: urlBase.tplBase('base-modules/document-viewer', 'document-viewer'),
                controller: function($scope, DocumentViewerFactory, $window, $sce) {
                    $scope.fileNotSupport = false;
                    var $ = $window.$;
                    $scope.loading = true;
                    $scope.closeDocumentViewer = DocumentViewerFactory.closeDocumentViewer;

                    $scope.onImageLoaded = function() {
                        $scope.loading = false;
                    };

                    console.log( $scope.type );

                    if( $scope.type === 'image'){

                    }else{
                        switch ($scope.extension) {
                            case 'image':
                                break;

                            case 'xlsx':
                            case 'xls':
                            case 'ppt':
                            case 'pptx':
                            case 'txt':
                            case 'txts':
                            case 'docx':
                            case 'doc':
                            case 'doct':
                            case 'compressed':
                            case 'archive':
                            case 'zip':
                            case 'gzip':
                                //$scope.fullUrl = $sce.trustAsResourceUrl('https://docs.google.com/gview?url=' + $scope.url + '&embedded=true');
                                $scope.fullUrl = $sce.trustAsResourceUrl($scope.url);
                                $scope.fileNotSupport = true;
                                $scope.loading = false;
                                break;

                            case 'pdf':
                            default:
                                $scope.fullUrl = $sce.trustAsResourceUrl($scope.url);
                                $scope.loading = false;
                                $scope.type = 'default';
                        }
                    }
                }
            };
            return directive;
        }

})();
