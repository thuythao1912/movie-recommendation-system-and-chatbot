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
  console.log();
  console.log(`====New client connected at: ${socket.handshake.address} ====`);

  // =============MODULE: RECEIVE AND SEND CHAT MESSAGE
  //1. Send data to client
  socket.on("greeting", () => {
    socket.emit("greeting", {
      text: `Xin chào, mình là chatbot. Mình có thể giúp gì cho bạn?`,
      member: { username: "chatbot", color: "blue" },
      send_time: new Date(),
    });
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
};

io.on("connection", run);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
