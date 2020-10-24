exports.formatDate = (date, type) => {
  date = new Date(date);
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  let d = date.getDate();
  if (m < 9) m = "0" + m;
  if (d < 10) d = "0" + d;
  let h = date.getHours();
  let mn = date.getMinutes();
  let s = date.getSeconds();
  if (h < 10) h = "0" + h;
  if (mn < 10) mn = "0" + mn;
  if (s < 10) s = "0" + s;
  switch (type) {
    case "dmy-hms":
      return `${d}-${m}-${y} ${h}:${mn}:${s}`;
      break;
  }
};
