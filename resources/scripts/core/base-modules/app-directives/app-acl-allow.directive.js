(function () {
    'use strict';

    angular
        .module('app.app-directives')
        .directive('appAclAllow', appAclAllow);

    appAclAllow.$inject = ['AppAclService'];

    function appAclAllow(AppAclService) {
        return {
            restrict: 'A',

            link: function (scope, element, attr) {
                const perm = attr.appAclAllow;
                if (perm == '' || perm == null) return true;

                const [controller, action] = perm.split("/");
                const aclRemove = attr.aclRemove;

                if (controller != '') {

                    if (AppAclService.validateAction(controller, action) == false) {

                        if (aclRemove == "true" || aclRemove == true) {
                            element.remove();
                        } else {
                            if (attr.hasOwnProperty("ui-sref")) {
                                element.removeAttr('ui-sref');
                                element.removeAttr('href');
                                element.removeAttr('uisref');
                            } else if (attr.hasOwnProperty("href")) {
                                element.removeAttr('ui-sref');
                                element.removeAttr('href');
                                element.removeAttr('uisref');
                            } else if (attr.hasOwnProperty("ng-click")) {
                                element.removeAttr('ng-click').removeAttr('ng-click');
                            } else {
                                element.remove();
                            }
                        }
                    }
                }
            }
        };
    }


    angular
        .module('app.app-directives')
        .directive('appAclNotAllow', appAclNotAllow);

    appAclNotAllow.$inject = ['AppAclService'];

    function appAclNotAllow(AppAclService) {
        return {
            restrict: 'A',

            link: function (scope, element, attr) {
                const perm = attr.appAclNotAllow;
                const [controller, action] = perm.split("/");
                if (controller != '') {
                    if (AppAclService.validateAction(controller, action) == true) {
                        element.remove();
                    }
                }
            }
        };
    }
})();


