import React, { Component } from "react";
import Stats from "./Stats";
import Profile from "./Profile";
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
      let description = "A Description";
      speciesData.flavor_text_entries.some(x => {
        if (
          x.language.name === "en" &&
          x.language.url === "https://pokeapi.co/api/v2/language/9/"
        ) {
          description = x.flavor_text;
        }
        return null;
      });

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
          description: description //speciesData.flavor_text_entries[9].flavor_text
        });
      }
    } catch (error) {
      console.log("Invalid pokemon ID");
      console.log(error);
    }
  };

  render() {
    const statsData = [
      {
        stats_type: "HP",
        stats_size: this.state.hp,
        stats_number: this.state.stats.hp
      },
      {
        stats_type: "Speed",
        stats_size: this.state.speed,
        stats_number: this.state.stats.speed
      },
      {
        stats_type: "Attack",
        stats_size: this.state.attack,
        stats_number: this.state.stats.attack
      },
      {
        stats_type: "Defense",
        stats_size: this.state.defense,
        stats_number: this.state.stats.defense
      },
      {
        stats_type: "Special Attack",
        stats_size: this.state.specialAttack,
        stats_number: this.state.stats.specialAttack
      },
      {
        stats_type: "Special Defense",
        stats_size: this.state.specialDefense,
        stats_number: this.state.stats.specialDefense
      }
    ];

    const profileData = [
      {
        profile_type:"Height:",
        profile_value:`${this.state.height} cm.`,
        genderRatioTrue:false
      },
      {
        profile_type:"Weight:",
        profile_value:`${this.state.weight} lbs`,
        genderRatioTrue:false
      }];

    const allStats = statsData.map((x, index) => {
      return (
        <Stats
          key={index}
          stats_type={x.stats_type}
          stats_size={x.stats_size}
          themeColor={this.state.themeColor}
          stats_number={x.stats_number}
        />
      );
    });

    const allProfile = profileData.map((x, index) => {
      return (
        <Profile
        key={index}
        profile_type={x.profile_type}
        profile_value={x.profile_value}
        genderRatioTrue={x.genderRatioTrue}
      />
      );
    });

    return (
      <div className="col">
        <div className="card">
          <div className="card-header">
            <div className="row">
              <div className="col-5">
                {this.state.pokemonIndex} <br />
              </div>
              <div className="col-7">
                <div className="float-right">
                  {this.state.types.map(x => (
                    <span
                      key={x.type.name}
                      className="badge badge-pill mr-1"
                      style={{
                        backgroundColor: `#${TYPE_COLORS[x.type.name]}`,
                        color: "white"
                      }}
                    >
                      {x.type.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="card-body">
            <div className="row align-items-center">
              <div className=" col-md-3 ">
                <img
                  src={this.state.imageUrl}
                  alt={"A Photograph of a Pokemon"}
                  className="card-img-top rounded mx-auto mt-2"
                />
              </div>
              <div className="col-md-9">
                <h4 className="mx-auto">
                  <div className="random">{this.state.name}</div>
                </h4>
                {allStats}
              </div>
            </div>
            <div className="row mt-1">
              <div className="col">
                <p className="">{this.state.description}</p>
              </div>
            </div>
          </div>

          <div className="card-body">
            <h5 class="card-title text-center">Profile</h5>
            <div className="row">
              <div className="col-md-6">
                {allProfile}
              </div>
            </div>
          </div>
          <div class="card-footer text-muted">
            Pokemon Data Obtained From{" "}
            <a href="https://pokeapi.co/" target="_blank" className="card-link">
              PokeAPI.co
            </a>
          </div>
        </div>
      </div>
    );
  }
}
