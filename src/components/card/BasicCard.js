import React, { useState } from "react";

// ProRIse imports
import {
  Flex,
  Box,
  Icon,
  Text,
  Button,
  Center,
  Tabs,
  TabList,
  Tab,
  Avatar,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";

// Assets
import money from "assets/img/dashboards/svgIcon/money.svg";

import GlobalTable from "components/Table/table";
import { MdEdit } from "react-icons/md";

export default function BasicCard(props) {
  const {
    heading,
    price,
    button,
    paragraph,
    btnText,
    share,
    tabs,
    children,
    buttonHeader,
    table,
    slice,
    getTabIndex,
    buttonArray,
    tabIndex,
    tabsArray,
    userImage,
    tableData,
    onAllCopy,
    onButtonAction,
    refresh,
    favorite,
    isLoading,
    columnsData,
    onCopy,
    onClick,
    refralLink,
    inputRef,
    exchangeConnection,
    leaderBoard,
    ...rest
  } = props;

  const [value, setValue] = useState(slice ? slice : false);

  const handleClick = (e) => {
    getTabIndex(parseInt(e.target.value));
  };

  // ProRIse Color Mode
  return (
    <Card
      //   backgroundImage={bgMastercard}
      backgroundRepeat="no-repeat"
      bgSize="cover"
      alignSelf="center"
      w={{ base: "100%" }}
      bgPosition="10%"
      mx="auto"
      p="20px"
      {...rest}
    >
      <Flex direction="column" color="white" h="100%" w="100%">
        <Flex
          direction={{
            "2xl": "row",
            xl: "row",
            lg: "row",
            md: "row",
            sm: `${tabsArray || tabs ? "column" : "row"}`,
          }}
          justify="space-between"
          alignItems={"center"}
          // mb="30px"
          gap={3}
        >
          <Text
            fontSize={{
              "2xl": "36px",
              xl: "26px",
              lg: "26px",
              md: "26px",
              sm: "16px",
            }}
            fontWeight="bold"
            display={"flex"}
            gap={3}
            alignItems={"center"}
          >
            {tabsArray && <Avatar src={userImage} />}
            {heading}
          </Text>
          {tabs && (
            <Tabs variant="unstyled">
              <TabList>
                <Tab
                  _selected={{
                    color: "white",
                    bg: "rgba(255, 255, 255, 0.08)",
                  }}
                  _focus={{ border: "none" }}
                  color={"gray.200"}
                  borderRadius={8}
                  value={0}
                  fontSize={{ xl: "16px", lg: "16px", md: "16px", sm: "11px" }}
                  onClick={handleClick}
                >
                  Personnes parrainées
                </Tab>
                <Tab
                  _selected={{
                    color: "white",
                    bg: "rgba(255, 255, 255, 0.08)",
                  }}
                  _focus={{ border: "none" }}
                  borderRadius={8}
                  color={"gray.200"}
                  value={1}
                  fontSize={{ xl: "16px", lg: "16px", md: "16px", sm: "12px" }}
                  onClick={handleClick}
                  gap={3}
                >
                  Récompenses réclamées
                </Tab>
              </TabList>
            </Tabs>
          )}
          {buttonArray && (
            <Box
              display={"flex"}
              gap={5}
              justifyContent={{
                "2xl": "space-between",
                xl: "space-between",
                lg: "space-between",
                md: "space-between",
                sm: "center",
              }}
              flexDirection={{
                "2xl": "row",
                xl: "row",
                lg: "row",
                md: "row",
                sm: "column",
              }}
            >
              {buttonArray?.map((item, index) => {
                const isTableData =
                  index === 1 && tableData.length === 0 && item.title !== "unFollow" ? true : false;

                const isExchangeConnection =
                  index === 1 && !exchangeConnection ? true : false;
                return (
                  <Button
                    isLoading={item.title === "Refresh" && isLoading}
                    fontSize="14px"
                    variant="brand"
                    fontWeight="600"
                    w={"auto"}
                    h="36px"
                    display="flex"
                    bg={"#0075FF"}
                    borderRadius="10px"
                    textAlign={"left"}
                    gap={2}
                    onClick={() => onButtonAction(item.title)}
                    disabled={
                      !exchangeConnection ? isExchangeConnection : isTableData
                    }
                  >
                    <Icon as={item.icon} />
                    {item.title}
                  </Button>
                );
              })}
            </Box>
          )}
          {buttonHeader && (
            <Button
              fontSize="14px"
              variant="brand"
              fontWeight="600"
              w={"120px"}
              h="36px"
              display="flex"
              bg={props?.isCopy ? "none" : "#0075FF"}
              borderRadius="10px"
              _hover={{ bg: props?.isCopy ? "none" : "#0075FF" }}
              textAlign={"left"}
              gap={2}
              onClick={onClick}
            >
              <Icon as={MdEdit} />
              {btnText}
            </Button>
          )}
        </Flex>
        <Center py={3}>
          {tabsArray && (
            <Tabs variant="unstyled">
              <TabList>
                {tabsArray?.map((item, index) => (
                  <Tab
                    _selected={{
                      color: "white",
                      bg: "rgba(255, 255, 255, 0.08)",
                    }}
                    _focus={{ border: "none" }}
                    color={"gray.200"}
                    borderRadius={8}
                    value={index}
                    fontSize={{
                      xl: "16px",
                      lg: "16px",
                      md: "16px",
                      sm: "11px",
                    }}
                    onClick={(e) => handleClick(e)}
                  >
                    {item.title}
                  </Tab>
                ))}
              </TabList>
            </Tabs>
          )}
        </Center>
        {paragraph && (
          <Flex direction="column">
            <Box>
              <Text
                fontSize={{
                  "2xl": "xl",
                  xl: "14px",
                  lg: "xl",
                  md: "16px",
                  sm: "12px",
                }}
                color={"white"}
              >
                {paragraph}
              </Text>
            </Box>
            <Flex mt="14px" mb={share ? 3 : 10}>
              <Flex direction="column" me="34px">
                <Text
                  fontSize={{
                    "2xl": "xl",
                    xl: "16px",
                    lg: "xl",
                    md: "16px",
                    sm: "12px",
                  }}
                  fontWeight="500"
                >
                  {button
                    ? tabIndex
                      ? "Réclamez votre récompense dès maintenant!"
                      : `Solde : ${price}`
                    : null}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        )}
        {children}

        {btnText && button && (
          <Button
            fontSize="14px"
            variant="brand"
            fontWeight="600"
            w={"120px"}
            h="36px"
            display="flex"
            bg={props?.isCopy ? "none" : "#0075FF"}
            borderRadius="10px"
            _hover={{ bg: props?.isCopy ? "none" : "#0075FF" }}
            textAlign={"left"}
            gap={2}
          >
            <img src={money} style={{ marginTop: "-2px" }} />
            {!tabIndex ? btnText : btnText + price}
          </Button>
        )}

        {table && (
          <GlobalTable
            columnsData={columnsData ?? []}
            tableData={tableData ?? []}
            tableHeading="Trades actifs"
            slice={value}
            p={0}
            bg={"none"}
            copyTrade={true}
            isLoading={isLoading}
            onCopy={onCopy}
            leaderBoard={leaderBoard}
          />
        )}
      </Flex>
    </Card>
  );
}
