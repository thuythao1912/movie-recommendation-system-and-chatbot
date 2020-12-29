import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
export default class Header extends Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/">
          <img
            src="/images/cinema.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
            className="mr-2"
          />
          <span>Chatbot-Movie Recommend System</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto"></Nav>
          <Nav>
            <Nav.Link href="/login" className="text-white">
              Đăng nhập
            </Nav.Link>
            <Nav.Link href="/register" className="text-white">
              Đăng ký
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      // <nav className="navbar navbar-dark bg-dark">
      //   <button
      //     className="navbar-toggler"
      //     type="button"
      //     data-toggle="collapse"
      //     data-target="#navbarToggleExternalContent"
      //     aria-controls="navbarToggleExternalContent"
      //     aria-expanded="false"
      //     aria-label="Toggle navigation"
      //   >
      //     <span className="navbar-toggler-icon"></span>
      //   </button>
      //   <Link className="navbar-brand" to="/login">
      //     Đăng nhập
      //   </Link>
      //   <Link className="navbar-brand" to="/register">
      //     Đăng ký
      //   </Link>
      //   <Link className="navbar-brand" to="/">
      //     Trang chủ
      //   </Link>
      //   <Link className="navbar-brand" to="/admin">
      //     <img src="/images/chatbot.svg" width="40" alt="" />
      //   </Link>
      // </nav>
    );
  }
}
