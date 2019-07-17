import React, { Component } from "react";
import Search from "./Search";
import PokemonCard from "./PokemonCard";
import NoResults from "./NoResults";
import axios from "axios";

export default class Pokemons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      by_name: false,
      url: "https://pokeapi.co/api/v2/pokemon/?limit=", //807
      num_of_pokemon: 12,
      pokemon: null,
      isLoading: false,
      searchQuery: "",
      tracker: 0 //where json will be saved
    };
  }

  async componentDidMount() {
    const res = await axios.get(
      `${this.state.url}${this.state.num_of_pokemon}`
    ); //axios similar to fetch
    //Axios is a Javascript library used to make http requests from node.js or XMLHttpRequests
    //from the browser and it supports the Promise API that is native to JS ES6.
    // it performs automatic transforms of JSON data.
    // console.log(res);
    this.setState({ pokemon: res.data["results"] });
    //result is list of pokemons with name and url
    document.addEventListener("scroll", this.trackScrolling);
  }

  componentWillUnmount() {
    document.removeEventListener("scroll", this.trackScrolling);
  }

  trackScrolling = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      console.log("you're at the bottom of the page");
      this.setState({
        isLoading: true,
        error: undefined,
        tracker: this.state.tracker + this.state.num_of_pokemon
      });
      
      setTimeout( () => this.loadMore(), 1000);

      //show loading spinner and make fetch request to api
    }
  };

  loadMore = () => {

    fetch(`${this.state.url}${this.state.tracker + this.state.num_of_pokemon}`)
      .then(res => res.json())
      .then(
        res => {
          this.setState({
            pokemon: res.results,
            cursor: res.cursor,
            isLoading: false
          });
        },
        error => {
          this.setState({ isLoading: false, error });
        }
      );
    this.setState({ isLoading: false, error: undefined });
  };

  search = e => {
    e.preventDefault();
    const poke = e.target.elements.pokename.value;
    if (poke !== "") {
      axios
        .get(
          `https://intern-pokedex.myriadapps.com/api/v1/pokemon?name=${poke}`
        )
        .then(res => {
          console.log('response',res.data.data);
          if((res.data.data).length === 0 ){
            this.setState({ searchQuery: poke });
          }
          this.setState({ pokemon: res.data.data, by_name: true });
        });
    }
    document.removeEventListener("scroll", this.trackScrolling);
  };

  render() {
    return (
      <div>
        <div className="row">
          <div className="search">
            {" "}
            <Search searchResult={this.search} />{" "}
          </div>
        </div>
        <div className="row 50% uniform">
          {/* {console.log("pokemons", this.state.pokemon)} */}
          {/* {console.log("pokemons array size", (this.state.pokemon !== null) ? (this.state.pokemon).length : 0)} */}
          {(this.state.pokemon && (this.state.pokemon).length > 0) ? (
            <div className="row 50% uniform">
              {this.state.pokemon.map(pokemon => (
                <PokemonCard
                  key={pokemon.name}
                  name={pokemon.name}
                  url={pokemon.url}
                  id={pokemon.id}
                  by_name={this.state.by_name}
                />
                
              ))}
              
            </div>
          ) : (
            <NoResults searchQuery = {this.state.searchQuery}/>
          )}
        </div>
      </div>
    );
  }
}
