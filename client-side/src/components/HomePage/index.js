import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import MovieList from "./Movies";
import Header from "../Header";
import Chat from "../HomePage/Chat";
import MovieDetail from "./Movies/MovieDetail";

export default class HomePage extends Component {
  render() {
    return (
      <div className="">
        <Header />
        <div className="pt-2 pb-5" style={{ marginTop: "70px" }}>
          <Route exact path="/movies" component={MovieDetail} />
          <Route exact path="/" component={MovieList} />
        </div>
        <Chat />
      </div>
    );
  }
}
