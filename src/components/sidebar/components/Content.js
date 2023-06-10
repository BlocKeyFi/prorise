import React from "react";
// ProRIse imports
import { Box, Flex, Stack } from "@chakra-ui/react";
//   Custom components
import Brand from "components/sidebar/components/Brand";
import Links from "components/sidebar/components/Links";

// FUNCTIONS

function SidebarContent(props) {
  const { routes } = props;
  // SIDEBAR
  return (
    <Flex direction="column" height="100%" pt="25px" borderRadius="30px">
      <Brand />
      <Stack direction="column" mb="auto" mt="2px">
        <Box ps="20px" pe={{ md: "16px", "2xl": "1px" }}>
          <Links routes={routes.slice(0, 5)} />
        </Box>
      </Stack>

      <Box
        ps="20px"
        pe={{ md: "16px", "2xl": "0px" }}
        mt="60px"
        mb="40px"
        borderRadius="30px"
      >
        <Links routes={routes.slice(5, 8)} />
      </Box>
    </Flex>
  );
}

export default SidebarContent;
