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
  useDisclosure,
} from "@chakra-ui/react";

// proRise Imports

import { useDispatch, useSelector } from "react-redux";
import {
  columnsDataTradeHistory,
  columnsLeaderBoard,
} from "../copyTrading/variables/columnsData";
import BasicCard from "components/card/BasicCard";
import Dialog from "components/dialog/Dialog";
import apiInstance from "constants/api";
import { PRO_RISE } from "constants/apiConstants";
import { getLeaderboardsData } from "store/actions";
import { setAuthToken } from "constants/api";
import { toast } from "react-hot-toast";

export default function LeaderBoard() {
  const { data, isLoading } = useSelector((state) => state?.leaderBoard);
  const { currentPositions } = useSelector((state) => state?.exchange);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [capitalPercent, setCapitalPercent] = useState(null);
  const [id, setId] = useState(null);
  const [filterData, setFilterData] = useState([]);

  const dispatch = useDispatch();

  // ProRIse Color Mode

  const onSubmit = async () => {
    const params = {
      capitalPercent: capitalPercent,
      encryptedUid: id,
    };

    try {
      setAuthToken(localStorage.getItem("jwt"));
      await apiInstance.post(`${PRO_RISE.followTrader}`, params);
      toast.success("Successfully Follow This Trades List");
      onClose();
      dispatch(
        getLeaderboardsData({
          searchCriteria: {
            period: "WEEKLY",
            currentPage: 1,
          },
        })
      );
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onCopy = (e) => {
    setFilterData(data?.filter((item) => item?.encryptedUid === e));
    onOpen();
    setId(e);
  };

  return (
    <Box>
      <BasicCard
        columnsData={columnsLeaderBoard}
        tableData={data ?? []}
        table={true}
        isLoading={isLoading}
        p={10}
        onCopy={onCopy}
      />

      <Dialog
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={onSubmit}
        heading={`Paramètres du copiage`}
        capitalPercent={capitalPercent}
        setCapitalPercent={setCapitalPercent}
        connection={false}
        filterData={filterData}
      />
    </Box>
  );
}
