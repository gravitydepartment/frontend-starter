/**
* Gravity Department - Frontend Starter
* https://github.com/gravitydepartment/frontend-starter
*
* @author    Brendan Falkowski
* @copyright Gravity Department. All rights reserved.
*/


// ==============================================
// App UI
// ==============================================

appUi.addSafeZone('.trigger-list');
appUi.addSafeZone('.header-bar');

jQuery(document).on('appUiChange', function (e) {
    if (e.ui === 'search') {
        jQuery('#search-input').focus();
    }
});
