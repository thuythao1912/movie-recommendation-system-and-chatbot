import React, { Component } from "react";
import { Link } from "react-router-dom";
import UserList from "./UserList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {} from "@fortawesome/free-solid-svg-icons";
import Statistics from "../Statistics";

export default class Users extends Component {
  constructor(props) {
    super();
    this.state = { re_render: true };
  }
  re_render = () => {
    this.setState({ re_render: !this.state.re_render });
  };
  render() {
    return (
      <div className="bg-light">
        <h3 className="text-dark font-weight-bold">
          QUẢN LÝ DỮ LIỆU NGƯỜI DÙNG
        </h3>
        <div className="col-lg-11 p-0">
          <Statistics re_render={this.state.re_render} />
        </div>
        <UserList re_render={this.re_render} />
      </div>
    );
  }
}
