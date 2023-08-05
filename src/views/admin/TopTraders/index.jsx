import React, { useEffect, useState } from "react";

// ProRIse imports
import {
  Box,
  SimpleGrid,
  Select,
  Flex,
  Button,
  Center,
  Spinner,
  Icon,
  Input,
} from "@chakra-ui/react";

// Custom components

import TradersCard from "components/card/TradersCard";
import { useDispatch, useSelector } from "react-redux";
import { getLeaderboardsData } from "store/actions";
import { resetTraderPositions } from "store/actions";
import { IoRefresh } from "react-icons/io5";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import InputFeild from "components/fields/InputField";
import { CiSearch } from "react-icons/ci";
import { RiArrowDownSFill } from "react-icons/ri";

export default function Marketplace() {
  const { data, isLoading } = useSelector((state) => state?.leaderBoard);

  const [itemOffset, setItemOffset] = useState(1);

  // ProRIse Color Mode
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetTraderPositions());
    dispatch(
      getLeaderboardsData({
        searchCriteria: {
          period: "WEEKLY",
          currentPage: itemOffset,
        },
      })
    );
  }, [itemOffset]);

  const refresh = () => {
    dispatch(
      getLeaderboardsData({
        searchCriteria: {
          period: "WEEKLY",
          currentPage: itemOffset,
        },
      })
    );
  };

  return (
    <Box>
      <Flex justifyContent={"space-between"}>
        <InputFeild
          w={{ xl: "268px", lg: "268px", md: "100%", sm: "100%" }}
          required
          icon={CiSearch}
          iconPlacement="right"
          placeholder="Rechercher un trader"
        />
        <Flex w="100%" gap={4} p={4} color="white" justifyContent={"end"}>
          <Select
            bg="rgba(255, 255, 255, 0.08)"
            border="none"
            color="white"
            placeholder="Trier par : ROI 7 jours"
            w={{ "2xl": "15%", xl: "30%", lg: "25%", md: "35%", sm: "100%" }}
            icon={<Icon as={RiArrowDownSFill} />}
          />
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
      </Flex>
      {isLoading ? (
        <Center h="60vh">
          <Spinner size="xl" />
        </Center>
      ) : (
        <SimpleGrid
          columns={{ base: 2, md: 2, lg: 3, xl: 4, sm: 1, "2xl": 5 }}
          gap="20px"
          mb="20px"
        >
          {data?.map((item) => {
            return (
              <TradersCard
                id={item?.encryptedUid}
                heading={item?.nickName}
                paragraph={item?.updated_at}
                image={item?.userPhotoUrl}
                text1={"ROI 7 jours"}
                text2={"Tendance 7 jours"}
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
      )}
      {!isLoading && (
        <Flex direction={"row"} justifyContent={"space-between"}>
          <Button
            loadingText="Loading"
            spinnerPlacement="start"
            variant="brand"
            fontWeight="500"
            mb={{ base: "30px", sm: "0px" }}
            bg="#0075FF"
            borderRadius="10px"
            _hover={{ bg: "#0075FF" }}
            onClick={() => setItemOffset(itemOffset - 1)}
            gap={3}
            disabled={itemOffset === 1 && true}
          >
            <Icon as={ArrowLeftIcon} />
            Previous Page
          </Button>
          <Button
            loadingText="Loading"
            spinnerPlacement="start"
            variant="brand"
            fontWeight="500"
            mb={{ base: "30px", sm: "0px" }}
            bg="#0075FF"
            borderRadius="10px"
            _hover={{ bg: "#0075FF" }}
            onClick={() => setItemOffset(itemOffset + 1)}
            gap={3}
            disabled={itemOffset === data?.length && true}
          >
            Next Page
            <Icon as={ArrowRightIcon} />
          </Button>
        </Flex>
      )}
    </Box>
  );
}
