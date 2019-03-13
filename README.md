# GravDept Frontend Starter

A simple HTML + CSS + JS baseline with Gulp build tools.

[![Gravity Department](http://gravitydept.com/_themes/gravdept/img/logo-footer.png)](http://gravitydept.com/)

## Quick start

1. Clone the repository to your computer.
1. Point a PHP/Apache server at the project root directory.
2. Recommended: setup a virtual host like `project.test`.
1. Run `npm install`.
1. Run `gulp watch`.

## Overview

### Prototype templates

Prototypes are built using PHP includes for simple templating. The output is logic-less plain HTML, which is easily adaptable to test patterns and content together.

See: http://project.test/

### Code standards

Frontend code follow the GravDept code standards, which are maintained here:

- http://manuals.gravitydept.com/code/css
- http://manuals.gravitydept.com/code/html
- http://manuals.gravitydept.com/code/js

### Build system

Gulp powers the frontend build system. All the frontend assets (CSS, JS, images) are processed from source material into production-ready assets.

#### Important build files

| File | Description |
| --- | --- |
| .eslintrc | Configuration for JS linting. Avoid editing. |
| gulp/config.js | Configuration for all Gulp tasks. Edit this frequently. |
| gulp/error-handler.js | Show readable error message in the console from failed Gulp tasks. Avoid editing. |
| node-modules/ | Contains Node modules installed via NPM. Never edit. |
| gulpfile.js | Define Gulp tasks. Add tasks as needed. Avoid rewriting tasks. |
| package.json | Define Node modules the build process requires. Maintain this monthly. |
| package-lock.json | Lock file for Node module dependencies. Never edit. |
| stylelint.config.js | Configuration for CSS linting. Avoid editing. |

#### Build tasks

| Task Name | Description |
| --- | --- |
| clean | Delete all assets generated by the build.<br> This runs before "default" task to force all site assets to be generated. |
| css | Pre-process SCSS to CSS.<br> Process SCSS to sourcemaps.<br> Post-process CSS with Autoprefixer. |
| default | Run "clean" to force all site assets to be regenerated.<br> Run all specified tasks and linters (css, image, js). |
| image | Optimize image files (JPG, PNG, GIF, SVG) using ImageOptim library. |
| js{ModuleName} | Compress JS without mangling (rewriting for shortness).<br> Concatenate into bundles.<br> Process JS to sourcemaps. |
| lintCss | Lint CSS with "stylelint" module.<br> This runs in "default" and anytime a watched CSS file is changed. |
| lintJs | Lint JS with "jsHint" module.<br> This runs in "default" and anytime a watched JS file is | changed.
| watch | Run "default" immediately.<br> Start watchers for appropriate tasks. |

#### Install build tools

* Install Node 8.9.3
  * https://nodejs.org/en/
  * Note: Node 10+ will break some build dependencies
* Run commands:
  * `cd /your/project/path`
  * `npm install`

#### Run build tasks

| Command | Description |
| --- | --- |
| `gulp` | Run "default" task (once) |
| `gulp watch` | Run "default" task and continue watching |
| `gulp {taskName}` | Run a specific task |
| `gulp --silent` | Run "default" task (once) and suppress notifications for local development |

#### Maintain build tools

1. Check for outdated packages. Run: `npm outdated`
1. Check the package list for changes.
1. Review the release notes for each package to ensure there aren't breaking changes.
1. Update "package.json" to specify the latest (only set exact versions, no wildcards).
1. Run commands: `npm update`
1. Check for update errors.
1. Run the build and check for errors: `gulp`

Sometimes updating fails or breaks the build. Before reverting to prior versions try:

1. Delete the `/node-modules` folder.
1. Run `npm install`.
1.Test the build again.

#### Update build tools

1. Run `npm update`.
1. Check for update errors.
1. Run the build and check for errors: `gulp`.

Sometimes updating fails or breaks the build. Before reverting to prior versions try:

1. Delete the `/node-modules` folder.
1. Run `npm install`.
1. Test the build again.
