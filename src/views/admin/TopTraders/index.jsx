import React from "react";

// ProRIse imports
import { Box, SimpleGrid, Select, Flex } from "@chakra-ui/react";

// Custom components


import TradersCard from "components/card/TradersCard";
import { TradersCardData } from "constants/constants";

export default function Marketplace() {
  // ProRIse Color Mode
  return (
    <Box>
      <Flex w="100%" p={4} color="white" justifyContent={"end"}>
        <Select
          bg="rgba(255, 255, 255, 0.08)"
          border="none"
          color="white"
          placeholder="Trier par : ROI 7 jours"
          w={{base:'150px',sm:'250px',md:"25%",lg:'20%',xl:'15%'}}
        />
      </Flex>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, xl: 4, }}
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
    </Box>
  );
}
