import React, { useEffect, useState } from "react";

// ProRIse imports
import { Box, Button, Center, Flex, Spinner, Text } from "@chakra-ui/react";

import { VictoryPie, VictoryLabel } from "victory";

// Custom components
import Card from "components/card/Card.js";

// Assets

import present from "../../../../assets/img/dashboards/svgIcon/presentation-chart.svg";

import { pieChartOptions } from "variables/charts";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

import "./style.css";
import SelectFeild from "components/fields/selectFeild";

export default function DailyTraffic(props) {
  const {
    pieHeight,
    currentPositions,
    traderDetail,
    exchangeConnection,
    isLoading,
    ...rest
  } = props;

  const [middleText, setMiddleText] = useState("");

  const symbolsArray = currentPositions?.map((item) => item?.symbol);
  // const options = pieChartOptions(symbolsArray);

  const sizesArray = currentPositions?.map((item) =>
    traderDetail ? item?.roe : item?.size
  );
  const numericValues = sizesArray?.map((value) => parseFloat(value));

  // Calculate total sum of values
  const totalSum = numericValues?.reduce((sum, value) => sum + value, 0);

  // Calculate percentages
  const percentages = numericValues?.map((value) => (value / totalSum) * 100);
  const finalPercentages = percentages?.map((value) =>
    parseFloat(value?.toFixed(2))
  );

  const allmergedArray = symbolsArray?.map((symbol, index) => ({
    x: finalPercentages[index],
    y: symbolsArray[index],
  }));

  useEffect(() => {
    if (allmergedArray[0]) {
      setMiddleText(allmergedArray[0].y + " " + allmergedArray[0].x + "%");
    }
  }, []);

  const mergedObject = allmergedArray
    ?.reduce(
      (result, current) => {
        const existingIndex = result.findIndex((item) => item.y === current.y);

        if (existingIndex !== -1) {
          result[existingIndex].x += parseFloat(current.x);
        } else {
          result.push({ y: current.y, x: parseFloat(current.x) });
        }

        return result;
      },
      [allmergedArray]
    )
    .map((item) => ({ ...item, x: parseFloat(item?.x?.toFixed(2)) }));

  const mergedArray = mergedObject?.slice(1);

  return (
    <Card
      bg={traderDetail && "transparent"}
      align="center"
      direction="column"
      w="100%"
      {...rest}
    >
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

      <Box h={traderDetail ? "auto" : "420px"} mt="8">
        <SelectFeild name={"Préférence"} w={"36%"} />

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
        {currentPositions?.length ? (
          <>
            {exchangeConnection && (
              <>
                <Flex
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  py={20}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="240"
                    height="240"
                    viewBox="0 0 207 208"
                    fill="none"
                  >
                    <circle
                      cx="100"
                      cy="100"
                      r="100"
                      fill="black"
                      fill-opacity="0.4"
                    />
                    <VictoryPie
                      padAngle={({ datum }) => 1}
                      cornerRadius={({ datum }) => 45}
                      colorScale={["#A0AEC0"]}
                      standalone={false}
                      width={200}
                      height={200}
                      data={mergedArray}
                      radius={90}
                      innerRadius={75}
                      labelComponent={<></>}
                      events={[
                        {
                          target: "data",
                          eventHandlers: {
                            onClick: (event, props) => {
                              const updatedData = mergedArray?.filter(
                                (datum, index) => index === props.index
                              );
                              setMiddleText(
                                updatedData[0].y + " " + updatedData[0].x + "%"
                              );
                            },
                          },
                        },
                      ]}
                    />

                    <VictoryLabel
                      textAnchor="middle"
                      style={{
                        fontSize: 16,
                        fill: "white",
                      }}
                      x={100}
                      y={100}
                      text={middleText}
                    />
                  </svg>

                  <Box h={260} w={200} className="overflow">
                    <Flex direction={"column"} textAlign={"left"} gap={4}>
                      {mergedArray?.map((item) => {
                        return (
                          <Flex gap={4}>
                            <Text
                              fontSize={{
                                "2xl": 18,
                                xl: 14,
                                lg: 12,
                                md: 18,
                                sm: 18,
                              }}
                              fontWeight={700}
                              color={
                                middleText.includes(item?.y)
                                  ? "aqua"
                                  : "#A0AEC0"
                              }
                              cursor={"pointer"}
                              onClick={() =>
                                setMiddleText(item?.y + " " + item?.x + "%")
                              }
                            >
                              {item?.y}
                            </Text>
                            <Text
                              fontSize={{
                                "2xl": 18,
                                xl: 14,
                                lg: 12,
                                md: 18,
                                sm: 18,
                              }}
                              fontWeight={700}
                              color={"white"}
                            >
                              {item?.x?.toFixed(2) + "%"}
                            </Text>
                          </Flex>
                        );
                      })}
                    </Flex>
                  </Box>
                </Flex>
              </>
            )}
            {traderDetail && (
              <Flex
                justifyContent={"space-between"}
                alignItems={"center"}
                mt={5}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="240"
                  height="240"
                  viewBox="0 0 207 208"
                  fill="none"
                >
                  <circle
                    cx="100"
                    cy="100"
                    r="100"
                    fill="black"
                    fill-opacity="0.4"
                  />
                  <VictoryPie
                    padAngle={({ datum }) => 1}
                    cornerRadius={({ datum }) => 45}
                    colorScale={["#A0AEC0"]}
                    standalone={false}
                    width={200}
                    height={200}
                    data={mergedArray}
                    radius={90}
                    innerRadius={75}
                    labelComponent={<></>}
                    events={[
                      {
                        target: "data",
                        eventHandlers: {
                          onClick: (event, props) => {
                            const updatedData = mergedArray.filter(
                              (datum, index) => index === props?.index
                            );
                            setMiddleText(
                              updatedData[0].y + " " + updatedData[0].x + "%"
                            );
                          },
                        },
                      },
                    ]}
                  />

                  <VictoryLabel
                    textAnchor="middle"
                    style={{
                      fontSize: 16,
                      fill: "white",
                    }}
                    x={100}
                    y={100}
                    text={middleText}
                  />
                </svg>

                <Box h={200} w={200} className="overflow">
                  <Flex direction={"column"} textAlign={"left"} gap={4}>
                    {mergedArray?.map((item) => {
                      return (
                        <Flex gap={4}>
                          <Text
                            fontSize={{
                              "2xl": 18,
                              xl: 14,
                              lg: 12,
                              md: 18,
                              sm: 18,
                            }}
                            // fontWeight={700}
                            color={
                              middleText.includes(item?.y) ? "aqua" : "#A0AEC0"
                            }
                            cursor={"pointer"}
                            onClick={() =>
                              setMiddleText(item?.y + " " + item?.x + "%")
                            }
                          >
                            {item?.y}
                          </Text>
                          <Text
                            fontSize={{
                              "2xl": 18,
                              xl: 14,
                              lg: 12,
                              md: 18,
                              sm: 18,
                            }}
                            // fontWeight={700}
                            color={"white"}
                          >
                            {item?.x + "%"}
                          </Text>
                        </Flex>
                      );
                    })}
                  </Flex>
                </Box>
              </Flex>
            )}
          </>
        ) : (
          <Center h={300}>
            <Text fontSize={30}>{"No Data Found"}</Text>
          </Center>
        )}
      </Box>
    </Card>
  );
}
