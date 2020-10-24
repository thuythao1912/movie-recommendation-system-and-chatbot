const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors");
const axios = require("axios");

const port = process.env.PORT || 4000;
const app = express();
const server = http.createServer(app);
const io = socketIO.listen(server);

const index = require("./routes/index");
const { response } = require("express");

app.use(cors());
app.use(index);

const SERVER_PYTHON = "http://127.0.0.1:5000/predict";

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

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
