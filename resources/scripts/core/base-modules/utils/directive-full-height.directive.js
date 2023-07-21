// (function () {
//
//     'use strict';
//
//     angular.module('app.utils')
//         .directive('directiveFullHeight',directiveFullHeight);
//
//     directiveFullHeight.$inject = ['$window'];
//
//     function directiveFullHeight($window) {
//         return {
//             restrict: 'C',
//             //transclude: true,
//             //template:'<div ng-transclude></div>',
//             link: function (scope, element) {
//                 var window = angular.element($window);
//                 scope.setFullHeight= function(){
//                     let h = angular.element($window).height() - angular.element(element)[0].offsetTop -1;
//
//                     console.log('angular.element($window).height()',angular.element($window).height());
//                     console.log('angular.element(element)[0].offsetTop',angular.element(element))
//
//                     element.css({'height':h+'px'})
//                 }
//                 scope.setFullHeight();
//
//
//                 angular.element($window).bind('resize', function() {
//                     scope.setFullHeight();
//                 })
//                 scope.$on('$destroy', function () {
//                     window.unbind('resize', scope.setFullHeight)
//                 });
//             }
//         };
//     }
// })();
