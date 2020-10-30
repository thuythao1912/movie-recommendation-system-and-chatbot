import React, { Component } from "react";
export default class MovieGenre extends Component {
  render() {
    return (
      <div className="d-flex justify-content-between bg-white pr-0">
        <div className="col-lg-6 btn border media px-4 mr-3">
          <img
            src="/images/cinema.png"
            width="70px"
            className="align-self-center"
          />
          <div class="media-body">
            <h3 class="mt-0">10.000</h3>
            <p>phim</p>
          </div>
        </div>
        <div className="col-lg-6 btn border media px-4">
          <img
            src="/images/font.png"
            width="70px"
            className="align-self-center"
          />
          <div class="media-body">
            <h3 class="mt-0">19</h3>
            <p>thể loại</p>
          </div>
        </div>
      </div>
    );
  }
}
