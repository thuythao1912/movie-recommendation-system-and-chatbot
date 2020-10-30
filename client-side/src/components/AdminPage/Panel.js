import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class Panel extends Component {
  render() {
    return (
      <ul className="p-0">
        <Link to="/">
          <li className="list-group-item">Trang chủ</li>
        </Link>
        <Link to="/admin/train">
          <li className="list-group-item active">Huấn luyện</li>
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
          </ul>
        </li>
      </ul>
    );
  }
}
