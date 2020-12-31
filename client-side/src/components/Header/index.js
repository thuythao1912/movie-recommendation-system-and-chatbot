import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import ls from "../../utils/localStorage";
import Avatar from "react-avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
export default class Header extends Component {
  constructor(props) {
    super();
    this.state = { username: ls.getItem("username") };
  }
  set_logout = () => {
    let ans = window.confirm("Bạn có muốn đăng xuất?");
    if (ans) {
      ls.removeItem("user_login");
      ls.removeItem("username");
      ls.removeItem("user_id");
      this.setState({ username: null });
    }
  };
  componentDidMount = () => {};
  render() {
    return (
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="light"
        variant="light"
        className="fixed-top shadow "
      >
        <Navbar.Brand href="/">
          <img
            src="/images/cinema.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
            className="mr-2"
          />
          <span>Chatbot-Movie Recommendation System</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto"></Nav>
          {this.state.username != null ? (
            <div>
              <Avatar
                name={this.state.username}
                size={35}
                round="35px"
                color="#764ba2"
                className="mr-2"
                textSizeRatio={2}
              />
              <span>{this.state.username}</span>
              <FontAwesomeIcon
                icon={faSignOutAlt}
                className="text-dark mx-2"
                onClick={this.set_logout}
              />
            </div>
          ) : (
            <Nav>
              <Nav.Link href="/login">
                <div className="px-4 py-2 rounded-pill btn-chatbot">
                  <span className="text-white">Đăng nhập</span>
                </div>
              </Nav.Link>
              <Nav.Link href="/register">
                <div className="px-4 py-2 rounded-pill btn-chatbot-2">
                  <span className="text-white">Đăng ký</span>
                </div>
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
