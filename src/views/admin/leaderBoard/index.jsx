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

import { useDispatch, useSelector } from "react-redux";
import {
  columnsDataTradeHistory,
  columnsLeaderBoard,
} from "../copyTrading/variables/columnsData";
import BasicCard from "components/card/BasicCard";

export default function LeaderBoard() {
  const { data, isLoading } = useSelector((state) => state?.leaderBoard);
  const { currentPositions } = useSelector((state) => state?.exchange);

  // ProRIse Color Mode
  return (
    <Box>
      <BasicCard
        columnsData={columnsLeaderBoard}
        tableData={currentPositions ?? []}
        table={true}
        isLoading={isLoading}
        p={10}
      />
    </Box>
  );
}
