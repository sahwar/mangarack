import * as express from 'express';
import * as mio from '../default';

/**
 * Promises to set the number of read pages status.
 * @internal
 * @param request The request.
 * @param response The response.
 * @param library The library.
 * @return The promise to set the number of read pages status.
 */
export default async function(request: express.Request, response: express.Response, library: mio.ILibrary): Promise<void> {
  let seriesId = request.params.seriesId as number;
  let chapterId = request.params.chapterId as number;
  let numberOfReadPages = mio.option(parseInt(request.body.numberOfReadPages, 10));
  if (!numberOfReadPages.hasValue) {
    response.sendStatus(400);
  } else {
    let result = await library.status(seriesId, chapterId).runAsync(numberOfReadPages.value);
    if (result) {
      response.sendStatus(200);
    } else {
      response.sendStatus(404);
    }
  }
}
