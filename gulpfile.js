const gulp = require('gulp');
const gulpConnect = require('gulp-connect');
const gulpUglify = require('gulp-uglify');
const gulpHtmlMin = require('gulp-htmlmin');
const gulpPug = require('gulp-pug');
const gulpImageMin = require('gulp-imagemin');
const gulpData = require('gulp-data');
const gulpStylus = require('gulp-stylus');
const gulpif = require('gulp-if');
const gulpCleanCSS = require('gulp-clean-css');
const del = require('delete');

const outputDir = 'static';

const isProduction = process.env.NODE_ENV === 'production';

const srcHTML = 'src/**/*.html';
const srcStylus = ['src/**/*.css', 'src/**/*.styl'];
const srcPug = 'src/**/*.pug';
const srcJS = 'src/**/*.js';
const srcImages = ['src/**/*.svg', 'src/**/*.jpg', 'src/**/*.gif', 'src/**/*.png'];

function server() {
    return gulpConnect.server({
        host: '0.0.0.0',
        port: 8080,
        root: 'static/',
        livereload: true
    });
}

function clean(cb) {
    del([outputDir], cb);
}

function html() {
    return gulp.src(srcHTML)
        .pipe(gulpHtmlMin({collapseWhitespace: true}))
        .pipe(gulp.dest(outputDir))
        .pipe(gulpif(!isProduction, gulpConnect.reload()));
}

function stylus() {
    return gulp.src(srcStylus)
        .pipe(gulpStylus({
            'include css': true
        }))
        .pipe(gulpCleanCSS())
        .pipe(gulp.dest(outputDir))
        .pipe(gulpif(!isProduction, gulpConnect.reload()));
}


function pug() {
    return gulp.src(srcPug)
        .pipe(gulpData(() => {
            return {
                __dirname: __dirname,
                require: require
            };
        }))
        .pipe(gulpPug())
        .pipe(gulp.dest(outputDir))
        .pipe(gulpif(!isProduction, gulpConnect.reload()));
}

function images() {
    return gulp.src(srcImages)
        .pipe(gulpif(isProduction, gulpImageMin()))
        .pipe(gulp.dest(outputDir))
        .pipe(gulpif(!isProduction, gulpConnect.reload()));
}

function js() {
    return gulp.src(srcJS)
        .pipe(gulpif(isProduction, gulpUglify()))
        .pipe(gulp.dest(outputDir))
        .pipe(gulpif(!isProduction, gulpConnect.reload()));
}

function watch() {
    gulp.watch(srcJS, gulp.series(js));
    gulp.watch(srcStylus, gulp.series(stylus));
    gulp.watch(srcImages, gulp.series(images));
    gulp.watch(srcHTML, gulp.series(html));
    gulp.watch(srcPug, gulp.series(pug));
}

exports.default = gulp.parallel(
    watch,
    gulp.series(clean, js, html, pug, stylus, images, server)
);
exports.server = server;
exports.clean = clean;
exports.build = gulp.series(clean, js, html, pug, images, stylus);
exports.dev = gulp.parallel(
    watch,
    gulp.series(clean, js, html, pug, stylus, images, server)
);
