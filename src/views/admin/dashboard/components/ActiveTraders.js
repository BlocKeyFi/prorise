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
  const { pieHeight, ...rest } = props;
  

  // const renderSteps = () => {
  //   const stepAngle = 360 / 10;

  //   return Array.from({ length: 10 }, (_, index) => (
  //     <div
  //       key={index}
  //       style={{
  //         transform: `rotate(${index * stepAngle}deg)`,
  //         width:200
  //       }}
  //     />
  //   ));
  // };

  // console.log(renderSteps())

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
          chartData={pieChartData}
          chartOptions={pieChartOptions}
          // pieHeight={pieHeight}
        />
      </Box>
    </Card>
  );
}
