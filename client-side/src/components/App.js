import React, { Component } from "react";
import Chatbot from "./Chat";
import Header from "./Header";
export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Chatbot />
      </div>
    );
  }
}
