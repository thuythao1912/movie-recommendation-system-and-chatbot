const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors");
const axios = require("axios");

const port = process.env.PORT || 4000;
const app = express();
const server = http.createServer(app);
const io = socketIO.listen(server);

const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const db = require("./db");

//setup server
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//import routes
let index = require("./routes/index");
let movie_route = require("./routes/movie_route");
let genre_route = require("./routes/genre_route");

//use route
app.use("/movies", movie_route);
app.use("/genres", genre_route);
app.use(index);

//import socket controllers
let movie_controller = require("./socket_controllers/movie_socket_controller");
let genre_controller = require("./socket_controllers/genre_socket_controller");

//connect mongodb
mongoose.Promise = global.Promise;
mongoose
  .connect(db.DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(
    () => {
      console.log(`Database is connected!`);
    },
    (err) => {
      console.log(`Can not connect database! ${err}`);
    }
  );

const SERVER_PYTHON = "http://127.0.0.1:5000";
const SERVER_NODE = "http://127.0.0.1:4000";

let run = (socket) => {
  //this will run when client successfully connected
  console.log("====New client connected====");

  // =============MODULE: RECEIVE AND SEND CHAT MESSAGE
  //1. Send data to client
  socket.emit("greeting", {
    text: `Xin chào, mình là chatbot. Mình có thể giúp gì cho bạn?`,
    member: { username: "chatbot", color: "blue" },
    send_time: new Date(),
  });

  //2. Receive data from client
  socket.on("message", (data) => {
    axios
      .post(`${SERVER_PYTHON}/predict`, {
        input: data.text,
        created_time: data.created_time,
      })
      .then((res) => {
        socket.emit("greeting", {
          text: res.data.response,
          member: { username: "chatbot", color: "blue" },
          send_time: new Date(),
        });
      });
  });
  //===========MODULE : MOVIE
  //1. get_list_movie
  socket.on("get_movie_list", async () => {
    console.log("get_movie_list");
    result = await movie_controller.get_list_movie();
    socket.emit("get_movie_list", result);
  });
  //2. get_greatest_movie_id
  socket.on("get_greatest_movie_id", async () => {
    console.log("get_greatest_movie_id");
    result = await movie_controller.get_greatest_id();
    socket.emit("get_greatest_movie_id", result);
  });
  //3. add_list_movie
  socket.on("add_list_movie", async (data) => {
    console.log("add_list_movie");
    result = await movie_controller.add_list_movie(data);
    socket.emit("change_movie_list");
  });

  //===========MODULE : MOVIE_GENRE
  //1. get_list_movie_genre
  socket.on("get_movie_genre_count", async () => {
    let count_movie = await movie_controller.count_movie();
    let count_genre = await genre_controller.count_genre();

    socket.emit("get_movie_genre_count", {
      count_movie: count_movie,
      count_genre: count_genre,
    });
  });

  //===========MODULE : GENRE
  //1. get_list_genre
  socket.on("get_genre_list", async () => {
    result = await genre_controller.get_list_genre();
    socket.emit("get_genre_list", result);
  });
};

io.on("connection", run);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
