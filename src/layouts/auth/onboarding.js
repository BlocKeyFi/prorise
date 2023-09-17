// ProRIse imports
import { Flex } from "@chakra-ui/react";
import PropTypes from "prop-types";
import React from "react";

import background from "assets/img/Background.png";

function AuthIllustration(props) {
  const { children } = props;
  // ProRIse color mode
  return (
    <Flex position="relative" h="max-content">
      <Flex
        h={{
          sm: "unset",
          md: window.location.pathname.includes("onboarding")
            ? "unset"
            : "100vh",
          lg: window.location.pathname.includes("onboarding")
            ? "unset"
            : "100vh",
          xl: window.location.pathname.includes("onboarding")
            ? "unset"
            : "100vh",
        }}
        w="100%"
        // mx="auto"
        pt={{ sm: "50px", md: "0px" }}
        // px={{ lg: "30px", xl: "0px" }}
        // ps={{ xl: "70px" }}
        justifyContent="center"
        backgroundImage={`url(${background})`}
        // backgroundPosition= "center"
        backgroundAttachment="fixed"
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
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
