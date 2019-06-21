import React, { Component } from "react";
import "../styles/Footer.css";

export default class Footer extends Component {
  render() {
    return (
    <div className="seperator">
      <footer id="footer" className="wrapper">
      <div className="inner">
        <div className="footer-content"> 	&copy; Andy Nguyen </div>
      </div>
      </footer>
    </div>
    );
  }
}
