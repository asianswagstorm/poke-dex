import React, { Component } from "react";
import Stats from "./Stats";
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
      const pokeData = await Axios.get(
        //transforms data into JSON
        `https://cors-anywhere.herokuapp.com/${pokemonLink}`
      );
      const pokeSpecies = await fetch(
        `https://cors-anywhere.herokuapp.com/${pokemonSpeciesLink}`
      );
      const speciesData = await pokeSpecies.json();
      const poke = pokeData.data;
      const types = poke.types.map(type => type.type.name);
      const themeColor = `${TYPE_COLORS[types[types.length - 1]]}`;
      console.log(poke);
      console.log(speciesData);
      let description = "A Description" ; 
      speciesData.flavor_text_entries.some(x =>{
        if(x.language.name === "en" && x.language.url==="https://pokeapi.co/api/v2/language/9/"){
          description = x.flavor_text;
        }
      })

      if (poke.length === 0) {
        this.setState({ message: "No such Pokemon Found" });
      } else {
        this.setState({
          pokemonIndex: poke.id,
          name: poke.name,
          height: poke.height * 10,
          weight: poke.weight,
          imageUrl: poke.sprites.front_default,
          stats: poke.stats,
          hp: poke.stats[5].base_stat,
          attack: poke.stats[4].base_stat,
          defense: poke.stats[3].base_stat,
          speed: poke.stats[0].base_stat,
          specialAttack: poke.stats[2].base_stat,
          specialDefense: poke.stats[1].base_stat,
          types: poke.types,
          themeColor: themeColor,
          description: description//speciesData.flavor_text_entries[9].flavor_text
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
                {this.state.pokemonIndex} <br />
                <br /> Weight: {this.state.weight} lbs
                <br />
                Height: {this.state.height} cm
              </div>
              <div className="col-7">
                <div className="float-right">
                  {this.state.types.map(type => (
                    <span
                      key={type}
                      className="badge badge-pill mr-1"
                      style={{
                        backgroundColor: `#${TYPE_COLORS[type]}`,
                        color: "white"
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card-body" style={{ backgroundColor: "white" }}>
          <div className="row align-items-center">
            <div className=" col-md-3 ">
              <img
                src={this.state.imageUrl}
                className="card-img-top rounded mx-auto mt-2"
              />
            </div>
            <div className="col-md-9">
              <h4 className="mx-auto">
                <div className="random">{this.state.name}</div>
              </h4>
            <Stats stats_type={"HP"} stats_size = {this.state.hp} themeColor = {this.state.themeColor} stats_number= {this.state.stats.hp}/>
            <Stats stats_type={"Speed"} stats_size = {this.state.speed} themeColor = {this.state.themeColor} stats_number= {this.state.stats.speed}/>
            <Stats stats_type={"Attack"} stats_size = {this.state.attack} themeColor = {this.state.themeColor} stats_number= {this.state.stats.attack}/>
            <Stats stats_type={"Defense"} stats_size = {this.state.defense} themeColor = {this.state.themeColor} stats_number= {this.state.stats.defense}/>
            <Stats stats_type={"Special Attack"} stats_size = {this.state.specialAttack} themeColor = {this.state.themeColor} stats_number= {this.state.stats.specialAttack}/>
            <Stats stats_type={"Special Defense"} stats_size = {this.state.specialDefense} themeColor = {this.state.themeColor} stats_number= {this.state.stats.specialDefense}/>
           
            </div>
          </div>
          <div className="row mt-1" >
              <div className="col" style={{ backgroundColor: "white" }}>
                <p className="">{this.state.description}</p>
              </div>
            </div>
        </div>
      </div>
    );
  }
}
