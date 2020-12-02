import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AdminPage from "./AdminPage";
import Login from "./AuthenticationPage/Login";
import Register from "./AuthenticationPage/Register";
import HomePage from "./HomePage";
import AdminRoute from "./Routes/AdminRoute";
import AdminLogin from "./AuthenticationPage/AdminLogin";
export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route exact path="/admin/login" component={AdminLogin} />
            <AdminRoute path="/admin" component={AdminPage} />
            <Route path="/" component={HomePage} />
          </Switch>
        </div>
      </Router>
    );
  }
}
