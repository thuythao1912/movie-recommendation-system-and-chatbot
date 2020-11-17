var fs = require("fs");

exports.add_data = (file_json) => {
  fs.readFile(file_json, "utf8", (err, data) => {
    if (err) throw err;
    obj = JSON.parse(data);
    console.log(obj);
  });
};
