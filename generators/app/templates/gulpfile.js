'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var serveStatic = require('serve-static');
var serveIndex = require('serve-index');
var $ = require('gulp-load-plugins')();


gulp.task('sass', function () {
  return gulp.src('./app/sass/**/*.scss')
    .pipe($.sass({errLogToConsole: true}))
    .pipe($.autoprefixer('last 1 version'))
    .pipe(gulp.dest("./app/css"));
});

gulp.task('js', function () {
  return gulp.src('./app/js/**/*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter(require('jshint-stylish')))
    .pipe($.size());
});

gulp.task('reload', function () {
//  browserSync.reload();
  return gulp.src('./app/**/*.html')
    .pipe(browserSync.stream());
});


// Static server
gulp.task('watch', function() {
  browserSync.init({
    server: {
      baseDir: "./app"
    }
  });
  gulp.watch('./app/sass/**/*.scss', ['sass']);
  gulp.watch('./app/js/**/*.js', ['js']);
  gulp.watch([
        './app/**/*.html',
        './app/css/**/*.css',
        './app/sass/**/*.scss',
        './app/js/**/*.js'
    ], ['reload']);
});
