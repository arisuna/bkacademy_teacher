const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const log = require('color-log');
const _ = require('lodash');
const folders = require('gulp-folders');
const recursiveFolder = require('gulp-recursive-folder');
const path = require('path');
const htmlmin = require('gulp-htmlmin');
const flatten = require('gulp-flatten');
const cache = require('gulp-cached');
const rev = require('gulp-rev');
const argv = require('yargs').argv;
const config = require('./config');
const del = require('del');
const directoryExists = require('directory-exists');
const prompt = require('gulp-prompt');
const rename = require("gulp-rename");
const replace = require("gulp-replace");
var fs = require('fs');


/** CORE BASE VIEW */

gulp.task('build:base:view', recursiveFolder({
    base: config.script.view.base,
}, function (folder) {
    log.info(config.apps[config.currentApp].coreViews + folder.name);
    return gulp.src(path.join(config.script.view.base, folder.name, 'views/*.html'))
        .pipe(cache('build:base:view'))
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(flatten())
        .pipe(gulp.dest(config.apps[config.currentApp].coreViews + folder.name));
}));

/** Core vendor base */
gulp.task('build:base:script:vendor', function (done) {
    if (argv.ignoreVendor) {
        log.warn('Ignore build:base:script:vendor');
        return done();
    }
    del([config.script.coreTargetJs]).then(function () {
        return (done) => done();
    });

    return gulp.src(require(config.vendorSource + 'core.base.json'))
        .pipe(concat('a.js'))
        .pipe(rev())
        .pipe(babel())
        .pipe(uglify({mangle: false}))
        .pipe(gulp.dest(config.script.coreTargetJs))
        .pipe(rev.manifest('core.json', {
            merge: false
        }))
        .pipe(gulp.dest(config.script.coreTargetManifest));
});

gulp.task('build:dev:base:script:vendor', function (done) {

    if (argv.ignoreVendor) {
        log.warn('Ignore build:dev:base:script:vendor');
        return done();
    }

    log.info('Generating core.js');

    del([config.script.coreTargetJs]).then(function () {
        return (done) => done();
    });

    return gulp.src(require(config.vendorSource + 'core.base.json'))
        .pipe(concat('core.js'))
        .pipe(babel())
        .pipe(gulp.dest(config.script.coreTargetJs))
        ;
});


/**
 * APPLICATION FOR BASE
 * EX: Login, Register...
 */

gulp.task('build:base:script:base-controller', moduleTask('base', 'controller'));
gulp.task('build:base:script:base-view', moduleTask('base', 'view'));

gulp.task('build:dev:base:script:base-controller', moduleTaskDev('base', 'controller'));
gulp.task('build:dev:base:script:base-view', moduleTaskDev('base', 'view'));

gulp.task('build:script:base', gulp.series(
    //'build:base:script:vendor',
    'build:base:view'
));

gulp.task('build:dev:script:base', gulp.series(
    //'build:dev:base:script:vendor',
    'build:base:view'
));

/* Watch tasks */
gulp.task('watch:base:view', function (done) {
    const src = path.join(config.script.view.base, '*', 'views/*.html');
    log.info('Watching ' + src);
    gulp.watch(src, gulp.series(
        function (done) {
            log.error('Watcher - Base view is being rebuilding...');
            done();
        },
        'build:base:view',
        function (done) {
            log.error('Watcher - Base view is rebuilded!!!');
            done();
        }
    )).on('change', logChangedFile);
    done();
});

gulp.task('watch:base:script:base', function (done) {
    const ctrlSrc = getModuleSrc('base', 'controller');
    const viewSrc = getModuleSrc('base', 'view');

    log.info('Watching ' + ctrlSrc);
    log.info('Watching ' + viewSrc);

    gulp.watch([ctrlSrc, viewSrc], gulp.series(
        function (done) {
            log.error('Watcher - Base controller, view are being rebuilding...');
            done();
        },
        'build:dev:base:script:base-controller',
        'build:dev:base:script:base-view',
        function (done) {
            log.error('Watcher - Base controller, view are rebuilded!!!');
            done();
        }
    )).on('change', logChangedFile);
    done();
});


/* --------------------------- App script ------------------------- */

/** CORE APPLICATION BASE */
gulp.task('build:base:script:app', function () {
    log.info('Production - Building javascript application Home file..');
    return buildAppCoreModule('app');
});


gulp.task('build:dev:base:script:app', function () {
    log.info('Dev - Building javascript application Home file..');
    return buildAppCoreModuleDev('app');
});

/**
 * APP MODULES
 */

// gulp.task('build:base:script:app-controller', moduleTask('app', 'controller'));
// gulp.task('build:base:script:app-view', moduleTask('app', 'view'));
// gulp.task('build:base:script:app-menu', moduleTask('app', 'menu'));
//
// gulp.task('build:dev:base:script:app-controller', moduleTaskDev('app', 'controller'));
// gulp.task('build:dev:base:script:app-view', moduleTaskDev('app', 'view'));
// gulp.task('build:dev:base:script:app-menu', moduleTaskDev('app', 'menu'));

/* Build tasks */
// gulp.task('build:script:app', gulp.series(
//     'build:base:script:app',
//     'build:base:script:app-controller',
//     'build:base:script:app-view',
//     'build:base:script:app-menu'
// ));
// gulp.task('build:dev:script:app', gulp.series(
//     'build:dev:base:script:app',
//     'build:dev:base:script:app-controller',
//     'build:dev:base:script:app-view',
//     'build:dev:base:script:app-menu'
// ));

/* Watch tasks*/
// gulp.task('watch:script:app', function (done) {
//     const ctrlSrc = getModuleSrc('app', 'controller');
//     const viewSrc = getModuleSrc('app', 'view');
//     const menuSrc = getModuleSrc('app', 'menu');
//
//     const modulesSrc = _.map(config.apps['app'].modules, (module) => config.apps['app'].base + module);
//     const excludesSrc = _.map(config.apps['app'].excludes, (exclude) => '!' + config.apps['app'].base + exclude);
//
//     watchTasks([
//         [_.concat(modulesSrc, excludesSrc), 'App module', 'build:dev:base:script:app', 'App module'],
//         [ctrlSrc, 'App controller', 'build:dev:base:script:app-controller'],
//         [viewSrc, 'App view', 'build:dev:base:script:app-view'],
//         [menuSrc, 'App menu', 'build:dev:base:script:app-menu']
//     ]);
//
//     done();
// });

/************************** App script **************************/


/* --------------------------- GSM ------------------------- */

/** CORE CURRENT BASE */
gulp.task('build:base:script:current', function () {
    log.info('Production - Building javascript ' + config.currentApp + ' base file..');
    return buildAppCoreModule(config.currentApp);
});

gulp.task('build:dev:base:script:current', function () {
    log.info('Dev - Building javascript ' + config.currentApp + '  base file..');
    return buildAppCoreModuleDev(config.currentApp);
});


/**
 * CURRENT MODULES
 */

gulp.task('build:base:script:current-controller', moduleTask(config.currentApp, 'controller'));
gulp.task('build:base:script:current-view', moduleTask(config.currentApp, 'view'));
gulp.task('build:base:script:current-menu', moduleTask(config.currentApp, 'menu'));

gulp.task('build:dev:base:script:current-controller', moduleTaskDev(config.currentApp, 'controller'));
gulp.task('build:dev:base:script:current-view', moduleTaskDev(config.currentApp, 'view'));
gulp.task('build:dev:base:script:current-menu', moduleTaskDev(config.currentApp, 'menu'));

/* Build tasks */
gulp.task('build:script:current', gulp.series(
    'build:base:script:current',
    'build:base:script:current-controller',
    'build:base:script:current-view',
    'build:base:script:current-menu'
));


gulp.task('build:dev:script:current', gulp.series(
    'build:dev:base:script:current',
    'build:dev:base:script:current-controller',
    'build:dev:base:script:current-view',
    'build:dev:base:script:current-menu'
));

/* Watch tasks*/
gulp.task('watch:script:current', function (done) {
    const ctrlSrc = getModuleSrc(config.currentApp, 'controller');
    const viewSrc = getModuleSrc(config.currentApp, 'view');
    const menuSrc = getModuleSrc(config.currentApp, 'menu');

    const modulesSrc = _.map(config.apps[config.currentApp].modules, (module) => config.apps[config.currentApp].base + module);
    const excludesSrc = _.map(config.apps[config.currentApp].excludes, (exclude) => '!' + config.apps[config.currentApp].base + exclude);

    watchTasks([
        [_.concat(modulesSrc, excludesSrc), config.currentApp + ' module', 'build:dev:base:script:current', config.currentApp + ' module'],
        [ctrlSrc, config.currentApp + ' controller', 'build:dev:base:script:current-controller'],
        [viewSrc, config.currentApp + ' view', 'build:dev:base:script:current-view'],
        [menuSrc, config.currentApp + ' menu', 'build:dev:base:script:current-menu']
    ]);

    done();
});


/************************** HR **************************/


/* --------------------------- EMPLOYEE ------------------------- */
/** CORE EMPLOYEE BASE */
// gulp.task('build:base:script:employee', function () {
//     log.info('Production - Building javascript employee base file..');
//     return buildAppCoreModule('employee')
// });
//
// gulp.task('build:dev:base:script:employee', function () {
//     log.info('Dev - Building javascript employee base file..');
//     return buildAppCoreModuleDev('employee')
// });
//
//
// /*Register*/
// gulp.task('build:base:script:register', function () {
//     log.info('Production - Building javascript register base file..');
//     return buildAppCoreModule('register')
// });
//
// gulp.task('build:dev:base:script:register', function () {
//     log.info('Building javascript register base file..');
//     return buildAppCoreModuleDev('register')
// });


//gulp.task('build:base:script:register-controller', moduleTask('register', 'controller'));
//gulp.task('build:base:script:register-view', moduleTask('register', 'view'));
//gulp.task('build:base:script:register-menu', moduleTask('communication', 'menu'));

//gulp.task('build:dev:base:script:register-controller', moduleTaskDev('register', 'controller'));
//gulp.task('build:dev:base:script:register-view', moduleTaskDev('register', 'view'));
//gulp.task('build:dev:base:script:register-menu', moduleTaskDev('register', 'menu'));

/* Build tasks */

// gulp.task('build:script:register', gulp.series(
//     'build:base:script:register',
//     'build:base:script:register-controller',
//     'build:base:script:register-view',
//     'build:base:script:register-menu'
// ));

// gulp.task('build:dev:script:register', gulp.series(
//     'build:dev:base:script:register',
//     'build:dev:base:script:register-controller',
//     'build:dev:base:script:register-view',
//     'build:dev:base:script:register-menu'
// ));

// gulp.task('watch:script:register', function (done) {
//     const ctrlSrc = getModuleSrc('register', 'controller');
//     const viewSrc = getModuleSrc('register', 'view');
//     const menuSrc = getModuleSrc('register', 'menu');
//
//     const modulesSrc = _.map(config.script.backend.modules, (module) => config.script.backend.base + module);
//     const excludesSrc = _.map(config.script.backend.excludes, (exclude) => '!' + config.script.backend.base + exclude);
//
//     watchTasks([
//         [_.concat(modulesSrc, excludesSrc), 'register module', 'build:dev:base:script:register', 'register module'],
//         [ctrlSrc, 'register controller', 'build:dev:base:script:register-controller'],
//         [viewSrc, 'register view', 'build:dev:base:script:register-view'],
//         [menuSrc, 'register menu', 'build:dev:base:script:register-menu']
//     ]);
//     done();
// });


/************************** NEEDFORM **************************/

/* Build script tasks */
gulp.task('build:script', gulp.series(
    'build:script:base',
    'build:script:current',
    function (done) {
        log.info('Production - Build script successfully!!!');
        done();
    }
));


gulp.task('build:dev:script', gulp.series(
    'build:dev:script:base',
    'build:dev:script:current',
    function (done) {
        log.info('Build script successfully!!!');
        done();
    }
));

gulp.task('build:dev:script:inject', gulp.series(
    'build:dev:script:current:inject',
    function (done) {
        log.info('Inject script successfully!!!');
        done();
    }
));


gulp.task('build:script:inject', gulp.series(
    'build:dev:script:current:inject',
    function (done) {
        log.info('Inject script successfully!!!');
        done();
    }
));


/* Watch script tasks */
gulp.task('watch:script', gulp.series(
    'watch:base:view',
    'watch:base:script:base',
    'watch:script:current'
));

function moduleTask(zone, type) {


    const modulesSrcControllers = [config.script.sourcePath + zone + '/**/*.js'];


    switch (type) {
        case 'controller':

            return function () {
                return gulp.src(path.join(config.script.sourcePath + zone, '**/', 'js/*.js'), {allowEmpty: true})
                    .pipe(concat(zone +'.js'))
                    .pipe(rev())
                    .pipe(babel())
                    .pipe(uglify({mangle: false}))
                    .pipe(gulp.dest(config.script.appPath + zone + '/js'))
                    .pipe(rev.manifest('manifest.json', {
                        merge: true
                    }))
                    .pipe(gulp.dest(config.script.appPath + zone + '/manifest'));
            };



        case 'view':
            return recursiveFolder({
                base: config.script.sourcePath + zone,
            }, function (folder) {
                return gulp.src(path.join(config.script.sourcePath + zone, folder.name, 'views/*.html'))
                    .pipe(htmlmin({collapseWhitespace: true}))
                    .pipe(flatten())
                    .pipe(gulp.dest(config.script.appPath + zone + '/views/' + folder.name));
            });


        case 'menu':
            return recursiveFolder({
                base: config.script.sourcePath + zone,
            }, function (folder) {
                return gulp.src(path.join(config.script.sourcePath + zone, folder.name, 'menu.json'), {allowEmpty: true})
                    .pipe(concat(folder.name + '.json'))
                    .pipe(gulp.dest(config.script.appPath + zone + '/menu'));
            });


        default:
            log.error('Something wrong your code');
            return (done) => done();
    }
}

function moduleTaskDev(zone, type) {

    switch (type) {
        case 'controller':

            return recursiveFolder({
                base: config.script.sourcePath + zone,
            }, function (folder) {
                return gulp.src(path.join(config.script.sourcePath + zone, folder.name, 'js/*.js'), {
                    allowEmpty: true,
                })
                    .pipe(concat(folder.name + '.js'))
                    .pipe(cache([zone, type, folder.name].join('-')))
                    .pipe(babel())
                    //.pipe(rev())
                    .pipe(gulp.dest(config.script.appPath + zone + '/js'))
                    /*
                    .pipe(rev.manifest(folder.name + '.json', {
                        merge: true,
                    }))
                    */
                    .pipe(gulp.dest(config.script.appPath + zone + '/manifest'))
            });


        case 'view':
            return recursiveFolder({
                base: config.script.sourcePath + zone,
            }, function (folder) {
                return gulp.src(path.join(config.script.sourcePath + zone, folder.name, 'views/*.html'))
                    .pipe(cache([zone, type, folder.name].join('-')))
                    .pipe(htmlmin({collapseWhitespace: true}))
                    .pipe(flatten())
                    .pipe(gulp.dest(config.script.appPath + zone + '/views/' + folder.name));
            });


        case 'menu':
            return recursiveFolder({
                base: config.script.sourcePath + zone,
            }, function (folder) {
                return gulp.src(path.join(config.script.sourcePath + zone, folder.name, 'menu.json'), {allowEmpty: true})
                    .pipe(concat(folder.name + '.json'))
                    .pipe(cache([zone, type, folder.name].join('-')))
                    .pipe(gulp.dest(config.script.appPath + zone + '/menu'));
            });


        default:
            log.error('Something wrong your code');
            return (done) => done();
    }
}

function getModuleSrc(zone, type) {
    switch (type) {
        case 'controller':
            return path.join(config.script.sourcePath + zone, '*', 'js/*.js');


        case 'view':
            return path.join(config.script.sourcePath + zone, '*', 'views/*.html');


        case 'menu':
            return path.join(config.script.sourcePath + zone, '*', 'menu.json');


        default:
            log.error('Something wrong your code');
    }
}

function logChangedFile(src, stats) {
    log.info('File ' + src + ' was changed');
}

// params {Array} [[src1, moduleName1, task1], [src2, moduleName2, task2, watchMsg2]]
function watchTasks(params) {
    _.each(params, (param) => {
        const src = param[0];
        const moduleName = param[1];
        const task = param[2];
        const watchMsg = param[3]; // Optional

        log.info('Watching ' + (watchMsg || src));

        gulp.watch(
            src,
            watchHandler(
                'Watcher - ' + moduleName + ' is being rebuilding...',
                'Watcher - ' + moduleName + ' is rebuilded!!!',
                task
            )
        ).on('change', logChangedFile);
    });
}

function watchHandler(startMsg, finishMsg, task) {
    return gulp.series(
        function (done) {
            log.error(startMsg);
            done();
        },
        task,
        function (done) {
            log.error(finishMsg);
            done();
        }
    )
}

function deleteTaskDev(zone, type) {
    log.info('delete task ' + zone + '/' + type);
    switch (type) {
        case 'controller':
            log.info(config.script.appPath + zone + '/js/');
            del([config.script.appPath + zone + '/js/']);
            return (done) => done();
        default:
            log.error('Something wrong your code');
            return (done) => done();
    }
}

function buildAppCoreModule(zone) {

    const modulesSrc = _.map(config.apps[zone].modules, (module) => config.apps[zone].base + module);
    const excludesSrc = _.map(config.apps[zone].excludes, (exclude) => '!' + config.apps[zone].base + exclude);

    del([config.apps[zone].filePathCore]).then(function () {
        return (done) => done();
    });

    return gulp.src(_.concat(modulesSrc, excludesSrc))
        .pipe(concat(config.apps[zone].fileName))
        .pipe(rev())
        .pipe(babel())
        .pipe(uglify({mangle: false}))
        .pipe(gulp.dest(config.apps[zone].filePathCore))
        .pipe(rev.manifest('core.json', {
            merge: false
        }))
        .pipe(gulp.dest(config.apps[zone].filePathManifest));
}

function buildAppCoreModuleDev(zone) {

    const modulesSrc = _.map(config.apps[zone].modules, (module) => config.apps[zone].base + module);
    const excludesSrc = _.map(config.apps[zone].excludes, (exclude) => '!' + config.apps[zone].base + exclude);

    del([config.apps[zone].filePathCore]).then(function () {
        return (done) => done();
    });
    return gulp.src(_.concat(modulesSrc, excludesSrc))
        .pipe(concat(config.apps[zone].fileName))
        .pipe(cache('build:dev:base:script:' + zone))
        .pipe(babel())
        .pipe(gulp.dest(config.apps[zone].filePathCore))
}

function getModuleTargetFileJs(zone) {
    return path.join(config.apps[zone].filePath, '*', 'js/*.js');
}

function cleanOutdateFile(manifestJsonFile) {
    log.info(manifestJsonFile);
}

