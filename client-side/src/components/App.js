import React, { Component } from "react";
import Messages from "./Chat/Messages";
import Input from "./Chat/Input";
import "./App.css";
import socketIOClient from "socket.io-client";
import { ENDPOINT } from "../utils/endpoint";
import { formatDate } from "../utils/helper";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowMinimize } from "@fortawesome/free-solid-svg-icons";

function get_name() {
  let names = ["Thảo", "Chiến", "Đức", "Voi"];
  console.log();
  let index = Math.floor(Math.random() * names.length);
  console.log(names[index]);
  return names[index];
}

function get_color() {
  let colors = ["red", "green", "yellow"];
  console.log();
  let index = Math.floor(Math.random() * colors.length);
  return colors[index];
}
let socket = socketIOClient(ENDPOINT);
export default class App extends Component {
  constructor(props) {
    super();

    this.state = {
      messages: [],
      member: {
        username: get_name(),
        color: get_color(),
      },
      display_chat_box: "none",
    };
  }

  componentDidMount = () => {
    socket.on("greeting", (data) => {
      const messages = this.state.messages;
      let date = formatDate(data.send_time, "dmy-hms");
      messages.push({
        text: data.text,
        member: data.member,
        created_time: date,
      });
      this.setState({ messages: messages });
    });
  };
  onSendMessage = (message) => {
    message = message.trim();
    if (message != "") {
      const messages = this.state.messages;
      let date = formatDate(new Date(), "dmy-hms");
      socket.emit("message", {
        text: message,
        member: this.state.member,
        created_time: date,
      });
      messages.push({
        text: message,
        member: this.state.member,
        created_time: date,
      });
      this.setState({ messages: messages });
    }
  };

  displayChatBox = () => {
    this.state.display_chat_box === "none"
      ? this.setState({ display_chat_box: "block" })
      : this.setState({ display_chat_box: "none" });
  };

  render() {
    return (
      <div className="col-lg-3 col-md-5 border p-0 fixed-bottom offset-lg-8 offset-md-2">
        <div
          className="bg-danger px-3 py-2 text-white font-weight-bold d-flex align-items-center chat-header"
          onClick={this.displayChatBox}
        >
          <span className="mr-auto">CHATBOT</span>
          <div className="ml-auto">
            <button className="btn btn-danger">
              <FontAwesomeIcon icon={faWindowMinimize} />
            </button>
          </div>
        </div>
        <div style={{ display: this.state.display_chat_box }}>
          <Messages
            messages={this.state.messages}
            currentMember={this.state.member}
          />
          <Input onSendMessage={this.onSendMessage} />
        </div>
      </div>
    );
  }
}
