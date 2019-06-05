import React, { Component } from "react";
import "./Search";
import "../styles/Header.css";
import Search from "./Search";

export default class Header extends Component {
  render() {
    return (
      <header className="header" style={{paddingTop:0}}>
        <div className="flex-container">
        <div className="search"> <Search/> </div>
        <div className="header-title">  <a className="home-title" href= "/" > PokeDex App </a></div>
        </div>
      </header>
    );
  }
}
