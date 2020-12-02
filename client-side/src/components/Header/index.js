import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarToggleExternalContent"
          aria-controls="navbarToggleExternalContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <Link className="navbar-brand" to="/login">
          Đăng nhập
        </Link>
        <Link className="navbar-brand" to="/register">
          Đăng ký
        </Link>
        <Link className="navbar-brand" to="/">
          Trang chủ
        </Link>
        <Link className="navbar-brand" to="/admin">
          <img src="/images/chatbot.svg" width="40" alt="" />
        </Link>
      </nav>
    );
  }
}
