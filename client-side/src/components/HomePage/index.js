import React, { Component } from "react";
import Header from "../Header";
import Chat from "../HomePage/Chat";
export default class HomePage extends Component {
  render() {
    return (
      <div>
        <Header />
        <Chat />
      </div>
    );
  }
}
