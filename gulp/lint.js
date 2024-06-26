const jshint = require('gulp-jshint');
const gulp   = require('gulp');

gulp.task('lint', function() {
    return gulp.src('./resources/scripts/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default', { verbose: true }));
});