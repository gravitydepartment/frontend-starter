/**
* Gravity Department - Frontend Starter
* https://github.com/gravitydepartment/frontend-starter
*
* @author     Brendan Falkowski
* @copyright  Gravity Department. All rights reserved.
*/


// ==============================================
// Stepper
// ==============================================

jQuery(document).on('click', '.stepper_button', function (e) {
    e.preventDefault();

    var $button  = jQuery(this);
    var $stepper = $button.parents('.stepper');
    var $input   = $button.siblings('.stepper_input');
    var value    = parseFloat($input.val());
    var max      = (typeof $stepper.attr('data-max') !== 'undefined') ? $stepper.attr('data-max') : 1000000000;
    var min      = (typeof $stepper.attr('data-min') !== 'undefined') ? $stepper.attr('data-min') : 1;

    if (isNaN(value)) {
        $input.val(min);
    } else {
        // Increment
        if ($button.hasClass('stepper_button--up')) {
            if (value < max) {
                $input.val(value + 1);
            } else {
                notify.add({
                    body: 'Maximum: ' + max,
                    status: 'info'
                });
            }
        }

        // Decrement
        if ($button.hasClass('stepper_button--down')) {
            if (value > min) {
                $input.val(value - 1);
            } else {
                notify.add({
                    body: 'Minimum: ' + min,
                    status: 'info'
                });
            }
        }
    }
});
