import React from "react";

// ProRIse imports
import { Box, Flex, Text } from "@chakra-ui/react";

// Custom components
import Card from "components/card/Card.js";

// Assets

import present from "../../../../assets/img/dashboards/svgIcon/presentation-chart.svg";
import PieChart from "components/charts/PieChart";
import { pieChartData, pieChartOptions } from "variables/charts";

export default function DailyTraffic(props) {
  const { ...rest } = props;

  return (
    <Card align="center" direction="column" w="100%" {...rest}>
      <Flex justify="space-between" align="start" px="10px" pt="5px">
        <Flex flexDirection="column" align="start" me="20px">
          <Flex w="100%">
            <Text me="auto" color="white" fontSize="32px" fontWeight="700">
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
        <PieChart chartData={pieChartData} chartOptions={pieChartOptions} />
      </Box>
    </Card>
  );
}
