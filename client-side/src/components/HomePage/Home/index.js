import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Button, Pagination, Carousel } from "react-bootstrap";
import HomePanel from "../HomePanel";

export default class Home extends Component {
  render() {
    return (
      <div>
        <div className="row m-0">
          <div className="col-lg-2 pl-0"></div>
          <div className="col-lg-10">
            <Carousel className="mt-3">
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
          </div>
        </div>
      </div>
    );
  }
}
