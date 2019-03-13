/**
* Gravity Department - Frontend Starter
* https://github.com/gravitydepartment/frontend-starter
*
* @author     Brendan Falkowski
* @copyright  Gravity Department. All rights reserved.
*/


// ==============================================
// Tabs
// ==============================================

var $tabs = jQuery('.tabs');

$tabs.each(function () {
    var $self  = jQuery(this);
    var $items = $self.find('.tabs_item');
    var $links = $self.find('.tabs_nav-link');

    // Detect click on nav item
    $links.on('click', function (e) {
        e.preventDefault();

        var $link = jQuery(this);

        // Hide all content, then show content for hash
        $items
        .removeClass('is-active')
        .filter(this.hash)
        .addClass('is-active');

        // Set hash of last opened section
        window.history.replaceState({}, '', this.hash);

        // Remove "is-active" class from all links
        $links.removeClass('is-active');

        // Add "is-active" class to clicked link
        $link.addClass('is-active');
    });

    // Detect if page was loaded with a hash
    if (window.location.hash) {
        var hashTarget = $self.find('.tabs_nav-link[href="' + window.location.hash + '"]');

        if (hashTarget.length === 1) {
            hashTarget.click();
        }
    } else {
        // Detect if any tab is active
        if ($self.find('.tabs_item.is-active').length) {
            // Do nothing
        } else {
            // Activate the first tab
            $links.filter(':first').addClass('is-active');
            $items.filter(':first').addClass('is-active');
        }
    }
});
