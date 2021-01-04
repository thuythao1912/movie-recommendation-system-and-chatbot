import React, { Component } from "react";
import { Link } from "react-router-dom";
import callApi from "../../utils/apiCaller";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleUp,
  faPlus,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
export default class HomePanel extends Component {
  constructor(props) {
    super();
    this.state = { data: [], selected_genre: "" };
  }
  get_genre_list() {
    callApi("genres", "get").then((res) => {
      this.setState({ data: res.data });
    });
  }
  componentDidMount() {
    this.get_genre_list();
  }
  render() {
    let data = this.state.data;
    let elGenre = data.map((item, index) => {
      return (
        <li
          className={`list-group-item list-group-item-action ${
            item.genre_name == this.state.selected_genre
              ? "bg-item-chatbot"
              : ""
          }`}
          onClick={() => {
            this.props.select_genre(item.genre_name);
            this.setState({ selected_genre: item.genre_name });
          }}
          key={index}
        >
          {item.genre_name}
        </li>
      );
    });
    return (
      <ul className="p-0 position-relative" style={{ minHeight: "98vh" }}>
        <li
          className="list-group-item text-white h5"
          style={{
            backgroundImage:
              "linear-gradient(to left, #00c6fb 0%, #005bea 100%)",
          }}
        >
          <span>THỂ LOẠI</span>
        </li>
        {elGenre}
        <li
          className={`list-group-item list-group-item-action ${
            "" == this.state.selected_genre ? "bg-item-chatbot" : ""
          }`}
          onClick={() => {
            this.props.select_genre("");
            this.setState({ selected_genre: "" });
          }}
        >
          Tất cả
        </li>
      </ul>
    );
  }
}
