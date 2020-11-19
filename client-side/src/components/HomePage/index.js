import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import MovieList from "./Movies";
import Header from "../Header";
import Chat from "../HomePage/Chat";
import HomePanel from "./HomePanel";

export default class HomePage extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="pb-5">
          <Route path="/" component={MovieList} />
        </div>
        <Chat />
      </div>
    );
  }
}
