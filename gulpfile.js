/**
 * Created by oksana on 13.05.17.
 */
/*Installed modules*/
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    sourcemaps = require('gulp-sourcemaps'),

    imagemin = require('gulp-imagemin'),

    uglify = require('gulp-uglify'),
    pump = require('pump'),

    rename = require('gulp-rename'),
    browserSync = require('browser-sync').create();


/*The main task to watch changes in css, html, js*/
gulp.task('serve', ['scss'], function() {
    browserSync.init({
        server: "./"
    });
    gulp.watch("./resourses/scss/*.scss", ['scss']);
    gulp.watch("./resourses/js/*.js", ['compressjs']);
    gulp.watch("./*.html").on('change', browserSync.reload);
});

/*Task to compile scss and minify css*/
gulp.task('scss', function() {
    gulp.src('./resourses/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.init())
        .pipe(autoprefixer(
            'last 2 version',
            'safari 5',
            'ie 8', 'ie 9',
            'opera 12.1',
            'ios 6',
            'android 4'))
        .pipe(gulp.dest('./public/css/'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest('./public/css/'))
        .pipe(browserSync.stream());
});

/*Task to minify js*/
gulp.task('compressjs', function (cb) {
    pump([
        gulp.src('./resourses/js/*.js'),
        rename({ suffix: '.min' }),
        sourcemaps.init(),
        uglify(),
            gulp.dest('./public/js/')
        ],
        cb
    );
});

/*Task to minify images*/
gulp.task('images', function() {
    gulp.src('./resourses/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./public/images/'))

});


