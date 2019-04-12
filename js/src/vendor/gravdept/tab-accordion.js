/**
* Gravity Department - Frontend Starter
* https://github.com/gravitydepartment/frontend-starter
*
* @author    Brendan Falkowski
* @copyright Gravity Department. All rights reserved.
*/


// ==============================================
// Tab Accordion
// ==============================================

var $tabAccordions = jQuery('.tab-accordion');

// If changed, also change CSS.
// See: /css/src/component/_tab-accordion.scss
var tabAccordionBreakpoint = 800;

$tabAccordions.each(function () {
    var $tabAccordion = jQuery(this);
    var $sections     = $tabAccordion.find('.tab-accordion_section');
    var navHtml       = '';

    // ----------------------------------------------
    // Build nav

    $sections.each(function () {
        var $section  = jQuery(this);
        var hideClass = '';

        // Check for disabled section
        if ($section.hasClass('no-display')) {
            hideClass = 'no-display';
        }

        var html = [
            '<a class="tab-accordion_nav-link ' + hideClass + '" href="#' + $section.attr('id') + '">',
                $section.find('.tab-accordion_title').text(),
            '</a>'
        ];

        navHtml += html.join('');
    });

    navHtml = '<nav class="tab-accordion_nav">' + navHtml + '</nav>';
    $tabAccordion.prepend(navHtml);

    // ----------------------------------------------
    // Tab Mode (large screens)
    // Detect click on nav item

    var $links = $tabAccordion.find('.tab-accordion_nav-link');

    $links.on('click', function (e) {
        e.preventDefault();

        var $link = jQuery(this);

        // Hide all content, then show content for hash
        $sections
            .removeClass('is-active')
            .filter(this.hash)
            .addClass('is-active');

        // Set hash of last opened section
        $tabAccordion.attr('data-tab-accordion-hash', this.hash);
        window.history.replaceState({}, '', this.hash);

        // Remove "is-active" class from all nav links
        $links.removeClass('is-active');

        // Add "is-active" class to clicked nav link
        $link.addClass('is-active');
    });

    // ----------------------------------------------
    // Accordion mode (small screens)
    // Detect click on title

    var $titles = $tabAccordion.find('.tab-accordion_title');

    $titles.on('click', function () {
        if (matchMedia('(max-width: ' + (tabAccordionBreakpoint - 1) + 'px)').matches) {
            var $title      = jQuery(this);
            var $section    = $title.parent('.tab-accordion_section');
            var sectionId   = $section.attr('id');
            var sectionHash = '#' + sectionId;

            // Toggle clicked section
            $section.toggleClass('is-active');

            // Set hash of last opened section
            $tabAccordion.attr('data-tab-accordion-hash', sectionHash);
            window.history.replaceState({}, '', sectionHash);

            // Remove "is-active" class from all links
            $links.removeClass('is-active');

            // Add "is-active" class to clicked link
            jQuery('.tab-accordion_nav-link[href="' + sectionHash + '"]').addClass('is-active');
        }
    });

    // ----------------------------------------------
    // Swap

    enquire.register('(min-width: ' + tabAccordionBreakpoint + 'px)', {
        setup: function () {
            // Nothing
        },
        match: function () {
            // Set everything inactive
            $links.removeClass('is-active');
            $sections.removeClass('is-active');

            // Set last opened section active
            var hash = $tabAccordion.attr('data-tab-accordion-hash');
            jQuery(hash).addClass('is-active');
            jQuery('.tab-accordion_nav-link[href="' + hash + '"]').addClass('is-active');
        },
        unmatch: function () {
            // Nothing
        }
    });

    // ----------------------------------------------
    // Set initial state

    var hasUrlHash = false;

    // Detect if the page loaded with a hash
    if (window.location.hash) {
        var $hashTarget = $tabAccordion.find('.tab-accordion_nav-link[href="' + window.location.hash + '"]');

        if ($hashTarget.length) {
            hasUrlHash = true;
            $hashTarget.click();
        }
    }

    if (hasUrlHash === false) {
        // Set initial state
        var hash = $links.filter(':first').attr('href');
        $tabAccordion.attr('data-tab-accordion-hash', hash);

        if (matchMedia('(min-width: ' + tabAccordionBreakpoint + 'px)').matches) {
            // Large screens:
            // Preset the first section immediately
            $sections.filter(':first').addClass('is-active');
            $links.filter(':first').addClass('is-active');
        } else {
            // Small screens:
            // Keep all sections collapsed
        }
    }
});
