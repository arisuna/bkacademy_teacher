const gulp = require('gulp');
const config = require('./config');
const log = require('color-log');
const path = require('path');
const _ = require('lodash');


/* Watch tasks*/
gulp.task('watch:index:app', function (done) {
    const allSrc = getModuleTargetFileJs('app');
    watchTasksIndex([
        [allSrc, 'App Index HTML', 'build:dev:script:app:inject']
    ]);
    done();
});

gulp.task('watch:index:current', function (done) {
    const allSrc = getModuleTargetFileJs(config.currentApp);
    watchTasksIndex([
        [allSrc, config.currentApp + ' Index HTML', 'build:dev:script:current:inject']
    ]);
    done();
});


gulp.task('watch:index:register', function (done) {
    const allSrc = getModuleTargetFileJs('register');
    watchTasksIndex([
        [allSrc, 'Register Index HTML', 'build:dev:script:register:inject'],
    ]);
    done();
});

gulp.task('watch:index', gulp.series(
    'watch:index:current'
));

function getModuleTargetFileJs(zone) {
    return _.concat(
        path.join(config.apps[zone].filePathJs, '*.js'),
        path.join(config.apps[zone].filePathCore, '*.js'),
        path.join(config.script.coreTargetJs, 'js/*.js')
    );
}

// params {Array} [[src1, moduleName1, task1], [src2, moduleName2, task2, watchMsg2]]
function watchTasksIndex(params) {
    _.each(params, (param) => {
        const src = param[0];
        const moduleName = param[1];
        const task = param[2];
        const watchMsg = param[3]; // Optional

        log.info('Watching ' + (watchMsg || src));

        gulp.watch(
            src,
            watchHandlerIndex(
                'Watcher - ' + moduleName + ' is being rebuilding...',
                'Watcher - ' + moduleName + ' is rebuilded!!!',
                task
            )
        ).on('change', logChangedFileIndex);
    });
}

function watchHandlerIndex(startMsg, finishMsg, task) {
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

function logChangedFileIndex(src, stats) {
    log.info('File ' + src + ' was changed');
}
