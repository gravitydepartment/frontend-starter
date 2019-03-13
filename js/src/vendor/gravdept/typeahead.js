/**
* Gravity Department - Typeahead
* https://github.com/gravitydepartment/typeahead
*
* @author     Brendan Falkowski
* @copyright  2017 Gravity Department. All rights reserved.
*/


// ==============================================
// Typeahead
// ==============================================

function Typeahead () {
    this.config = {
        debounceTime: 300,  // {number} - Milliseconds to pause before querying
        elements: {
            button:   null, // {string} - ID of submit buttton
            form:     null, // {string} - ID of form
            input:    null, // {string} - ID of text input
            response: null  // {string} - ID of response element
        },
        headers:           {},    // {object}  - HTTP headers to attach to request
        paramNameForQuery: null,  // {string}  - Param name for which the query value is passed.
        preventFormSubmit: false, // {boolean} - Prevent form submit if no "action" exists
        queryMinimum:      3,     // {number}  - Minimum characters to start typeahead
        requestData:       {},    // {object}  - URL params to attach to request
        showEmpty:         false, // {boolean} - Show message if response has no results
        showLoading:       false, // {boolean} - Show loading between request and response
        url:               null   // {string}  - URL to query for data
    };

    // Selectors
    this.$button   = null;
    this.$form     = null;
    this.$input    = null;
    this.$response = null;

    // Templates
    this.template = {
        empty:       jQuery('[data-js-template="typeahead-empty"]').html(),
        group:       jQuery('[data-js-template="typeahead-group"]').html(),
        itemLink:    jQuery('[data-js-template="typeahead-item-link"]').html(),
        itemProduct: jQuery('[data-js-template="typeahead-item-product"]').html(),
        loading:     jQuery('[data-js-template="typeahead-loading"]').html()
    };
}

Typeahead.prototype = {
    /**
     * @param {object} settings - Object to override default config
     */
    init: function (settings) {
        // Extend defaults
        jQuery.extend(this.config, settings);

        this.cacheSelectors();
        this.addEvents();
    },

    addEvents: function () {
        var _this = this;

        // Listen for typing
        this.$input.on('input', this.debounce(function (e) {
            _this.onInput();
        }, this.config.debounceTime));

        // Keyboard nav enhancement
        this.$input.on('keydown', function (e) {
            // Press "tab" to focus the first typeahead link
            if (e.keyCode === 9) {
                e.preventDefault(); // Don't tab to "submit" button
                _this.$response.find('.typeahead_link').first().focus();
            }
        });

        // Listen for form submit
        this.$form.on('submit', function (e) {
            if (_this.config.preventFormSubmit) {
                e.preventDefault();
            } else {
                _this.hideTypeahead();
            }
        });

        // Click outside the input or response to close typeahead
        jQuery(document).on('click', function (e) {
            var $target  = jQuery(e.target);
            var $parents = $target.parents();

            var targetId   = e.target.id;
            var inputId    = _this.$input.first().attr('id');
            var responseId = _this.$input.first().attr('id');

            var isClickOnInput         = (targetId === inputId)    ? true : false;
            var isClickOnResponse      = (targetId === responseId) ? true : false;
            var isClickOnResponseChild = ($parents.index(_this.$response) !== -1) ? true : false;

            if (isClickOnResponse || isClickOnInput || isClickOnResponseChild) {
                // Keep typeahead open
            } else {
                _this.hideTypeahead();
            }
        });

        // Click typeahead link
        this.$response.on('click', '.typeahead_link', function (e) {
            // Always prevented.
            // Recreate native-like or handle custom behavior manually.
            e.preventDefault();

            var href = jQuery(this).attr('href');

            // If "href" looks real
            if (
                typeof href !== 'undefined'
                && href !== ''
                && href !== '#'
            ) {
                // Prevent bubbling to the "document" and closing typeahead.
                // This allows the "loading" state to be seen next.
                e.stopPropagation();

                // This will remove ".typeahead_link" from the DOM, which cancels the default
                // behavior and delegated events attached.
                _this.showLoading();

                // Manually redirect to "href".
                // See: https://github.com/gravitydepartment/typeahead/issues/1
                window.location = href;
            } else {
                // Else - "href" is not a real link.
                // Attach behavior externally with a delegated event listener.
                //
                // Suggestion:
                // -- Watch for clicks bubbling from ".typeahead_link" to "#module-typeahead-response".
                // -- Use "e.stopPropagation()" so bubbling won't reach "document" and hide typeahead.
            }
        });
    },

    cacheSelectors: function () {
        this.$button   = jQuery('#' + this.config.elements.button);
        this.$form     = jQuery('#' + this.config.elements.form);
        this.$input    = jQuery('#' + this.config.elements.input);
        this.$response = jQuery('#' + this.config.elements.response);
    },

    // See: https://remysharp.com/2010/07/21/throttling-function-calls
    debounce: function (fn, delay) {
        var timer = null;

        return function () {
            var context = this;
            var args = arguments;

            clearTimeout(timer);

            timer = setTimeout(function () {
                fn.apply(context, args);
            }, delay);
        };
    },

    /**
     * @return {string} - The parameter name for which the query value is passed.
     */
    getParamNameForQueryValue: function () {
        if (this.config.paramNameForQuery !== null) {
            // Use parameter name defined during typeahead init.
            return this.config.paramNameForQuery;
        } else {
            // Use "name" attribute from input element.
            return this.$input.attr('name');
        }
    },

    hideTypeahead: function () {
        this.$response.addClass('hide');
    },

    /**
     * Override this method during init to modify the user's input before querying.
     *
     * @param {string} query
     * @return {string}
     */
    modifyQuery: function (query) {
        return query;
    },

    onInput: function () {
        var query = this.$input.val().trim();

        // Modify query before sending request
        query = this.modifyQuery(query);

        // Send query or hide response
        if (query.length && query.length >= this.config.queryMinimum) {
            this.sendRequest(query);
        } else {
            this.hideTypeahead();
        }
    },

    /**
     * Override this method during init to suit the data source.
     *
     * @param {object|string} response - {object} as JSON to be parsed | {string} as HTML to render
     * @return {string|boolean} - {string} as HTML to render | {boolean} false to not render
     */
    render: function (response) {
        return response;
    },

    /**
     * @param {string} title - Title of the group
     * @param {string} body  - Items in the group
     * @return {string}
     */
    renderGroup: function (title, body) {
        var group = this.template.group;
        group = group.replace(/{{groupTitle}}/, title);
        group = group.replace(/{{groupBody}}/,  body);
        return group;
    },

    resetInput: function () {
        this.$input.val('');
    },

    /**
     * @param {string} query - Query value
     */
    sendRequest: function (query) {
        var _this = this;

        var data = this.config.requestData;
        data[this.getParamNameForQueryValue()] = query;

        jQuery.ajax({
            beforeSend: function () {
                if (_this.config.showLoading) {
                    _this.showLoading();
                }
            },
            data: data,
            headers: _this.config.headers,
            url: _this.config.url
        }).fail(function () {
            _this.hideTypeahead();
        }).done(function (json) {
            if (typeof json === 'string') {
                json = JSON.parse(json);
            }

            var html = _this.render(json);

            if (html !== false) {
                _this.showTypeahead(html);
            }
        });
    },

    showEmpty: function () {
        if (this.config.showEmpty) {
            this.showTypeahead(this.template.empty);
        } else {
            this.hideTypeahead();
        }
    },

    showLoading: function () {
        this.$response
            .html(this.template.loading)
            .removeClass('hide');
    },

    /**
     * @param {string} html - HTML to display
     */
    showTypeahead: function (html) {
        this.$response
            .html(html)
            .removeClass('hide');
    }
};
