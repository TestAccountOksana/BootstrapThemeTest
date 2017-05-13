/**
 * Created by oksana on 13.05.17.
 */
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    livereload = require('gulp-livereload');

gulp.task('scss', function() {
    gulp.src('./resourses/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('./resourses/css/'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest('./resourses/css/'));
});

gulp.task('scss:watch', function() {
    gulp.watch('./resourses/scss/*.scss', ['scss']);
})