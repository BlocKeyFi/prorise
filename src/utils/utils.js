export const generateDayWiseTimeSeries = (baseval, count, yrange) => {
  var i = 0;
  var series = [];
  while (i < count) {
    var x = baseval;
    console.log(x);
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

const data = generateDayWiseTimeSeries(new Date("1 Jan 2023").getTime(), 6, {
  min: 0,
  max: 30000,
});

export const formattedData = data.map((point) => ({
  x: formatDate(point.x),
  y: point.y,
}));
