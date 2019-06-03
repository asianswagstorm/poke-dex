import React, { Component } from "react";
import Pokemons from "./Pokemons";
import background from "../images/background.png";
export default class Home extends Component {
  render() {
    return (
      <div className="footer-seperator">
        <div id="wrapper" style={{ background: `url(${background})` }}>
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
