import React, { Component } from "react";
import Messages from "./Messages";
import Input from "./Input";
import "../../App.css";
import { formatDate } from "../../../utils/helper";
import { socket } from "../../../utils/socket";
import ls from "../../../utils/localStorage";

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

export default class App extends Component {
  constructor(props) {
    super();
    this.state = {
      messages: [],
      user: {
        username: ls.getItem("username"),
        user_id: ls.getItem("user_id"),
        user_login: ls.getItem("user_login"),
      },
      session: "",
      display_chat_box: "none",
    };
  }

  componentDidMount = async () => {
    socket.emit("greeting", this.state.user);
    socket.on("greeting", (data) => {
      const messages = this.state.messages;
      let session = data.session;
      let date = formatDate(data.send_time, "dmy-hms");
      messages.push({
        text: data.text,
        user: data.user,
        created_time: date,
      });
      this.setState({ messages: messages, session: session });
    });
  };
  onSendMessage = (message) => {
    message = message.trim();
    if (message != "") {
      const messages = this.state.messages;

      let date = formatDate(new Date(), "dmy-hms");
      let timestamp = new Date().getTime();
      socket.emit("message", {
        text: message,
        user: this.state.user,
        created_time: date,
        session: this.state.session,
        timestamp: timestamp,
      });
      messages.push({
        text: message,
        user: this.state.user,
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
      <div className="col-lg-3 col-md-5 border p-0 fixed-bottom offset-lg-8 offset-md-2 bg-white">
        <div
          className="bg-chatbot p-3 text-white font-weight-bold d-flex align-items-center chat-header"
          onClick={this.displayChatBox}
        >
          <span className="mr-auto">CHATBOT NADINE</span>
          <div className="ml-auto ">
            <FontAwesomeIcon icon={faWindowMinimize} />
          </div>
        </div>
        <div style={{ display: this.state.display_chat_box }}>
          <Messages
            messages={this.state.messages}
            currentMember={this.state.user}
          />
          <Input onSendMessage={this.onSendMessage} />
        </div>
      </div>
    );
  }
}
