import React, { Component } from "react";
import { faHome, faUserCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import callApi from "../../../utils/apiCaller";
import { Link } from "react-router-dom";
import { checkNull, compareString } from "../../../utils/helper";
export default class Register extends Component {
  constructor(props) {
    super();
    this.state = {
      required_fields: [
        ["user_login", "user_password", "username"],
        ["tên đăng nhập", "mật khẩu", "Tên của bạn"],
      ],
      username: "",
      user_login: "",
      user_password: "",
      is_admin: false,
      message: "",
    };
  }
  componentDidMount = () => {};
  handle_input = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  send_login = () => {
    let data = {
      user_login: this.state.user_login.toLowerCase(),
      user_password: this.state.user_password,
      username: this.state.username,
    };
    let is_null = checkNull(this.state.required_fields, data);

    if (is_null.length == 0) {
      let compare = compareString(
        data.user_password.toLowerCase(),
        data.user_login
      );
      if (compare == false) {
        callApi("users/check-login-user", "post", data).then((res) => {
          let message = res.data.message;
          let data = res.data.data;
          if (res.data.message.includes("thành công")) {
            alert(message);
            window.location.href = "/";
          } else {
            this.setState({
              message: message,
            });
          }
        });
      } else {
        this.setState({
          message: `Tên đăng nhập và mật khẩu phải khác nhau!`,
        });
      }
    } else {
      this.setState({
        message: `Vui lòng điền vào các trường: [ ${is_null.join(", ")} ] !`,
      });
    }
  };
  render() {
    return (
      <div
        style={{
          backgroundImage: `url("/images/bg-register.jpg")`,
          backgroundRepeat: "no - repeat",
          backgroundSize: "cover",
          height: "100vh",
        }}
        className="d-flex"
      >
        <div
          className="text-white bg-dark col-lg-5 text-center p-5"
          style={{ height: "450px", margin: "auto", opacity: "0.95" }}
        >
          <h3>ĐĂNG KÝ THÀNH VIÊN</h3>
          <div className="text-warning my-3">{this.state.message}</div>
          <div>
            <input
              className="form-control my-3 "
              placeholder="Tên của bạn..."
              name="username"
              onChange={this.handle_input}
            />
            <input
              className="form-control my-3 "
              placeholder="Tên đăng nhập..."
              name="user_login"
              onChange={this.handle_input}
            />
            <input
              className="form-control my-3"
              placeholder="Mật khẩu..."
              name="user_password"
              onChange={this.handle_input}
              type="password"
            />
            <Button variant="info" className="my-3" onClick={this.send_login}>
              Đăng ký
            </Button>
            <Link className="text-white" to="/login">
              <p>Đã có tài khoản? Đăng nhập ngay!</p>
            </Link>
            <Link className="text-white" to="/">
              <p>
                <FontAwesomeIcon icon={faHome} className="mx-2" />
                Trang chủ
              </p>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}