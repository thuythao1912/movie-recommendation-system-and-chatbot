import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AdminPage from "./AdminPage";
import HomePage from "./HomePage";
export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route path="/admin" component={AdminPage} />
            <Route exact path="/" component={HomePage} />
          </Switch>
        </div>
      </Router>
    );
  }
}
