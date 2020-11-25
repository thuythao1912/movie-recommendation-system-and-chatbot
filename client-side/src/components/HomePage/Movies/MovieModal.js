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
    };
  }
  close = () => {
    this.props.onClickClose();
  };
  componentDidMount() {
    let item = this.props.item_selected;

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
        </button>
      );
    });
    return (
      <Modal show={true} onHide={this.close} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Chi tiết phim</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                    readOnly={true}
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
                    readOnly={true}
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
                    readOnly={true}
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
                    readOnly={true}
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
                    readOnly={true}
                  />
                </td>
              </tr>
              <tr>
                <td>Thể loại</td>
                <td>{elMovieGenres}</td>
              </tr>
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.close} variant="danger">
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
