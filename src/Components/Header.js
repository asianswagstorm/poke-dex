import React, { Component } from "react";
import "../styles/Header.css";


export default class Header extends Component {
  render() {
    return (
      <header className="header" style={{paddingTop:0}}>
        <div className="flex-container">
       
        <div className="header-title">  <a className="home-title" href= "/" > PokeDex App </a></div>
        </div>
      </header>
    );
  }
}
