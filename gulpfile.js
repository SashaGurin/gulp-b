const gulp = require("gulp"),
  browserSync = require("browser-sync"),
  autoPrefixer = require("gulp-autoprefixer"),
  sass = require("gulp-sass")(require("sass")),
  autoprefixer = require("gulp-autoprefixer"),
  cleanCSS = require("gulp-clean-css"),
  pug = require("gulp-pug"),
  plumber = require("gulp-plumber"),
//   concat = require('gulp-concat'),
//   uglify = require('gulp-uglify');


function browsersync() {
  browserSync.init({
    server: {
      baseDir: "build",
    },
  });
}

function html() {
  return gulp
    .src("src/pug/*.pug")
    .pipe(plumber())
    .pipe(
      pug({
        pretty: true,
      })
    )
    .pipe(plumber.stop())
    .pipe(gulp.dest("build"))
    .on("end", browserSync.reload);
}

function css() {
  return gulp
    .src("src/assets/scss/app.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 2 versions"],
        grid: "autoplace",
      })
    )
    .pipe(cleanCSS())
    .pipe(gulp.dest("build/assets/css"))
    .pipe(browserSync.stream());
}

function js() {
   return gulp
     .src("src/assets/js/*.js")
     .pipe(gulp.dest("build/assets/js"))
     .pipe(browserSync.stream());
 }

// function script() {
//   return gulp
//     .src(["node_modules/slick-carousel/slick/slick.js",
//     "node_modules/magnific-popup/dist/jquery.magnific-popup.js"])
//     .pipe(concat("libs.min.js"))
//     .pipe(uglify())
//     .pipe(gulp.dest("build/assets/js"))
// }

function images() {
  return gulp
    .src("src/assets/imgs/**/*")
    .pipe(gulp.dest("build/assets/imgs"))
    .pipe(browserSync.stream());
}

function watcher() {
  gulp.watch("src/assets/imgs/**/*", images);
  gulp.watch("src/assets/scss/**/*", css);
  gulp.watch("src/pug/**/*", html);
  gulp.watch("src/assets/js/**/*", js);
}

gulp.task(
  "default",
  gulp.parallel(browsersync, watcher, css, html, js, images)
);

// пример taska
// gulp.task('sass',function(){
//    gulp.src('src/assets/scss/app.scss')
//    .pipe(sass())
//    .pipe(gulp.dest("build/assets/css"))
// })

// для минифицирования sass
// .pipe(sass({outputStyle: 'compressed'}).on("error", sass.logError))
// пример:
// gulp.src('src/assets/scss/app.scss')
//   .pipe(sass({outputStyle: 'compressed'}).on("error", sass.logError))
//   .pipe(gulp.dest("build/assets/css"))
// })

// task rename переиминовывает конечные файлы
// .pipe(rename({ suffix: ".min" }))
// пример:
// gulp.src("./src/main/text/hello.txt")
//   .pipe(rename({ suffix: ".min" }))
//   .pipe(gulp.dest("build/assets/css"));
