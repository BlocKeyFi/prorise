// ProRIse imports
import { Flex } from "@chakra-ui/react";
import PropTypes from "prop-types";
import React from "react";

function AuthIllustration(props) {
  const { children } = props;
  // ProRIse color mode
  return (
    <Flex position="relative" h="max-content">
      <Flex
        h={{
          sm: "unset",
          md: "unset",
          lg: "100vh",
          xl: "100vh",
        }}
        w="100%"
        // mx="auto"
        pt={{ sm: "50px", md: "0px" }}
        // px={{ lg: "30px", xl: "0px" }}
        // ps={{ xl: "70px" }}
        justifyContent="center"
        bg="radial-gradient(circle at 65% 100%, rgba(17, 74, 172, 1) 0%, rgba(39, 34, 115, 1) 43%, rgba(18, 18, 47, 1) 100%)"
        alignItems="center"
        direction="column"
      >
        {children}
      </Flex>
    </Flex>
  );
}
// PROPS

AuthIllustration.propTypes = {
  illustrationBackground: PropTypes.string,
  image: PropTypes.any,
};

export default AuthIllustration;
