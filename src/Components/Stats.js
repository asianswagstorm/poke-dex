import React, { Component } from "react";

export default class Stats extends Component {

    render = () => {

    const stats_type = this.props.stats_type;
    const stats_size = this.props.stats_size;
    const stats_number = this.props.stats_number;
    const themeColor = this.props.themeColor;

    return (
        <div className="row align-items-center">
    <div className="col-12 col-md-3">{stats_type}</div>
    <div className="col-12 col-md-9">
      <div className="progress">
        <div
          className="progress-bar "
          role="progressbar"
          style={{
            width: `${stats_size}%`,
            backgroundColor: `#${themeColor}`
          }}
          aria-valuenow="25"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <small>{stats_number}</small>
        </div>
      </div>
    </div>
  </div>
    );
    }
}