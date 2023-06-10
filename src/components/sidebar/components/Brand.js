import React from "react";

// ProRIse imports
import { Flex, useColorModeValue } from "@chakra-ui/react";

// Custom components
import { DashboardLogo } from "components/icons/Icons";

export function SidebarBrand() {
  //   color mode
  let logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex align='center' direction='column'>
      <DashboardLogo h='60px' w='100%' ml="-30px" my="14px" color={logoColor} />
    </Flex>
  );
}

export default SidebarBrand;
