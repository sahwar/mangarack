import * as mio from '../default';

/**
 * Represents each application action.
 * @internal
 */
export let modalActions = {
  /**
   * Adds a series to the library.
   * @param reviser The address.
   */
  addSeries: wrapAsync('MODAL_ADDSERIES', async function(state: mio.IApplicationState, address: string): Promise<void> {
    let seriesId = await mio.openActiveLibrary().create().runAsync(address);
    if (seriesId.hasValue) {
      /* TODO: Redirect to seriesId instead of refreshing (which is temporary to actually give me feedback). */
      mio.applicationActions.refreshSeries();
      modalActions.setType(mio.ModalType.None);
    } else {
      throw new Error(`Invalid series address: ${address}`);
    }
  }),

  /**
   * Toggles the pending state.
   */
  toggleIsPending: mio.store.reviser('MODAL_TOGGLEISPENDING', function(state: mio.IApplicationState): void {
    state.modal.isPending = !state.modal.isPending;
  }),

  /**
   * Sets the type.
   * @param revisor The type.
   */
  setType: mio.store.reviser('MODAL_SETTYPE', function(state: mio.IApplicationState, modalType: mio.ModalType): void {
    state.modal.type = modalType;
  }),
};

/**
 * Wraps the reviser in a pending toggle and error handler.
 * @param name The name.
 * @param reviser The reviser.
 */
function wrapAsync<T>(name: string, reviser: mio.IStoreReviserWithParameter<mio.IApplicationState, T>): (revision: T) => void {
  return mio.store.reviser(name, async function(state: mio.IApplicationState, revision: T): Promise<void> {
    try {
      modalActions.toggleIsPending();
      await reviser(state, revision);
    } catch (error) {
      state.modal.error = error;
    } finally {
      modalActions.toggleIsPending();
    }
  });
}
