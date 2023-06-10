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
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";

// Assets
import money from "assets/img/dashboards/svgIcon/money.svg";
import { TfiTwitter } from "react-icons/tfi";
import { TbBrandTelegram, TbBrandWhatsapp } from "react-icons/tb";

import copyIcon from "../../assets/img/dashboards/svgIcon/copy.svg";

import { columnsDataActiveTrades } from "views/admin/copyTrading/variables/columnsData";
import tableDataDevelopment from "views/admin/copyTrading/variables/tableDataDevelopment.json";
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
    ...rest
  } = props;

  const [value, setValue] = useState(slice ? slice : false);

  // ProRIse Color Mode
  return (
    <Card
      //   backgroundImage={bgMastercard}
      backgroundRepeat="no-repeat"
      bgSize="cover"
      alignSelf="center"
      w={{ base: "100%", md: "60%", xl: "99%" }}
      bgPosition="10%"
      mx="auto"
      p="30px"
      {...rest}
    >
      <Flex direction="column" color="white" h="100%" w="100%">
        <Flex justify="space-between" align="center" mb="30px">
          <Text fontSize="32px" fontWeight="bold">
            {heading}
          </Text>
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
                  onClick={() => setValue(!value)}
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
                  onClick={() => setValue(!value)}
                  gap={3}
                >
                  Récompenses réclamées
                </Tab>
              </TabList>
            </Tabs>
          )}
        </Flex>
        {children}
        {paragraph && (
          <Flex direction="column">
            <Box>
              <Text
                fontSize={{ sm: "xl", lg: "sm", xl: "16px" }}
                color={"white"}
              >
                {paragraph}
              </Text>
            </Box>
            <Flex mt="14px" mb={share ? 4 : 10}>
              <Flex direction="column" me="34px">
                <Text fontSize="xl" fontWeight="500">
                  {price}
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
            {btnText}
          </Button>
        )}
        {share && (
          <Flex direction={"row"} gap={10} color={"gray.200"} fontSize={14}>
            <Flex gap={10}>
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
                    width={350}
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
            columnsData={columnsDataActiveTrades}
            tableData={tableDataDevelopment}
            tableHeading="Trades actifs"
            slice={value}
            p={0}
            bg={"none"}
          />
        )}
      </Flex>
    </Card>
  );
}
