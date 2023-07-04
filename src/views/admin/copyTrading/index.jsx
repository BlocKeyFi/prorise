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

export default function Settings() {
  const [tabIndex, setTabIndex] = useState(0);

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
      {tabIndex === 0 ? (
        <SimpleGrid
          columns={{ base: 2, md: 2, lg: 3, xl: 3, sm: 1, "2xl": 4 }}
          gap="20px"
          mb="20px"
        >
          {TradersCardData?.map((item) => {
            return (
              <TradersCard
                heading={item?.name}
                paragraph={item?.subheading}
                text1={item?.text1}
                text2={item?.text2}
                textvalue1={item?.textvalue1}
                textvalue2={item?.textvalue2}
                btnText="Copier"
                isCopy={item?.isCopy}
                copyCount={item.copyCount}
                icon={item.isStar}
              />
            );
          })}
        </SimpleGrid>
      ) : (
        <SimpleGrid gap={10}>
          <DevelopmentTable
            columnsData={columnsDataActiveTrades}
            tableData={tableDataDevelopment}
            tableHeading="Trades actifs"
            slice={true}
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
