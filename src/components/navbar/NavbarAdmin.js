// ProRIse Imports
import React from "react";
import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Center,
  Flex,
  Icon,
  Select,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { SidebarResponsive } from "components/sidebar/Sidebar";
import routes from "routes";
import { IoShareSharp } from "react-icons/io5";

import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
export default function AdminNavbar(props) {
  const { secondary, message, brandText } = props;

  const { login } = useSelector((state) => state.user);
  const { user } = login;

  const dispatch = useDispatch();

  // Here are all the props that may change depending on navbar's type or state.(secondary, variant, scrolled)
  let mainText = useColorModeValue("navy.700", "white");
  let navbarPosition = "absolute";
  let navbarFilter = "none";
  let navbarShadow = "none";
  let navbarBorder = "transparent";
  let secondaryMargin = "0px";
  let gap = "0px";

  const username = user?.username?.split("-");

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
      px={{ xl: "0px", lg: "0px", md: "0px", sm: "15px" }}
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
          lg: "row",
        }}
        alignItems={"center"}
        justifyContent={{ xl: "space-between" }}
        mb={gap}
      >
        <SidebarResponsive routes={routes} />
        <Box mb={{ sm: "8px", md: "0px" }}>
          {/* Here we create navbar brand, based on route name */}
          <Text
            color={mainText}
            href="#"
            bg="inherit"
            borderRadius="inherit"
            fontWeight="bold"
            fontSize={{ xl: "36px", lg: "36px", md: "36px", sm: "22px" }}
            _hover={{ color: { mainText } }}
            _active={{
              bg: "inherit",
              transform: "none",
              borderColor: "transparent",
            }}
            _focus={{
              boxShadow: "none",
            }}
            textTransform={"capitalize"}
          >
            {brandText === "Tableau de bord"
              ? `${user && user.firstName + user.lastName} 👋`
              : brandText === "Default Brand Text"
              ? "Top Traders"
              : brandText === "userName"
              ? `${user && user.firstName + user.lastName} 👋`
              : brandText}
          </Text>
        </Box>

        <Flex ms="auto">
          <NavLink to="/admin/setting">
            <Center
              bg={
                window.location.pathname === "/admin/setting" &&
                "rgba(160, 174, 192, 0.04)"
              }
              _hover={"rgba(160, 174, 192, 0.04)"}
              w="64px"
              h="64px"
              lineHeight="100%"
              borderRadius="16px"
            >
              <Avatar src={user && user?.profilePicURL}>
                <AvatarBadge boxSize="1em" bg="green.500" />
              </Avatar>
            </Center>
          </NavLink>
        </Flex>
      </Flex>

      {/* {secondary ? (
        <Text color="white">{message}</Text>
      ) : (
        brandText === "Analytiques" && (
          <Flex
            w={{ "2xl": "30%", xl: "50%", lg: "55%", md: "100%", sm: "100%" }}
            gap={3}
            display={{
              "2xl": "flex",
              xl: "flex",
              lg: "flex",
              md: "none",
              sm: "none",
            }}
          >
            <Select
              bg="rgba(255, 255, 255, 0.08)"
              border="none"
              color="white"
              placeholder="Trier par : ROI 7 jours"
            />
            <Button
              fontSize="14px"
              variant="brand"
              fontWeight="600"
              w={"auto"}
              h="38px"
              px={10}
              display="flex"
              bg={"#0075FF"}
              borderRadius="10px"
              textAlign={"left"}
              gap={2}
            >
              <Icon as={IoShareSharp} />
              {"Partager"}
            </Button>
            <Box ms="auto" w={{ sm: "10%", md: "unset" }}>
              <SidebarResponsive routes={routes} />
            </Box>
          </Flex>
        )
      )} */}
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
