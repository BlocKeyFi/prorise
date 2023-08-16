import React from "react";

// ProRIse imports
import { Box, Button, Center, Flex, Text } from "@chakra-ui/react";

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
    ...rest
  } = props;

  const symbolsArray = currentPositions
    ?.slice(0, 7)
    ?.map((item) => item?.symbol);
  const sizesArray = currentPositions?.slice(0, 7)?.map((item) => item?.size);
  const numericValues = sizesArray?.map((value) => parseFloat(value));

  // Calculate total sum of values
  const totalSum = numericValues?.reduce((sum, value) => sum + value, 0);

  // Calculate percentages
  const percentages = numericValues?.map((value) => (value / totalSum) * 100);
  const finalPercentages = percentages?.map((value) =>
    parseFloat(value?.toFixed(6))
  );

  // const mergedArray = symbolsArray.map((symbol, index) => ({
  //   symbol: symbol,
  //   size: percentages[index],
  // }));

  const options = pieChartOptions(symbolsArray);

  return (
    <Card align="center" direction="column" w="100%" {...rest}>
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
      <Box h="290px" mt="8">
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
        {/* <Box border={"1px solid black"}>{renderSteps()}</Box> */}
        {exchangeConnection ? (
          <ReactApexChart
            series={finalPercentages ?? []}
            options={options ?? {}}
            height={"95%"}
            type="donut"
          />
        ) : (
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
      </Box>
    </Card>
  );
}
