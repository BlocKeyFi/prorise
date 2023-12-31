import React from "react";
// ProRIse imports
import {
  Avatar,
  Badge,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { formatDistanceToNow } from "date-fns";
// Custom components
import Card from "components/card/Card.js";
import LineAreaChart from "components/charts/LineAreaChart";

import star from "../../assets/img/dashboards/svgIcon/star.svg";
import copy from "../../assets/img/dashboards/svgIcon/copy-fill.svg";
import user from "../../assets/img/dashboards/Profile.png";
import present from "../../assets/img/dashboards/svgIcon/presentation-chart.svg";
import check from "../../assets/img/dashboards/svgIcon/checkmark-light.svg";
import { Link } from "react-router-dom";
import { lineChartDataCard } from "variables/charts";
import { lineChartOptionsCard } from "variables/charts";
import { formattedData } from "utils/utils";
import ReactApexChart from "react-apexcharts";
import { AiOutlineCheck } from "react-icons/ai";

export default function TradersCard(props) {
  const { index, itemOffset, history, ...rest } = props;

  // ProRIse Color Mode

  const textColor = useColorModeValue("white", "white");
  const textColorSecondary = useColorModeValue("gray.200", "gray.200");
  const textColorCount = useColorModeValue("green.300", "green.300");
  const textColorCountNegative = "#F00090";

  const daysAgo = formatDistanceToNow(new Date(props?.paragraph), {
    addSuffix: true,
  });

  const finalData = history?.map((item) => ({
    x: new Date(parseInt(item?.updateTimeStamp)),
    y: parseFloat(item?.pnl).toFixed(0),
  }));

  const groupedData = finalData?.reduce((accumulator, item) => {
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

  return (
    <Link to={`/admin/trader-detail/${props?.id}`}>
      <Card
        justifyContent="center"
        align="center"
        direction="column"
        w="100%"
        mb="0px"
        {...rest}
      >
        {itemOffset === 1 &&
        (index === 0 ||
          index === 1 ||
          index === 2 ||
          index === 3 ||
          index === 4 ||
          index === 5) ? (
          <Badge
            ml="1"
            color={"white"}
            fontWeight={600}
            position={"absolute"}
            top={2}
            right={2}
          >
            {index + 1}
          </Badge>
        ) : null}
        <Flex justify="space-between" direction={"column"} textAlign={"left"}>
          <Flex align="center">
            <Flex justifyContent="center" alignItems="center" gap={5}>
              <Avatar
                h={{ base: "48px", xl: "36px", "2xl": "48px" }}
                w={{ base: "48px", xl: "36px", "2xl": "48px" }}
                src={props?.image}
              />
              <Flex direction="column" align="start">
                <Text
                  color={textColor}
                  fontSize={{ base: "md", xl: "sm", "3xl": "md" }}
                  fontWeight="700"
                >
                  {props?.heading?.replaceAll("Anonymous", "")}
                </Text>
                <Text
                  color="secondaryGray.600"
                  textAlign="left"
                  fontSize={{ base: "sm", xl: "xs", "3xl": "sm" }}
                  fontWeight="400"
                >
                  {daysAgo}
                </Text>
              </Flex>
              {props?.icon && <img src={star} />}
            </Flex>
          </Flex>
        </Flex>
        <Flex w="100%" flexDirection={{ base: "column", lg: "row" }}>
          <Flex direction={"row"} w="100%" mt="28px" justify="space-between">
            <Flex direction={"column"} w="100%" gap={1}>
              <Flex direction={"row"} w="100%" gap={1}>
                <img src={present} />
                <Text
                  color={textColorSecondary}
                  fontSize={{
                    "2xl": "13px",
                    xl: "11px",
                    lg: "12px",
                    md: "14px",
                    sm: "12px",
                  }}
                  textAlign="start"
                  lineHeight="100%"
                  fontWeight="600"
                >
                  {props?.text1}
                </Text>
              </Flex>
              <Text
                color={
                  props?.textvalue1?.includes("-")
                    ? textColorCountNegative
                    : textColorCount
                }
                fontSize={{ xl: "26px", lg: "26px", md: "26px", sm: "20px" }}
                textAlign="start"
                fontWeight="600"
                py={"5"}
              >
                {props?.textvalue1 === "-" || props?.textvalue1 === null
                  ? props?.textvalue1
                  : parseFloat(props?.textvalue1).toFixed(2) + "%"}
              </Text>
            </Flex>

            <Flex direction={"column"} w="100%">
              <Flex direction={"row"} w="100%" gap={1} justifyContent={"end"}>
                <img src={present} />
                <Text
                  color={textColorSecondary}
                  fontSize={{
                    "2xl": "13px",
                    xl: "11px",
                    lg: "12px",
                    md: "14px",
                    sm: "12px",
                  }}
                  textAlign="end"
                  lineHeight="100%"
                  fontWeight="600"
                >
                  {props?.text2}
                </Text>
              </Flex>

              {/* {props?.textvalue2} */}
              {/* <LineAreaChart
              chartData={lineChartDataCard}
              chartOptions={lineChartOptionsCard}
             formattedData
            /> */}

              <LineAreaChart
                chartData={[
                  {
                    name: "",
                    data: finalData?.length ? finalData : [0, 0],
                    color: props?.textvalue1?.includes("-")
                      ? textColorCountNegative
                      : "#28bce0",
                  },
                ]}
                chartOptions={lineChartOptionsCard}
                height={props?.textvalue2?.includes("-") ? "40%" : "50%"}
              />
              {/* 
            <ReactApexChart
              options={lineChartOptionsCard} // Aapke options object
              series={[
                {
                  name: "",
                  data: props?.textvalue2?.includes("-")
                    ? [0, 0]
                    : formattedData,
                  color: props?.textvalue2?.includes("-")
                    ? textColorCountNegative
                    : "#28bce0",
                },
              ]}
              type="line"
              height={props?.textvalue2?.includes("-") ? "40%" : "50%"}
            /> */}
            </Flex>
          </Flex>
        </Flex>
        <Flex direction={"row"} justify="space-between">
          <Flex direction={"column"} w="100%" gap={1}>
            <Text
              color={textColor}
              fontSize={{ xl: "16px", lg: "16px", md: "16px", sm: "14px" }}
              textAlign="start"
              lineHeight="100%"
              fontWeight="600"
            >
              {props?.copyCount + " " + "personnes"}
            </Text>
            <Text
              color={textColorSecondary}
              fontSize={{ xl: "12px", lg: "12px", md: "12px", sm: "10px" }}
              textAlign="start"
              lineHeight="100%"
              fontWeight="400"
            >
              {"ont copié ce trade"}
            </Text>
          </Flex>
          {props?.isfollowed ? (
            <Flex
              display={"flex"}
              gap={2}
              alignItems={"center"}
              px={4}
              color={textColorSecondary}
            >
              <Icon as={AiOutlineCheck} />
              {"Copié"}
            </Flex>
          ) : (
            <Link to={`/admin/trader-detail/${props?.id}`}>
              <Button
                fontSize="16px"
                variant="brand"
                fontWeight="500"
                w={"100%"}
                h="35px"
                bg={props?.isCopy ? "none" : "#0075FF"}
                borderRadius="10px"
                _hover={{ bg: props?.isCopy ? "none" : "#0075FF" }}
                textAlign={"left"}
                gap={2}
              >
                <img src={copy} width={15} height={15} />
                {props?.btnText}
              </Button>
            </Link>
          )}
        </Flex>
      </Card>
    </Link>
  );
}
