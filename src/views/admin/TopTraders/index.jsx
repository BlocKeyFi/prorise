import React, { useEffect } from "react";

// ProRIse imports
import { Box, SimpleGrid, Select, Flex } from "@chakra-ui/react";

// Custom components

import TradersCard from "components/card/TradersCard";
import { useDispatch, useSelector } from "react-redux";
import { getLeaderboardsData } from "store/actions";

export default function Marketplace() {
  const { data } = useSelector((state) => state?.leaderBoard);
  // ProRIse Color Mode
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getLeaderboardsData({
        searchCriteria: {
          period: "WEEKLY",
          currentPage: 1,
        },
      })
    );
  }, []);
  return (
    <Box>
      <Flex w="100%" p={4} color="white" justifyContent={"end"}>
        <Select
          bg="rgba(255, 255, 255, 0.08)"
          border="none"
          color="white"
          placeholder="Trier par : ROI 7 jours"
          w={"15%"}
        />
      </Flex>
      <SimpleGrid
        columns={{ base: 2, md: 2, lg: 3, xl: 3, sm: 1, "2xl": 4 }}
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
      </SimpleGrid>
    </Box>
  );
}
