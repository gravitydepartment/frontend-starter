/**
* Gravity Department - Frontend Starter
* https://github.com/gravitydepartment/frontend-starter
*
* @author     Brendan Falkowski
* @copyright  Gravity Department. All rights reserved.
*/


// **********************************************
// Gulp Error Formatter
//
// Plugins return inconsistent `error` objects. This module:
//
// - Uses Node "stream.pipeline" to keep errors from ending streams.
// - Normalizes and formats the error, so the console is readable.
// - Shows Mac/Windows notifications with file + line number hints.
// **********************************************


// ==============================================
// Packages
// ==============================================

var beeper      = require('beeper');
var color       = require('ansi-colors');
var minimist    = require('minimist');
var notify      = require('gulp-notify');
var PluginError = require('plugin-error');


// ==============================================
// Arguments
// ==============================================

var arguments = minimist(process.argv.slice(2));

// Use "gulp --show-properties" to log detailed error info in the console.
var showProperties = (arguments['show-properties']) ? true : false;


// ==============================================
// Module
// ==============================================

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
        // Show Mac/Windows notification

        notify({
            title:   'Failed Gulp — See Console',
            message: notifyMessage,
            sound:   'Sosumi' // Sound for Mac. See: https://github.com/mikaelbr/node-notifier#all-notification-options-with-their-defaults
        }).write(error);

        beeper(); // Fallback to system sound (for Windows).

        // ----------------------------------------------
        // Throw error

        var customError = new PluginError(error.plugin, report.join(''), {
            error: error,
            showProperties: showProperties
        });

        throw customError;
    }
};
