import React, { Component } from "react";
import "../styles/PokemonCard.css";
export default class PokemonCard extends Component {
  state = {
    name: "",
    imageUrl: "",
    pokemonIndex: "",
    imageLoading: true,
    toManyRequests: false
  };

  componentDidMount() {
    const { name, url } = this.props;

    const pokemonIndex = url.split("/")[url.split("/").length - 2];
    //const imageUrl = `./sprites/pokemon/${pokemonIndex}.png`;
    const imageUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`;

    this.setState({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      imageUrl,
      pokemonIndex
    });
  }

  render() {
    return (
        // 	margin bottom mb
      <div className="col-md-3 col-sm-6 mb-5">
          <a className="link-hover" href={`Pokemon/${this.state.pokemonIndex}`}>
        <div className="card">
            <h5 className="card-index">{this.state.pokemonIndex}</h5>
             <img src={this.state.imageUrl}
             alt="some pokemon"
              onLoad={() => this.setState({ imageLoading: false })}
              onError={() => this.setState({ toManyRequests: true })}
              style=
              {this.state.toManyRequests
                ? { display: "none" }
                : this.state.imageLoading
                ? null
                : { display: "block" }}
                />
                <h3 className="card-title"> {this.state.name}</h3>
            </div>
            </a>
          </div>
    );
  }
}
