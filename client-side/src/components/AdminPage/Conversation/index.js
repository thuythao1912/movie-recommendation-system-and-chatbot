import React, { Component } from "react";
import { Link } from "react-router-dom";
import ConversationList from "./ConversationList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel, faGlobe } from "@fortawesome/free-solid-svg-icons";
export default class Conversation extends Component {
  render() {
    return (
      <div>
        <h3 className="text-dark font-weight-bold">QUẢN LÝ TIN NHẮN</h3>
        <ConversationList />
      </div>
    );
  }
}
