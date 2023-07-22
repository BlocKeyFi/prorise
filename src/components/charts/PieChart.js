import React from "react";
import ReactApexChart from "react-apexcharts";
import "./style.css";

class PieChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chartData: [],
      chartOptions: {},
    };
  }

  componentDidMount() {
    this.setState({
      chartData: this.props.chartData,
      chartOptions: this.props.chartOptions,
    });
  }

  render() {
    return (
      <ReactApexChart
        options={this.state.chartOptions}
        series={this.state.chartData}
        type="donut"
        width={this.props.pieHeight}
        height={this.props.pieHeight}
      />
    );
  }
}

export default PieChart;
