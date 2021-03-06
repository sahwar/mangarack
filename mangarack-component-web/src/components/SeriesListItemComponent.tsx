import * as mio from '../default';

/**
 * Represents a series list item component.
 */
export class SeriesListItemComponent extends mio.StatelessComponent<{series: mio.ILibrarySeries}> {
  /**
   * Renders the component.
   */
  public render(): JSX.Element {
    let numberOfUnreadChapters = this.props.series.numberOfChapters - this.props.series.numberOfReadChapters;
    return (
      <div className="seriesListItem" key={this.props.series.id} onClick={() => mio.applicationActions.navigateSeries(this.props.series.id)}>
        <div className="push"></div>
        <div className="seriesListItemBody">
          {(() => {
            if (numberOfUnreadChapters > 0) {
              return <div className="numberOfUnreadChapters">{numberOfUnreadChapters}</div>;
            } else {
              return null;
            }
          })()}
          <div className="title">{this.props.series.metadata.title}</div>
          <mio.LazyComponent className="preview">
            <mio.SeriesImageComponent id={this.props.series.id} />
          </mio.LazyComponent>
          <div className="provider">{this.props.series.providerName}</div>
        </div>
      </div>
    );
  }
}
