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

import {
  lineChartDataTotalSpent,
  lineChartOptionsTotalSpent,
} from "variables/charts";

import wallet from "../../../../assets/img/dashboards/svgIcon/wallet.svg";
import present from "../../../../assets/img/dashboards/svgIcon/presentation-chart.svg";
import { TradersCardData } from "constants/constants";

export default function TotalSpent(props) {
  const { ...rest } = props;

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
              w={{ "2xl": "25%", xl: "30%", lg: "40%", md: "40%", sm: "50%" }}
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
                  € 0
                </Text>
              </Flex>
            </Flex>
          )}
        </Flex>
        {props?.design === 2 && (
          <SimpleGrid
            columns={{ base: 2, md: 5, lg: 5, xl: 5, sm: 2 }}
            gap="20px"
            marginTop={props?.heading ? 10 : 0}
          >
            {TradersCardData?.slice(0, 5).map((item) => {
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
                        >
                          {item?.text1}
                        </Text>
                      </Flex>
                    </Center>
                    <Text
                      color={
                        item?.textvalue1.includes("-") ? "green.300" : "white"
                      }
                      fontSize="26px"
                      lineHeight="100%"
                      fontWeight="600"
                      pt={"2"}
                    >
                      {item?.textvalue1}
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
          <LineAreaChart
            chartData={lineChartDataTotalSpent}
            chartOptions={lineChartOptionsTotalSpent}
          />
        </Box>
      </Flex>
    </Card>
  );
}
