const gulp = require("gulp");
const concat = require("gulp-concat-css");
const plumber = require("gulp-plumber");
const del = require("del");
const browserSync = require("browser-sync").create();
const build = gulp.series(clean, gulp.parallel(html, css, fonts, images));
const watchapp = gulp.parallel(build, watchFiles, serve);

function html() {
  return gulp
    .src("src/**/*.html")
    .pipe(plumber())
    .pipe(gulp.dest("dist/"))
    .pipe(browserSync.reload({ stream: true }));
}

function css() {
  return gulp
    .src("src/styles/**/**/*.css")
    .pipe(plumber())
    .pipe(concat("bundle.css"))
    .pipe(gulp.dest("dist/"))
    .pipe(browserSync.reload({ stream: true }));
}

function images() {
  return gulp
    .src("src/images/**/*.{jpg,jpeg,png,svg,gif,ico,webp,avif}")
    .pipe(gulp.dest("dist/images"))
    .pipe(browserSync.reload({ stream: true }));
}

function fonts() {
  return gulp
    .src("src/fonts/**/*.{ttf,woff,woff2,txt}")
    .pipe(gulp.dest("dist/fonts"))
    .pipe(browserSync.reload({ stream: true }));
}

function clean() {
  return del("dist");
}

function watchFiles() {
  gulp.watch(["src/**/*.html"], gulp.series(html));
  gulp.watch(["src/**/**/*.css"], gulp.series(css));
  gulp.watch(
    ["src/images/**/*.{jpg,jpeg,png,svg,gif,ico,webp,avif}"],
    gulp.series(images)
  );
  gulp.watch(["src/fonts/**/*.{ttf,woff,woff2,txt}"], gulp.series(fonts));
}

function serve() {
  browserSync.init({
    server: {
      baseDir: "./dist",
    },
  });
}

exports.html = html;
exports.css = css;
exports.images = images;
exports.fonts = fonts;
exports.clean = clean;
exports.build = build;
exports.watchapp = watchapp;
