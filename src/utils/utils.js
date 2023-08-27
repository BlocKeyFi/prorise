export const generateDayWiseTimeSeries = (baseval, count, yrange) => {
  var i = 0;
  var series = [];
  while (i < count) {
    var x = baseval;
    var y =
      Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

    series.push({ x, y });
    baseval += 86400000;
    i++;
  }
  return series;
};

export const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthName = monthNames[monthIndex];
  return `${monthName} ${day}`;
};

export const timeConverter = (UNIX_timestamp) => {
  var a = new Date(parseInt(UNIX_timestamp));
  var months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time =
    date + "/" + month + "/" + year + " " + hour + ":" + min + ":" + sec;
  return time;
};

const data = generateDayWiseTimeSeries(new Date().getTime(), 6, {
  min: 33330,
  max: 30,
});

export const formattedData = data.map((point) => ({
  x: formatDate(point.x),
  y: point.y,
}));

export const generateRandomString = (length) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;

  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};
