import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
export default class MovieCardRecommended extends Component {
  render() {
    let data = this.props.data;
    return (
      <div className="border mb-3">
        <div className="row m-0">
          <div className="col-lg-4 p-0">
            <img
              src={
                data.movie_images == null
                  ? "/images/movie_default.jpg"
                  : data.movie_images
              }
              width="100%"
            />
          </div>
          <div className="col-lg-8 pt-2">
            <Link to={`/movies?movie_title=${data.movie_title}`}>
              <p className="font-weight-bold justify h5">
                {data.movie_title.length > 50
                  ? data.movie_title.slice(0, 50) + "..."
                  : data.movie_title}
              </p>
            </Link>
            <span>{data.movie_genres.join(", ")}</span> <br />
            <span>{data.movie_year}</span>
          </div>
        </div>
      </div>
    );
  }
}
