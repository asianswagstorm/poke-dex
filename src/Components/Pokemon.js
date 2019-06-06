import React, { Component } from "react";
import Axios from "axios";

const TYPE_COLORS = {
  bug: "B1C12E",
  dark: "4F3A2D",
  dragon: "755EDF",
  electric: "FCBC17",
  fairy: "F4B1F4",
  fighting: "823551D",
  fire: "E73B0C",
  flying: "A3B3F7",
  ghost: "6060B2",
  grass: "74C236",
  ground: "D3B357",
  ice: "A3E7FD",
  normal: "C8C4BC",
  poison: "934594",
  psychic: "ED4882",
  rock: "B9A156",
  steel: "B5B5C3",
  water: "3295F6"
};

export default class Pokemon extends Component {
  state = {
    name: "",
    pokemonIndex: "",
    imageUrl: "",
    types: [],
    description: "",
    statTitleWidth: 3,
    statBarWidth: 9,
    stats: {
      hp: "",
      attack: "",
      defense: "",
      speed: "",
      specialAttack: "",
      specialDefense: ""
    },
    height: "",
    weight: "",
    eggGroups: "",
    catchRate: "",
    abilities: "",
    genderRatioMale: "",
    genderRatioFemale: "",
    evs: "",
    hatchSteps: "",
    themeColor: "#EF5350"
  };

  componentDidMount = async () => {
    try {
      const { pokemonIndex } = this.props.match.params;
      const pokemonSpeciesLink = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}`;
      const pokemonLink = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}`;
      const poke = await Axios.get(
        //transforms data into JSON
        `https://cors-anywhere.herokuapp.com/${pokemonLink}`
      );
      const pokeSpecies = await fetch(
        `https://cors-anywhere.herokuapp.com/${pokemonSpeciesLink}`
      );
      const jsonData = await pokeSpecies.json();
      console.log(poke);
      if (poke.data.length === 0) {
        this.setState({ message: "No such Pokemon Found" });
      } else {
        this.setState({
          pokemonIndex: poke.data.id,
          name: poke.data.name,
          height: poke.data.height * 10,
          weight: poke.data.weight,
          imageUrl: poke.data.sprites.front_default 
        });
      }
    } catch (error) {
      console.log("Invalid pokemon ID");
      console.log(error);
    }
  };

  render() {
    return (
     
      <div className="col">
        <div className="card">
          <div className="card-header">
            <div className="row">
              <div className="col-5">
                <div className="random">
                
                  {this.state.pokemonIndex} <br />
                 <br /> Weight: {this.state.weight} lbs<br />
                  Height: {this.state.height} cm
                </div>
                <div className="col-7">
                <div className="float-right" >

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      <div className="card-body">
        <div className="row align-items-center">
          <div className=" col-md-3 ">
            <img src={this.state.imageUrl} className="card-img-top rounded mx-auto mt-2" />
          </div>
          <div className="col-md-9">
            <h4 className="mx-auto">
            <div className="random">{this.state.name}</div>
              </h4>
          </div>
        </div>
      </div>


      </div>       
    );
  }
}
