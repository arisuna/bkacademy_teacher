(function() {
    'use strict';

    /*
    angular
        .module('app.auth')
        .run(authRun)
    ;
    authRun.$inject = ['AuthService', '$timeout','$location','$window'];
    function authRun(AuthService, $timeout, $location, $window){

        if ($location.absUrl().indexOf('online') == -1) {
            AuthService.authentication.isClient = true;
        }

        if (AuthService.fillAuthData()) {
            if(AuthService.authentication.isClient){
                console.log('authen ok');
            }else{
                console.log('authen nook');
            }
        } else {

            console.log('authen failed');
            console.log( $window.location.pathname );

            if( $window.location.pathname == '/gms' ){
                $window.location.assign('/app/#/login');
            }
            if( $window.location.pathname == '/employees' ){
                $window.location.assign('/employees/#/login');
            }
            if( $window.location.pathname == '/hr' ){
                $window.location.assign('/hr/#/login');
            }
        }

    }
    */
})();