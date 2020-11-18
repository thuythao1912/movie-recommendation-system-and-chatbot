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
        <div className="row m-0">
          <div className="col-lg-2 pl-0">
            <HomePanel />
          </div>
          <div className="col-lg-10 ">
            <Route path="/" component={MovieList} />
          </div>
        </div>
        <Chat />
      </div>
    );
  }
}
