const fs = require('fs');
const gulp = require('gulp');
const log = require('color-log');
var vendor_file = "./vendor_base/";
var rename = require('gulp-rename');
var config = require('./gulp/config');

// Load all tasks from ./gulp folder
fs.readdirSync('./gulp')
    .filter((file) => (/\.js$/i).test(file))
    .map((file) => {
        require('./gulp/' + file);
    });


var build = {

    baseLibraries: "./node_modules/reloday/libraries",

    coreScripts: "./node_modules/reloday/core",

    libraries: "./public/libraries/",

    base: "./public/base/",

    application: "./public/register/",

    resources: {
        css: "./public/resources/css/",
        js: "./public/resources/js/"
    },

    apps: "./public/apps/",

    fonts: {
        src: "./bower_components/bootstrap/fonts/",
        dest: "./public/resources/fonts"
    },

    base_modules: {
        views: "./public/resources/views/base-modules"
    }
};

gulp.task('setup-libraries', function () {
    log.info("Setup Libraries");
    return gulp.src(build.baseLibraries + "/**/*", {base: build.baseLibraries})
        .pipe(gulp.dest(config.apps[config.currentApp].librariesPath));
});


gulp.task('setup-assets', function () {
    log.info("Setup Assets");
    return gulp.src(config.baseAssets + "/**/*", {base: config.baseAssets})
        .pipe(gulp.dest(config.apps[config.currentApp].assetsPath));
});

gulp.task('setup-core', function () {
    log.info("Setup Libraries");
    return gulp.src("./node_modules/reloday/dist/full.bundle.js", {base: 'node_modules/reloday/dist/'})
        .pipe(rename(config.apps[config.currentApp].coreFileName))
        .pipe(gulp.dest(config.apps[config.currentApp].filePath));
});


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

// gulp.task('setup-base', function () {
//     log.info("Setup base");
//     return gulp.src(require(vendor_file + 'core.base.json'), {base: 'bower_components'})
//         .pipe(gulp.dest(build.base));
//
// });


gulp.task('build', gulp.series(
    'clean:zone',
    'build:style',
    'build:fonts',
    'setup-core',
    'setup-libraries',
    'setup-assets',
    'build:script',
    'build:env',
    'build:script:inject',
    function (done) {
        log.info('Production - Build successfully!!!');
        done();
    }
));

gulp.task('build:dev', gulp.series(
    'clean:zone',
    'build:style',
    'build:fonts',
    'setup-core',
    'setup-libraries',
    'setup-assets',
    'build:dev:script',
    'build:dev:env',
    'build:dev:script:inject',
    function (done) {
        log.info('Build successfully!!!');
        done();
    }
));


gulp.task('serve', gulp.series(
    'build:dev',
    'watch:style',
    'watch:template',
    'watch:script'
));


//gulp.task('inject', gulp.series('injectindex'));

// Default task
gulp.task('default', gulp.series('serve'));
