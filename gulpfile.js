var gulp            = require('gulp');
var browserSync     = require('browser-sync').create();
var sass            = require('gulp-sass'); //sass
var watch           = require('gulp-watch'); //watch
var autoprefixer    = require('gulp-autoprefixer'); //auto prefixy
var sourcemaps      = require('gulp-sourcemaps'); //sourcemapy
var plumber         = require('gulp-plumber'); //zapobiera przerywaniu taskow
var concat          = require('gulp-concat'); //laczenie plikow js
var uglify          = require('gulp-uglify'); //minimalizacja js
var rename          = require('gulp-rename'); //zmiana nazwy wynikowych plikow


var handleError = function(err) {
    console.log(err.toString());
    this.emit('end');
}


gulp.task('browseSync', function() {
    browserSync.init({
        server: "./",
        notify: false
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
        .pipe(gulp.dest("css")) //i calosc zapisujemy w dest
        .pipe(browserSync.stream({match: '**/*.css'}));        
});


gulp.task('js', function() {
    return gulp.src('src/js/**/*.js')
        .pipe(plumber({
            errorHandler: handleError
        }))
        .pipe(sourcemaps.init())
        .pipe(concat('scripts.js')) //laczenie plikow
        .pipe(uglify()) //minimalizacja
        .pipe(rename({ //zamieniam wynikowy plik na scripts.min.js
            suffix: '.min',
            basename: 'scripts'
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('js'))
        .pipe(browserSync.stream({match: '**/*.js'}));            
});


gulp.task('watch', function() {   
    gulp.watch('src/scss/**/*.scss', ['sass']);    
    gulp.watch('src/js/**/*.js', ['js']);        
    gulp.watch("*.html").on('change', browserSync.reload);
});


gulp.task('default', ['sass', 'js', 'browseSync', 'watch']);