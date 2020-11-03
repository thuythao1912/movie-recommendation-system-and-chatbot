import api from "./axios";
export default function callApi(endpoint, method, data = null) {
  return api({
    method: method,
    url: `/${endpoint}`,
    data: data,
  }).catch((err) => {
    console.log(err);
  });
}
