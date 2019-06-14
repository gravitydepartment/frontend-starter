/**
* Gravity Department - Frontend Starter
* https://github.com/gravitydepartment/frontend-starter
*
* @author    Brendan Falkowski
* @copyright Gravity Department. All rights reserved.
*/


// **********************************************
// GravDept:
// Initialize UI components with configuration used sitewide.
// **********************************************


// ==============================================
// App UI
// ==============================================

appUi.init();


// ==============================================
// Modal
// ==============================================

document.addEventListener('click', function (e) {
    if (e.target && e.target.closest('[data-modal-trigger]')) {
        e.preventDefault();

        var trigger = e.target.closest('[data-modal-trigger]');
        var config  = {};
        var modal   = trigger.getAttribute('data-modal-trigger');
        var width   = trigger.getAttribute('data-modal-width');

        config.content = document.querySelector('[data-modal="' + modal + '"]').innerHTML;

        if (width) {
            config.width = width;
        }

        new Modal(config);
    }
});


// ==============================================
// Notify
// ==============================================

notify.init({
    positionX: 'right',
    positionY: 'bottom'
});


// ==============================================
// Video
// ==============================================

if (jQuery().fitVids) {
    var $videos = jQuery('.video');

    if ($videos.length) {
        $videos.fitVids();
    }
}
