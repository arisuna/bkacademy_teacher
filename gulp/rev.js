var gulp = require('gulp');
var inject = require('gulp-inject');
var renameFile = require('gulp-rename');
var revCollector = require('gulp-rev-collector');

gulp.task('rev', function () {
    return gulp.src(['build/assets/app.*.json'])
        .pipe(revCollector({
            replaceReved: true,
            dirReplacements: {
                'css': '/dist/css',
                '/js/': '/dist/js/',
                'cdn/': function (manifest_value) {
                    return '//cdn' + (Math.floor(Math.random() * 9) + 1) + '.' + 'exsample.dot' + '/img/' + manifest_value;
                }
            }
        }))
        .pipe(gulp.dest('build/dist'));
});