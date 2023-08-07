import React, { useState } from "react";

// ProRIse imports
import {
  Flex,
  Box,
  Icon,
  Text,
  Button,
  Center,
  InputGroup,
  InputLeftElement,
  Input,
  Image,
  Tabs,
  TabList,
  Tab,
  Avatar,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";

// Assets
import money from "assets/img/dashboards/svgIcon/money.svg";
import { TfiTwitter } from "react-icons/tfi";
import { TbBrandTelegram, TbBrandWhatsapp } from "react-icons/tb";

import copyIcon from "../../assets/img/dashboards/svgIcon/copy.svg";

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
    ...rest
  } = props;

  const [value, setValue] = useState(slice ? slice : false);

  const handleClick = (e) => {
    console.log(e);
    // setValue(!value);
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
            sm: `${tabsArray ? "column" : "row"}`,
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
            <Box display={"flex"} gap={5}>
              {buttonArray?.map((item) => {
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
                      item.title === "Copier" && tableData.length === 0
                        ? true
                        : false
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
                    onClick={(e) => handleClick(e)}
                  >
                    {item.title}
                  </Tab>
                ))}
              </TabList>
            </Tabs>
          )}
        </Center>
        {children}

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
            <Flex mt="14px" mb={share ? 4 : 10}>
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
                    ? !tabIndex
                      ? "Réclamez votre récompense dès maintenant!"
                      : `Solde : ${price}`
                    : null}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        )}
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
            {tabIndex ? btnText : btnText + price}
          </Button>
        )}
        {share && (
          <Flex
            direction={{
              "2xl": "row",
              xl: "row",
              lg: "row",
              md: "row",
              sm: "column",
            }}
            gap={10}
            color={"gray.200"}
            fontSize={14}
            justifyContent={"space-between"}
          >
            <Flex
              gap={{ "2xl": 10, xl: 4, lg: 20, md: 10, sm: 10 }}
              justifyContent={"center"}
            >
              <Flex direction={"column"} alignItems={"center"} gap={3}>
                <Center
                  bg={"rgba(160, 174, 192, 0.04)"}
                  _hover={"rgba(160, 174, 192, 0.04)"}
                  w="50px"
                  h="50px"
                  lineHeight="100%"
                  borderRadius="10px"
                >
                  <Icon
                    as={TbBrandTelegram}
                    w="20px"
                    h="auto"
                    color="gray.400"
                  />
                </Center>
                Telegram
              </Flex>
              <Flex direction={"column"} alignItems={"center"} gap={3}>
                <Center
                  bg={"rgba(160, 174, 192, 0.04)"}
                  _hover={"rgba(160, 174, 192, 0.04)"}
                  w="50px"
                  h="50px"
                  lineHeight="100%"
                  borderRadius="10px"
                >
                  <Icon as={TfiTwitter} w="20px" h="auto" color="gray.400" />
                </Center>
                Twitter
              </Flex>
              <Flex direction={"column"} alignItems={"center"} gap={3}>
                <Center
                  bg={"rgba(160, 174, 192, 0.04)"}
                  _hover={"rgba(160, 174, 192, 0.04)"}
                  w="50px"
                  h="50px"
                  lineHeight="100%"
                  borderRadius="10px"
                >
                  <Icon
                    as={TbBrandWhatsapp}
                    w="20px"
                    h="auto"
                    color="gray.400"
                  />
                </Center>
                Whatsapp
              </Flex>
            </Flex>
            <Center>ou</Center>
            <Flex direction={"column"} alignItems={"center"} gap={3}>
              <Center>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" mt={2}>
                    <Image src={copyIcon} />
                  </InputLeftElement>
                  <Input
                    fontWeight="500"
                    placeholder="https://www.prorise.io/ref/123456789ABC"
                    _placeholder={{ fontWeight: "400", color: "white" }}
                    h="53px"
                    borderRadius="8"
                    width={"100%"}
                    value={"https://www.prorise.io/ref/123456789ABC"}
                    color={"gray.200"}
                    disabled
                  />
                </InputGroup>
              </Center>
              Copiez votre lien
            </Flex>
          </Flex>
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
          />
        )}
      </Flex>
    </Card>
  );
}
