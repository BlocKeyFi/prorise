// ProRIse imports
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Icon,
  Select,
} from "@chakra-ui/react";

// Custom components
import React from "react";
import TotalSpent from "../dashboard/components/TotalSpent";
import DailyTraffic from "../dashboard/components/ActiveTraders";
import { IoShareSharp } from "react-icons/io5";

export default function Analytics() {
  return (
    <Box>
      {/* Main Fields */}
      <Flex
        w={{ "2xl": "30%", xl: "50%", lg: "55%", md: "100%", sm: "100%" }}
        gap={3}
        display={{
          "2xl": "none",
          xl: "none",
          lg: "none",
          md: "flex",
          sm: "flex",
        }}
      >
        <Select
          bg="rgba(255, 255, 255, 0.08)"
          border="none"
          color="white"
          placeholder="Trier par : ROI 7 jours"
        />
        <Button
          fontSize="14px"
          variant="brand"
          fontWeight="600"
          w={"auto"}
          h="38px"
          px={10}
          display="flex"
          bg={"#0075FF"}
          borderRadius="10px"
          textAlign={"left"}
          gap={2}
        >
          <Icon as={IoShareSharp} />
          {"Partager"}
        </Button>
      </Flex>
      <br />
      <Grid
        templateRows="repeat(1, 1fr)"
        templateColumns="repeat(3, 1fr)"
        gap={8}
      >
        <GridItem
          colSpan={{
            "2xl": 2,
            xl: 2,
            lg: 2,
            md: 4,
            sm: 4,
          }}
        >
          <TotalSpent heading="Portefeuille" design={1} />
        </GridItem>
        <GridItem
          colSpan={{
            "2xl": 2,
            xl: 2,
            lg: 2,
            md: 4,
            sm: 4,
          }}
        >
          <DailyTraffic pieHeight={"80%"} />
        </GridItem>
        <GridItem colSpan={4}>
          <TotalSpent heading="Performances" design={2} />
        </GridItem>
      </Grid>
    </Box>
  );
}
