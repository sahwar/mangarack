import * as mio from '../default';

/**
 * Represents a series list component.
 */
export class SeriesListComponent extends mio.StatelessComponent<{series: mio.ILibrarySeries[]}> {
  /**
   * Renders the component.
   */
  public render(): JSX.Element {
    return (
      <div className="seriesList">
        {(() => {
          if (!this.props.series.length) {
            return <span className="none">No series available.</span>;
          } else {
            return <span>{this.props.series.map(series => <mio.SeriesListItemComponent series={series} />)}</span>;
          }
        })()}
      </div>
    );
  }
}
