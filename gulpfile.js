// const { watch } = require('browser-sync');
const gulp = require('gulp'),
      browserSync = require('browser-sync');

// функция обновления страницы  при изменнениях в файлах билда
function browsersync() {
    browserSync.init ({
        server: {
            basedir: 'bulid'
        }
    })
}

// функция копирования изображеня
function images() {
    return gulp.src ('src/assets/imgs/**/*')
      .pipe(gulp.dest('build/assets/imgs'))
      .pipe(browserSync.stream())
}

// функция преобразования pug в html
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

// require - функция node.js для загрузки модулей
const sass = require('gulp-sass')(require('sass')),
      autoprefixer = require('gulp-autoprefixer'),
      pug = require ('gulp-pug'),
      plumber = require ('gulp-plumber'),
      cleanCSS = require('gulp-clean-css');

// фунция преобразовани SCSS  в css
function scss(){
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


// функция отслеживания изменений в файлах исходников
function watcher() {
    gulp.watch('src/pug/**/*.pug', html)
    gulp.watch('src/assets/scss/**/*', scss)
    gulp.watch('src/assets/imgs/**/*', images)
}

// команда запуска по умолчанию(gulp)
gulp.task(
    'default',
    gulp.parallel(browsersync, watcher, images, scss, html)
)