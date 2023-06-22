// ProRIse imports
import { Box, Grid, GridItem } from "@chakra-ui/react";

// Custom components
import React from "react";
import TotalSpent from "../dashboard/components/TotalSpent";
import DailyTraffic from "../dashboard/components/ActiveTraders";
import { Flex, Select, Icon, Button } from "@chakra-ui/react";
import { IoShareSharp } from "react-icons/io5";

export default function Analytics() {
  return (
    <Box display={'flex'} flexDirection="column" alignItems={'stretch'}
    >
      {/* Main Fields */}
      <Grid
        templateRows="repeat(1, 1fr)"
        templateColumns="repeat(3, 1fr)"
        gap={8}
      >
        <GridItem colSpan={{base:4,md:2}}>
          <TotalSpent heading="Portefeuille" design={1} />
        </GridItem>
        <GridItem colSpan={{base:4,md:2}}>
          <DailyTraffic />
        </GridItem>
        <GridItem colSpan={4}>
          <TotalSpent heading="Performances" design={2} />
        </GridItem>
      </Grid>
    </Box>
  );
}
