import React, { Component } from "react";
export default class Messages extends Component {
  render_message(message, index) {
    let { member, text, created_time } = message;
    let { currentMember } = this.props;
    let messageFromMe = member.username === currentMember.username;
    let messageClass = messageFromMe
      ? "d-flex flex-row-reverse"
      : "d-flex flex-row message";
    let messageContent = messageFromMe
      ? "message message-sending"
      : "message message-coming";
    return (
      <div className={messageClass} key={index}>
        <div>
          <div className="created_time">{created_time}</div>
          <div className={`${messageContent} shadow-sm p-2 rounded`}>
            {text}
          </div>
        </div>
      </div>
    );
  }
  render() {
    let { messages } = this.props;
    let { currentMember } = this.props;
    return (
      <div className="message-list">
        {messages.map((message, index) => this.render_message(message, index))}
      </div>
    );
  }
}
