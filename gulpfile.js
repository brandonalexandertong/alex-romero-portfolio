var gulp = require('gulp')
// postcss for additional features
var postCss = require('gulp-postcss')

var cleanCss = require('gulp-clean-css')
var sourceMaps = require('gulp-sourcemaps')
// starts browser sync and creates server to run
var browserSync = require('browser-sync').create()
// minimizing images
var imageMin = require("gulp-imagemin")
// gh-pages packages your dist file and deploys to github
var ghPages = require('gh-pages');
// creating a concatenating variable
var concat = require("gulp-concat")




gulp.task("postCss", function() {
  // take style.css, base.css, typography.css
  return gulp.src([
    "src/css/base.css",
    "src/css/typography.css",
    "src/css/style.css",
    "src/css/about.css",
    "src/css/index.css",
    "src/css/news.css",
    "src/css/series.css",
    "src/css/responsive.css"
  ])
  // start watching css code to create sourcemap
    .pipe(sourceMaps.init())
  // run through postcss
    .pipe(
      postCss([
        require("autoprefixer"),
        // allowing stage 1 features and above
        require("postcss-preset-env")({
          stage: 1,
          // allowing internet explorer and the last 2 versions of all browsers
          browsers: ["IE 11", "last 2 versions"]
        })
      ])
    )
    // concatenating all css files
    .pipe(concat("style.css"))
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

// watch app.css and run sass when a change is made
gulp.task("watch", function() {
  // start browserSync to allow browser to sync
  browserSync.init({
      server: {
          baseDir: "dist"
      }
  })

  // run watch script which watches for changes and runs scripts when changed
  gulp.watch("src/*.html", ["html"]).on("change", browserSync.reload)
  gulp.watch("src/css/*", ["postCss"])
  gulp.watch("src/fonts/*", ["fonts"])
  gulp.watch("src/images/*", ["images"])
})

gulp.task("deploy", function() {
  ghPages.publish('dist')
})



// run all tasks
gulp.task('default', [
  "postCss", "watch", "html", "fonts", "images"
])
