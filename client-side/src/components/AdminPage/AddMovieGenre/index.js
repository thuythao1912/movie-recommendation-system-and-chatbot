import React, { Component } from "react";
import AddGenre from "./AddGenre";
import AddMovie from "./AddMovie";
export default class AddMovieGenre extends Component {
  constructor(props) {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="p-0 " style={{ minHeight: "95vh" }}>
        <AddMovie />
        <AddGenre />
      </div>
    );
  }
}
