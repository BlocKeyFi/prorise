import React, { useState } from "react";

// ProRIse imports
import {
  Box,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Switch,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

// Custom components
import BasicCard from "components/card/BasicCard";
import { useSelector } from "react-redux";

export default function Notifications() {
  const switchs = Array.from({ length: 4 }, () => ({}));

  const textColorSecondary = useColorModeValue("gray.200", "gray.200");

  const switchWithText = () => {
    return switchs?.map((item, index) => {
      return (
        <FormControl display="flex" alignItems="center" gap={2} py={2}>
          <Switch id="email-alerts" size="lg" colorScheme="blue" />
          <FormLabel htmlFor="email-alerts" mt={2}>
            {index === 0
              ? "Nouvelles et mise à jour"
              : index === 1
              ? "Nouveaux parrainages"
              : index === 2
              ? "Résumé de la journée"
              : index === 3
              ? "Résumé de la semaines"
              : null}
          </FormLabel>
        </FormControl>
      );
    });
  };

  return (
    <Box>
      <BasicCard heading="Notifications">
        <Grid
          templateRows="repeat(1, 1fr)"
          display={"flex"}
          justifyContent={"space-between"}
          flexDirection={{
            "2xl": "row",
            xl: "row",
            lg: "row",
            md: "row",
            sm: "column",
          }}
        >
          <GridItem colSpan={2}>
            <Text fontSize="lg"> Par courriel</Text>
            <Text fontSize="sm" color={textColorSecondary}>
              Recevez des notifications par courriel pour ne rien manquer
              pendant votre absence. Vous pouvez les désactiver en tout temps.
            </Text>
            {switchWithText()}
          </GridItem>
          <Divider orientation="vertical" />
          <GridItem colSpan={2}>
            <Text fontSize="lg"> Par SMS </Text>
            <Text fontSize="sm" color={textColorSecondary}>
              Recevez des notifications par SMS pour ne rien manquer pendant
              votre absence. Vous pouvez les désactiver en tout temps.
            </Text>
            {switchWithText()}
          </GridItem>
        </Grid>
      </BasicCard>
    </Box>
  );
}
