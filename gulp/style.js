const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

const sass = require('gulp-sass')(require('node-sass'));
const log = require('color-log');
const rtlcss = require('gulp-rtlcss');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const strip = require('gulp-strip-css-comments');


const config = require('./config');
const coreSource = config.style.coreSource;
const coreTarget = config.apps[config.currentApp].cssPath;
const base = config.style.base;

/** Style App */
gulp.task('build:core:style:app', function () {
    log.info('Building application styles..');
    return buildStyleApp();
});


/** Style RTL (Right To Left)*/
gulp.task('build:core:style:rtl', function () {
    log.info('Building application RTL styles..');
    return gulp.src(coreSource + '*.*')
        .pipe($.rename({suffix: '-rtl'}))
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(rtlcss())
        .pipe(strip({ preserve: false }))
        .pipe(postcss([ autoprefixer() ]))
        .pipe(gulp.dest(coreTarget));
});


/** Style Themes */
gulp.task('build:core:style:themes', function () {
    log.info('Building application theme styles..');
    return gulp.src(coreSource + 'themes/*.*')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(strip({ preserve: false }))
        .pipe(postcss([ autoprefixer() ]))
        .pipe(gulp.dest(coreTarget));
});


/** Build style */
gulp.task('build:style', gulp.parallel(
	'build:core:style:app',
	'build:core:style:rtl',
	'build:core:style:themes'
));


/** Reload style */
gulp.task('reload:style', function () {
    return buildStyleApp('app.scss');
});


/** Watch style */
gulp.task('watch:style', function(done) {
    log.mark('Watching app style..');
    gulp.watch(base + '**/*', gulp.series(
        'reload:style',
        function(done) {
            log.error('App style is rebuilded!!!');
            done();
        }
    )).on('change', function(src, stats) {
        log.info('File ' + src + ' was changed');
    });
    done();
});


function buildStyleApp(absoluteFileName) {
	return gulp.src(coreSource + (absoluteFileName || '*.*'))
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(strip({ preserve: false }))
        .pipe(postcss([ autoprefixer() ]))
        .pipe(gulp.dest(coreTarget));
}
