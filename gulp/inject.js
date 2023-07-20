const gulp = require('gulp');
const inject = require('gulp-inject');
const renameFile = require('gulp-rename');
const config = require('./config');
const log = require('color-log');
const fs = require('fs');
const merge = require('gulp-merge-json');
const replace = require("gulp-replace");
const argv = require('yargs').argv;

gulp.task('build:dev:script:current:inject', function () {
    return injectJsHtml(config.currentApp);
});

function injectJsHtml(zone) {

    let versionNumber = "1";

    if (argv['number'] != '') {
        versionNumber = argv['number'];
    }


    if (zone == config.currentApp) {
        log.info('Injecting CSS/JS in  - ' + zone + ' index html');
        var target = gulp.src(config.apps[zone].layoutFile);
        var sources = gulp.src([
            config.apps[zone].envTargetFile,
            config.apps[zone].filePath + '*.js',
            config.apps[zone].assetsPath + '**/*.js',
            config.apps[zone].librariesPath + '/**/*.js',
            config.apps[zone].filePathCore + '*.js',
            config.apps[zone].filePathJs + '*.js',
            config.apps[zone].cssPath + 'app.css',
            config.apps[zone].cssPath + 'theme-celine.css',
        ], {read: false});
        return target
            .pipe(inject(sources, {
                ignorePath: 'public',
                addRootSlash: true,
                relative: false,
                transform: function (filepath) {
                    arguments[0] = filepath + '?v=' + versionNumber;
                    return inject.transform.apply(inject.transform, arguments);
                }
            }))
            .pipe(replace('meta_description', config.apps[zone].description))
            .pipe(renameFile('index.html'))
            .pipe(gulp.dest(config.apps[zone].indexHtmlPath));
    } else {
        log.info('Injecting CSS/JS in  - ' + zone + ' index html');
        var target = gulp.src(config.apps[zone].layoutFile);
        var sources = gulp.src([
            //config.script.envTargetFile,
            config.script.coreTargetJs + '*.js',
            config.apps[zone].filePathCore + '*.js',
            config.apps[zone].filePathJs + '*.js'
        ], {read: false});
        return target
            .pipe(inject(sources, {
                ignorePath: 'public',
                addRootSlash: true,
                relative: false
            }))
            .pipe(replace('meta_description', config.apps[zone].description))
            .pipe(renameFile('index.html'))
            .pipe(gulp.dest(config.apps[zone].indexHtmlPath));
    }


}

function combinedModuleManifest(zone) {
    return gulp.src(config.apps[zone].filePathManifest + '*.json')
        .pipe(merge({
            fileName: 'controllers.manifest.json'
        }))
        .pipe(gulp.dest(config.apps[zone].filePath));
}
