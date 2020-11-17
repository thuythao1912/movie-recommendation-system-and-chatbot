const axios = require("axios");
const gloabal_var = require("../global_variables");

exports.handle_function = (req, res) => {
  let data = req.body.data;
  let func = req.params.func;
  console.log(func);
  axios
    .post(`${gloabal_var.SERVER_PYTHON}/${func}`, {
      data: data,
    })
    .then((response) => {
      res.json(response.data);
    });
};
