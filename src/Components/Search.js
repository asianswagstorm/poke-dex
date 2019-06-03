import React, { Component } from "react";

export default class Search extends Component {
  render() {
    return (
      <div>
        <form>
          <input placeholder="Search Pokemon"  className="form-control mx-auto" />
        </form>
      </div>
    );
  }
}
