// ProRIse Imports
import React from "react";
import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { SidebarResponsive } from "components/sidebar/Sidebar";
import routes from "routes";

export default function AdminNavbar(props) {
  const { secondary, message, brandText } = props;

  // Here are all the props that may change depending on navbar's type or state.(secondary, variant, scrolled)
  let mainText = useColorModeValue("navy.700", "white");
  let navbarPosition = "absolute";
  let navbarFilter = "none";
  let navbarShadow = "none";
  let navbarBorder = "transparent";
  let secondaryMargin = "0px";
  let gap = "0px";

  return (
    <Box
      position={navbarPosition}
      boxShadow={navbarShadow}
      borderColor={navbarBorder}
      filter={navbarFilter}
      backgroundPosition="center"
      backgroundSize="cover"
      transitionDelay="0s, 0s, 0s, 0s"
      transitionDuration=" 0.25s, 0.25s, 0.25s, 0s"
      transition-property="box-shadow, background-color, filter, border"
      transitionTimingFunction="linear, linear, linear, linear"
      alignItems={{ xl: "center" }}
      display={secondary ? "block" : "flex"}
      minH="75px"
      justifyContent={{ xl: "center" }}
      // lineHeight="25.6px"
      mx="auto"
      mt={secondaryMargin}
      // pb="8px"
      right={{ base: "12px", md: "30px", lg: "30px", xl: "26px" }}
      // pt="20px"
      top={{ base: "12px", md: "16px", xl: "28px" }}
      w={{
        base: "calc(100vw - 6%)",
        md: "calc(100vw - 8%)",
        lg: "calc(100vw - 6%)",
        xl: "calc(100vw - 350px)",
        "2xl": "calc(100vw - 365px)",
      }}
    >
      <Flex
        w="100%"
        flexDirection={{
          md: "row",
        }}
        alignItems={{ xl: "center" }}
        justifyContent={"center"}
        mb={gap}
      >
        <Box mb={{ sm: "8px", md: "0px" }}>
          {/* Here we create navbar brand, based on route name */}
          <Text
            color={mainText}
            href="#"
            bg="inherit"
            borderRadius="inherit"
            fontWeight="bold"
            fontSize="36px"
            _hover={{ color: { mainText } }}
            _active={{
              bg: "inherit",
              transform: "none",
              borderColor: "transparent",
            }}
            _focus={{
              boxShadow: "none",
            }}
          >
            {brandText === "Tableau de bord" ? "Bonjour Cole! 👋" : brandText}
          </Text>
        </Box>
        <Box ms="auto" w={{ sm: "10%", md: "unset" }}>
          <SidebarResponsive routes={routes} />
        </Box>
      </Flex>
      {secondary ? <Text color="white">{message}</Text> : null}
    </Box>
  );
}

AdminNavbar.propTypes = {
  brandText: PropTypes.string,
  variant: PropTypes.string,
  secondary: PropTypes.bool,
  fixed: PropTypes.bool,
  onOpen: PropTypes.func,
};
