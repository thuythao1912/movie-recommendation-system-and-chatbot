import React, { Component } from "react";
import { socket } from "../../../utils/socket";
export default class AddGenre extends Component {
  constructor(props) {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="p-0">
        <h3>THÊM THỂ LOẠI</h3>
      </div>
    );
  }
}
