(function (window) {

    window.__env = window.__env || {};

    window.__env.stage = 'local';

    // API url
    window.__env.apiHostname = 'http://api.reloday.local';

    // STATIC HOST NAME
    window.__env.staticHostname = 'https://static.reloday.com';

    window.__env.hubCrossDomain = 'http://hub.reloday.local';

    // Base url
    window.__env.baseUrl = '/';

    // Whether or not to enable debug mode
    // Setting this to false will disable console output
    window.__env.enableDebug = true;


    window.__env.assigneeAppUrl = 'http://assignee.reloday.local';
    /*
    var _log = console.log;

    console.log = function (logMessage) {

        logMessage=


        _log.apply(console, arguments);
    }*/


}(this));
