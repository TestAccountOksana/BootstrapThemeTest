/**
 * Created by oksana on 13.05.17.
 */
var gulp = require('gulp'),
    sass = require('gulp-sass');

gulp.task('scss', function() {
    gulp.src('./resourses/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./resourses/css/'));
});

gulp.task('scss:watch', function() {
    gulp.watch('./resourses/scss/*.scss', ['scss']);
})