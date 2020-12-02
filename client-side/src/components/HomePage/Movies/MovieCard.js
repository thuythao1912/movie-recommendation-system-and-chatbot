import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
export default class MovieCard extends Component {
  render() {
    let data = this.props.data;
    return (
      <div className="p-2">
        <Card style={{ width: "20rem", height: "450px" }}>
          <Card.Img
            variant="top"
            src={
              data.movie_images == null
                ? "/images/movie_default.jpg"
                : data.movie_images
            }
          />
          <Card.Body>
            <Card.Title>
              {data.movie_title.length > 40
                ? data.movie_title.slice(0, 40) + "..."
                : data.movie_title}
            </Card.Title>
            <Card.Text>
              <span className="font-weight-bold justify">Thể loại: </span>
              {data.movie_genres.join(", ")}
            </Card.Text>
            <Link to={`/movies?movie_title=${data.movie_title}`}>
              <Button variant="outline-primary">
                <FontAwesomeIcon icon={faPlusCircle} className="mr-2" />
                <span>Xem thêm</span>
              </Button>
            </Link>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
