import React, { Component } from 'react';

export default class NoResults extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="no-results">
        <h5 className="no-results-text">No Results for {this.props.searchQuery}</h5>
        </div>
      </React.Fragment>
    );
  }
}
