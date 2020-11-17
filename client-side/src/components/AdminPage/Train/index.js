import React, { Component } from "react";
import { Link } from "react-router-dom";
import callApi from "../../../utils/apiCaller";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCog } from "@fortawesome/free-solid-svg-icons";
export default class Train extends Component {
  constructor(props) {
    super();
    this.state = {
      message: "",
      display_message: "none",
      required_fields: [["data"], ["dữ liệu"]],
      message_color: "",
      data: "",
    };
  }
  handle_upload_file = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      this.setState({ data: e.target.result });
    };
  };
  handle_input = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handle_train = () => {
    let data = this.state.data;
    if (data !== "") {
      try {
        let func_type = Object.keys(JSON.parse(data))[0];
        data = { data: JSON.parse(data) };
        callApi(`ai-service/${func_type}`, "post", data).then((res) => {
          let message = res.data.message;
          if (res.data.message_status == "success") {
            this.setState({
              // data: "",
              message: message,
              display_message: "block",
              message_color: "success",
            });
          }
        });
      } catch (err) {
        this.setState({
          message: `Dữ liệu train sai cấu trúc!`,
          display_message: "block",
          message_color: "danger",
        });
      }
    } else {
      this.setState({
        message: `Vui lòng nhập dữ liệu vào!`,
        display_message: "block",
        message_color: "danger",
      });
    }
  };
  render() {
    return (
      <div>
        <h3 className="text-dark font-weight-bold">
          TRAIN VÀ CẬP NHẬT DỮ LIỆU TRAIN
        </h3>
        <div
          className={`alert alert-${this.state.message_color} col-lg-8`}
          role="alert"
          style={{ display: this.state.display_message }}
        >
          {this.state.message}
        </div>
        <div className="row align-items-center pr-4">
          <div className="col-lg-8">
            <h5>Xem trước dữ liệu</h5>
            <textarea
              style={{ width: "100%", height: "80vh" }}
              className="form-control"
              value={this.state.data}
              onChange={this.handle_input}
              name="data"
            />
          </div>
          <div className="col-lg-4 p-0">
            <div>
              <input
                type="file"
                className="my-3 custom-file-input"
                onChange={this.handle_upload_file}
                aria-describedby="btnfile"
              />
              <label className="custom-file-label" htmlFor="btnfile">
                Chọn tệp ...
              </label>
              <button
                className="btn btn-info btn-block"
                onClick={this.handle_train}
              >
                <FontAwesomeIcon icon={faUserCog} className="mx-2" />
                <span>Train hoặc Cập nhật dữ liệu</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
