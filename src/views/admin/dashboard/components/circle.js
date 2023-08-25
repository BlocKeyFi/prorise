import React from "react";
import { VictoryPie, VictoryLabel } from "victory";

class DonutChart extends React.Component {
  render() {
    return (
      <svg viewBox="0 0 400 400">
        <VictoryPie
          padAngle={({ datum }) => 1}
          cornerRadius={({ datum }) => 45}
          colorScale={["gray", "gray", "gray", "gray", "gray"]}
          standalone={false}
          width={200}
          height={200}
          data={[
            { x: 1, y: 120 },
            { x: 2, y: 150 },
            { x: 3, y: 75 },
            { x: 4, y: 120 },
            { x: 5, y: 150 },
          ]}
          radius={100}
          innerRadius={85}
          labelRadius={88}
          style={{
            data: {
              //fillOpacity: 0.9, stroke: "#2cd9ff", strokeWidth: 3
            },
          }}
          events={[
            {
              target: "data",
              eventHandlers: {
                onMouseOver: () => {
                  return [
                    {
                      target: "data",
                      mutation: ({ style }) => {
                        return style.fill === "#2cd9ff"
                          ? null
                          : { style: { fill: "#2cd9ff" } };
                      },
                    },
                  ];
                },
                onMouseOut: () => {
                  return [
                    {
                      target: "data",
                      mutation: ({ style }) => {
                        return null;
                      },
                    },
                  ];
                },
              },
            },
          ]}
        />
        <VictoryLabel
          textAnchor="middle"
          style={{ fontSize: 20 }}
          x={100}
          y={100}
          text="text here"
        />
      </svg>
    );
  }
}

export default DonutChart;
