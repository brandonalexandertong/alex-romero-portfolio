var gulp = require('gulp')
var sass = require('gulp-sass')
var cleanCss = require('gulp-clean-css')
var sourceMaps = require('gulp-sourcemaps')
// starts browser sync and creates server to run
var browserSync = require('browser-sync').create()
// minimizing images
var imageMin = require("gulp-imagemin")


sass.compiler = require('node-sass')

gulp.task("sass", function() {
  // take style.scss
  return gulp.src("src/css/style.scss")
  // start watching scss code to create sourcemap
    .pipe(sourceMaps.init())
  // run through sass
    .pipe(sass())
    // clean the css
    .pipe(
      cleanCss({
        // adding compatibility for older versions of internet explorer
        compatibility: 'ie8'
      })
    )
    // write out the sourcemap
    .pipe(sourceMaps.write())
    // move to style.css which needs to be included in dest
    .pipe(gulp.dest("dist"))
    // tell browserSync to stream the updates that have been made
    .pipe(browserSync.stream());
})

// taking html folder from src to dist
gulp.task("html", function() {
  return gulp.src("src/*.html")
    .pipe(gulp.dest("dist"))
})

// taking all fonts from src to dist
gulp.task("fonts", function() {
  return gulp.src("src/fonts/*")
    .pipe(gulp.dest("dist/fonts"))
})

// taking all images from src to dist
gulp.task("images", function() {
  return gulp.src("src/images/*")
    .pipe(imageMin())
    .pipe(gulp.dest("dist/images"))
})

// watch app.scss and run sass when a change is made
gulp.task("watch", function() {
  // start browserSync to allow browser to sync
  browserSync.init({
      server: {
          baseDir: "dist"
      }
  })

  // run watch script which watches for changes and runs scripts when changed
  gulp.watch("src/*.html", ["html"]).on("change", browserSync.reload)
  gulp.watch("src/css/style.scss", ["sass"])
  gulp.watch("src/fonts/*", ["fonts"])
  gulp.watch("src/images/*", ["images"])
})

// run all tasks
gulp.task('default', [
  "sass", "watch", "html", "fonts", "images"
])
