import React, { Component } from "react";
export default class Messages extends Component {
  render_message(message, index) {
    let { member, text } = message;
    let { currentMember } = this.props;
    let messageFromMe = member.username === currentMember.username;
    let messageClass = messageFromMe ? "message message-from-me" : "message";
    return (
      <li className={messageClass} key={index}>
        <div
          className="avatar"
          style={{ backgroundColor: message.member.color }}
        />
        <div className="message-content">
          <div className="username">{message.member.username}</div>
          <div className="text">{text}</div>
        </div>
      </li>
    );
  }
  render() {
    let { messages } = this.props;
    let { currentMember } = this.props;
    return (
      <ul className="message-list">
        {messages.map((message, index) => this.render_message(message, index))}
      </ul>
    );
  }
}
