import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import MovieList from "./Movies";
import Header from "../Header";
import Chat from "../HomePage/Chat";
import HomePanel from "./HomePanel";
import MovieDetail from "./Movies/MovieDetail";

export default class HomePage extends Component {
  render() {
    return (
      <div className="">
        <Header />
        <div className="pb-5">
          <Route exact path="/movies" component={MovieDetail} />
          <Route exact path="/" component={MovieList} />
        </div>
        <Chat />
      </div>
    );
  }
}
