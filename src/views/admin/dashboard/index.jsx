import React from "react";

// ProRIse imports
import { Box, Center, Flex, Link, SimpleGrid, Text } from "@chakra-ui/react";

// Custom components

import TableCard from "views/admin/dashboard/components/TableCard";
import TotalSpent from "views/admin/dashboard/components/TotalSpent";

import { IoIosArrowForward } from "react-icons/io";
import TradersCard from "components/card/TradersCard";
import { TradersCardData } from "constants/constants";

export default function Dashboard() {
  return (
    <Box>
      <Flex color="white" gap={5}>
        <Box w="75%">
          <TotalSpent heading="Portefeuille" />
        </Box>
        <Box w="24%">
          <TableCard />
        </Box>
      </Flex>

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
          <Link
            fontWeight="500"
            color={"gary.200"}
            href="/admin/top-traders"
            display={"flex"}
            alignItems={"center"}
            gap={3}
          >
            {"En voir plus "}
            <IoIosArrowForward />
          </Link>
        </Center>
      </Flex>

      <SimpleGrid
        columns={{ base: 2, md: 2, lg: 3, xl: 4, sm: 1 }}
        gap="20px"
        mb="20px"
      >
        {TradersCardData?.slice(0, 4).map((item) => {
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
    </Box>
  );
}
