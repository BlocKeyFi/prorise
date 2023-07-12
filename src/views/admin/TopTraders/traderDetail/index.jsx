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
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTraderPositions } from "store/actions";

// Custom components

export default function TraderDetails() {
  const dispatch = useDispatch();
  const { data, traderPositions } = useSelector((state) => state?.leaderBoard);

  const [tabIndex, setTabIndex] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    dispatch(
      getTraderPositions({
        encryptedUid: id,
      })
    );
  }, [id]);

  const filterData = data.filter((item) => item.encryptedUid === id);

  return (
    <Box>
      <BasicCard
        heading={filterData[0]?.nickName}
        userImage={user}
        table={tabIndex === "2" ? false : true}
        getTabIndex={(e) => setTabIndex(e)}
        buttonArray={buttonArray}
        tabsArray={tabsArray}
        traderPositions={traderPositions}
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
