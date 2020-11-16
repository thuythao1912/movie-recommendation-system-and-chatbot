let ls = {};
ls.setItem = (key, value) => {
  localStorage.setItem(key, value);
};
ls.getItem = (key) => {
  return localStorage.getItem(key);
};
ls.removeItem = (key) => {
  localStorage.removeItem(key);
};

module.exports = ls;
