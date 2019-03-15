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
var pipeline     = require('stream').pipeline;
var sass         = require('gulp-sass');
var stylelint    = require('gulp-stylelint');
var uglify       = require('gulp-uglify');

// GravDept modules
var config       = require('./gulp/config.js');
var errorFormatter = require('./gulp/error-formatter');

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

function css () {
    var task = config.task.css;

    return pipeline([
        gulp.src(task.src, { sourcemaps: true }),
        sass(task.sassOptions),
        autoprefixer(task.autoprefixerOptions),
        gulp.dest(task.dest, { sourcemaps: task.mapDest }),
        gulpif(!isSilent, notify(task.notifyOptions))
    ], errorFormatter);
};


// ==============================================
// Image
// ==============================================

function image () {
    var task = config.task.image;

    return pipeline([
        gulp.src(task.src),
        changed(task.dest),
        imagemin([
            imagemin.gifsicle(task.imageminOptions.gif),
            imagemin.jpegtran(task.imageminOptions.jpg),
            imagemin.optipng(task.imageminOptions.png),
            imagemin.svgo(task.imageminOptions.svg)
        ]),
        gulpif(!isSilent, notify(task.notifyOptions)),
        gulp.dest(task.dest)
    ], errorFormatter);
};


// ==============================================
// JS Modules
// ==============================================

/**
 * @param {object} task - Task config object like `config.task.taskName`
 * @return {function} - See: https://github.com/gulpjs/gulp/issues/2039
 */
function createJsModule (task) {
    return pipeline([
        gulp.src(task.src, { sourcemaps: true }),
        uglify(task.uglifyOptions),
        concat(task.file),
        gulpif(!isSilent, notify(task.notifyOptions)),
        gulp.dest(task.dest, { sourcemaps: true })
    ], errorFormatter);
}

function jsAppPost () {
    return createJsModule(config.task.jsAppPost);
}

function jsAppPostDefer () {
    return createJsModule(config.task.jsAppPostDefer);
}

function jsAppPre () {
    return createJsModule(config.task.jsAppPre);
}

function jsThing () {
    return createJsModule(config.task.jsThing);
}


// ==============================================
// Lint CSS
// ==============================================

function lintCss () {
    var task = config.task.lintCss;

    return pipeline([
        gulp.src(task.src),
        stylelint({
            reporters: [{
                formatter: 'string',
                console: true
            }]
        }),
        gulpif(!isSilent, notify(task.notifyOptions))
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
        gulpif(!isSilent, notify(task.notifyOptions))
    ], errorFormatter);
};


// ==============================================
// Watch
// ==============================================

function watch () {
    var opts = {
        ignoreInitial: false
    };
    // CSS
    gulp.watch(config.task.css.src, opts, gulp.parallel(lintCss, css));

    // Image
    gulp.watch(config.task.image.src, opts, gulp.parallel(image));

    // JS
    gulp.watch(config.task.jsAppPre.src,       opts, gulp.parallel(lintJs, jsAppPre));
    gulp.watch(config.task.jsAppPost.src,      opts, gulp.parallel(lintJs, jsAppPost));
    gulp.watch(config.task.jsAppPostDefer.src, opts, gulp.parallel(lintJs, jsAppPostDefer));
    gulp.watch(config.task.jsThing.src,        opts, gulp.parallel(lintJs, jsThing));
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
exports.watch   = gulp.series(clean, watch);
