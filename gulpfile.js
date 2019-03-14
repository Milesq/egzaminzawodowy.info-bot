const gulp = require('gulp');
const cleanhtml = require('gulp-cleanhtml');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const del = require('del');
const smJs = require('gulp-sourcemaps');
const smCss = require('gulp-sourcemaps');

gulp.task('html', () => gulp.src('src/*.html')
    .pipe(cleanhtml())
    .pipe(gulp.dest('dest/')));

gulp.task('styles', () => gulp.src('src/css/**/*.scss')
    .pipe(smCss.init())
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(smCss.write())
    .pipe(gulp.dest('dest/css/')));

gulp.task('js', () => gulp.src('src/js/**/*.*')
    .pipe(smJs.init())
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(smJs.write())
    .pipe(gulp.dest('dest/js/')));

gulp.task('default', gulp.series(['html', 'styles', 'js'], done => {
    gulp.src('src/manifest.json')
        .pipe(gulp.dest('dest/'));
    done();
}));

gulp.task('clean', done => {
    del('dest/');
    done();
});