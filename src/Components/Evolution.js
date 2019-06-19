import React, { Component } from "react";
import arrow from "./arrow.png";

export default class Evolution extends Component {
  render = () => {
    return (
      <div>
        <div className="row justify-content-center">
          <div className="col lg-5">
            <strong>Stage 1: </strong> <br />
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                this.props.stage1ID
              }.png`}
              alt={"A Photograph of a Stage 1 Pokemon"}
            />{" "}
            <br />
            <strong>{this.props.stage1}</strong>
          </div>

          <div className="col lg-5">
            <img
              src={arrow}
              alt={"arrow"}
              style={{ width: "70px", height: "50px", margin: "50px" }}
            />
          </div>

          <div className="col lg-5">
            <strong>Stage 2: </strong> <br />
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                this.props.stage2ID
              }.png`}
              alt={"A Photograph of a Stage 2 Pokemon"}
            />{" "}
            <br />
            <strong>{this.props.stage2}</strong>
          </div>

          <div className="col lg-5">
            <img
              src={arrow}
              alt={"arrow"}
              style={{ width: "70px", height: "50px", margin: "50px" }}
            />
          </div>
          <div className="col lg-5">
            <strong>Stage 3: </strong> <br />
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                this.props.stage3ID
              }.png`}
              alt={"A Photograph of a Stage 3 Pokemon"}
            />
            <br />
            <strong>{this.props.stage3}</strong>
          </div>
        </div>
      </div>
    );
  };
}
