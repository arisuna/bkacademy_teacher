(function () {
    'use strict';

    angular
        .module('app.layout-directives')
        .directive('asideContent', asideContent);

    asideContent.$inject = ['urlBase', '$rootScope'];

    function asideContent(urlBase) {
        var directive = {
            restrict: 'EA',
            transclude: true,
            scope:{
                content: '<?',
                avatarUuid: '<?',
                openAsideContent: '=?',
                hideCollape: '<?'
            },
            templateUrl: urlBase.tplBase('base-modules/layout-directives', 'aside-content'),
            link: function (scope, element, attrs) {

            },
            controller: function($scope){
                $scope.toggleCollapse = function(){
                    $scope.openAsideContent = !$scope.openAsideContent;
                };
            }
        };
        return directive;
    }

})();
