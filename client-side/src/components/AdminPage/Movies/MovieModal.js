import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import callApi from "../../../utils/apiCaller";
import { checkNull } from "../../../utils/helper";
export default class MovieModal extends Component {
  constructor(props) {
    super();
    this.close = this.close.bind(this);
    this.state = {
      genre_list: [],
      movie_genres: [],
      movie_description: [],
      _id: "",
      movie_id: 0,
      movie_title: "",
      movie_year: "",
      movie_actors: "",
      movie_producers: "",
      message: "",
      display_message: "none",
      required_fields: [
        ["movie_title", "movie_genres"],
        ["tựa phim", "tên thể loại"],
      ],
      message_color: "",
      is_not_edit: null,
    };
  }
  close = () => {
    this.props.onClickClose();
  };
  componentDidMount() {
    let item = this.props.item_selected;
    console.log(this.props.is_not_edit);
    this.setState({
      _id: item._id,
      movie_genres: item.movie_genres,
      movie_id: item.movie_id,
      movie_title: item.movie_title,
      movie_year: item.movie_year,
      movie_actors: item.movie_actors,
      movie_producers: item.movie_producers,
      movie_description: item.movie_description,
      is_not_edit: this.props.is_not_edit,
    });
    this.get_genre_list();
  }
  handle_input = (e) => {
    this.setState({ [e.target.name]: e.target.value });
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
  get_genre_list = async () => {
    //get genre list
    let genre_list = [];
    await callApi("genres", "get").then((res) => {
      genre_list = res.data;
    });
    this.setState({
      genre_list: genre_list,
    });
  };
  update_movie = async () => {
    let data = {
      _id: this.state._id,
      movie_genres: this.state.movie_genres,
      movie_id: this.state.movie_id,
      movie_title: this.state.movie_title,
      movie_year: this.state.movie_year,
      movie_actors: this.state.movie_actors,
      movie_producers: this.state.movie_producers,
      movie_description: this.state.movie_description,
    };

    if (typeof data.movie_description == "string") {
      data.movie_description = data.movie_description.split(",");
    }
    for (let i = 0; i < data.movie_description.length; i++) {
      data.movie_description[i] = data.movie_description[i].trim();
    }

    let is_null = checkNull(this.state.required_fields, data);

    if (is_null.length == 0) {
      callApi(`movies/${data._id}`, "put", { data: data }).then((res) => {
        let message = res.data.message;
        if (message.includes("thành công")) {
          console.log(res.data.object);
          this.setState({
            message: message,
            display_message: "block",
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
            hidden={this.state.is_not_edit}
          >
            x
          </span>
        </button>
      );
    });
    return (
      <Modal show={true} onHide={this.close} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Cập nhật thông tin phim</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
          <table className="table table-sm table-borderless">
            <tbody>
              <tr>
                <td width="20%">Mã phim</td>
                <td width="80%">{this.state.movie_id}</td>
              </tr>
              <tr>
                <td>Tựa phim</td>
                <td>
                  <input
                    placeholder="Tựa phim (bắt buộc)"
                    className="form-control form-control-sm"
                    required
                    onChange={this.handle_input}
                    name="movie_title"
                    value={this.state.movie_title}
                    readOnly={this.state.is_not_edit}
                  />
                </td>
              </tr>
              <tr>
                <td>Tên khác</td>
                <td>
                  <input
                    placeholder="Tên khác"
                    className="form-control form-control-sm"
                    required
                    onChange={this.handle_input}
                    name="movie_description"
                    value={this.state.movie_description}
                    readOnly={this.state.is_not_edit}
                  />
                </td>
              </tr>
              <tr>
                <td>Năm sản xuất</td>
                <td>
                  <input
                    placeholder="Năm sản xuất"
                    className="form-control form-control-sm"
                    onChange={this.handle_input}
                    name="movie_year"
                    value={this.state.movie_year}
                    readOnly={this.state.is_not_edit}
                  />
                </td>
              </tr>
              <tr>
                <td>Đạo diễn</td>
                <td>
                  <input
                    placeholder="Đạo diễn"
                    className="form-control form-control-sm "
                    onChange={this.handle_input}
                    name="movie_producers"
                    value={this.state.movie_producers}
                    readOnly={this.state.is_not_edit}
                  />
                </td>
              </tr>
              <tr>
                <td>Diễn viên</td>
                <td>
                  <input
                    placeholder="Diễn viên"
                    className="form-control form-control-sm"
                    onChange={this.handle_input}
                    name="movie_actors"
                    value={this.state.movie_actors}
                    readOnly={this.state.is_not_edit}
                  />
                </td>
              </tr>
              <tr>
                <td>Thể loại</td>
                <td>
                  <select
                    className="form-control form-control-sm"
                    onChange={this.select_genres}
                    hidden={this.state.is_not_edit}
                  >
                    <option value="-1">Chọn thể loại</option>
                    {elGenre}
                  </select>
                </td>
              </tr>
              <tr>
                <td></td>
                <td>{elMovieGenres}</td>
              </tr>
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            onClick={this.update_movie}
            hidden={this.state.is_not_edit}
          >
            Lưu
          </Button>
          <Button onClick={this.close} variant="danger">
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
