import * as mio from '../default';

/**
 * Represents each application action.
 * @internal
 */
export let applicationActions = {
  /**
   * Navigates back through the menu or history.
   */
  navigateBack: mio.store.reviser('APPLICATION_NAVIGATEBACK', function(state: mio.IApplicationState): void {
    if (state.menu.type !== mio.MenuType.Default) {
      state.menu.type = mio.MenuType.Default;
    } else {
      window.history.back();
    }
  }),

  /**
   * Navigates to the series.
   */
  navigateSeries: mio.store.reviser('APPLICATION_NAVIGATESERIES', async function(state: mio.IApplicationState, seriesId: number): Promise<void> {
    let location = mio.parseLocation();
    let newLocation = `#/${seriesId}`;
    if (location.seriesId.hasValue) {
      window.history.replaceState(undefined, undefined, newLocation);
      await applicationActions.refreshChapters();
    } else {
      window.history.pushState(undefined, undefined, newLocation);
      await applicationActions.refreshChapters();
    }
  }),

  /**
   * Refreshes the chapters.
   */
  refreshChapters: mio.store.reviser('APPLICATION_REFRESHCHAPTERS', async function(state: mio.IApplicationState): Promise<void> {
    /* TODO: Handle refresh chapters errors. */
    let location = mio.parseLocation();
    if (location.seriesId.hasValue) {
      setChapters({chapters: mio.option<mio.ILibraryChapter[]>(), seriesId: mio.option<number>()});
      let chapters = await mio.openActiveLibrary().listAsync(location.seriesId.value);
      setChapters({chapters: chapters, seriesId: location.seriesId});
    }
  }),

  /**
   * Refreshes the series.
   */
  refreshSeries: mio.store.reviser('APPLICATION_REFRESH', async function(state: mio.IApplicationState): Promise<void> {
    /* TODO: Handle refresh series errors. */
    setSeries(mio.option<mio.ILibrarySeries[]>());
    let series = await mio.openActiveLibrary().listAsync();
    setSeries(mio.option(series));
  })
};

/**
 * Deletes the image from cache.
 * @param seriesId The series identifier.
 */
function deleteImageFromCache(seriesId: number): void {
  let url = mio.cache[seriesId];
  if (url) {
    URL.revokeObjectURL(url);
    delete mio.cache[seriesId];
  }
}

/**
 * Sets the chapters
 * @param seriesId The series identifier.
 * @param chapters The chapters.
 */
let setChapters = mio.store.reviser('APPLICATION_SETCHAPTERS', function(state: mio.IApplicationState, revision: {chapters: mio.IOption<mio.ILibraryChapter[]>, seriesId: mio.IOption<number>}): void {
  state.chapters = revision.chapters;
  if (revision.seriesId.hasValue && mio.cache[revision.seriesId.value]) {
    deleteImageFromCache(revision.seriesId.value);
  }
});

/**
 * Sets the series
 * @param series The series.
 */
let setSeries = mio.store.reviser('APPLICATION_SETSERIES', function(state: mio.IApplicationState, series: mio.IOption<mio.ILibrarySeries[]>): void {
  state.series.all = series;
  state.series.processed = mio.processSeries(state.menu, state.series.all);
  if (!state.series.all.hasValue) {
    for (let seriesId in mio.cache) {
      deleteImageFromCache(parseInt(seriesId, 10));
    }
  }
});
