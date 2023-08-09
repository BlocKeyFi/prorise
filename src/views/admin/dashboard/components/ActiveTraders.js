import React from "react";

// ProRIse imports
import { Box, Flex, Text } from "@chakra-ui/react";

// Custom components
import Card from "components/card/Card.js";

// Assets

import present from "../../../../assets/img/dashboards/svgIcon/presentation-chart.svg";
import PieChart from "components/charts/PieChart";
import { pieChartOptions } from "variables/charts";

export default function DailyTraffic(props) {
  const { pieHeight, currentPositions, traderDetail, ...rest } = props;

  const symbols = [...new Set(currentPositions?.map((item) => item?.symbol))];
  const data = [
    ...new Set(
      currentPositions?.map((item) =>
        traderDetail ? item?.entryPrice : item?.size
      )
    ),
  ];

  const numericValues = data?.map((value) => parseFloat(value));

  // Calculate total sum of values
  const totalSum = numericValues?.reduce((sum, value) => sum + value, 0);

  // Calculate percentages
  const percentages = numericValues?.map((value) => (value / totalSum) * 100);

  const options = pieChartOptions(symbols);

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

        <PieChart
          chartData={percentages ?? []}
          chartOptions={options ?? []}
          pieHeight={"95%"}
        />
      </Box>
    </Card>
  );
}
