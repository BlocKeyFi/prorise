import React from "react";

// ProRIse imports
import {
  Box,
  Center,
  Flex,
  Grid,
  GridItem,
  Link,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";

// Custom components

import TableCard from "views/admin/dashboard/components/TableCard";
import TotalSpent from "views/admin/dashboard/components/TotalSpent";

import { IoIosArrowForward } from "react-icons/io";
import TradersCard from "components/card/TradersCard";
import { TradersCardData } from "constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { getOpenPositions } from "store/actions";
import { useEffect } from "react";

export default function Dashboard() {
  const { data } = useSelector((state) => state?.leaderBoard);

  const { currentPositions, exchangeConnection, errorMessage } = useSelector(
    (state) => state?.exchange
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getOpenPositions({
        exchange: exchangeConnection,
      })
    );
  }, []);

  console.log(errorMessage);

  return (
    <Box>
      <Grid
        templateRows="repeat(1, 1fr)"
        templateColumns="repeat(4, 1fr)"
        gap={8}
      >
        <GridItem
          colSpan={{
            "2xl": 3,
            xl: 3,
            lg: 3,
            md: 4,
            sm: 4,
          }}
        >
          <TotalSpent heading="Portefeuille" design={1} />
        </GridItem>
        <GridItem
          colSpan={{
            "2xl": 1,
            xl: 1,
            lg: 1,
            md: 4,
            sm: 4,
          }}
        >
          <TableCard />
        </GridItem>
      </Grid>
      {/* <Flex color="white" gap={5}>
          <Box w="75%">
            
          </Box>
          <Box w="25%">
            <TableCard />
          </Box>
        </Flex> */}

      <Flex direction={"row"} justifyContent={"space-between"}>
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
      </SimpleGrid>
    </Box>
  );
}
