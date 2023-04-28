const { series, parallel, watch, src, dest } = require("gulp");
const pump = require("pump");

const fileinclude = require("gulp-file-include");

// gulp plugins and utils
const livereload = require("gulp-livereload");
const postcss = require("gulp-postcss");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const beeper = require("beeper");
const zip = require("gulp-zip");

// postcss plugins
const easyimport = require("postcss-easy-import");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

const tailwindcss = require("tailwindcss");

function serve(done) {
  livereload.listen();
  done();
}

function handleError(done) {
  return function (err) {
    if (err) {
      beeper();
    }
    return done(err);
  };
}

function hbs(done) {
  pump(
    [src(["*.hbs", "partials/**/*.hbs", "members/**/*.hbs"]), livereload()],
    handleError(done)
  );
}

function html(done) {
  pump([src(["*.html", "dev/*.html"]), livereload()], handleError(done));
}

function filesinclude(done) {
  pump(
    [
      src([
        "dev/default.html",
        "dev/post.html",
        "dev/cta.html",
        "dev/tag.html",
        "dev/tags.html",
        "dev/author.html",
        "dev/authors.html",
        "dev/page.html",
        "dev/404.html",
      ]),
      fileinclude({
        prefix: "@@",
        basepath: "@file",
      }),
      dest("./"),
      livereload(),
    ],
    handleError(done)
  );
}

function css(done) {
  pump(
    [
      src(["assets/css/lib/*.css", "assets/css/*.css"], { sourcemaps: true }),
      postcss([
        tailwindcss("tailwind.config.js"),
        easyimport,
        autoprefixer(),
        cssnano(),
      ]),
      concat("screen.css"),
      dest("assets/built/", { sourcemaps: "." }),
      livereload(),
    ],
    handleError(done)
  );
}

function js(done) {
  pump(
    [
      src(["assets/js/lib/*.js", "assets/js/*.js"], { sourcemaps: true }),
      concat("build.min.js"),
      uglify(),
      dest("assets/built/", { sourcemaps: "." }),
      livereload(),
    ],
    handleError(done)
  );
}

function zipper(done) {
  const filename = require("./package.json").name + ".zip";

  pump(
    [
      src([
        "**",
        "!node_modules",
        "!node_modules/**",
        "!dist",
        "!dist/**",
        "!yarn-error.log",
        "!yarn.lock",
        "!gulpfile.js",
      ]),
      zip(filename),
      dest("dist/"),
    ],
    handleError(done)
  );
}

const hbsWatcher = () =>
  watch(["*.hbs", "partials/**/*.hbs", "members/**/*.hbs"], css);
const htmlWatcher = () => watch("*.html", html);
const cssWatcher = () =>
  watch(["assets/css/**/*.css", "*.html", "dev/*.html"], css);
const jsWatcher = () => watch("assets/js/**/*.js", js);
const filesIncludeWatcher = () => watch("dev/*.html", filesinclude);
const watcher = parallel(
  filesIncludeWatcher,
  htmlWatcher,
  hbsWatcher,
  cssWatcher,
  jsWatcher
);
const build = series(css, js);

exports.build = build;
exports.zip = series(build, zipper);
exports.default = series(build, serve, watcher);
