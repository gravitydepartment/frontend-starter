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
var changed      = require('gulp-changed');
var concat       = require('gulp-concat');
var del          = require('del');
var eslint       = require('gulp-eslint');
var gulp         = require('gulp');
var gulpif       = require('gulp-if');
var imagemin     = require('gulp-imagemin');
var minimist     = require('minimist');
var notify       = require('gulp-notify');
var pump         = require('pump');
var sass         = require('gulp-sass');
var stylelint    = require('gulp-stylelint');
var uglify       = require('gulp-uglify');

// GravDept modules
var config       = require('./gulp/config.js');
var errorHandler = require('./gulp/error-handler.js');


// ==============================================
// Notifications
// ==============================================

// Run "gulp" without arguments for helpful dev notifications.
// Run "gulp --silent" to suppress notifications on the server.

var arguments = minimist(process.argv.slice(2));
var isSilent  = (arguments.silent) ? true : false;


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
    var task = config.task.clean;
    return del(task.pathsToDelete);
};


// ==============================================
// CSS
// ==============================================

function css (cb) {
    var task = config.task.css;

    pump([
        gulp.src(task.src, { sourcemaps: true }),
        sass(task.sassOptions),
        autoprefixer(task.autoprefixerOptions),
        gulp.dest(task.dest, { sourcemaps: task.mapDest }),
        gulpif(!isSilent, notify(task.notifyOptions))
    ], errorHandler);

    cb();
};


// ==============================================
// Image
// ==============================================

// Don't use "pump" for error handling.
// See: https://github.com/sindresorhus/gulp-imagemin/issues/285
function image () {
    var task = config.task.image;

    return gulp
    .src(task.src)
    .pipe(changed(task.dest))
    .pipe(imagemin([
        imagemin.gifsicle(task.imageminOptions.gif),
        imagemin.jpegtran(task.imageminOptions.jpg),
        imagemin.optipng(task.imageminOptions.png),
        imagemin.svgo(task.imageminOptions.svg)
    ]))
    .pipe(gulp.dest(task.dest))
    .pipe(gulpif(!isSilent, notify(task.notifyOptions)));
};


// ==============================================
// JS Modules
// ==============================================

/**
 * @param {object} task - Task config object like `config.task.taskName`
 * @return {function} - See: https://github.com/gulpjs/gulp/issues/2039
 */
function createJsModule (task) {
    return pump([
        gulp.src(task.src, { sourcemaps: true }),
        uglify(task.uglifyOptions),
        concat(task.file),
        gulp.dest(task.dest, { sourcemaps: true }),
        gulpif(!isSilent, notify(task.notifyOptions))
    ], errorHandler);
}

function jsAppPost (cb) {
    createJsModule(config.task.jsAppPost);
    cb();
}

function jsAppPostDefer (cb) {
    createJsModule(config.task.jsAppPostDefer);
    cb();
}

function jsAppPre (cb) {
    createJsModule(config.task.jsAppPre);
    cb();
}

// function jsThing (cb) {
//     createJsModule(config.task.jsThing);
//     cb();
// }

function jsThing (cb) {
    var task = config.task.jsThing;

    pump([
        gulp.src(task.src, { sourcemaps: true }),
        uglify(task.uglifyOptions),
        concat(task.file),
        gulp.dest(task.dest, { sourcemaps: true }),
        gulpif(!isSilent, notify(task.notifyOptions))
    ], errorHandler);

    cb();
}


// ==============================================
// Lint CSS
// ==============================================

function lintCss () {
    var task = config.task.lintCss;

    return gulp
    .src(task.src)
    .pipe(stylelint({
        reporters: [{
            formatter: 'string',
            console: true
        }]
    }))
    .on('error', errorHandler)
    .pipe(gulpif(!isSilent, notify(task.notifyOptions)));
};


// ==============================================
// Lint JS
// ==============================================

function lintJs () {
    var task = config.task.lintJs;

    return gulp
    .src(task.src)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError())
    .on('error', errorHandler)
    .pipe(gulpif(!isSilent, notify(task.notifyOptions)));
};


// ==============================================
// Watch
// ==============================================

function watch () {
    // CSS
    gulp.watch(config.task.css.src, gulp.parallel(lintCss, css));

    // Image
    gulp.watch(config.task.image.src, gulp.parallel(image));

    // JS
    gulp.watch(config.task.jsAppPre.src,       gulp.parallel(lintJs, jsAppPre));
    gulp.watch(config.task.jsAppPost.src,      gulp.parallel(lintJs, jsAppPost));
    gulp.watch(config.task.jsAppPostDefer.src, gulp.parallel(lintJs, jsAppPostDefer));
    gulp.watch(config.task.jsThing.src,        gulp.parallel(lintJs, jsThing));
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

const lint        = gulp.parallel(lintCss, lintJs);
const build       = gulp.parallel(css, image, js, lint);
const defaultPlan = gulp.series(clean, build);

exports.build   = build;
exports.clean   = clean;
exports.css     = css;
exports.default = defaultPlan;
exports.image   = image;
exports.js      = js;
exports.lint    = lint;
exports.lintCss = lintCss;
exports.lintJs  = lintJs;
exports.watch   = gulp.parallel(defaultPlan, watch);
