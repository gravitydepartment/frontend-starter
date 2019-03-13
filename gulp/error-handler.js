/**
* Gravity Department - Frontend Starter
* https://github.com/gravitydepartment/frontend-starter
*
* @author     Brendan Falkowski
* @copyright  Gravity Department. All rights reserved.
*/


// ==============================================
// Gulp Error Handler
// ==============================================

// An error handler that uses "pump" to keep errors from ending streams.
// Each plugin may have unique error objects, so the response is normalized.
//
// See: https://github.com/mikaelbr/gulp-notify/issues/81
// See: https://github.com/terinjokes/gulp-uglify/blob/master/docs/why-use-pump/README.md

var gutil  = require('gulp-util');
var notify = require('gulp-notify');

module.exports = function (error) {
    if (typeof error !== 'undefined') {
        // [log] Uncomment to show the full error object
        //console.log(error);

        // ----------------------------------------------
        // Normalize error responses

        var chalk  = gutil.colors.red;
        var report = ['\n'];
        var notifyMessage = '';

        if (error.plugin == 'gulp-eslint') {
            report.push(chalk('Plugin: ') + error.plugin     + '\n');
            report.push(chalk('File:   ') + error.fileName   + '\n');
            report.push(chalk('Line:   ') + error.lineNumber + '\n');
            report.push(chalk('Note:   ') + error.message    + '\n');

            notifyMessage = 'JS linter found errors.';
        }

        if (error.plugin === 'gulp-sass') {
            report.push(chalk('Plugin: ') + error.plugin          + '\n');
            report.push(chalk('File:   ') + error.relativePath    + '\n');
            report.push(chalk('Line:   ') + error.line            + '\n');
            report.push(chalk('Column: ') + error.column          + '\n');
            report.push(chalk('Note:   ') + error.messageOriginal + '\n');

            notifyMessage = error.relativePath + '\n' + error.line + ' : ' + error.column;
        }

        if (error.plugin == 'gulp-stylelint') {
            notifyMessage = 'CSS linter found errors.';
        }

        if (error.plugin === 'gulp-uglify') {
            report.push(chalk('Plugin: ') + error.plugin         + '\n');
            report.push(chalk('Path:   ') + error.fileName       + '\n');
            report.push(chalk('File:   ') + error.cause.filename + '\n');
            report.push(chalk('Line:   ') + error.cause.line     + '\n');
            report.push(chalk('Column: ') + error.cause.col      + '\n');
            report.push(chalk('Note:   ') + error.cause.message  + '\n');

            notifyMessage = error.cause.filename + '\n' + error.cause.line + ' : ' + error.cause.col;
        }

        // ----------------------------------------------
        // Show error in console

        console.error(report.join(''));

        // ----------------------------------------------
        // Fire Mac/Windows notification for error

        notify({
            title:   'Failed Gulp — See Console',
            message: notifyMessage,
            sound:   'Sosumi' // Sound for Mac. See: https://github.com/mikaelbr/node-notifier#all-notification-options-with-their-defaults
        }).write(error);

        gutil.beep(); // Fallback to system sound (for Windows).
    }
};
