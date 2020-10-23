const api = require("./axios");

exports.callApi = (endpoint, method, body) => {
  console.log("Hello");
  return api({
    method: method,
    url: `/${endpoint}`,
    data: body,
  }).catch((error) => {
    console.log(error);
  });
};
