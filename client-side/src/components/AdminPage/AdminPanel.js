import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp,
  faBook,
  faFilm,
  faHome,
  faSignOutAlt,
  faStar,
  faUser,
  faUserCog,
} from "@fortawesome/free-solid-svg-icons";
export default class AdminPanel extends Component {
  constructor(props) {
    super();
    this.state = { is_display_menu: false };
  }
  set_display_menu = () => {
    this.setState({ is_display_menu: !this.state.is_display_menu });
  };
  render() {
    return (
      <div className="" style={{ minHeight: "100vh" }}>
        <NavLink to="/admin" className="text-white text-decoration-none">
          <div className="p-3 bg-admin-menu border">Trang chủ</div>
        </NavLink>
        <NavLink
          to="/admin/train"
          className="text-white text-decoration-none"
          activeClassName="font-weight-bold"
        >
          <div className="p-3 bg-admin-menu border">Huấn luyện</div>
        </NavLink>

        <NavLink
          to="/admin/conversation"
          className="text-white text-decoration-none"
          activeClassName="font-weight-bold"
        >
          <div className="p-3 bg-admin-menu border">Quản lý tin nhắn</div>
        </NavLink>
        <div
          className="p-3 bg-admin-menu border text-white"
          onClick={this.set_display_menu}
        >
          <span className="mr-3">Quản lý dữ liệu</span>
          {this.state.is_display_menu ? (
            <FontAwesomeIcon icon={faArrowUp} />
          ) : (
            <FontAwesomeIcon icon={faArrowDown} />
          )}
        </div>
        <div
          style={{
            display: `${this.state.is_display_menu ? "block" : "none"}`,
          }}
        >
          <NavLink
            to="/admin/movies"
            className="text-decoration-none text-white"
            activeClassName="font-weight-bold"
          >
            <div className="px-5 py-3 bg-admin-menu border">
              <FontAwesomeIcon icon={faFilm} />
              <span className="mx-2">Phim</span>
            </div>
          </NavLink>
          <NavLink
            to="/admin/genres"
            className="text-decoration-none text-white"
            activeClassName="font-weight-bold"
          >
            <div className="px-5 py-3 bg-admin-menu border">
              <FontAwesomeIcon icon={faBook} />
              <span className="mx-2">Thể loại</span>
            </div>
          </NavLink>
          <NavLink
            to="/admin/users"
            className="text-decoration-none text-white"
            activeClassName="font-weight-bold"
          >
            <div className="px-5 py-3 bg-admin-menu border">
              <FontAwesomeIcon icon={faUser} />
              <span className="mx-2">Người dùng</span>
            </div>
          </NavLink>
          <NavLink
            to="/admin/ratings"
            className="text-decoration-none text-white"
            activeClassName="font-weight-bold"
          >
            <div className="px-5 py-3 bg-admin-menu border">
              <FontAwesomeIcon icon={faStar} />
              <span className="mx-2">Đánh giá</span>
            </div>
          </NavLink>
        </div>
        <NavLink
          to="/admin/login"
          className="text-decoration-none text-white"
          activeClassName="font-weight-bold"
        >
          <div className="p-3 bg-admin-menu border">
            <FontAwesomeIcon icon={faSignOutAlt} className="mx-2" />
            <span>Đăng xuất</span>
          </div>
        </NavLink>
      </div>
    );
  }
}
