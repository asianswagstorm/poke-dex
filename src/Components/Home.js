import React, { Component } from "react";
import Pokemons from "./Pokemons";

export default class Home extends Component {
  render() {
    return (
      <div className="footer-seperator">
        <div id="wrapper" >
          <div className="row">
            <div className="col">
              <Pokemons />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
