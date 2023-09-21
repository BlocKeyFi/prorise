// ProRIse imports
import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  Link,
  SimpleGrid,
  Spinner,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import LineChart from "components/charts/LineChart";
import LineAreaChart from "components/charts/LineAreaChart";
import React, { useEffect, useState } from "react";

import wallet from "../../../../assets/img/dashboards/svgIcon/wallet.svg";
import present from "../../../../assets/img/dashboards/svgIcon/presentation-chart.svg";
import { generateDayWiseTimeSeries } from "utils/utils";
import { formatDate } from "utils/utils";
import ReactApexChart from "react-apexcharts";
import moment from "moment/moment";
import { groupAndAggregateData } from "utils/utils";
import SelectFeild from "components/fields/selectFeild";

export default function TotalSpent(props) {
  const {
    balance,
    data,
    analytics,
    traderDetail,
    walletHistory,
    onChange,
    exchangeConnection,
    ...rest
  } = props;
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
    colors: ["#29C5EE", "#29C5EE"],
    markers: {
      size: 0,
      colors: "white",
      strokeColors: "#29C5EE",
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
      type: walletHistory ? "datetime" : "string",
      labels: {
        formatter: function (value) {
          return moment(value).format("MMM DD");
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
        formatter: function (value) {
          return `${walletHistory ? "€" : ""} ${value}`;
        },
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

  const finalData = data?.map((item) => ({
    x: new Date(parseInt(traderDetail ? item?.updateTimeStamp : item?.date)),
    y: parseFloat(traderDetail ? item?.pnl : item?.value).toFixed(0),
  }));

  const walletHistoryData = walletHistory?.map((item) => ({
    x: new Date(parseInt(item?.time)),
    y: parseFloat(item?.walletBalance).toFixed(0),
  }));

  const groupedData = finalData?.reduce((accumulator, item) => {
    const date = item.x.toDateString(); // Group by date only, ignoring time
    accumulator[date] = (accumulator[date] || 0) + parseFloat(item.y);
    return accumulator;
  }, {});

  const groupedDataWallet = walletHistoryData?.reduce((accumulator, item) => {
    const date = item.x.toDateString(); // Group by date only, ignoring time
    accumulator[date] = (accumulator[date] || 0) + parseFloat(item.y);
    return accumulator;
  }, {});

  const groupFinal = Object?.entries(groupedData ?? {})?.map(
    ([date, totalY]) => ({
      x: new Date(date),
      y: totalY?.toFixed(0),
    })
  );

  const chartData = walletHistory ? walletHistoryData ?? [] : groupFinal ?? [];
  const [showAnotherScreen, setShowAnotherScreen] = useState(false);

  useEffect(() => {
    if (chartData.length === 0) {
      const timer = setTimeout(() => {
        setShowAnotherScreen(true);
      }, 15000);

      // Clean up timer on component unmount or if conditions change
      return () => clearTimeout(timer);
    }
  }, [chartData]);

  const renderChart = () => {
    if (chartData.length > 0) {
      return (
        <LineAreaChart
          chartData={[
            {
              name: "Closed",
              data: chartData,
            },
          ]}
          chartOptions={lineChartOptionsTotalSpent}
          height={"365px"}
        />
      );
    } else if (chartData && chartData.length === 0) {
      return (
        <Center h={378}>
          <Spinner size="xl" thickness="4px" speed="0.65s" />
        </Center>
      );
    }
  };

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
                    "2xl": "24px",
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
        {!traderDetail && (
          <SelectFeild
            name={"Valeur"}
            w={"15%"}
            onChange={(e) =>
              onChange(e.target.value, !walletHistory && "performence")
            }
            disabled={!chartData?.length}
          />
        )}
        {props?.design === 2 && (
          <SimpleGrid
            columns={{ base: 2, md: 6, lg: 6, xl: 6, sm: 2 }}
            marginTop={props?.heading ? 8 : 0}
          >
            {analyticsKeyValueArray?.map(([key, value], index) => {
              return (
                <>
                  <Flex
                    direction={"column"}
                    w="100%"
                    align={"start"}
                    pt={3}
                    gap={4}
                  >
                    <Center>
                      <Flex direction={"row"} gap={2} alignItems={"center"}>
                        <img src={present} width={20} />
                        <Text
                          color={"gray.200"}
                          fontSize="16px"
                          lineHeight="100%"
                          // fontWeight="600"
                          textTransform={
                            index === 0 ? "uppercase" : "capitalize"
                          }
                        >
                          {`${key}`}
                        </Text>
                      </Flex>
                    </Center>
                    <Text
                      color={index === 0 ? "green.300" : "white"}
                      fontSize="28px"
                      lineHeight="100%"
                      fontWeight="600"
                      pt={"2"}

                      // px={index === 0 ? 0 : 4}
                    >
                      {`${value ? value?.toFixed(2) : 0.0} ${
                        index === 0 ? "%" : ""
                      }`}
                    </Text>
                  </Flex>
                </>
              );
            })}
          </SimpleGrid>
        )}
      </Box>
      <Flex w="100%" flexDirection={{ base: "column", lg: "row" }}>
        <Box minW="100%" mt="20px">
          {/* <ReactApexChart
            options={lineChartOptionsTotalSpent} // Aapke options object
            series={[
              {
                name: "Closed",
                data: walletHistory ? walletHistoryData : finalData,
              },
            ]}
            type="line"
            width="100%"
            height="100%"
          /> */}

          {exchangeConnection ? (
            showAnotherScreen ? (
              <Center h={378}>
                <Text fontSize={30}>{"No Data Found"}</Text>
              </Center>
            ) : (
              renderChart()
            )
          ) : (
            <Center h={378}>
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
          {/* {chartData?.length > 0 ? (
            <LineAreaChart
              chartData={[
                {
                  name: "Closed",
                  data: chartData && chartData,
                },
              ]}
              chartOptions={lineChartOptionsTotalSpent}
              height={"365px"}
            />
          ) : (
            <Center height={"380px"}>
              <Box>
                <Spinner size="xl" thickness="4px" speed="0.65s" />
              </Box>
            </Center>
          )} */}
        </Box>
      </Flex>
    </Card>
  );
}
