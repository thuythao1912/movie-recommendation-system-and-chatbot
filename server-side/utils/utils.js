let user_model = require("../models/user_model");
let movie_model = require("../models/movie_model");
let genre_model = require("../models/genre_model");

exports.get_greatest_id = async (model, type_id) => {
  let db_model = null;
  switch (model) {
    case "users":
      db_model = user_model;
      break;
    case "movies":
      db_model = movie_model;
      break;
    case "genres":
      db_model = genre_model;
      break;
  }

  let id = 0;
  items = await db_model.find({}, null, { sort: { [type_id]: 1 } });
  id_items = [];
  await items.forEach((item) => {
    id_items.push(parseInt(item[type_id]));
  });
  id = await Math.max.apply(Math, id_items);
  if (id == -Infinity) {
    return 1;
  }
  return id + 1;
};
