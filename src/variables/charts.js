import { formattedData } from "utils/utils";

export const pieChartOptions = {
  labels: ["ARBUSDT", "ALICEUSDT", "IDUSDT", "XRPUSDT", "CRVUSDT", "JOEUSDT"],
  colors: ["#2CD9FF"],
  chart: {
    width: 380,
    type: "donut",
    dropShadow: {
      enabled: true,
      color: "#1a202c",
      top: 1,
      left: 3,
      blur: 3,
      opacity: 1,
    },
  },
  stroke: {
    width: 0,
    colors: "#1a202c",
  },
  legend: {
    show: true,
    position: "right",
    horizontalAlign: "left",
    floating: false,
    fontSize: "16px",
    fontFamily: "Arial, sans-serif",
    fontWeight: "normal",
    color: "#FFFFFF",
    markers: {
      show: false,
      width: 12,
      height: 12,
      radius: 6,
    },
    itemMargin: {
      horizontal: 0,
      vertical: 5,
    },
    onItemClick: {
      toggleDataSeries: true,
    },
    onItemHover: {
      highlightDataSeries: true,
    },
  },

  plotOptions: {
    pie: {
      expandOnClick: false,
      donut: {
        expandOnClick: false,
        size: "85%",
        labels: {
          show: true,
          name: {
            show: true,
            color: "#FFFFFF",
          },
          value: {
            showAlways: true,
            show: true,
            fontSize: "20px",
            color: "#FFFFFF",
          },
          total: {
            showAlways: true,
            show: true,
            fontSize: "20px",
            color: "#FFFFFF",
          },
        },
      },
    },
  },

  states: {
    hover: {
      filter: "none",
    },
  },
  theme: {
    palette: "palette2",
  },

  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          position: "bottom",
        },
      },
    },
  ],
};

export const pieChartData = [63, 25, 12, 30, 10, 40];

export const lineChartDataTotalSpent = [
  {
    name: "Portefeuille",
    data: formattedData,
  },
];

export const lineChartOptionsTotalSpent = {
  chart: {
    foreColor: "#A3AED0",
    toolbar: {
      show: false,
    },
  },
  colors: ["#2CD9FF", "#2CD9FF"],
  markers: {
    size: 0,
    colors: "white",
    strokeColors: "#2CD9FF",
    strokeWidth: 3,
    strokeOpacity: 20,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    shape: "circle",
    radius: 2,
    offsetX: 0,
    offsetY: 0,
    showNullDataPoints: true,
  },
  tooltip: {
    theme: "dark",
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
  },
  xaxis: {
    type: "string",
    labels: {
      style: {
        colors: "#A3AED0",
        fontSize: "16px",
        fontWeight: "500",
        fontFamily: "Urbanist",
      },
    },
    axisBorder: {
      show: true,
    },
    axisTicks: {
      show: true,
    },
  },
  yaxis: {
    show: true,
    lines: {
      show: true,
    },
    labels: {
      style: {
        colors: "#A3AED0",
        fontSize: "16px",
        fontWeight: "500",
        fontFamily: "Urbanist",
      },
    },
  },
  legend: {
    show: true,
  },
  color: ["red", "red"],
};
