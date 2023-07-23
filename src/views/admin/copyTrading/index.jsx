import React, { useState } from "react";
// ProRIse imports
import {
  Box,
  Center,
  Flex,
  Select,
  SimpleGrid,
  Tab,
  TabList,
  Tabs,
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
import { useSelector } from "react-redux";

export default function Settings() {
  const [tabIndex, setTabIndex] = useState(0);
  const [itemOffset, setItemOffset] = useState(1);

  const { data, isLoading } = useSelector((state) => state?.leaderBoard);

  const { currentPositions } = useSelector((state) => state?.exchange);

  const filterFavData = data?.filter((item) => item.favorite === true);

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
              color={"gray.200"}
              borderRadius={8}
              value={0}
              fontSize={{ xl: "16px", lg: "16px", md: "16px", sm: "12px" }}
              onClick={(e) => setTabIndex(parseInt(e.target.value))}
            >
              Mes favoris
            </Tab>
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
                w="20px"
                h="20px"
                bg="green.300"
                color="black"
                borderRadius={10}
              >
                3
              </Center>
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
      {tabIndex === 0 && !isLoading ? (
        <SimpleGrid
          columns={{ base: 2, md: 2, lg: 3, xl: 3, sm: 1, "2xl": 4 }}
          gap="20px"
          mb="20px"
        >
          {filterFavData?.map((item) => {
            console.log();
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
                icon={item.favorite}
              />
            );
          })}
        </SimpleGrid>
      ) : (
        <SimpleGrid gap={10}>
          <DevelopmentTable
            columnsData={columnsDataActiveTrades}
            tableData={currentPositions}
            tableHeading="Trades actifs"
            p={10}
          />
          <DevelopmentTable
            columnsData={columnsDataTradeHistory}
            tableData={tableDataDevelopment}
            tableHeading="Historique des trades"
            p={10}
          />
        </SimpleGrid>
      )}
    </Box>
  );
}
