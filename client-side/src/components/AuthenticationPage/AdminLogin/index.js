import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { faHome, faUserCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import callApi from "../../../utils/apiCaller";
import { Link } from "react-router-dom";
import ls from "../../../utils/localStorage";
import { checkNull, compareString } from "../../../utils/helper";
export default class AdminLogin extends Component {
  constructor(props) {
    super();
    this.state = {
      required_fields: [
        ["admin_login", "admin_password"],
        ["tên đăng nhập", "mật khẩu"],
      ],
      admin_login: "",
      admin_password: "",
      message: "",
    };
  }
  componentDidMount = () => {
    ls.removeItem("is_admin");
  };
  handle_input = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  send_login = () => {
    let data = {
      admin_login: this.state.admin_login,
      admin_password: this.state.admin_password,
    };
    let is_null = checkNull(this.state.required_fields, data);

    if (is_null.length == 0) {
      if (data.admin_login == "admin" && data.admin_password == "admin@123") {
        alert("Đăng nhập thành công!");
        ls.setItem("is_admin", true);
        window.location.href = "/admin";
      } else {
        this.setState({
          message: `Sai tên đăng nhập hoặc mật khẩu!`,
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
          backgroundRepeat: "no - repeat",
          backgroundSize: "cover",
          height: "100vh",
          backgroundImage: `url("/images/bg-login-admin.jfif")`,
        }}
        className="d-flex"
      >
        <div
          className="text-white bg-dark col-lg-4 text-center offset-lg-3 p-5"
          style={{ height: "400px", margin: "auto", opacity: "0.85" }}
        >
          <h3>ĐĂNG NHẬP ADMIN</h3>
          <div className="text-warning my-3">{this.state.message}</div>
          <div>
            <input
              className="form-control my-3 rounded-pill"
              placeholder="Tên đăng nhập..."
              name="admin_login"
              onChange={this.handle_input}
              onKeyPress={(e) => (e.key == "Enter" ? this.send_login() : "")}
            />
            <input
              className="form-control my-3 rounded-pill"
              placeholder="Mật khẩu..."
              name="admin_password"
              onChange={this.handle_input}
              type="password"
              onKeyPress={(e) => (e.key == "Enter" ? this.send_login() : "")}
            />

            <Button
              variant="info"
              className="my-3 rounded-pill"
              onClick={this.send_login}
            >
              Đăng nhập
            </Button>
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
