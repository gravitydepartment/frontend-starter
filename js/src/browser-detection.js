/**
* Gravity Department - Frontend Starter
* https://github.com/gravitydepartment/frontend-starter
*
* @author    Brendan Falkowski
* @copyright Gravity Department. All rights reserved.
*/


// ==============================================
// Show browser support warning
// ==============================================

if (
    userAgent.isOldIos()
    || userAgent.isOldAndroid()
    || userAgent.isOldIe()
) {
    jQuery('.browser-warning').show();
}


// ==============================================
// Enable click events to bubble to the "document" in iOS Safari.
// ==============================================

// See: http://gravitydept.com/blog/js-click-event-bubbling-on-ios
// See: /css/src/core/reset/_gravdept-shame.scss
// See: /js/src/vendor/gravdept/user-agent.js

if (userAgent.isIos()) {
    jQuery('html').addClass('is-ios');
}
