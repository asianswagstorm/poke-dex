import React, { Component } from 'react';

import PokemonCard from './PokemonCard';
import Loading from './Loading';
import axios from 'axios';

export default class Pokemons extends Component {
  state = {
    url: 'https://pokeapi.co/api/v2/pokemon/?limit=18',
    pokemon: null //where json will be saved
  };

  async componentDidMount() {
    const res = await axios.get(this.state.url); //axios similar to fetch
    //Axios is a Javascript library used to make http requests from node.js or XMLHttpRequests 
    //from the browser and it supports the Promise API that is native to JS ES6.
    // it performs automatic transforms of JSON data.
    this.setState({ pokemon: res.data['results'] });
    //result is list of pokemons with name and url 
  }

  render() {
    return (
      <div className="row">
       
         {console.log(this.state.pokemon)}
        {this.state.pokemon ? (
            <div className="row">
            {this.state.pokemon.map(pokemon => (
              <PokemonCard
                key={pokemon.name}
                name={pokemon.name}
                url={pokemon.url}
              />
            ))}
          </div>
         
        ) : (
          <Loading />
         )}
      </div>
    );
  }
}
