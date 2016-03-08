var gulp    = require('gulp');
var webpack = require('gulp-webpack');
var babel   = require('gulp-babel');
var mocha   = require('gulp-mocha');
var babel_compiler = require('babel-core/register');

gulp.task('babel', function () {
    gulp.src('./src/*.es6')
        .pipe(babel())
        .pipe(gulp.dest('./src/'));
});

gulp.task('webpack', function () {
    gulp.src('./src/*.js')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('mocha', function () {
    gulp.src('./test/*.es6')
        .pipe(mocha({
            compilers: {
                es6: babel_compiler
            }
        }));
});

gulp.task('watch', function () {
    gulp.watch('src/*.js', ['webpack']);
    gulp.watch('src/*.es6', ['babel', 'mocha']);
    gulp.watch('test/*.es6', ['mocha']);
});

gulp.task('default', ['mocha', 'babel', 'webpack', 'watch']);
