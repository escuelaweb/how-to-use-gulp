'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass');

var source_paths = {
  sass: './source/sass/**/*.scss',
  js: './source/js/**/*.js',
  html: './source/html/**/*.html',
}

gulp.task('sass', function() {
  return gulp.src(source_paths.sass)
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));
})

gulp.task('merge', function() {
  return gulp.src(source_paths.js)
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./dist/js'));
})

gulp.task('copy', function() {
  return gulp.src(source_paths.html)
    .pipe(gulp.dest('./dist'));
})

gulp.task('watch', ['sass','merge','copy'], function() {
  gulp.watch(source_paths.sass, ['sass'])
  gulp.watch(source_paths.js, ['merge'])
  gulp.watch(source_paths.html, ['copy'])
});

gulp.task('default', ['watch']);