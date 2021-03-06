/* TODO: [Menu] Add a 'Reset All' button to the genre filters. */
/* TODO: [Menu] Disable genre filter button when filtering would have no further effect. */
/* TODO: [Menu] Consider swapping ascending/descending on first click. */
/* TODO: [Menu] Consider storing the filter/order state in local storage. */
/* TODO: [Menu] Add a 'Status Filter' for All/Read/Reading/Unread. */
/* TODO: [Chapter] 'Continue reading'-button. */
/* TODO: [Chapter] 'Order By'-filter. */
/* TODO: [Chapter] Selection-based actions: Delete/Mark as Read/Mark as Unread. */
/* TODO: [Chapter] Add a 'number of chapters' somewhere. */
/* TODO: [Logging] Consider removing `window.history.back` in favor of an URL independent state replication. */
/* TODO: [Purity] Remove `mio.parseLocation` from anything that is supposedly stateless. */

// Series:
//  Back
//  Add
//  Download
//  Refresh
// Chapters:
//  Back
//  Delete/Empty
//  Download
//  Refresh
// Pages:
//  Back
//  Delete
//  PageOrientation
//  Filters (Image Normalisation, etc)
//  CurrentPage/NumberOfPages -> Hovering Status

'use strict';

/*
 * This file, `web/src/app.ts` is the entry point when served as a we
 * application. It mocks `require` to enable a seamless development experience.
 * When served under Cordova, the entry point is `web/src/default.ts`.
 */
(function(): void {
  if (typeof require === 'undefined') {
    let request = new XMLHttpRequest();
    request.open('GET', 'js/require.js', false);
    request.send();
    (new Function(request.responseText))();
  }
  require('./default');
})();
