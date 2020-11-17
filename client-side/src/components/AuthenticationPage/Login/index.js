import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { faHome, faUserCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import callApi from "../../../utils/apiCaller";
import { Link } from "react-router-dom";
import ls from "../../../utils/localStorage";
import { checkNull, compareString } from "../../../utils/helper";
export default class Login extends Component {
  constructor(props) {
    super();
    this.state = {
      required_fields: [
        ["user_login", "user_password"],
        ["tên đăng nhập", "mật khẩu"],
      ],
      user_login: "",
      user_password: "",
      message: "",
    };
  }
  componentDidMount = () => {
    ls.removeItem("user_login");
    ls.removeItem("username");
    ls.removeItem("user_id");
  };
  handle_input = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  send_login = () => {
    let data = {
      user_login: this.state.user_login,
      user_password: this.state.user_password,
    };
    let is_null = checkNull(this.state.required_fields, data);

    if (is_null.length == 0) {
      callApi("users/check-login-user", "post", data).then((res) => {
        let message = res.data.message;
        let data = res.data.data;
        if (res.data.message.includes("thành công")) {
          alert(message);
          ls.setItem("user_login", data.user_login);
          ls.setItem("username", data.username);
          ls.setItem("user_id", data.user_id);
          window.location.href = "/";
        } else {
          this.setState({
            message: message,
          });
        }
      });
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
          backgroundImage: `url("/images/bg-login.jpeg")`,
          backgroundRepeat: "no - repeat",
          backgroundSize: "cover",
          height: "100vh",
        }}
        className="d-flex"
      >
        <div
          className="text-white bg-dark col-lg-4 text-center offset-lg-3 p-5"
          style={{ height: "400px", margin: "auto", opacity: "0.85" }}
        >
          <h3>ĐĂNG NHẬP</h3>
          <div className="text-warning my-3">{this.state.message}</div>
          <div>
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
              Đăng nhập
            </Button>
            <Link className="text-white" to="/register">
              <p>Đăng ký thành viên</p>
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
