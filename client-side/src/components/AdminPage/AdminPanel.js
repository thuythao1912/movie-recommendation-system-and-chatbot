import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class AdminPanel extends Component {
  render() {
    return (
      <ul className="p-0" style={{ minHeight: "98vh" }}>
        <Link to="/">
          <li className="list-group-item">Trang chủ</li>
        </Link>
        <Link to="/admin/train">
          <li className="list-group-item">Huấn luyện</li>
        </Link>
        <Link to="/admin/conversation">
          <li className="list-group-item">Quản lý hội thoại</li>
        </Link>
        <li className="list-group-item">
          Quản lý dữ liệu
          <ul>
            <Link to="/admin/movies">
              <li>Phim</li>
            </Link>
            <Link to="/admin/genres">
              <li>Thể loại</li>
            </Link>
            <Link to="/admin/users">
              <li>Người dùng</li>
            </Link>
            <Link to="/admin/ratings">
              <li>Đánh giá</li>
            </Link>
          </ul>
        </li>
        <Link to="/admin/login">
          <li className="list-group-item">Đăng xuất</li>
        </Link>
      </ul>
    );
  }
}
