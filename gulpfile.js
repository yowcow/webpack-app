var gulp    = require('gulp');
var webpack = require('gulp-webpack');

gulp.task('webpack', function () {
    gulp.src('./src/*.js')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('watch', function () {
    gulp.watch('src/*.js', ['webpack']);
});

gulp.task('default', ['watch']);
