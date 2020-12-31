import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import Movies from "./Movies";
import Genres from "./Genres";
import Panel from "./AdminPanel";
import Train from "./Train";
import Conversation from "./Conversation";
import AddMovieGenre from "./AddMovieGenre";
import Users from "./Users";
import Ratings from "./Ratings";
import AdminRoute from "../Routes/AdminRoute";
import AddMovie from "./AddMovieGenre/AddMovie";
import AddGenre from "./AddMovieGenre/AddGenre";

export default class AdminPage extends Component {
  render() {
    return (
      <div className="row m-0">
        <div className="col-lg-2 p-0 col-md-3 col-sm-4 ">
          <Panel />
        </div>
        <div className="col-lg-10 col-md-9 col-sm-8 p-3 bg-light">
          <AdminRoute exact path="/admin/movies" component={Movies} />
          <AdminRoute exact path="/admin/train" component={Train} />
          <AdminRoute exact path="/admin/genres" component={Genres} />
          <AdminRoute exact path="/admin/users" component={Users} />
          <AdminRoute
            exact
            path="/admin/conversation"
            component={Conversation}
          />
          <AdminRoute exact path="/admin/add-movie" component={AddMovie} />
          <AdminRoute exact path="/admin/add-genre" component={AddGenre} />
          <AdminRoute exact path="/admin/ratings" component={Ratings} />
        </div>
      </div>
    );
  }
}
