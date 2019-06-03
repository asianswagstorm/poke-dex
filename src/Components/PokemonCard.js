import React, { Component } from "react";
import "../styles/PokemonCard.css";
export default class PokemonCard extends Component {
  render() {
    return (
      <div className="col-md-3 col-sm-6 md-5">
        <div className="card">
          <div className="card-header">
            <h1> {this.props.name}</h1>
          </div>
        </div>
      </div>
    );
  }
}
