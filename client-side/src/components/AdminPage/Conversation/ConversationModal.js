import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import callApi from "../../../utils/apiCaller";
import { checkNull } from "../../../utils/helper";
export default class ConversationModal extends Component {
  constructor(props) {
    super();
    this.close = this.close.bind(this);
    this.state = {
      _id: "",
      input: "",
      intent_name: "",
      score: "",
      entities: [],
      condition: "",
      description: "",
      status: "",
      created_time: "",
      session: "",
      user: {},
      response: "",
      is_not_edit: null,
    };
  }
  close = () => {
    this.props.onClickClose();
  };
  componentDidMount() {
    let item = this.props.item_selected;
    this.setState({
      _id: item._id,
      input: item.input,
      intent_name: item.intent_name,
      score: item.score,
      entities: item.entities,
      condition: item.condition,
      description: item.description,
      status: item.status,
      created_time: item.created_time,
      session: item.session,
      user: item.user,
      response: item.response,
      is_not_edit: this.props.is_not_edit,
    });
  }

  render() {
    return (
      <Modal show={true} onHide={this.close} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {this.state.is_not_edit
              ? "Chi tiết tin nhắn"
              : "Cập nhật thông tin tin nhắn"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="table table-sm table-borderless">
            <tbody>
              <tr>
                <td width="20%">Nội dung hỏi</td>
                <td width="80%">{this.state.input}</td>
              </tr>
              <tr>
                <td width="20%">Nội dung trả lời</td>
                <td width="80%">{this.state.response}</td>
              </tr>
              <tr>
                <td width="20%">Trạng thái</td>
                <td width="80%">{this.state.status}</td>
              </tr>
              <tr>
                <td width="20%">Thời gian</td>
                <td width="80%">{this.state.created_time}</td>
              </tr>
              <tr>
                <td width="20%">Session</td>
                <td width="80%">{this.state.session}</td>
              </tr>
              <tr>
                <td width="20%">Người dùng</td>
                <td width="80%">{this.state.user.username}</td>
              </tr>
              <tr>
                <td width="20%">Tên intent</td>
                <td width="80%">{this.state.intent_name}</td>
              </tr>
              <tr>
                <td width="20%">Độ tin cậy</td>
                <td width="80%">{this.state.score}</td>
              </tr>
              <tr>
                <td width="20%">Entities</td>
                <td width="80%">
                  {this.state.entities.map((e) => {
                    return `${e.key} -  ${e.value}`;
                  })}
                </td>
              </tr>
              <tr>
                <td width="20%">Điều kiện</td>
                <td width="80%">{this.state.condition}</td>
              </tr>

              <tr>
                <td width="20%">Mô tả</td>
                <td width="80%">{this.state.description}</td>
              </tr>
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            onClick={this.update_movie}
            hidden={this.state.is_not_edit}
          >
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
