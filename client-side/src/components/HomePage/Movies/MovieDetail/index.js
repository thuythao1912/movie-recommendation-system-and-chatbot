import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import StarsRating from "stars-rating";
import callApi from "../../../../utils/apiCaller";
import MovieCardRecommended from "./MovieCardRecommend";
import ls from "../../../../utils/localStorage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
export default class MovieDetail extends Component {
  constructor(props) {
    super();
    this.state = {
      movie: {},
      movies_suggest: [],
      rating_score: 0,
      user_id: ls.getItem("user_id"),
    };
  }
  componentWillReceiveProps(nextProps) {
    this.get_movie(nextProps.location.search.split("?").join(""));
    this.get_movies_suggest(nextProps.location.search.split("=")[1]);
  }
  get_movie = (link) => {
    callApi(`movies?${link}`, "get").then((res) => {
      if (res.data.length > 0) {
        this.setState({ movie: res.data[0] });
        if (this.state.user_id != null) {
          this.get_rating_by_user(this.state.user_id);
        }
      }
    });
  };
  get_movies_suggest = (link) => {
    let movie_title = link;
    movie_title = movie_title.split("%20").join(" ");
    callApi(`ai-service/suggest`, "post", {
      data: [movie_title],
    }).then((res) => {
      this.setState({ movies_suggest: res.data });
    });
  };
  get_rating_by_user = (user_id) => {
    callApi(
      `ratings?user_id=${user_id}&movie_id=${this.state.movie.movie_id}`,
      "get"
    ).then((res) => {
      console.log(res.data);
      if (res.data[0].length > 0) {
        this.setState({ rating_score: res.data[0][0].rating_score });
      }
    });
  };
  componentDidMount = async () => {
    await this.get_movie(this.props.location.search.split("?").join(""));
    this.get_movies_suggest(this.props.location.search.split("=")[1]);
  };
  handle_rating_score = (rating_score) => {
    this.setState({ rating_score: rating_score });
  };
  send_rating_score = () => {
    if (this.state.user_id != null) {
    } else {
      alert("Bạn hãy đăng nhập trước khi đánh giá nhé!");
    }
  };
  render() {
    let data = this.state.movie;
    let movies_suggest = this.state.movies_suggest;
    let elMovieSuggest = "";
    if (data != undefined) {
      elMovieSuggest = movies_suggest.map((movie, index) => {
        return <MovieCardRecommended data={movie} key={index} />;
      });
      return (
        <div className="row justify-content-center m-0">
          <div className="border col-lg-6 p-3">
            <div className="row my-3">
              <div className="col-lg-5 col-md-12 col-sm-12">
                <img
                  src={`${
                    data.movie_images == undefined
                      ? "/images/movie_default.jpg"
                      : data.movie_images
                  }`}
                  width="100%"
                />
              </div>
              <div className="col-lg-7 col-md-12 col-sm-12">
                <h2 className="text-uppercase font-weight-bold mb-3">
                  {data.movie_title}
                </h2>
                <table width="100%">
                  <tbody>
                    <tr>
                      <td width="40%">
                        <h5>Thể loại</h5>
                      </td>
                      <td width="60%">
                        {data.movie_genres != undefined
                          ? data.movie_genres.join(", ")
                          : ""}
                      </td>
                    </tr>
                    <tr>
                      <td width="40%">
                        <h5>Tên khác</h5>
                      </td>
                      <td width="60%">
                        {data.movie_description != undefined ||
                        data.movie_description != null
                          ? data.movie_description.join(", ")
                          : ""}
                      </td>
                    </tr>
                    <tr>
                      <td width="40%">
                        <h5>Năm phát hành </h5>
                      </td>
                      <td width="60%">
                        {data.movie_year != undefined ? data.movie_year : ""}
                      </td>
                    </tr>
                    <tr>
                      <td width="40%">
                        <h5>Đạo diễn </h5>
                      </td>
                      <td width="60%">
                        {data.movie_producers != undefined
                          ? data.movie_producers
                          : ""}
                      </td>
                    </tr>
                    <tr>
                      <td width="40%">
                        <h5>Diễn viên</h5>
                      </td>
                      <td width="60%">
                        {data.movie_actors != undefined
                          ? data.movie_actors
                          : ""}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <div className="row m-0">
                <Button
                  variant="info"
                  className="mb-3 mr-3 rounded-pill btn-chatbot"
                  onClick={this.send_rating_score}
                >
                  <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
                  <span>Đánh giá</span>
                </Button>
                <StarsRating
                  count={5}
                  onChange={this.handle_rating_score}
                  size={30}
                  color2={"#ffd700"}
                  half={false}
                  value={this.state.rating_score}
                />
              </div>
              <h5>Tóm tắt</h5>
              <p className="text-justify">{data.movie_overview}</p>
            </div>
            {data.movie_trailer && (
              <div className="my-2">
                <iframe
                  width="100%"
                  height="450"
                  src={`https://www.youtube.com/embed/${data.movie_trailer}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>
          <div className="col-lg-4 p-4 mx-3">
            <div>
              <h5>Phim gợi ý cho bạn</h5>
            </div>
            <div>{elMovieSuggest}</div>
          </div>
        </div>
      );
    }
    return <h1>Chưa có dữ liệu</h1>;
  }
}
