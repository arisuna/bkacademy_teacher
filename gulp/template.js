const gulp = require('gulp');
const log = require('color-log');

const config = require('./config');

gulp.task('watch:template', function(done) {
	const src = config.template;

	gulp.watch(src, function(done) {
		log.error('Reloaded!!!');
	}).on('change', function(src, stats) {
	    log.info('File ' + src + ' was changed');
	});

	done();
});
