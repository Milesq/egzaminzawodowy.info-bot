const gulp = require('gulp');
const cleanhtml = require('gulp-cleanhtml');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const del = require('del');
const smJs = require('gulp-sourcemaps');
const smCss = require('gulp-sourcemaps');

// #region internal tasks
function copyManifest() {
    return gulp.src('src/manifest.json')
        .pipe(gulp.dest('dest/'));
}

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

// #endregion internal tasks

gulp.task('clean', done => {
    del('dest/');
    done();
});

gulp.task('build', gulp.parallel(['html', 'styles', 'js', copyManifest]));

// eslint-disable-next-line
gulp.task('default', gulp.series(['build'], function watch(_) {
    gulp.watch('src/*.html', gulp.series(['html']));
    gulp.watch('src/js/**/*.js', gulp.series(['js']));
    gulp.watch('src/css/**/*.scss', gulp.series(['styles']));
    gulp.watch('src/manifest.json', copyManifest);
    _();

    console.log('Gulp is watching files');
}));