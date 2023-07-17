const gulp = require('gulp');
const log = require('color-log');

const config = require('./config');
const fontSource = config.font.fontSource;
const fontTarget = config.apps[config.currentApp].fontPath;


gulp.task('build:fonts', function() {
	log.info('Copying Bootstraps fonts...');
 	return gulp.src(fontSource + '/*.{eot,otf,svg,ttf,woff,woff2}')
  		.pipe(gulp.dest(fontTarget));
});
