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
const { v4: uuidv4 } = require("uuid");

const mongoose = require("mongoose");
const db = require("./db");
const global_var = require("./global_variables");

//setup server
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//import routes
let index = require("./routes/index");
let movie_route = require("./routes/movie_route");
let genre_route = require("./routes/genre_route");
let message_route = require("./routes/message_route");
let user_route = require("./routes/user_route");
let ai_service_route = require("./routes/ai_service_route");

//use route
app.use("/movies", movie_route);
app.use("/genres", genre_route);
app.use("/messages", message_route);
app.use("/users", user_route);
app.use("/ai-service", ai_service_route);
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

let run = (socket) => {
  //this will run when client successfully connected
  console.log();
  console.log(`====New client connected at: ${socket.handshake.address} ====`);

  // =============MODULE: RECEIVE AND SEND CHAT MESSAGE
  //1. Send data to client
  socket.on("greeting", (data) => {
    socket.emit("greeting", {
      session: uuidv4(),
      text: `Xin chào ${
        data.username == null ? "bạn" : data.username
      }, mình là chatbot. Mình có thể giúp gì cho bạn?`,
      user: { username: "chatbot", color: "blue" },
      send_time: new Date(),
    });
  });

  //2. Receive data from client
  socket.on("message", (data) => {
    try {
      axios
        .post(`${global_var.SERVER_PYTHON}/predict`, {
          input: data.text,
          created_time: data.created_time,
          session: data.session,
          user: data.user,
        })
        .then((res) => {
          socket.emit("greeting", {
            text: res.data.response,
            user: { username: "chatbot", color: "blue" },
            send_time: new Date(),
            session: res.data.session,
          });
        })
        .catch((err) => {
          if (err.code == "ECONNREFUSED") {
            socket.emit("greeting", {
              text: "Hic...hic, kết nối tới chatbot có vấn đề rồi!",
              user: { username: "chatbot", color: "blue" },
              send_time: new Date(),
              session: data.session,
            });
          } else {
            socket.emit("greeting", {
              text: "Đã có lỗi xảy ra. Bạn vui lòng kết nối lại sau nhen!",
              user: { username: "chatbot", color: "blue" },
              send_time: new Date(),
              session: data.session,
            });
          }
        });
    } catch (err) {
      console.log(err);
      socket.emit("greeting", {
        text: "Đã có lỗi xảy ra. Bạn vui lòng kết nối lại sau nhen!",
        user: { username: "chatbot", color: "blue" },
        send_time: new Date(),
        session: data.session,
      });
    }
  });
};

io.on("connection", run);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
