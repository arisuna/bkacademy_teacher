(function (window) {

    window.__env = window.__env || {};

    window.__env.stage = '__stage__';

    // API url
    window.__env.apiHostname = '__api_host_name__';

    // STATIC HOST NAME
    window.__env.staticHostname = '__static_host_name__';

    window.__env.hubCrossDomain = '__hub_cross_domain_name__';

    // Base url
    window.__env.baseUrl = '/';

    // Whether or not to enable debug mode
    // Setting this to false will disable console output
    window.__env.enableDebug = true;


    window.__env.assigneeAppUrl = '__assignee_app_url__';
    /*
    var _log = console.log;

    console.log = function (logMessage) {

        logMessage=


        _log.apply(console, arguments);
    }*/


}(this));
