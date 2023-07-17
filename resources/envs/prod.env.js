(function (window) {

    window.__env = window.__env || {};

    window.__env.stage = '__stage__';

    // API url
    window.__env.apiHostname = '__api_host_name__';

    // STATIC HOST NAME
    window.__env.staticHostname = '__static_host_name__';
    //HUb domain for cross domain process
    window.__env.hubCrossDomain = '__hub_cross_domain_name__';
    // Base url
    window.__env.baseUrl = '/';
    // assignee App URL
    window.__env.assigneeAppUrl = '__assignee_app_url__';
    // Whether or not to enable debug mode
    // Setting this to false will disable console output
    window.__env.enableDebug = true;

}(this));

// define a new console
var console = (function (oldCons) {
    return {
        log: function (text) {
            oldCons.log('%cStop', 'color: red; font-size: 30px; font-weight: bold;');
            oldCons.log('%cThis is a browser feature intended for developers. If someone told you to copy and paste something here to enable a Relotalent feature or "hack" someone\'s account, it is a scam and will give them access to your Relotalent account.', 'color: black; font-size: 18px; font-weight: bold;');
            // Your code
        },
        info: function (text) {
            oldCons.info(text);
            // Your code
        },
        warn: function (text) {
            oldCons.warn(text);
            // Your code
        },
        error: function (text) {
            oldCons.error(text);
            // Your code
        }
    };
}(window.console));

//Then redefine the old console
window.console = console;

