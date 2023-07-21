/**
 * [avatar upload directive]
 * @return {[type]} [created by thinh@expatfinder.com]
 */
(function () {
    'use strict';

    angular
        .module('app.thumb')
        .directive('errImageOnLoad', errImageOnLoad);

    errImageOnLoad.$inject = ['$http', 'urlBase', 'GmsAvatarService', 'DataThumbCache', 'AppDataService'];

    function errImageOnLoad($http, urlBase, GmsAvatarService, DataThumbCache, AppDataService) {
        var directiveOnLoad = {
            restrict: 'A',
            scope: {
                uuid: '@uuid',
                type: '@?'
            },
            link: function (scope, element, attrs, timeout) {
                element.bind('on click', function() {
                    console.log('errImageOnclick');
                    console.log(scope.type);
                });
                element.bind('error', function() {
                    console.log('errImageOnLoad');
                    console.log(scope.type);
                    attrs.$set('src', '/app/assets/img/loading/spin.svg');
                    if(scope.type == 'theme_logo' ||scope.type == 'theme_icon' ){
                        console.log(scope.type);
                        AppDataService.getMyCompanyInfo().then(
                            function (res) {
                                if (res.success) {
                                    if(angular.isDefined(res.data.theme) && angular.isDefined(res.data.theme.id)) {
                                        scope.theme = res.data.theme;
                                    } else {
                                        scope.theme = {
                                            main_color: '#0A142B',
                                            logo_url: '/app/assets/img/logo.png',
                                            icon_url: '/app/assets/img/logo-single.png',
                                            secondary_color: '#0098FF'
                                        };
                                    }
                                    console.log('theme ' + scope.theme);
                                    if(scope.type == 'theme_logo'){
                                        attrs.$set('src', scope.theme.logo_url);
                                    } else {
                                        attrs.$set('src', scope.theme.icon_url);
                                    }
                                } else {

                                }
                            },
                            function (err) {

                            }
                        )
                    } else {
                        //call the function that was passed
                        let imgUrl = GmsAvatarService.getAvatarObjectDirect(scope.uuid);
                        DataThumbCache.put(scope.uuid, imgUrl);
                        attrs.$set('src', imgUrl);
                    }
                });
            },
        };
        return directiveOnLoad;
    }

})();
