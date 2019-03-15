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

var beeper = require('beeper');
var color  = require('ansi-colors');
var minimist = require('minimist');
var notify = require('gulp-notify');
var PluginError = require('plugin-error');

var arguments = minimist(process.argv.slice(2));
var showProperties = (arguments['show-properties']) ? true : false;

module.exports = function (error) {
    if (typeof error !== 'undefined') {
        // [log] Uncomment to show the full error object
        //console.log(error);

        // ----------------------------------------------
        // Normalize error responses

        var report = ['\n'];
        var notifyMessage = '';

        if (error.plugin == 'gulp-eslint') {
            report.push(color.red('Plugin: ') + error.plugin     + '\n');
            report.push(color.red('File:   ') + error.fileName   + '\n');
            report.push(color.red('Line:   ') + error.lineNumber + '\n');
            report.push(color.red('Note:   ') + error.message    + '\n');

            notifyMessage = 'JS linter found errors.';
        }

        if (error.plugin === 'gulp-sass') {
            report.push(color.red('Plugin: ') + error.plugin          + '\n');
            report.push(color.red('File:   ') + error.relativePath    + '\n');
            report.push(color.red('Line:   ') + error.line            + '\n');
            report.push(color.red('Column: ') + error.column          + '\n');
            report.push(color.red('Note:   ') + error.messageOriginal + '\n');

            notifyMessage = error.relativePath + '\n' + error.line + ' : ' + error.column;
        }

        if (error.plugin == 'gulp-stylelint') {
            notifyMessage = 'CSS linter found errors.';
        }

        if (error.plugin === 'gulp-uglify') {
            report.push(color.red('Plugin: ') + error.plugin         + '\n');
            report.push(color.red('Path:   ') + error.fileName       + '\n');
            report.push(color.red('File:   ') + error.cause.filename + '\n');
            report.push(color.red('Line:   ') + error.cause.line     + '\n');
            report.push(color.red('Column: ') + error.cause.col      + '\n');
            report.push(color.red('Note:   ') + error.cause.message  + '\n');

            notifyMessage = error.cause.filename + '\n' + error.cause.line + ' : ' + error.cause.col;
        }

        // ----------------------------------------------
        // Fire Mac/Windows notification for error

        notify({
            title:   'Failed Gulp — See Console',
            message: notifyMessage,
            sound:   'Sosumi' // Sound for Mac. See: https://github.com/mikaelbr/node-notifier#all-notification-options-with-their-defaults
        }).write(error);

        beeper(); // Fallback to system sound (for Windows).

        var customError = new PluginError(error.plugin, report.join(''), {
            error: error,
            showProperties: showProperties
        });
        throw customError;
    }
};
