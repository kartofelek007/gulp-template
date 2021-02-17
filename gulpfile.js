const gulp          = require("gulp");
const sass          = require("gulp-sass");
const sourcemaps    = require("gulp-sourcemaps");
const autoprefixer  = require("gulp-autoprefixer");
const rename        = require("gulp-rename");
const browserSync   = require("browser-sync").create();
const fileinclude   = require('gulp-file-include');
const gulpEsbuild           = require('gulp-esbuild')

sass.compiler = require('sass');


const server = (cb) => {
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        notify: false,
        //host: "192.168.0.24",
        //port: 3000,
        open: true,
        //browser: "google chrome"
    });

    cb();
};

const css = function() {
    return gulp.src("src/scss/style.scss")
        .pipe(sourcemaps.init())
        .pipe(
            sass({
                outputStyle : "expanded"
            }).on("error", sass.logError)
        )
        .pipe(autoprefixer())
        .pipe(rename({
            suffix: ".min",
            basename: "style"
        }))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
};

const js = function(cb) {
    return gulp.src('./src/js/app.js')
        .pipe(gulpEsbuild({
            outfile: 'bundle.min.js',
            bundle: true
        }))
        .pipe(gulp.dest('./dist/js'))
        .pipe(browserSync.stream());
};

const html = function(cb) {
    return gulp.src('src/html/index.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('dist'))
};

const htmlReload = function(cb) {
    browserSync.reload();
    cb();
};

const watch = function() {
    gulp.watch("src/scss/**/*.scss", {usePolling : true}, gulp.series(css));
    gulp.watch("src/js/**/*.js", {usePolling : true}, gulp.series(js));
    gulp.watch("src/html/**/*.html", {usePolling : true}, gulp.series(html, htmlReload));
};

const startText = function(cb) {
    console.log(`
        ───▄▀▀▀▄▄▄▄▄▄▄▀▀▀▄───
        ───█▒▒░░░░░░░░░▒▒█───
        ────█░░█░░░░░█░░█────
        ─▄▄──█░░░▀█▀░░░█──▄▄─
        █░░█─▀▄░░░░░░░▄▀─█░░█
    `);
    console.log('Start :)');
    cb();
};

exports.default = gulp.series(startText, css, html, js, server, watch);
exports.css = css;
exports.html = html;
exports.watch = watch;
exports.js = js;