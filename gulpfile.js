const gulp            = require('gulp');
const browserSync     = require('browser-sync').create();
const sass            = require('gulp-sass'); //sass
const watch           = require('gulp-watch'); //watch
const autoprefixer    = require('gulp-autoprefixer'); //auto prefixy
const sourcemaps      = require('gulp-sourcemaps'); //sourcemapy
const plumber         = require('gulp-plumber'); //zapobiera przerywaniu taskow
const concat          = require('gulp-concat'); //laczenie plikow js
const uglify          = require('gulp-uglify'); //minimalizacja js
const rename          = require('gulp-rename'); //zmiana nazwy wynikowych plikow
const webpack         = require('webpack');



const handleError = function(err) {
    console.log(err.toString());
    this.emit('end');
}


gulp.task('browseSync', function() {
    browserSync.init({
        server: "./dist",
        notify: false,
        open: false //czy otwierac strone
    });    
});


gulp.task('sass', function() {
    return gulp.src('src/scss/style.scss')
        .pipe(plumber({ //przeciwdziala bledom w pipe ktore np przerywaja watch
            errorHandler: handleError
        }))
        .pipe(sourcemaps.init()) //inicjalizacja sourcemap przed zabawa na plikach
        .pipe(sass({
            outputStyle: 'expanded' //nested, expanded, compact, compressed
        }))
        .pipe(autoprefixer({browsers: ["> 1%"]})) //autoprefixy https://github.com/postcss/autoprefixer#browsers
        .pipe(rename({ //zamieniam wynikowy plik na style.min.css
            suffix: '.min',
            basename: 'style'
        }))
        .pipe(sourcemaps.write('.')) //po modyfikacjach na plikach zapisujemy w pamieci sourcemap
        .pipe(gulp.dest("dist/css")) //i calosc zapisujemy w dest
        .pipe(browserSync.stream({match: '**/*.css'}));        
});


gulp.task('es6', function(cb) {
    return webpack(require('./webpack.config.js'), function(err, stats) {
        if (err) throw err;
        console.log(stats.toString());
        cb();
    })
})


gulp.task('watch', function() {   
    gulp.watch('src/scss/**/*.scss', ['sass']);    
    gulp.watch('src/js/**/*.js', ['es6']);        
    gulp.watch("dist/**/*.html").on('change', browserSync.reload);
});


gulp.task('default', ['sass', 'es6', 'browseSync', 'watch']);