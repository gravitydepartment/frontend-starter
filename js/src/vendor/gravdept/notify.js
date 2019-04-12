/**
* Gravity Department - Notify
* https://github.com/gravitydepartment/notify
*
* @author    Brendan Falkowski
* @copyright Gravity Department. All rights reserved.
*/


// ==============================================
// Notify
// ==============================================

var notify = {
    config: {
        positionX:   'right',  // {string} "right|left"
        positionY:   'bottom', // {string} "top|bottom"
        timeFade:    250,      // {number} milliseconds to fade out
        timeVisible: 5000      // {number} milliseconds the notification is visible
    },

    // Cache selectors
    $notify: null,

    /**
     * @param {object} settings - Object to override default config
     */
    init: function (settings) {
        // Extend defaults
        jQuery.extend(this.config, settings);

        this.injectHtml();
    },

    activate: function () {
        this.$notify.attr('data-notify-state', 'active');
    },

    /**
     * @param {object} data
     *
     * Param "data" is an object with:
     * @param {string}  body        - [required] Notification message
     * @param {boolean} persist     - Keep window open until dismissed
     * @param {string}  status      - [required] "sucess|info|warn|danger" (default: success)
     * @param {number}  timeVisible - Milliseconds the notification is visible
     * @param {string}  title       - Notification title (in bold)
     */
    add: function (data) {
        var _this = this;
        this.activate();

        var elemId      = 'notify-' + Date.now();
        var persist     = (typeof data.persist !== 'undefined' && data.persist) ? true : false;
        var timeVisible = (typeof data.timeVisible !== 'undefined') ? data.timeVisible : this.config.timeVisible;

        var html = [
            '<div class="notify_item notify_item--' + data.status + ' notify_item--' + this.config.positionX + '" id="' + elemId + '">',
                (typeof data.title !== 'undefined') ? '<strong>' + data.title + '</strong><br>' : '',
                data.body,
            '</div>'
        ];

        var $elem = jQuery(html.join(''));

        // Persist is enabled
        if (persist) {
            // Dismiss on "close" click
            var $itemClose = jQuery('<a class="notify_item-close" href="#">&times;</a>');

            $elem
                .addClass('notify_item--persist')
                .append($itemClose);

            $itemClose.on('click', function (e) {
                e.preventDefault();
                var $elem = jQuery(this).parent('.notify_item');
                _this.dismissElem($elem);
            });
        } else {
            // Dismiss on "item" click
            $elem.on('click', function () {
                _this.dismissElem($elem);
            });
        }

        // Inject item
        if (this.config.positionY === 'top') {
            this.$notify.prepend($elem);
        } else {
            this.$notify.append($elem);
        }

        // Prevent browser optimization from bundling injection + transition end state into one paint.
        setTimeout(function () {
            requestAnimationFrame(function () {
                $elem.attr('data-notify-item-state', 'slide-in');
            });
        }, 20);

        // Start countdown
        if (persist === false) {
            this.countdown($elem, timeVisible);
        }
    },

    /**
     * @param {string} $elem - jQuery object of element to dismiss.
     * @param {number} time  - Milliseconds to keep notification alive.
     */
    countdown: function ($elem, time) {
        var _this = this;

        setTimeout(function () {
            _this.dismissElem($elem);
        }, time);
    },

    deactivate: function () {
        this.$notify.attr('data-notify-state', '');
    },

    /**
     * @param {string} $elem - jQuery object of element to dismiss.
     */
    dismissElem: function ($elem) {
        var _this = this;

        $elem.attr('data-notify-item-state', 'fade-out');

        setTimeout(function () {
            $elem.remove();

            if (jQuery('.notify_item').length === 0) {
                _this.deactivate();
            }
        }, this.config.timeFade);

    },

    injectHtml: function () {
        var $notify = jQuery('<div class="notify"></div>');
        $notify.css(this.config.positionX, '0');
        $notify.css(this.config.positionY, '0');

        jQuery('body').append($notify);

        // Update selector
        this.$notify = $notify;
    }
};
