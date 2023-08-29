import React, { useState } from "react";
// ProRIse imports
import {
  Box,
  Button,
  Center,
  Flex,
  Select,
  SimpleGrid,
  Tab,
  TabList,
  Tabs,
  Text,
} from "@chakra-ui/react";

// proRise Imports
import tableDataDevelopment from "views/admin/copyTrading/variables/tableDataDevelopment.json";

import {
  columnsDataActiveTrades,
  columnsDataTradeHistory,
} from "./variables/columnsData";
// custom component

import DevelopmentTable from "./components/DevelopmentTable";
import TradersCard from "components/card/TradersCard";
import { TradersCardData } from "constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOpenPositions } from "store/actions";
import { getClosedTrades } from "store/actions";
import { setAuthToken } from "constants/api";
import { PRO_RISE } from "constants/apiConstants";
import apiInstance from "constants/api";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { getLeaderboardsData } from "store/actions";

export default function Settings() {
  const [tabIndex, setTabIndex] = useState(1);
  const [getFollowedTraders, setFollowedTraders] = useState([]);

  const { data, isLoading } = useSelector((state) => state?.leaderBoard);

  const { currentPositions, exchangeConnection, closedPositions } = useSelector(
    (state) => state?.exchange
  );

  const dispatch = useDispatch();

  useEffect(async () => {
    setAuthToken(localStorage.getItem("jwt"));
    if (exchangeConnection) {
      dispatch(
        getOpenPositions({
          exchange: exchangeConnection,
        })
      );
      dispatch(getClosedTrades("tradeHistory"));
    }

    const { data } = await apiInstance.post(`${PRO_RISE.getFollowedTraders}`);

    setFollowedTraders(data?.success ? data?.traders : []);
    dispatch(
      getLeaderboardsData({
        searchCriteria: {
          currentPage: 1,
          favorite: true,
        },
      })
    );
  }, []);

  // ProRIse Color Mode
  return (
    <Box>
      <Flex
        direction={{
          "2xl": "row",
          xl: "row",
          lg: "row",
          md: "row",
          sm: "column-reverse",
        }}
        w="100%"
        p={4}
        color="white"
        justifyContent={"space-between"}
      >
        <Tabs variant="unstyled" pt={{ xl: 0, lg: 0, md: 0, sm: 4 }}>
          <TabList>
            <Tab
              _selected={{ color: "white", bg: "rgba(255, 255, 255, 0.08)" }}
              _focus={{ border: "none" }}
              borderRadius={8}
              color={"gray.200"}
              value={1}
              fontSize={{ xl: "16px", lg: "16px", md: "16px", sm: "12px" }}
              onClick={(e) => setTabIndex(parseInt(e.target.value))}
              gap={3}
            >
              Mes trades
              <Center
                w="23px"
                h="23px"
                bg="green.300"
                color="black"
                borderRadius={50}
                fontSize={14}
                fontWeight={800}
              >
                {currentPositions?.length}
              </Center>
            </Tab>
            <Tab
              _selected={{ color: "white", bg: "rgba(255, 255, 255, 0.08)" }}
              _focus={{ border: "none" }}
              borderRadius={8}
              color={"gray.200"}
              value={3}
              fontSize={{ xl: "16px", lg: "16px", md: "16px", sm: "12px" }}
              onClick={(e) => setTabIndex(parseInt(e.target.value))}
              gap={3}
            >
              Mes suivis
            </Tab>
            <Tab
              _selected={{ color: "white", bg: "rgba(255, 255, 255, 0.08)" }}
              _focus={{ border: "none" }}
              color={"gray.200"}
              borderRadius={8}
              value={0}
              fontSize={{ xl: "16px", lg: "16px", md: "16px", sm: "12px" }}
              onClick={(e) => setTabIndex(parseInt(e.target.value))}
            >
              Mes favoris
            </Tab>
          </TabList>
        </Tabs>
        <Select
          bg="rgba(255, 255, 255, 0.08)"
          border="none"
          color="white"
          placeholder="Trier par : ROI 7 jours"
          w={{ "2xl": "15%", xl: "20%", lg: "25%", md: "35%", sm: "100%" }}
        />
      </Flex>
      {tabIndex === 0 && !isLoading && (
        <SimpleGrid
          columns={{ base: 2, md: 2, lg: 3, xl: 3, sm: 1, "2xl": 4 }}
          gap="20px"
          mb="20px"
        >
          {data?.length ? (
            data?.map((item) => {
              return (
                <TradersCard
                  id={item?.encryptedUid}
                  heading={item?.nickName}
                  paragraph={item?.updated_at}
                  image={item?.userPhotoUrl}
                  text1={"ROI 7 jours"}
                  text2={"Win rate 7 jours"}
                  textvalue1={item?.roi}
                  textvalue2={item?.winrate}
                  btnText="Copier"
                  isCopy={item?.isCopy}
                  copyCount={item?.followerCount}
                  icon={item?.favorite}
                />
              );
            })
          ) : (
            <Center
              height={"50vh"}
              width={"165vh"}
              display={"flex"}
              flexDirection={"column"}
              gap={30}
            >
              <Text fontSize="32px" fontWeight="600" lineHeight="100%">
                {"No Favourite Found"}
              </Text>
              <Link to="/admin/top-traders">
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
                  {"Add Trades"}
                </Button>
              </Link>
            </Center>
          )}
        </SimpleGrid>
      )}

      {tabIndex === 1 && (
        <SimpleGrid gap={10}>
          <DevelopmentTable
            columnsData={columnsDataActiveTrades}
            tableData={exchangeConnection ? currentPositions ?? [] : []}
            tableHeading="Trades actifs"
            p={10}
          />
          <DevelopmentTable
            columnsData={columnsDataTradeHistory}
            tableData={exchangeConnection ? closedPositions ?? [] : []}
            tableHeading="Historique des trades"
            p={10}
          />
        </SimpleGrid>
      )}

      {tabIndex === 3 && (
        <SimpleGrid
          columns={{ base: 2, md: 2, lg: 3, xl: 3, sm: 1, "2xl": 4 }}
          gap="20px"
          mb="20px"
        >
          {getFollowedTraders.length ? (
            getFollowedTraders?.map((item) => {
              return (
                <TradersCard
                  id={item?.encryptedUid}
                  heading={item?.nickName}
                  paragraph={item?.updated_at}
                  image={item?.userPhotoUrl}
                  text1={"ROI 7 jours"}
                  text2={"Win rate 7 jours"}
                  textvalue1={item?.roi}
                  textvalue2={item?.winrate}
                  btnText="Copier"
                  isCopy={item?.isCopy}
                  copyCount={item?.followerCount}
                  icon={item?.favorite}
                />
              );
            })
          ) : (
            <Center
              height={"50vh"}
              width={"165vh"}
              display={"flex"}
              flexDirection={"column"}
              gap={30}
            >
              <Text fontSize="32px" fontWeight="600" lineHeight="100%">
                {"No Follow Trade Found"}
              </Text>
              <Link to="/admin/top-traders">
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
                  {"Copy Trades"}
                </Button>
              </Link>
            </Center>
          )}
        </SimpleGrid>
      )}
    </Box>
  );
}
