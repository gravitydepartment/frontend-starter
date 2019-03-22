/**
* Gravity Department - Frontend Starter
* https://github.com/gravitydepartment/frontend-starter
*
* @author    Brendan Falkowski
* @copyright Gravity Department. All rights reserved.
*/


// ==============================================
// Require Packages
// ==============================================

var autoprefixer = require('gulp-autoprefixer');
var concat       = require('gulp-concat');
var del          = require('del');
var eslint       = require('gulp-eslint');
var gulp         = require('gulp');
var gulpif       = require('gulp-if');
var imagemin     = require('gulp-imagemin');
var minimist     = require('minimist');
var notify       = require('gulp-notify');
var pipeline     = require('stream').pipeline;
var sass         = require('gulp-sass');
var stylelint    = require('gulp-stylelint');
var uglify       = require('gulp-uglify');

// GravDept modules
var config         = require('./gulp/config');
var errorFormatter = require('./gulp/error-formatter');


// ==============================================
// Arguments
// ==============================================

var arguments = minimist(process.argv.slice(2));

// Use "gulp --hide-notify" to suppress Mac/Windows notifications.
var hideNotify = (arguments['hide-notify']) ? true : false;


// ==============================================
// Clean
// ==============================================

/**
 * Delete old generated files.
 * Return a "promise" to ensure completion before proceeding to generation tasks.
 * See: https://github.com/sindresorhus/del/releases/tag/v2.0.0
 * @return {promise}
 */
function clean () {
    return del(config.task.clean.pathsToDelete);
};


// ==============================================
// CSS
// ==============================================

function css () {
    var task = config.task.css;

    return pipeline([
        gulp.src(task.src, { sourcemaps: true }),
        sass(task.sassOptions),
        autoprefixer(task.autoprefixerOptions),
        gulpif(!hideNotify, notify(task.notifyOptions)),
        gulp.dest(task.dest, { sourcemaps: task.mapDest })
    ], errorFormatter);
};


// ==============================================
// Image
// ==============================================

function image () {
    var task = config.task.image;

    return pipeline([
        gulp.src(task.src, { since: gulp.lastRun(image) }),
        imagemin([
            imagemin.gifsicle(task.imageminOptions.gif),
            imagemin.jpegtran(task.imageminOptions.jpg),
            imagemin.optipng(task.imageminOptions.png),
            imagemin.svgo(task.imageminOptions.svg)
        ]),
        gulpif(!hideNotify, notify(task.notifyOptions)),
        gulp.dest(task.dest)
    ], errorFormatter);
};


// ==============================================
// JS
// ==============================================

/**
 * @param {object} task - Task config object like `config.task.taskName`
 * @return {function} - See: https://github.com/gulpjs/gulp/issues/2039
 */
function bundleJs (task) {
    return pipeline([
        gulp.src(task.src, { sourcemaps: true }),
        uglify(task.uglifyOptions),
        concat(task.file),
        gulpif(!hideNotify, notify(task.notifyOptions)),
        gulp.dest(task.dest, { sourcemaps: task.mapDest })
    ], errorFormatter);
}

var jsAppPost      = () => bundleJs(config.task.jsAppPost);
var jsAppPostDefer = () => bundleJs(config.task.jsAppPostDefer);
var jsAppPre       = () => bundleJs(config.task.jsAppPre);
var jsThing        = () => bundleJs(config.task.jsThing);


// ==============================================
// Lint CSS
// ==============================================

function lintCss () {
    var task = config.task.lintCss;

    return pipeline([
        gulp.src(task.src),
        stylelint(task.stylelintOptions),
        gulpif(!hideNotify, notify(task.notifyOptions))
    ], errorFormatter);
};


// ==============================================
// Lint JS
// ==============================================

function lintJs () {
    var task = config.task.lintJs;

    return pipeline([
        gulp.src(task.src),
        eslint(),
        eslint.format(),
        eslint.failOnError(),
        gulpif(!hideNotify, notify(task.notifyOptions))
    ], errorFormatter);
};


// ==============================================
// Watch
// ==============================================

function watch () {
    var task = config.task.watch;

    // CSS
    gulp.watch(config.task.css.src, task.options, gulp.parallel(lintCss, css));

    // Image
    gulp.watch(config.task.image.src, task.options, gulp.parallel(image));

    // JS
    gulp.watch(config.task.jsAppPre.src,       task.options, gulp.parallel(lintJs, jsAppPre));
    gulp.watch(config.task.jsAppPost.src,      task.options, gulp.parallel(lintJs, jsAppPost));
    gulp.watch(config.task.jsAppPostDefer.src, task.options, gulp.parallel(lintJs, jsAppPostDefer));
    gulp.watch(config.task.jsThing.src,        task.options, gulp.parallel(lintJs, jsThing));
}


// ==============================================
// Export Tasks
// ==============================================

const js = gulp.parallel(
    jsAppPost,
    jsAppPostDefer,
    jsAppPre,
    jsThing
);

const lint  = gulp.parallel(lintCss, lintJs);
const build = gulp.parallel(css, image, js, lint);

exports.build   = build;
exports.clean   = clean;
exports.css     = css;
exports.default = gulp.series(clean, build);
exports.image   = image;
exports.js      = js;
exports.lint    = lint;
exports.lintCss = lintCss;
exports.lintJs  = lintJs;
exports.watch   = gulp.series(clean, watch);
