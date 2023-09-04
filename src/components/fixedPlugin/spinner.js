import React from "react";
import { Spinner, Box, Flex, Center } from "@chakra-ui/react";

const Loader = () => {
  return (
    <Box
      backdropFilter="blur(5px)" // Adjust the blur strength as needed
      position="fixed"
      top="0"
      left="0"
      width="100%"
      height="100%"
      zIndex="9999"
    >
      <Center height="100vh">
        <Box>
          <Spinner size="xl" thickness="4px" speed="0.65s" />
        </Box>
      </Center>
    </Box>
  );
};

export default Loader;
