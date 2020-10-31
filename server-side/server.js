const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const http = require("http");
const socketIO = require("socket.io");

const axios = require("axios");

const PORT = process.env.PORT || 4000;
const app = express();
const server = http.createServer(app);
const io = socketIO.listen(server);

const mongoose = require("mongoose");
const db = require("./db");

const index = require("./routes/index");

//setup server
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

app.use(index);

//import routes
let movies_route = require("./routes/movies_route");

//use route
app.use("/movies", movies_route);

const SERVER_PYTHON = "http://127.0.0.1:5000/predict";

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
  console.log("client connected");
  //send data to client
  socket.emit("greeting", {
    text: `Xin chào, mình là chatbot. Mình có thể giúp gì cho bạn?`,
    member: { username: "chatbot", color: "blue" },
    send_time: new Date(),
  });

  //receive data from client
  socket.on("message", (data) => {
    axios
      .post(SERVER_PYTHON, {
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
