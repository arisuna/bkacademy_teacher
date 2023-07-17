const gulp = require('gulp');
const config = require('./config');
const log = require('color-log');
const del = require('del');

gulp.task('clean:application', function () {
    log.info('Cleaning zone hr app');
    return cleanZone(config.currentApp);
});

gulp.task('clean:core', function () {
    return del([config.script.coreTargetJs]).then(function () {
        return (done) => done();
    });
});

gulp.task('clean:zone', gulp.series(
    'clean:core',
    'clean:application'
));

function cleanZone(application) {
    log.info('Cleaning directory : ' + config.apps[application].filePathJs);
    return del([config.apps[application].filePathJs, config.apps[application].filePathCore, config.apps[application].filePathManifest]).then(function () {
        return (done) => done();
    });
}
