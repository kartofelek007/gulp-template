const gulp            = require("gulp");
const browserSync     = require("browser-sync").create();
const sass            = require("gulp-sass"); //sass
const watch           = require("gulp-watch"); //watch
const autoprefixer    = require("gulp-autoprefixer"); //auto prefixy
const sourcemaps      = require("gulp-sourcemaps"); //sourcemapy
const plumber         = require("gulp-plumber"); //zapobiera przerywaniu taskow
const concat          = require("gulp-concat"); //laczenie plikow js
const uglify          = require("gulp-uglify"); //minimalizacja js
const rename          = require("gulp-rename"); //zmiana nazwy wynikowych plikow
const webpack         = require("webpack");
const gutil           = require("gulp-util");
const notify          = require('gulp-notify');

const handleError = function(err) {
    notify.onError({
        title: "Gulp error in " + err.plugin,
        message:  err.message
    })(err);

    //console.dir(err); //wypisuje informacje o bledzie
    console.log(gutil.colors.red(err.toString()));
    this.emit("end");
}


gulp.task("browseSync", function() {
    browserSync.init({
        server: "./dist",
        notify: true,
        host: "192.168.0.24", //IPv4 Address Wirless LAN adapter WiFi from ipconfig
        //port: 3000,
        open: true, //czy otwierac strone
    });
});


gulp.task("sass", function() {
    return gulp.src("src/scss/style.scss")
        .pipe(plumber({ //przeciwdziala bledom w pipe ktore np przerywaja watch
            errorHandler: handleError
        }))
        .pipe(sourcemaps.init()) //inicjalizacja sourcemap przed zabawa na plikach
        .pipe(sass({
            outputStyle: "compressed" //nested, expanded, compact, compressed
        }))
        .pipe(autoprefixer({
            browsers: ["> 1%"]
        })) //autoprefixy https://github.com/postcss/autoprefixer#browsers
        .pipe(rename({ //zamieniam wynikowy plik na style.min.css
            suffix: ".min",
            basename: "style"
        }))
        .pipe(sourcemaps.write(".")) //po modyfikacjach na plikach zapisujemy w pamieci sourcemap
        .pipe(gulp.dest("dist/css")) //i calosc zapisujemy w dest
        .pipe(browserSync.stream({match: "**/*.css"}));
});


gulp.task("es6", function(cb) { //https://github.com/webpack/docs/wiki/usage-with-gulp#normal-compilation
    return webpack(require("./webpack.config.js"), function(err, stats) {
        if (err) throw err;
        console.log(stats.toString());
        cb();
        browserSync.reload();
    })
})


gulp.task("watch", function() {
    gulp.watch("src/scss/**/*.scss", ["sass"]);
    gulp.watch("src/js/**/*.js", ["es6"]);
    gulp.watch("dist/**/*.html").on("change", browserSync.reload);
});


gulp.task("default", function() {
    console.log(gutil.colors.yellow("======================= start ======================="));
    gulp.start(["sass", "es6", "browseSync", "watch"]);
});