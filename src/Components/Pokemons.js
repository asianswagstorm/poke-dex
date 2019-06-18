import React, { Component } from 'react';
import Search from "./Search";
import PokemonCard from './PokemonCard';
import Loading from './Loading';
import axios from 'axios';
import { resolve6 } from 'dns';

export default class Pokemons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      by_name : false,
      url: 'https://pokeapi.co/api/v2/pokemon/?limit=18',
      pokemon: null //where json will be saved
    };
}
  

  async componentDidMount() {
    const res = await axios.get(this.state.url); //axios similar to fetch
    //Axios is a Javascript library used to make http requests from node.js or XMLHttpRequests 
    //from the browser and it supports the Promise API that is native to JS ES6.
    // it performs automatic transforms of JSON data.
    console.log(res);
    this.setState({ pokemon: res.data['results'] });
    //result is list of pokemons with name and url 
  }

  search = (e) => {
		e.preventDefault();
		const poke = e.target.elements.pokename.value;
		if (poke !== '') {
      axios.get(`https://intern-pokedex.myriadapps.com/api/v1/pokemon?name=${poke}`)
      .then((res) =>{
        
        console.log(res.data.data);
        this.setState({pokemon: res.data.data, by_name:true});
        //Uncaught (in promise) TypeError: Cannot read property 'setState' of undefined
        
      })
      
      //this.setState({ pokemon: res});
		}
	}
//url.split("/")[url.split("/").length - 2]
  render() {
    return (
      <div>
      <div className="row">
      <div className="search"> <Search searchResult={this.search}/> </div>
      </div>
      <div className="row">
        
         {console.log(this.state.pokemon)}
        {this.state.pokemon ? (
            <div className="row">
            {this.state.pokemon.map(pokemon => (
             
              <PokemonCard
                key={pokemon.name}
                name={pokemon.name}
                url={pokemon.url}
                id = {pokemon.id}
                by_name={this.state.by_name}
              />
            ))}
          </div>
         
        ) : (
          <Loading />
         )}
      </div>
      </div>
    );
  }
}
