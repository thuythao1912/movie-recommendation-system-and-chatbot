const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timeZone = require("mongoose-timezone");

const user_model = new Schema({
  user_id: { type: String },
  username: { type: String },
  user_login: { type: String },
  user_password: { type: String },
  is_admin: { type: Boolean },
});
user_model.plugin(timeZone);
module.exports = mongoose.model("user", user_model);
