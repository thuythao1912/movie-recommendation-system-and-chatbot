import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faSignOutAlt,
  faUserCog,
} from "@fortawesome/free-solid-svg-icons";
export default class AdminPanel extends Component {
  render() {
    return (
      <ul className="p-0 " style={{ minHeight: "98vh" }}>
        <NavLink to="/" className="text-dark text-decoration-none">
          <li className="list-group-item">Trang chủ</li>
        </NavLink>
        <NavLink
          to="/admin/train"
          className="text-decoration-none text-dark"
          activeClassName="font-weight-bold"
        >
          <li className="list-group-item">Huấn luyện</li>
        </NavLink>
        <NavLink
          to="/admin/conversation"
          className="text-decoration-none text-dark"
          activeClassName="font-weight-bold"
        >
          <li className="list-group-item">Quản lý tin nhắn</li>
        </NavLink>
        <li className="list-group-item">
          Quản lý dữ liệu
          <ul>
            <NavLink
              to="/admin/movies"
              className="text-decoration-none text-dark"
              activeClassName="font-weight-bold"
            >
              <li>Phim</li>
            </NavLink>
            <NavLink
              to="/admin/genres"
              className="text-decoration-none text-dark"
              activeClassName="font-weight-bold"
            >
              <li>Thể loại</li>
            </NavLink>
            <NavLink
              to="/admin/users"
              className="text-decoration-none text-dark"
              activeClassName="font-weight-bold"
            >
              <li>Người dùng</li>
            </NavLink>
            <NavLink
              to="/admin/ratings"
              className="text-decoration-none text-dark"
              activeClassName="font-weight-bold"
            >
              <li>Đánh giá</li>
            </NavLink>
          </ul>
        </li>
        <NavLink
          to="/admin/login"
          className="text-decoration-none text-dark"
          activeClassName="font-weight-bold"
        >
          <li className="list-group-item">
            <FontAwesomeIcon icon={faSignOutAlt} className="mx-2" />
            <span>Đăng xuất</span>
          </li>
        </NavLink>
      </ul>
    );
  }
}
