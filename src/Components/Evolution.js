import React, { Component } from "react";

export default class Evolution extends Component {
  render = () => {
    return (
      <div>
        <div className="row justify-content-center">
          <div className="col order-first">
            Stage 1: <br></br>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                this.props.stage1ID
              }.png`}
              alt={"A Photograph of a Stage 1 Pokemon"}
            /> <br></br>
            {this.props.stage1}
          </div>
            
          <div className="col">
            Stage 2: <br></br>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                this.props.stage2ID
              }.png`}
              alt={"A Photograph of a Stage 2 Pokemon"}
            /> <br></br>
            {this.props.stage2}
          </div>
          
          <div className="col order-last"> 
            Stage 3: <br></br>
              <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                this.props.stage3ID
              }.png`}
              alt={"A Photograph of a Stage 3 Pokemon"}
            /> <br></br>
            {this.props.stage3}
          </div>
        </div>
      </div>
    );
  };
}
