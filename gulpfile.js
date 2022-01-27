const gulp = require('gulp'),
    browserSync = require('browser-sync'),
    autoPrefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass')(require('sass')),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    pug = require('gulp-pug'),
    plumber = require('gulp-plumber'),
    concat = require('gulp-concat');


function browsersync() {
        browserSync.init({
            server: {
                baseDir: 'build'
            }
        })
}

function html() {
    return gulp.src('src/pug/*.pug')
        .pipe(plumber())
        .pipe(pug({
            pretty: true
        }))
        .pipe(plumber.stop())
        .pipe(gulp.dest('build'))
        .on('end', browserSync.reload)
}

// функция js
function js() {
    return gulp.src('src/assets/js/app.js')
        .pipe(gulp.dest('build/assets/js'))
        .pipe(browserSync.stream())
}

// функция js модулей
function vendorJS() {
    return gulp.src([
            'node_modules/swiper/swiper-bundle.min.js',
        ])
        .pipe(concat('vendors.min.js'))
        .pipe(gulp.dest('build/assets/js'))
        .pipe(browserSync.stream())
}

// функция css модулей
function vendorCSS() {
    return gulp.src([
        'node_modules/swiper/swiper-bundle.min.css',
        ])
        .pipe(concat('vendors.min.css'))
        .pipe(gulp.dest('build/assets/css'))
        .pipe(browserSync.stream())
}


function css() {
    return gulp.src('src/assets/scss/app.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            grid: 'autoplace',
        }))
        .pipe(cleanCSS())
        .pipe(gulp.dest('build/assets/css'))
        .pipe(browserSync.stream())
    }

function images() {
    return gulp.src('src/assets/imgs/**/*')
        .pipe(gulp.dest('build/assets/imgs'))
        .pipe(browserSync.stream())
}

function watcher() {
    gulp.watch('src/assets/imgs/**/*', images)
    gulp.watch('src/assets/scss/**/*', css)
    gulp.watch('src/pug/**/*', html)
    gulp.watch('src/assets/js/*.js', js)
}

gulp.task(
    'default',
    gulp.parallel(browsersync, watcher, css, html, images,js,vendorJS, vendorCSS)
);