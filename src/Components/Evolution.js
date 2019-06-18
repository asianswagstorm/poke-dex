import React, { Component } from "react";

export default class Evolution extends Component {

    render = () => {

        return(
          <div>
               Stage 1: <img src= {`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.props.stage1ID}.png`} />  {this.props.stage1} <br>
               </br>
               Stage 2:  <img src= {`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.props.stage2ID}.png`} />{this.props.stage2} <br>
               </br>
               Stage 3:  <img src= {`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.props.stage3ID}.png`} /> {this.props.stage3} 
             
          </div>
        );
    }
}
