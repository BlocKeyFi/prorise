// ProRIse imports
import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import LineChart from "components/charts/LineChart";
import LineAreaChart from "components/charts/LineAreaChart";
import React from "react";

import wallet from "../../../../assets/img/dashboards/svgIcon/wallet.svg";
import present from "../../../../assets/img/dashboards/svgIcon/presentation-chart.svg";
import { generateDayWiseTimeSeries } from "utils/utils";
import { formatDate } from "utils/utils";
import ReactApexChart from "react-apexcharts";

export default function TotalSpent(props) {
  const { balance, data, analytics, traderDetail, ...rest } = props;
  const analyticsKeyValueArray = Object.entries(analytics ?? {});

  // ProRIse Color Mode

  const textColor = useColorModeValue("white", "white");
  const textColorSecondary = useColorModeValue("gray.200", "gray.200");
  const bgButton = useColorModeValue(
    "rgba(0, 0, 0, 0.4)",
    "rgba(0, 0, 0, 0.4)"
  );
  const bgHover = useColorModeValue(
    { bg: "rgba(0, 0, 0, 0.4)" },
    { bg: "rgba(0, 0, 0, 0.4)" }
  );

  const lineChartOptionsTotalSpent = {
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
        formatter: function (value) {
          return formatDate(value);
        },
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
  };

  // const closedPnlValues = data?.map((data) => parseFloat(data?.closedPnl));
  // const time = data?.map((data) => parseFloat(data?.createdTime));

  // console.log(closedPnlValues);

  // const minClosedPnl = closedPnlValues?.length && Math.min(...closedPnlValues);
  // const maxClosedPnl = closedPnlValues?.length && Math.max(...closedPnlValues);

  // console.log("Minimum closedPnl:", minClosedPnl);
  // console.log("Maximum closedPnl:", maxClosedPnl);

  // console.log(generateData);

  // const finalData = generateData?.map((point) => ({
  //   x: formatDate(point.x),
  //   y: point.y,
  // }));
  // const generateData = generateDayWiseTimeSeries(time, data?.length, {
  //   min: minClosedPnl,
  //   max: maxClosedPnl,
  // });

  const finalData = data?.map((item) => ({
    x: new Date(
      parseInt(traderDetail ? item?.updateTimeStamp : item?.createdTime)
    ),
    y: parseFloat(traderDetail ? item?.pnl : item?.closedPnl).toFixed(0),
  }));

  return (
    <Card
      justifyContent="center"
      align="center"
      direction="column"
      w="100%"
      mb="0px"
      {...rest}
      bg={props?.heading ? null : "none"}
    >
      <Box ps="0px" pe="20px" pt="5px">
        <Flex
          direction={"row"}
          align="center"
          justifyContent={"space-between"}
          w="100%"
        >
          <Text
            color={textColor}
            fontSize={{ xl: "34px", lg: "34px", md: "34px", sm: "16px" }}
            textAlign="start"
            fontWeight="700"
            lineHeight="100%"
          >
            {props?.heading}
          </Text>
          {props?.design === 1 && (
            <Flex
              dir="row"
              justifyContent={"start"}
              w={{ "2xl": "30%", xl: "40%", lg: "40%", md: "40%", sm: "50%" }}
              gap={2}
            >
              <Button
                ms="auto"
                align="center"
                justifyContent="center"
                bg={bgButton}
                _hover={bgHover}
                // w="30%"
                h="60px"
                lineHeight="100%"
                borderRadius="10px"
                {...rest}
              >
                <Image src={wallet} />
              </Button>
              <Flex
                align="start"
                justifyContent={"center"}
                direction={"column"}
                w="100%"
              >
                <Text
                  color={textColor}
                  fontSize={{
                    "2xl": "xl",
                    xl: "16px",
                    lg: "xl",
                    md: "16px",
                    sm: "12px",
                  }}
                  textAlign="start"
                  fontWeight="400"
                  lineHeight="100%"
                  mb={2}
                >
                  Valeur du portefeuille
                </Text>
                <Text
                  color={textColor}
                  fontSize={{
                    "2xl": "xl",
                    xl: "16px",
                    lg: "xl",
                    md: "16px",
                    sm: "12px",
                  }}
                  textAlign="start"
                  fontWeight="700"
                  lineHeight="100%"
                >
                  {`€ ${balance}`}
                </Text>
              </Flex>
            </Flex>
          )}
        </Flex>
        {props?.design === 2 && (
          <SimpleGrid
            columns={{ base: 2, md: 5, lg: 5, xl: 5, sm: 2 }}
            gap="20px"
            marginTop={props?.heading ? 8 : 0}
          >
            {analyticsKeyValueArray?.map(([key, value], index) => {
              return (
                <>
                  <Flex direction={"column"} w="100%" align={"start"} pt={3}>
                    <Center>
                      <Flex direction={"row"} gap={1}>
                        <img src={present} />
                        <Text
                          color={"gray.200"}
                          fontSize="14px"
                          lineHeight="100%"
                          fontWeight="600"
                          textTransform={"capitalize"}
                        >
                          {`${key} 30 jours`}
                        </Text>
                      </Flex>
                    </Center>
                    <Text
                      color={
                        index === 0 || index === 1 || index === 2
                          ? "green.300"
                          : "white"
                      }
                      fontSize="28px"
                      lineHeight="100%"
                      fontWeight="600"
                      pt={"2"}
                      px={index === 0 ? 0 : 4}
                    >
                      {`${value?.toFixed(0)} %`}
                    </Text>
                  </Flex>
                </>
              );
            })}
          </SimpleGrid>
        )}
      </Box>
      <Flex w="100%" flexDirection={{ base: "column", lg: "row" }}>
        <Box minH="276px" minW="100%" mt="20px">
          <Flex direction={"row"} w="100%" gap={1} justifyContent={"start"}>
            <img src={present} />
            <Text
              color={textColorSecondary}
              fontSize="14px"
              textAlign="end"
              lineHeight="100%"
              fontWeight="600"
            >
              {"Valeur 30 jours"}
            </Text>
          </Flex>
          {/* <ReactApexChart
            options={lineChartOptionsTotalSpent} // Aapke options object
            series={[
              {
                name: "Closed",
                data: finalData,
              },
            ]}
            type="line"
            width="100%"
            height="100%"
          /> */}
          <LineAreaChart
            chartData={[
              {
                name: "Closed",
                data: finalData,
              },
            ]}
            chartOptions={lineChartOptionsTotalSpent}
          />
        </Box>
      </Flex>
    </Card>
  );
}
