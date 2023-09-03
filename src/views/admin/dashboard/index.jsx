import React from "react";

// ProRIse imports
import { Box, Grid, GridItem } from "@chakra-ui/react";

// Custom components

import TotalSpent from "views/admin/dashboard/components/TotalSpent";

import { useDispatch, useSelector } from "react-redux";
import DailyTraffic from "./components/ActiveTraders";
import { getOpenPositions } from "store/actions";
import { useEffect } from "react";
import { columnsDataActiveTrades } from "../copyTrading/variables/columnsData";
import DevelopmentTable from "../copyTrading/components/DevelopmentTable";
import { setAuthToken } from "constants/api";
import apiInstance from "constants/api";
import { PRO_RISE } from "constants/apiConstants";
import { useState } from "react";
import { getClosedTrades } from "store/actions";

export default function Dashboard() {
  const { currentPositions, exchangeConnection, closedPositions, isLoading } =
    useSelector((state) => state?.exchange);

  const [balance, setBalance] = useState(0);
  const [analytics, setAnalytics] = useState({});
  const [walletHistory, setWalletHistory] = useState([]);

  const dispatch = useDispatch();

  useEffect(async () => {
    if (exchangeConnection) {
      setAuthToken(localStorage.getItem("jwt"));
      const { data } = await apiInstance.post(`${PRO_RISE.getWalletBalance}`, {
        symbol: "USDT",
      });
      if (data?.success && data?.balance) {
        setBalance(parseFloat(data?.balance)?.toFixed(1));
      } else {
        setBalance(0);
      }
      dispatch(getClosedTrades("tradeHistory"));
      await apiInstance
        .post(`${PRO_RISE.getUserPerformanceAnalytics}`)
        .then((resp) => {
          delete resp?.data?.analytics?.data;
          delete resp?.data?.analytics?.mdd;
          delete resp?.data?.analytics?.winrate;
          setAnalytics(resp?.data?.analytics);
        });
      await dispatch(
        getOpenPositions({
          exchange: exchangeConnection,
        })
      );

      await apiInstance
        .post(`${PRO_RISE.getWalletHistory}`, {
          searchCriteria: {
            period: "7",
          },
        })
        .then((resp) => {
          setWalletHistory(resp?.data?.history);
        });
    } else {
      setBalance(0);
    }
  }, [exchangeConnection]);

  return (
    <Box>
      {/* <Flex justifyContent={"right"} py={5}>
        <Select
          bg="rgba(255, 255, 255, 0.08)"
          border="none"
          color="white"
          w={300}

          // placeholder="Trier par : ROI 7 jours"
        >
          {[1, 2, 3, 4, 5].map((item, index) => (
            <option
              value={
                index === 0
                  ? "7 DAYS"
                  : index === 1
                  ? "30 DAYS"
                  : index === 2
                  ? "3 MONTHS"
                  : index === 3
                  ? "6 MONTHS"
                  : index === 4
                  ? "1 YEAR"
                  : null
              }
            >
              {index === 0
                ? "Trier par : 7 jours"
                : index === 1
                ? "Trier par : 30 jours"
                : index === 2
                ? "Trier par : 3 mois"
                : index === 3
                ? "Trier par :  6 mois"
                : index === 4
                ? "Trier par : 1 année"
                : null}
            </option>
          ))}
        </Select>
      </Flex> */}

      <Grid
        templateRows="repeat(1, 1fr)"
        templateColumns="repeat(3, 1fr)"
        gap={8}
      >
        <GridItem
          colSpan={{
            "2xl": 2,
            xl: 2,
            lg: 2,
            md: 4,
            sm: 4,
          }}
        >
          <TotalSpent
            heading="Portefeuille"
            design={1}
            balance={exchangeConnection ? balance ?? 0 : 0}
            walletHistory={walletHistory ?? []}
          />
        </GridItem>
        <GridItem
          colSpan={{
            "2xl": 2,
            xl: 2,
            lg: 2,
            md: 4,
            sm: 4,
          }}
        >
          <DailyTraffic
            pieHeight={"80%"}
            currentPositions={currentPositions}
            exchangeConnection={exchangeConnection}
            isLoading={isLoading}
          />
        </GridItem>
        <GridItem colSpan={4}>
          <TotalSpent
            heading="Performances"
            design={2}
            analytics={analytics}
            data={exchangeConnection ? closedPositions ?? [] : []}
          />
        </GridItem>
        <GridItem colSpan={4}>
          <DevelopmentTable
            columnsData={columnsDataActiveTrades}
            tableData={exchangeConnection ? currentPositions ?? [] : []}
            tableHeading="Trades actifs"
            p={10}
          />
        </GridItem>
      </Grid>

      {/* <Flex direction={"row"} justifyContent={"space-between"}>
        <Text
          mt="16px"
          mb="16px"
          color={"gary.200"}
          fontSize="32px"
          // ms="24px"
          fontWeight="700"
        >
          Top traders
        </Text>
        <Center>
          <>
            <NavLink
              fontWeight="500"
              color={"gary.200"}
              to="/admin/top-traders"
              display={"flex"}
              alignItems={"center"}
              gap={3}
            >
              {"En voir plus "}
            </NavLink>
            <IoIosArrowForward />
          </>
        </Center>
      </Flex>

      <SimpleGrid
        columns={{ base: 2, md: 2, lg: 2, xl: 2, sm: 1, "2xl": 4 }}
        gap="20px"
        mb="20px"
      >
        {data?.slice(0, 4).map((item) => {
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
              copyCount={item.followerCount}
              icon={item.isStar}
            />
          );
        })}
      </SimpleGrid> */}
    </Box>
  );
}
