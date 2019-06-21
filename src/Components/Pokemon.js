import React, { Component } from "react";
import Stats from "./Stats";
import Profile from "./Profile";
import Evolution from "./Evolution";
import Axios from "axios";
import spinner from './spinner.gif';

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
  grass: "7CFC00",
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
    habitat: "",
    evolution_url: "",
    evolution_data: "",
    stage1: "",
    stage1ID: "",
    stage2: "",
    stage2ID: "",
    stage3: "",
    stage3ID: "",
    themeColor: "#EF5350",
    imageLoading: true
  };

  componentDidMount = async () => {
    try {
      let capitalize_firstLetter = string =>
        string
          .toLowerCase()
          .charAt(0)
          .toUpperCase() + string.slice(1);

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
      let types = poke.types.map(type => type.type.name);
      let themeColor = `${TYPE_COLORS[types[types.length - 1]]}`;
      let pokemon_name = capitalize_firstLetter(poke.name);
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

      let catchRate = Math.round(speciesData.capture_rate * (100 / 255));
      let femaleRate = speciesData.gender_rate;
      let genderRatioFemale = 12.5 * femaleRate;
      let genderRatioMale = 12.5 * (8 - femaleRate);

      let evs = poke.stats
        .filter(stat => (stat.effort > 0 ? true : false))
        .map(
          stat =>
            `${stat.effort} ${stat.stat.name
              .toLowerCase()
              .split("-")
              .map(s => capitalize_firstLetter(s))
              .join(" ")}`
        )
        .join(", ");

      let egg_groups = speciesData.egg_groups.map(x =>
        capitalize_firstLetter(x.name)
      );
      let abilities = poke.abilities.map(x =>
        x.ability.name
          .split("-")
          .map(s => capitalize_firstLetter(s))
          .join(" ")
      );
      let habitat = (speciesData.habitat != null) ? capitalize_firstLetter(speciesData.habitat.name) : "Not Available" ;
      //Initial hatch counter: one must walk 255 × (hatch_counter + 1) steps before this Pokémon's egg hatches, unless utilizing bonuses like Flame Body's.
      let hatchSteps = 255 * speciesData.hatch_counter;

      let evolution_url = speciesData.evolution_chain.url;
      let evolution_data =
        evolution_url !== ""
          ? await Axios.get(
              `https://cors-anywhere.herokuapp.com/${evolution_url}`
            )
          : "not found";

      const data_json =
        evolution_url !== "" ? evolution_data.data.chain : pokemon_name;
      console.log(data_json);

      let stage1 = capitalize_firstLetter(data_json.species.name);
      console.log("stage1 " + stage1);
      let stage1ID = data_json.species.url.split("/")[6];

      let stage2 = (data_json.evolves_to[0] != null) ? capitalize_firstLetter(data_json.evolves_to[0].species.name) : "None";
      console.log("stage2 " + stage2);
      let stage2ID = (data_json.evolves_to[0] != null) ? data_json.evolves_to[0].species.url.split("/")[6] : 0;

      
      let stage3 = (data_json.evolves_to[0] != null) ? (( (data_json.evolves_to[0].evolves_to[0] != null) ) ? capitalize_firstLetter(
        data_json.evolves_to[0].evolves_to[0].species.name) : "None") : "None" ;
      console.log("stage3 " + stage3);
      let stage3ID = (data_json.evolves_to[0] != null) ? (( (data_json.evolves_to[0].evolves_to[0] != null) ) ? data_json.evolves_to[0].evolves_to[0].species.url.split(
        "/")[6] : 0) : 0 ;

      poke.length === 0
        ? this.setState({ message: "No such Pokemon Found" })
        : this.setState({
            pokemonIndex: poke.id,
            name: pokemon_name,
            height: poke.height * 10,
            weight: Math.round(poke.weight * (2.20462 / 10)),
            imageUrl: `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`,
            stats: poke.stats,
            hp: poke.stats[5].base_stat,
            attack: poke.stats[4].base_stat,
            defense: poke.stats[3].base_stat,
            speed: poke.stats[0].base_stat,
            specialAttack: poke.stats[2].base_stat,
            specialDefense: poke.stats[1].base_stat,
            types: poke.types,
            themeColor: themeColor,
            description: description, //speciesData.flavor_text_entries[9].flavor_text
            catchRate: catchRate,
            eggGroups: egg_groups,
            habitat: habitat,
            hatchSteps: hatchSteps,
            abilities: abilities,
            genderRatioFemale: genderRatioFemale,
            genderRatioMale: genderRatioMale,
            evolution_url: evolution_url,
            evolution_data: JSON.stringify(data_json),
            stage1: stage1,
            stage2: stage2,
            stage3: stage3,
            stage1ID: stage1ID,
            stage2ID: stage2ID,
            stage3ID: stage3ID,
            evs: evs
          });
    } catch (error) {
      console.log("Invalid pokemon ID");
      console.log(error);
    }
  };

  render() {
    const gender_ratio = (
      <div className="progress">
        <div
          className="progress-bar"
          role="progressbar"
          style={{
            width: `${this.state.genderRatioFemale}%`,
            backgroundColor: "#FF69B4"
          }}
          aria-valuenow="15"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <small>{this.state.genderRatioFemale}</small>
        </div>
        <div
          className="progress-bar"
          role="progressbar"
          style={{
            width: `${this.state.genderRatioMale}%`,
            backgroundColor: "#1976d2"
          }}
          aria-valuenow="30"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <small>{this.state.genderRatioMale}</small>
        </div>
      </div>
    );

    const statsData = [
      {
        stats_type: "HP",
        stats_size: this.state.hp,
      },
      {
        stats_type: "Speed",
        stats_size: this.state.speed,
      },
      {
        stats_type: "Attack",
        stats_size: this.state.attack,
      },
      {
        stats_type: "Defense",
        stats_size: this.state.defense,
      },
      {
        stats_type: "Special Attack",
        stats_size: this.state.specialAttack,
      },
      {
        stats_type: "Special Defense",
        stats_size: this.state.specialDefense,
      }
    ];

    const profileData = [
      {
        profile_type: "Height:",
        profile_value: `${this.state.height} cm.`,
        genderRatioTrue: false
      },
      {
        profile_type: "Weight:",
        profile_value: `${this.state.weight} lbs`,
        genderRatioTrue: false
      },
      {
        profile_type: "Capture Rate:",
        profile_value: `${this.state.catchRate} %`,
        genderRatioTrue: false
      },
      {
        profile_type: "Gender Ratio:",
        profile_value: gender_ratio,
        genderRatioTrue: true
      },
      {
        profile_type: "Egg Group:",
        profile_value: `${this.state.eggGroups}`,
        genderRatioTrue: false
      },
      {
        profile_type: "Hatch Steps:",
        profile_value: `${this.state.hatchSteps}`,
        genderRatioTrue: false
      },
      {
        profile_type: "Habitat:",
        profile_value: `${this.state.habitat}`,
        genderRatioTrue: false
      },
      {
        profile_type: "Abilities:",
        profile_value: `${this.state.abilities}`,
        genderRatioTrue: false
      },
      {
        profile_type: "Effort Values:",
        profile_value: `${this.state.evs}`,
        genderRatioTrue: false
      }
    ];

    const allStats = statsData.map((x, index) => {
      return (
        <Stats
          key={index}
          stats_type={x.stats_type}
          stats_size={x.stats_size}
          themeColor={this.state.themeColor}
        />
      );
    });

    const rightProfile = profileData
      .slice(0, profileData.length / 2)
      .map((x, index) => {
        return (
          <Profile
            key={index}
            profile_type={x.profile_type}
            profile_value={x.profile_value}
            genderRatioTrue={x.genderRatioTrue}
          />
        );
      });

    const leftProfile = profileData
      .slice(profileData.length / 2, profileData.length)
      .map((x, index) => {
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
        <div className="pokemon-data">
        <div className="card">
          <div className="card-header">
            <div className="row">
              <div className="col-5">{this.state.pokemonIndex}</div>
              <div className="col-7">
    
                <a href={(this.state.pokemonIndex >= 2) ? `/Pokemon/${this.state.pokemonIndex - 1}` : `/Pokemon/807`} className= "button is-pulled-left"> prev</a>
                <a href={(this.state.pokemonIndex < 807) ? `/Pokemon/${this.state.pokemonIndex + 1}` : `/Pokemon/1`} className= "button is-pulled-right"> next</a>
               
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
              {this.state.imageLoading ? (
              <img
                src={spinner}
                alt={"loading gif"}
                style={{ width: '5em', height: '5em' }}
                className="card-img-top rounded mx-auto d-block mt-2"
              />
            ) : null}
                <img
                  src={this.state.imageUrl}
                  alt={"A Photograph of a Pokemon"}
                  onLoad={() => this.setState({ imageLoading: false })}
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
            <h5 className="card-title text-center">Profile</h5>
            <div className="row">
              <div className="col-md-6">{rightProfile}</div>
              <div className="col-md-6">{leftProfile}</div>
            </div>
          </div>

          <div className="card-body">
            <h5 className="card-title text-center">Evolution</h5>
           <div className= "evolution-chart"  style={{alignContent: "end"}}>
           
                {this.state.evolution_data ? (
                 
                  <Evolution
                    stage1={this.state.stage1}
                    stage2={this.state.stage2}
                    stage3={this.state.stage3}
                    stage1ID={this.state.stage1ID}
                    stage2ID={this.state.stage2ID}
                    stage3ID={this.state.stage3ID}
                  />
                ) : (
                  <div
                    className="loader"
                    style={{ width: "50px", height: "50px" }}
                  />
                )}
                
             </div>
          </div>
          <div className="card-footer text-muted">
            Pokemon Data Obtained From{" "}
            <a
              href="https://pokeapi.co/"
              target="_blank"
              rel="noopener noreferrer"
              className="card-link"
            >
              PokeAPI.co
            </a>
          </div>
        </div>
        </div>
      </div>
    );
  }
}
