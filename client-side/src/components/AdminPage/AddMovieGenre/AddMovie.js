import React, { Component } from "react";
import callApi from "../../../utils/apiCaller";
import { checkNull } from "../../../utils/helper";
export default class AddMovie extends Component {
  constructor(props) {
    super();
    this.state = {
      genre_list: [],
      movie_genres: [],
      movie_description: [],
      movie_title: "",
      movie_year: "",
      movie_actors: "",
      movie_producers: "",
      movie_trailer: "",
      movie_overview: "",
      movie_images: "",
      message: "",
      display_message: "none",
      required_fields: [["movie_title"], ["tựa phim"]],
      message_color: "",
    };
  }

  async componentDidMount() {
    //get genre list
    let genre_list = [];
    await callApi("genres", "get").then((res) => {
      genre_list = res.data;
    });
    this.setState({
      genre_list: genre_list,
    });
  }

  send_data = async () => {
    let data = {
      movie_genres: this.state.movie_genres,
      movie_title: this.state.movie_title,
      movie_year: this.state.movie_year,
      movie_actors: this.state.movie_actors,
      movie_producers: this.state.movie_producers,
      movie_description: this.state.movie_description,
      movie_trailer: this.state.movie_trailer,
      movie_overview: this.state.movie_overview,
      movie_images: this.state.movie_images,
    };

    if (typeof data.movie_description == "string") {
      data.movie_description = data.movie_description.split(",");
    }
    for (let i = 0; i < data.movie_description.length; i++) {
      data.movie_description[i] = data.movie_description[i].trim();
    }

    let is_null = checkNull(this.state.required_fields, data);

    if (is_null.length == 0) {
      console.log(data);
      callApi("movies", "post", { data: [data] }).then((res) => {
        let message = res.data.message;
        if (message.includes("thành công")) {
          this.setState({
            message: message,
            display_message: "block",
            movie_genres: [],
            movie_title: "",
            movie_year: "",
            movie_actors: "",
            movie_producers: "",
            movie_description: [],
            movie_trailer: "",
            movie_overview: "",
            movie_images: "",
            message_color: "success",
          });
        } else {
          this.setState({
            message: message,
            display_message: "block",
            message_color: "danger",
          });
        }
      });
    } else {
      this.setState({
        message: `Vui lòng điền vào các trường: [ ${is_null.join(", ")} ] !`,
        display_message: "block",
        message_color: "danger",
      });
    }
  };

  select_genres = (e) => {
    let arr = [...this.state.movie_genres];
    if (!arr.includes(e.target.value) && e.target.value != -1) {
      arr.push(e.target.value);
      this.setState({ movie_genres: arr });
    }
  };
  remove_genre = (genre) => {
    this.state.movie_genres.splice(this.state.movie_genres.indexOf(genre), 1);
    this.setState({ movie_genres: this.state.movie_genres });
  };

  handle_input = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  reset_data = () => {
    this.setState({
      movie_genres: [],
      movie_title: "",
      movie_year: "",
      movie_actors: "",
      movie_producers: "",
      message: "",
      display_message: "none",
    });
  };

  render() {
    let genre_list = this.state.genre_list;
    let elGenre = genre_list.map((item, index) => {
      return <option key={index}>{item.genre_name}</option>;
    });
    let movie_genres = this.state.movie_genres;
    let elMovieGenres = movie_genres.map((item, index) => {
      return (
        <button className="btn btn-info mr-3 mb-3" key={index}>
          {item}
          <span
            className="badge badge-light badge-pill ml-2"
            onClick={() => this.remove_genre(item)}
          >
            x
          </span>
        </button>
      );
    });
    let year = 2020;
    let elMovieYear = [];
    for (let i = year; i >= 1950; i--) {
      elMovieYear.push(<option>{i}</option>);
    }
    return (
      <div className="p-0">
        <h3>THÊM PHIM</h3>
        <div className="row px-3">
          <div className="col-lg-12 pr-3 pl-0">
            <div
              className={`alert alert-${this.state.message_color}`}
              role="alert"
              style={{ display: this.state.display_message }}
            >
              {this.state.message}
            </div>
          </div>
        </div>

        <div className="">
          {/* <form> */}
          <div className="row px-3">
            <div className="col-lg-6 row align-items-center">
              <input
                placeholder="Tựa phim (bắt buộc)"
                className="form-control"
                required
                onChange={this.handle_input}
                name="movie_title"
                value={this.state.movie_title}
              />
            </div>
            <div className="col-lg-4 pr-0">
              <input
                placeholder="Tên khác"
                className="form-control"
                onChange={this.handle_input}
                name="movie_description"
                value={this.state.movie_description}
              />
            </div>
            <div className="col-lg-2 px-3 pl-0">
              <select
                className="form-control"
                onChange={this.handle_input}
                name="movie_year"
                value={this.state.movie_year}
              >
                <option value={-1}>Năm sản xuất</option>
                {elMovieYear}
              </select>
            </div>
          </div>
          <div className="row p-3">
            <div className="col-lg-3 row">
              <input
                placeholder="Diễn viên"
                className="form-control"
                onChange={this.handle_input}
                name="movie_actors"
                value={this.state.movie_actors}
              />
            </div>
            <div className="col-lg-3 pr-0">
              <input
                placeholder="Đạo diễn"
                className="form-control"
                onChange={this.handle_input}
                name="movie_producers"
                value={this.state.movie_producers}
              />
            </div>
            <div className="col-lg-3 pr-0">
              <input
                placeholder="Trailer"
                className="form-control"
                onChange={this.handle_input}
                name="movie_trailer"
                value={this.state.movie_trailer}
              />
            </div>
            <div className="col-lg-3 px-3 pl-0">
              <input
                placeholder="Poster"
                className="form-control"
                onChange={this.handle_input}
                name="movie_images"
                value={this.state.movie_images}
              />
            </div>
          </div>
          <div className="row px-3 pt-3">
            <div className="col-lg-12 pl-0">
              <p>Tóm tắt</p>
            </div>
          </div>
          <div className="row px-3">
            <div className="col-lg-12 px-0 pr-5">
              <textarea
                className="form-control"
                placeholder="Nhập tóm tắt phim..."
                onChange={this.handle_input}
                name="movie_overview"
                value={this.state.movie_overview}
              ></textarea>
            </div>
          </div>
          <div className="row px-3 pt-3">
            <div className="col-lg-12 pl-0">
              <p>Thể loại</p>
            </div>
          </div>
          <div className="row px-3">
            <div className="col-lg-3 pr-3 pl-0">
              <select className="form-control" onChange={this.select_genres}>
                <option value="-1">Chọn thể loại</option>
                {elGenre}
              </select>
            </div>
            <div className="col-lg-9 row align-items-center">
              {elMovieGenres}
            </div>
          </div>
          {/* </form> */}
        </div>
        <div className="row p-3">
          <button className="btn btn-success mr-3" onClick={this.send_data}>
            Thêm
          </button>
          <button className="btn btn-danger" onClick={this.reset_data}>
            Hủy
          </button>
        </div>
      </div>
    );
  }
}
