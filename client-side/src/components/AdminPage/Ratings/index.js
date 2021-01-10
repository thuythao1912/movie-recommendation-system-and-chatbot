import React, { Component } from "react";
import { Link } from "react-router-dom";
import RatingList from "./RatingList";
import Statistics from "../Statistics";

export default class Ratings extends Component {
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
          QUẢN LÝ DỮ LIỆU ĐÁNH GIÁ PHIM
        </h3>
        <div className="col-lg-11 p-0">
          <Statistics re_render={this.state.re_render} />
        </div>
        <RatingList re_render={this.re_render} />
      </div>
    );
  }
}
