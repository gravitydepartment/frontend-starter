/**
* Gravity Department - Frontend Starter
* https://github.com/gravitydepartment/frontend-starter
*
* @author    Brendan Falkowski
* @copyright Gravity Department. All rights reserved.
*/


// ==============================================
// Offscreen
// ==============================================

jQuery('[data-offscreen]').on('click', function (e) {
    var $button      = jQuery(this);
    var $buttonLabel = $button.find('.label');
    var $offscreen   = jQuery('.offscreen-' + $button.attr('data-offscreen'));

    var hideLabel = $button.attr('data-offscreen-hide');
    var showLabel = $button.attr('data-offscreen-show');

    // Toggle visibility
    $offscreen.toggleClass('is-active');

    // Update button label
    if ($offscreen.hasClass('is-active')) {
        $buttonLabel.html(hideLabel);
    } else {
        $buttonLabel.html(showLabel);
    }
});
