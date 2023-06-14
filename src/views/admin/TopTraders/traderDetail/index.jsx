import React, { useState } from "react";

// ProRIse imports
import { Box, Grid, GridItem } from "@chakra-ui/react";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import BasicCard from "components/card/BasicCard";
import { buttonArray } from "constants/constants";
import { tabsArray } from "constants/constants";

import user from "../../../../assets/img/dashboards/Profile.png";
import TotalSpent from "views/admin/dashboard/components/TotalSpent";
import DailyTraffic from "views/admin/dashboard/components/ActiveTraders";
import Footer from "components/footer/FooterAdmin";

// Custom components

export default function TraderDetails() {
  // ProRIse Color Mode

  const [tabIndex, setTabIndex] = useState(false);

  const { id } = useParams();

  return (
    <Box>
      <BasicCard
        heading={id}
        userImage={user}
        table={tabIndex === "2" ? false : true}
        getTabIndex={(e) => setTabIndex(e)}
        buttonArray={buttonArray}
        tabsArray={tabsArray}
      >
        {tabIndex === "2" && (
          <Grid
            templateRows="repeat(1, 1fr)"
            templateColumns="repeat(3, 1fr)"
            gap={2}
          >
            <GridItem colSpan={2}>
              <TotalSpent design={2} />
            </GridItem>
            <GridItem colSpan={1}>
              <DailyTraffic />
            </GridItem>
          </Grid>
        )}
      </BasicCard>
      <Footer />
    </Box>
  );
}
