import React, { useState } from "react";

// ProRIse imports
import { Box, Grid, GridItem } from "@chakra-ui/react";

// Custom components
import BasicCard from "components/card/BasicCard";

export default function SponsorShip() {
  const [tabIndex, setTabIndex] = useState(false);

  return (
    <Box>
      <Grid
        templateRows="repeat(1, 1fr)"
        templateColumns="repeat(4, 1fr)"
        gap={4}
      >
        <GridItem colSpan={2}>
          <BasicCard
            heading="Félicitations! 🎉"
            paragraph="Vous avez parrainé 14 nouvelles personnes depuis le 3 janvier 2023."
            price="Solde : €70"
            btnText="Réclamer"
            button={true}
            tabIndex={tabIndex}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <BasicCard
            heading="Partagez votre lien"
            paragraph="Utilisez l’une des méthodes suivantes :"
            share={true}
          />
        </GridItem>
        <GridItem colSpan={4}>
          <BasicCard
            heading="Historique"
            tabs={true}
            table={true}
            getTabIndex={(e) => setTabIndex(e)}
          />
        </GridItem>
      </Grid>
    </Box>
  );
}
