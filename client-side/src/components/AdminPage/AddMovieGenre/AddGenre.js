import React, { Component } from "react";
import callApi from "../../../utils/apiCaller";
import { checkNull } from "../../../utils/helper";
export default class AddGenre extends Component {
  constructor(props) {
    super();
    this.state = {
      _id: "",
      genre_name: "",
      genre_description: [],
      message: "",
      display_message: "none",
      required_fields: [["genre_name"], ["tên thể loại"]],
      message_color: "",
    };
  }
  async componentDidMount() {
    //get genre list
    let genre_list = [];
    await callApi("genres", "get").then((res) => {
      genre_list = res.data;
    });
    this.setState({
      genre_list: genre_list,
    });
  }

  send_data = async () => {
    let data = {
      genre_name: this.state.genre_name,
      genre_description: this.state.genre_description,
    };

    if (typeof data.genre_description == "string") {
      data.genre_description = data.genre_description.split(",");
    }
    for (let i = 0; i < data.genre_description.length; i++) {
      data.genre_description[i] = data.genre_description[i].trim();
    }

    let is_null = checkNull(this.state.required_fields, data);

    if (is_null.length == 0) {
      console.log(data);
      callApi("genres", "post", { data: [data] }).then((res) => {
        let message = res.data.message;
        if (message.includes("thành công")) {
          this.setState({
            message: message,
            display_message: "block",
            genre_name: "",
            message_color: "success",
          });
        } else {
          this.setState({
            message: message,
            display_message: "block",
            message_color: "danger",
          });
        }
      });
    } else {
      this.setState({
        message: `Vui lòng điền vào các trường: [ ${is_null.join(", ")} ] !`,
        display_message: "block",
        message_color: "danger",
      });
    }
  };
  handle_input = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  reset_data = () => {
    this.setState({
      genre_description: [],
      genre_name: "",
      genre_description: [],
      message_color: "success",
      message: "",
      display_message: "none",
    });
  };

  render() {
    return (
      <div className="p-0">
        <h3 className="text-dark font-weight-bold">THÊM THỂ LOẠI</h3>
        <div className="p-3 bg-white border">
          <div className="row px-3">
            <div className="col-lg-12 pr-3 pl-0">
              <div
                className={`alert alert-${this.state.message_color}`}
                role="alert"
                style={{ display: this.state.display_message }}
              >
                {this.state.message}
              </div>
            </div>
          </div>

          <div className="">
            <div className="row px-3">
              <div className="col-lg-3 pr-3 pl-0">
                <input
                  placeholder="Thể loại (bắt buộc)"
                  className="form-control"
                  required
                  onChange={this.handle_input}
                  name="genre_name"
                  value={this.state.genre_name}
                />
              </div>
              <div className="col-lg-9 row align-items-center">
                <input
                  placeholder="Mô tả"
                  className="form-control"
                  onChange={this.handle_input}
                  name="genre_description"
                  value={this.state.genre_description}
                />
              </div>
            </div>
          </div>
          <div className="row p-3">
            <button className="btn btn-success mr-3" onClick={this.send_data}>
              Thêm
            </button>
            <button className="btn btn-danger" onClick={this.reset_data}>
              Hủy
            </button>
          </div>
        </div>
      </div>
    );
  }
}
