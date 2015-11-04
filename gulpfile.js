/* jshint node: true, strict: true */

"use strict";


var gulp        = require('gulp');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var minifyCSS   = require('gulp-minify-css');
var browserify  = require('browserify');
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');



// Minify JS

gulp.task('js', () => {
    return browserify('./src/js/script.js')
        .bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(uglify({outSourceMap: false}))
        .pipe(gulp.dest('./public/js/'));
});



// Minify CSS

gulp.task('css-fold', () => {
    return gulp.src(['src/css/structure.css'])
        .pipe(minifyCSS({removeEmpty : true}))
        .pipe(concat('structure.css'))
        .pipe(gulp.dest('./public/css/'));
});

gulp.task('css-app', () => {
    return gulp.src(['src/css/styles.css'])
        .pipe(minifyCSS({removeEmpty : true}))
        .pipe(concat('app.css'))
        .pipe(gulp.dest('./public/css/'));
});



// Copy images

gulp.task('img', () => {
    return gulp.src('./src/img/**/*')
        .pipe(gulp.dest('./public/img/'));
});



// Copy favicon

gulp.task('icon', () => {
    return gulp.src('./src/favicon.ico')
        .pipe(gulp.dest('./public'));
});


// Copy fonts

gulp.task('fonts', () => {
    return gulp.src('./src/fonts/**/*')
        .pipe(gulp.dest('./public/fonts/'));
});



// The default task

gulp.task('default', ['js', 'css-fold', 'css-app', 'img', 'fonts', 'icon']);
