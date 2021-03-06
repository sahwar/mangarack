import * as mio from './default';
/* TODO: Check the bind mechanism. I'm doing binds where it should not be necessary.. */
/* TODO: Allow local connections without caring for the password. */
/* TODO: If HDD is unreachable.. bleh. */

/* TODO: Move this somewhere a little more sane. */
import {httpService} from './services/httpService';
// If none provided, stub with XHR.
try {
  mio.dependency.get<mio.IHttpService>('IHttpService')();
} catch (error) {
  mio.dependency.set('IHttpService', httpService);
}
let library = mio.option<mio.ILibrary>();
export function openActiveLibrary(): mio.ILibrary {
  if (library.hasValue) {
    return library.value;
  } else {
    throw new Error('No library is currently active.')
  }
}
// Provide library for testing purposes.
(async function() {
  library = await mio.openRemoteLibraryAsync(mio.option<string>(), mio.option<string>());
  if (library.hasValue) {
    console.log('Stand by, ready. Set up.');
    (window as any).library = library.value;
    (window as any).mio = mio;
  } else {
    console.log(':-(');
  }
})();


/**
 * Represents the preview image cache.
 */
export let cache: {[seriesId: number]: string} = {};

/**
 * Represents the application store.
 */
export let store: mio.IStore<mio.IApplicationState> = mio.createStore<mio.IApplicationState>({
  chapters: mio.option<mio.ILibraryChapter[]>(),
  menu: {genres: {}, order: {ascending: true, type: mio.OrderType.SeriesTitle}, type: mio.MenuType.Default, search: ''},
  modal: {error: mio.option<string>(), type: mio.ModalType.None},
  series: {all: mio.option<mio.ILibrarySeries[]>(), processed: mio.option<mio.ILibrarySeries[]>()}
});

/*
 * Start the application.
 */
setTimeout(function(): void {
  FastClick.attach(document.body);
  ReactDOM.render(React.createElement(mio.ApplicationController), document.body);
}, 0);
