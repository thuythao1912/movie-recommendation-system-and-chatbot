const axios = require("axios");
var api = axios.create({
  baseURL: "http://localhost:5000/",
});

exports.api = api;
