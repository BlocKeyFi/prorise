import React, { useState } from "react";

// ProRIse imports
import { Box, Grid, GridItem } from "@chakra-ui/react";

// Custom components
import BasicCard from "components/card/BasicCard";
import {
  columnsDataSponsorship,
  columnsDataSponsorship2,
} from "../copyTrading/variables/columnsData";
import { TradersCardData } from "constants/constants";

export default function SponsorShip() {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Box>
      <Grid
        templateRows="repeat(1, 1fr)"
        templateColumns="repeat(4, 1fr)"
        gap={4}
      >
        <GridItem
          colSpan={{
            "2xl": 2,
            xl: 2,
            lg: 4,
            md: 4,
            sm: 4,
          }}
        >
          <BasicCard
            heading="Félicitations! 🎉"
            paragraph="Vous avez parrainé 14 nouvelles personnes depuis le 3 janvier 2023."
            price="€70"
            btnText="Réclamer"
            button={true}
            tabIndex={tabIndex}
          />
        </GridItem>
        <GridItem
          colSpan={{
            "2xl": 2,
            xl: 2,
            lg: 4,
            md: 4,
            sm: 4,
          }}
        >
          <BasicCard
            heading="Partagez votre lien"
            paragraph="Utilisez l’une des méthodes suivantes :"
            share={true}
            button={false}
          />
        </GridItem>
        <GridItem colSpan={4}>
          <BasicCard
            heading="Historique"
            tabs={true}
            table={true}
            getTabIndex={(e) => setTabIndex(e)}
            columnsData={
              tabIndex === 0 ? columnsDataSponsorship : columnsDataSponsorship2
            }
            tableData={TradersCardData}
          />
        </GridItem>
      </Grid>
    </Box>
  );
}
