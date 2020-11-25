import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
export default class Input extends Component {
  constructor(props) {
    super();
    this.state = { text: "" };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange = (e) => {
    this.setState({ text: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ text: "" });
    this.props.onSendMessage(this.state.text);
  };
  render() {
    return (
      <div className="mt-auto py-2">
        <form onSubmit={(e) => this.onSubmit(e)} className="form">
          <input
            onChange={(e) => this.onChange(e)}
            value={this.state.text}
            type="text"
            placeholder="Bạn hãy hỏi mình nha ..."
            autoFocus={true}
            className="form-control mx-2 input"
          />
          <button className="btn btn-chatbot">
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </form>
      </div>
    );
  }
}
