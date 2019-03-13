/**
* Gravity Department - Modal
* https://github.com/gravitydepartment/modal
*
* @author     Brendan Falkowski
* @copyright  2018 Gravity Department. All rights reserved.
*/


/**
 * @param {object} config - Configuration options
 */
function Modal (config) {
    this.config = {
        addCloseButton:     true,                  // {boolean} - Add a close link to the modal.
        allowBackdropClose: true,                  // {boolean} - Clicking the backdrop will close the modal.
        allowEscapeClose:   true,                  // {boolean} - Pressing "ESC" will close the modal.
        class:              '',                    // {string}  - Class on "modal" element.
        closeButtonLabel:   'Close',               // {string}  - Label for the "close" link.
        content:            null,                  // {string}  - String of HTML content to render in the modal.
        id:                 'modal-' + Date.now(), // {string}  - ID on "modal" element.
        transitionEndTime:  500,                   // {number}  - Milliseconds for the modal transition to complete (duration + delay) as set in CSS.
        width:              'base'                 // {string}  - "base|fluid|s|l" - Max width of the modal.
    };

    // Extend default config
    this.config = Object.assign(this.config, config);

    // Selectors
    this.$backdrop      = null;
    this.$closeTriggers = null;
    this.$dialog        = null;
    this.$modal         = null;

    // The element with focus before the modal opened
    lastFocus = null;

    this.init();
}

Modal.prototype = {
    init: function (element) {
        this.saveFocus();
        this.closeExistingModals();
        this.createModal();
        this.addEvents();
        this.openModal();
    },

    addEvents: function () {
        var _this = this;

        if (this.config.allowEscapeClose) {
            document.addEventListener('keydown', function (e) {
                // Press "TAB" trap
                if (e.keyCode === 9) {
                    // [todo]
                }

                // Press "ESC" to close
                if (e.keyCode === 27) {
                    _this.closeModal();
                }
            });
        }

        // Click on "data-modal-close" elements to close
        for (var i = 0; i < this.$closeTriggers.length; i++) {
          this.$closeTriggers[i].addEventListener('click', function (e) {
              e.preventDefault();
              _this.closeModal();
          });
        }
    },

    closeExistingModals: function () {
        // Find modals except those closing or closed, but not yet removed from the DOM.
        var modals = document.querySelectorAll('.modal:not([data-modal-state="closing"]):not([data-modal-state="closed"])');

        for (var i = 0; i < modals.length; i++) {
            var modal       = modals[i];
            var closeButton = modal.querySelector('[data-modal-close]');

            if (closeButton) {
                // Close gracefully
                closeButton.click();
            } else {
                // Close by force
                modal.setAttribute('data-modal-state', 'closing');

                window.setTimeout(function () {
                    modal.setAttribute('data-modal-state', 'closed')

                    var event = new CustomEvent('modal-closed', {'bubbles': true});
                    modal.dispatchEvent(event);

                    modal.parentNode.removeChild(modal);
                }, this.config.transitionEndTime);
            }
        }
    },

    closeModal: function () {
        var _this = this;

        // Start animating out
        this.setState('closing');

        window.setTimeout(function () {
            _this.setState('closed');

            var event = new CustomEvent('modal-closed', {'bubbles': true});
            _this.$modal.dispatchEvent(event);

            _this.destroyModal();
        }, this.config.transitionEndTime);

        this.restoreFocus();
    },

    createModal: function () {
        var closeButton = [];
        var widthClass  = 'modal_dialog--' + this.config.width;
        var backdropCloseAttribute = (this.config.allowBackdropClose) ? 'data-modal-close' : '';

        if (this.config.addCloseButton) {
            closeButton = [
                '<button type="button" class="modal_close" data-modal-close aria-label="' + this.config.closeButtonLabel + '">',
                    this.config.closeButtonLabel,
                '</button>'
            ];
        }

        var template = [
            '<section class="modal ' + this.config.class + '" id="' + this.config.id + '" role="dialog" data-modal-state="closed">',
                '<div class="modal_dialog ' + widthClass + '">',
                    this.config.content,
                    closeButton.join(''),
                '</div>',
                '<div class="modal_backdrop" ' + backdropCloseAttribute + '>',
                '</div>',
            '</section>'
        ];

        var fragment = document.createRange().createContextualFragment(template.join(''));
        document.body.appendChild(fragment);

        this.$modal         = document.getElementById(this.config.id);
        this.$backdrop      = this.$modal.querySelector('.modal_backdrop');
        this.$closeTriggers = this.$modal.querySelectorAll('[data-modal-close]');
        this.$dialog        = this.$modal.querySelector('.modal_dialog');
    },

    destroyModal: function () {
        this.$modal.parentNode.removeChild(this.$modal);
    },

    openModal: function () {
        var _this = this;

        // Open modal
        this.setState('opening');
        this.setPosition();
        this.setState('open');

        var event = new CustomEvent('modal-opened', {'bubbles': true});
        this.$modal.dispatchEvent(event);
    },

    restoreFocus: function () {
        this.lastFocus.focus();
    },

    saveFocus: function () {
        this.lastFocus = document.activeElement;
    },

    setPosition: function () {
        var scrollOffset   = window.pageYOffset;
        var viewportHeight = window.innerHeight;

        // When the modal has "visibility: visible" its height can be calculated.
        var modalHeight = this.$dialog.offsetHeight;

        // ----------------------------------------------
        // Set the vertical position

        if (modalHeight >= viewportHeight) {
            // Modal is taller than the viewport.
            // Show 20px from top (will require page scrolling).
            this.$dialog.style.top = scrollOffset + 20 + 'px';
        } else {
            // Modal is shorter than the viewport.
            // Show centered vertically within the viewport.
            this.$dialog.style.top = scrollOffset + (viewportHeight / 2) - (modalHeight / 2) + 'px';
        }
    },

    /**
     * @param {string} state - "closed|closing|open|opening"
     */
    setState: function (state) {
        this.$modal.setAttribute('data-modal-state', state);
    }
};
