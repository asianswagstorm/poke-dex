import React, { Component } from "react";
import "../styles/PokemonCard.css";
import spinner from './spinner.gif';
export default class PokemonCard extends Component {
  state = {
    name: "",
    imageUrl: "",
    pokemonIndex: "",
    imageLoading: true,
    toManyRequests: false
  };

  componentDidMount() {
    const { name, url ,id} = this.props;
    
    const pokemonIndex = (this.props.by_name==false) ? url.split("/")[url.split("/").length - 2] : id;
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
      <div className="col">
          <a className="link-hover" href={`Pokemon/${this.state.pokemonIndex}`}>
        <div className="card">
            <h5 className="card-header">{this.state.pokemonIndex}</h5>
            {this.state.imageLoading ? (
              <img
                src={spinner}
                style={{ width: '5em', height: '5em' }}
                className="card-img-top rounded mx-auto d-block mt-2"
              />
            ) : null}
             <img src={this.state.imageUrl}
             alt="some pokemon"
              onLoad={() => this.setState({ imageLoading: false })}
              onError={() => this.setState({ toManyRequests: true })}
              style=
              {(this.state.toManyRequests
                ? { display: "none" }
                : this.state.imageLoading
                ? null
                : { display: "block" }) }
                />
                 {this.state.toManyRequests ? (
              <h6 className="mx-auto">
                <span className="badge badge-danger mt-2">
                  Too Many Requests
                </span>
              </h6>
            ) : null}
                 <div className="card-body mx-auto">
                <h3 className="card-title"> {this.state.name}</h3>
                </div>
            </div>
            </a>
          </div>
    );
  }
}
