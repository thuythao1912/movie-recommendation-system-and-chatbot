import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import { Carousel } from "react-bootstrap";

export default class SlideShow extends Component {
  render() {
    return (
      <Carousel style={{ display: this.props.is_slideshow ? "block" : "none" }}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/caroussel/c11.png"
            alt="First slide"
            height="550px"
          />
          <Carousel.Caption>
            <h3>NỮ HOÀNG BĂNG GIÁ 2</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/caroussel/c22.png"
            alt="First slide"
            height="550px"
          />
          <Carousel.Caption>
            <h3>NGƯỜI ĐẸP VÀ QUÁI VẬT</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/caroussel/c33.png"
            alt="First slide"
            height="550px"
          />
          <Carousel.Caption>
            <h3>DOREAMON</h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }
}
