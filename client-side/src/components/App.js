import React, { Component } from "react";
import Messages from "./Chat/Messages";
import Input from "./Chat/Input";
import "./App.css";
import socketIOClient from "socket.io-client";
import { ENDPOINT } from "../utils/endpoint";

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
      response: "",
    };
  }

  componentDidMount() {
    socket.on("greeting", (data) => {
      const messages = this.state.messages;
      let date = `${new Date().getDate()}-${
        new Date().getMonth() + 1
      }-${new Date().getFullYear()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
      messages.push({
        text: data.text,
        member: data.member,
        created_time: date,
      });
      this.setState({ messages: messages });
    });
  }
  onSendMessage = (message) => {
    message = message.trim();
    if (message != "") {
      const messages = this.state.messages;
      let date = `${new Date().getDate()}-${
        new Date().getMonth() + 1
      }-${new Date().getFullYear()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
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

  render() {
    return (
      <div className="col-lg-6 offset-lg-3">
        <Messages
          messages={this.state.messages}
          currentMember={this.state.member}
        />
        <Input onSendMessage={this.onSendMessage} />
      </div>
    );
  }
}
