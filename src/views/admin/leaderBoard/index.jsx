import React, { useEffect, useState } from "react";
// ProRIse imports
import { Box, Button, Flex, Icon, useDisclosure } from "@chakra-ui/react";

// proRise Imports

import { useDispatch, useSelector } from "react-redux";
import { columnsLeaderBoard } from "../copyTrading/variables/columnsData";
import BasicCard from "components/card/BasicCard";
import Dialog from "components/dialog/Dialog";
import apiInstance from "constants/api";
import { PRO_RISE } from "constants/apiConstants";
import { getLeaderboardsData } from "store/actions";
import { setAuthToken } from "constants/api";
import { toast } from "react-hot-toast";
import InputFeild from "components/fields/InputField";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { CiSearch } from "react-icons/ci";
import { IoRefresh } from "react-icons/io5";

export default function LeaderBoard() {
  const { data, isLoading } = useSelector((state) => state?.leaderBoard);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [capitalPercent, setCapitalPercent] = useState(null);
  const [id, setId] = useState(null);
  const [filterData, setFilterData] = useState([]);
  const [balance, setBalance] = useState(0);
  const [itemOffset, setItemOffset] = useState(1);

  const [search, setSearch] = useState("");

  const dispatch = useDispatch();

  const onSearch = () => {
    const isAllUpperCase = search
      .split("")
      .every((char) => char === char.toUpperCase());

    dispatch(
      getLeaderboardsData({
        searchCriteria: {
          currentPage: itemOffset,
          nickName: !isAllUpperCase && search,
          encryptedUid: isAllUpperCase && search,
        },
      })
    );
  };

  useEffect(() => {
    setAuthToken(localStorage.getItem("jwt"));
    dispatch(
      getLeaderboardsData({
        searchCriteria: {
          period: "WEEKLY",
          currentPage: itemOffset,
        },
      })
    );
  }, [itemOffset]);

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

  const getCapital = async () => {
    const { data } = await apiInstance.post(`${PRO_RISE.getCapitalPercent}`);
    setCapitalPercent(data?.defaultCapitalPercent);
    apiInstance
      .post(`${PRO_RISE.getWalletBalance}`, {
        symbol: "USDT",
      })
      .then((res) =>
        setBalance(
          res?.data?.balance ? parseFloat(res?.data?.balance)?.toFixed(1) : 0
        )
      );
  };

  const onCopy = async (e) => {
    getCapital();
    setFilterData(data?.filter((item) => item?.encryptedUid === e));
    onOpen();
    setId(e);
  };

  const refresh = () => {
    dispatch(
      getLeaderboardsData({
        searchCriteria: {
          period: "WEEKLY",
          currentPage: itemOffset,
        },
      })
    );
    setSearch("");
  };

  return (
    <Box>
      <BasicCard
        columnsData={columnsLeaderBoard}
        tableData={data ?? []}
        table={true}
        isLoading={isLoading}
        p={4}
        onCopy={onCopy}
      >
        <Flex justifyContent={"space-between"}>
          <InputFeild
            w={{ xl: "268px", lg: "268px", md: "100%", sm: "100%" }}
            icon={CiSearch}
            iconPlacement="right"
            placeholder="Rechercher un trader"
            onClick={onSearch}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {data?.length === 20 && (
            <Flex direction={"row"} justifyContent={"right"} gap={2} py={2}>
              <Button
                loadingText="Loading"
                spinnerPlacement="start"
                variant="brand"
                fontWeight="500"
                mb={{ base: "30px", sm: "0px" }}
                bg="rgba(255, 255, 255, 0.08)"
                borderRadius="6px"
                _hover={{ bg: "rgba(255, 255, 255, 0.08)" }}
                onClick={() => setItemOffset(itemOffset - 1)}
                gap={3}
                disabled={itemOffset === 1 && true}
              >
                <Icon as={ArrowLeftIcon} />
              </Button>
              <Button
                loadingText="Loading"
                spinnerPlacement="start"
                variant="brand"
                fontWeight="500"
                mb={{ base: "30px", sm: "0px" }}
                bg="rgba(255, 255, 255, 0.08)"
                borderRadius="6px"
                _hover={{ bg: "rgba(255, 255, 255, 0.08)" }}
                onClick={() => setItemOffset(itemOffset + 1)}
                gap={3}
                disabled={itemOffset === data?.length && true}
              >
                <Icon as={ArrowRightIcon} />
              </Button>
              <Button
                isLoading={isLoading}
                loadingText="Loading"
                spinnerPlacement="start"
                variant="brand"
                fontWeight="500"
                mb={{ base: "30px", sm: "0px" }}
                bg="#0075FF"
                borderRadius="10px"
                _hover={{ bg: "#0075FF" }}
                onClick={refresh}
                gap={3}
              >
                <Icon as={IoRefresh} />
                Refresh
              </Button>
            </Flex>
          )}
        </Flex>
      </BasicCard>

      <Dialog
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={onSubmit}
        heading={`Paramètres du copiage`}
        capitalPercent={capitalPercent}
        setCapitalPercent={setCapitalPercent}
        connection={false}
        filterData={filterData[0] ?? {}}
        btnText={"Copier"}
        balance={balance}
      />
    </Box>
  );
}
