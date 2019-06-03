import React, { Component } from "react";
import Pokemons from './Pokemons';

export default class Home extends Component {
  render() {
    return (
        
        <div className="row">
        <div className="col">
            <div className="footer-seperator">
          <Pokemons/>
          </div>
        </div>
      </div>
      
    );
  }
}
