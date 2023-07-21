/**=========================================================
 * Module: CliopBload
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('app.utils')
        .factory('ngClipboardFactory', ngClipboardFactory)
        .directive('ngCopyable', ngCopyable);


    ngClipboardFactory.$inject = ['$compile', '$rootScope', '$document'];


    function ngClipboardFactory($compile, $rootScope, $document) {
        return {
            toClipboard: function (element) {

                var copyElement = angular.element('<span id="ngClipboardCopyId">' + element + '</span>');
                var body = $document.find('body').eq(0);
                body.append($compile(copyElement)($rootScope));

                var ngClipboardElement = angular.element(document.getElementById('ngClipboardCopyId'));

                var range = document.createRange();

                range.selectNode(ngClipboardElement[0]);

                window.getSelection().removeAllRanges();
                window.getSelection().addRange(range);

                var successful = document.execCommand('copy');

                var msg = successful ? 'successful' : 'unsuccessful';

                window.getSelection().removeAllRanges();

                copyElement.remove();
            }
        }
    };


    function ngCopyable() {
        return {
            restrict: 'A',
            link: link
        };

        function link(scope, element, attrs) {
            element.bind('click', function () {

                var range = document.createRange();
                range.selectNode(element[0]);
                window.getSelection().removeAllRanges();
                window.getSelection().addRange(range);
                var successful = document.execCommand('copy');

                var msg = successful ? 'successful' : 'unsuccessful';
                console.log('Copying text command was ' + msg);
                window.getSelection().removeAllRanges();
            });
        }
    };


})();
