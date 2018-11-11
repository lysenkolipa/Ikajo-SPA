const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const spritesmith = require('gulp.spritesmith');
const rimraf = require('rimraf');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');

/*------------  Server  -------------*/
gulp.task('server', function() {
    browserSync.init({
        server: {
            port: 9000,
            baseDir: "build"
        }
    });


    gulp.watch('build/**/*').on('change', browserSync.reload);
});

/*------------ html compile -------------*/
gulp.task('html:compile', function buildHTML() {
    return gulp.src('source/index.html')
        .pipe(gulp.dest('build'))
});

/*------------ Styles compile -------------*/
gulp.task('styles:compile', function () {
    return gulp.src('source/styles/main.scss')
        .pipe(sass({outputStyle:'compressed'}).on('error', sass.logError))
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('build/css'));
});

/*------------ JS -------------*/
gulp.task('js:build', function() {
    return gulp.src([
        'source/js/validation.js',
        'source/js/headroom.js',
        'source/js/google-map.js',
        'source/js/header-animation.js'])
        .pipe(gulp.dest('build/js'));
});

/*------------ Delete -------------*/
gulp.task('clean', function del(cb){
    return rimraf('build', cb);
});


/*------------ Copy fonts -------------*/
gulp.task('copy:fonts', function(){
    return gulp.src('./source/fonts/**/*.*')
        .pipe(gulp.dest('build/fonts'));
});

/*------------ Copy images -------------*/
gulp.task('copy:images', function(){
    return gulp.src('./source/images/**/*.*')
        .pipe(gulp.dest('build/images'));
});

/*------------ Copy -------------*/
gulp.task('copy', gulp.parallel('copy:fonts', 'copy:images'));


/*------------ Watchers -------------*/
gulp.task('watch', function() {
    gulp.watch('source/**/*.html', gulp.series('html:compile'));
    gulp.watch('source/styles/**/*.scss', gulp.series('styles:compile'));
    gulp.watch('source/js/**/*.js', gulp.series('js:build'));
});

/*------------ Gulp default -------------*/
gulp.task('default', gulp.series(
    'clean',
    gulp.parallel('html:compile', 'styles:compile', 'js:build', 'copy'),
    gulp.parallel('watch', 'server')
    )
);


