let { socket } = require("./socket");

exports.init_request = (request, object = null) => {
  console.log(request, object);
  socket.emit(request, object);
};
exports.receive_response = (request, response) => {
  socket.on(request, response);
};
