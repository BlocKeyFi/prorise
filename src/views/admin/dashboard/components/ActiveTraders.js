import React from "react";

// ProRIse imports
import { Box, Button, Center, Flex, Spinner, Text } from "@chakra-ui/react";

import { VictoryPie, VictoryLabel } from "victory";

// Custom components
import Card from "components/card/Card.js";

// Assets

import present from "../../../../assets/img/dashboards/svgIcon/presentation-chart.svg";
import PieChart from "components/charts/PieChart";
import { pieChartOptions } from "variables/charts";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import ReactApexChart from "react-apexcharts";

export default function DailyTraffic(props) {
  const {
    pieHeight,
    currentPositions,
    traderDetail,
    exchangeConnection,
    isLoading,
    ...rest
  } = props;

  const symbolsArray = currentPositions
    ?.slice(0, 7)
    ?.map((item) => item?.symbol);
  const options = pieChartOptions(symbolsArray);

  const sizesArray = currentPositions
    ?.slice(0, 7)
    ?.map((item) => (traderDetail ? item?.roe : item?.size));
  const numericValues = sizesArray?.map((value) => parseFloat(value));

  // Calculate total sum of values
  const totalSum = numericValues?.reduce((sum, value) => sum + value, 0);

  // Calculate percentages
  const percentages = numericValues?.map((value) => (value / totalSum) * 100);
  const finalPercentages = percentages?.map((value) =>
    parseFloat(value?.toFixed(6))
  );

  // const mergedArray = symbolsArray.map((symbol, index) => ({
  //   x: percentages[index],
  //   y: percentages[index],
  // }));

  return (
    <Card
      bg={traderDetail && "transparent"}
      align="center"
      direction="column"
      w="100%"
      {...rest}
    >
      <Flex justify="space-between" align="start" px="10px" pt="5px">
        <Flex flexDirection="column" align="start" me="20px">
          <Flex w="100%">
            <Text
              me="auto"
              color="white"
              fontSize={{ xl: "34px", lg: "34px", md: "34px", sm: "16px" }}
              fontWeight="700"
            >
              Symboles
            </Text>
          </Flex>
        </Flex>
      </Flex>
      {isLoading ? (
        <Center height={"286px"} mt="8">
          <Spinner size="xl" />
        </Center>
      ) : (
        <Box h="286px" mt="8">
          <Flex w="100%" gap={2}>
            <img src={present} />
            <Text
              textAlign={"left"}
              color="gray.200"
              fontSize="sm"
              fontWeight="500"
            >
              Préférence 30 jours
            </Text>
          </Flex>
          {!exchangeConnection && !traderDetail && (
            <Center h={200}>
              <Text fontSize={20}>
                No Connection Found
                <br />
                <br />
                <Link to="/admin/setting" style={{ width: "100%" }}>
                  <Button
                    fontSize="16px"
                    variant="brand"
                    fontWeight="500"
                    w={"100%"}
                    h="35px"
                    bg="#0075FF"
                    borderRadius="10px"
                    _hover={{ bg: "#0075FF" }}
                    textAlign={"center"}
                    gap={2}
                  >
                    {"Build Connection"}
                  </Button>
                </Link>
              </Text>
            </Center>
          )}
          {currentPositions && (
            <>
              {exchangeConnection && (
                <ReactApexChart
                  series={finalPercentages ?? []}
                  options={options ?? {}}
                  height={"95%"}
                  type="donut"
                />
              )}
              {traderDetail && (
                // <Flex>
                //   <svg viewBox="0 0 400 400">
                //     <VictoryPie
                //       padAngle={({ datum }) => 1}
                //       cornerRadius={({ datum }) => 45}
                //       // colorScale={["gray", "gray", "gray", "gray", "gray"]}
                //       standalone={false}
                //       width={200}
                //       height={200}
                //       data={mergedArray}
                //       radius={100}
                //       innerRadius={85}
                //       // labelRadius={88}
                //       style={{
                //         data: {
                //           // fillOpacity: 0.9, stroke: "#2cd9ff", strokeWidth: 3
                //         },
                //       }}
                //       events={[
                //         {
                //           target: "data",
                //           eventHandlers: {
                //             onMouseOver: (event, props) => {
                //               console.log(props);
                //               return [
                //                 {
                //                   target: "data",
                //                   mutation: ({ style }) => {
                //                     return style.fill === "#2cd9ff"
                //                       ? null
                //                       : { style: { fill: "#2cd9ff" } };
                //                   },
                //                 },
                //               ];
                //             },
                //             onMouseOut: () => {
                //               return [
                //                 {
                //                   target: "data",
                //                   mutation: ({ style }) => {
                //                     return null;
                //                   },
                //                 },
                //               ];
                //             },
                //           },
                //         },
                //       ]}
                //     />
                //     <VictoryLabel
                //       textAnchor="middle"
                //       style={{ fontSize: 20 }}
                //       x={100}
                //       y={100}
                //       text="text here"
                //     />
                //   </svg>
                //   dasdasd
                // </Flex>

                // <VictoryPie
                //   cornerRadius={({ datum }) => datum.y * 50}
                //   data={[
                //     { x: 1, y: 2, label: "one" },
                //     { x: 2, y: 3, label: "two" },
                //     { x: 3, y: 5, label: "three" },
                //   ]}
                //   padAngle={({ datum }) => datum.y}
                //   innerRadius={120}
                // />
                <ReactApexChart
                  series={finalPercentages ?? []}
                  options={options ?? {}}
                  height={"95%"}
                  type="donut"
                />
              )}
            </>
          )}
        </Box>
      )}
    </Card>
  );
}
