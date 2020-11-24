import React, { Component } from "react";
export default class Messages extends Component {
  render_message(message, index) {
    let { user, text, created_time } = message;
    let messageFromMe = user.username !== "chatbot";
    let messageClass = messageFromMe
      ? "d-flex flex-row-reverse"
      : "d-flex flex-row message";
    let messageContent = messageFromMe
      ? "message message-sending"
      : "message message-coming";

    return (
      <div className={messageClass} key={index}>
        {messageFromMe ? (
          ""
        ) : (
          <img src="/images/chatbot.svg" width="40px" className="mx-2" />
        )}
        <div>
          <div className="created_time">{created_time}</div>
          <div className={`${messageContent} shadow-sm p-2 rounded`}>
            {text}
          </div>
        </div>
      </div>
    );
  }
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }
  render() {
    let { messages } = this.props;

    return (
      <div>
        <div className="message-list px-3">
          {messages.map((message, index) =>
            this.render_message(message, index)
          )}
          <div
            ref={(el) => {
              this.messagesEnd = el;
            }}
          />
        </div>
      </div>
    );
  }
}
