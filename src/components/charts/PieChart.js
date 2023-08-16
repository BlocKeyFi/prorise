import React from "react";
import ReactApexChart from "react-apexcharts";
import "./style.css";
import { Text } from "@chakra-ui/react";

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
      <>
        {this.state.chartData?.length ? (
          <ReactApexChart
            options={this.state.chartOptions}
            series={this.state.chartData}
            type="donut"
            width={this.props.pieHeight}
            height={this.props.pieHeight}
          />
        ) : (
          <Text fontSize={30} py={10}>
            {"No Data Found"}
          </Text>
        )}
      </>
    );
  }
}

export default PieChart;
