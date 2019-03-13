/**
* Gravity Department - Frontend Starter
* https://github.com/gravitydepartment/frontend-starter
*
* @author     Brendan Falkowski
* @copyright  Gravity Department. All rights reserved.
*/


// ==============================================
// Tab Carousel
// ==============================================

// See: https://github.com/OwlFonk/OwlCarousel/issues/550

var tabCarousel = {
    /**
     * @param {object} $carousel - jQuery object
     */
    updatePagination: function ($carousel) {
        var $images = $carousel.find('.owl-item img');
        var $pages  = $carousel.find('.owl-page');
        var titles  = [];
        var i       = 0;

        // Set pagination count
        $carousel.attr('data-tab-carousel-count', $images.length);

        // Get titles from image "alt" attributes.
        $images.each(function () {
            titles.push(jQuery(this).attr('alt'));
        });

        // Apply titles to ".owl-page" elements
        $pages.each(function () {
            jQuery(this).append(titles[i]);
            i++;
        });
    }
};
