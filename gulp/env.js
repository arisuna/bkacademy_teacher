const gulp = require('gulp');
const config = require('./config');
const log = require('color-log');
const prompt = require('gulp-prompt');
const rename = require("gulp-rename");
const replace = require("gulp-replace");
const argv = require('yargs').argv;


gulp.task('build:env', function () {
    return buildEnv('prod');
});

gulp.task('build:preprod:env', function () {
    return buildEnv('preprod');
});

gulp.task('build:dev:env', function () {
    return buildEnv('dev');
});

gulp.task('build:prod:env', function () {
    return buildEnv('prod');
});

function buildEnv(stage) {

    if (argv['stage'] != '') {
        stage = argv['stage'];
    }

    switch (stage) {
        case 'thuydev':
        case 'preprod':
        case 'thinhdev':
        case 'minhdev':
        case 'dev':
        case 'local':
        case 'thinhdev_local':
        case 'thinhdev_eu':
        case 'thuydev_local':
            log.info("build environment dev");
            return gulp.src(config.script.sourcePath + '/../../envs/dev.env.js')
                .pipe(replace('__stage__', stage))
                .pipe(replace('__base_url', config.currentAppUrl))
                .pipe(replace('__api_host_name__', config.apiHostNames[stage]))
                .pipe(replace('__static_host_name__', config.staticHostNames['dev']))
                .pipe(replace('__hub_cross_domain_name__', config.hubCrossDomain[stage]))
                .pipe(replace('__assignee_app_url__', config.assigneeAppUrl[stage]))
                .pipe(rename('env.js'))
                .pipe(gulp.dest(config.apps[config.currentApp].envTargetPath, {allowEmpty: true}), {allowEmpty: true});
            break;

        case 'prod':
            log.info("build environment prod");
            return gulp.src(config.script.sourcePath + '/../../envs/dev.env.js')
                .pipe(replace('__stage__', stage))
                .pipe(replace('__api_host_name__', config.apiHostNames[stage]))
                .pipe(replace('__static_host_name__', config.staticHostNames[stage]))
                .pipe(replace('__hub_cross_domain_name__', config.hubCrossDomain[stage]))
                .pipe(replace('__assignee_app_url__', config.assigneeAppUrl[stage]))
                .pipe(rename('env.js'))
                .pipe(gulp.dest(config.apps[config.currentApp].envTargetPath, {allowEmpty: true}), {allowEmpty: true});
            break;

        default:
            stage = 'local';
            log.info("build environment default");
            return gulp.src(config.script.sourcePath + '/../../envs/dev.env.js')
                .pipe(replace('__stage__', stage))
                .pipe(replace('__api_host_name__', config.apiHostNames[stage]))
                .pipe(replace('__static_host_name__', config.staticHostNames['dev']))
                .pipe(replace('__hub_cross_domain_name__', config.hubCrossDomain[stage]))
                .pipe(replace('__assignee_app_url__', config.assigneeAppUrl[stage]))
                .pipe(rename('env.js'))
                .pipe(gulp.dest(config.apps[config.currentApp].envTargetPath, {allowEmpty: true}), {allowEmpty: true});
            break;

    }
}

