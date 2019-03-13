/**
* Gravity Department - App UI
* https://github.com/gravitydepartment/app-ui
*
* @author     Brendan Falkowski
* @copyright  2018 Gravity Department. All rights reserved.
*/


// ==============================================
// App UI
// ==============================================

var appUi = {
    $body: jQuery('body'),

    config: {
        // Array of CSS selector values as {string}.
        safeZones: []
    },

    /**
     * @param {object} settings - Object to override default config
     */
    init: function (settings) {
        // Extend defaults
        jQuery.extend(this.config, settings);

        this.addEvents();
    },

    addEvents: function () {
        var _this = this;

        // Toggle UI elements
        jQuery(document).on('click', '[data-ui-action]', function (e) {
            e.preventDefault();
            e.stopPropagation();
            _this.toggleUi(this);
        });

        // Hide UI elements when clicking outside their boundary
        jQuery(document).on('click', function (e) {
            _this.checkSafeZones(e.target);
        });
    },

    /**
     * @param {string} selector - CSS selector for safe zone.
     */
    addSafeZone: function (selector) {
        this.config.safeZones.push(selector);
    },

    /**
     * @param {object} target - The clicked element.
     */
    checkSafeZones: function (target) {
        var $target  = jQuery(target);
        var $parents = $target.parents();

        var isInSafeZone = false;

        this.config.safeZones.forEach(function (safeZone) {
            // Safe zone is parent of target
            if ($parents.index(jQuery(safeZone)) !== -1) {
                isInSafeZone = true;
            }

            // Target is the safe zone
            if ($target.is(safeZone)) {
                inSafeZone = true;
            }
        });

        if (isInSafeZone) {
            // Keep showing the UI
        } else {
            this.hideUi();
        }
    },

    hideUi: function () {
        this.$body.attr('data-ui', '');

        jQuery.event.trigger({
            type: 'appUiChange',
            change: 'hide',
            ui: ''
        });
    },

    /**
     * @param {string} value - Value of "data-ui" attribute.
     */
    showUi: function (value) {
        this.$body.attr('data-ui', value);

        jQuery.event.trigger({
            type: 'appUiChange',
            change: 'show',
            ui: value
        });
    },

    /**
     * @param {object} element - The clicked element.
     */
    toggleUi: function (element) {
        var oldUi = this.$body.attr('data-ui');
        var newUi = jQuery(element).first().attr('data-ui-action'); // Use "first()" in case element was duplicated in HTML.

        // Show/hide components
        if (oldUi === newUi) {
            this.hideUi();
        } else {
            this.showUi(newUi);
        }
    }
};
