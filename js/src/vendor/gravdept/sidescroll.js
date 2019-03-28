/**
* Gravity Department - Frontend Starter
* https://github.com/gravitydepartment/frontend-starter
*
* @author     Brendan Falkowski
* @copyright  Gravity Department. All rights reserved.
*/


// ==============================================
// Sidescroll
// ==============================================

// Dependency: enquire.js

var sidescroll = {
    init: function () {
        jQuery('[data-sidescroll]').each(function () {
            var $self      = jQuery(this);
            var breakpoint = $self.attr('data-sidescroll');

            enquire.register('only screen and (min-width: ' + breakpoint + 'px)', {
                setup: function () {
                    if (matchMedia('(min-width: ' + breakpoint + 'px)').matches) {
                        $self.attr('data-sidescroll', '');
                    } else {
                        $self.attr('data-sidescroll', 'scroll');
                    }
                },
                match: function () {
                    $self.attr('data-sidescroll', '');
                },
                unmatch: function () {
                    $self.attr('data-sidescroll', 'scroll');
                    $self.find('.sidescroll_liner').first().scrollLeft(0);
                }
            });
        });
    }
};

sidescroll.init();
