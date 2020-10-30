import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import Movies from "./Movies";
import Genres from "./Genres";
import Panel from "./Panel";
import Train from "./Train";
import Conversation from "./Conversation";
export default class AdminPage extends Component {
  render() {
    return (
      <div className="row m-0">
        <div className="col-lg-2 pl-0 col-md-3 col-sm-4">
          <Panel />
        </div>
        <div className="col-lg-10 border col-md-9 col-sm-8 p-4">
          <Route exact path="/admin/movies" component={Movies} />
          <Route exact path="/admin/train" component={Train} />
          <Route exact path="/admin/genres" component={Genres} />
          <Route exact path="/admin/conversation" component={Conversation} />
        </div>
      </div>
    );
  }
}
