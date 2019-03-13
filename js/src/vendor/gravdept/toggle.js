/**
* Gravity Department - Frontend Starter
* https://github.com/gravitydepartment/frontend-starter
*
* @author     Brendan Falkowski
* @copyright  Gravity Department. All rights reserved.
*/


// ==============================================
// Toggle
// ==============================================

jQuery(document).on('click', '[data-toggle-trigger]', function (e) {
    var $self = jQuery(this);

    var $parent = $self.closest('[data-toggle]');
    var state   = ($parent.attr('data-toggle') === 'show') ? 'hide' : 'show';

    if ($self.is('a')) {
        e.preventDefault();
    }

    $parent.attr('data-toggle', state);
});
