/**
* Gravity Department - Frontend Starter
* https://github.com/gravitydepartment/frontend-starter
*
* @author    Brendan Falkowski
* @copyright Gravity Department. All rights reserved.
*/


// ==============================================
// Gulp Config
// ==============================================

var path = {
    assets: './'
};

var task = {
    clean: {
        pathsToDelete: [
            path.assets + 'css/build',
            path.assets + 'css/map',
            path.assets + 'img/build',
            path.assets + 'js/build',
            path.assets + 'js/map'
        ]
    },
    css: {
        autoprefixerOptions: {
            // For "browserslist" see "package.json"
            cascade: false
        },
        dest: path.assets + 'css/build',
        mapDest: '../map',
        // Must be JSON. See: https://github.com/mikaelbr/gulp-notify/issues/129
        notifyOptions: {
            "title": "CSS",
            "message": "Done",
            "onLast": true
        },
        sassOptions: {
            outputStyle: 'compressed'
        },
        src: path.assets + 'css/src/**/*.scss'
    },
    image: {
        dest: path.assets + 'img/build',
        imageminOptions: {
            gif: {
                interlaced: true
            },
            jpg: {
                progressive: true
            },
            png: {
                optimizationLevel: 3
            },
            svg: {
                plugins: [
                    { removeTitle:   true },
                    { removeViewBox: false },
                    { removeXMLNS:   false }
                ]
            }
        },
        // Must be JSON. See: https://github.com/mikaelbr/gulp-notify/issues/129
        notifyOptions: {
            "title": "Image",
            "message": "Done",
            "onLast": true
        },
        src: [
            path.assets + 'img/src/**/*'
        ]
    },
    jsAppPost: {
        dest: path.assets + 'js/build',
        file: 'bundle-app-post.js',
        mapDest: '../map',
        // Must be JSON. See: https://github.com/mikaelbr/gulp-notify/issues/129
        notifyOptions: {
            "title": "JS: App Post",
            "message": "Done",
            "onLast": true
        },
        src: [
            // Polyfills
            path.assets + 'js/src/vendor/polyfill-custom-event.js',
            path.assets + 'js/src/vendor/polyfill-element-closest.js',
            path.assets + 'js/src/vendor/polyfill-object-assign.js',
            // Libraries
            path.assets + 'js/src/vendor/jquery-3.3.1.min.js',
            path.assets + 'js/src/vendor/enquire.min.js',
            // Load components
            path.assets + 'js/src/vendor/fitvids.js',
            path.assets + 'js/src/vendor/gravdept/accordion.js',
            path.assets + 'js/src/vendor/gravdept/app-ui.js',
            path.assets + 'js/src/vendor/gravdept/modal.js', // Needs: polyfill-custom-event.js, polyfill-element-closest.js, polyfill-object-assign.js
            path.assets + 'js/src/vendor/gravdept/notify.js',
            path.assets + 'js/src/vendor/gravdept/offscreen.js',
            path.assets + 'js/src/vendor/gravdept/sidescroll.js', // Needs: enquire.js
            path.assets + 'js/src/vendor/gravdept/stepper.js',
            path.assets + 'js/src/vendor/gravdept/tab-accordion.js',
            path.assets + 'js/src/vendor/gravdept/tab-carousel.js', // Needs: enquire.js
            path.assets + 'js/src/vendor/gravdept/tabs.js',
            path.assets + 'js/src/vendor/gravdept/toggle.js',
            path.assets + 'js/src/vendor/gravdept/typeahead.js',
            path.assets + 'js/src/vendor/gravdept/user-agent.js',
            // Initialize components
            path.assets + 'js/src/app-components.js',
            path.assets + 'js/src/app-header.js',
            path.assets + 'js/src/app-footer.js',
            path.assets + 'js/src/browser-detection.js' // Needs: user-agent.js
        ],
        uglifyOptions: {
            mangle: false
        }
    },
    jsAppPostDefer: {
        dest: path.assets + 'js/build',
        file: 'bundle-app-post-defer.js',
        mapDest: '../map',
        // Must be JSON. See: https://github.com/mikaelbr/gulp-notify/issues/129
        notifyOptions: {
            "title": "JS: App Post Defer",
            "message": "Done",
            "onLast": true
        },
        src: [
            path.assets + 'js/src/vendor/picturefill.min.js' // For IE11
        ],
        uglifyOptions: {
            mangle: false
        }
    },
    jsAppPre: {
        dest: path.assets + 'js/build',
        file: 'bundle-app-pre.js',
        mapDest: '../map',
        // Must be JSON. See: https://github.com/mikaelbr/gulp-notify/issues/129
        notifyOptions: {
            "title": "JS: App Pre",
            "message": "Done",
            "onLast": true
        },
        src: [
            path.assets + 'js/src/vendor/modernizr.custom.js'
        ],
        uglifyOptions: {
            mangle: false
        }
    },
    jsThing: {
        dest: path.assets + 'js/build',
        file: 'bundle-thing.js',
        mapDest: '../map',
        // Must be JSON. See: https://github.com/mikaelbr/gulp-notify/issues/129
        notifyOptions: {
            "title": "JS: Thing",
            "message": "Done",
            "onLast": true
        },
        src: [
            path.assets + 'js/src/module/thing.js'
        ],
        uglifyOptions: {
            mangle: false
        }
    },
    lintCss: {
        // Must be JSON. See: https://github.com/mikaelbr/gulp-notify/issues/129
        notifyOptions: {
            "title": "Lint: CSS",
            "message": "Done",
            "onLast": true
        },
        src: [
            path.assets + 'css/src/**/*.scss',
            '!' + path.assets + 'css/src/core/reset/_normalize.scss',
            '!' + path.assets + 'css/src/vendor/**'
        ],
        stylelintOptions: {
            reporters: [{
                formatter: 'string',
                console: true
            }]
        }
    },
    lintJs: {
        // Must be JSON. See: https://github.com/mikaelbr/gulp-notify/issues/129
        notifyOptions: {
            "title": "Lint: JS",
            "message": "Done",
            "onLast": true
        },
        src: [
            path.assets + 'js/src/**/*.js',
            '!' + path.assets + 'js/src/vendor/**'
        ]
    },
    watch: {
        options: {
            ignoreInitial: false
        }
    }
};

module.exports = {
    path: path,
    task: task
};
