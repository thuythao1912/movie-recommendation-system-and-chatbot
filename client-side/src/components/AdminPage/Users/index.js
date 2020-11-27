import React, { Component } from "react";
import { Link } from "react-router-dom";
import UserList from "./UserList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileExcel,
  faGlobe,
  faPlusSquare,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
export default class Users extends Component {
  constructor(props) {
    super();
  }
  render() {
    return (
      <div className="bg-light">
        <h3 className="text-dark font-weight-bold">
          QUẢN LÝ DỮ LIỆU NGƯỜI DÙNG
        </h3>
        <UserList />
      </div>
    );
  }
}
