import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import callApi from "../../../utils/apiCaller";
import { checkNull } from "../../../utils/helper";
export default class GenreModal extends Component {
  constructor(props) {
    super();
    this.close = this.close.bind(this);
    this.state = {
      genre_id: "",
      _id: "",
      genre_name: "",
      genre_description: [],
      message: "",
      display_message: "none",
      required_fields: [["genre_name"], ["tên thể loại"]],
      message_color: "",
    };
  }
  close = () => {
    this.props.onClickClose();
  };
  componentDidMount() {
    let item = this.props.item_selected;
    this.setState({
      _id: item._id,
      genre_name: item.genre_name,
      genre_description: item.genre_description,
      genre_id: item.genre_id,
    });
    this.get_genre_list();
  }
  handle_input = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  get_genre_list = async () => {
    //get genre list
    let genre_list = [];
    await callApi("genres", "get").then((res) => {
      genre_list = res.data;
    });
    this.setState({
      genre_list: genre_list,
    });
  };
  update_movie = async () => {
    let data = {
      _id: this.state._id,
      genre_name: this.state.genre_name,
      genre_description: this.state.genre_description,
      genre_id: this.state.genre_id,
    };

    if (typeof data.genre_description == "string") {
      data.genre_description = data.genre_description.split(",");
    }
    for (let i = 0; i < data.genre_description.length; i++) {
      data.genre_description[i] = data.genre_description[i].trim();
    }

    let is_null = checkNull(this.state.required_fields, data);

    if (is_null.length == 0) {
      callApi(`genres/${data._id}`, "put", { data: data }).then((res) => {
        let message = res.data.message;
        if (message.includes("thành công")) {
          this.setState({
            message: message,
            display_message: "block",
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
  render() {
    return (
      <Modal show={true} onHide={this.close} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Cập nhật thông tin thể loại</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
          <table className="table table-sm table-borderless">
            <tbody>
              <tr>
                <td width="20%">Mã thể loại</td>
                <td width="80%">{this.state.genre_id}</td>
              </tr>
              <tr>
                <td>Tên thể loại</td>
                <td>
                  <input
                    placeholder="Tựa phim (bắt buộc)"
                    className="form-control form-control-sm"
                    required
                    onChange={this.handle_input}
                    name="genre_name"
                    value={this.state.genre_name}
                  />
                </td>
              </tr>
              <tr>
                <td>Mô tả</td>
                <td>
                  <input
                    placeholder="Mô tả"
                    className="form-control form-control-sm"
                    onChange={this.handle_input}
                    name="genre_description"
                    value={this.state.genre_description}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={this.update_movie}>
            Lưu
          </Button>
          <Button onClick={this.close} variant="danger">
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
