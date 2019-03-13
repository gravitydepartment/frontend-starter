/**
* Gravity Department - Frontend Starter
* https://github.com/gravitydepartment/frontend-starter
*
* @author     Brendan Falkowski
* @copyright  Gravity Department. All rights reserved.
*/


// ==============================================
// Accordion
// ==============================================

var $document = jQuery(document);

/**
 * Init accordion nav for large screens
 *
 * @param {object} $accordion - The accordion to update. Select an element ID and pass as jQuery object.
 */
function createAccordionNav ($accordion) {
    var $sections = $accordion.find('.accordion_section');
    var links = [];

    // Remove old nav
    $accordion.find('.accordion_nav').remove();

    // Create new nav
    $sections.each(function () {
        var $self = jQuery(this);
        links.push('<li><a href="#' + $self.attr('id') + '" class="accordion_nav-link">' + $self.find('.accordion_header').html() + '</a></li>');
    });

    var markup = [
        '<nav class="accordion_nav">',
            '<div class="accordion_nav-liner">',
                '<h2>Skip To Section</h2>',
                '<ol class="accordion_nav-list">',
                    links.join(''),
                '</ol>',
            '</div>',
        '</nav>'
    ];

    $accordion.prepend(markup.join(''));
}

var $accordions = jQuery('.accordion');

if ($accordions.length) {
    $accordions.each(function () {
        var $this = jQuery(this);

        // Create nav
        createAccordionNav($this);

        // Custom event: listen for accordion nav updates
        $this.on('updateAccordionNav', function (e) {
            createAccordionNav($this);
        });
    });

    // Event: toggle accordions open/shut
    $document.on('click', '.accordion_header', function (e) {
        e.preventDefault();

        if (matchMedia('(max-width: 767px)').matches) {
            jQuery(this).parents('.accordion_section').toggleClass('is-active');
        }
    });

    // Event: skip to accordion section
    $document.on('click', '.accordion_nav-link', function (e) {
        e.preventDefault();
        gravdept.scrollToElement(jQuery(this).attr('href'), 500);
    });
}
