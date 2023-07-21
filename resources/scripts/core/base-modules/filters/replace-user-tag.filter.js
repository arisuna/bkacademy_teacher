/**=========================================================
 * Module: now.js
 * Provides a simple way to display the current time formatted
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('app.filters')
        .filter('replaceUserTag', replaceUserTag);
    replaceUserTag.$inject = ['$sce','$sanitize'];
    function replaceUserTag($sce, $sanitize) {
        return filter;
        function filter(input, params ) {

            if (input !== null && !angular.isUndefined( input )) {
                var users = params.persons;

                var matches = input.match(/\[@([a-zA-Z0-9]+)]/gi);

                if (matches !== null) {
                    if (matches.length > 0) {
                        angular.forEach(matches, function (item) {
                            var nickname = item.substring(2, item.length - 1);
                            var userTarget = {};

                            angular.forEach(users, function (person) {
                                if (person.nickname == nickname) {
                                    nickname = person.firstname + ' ' + person.lastname;
                                    userTarget = person;
                                }
                            });

                            input = input.replace(item,
                                '<a href="javascript:void(0);" class="mr-sm" uib-tooltip-template="\'CommentUserBox.tpl\'" ng-model="userTarget" tooltip-placement="bottom-left" tooltip-class="user-tooltip">' + nickname + '</a>');
                        })
                    }
                }
                return input;
            }
        }
    }

})();
