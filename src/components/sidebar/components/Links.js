/* eslint-disable */
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
// ProRIse imports
import {
  Box,
  Center,
  Flex,
  HStack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";

export function SidebarLinks(props) {
  //   Chakra color mode
  let location = useLocation();
  let activeColor = useColorModeValue("gray.700", "gary.200");
  let inactiveColor = useColorModeValue("gary.200", "gary.200");
  let activeIcon = useColorModeValue("brand.500", "white");
  let textColor = useColorModeValue("gary.200", "#A0AEC0");

  const { routes } = props;

  const { login } = useSelector((state) => state.user);

  const username = login?.user?.username?.split("-");

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.pathname.includes(routeName || "trader-detail");
  };

  const bagde = () => {
    return (
      <Flex gap={5} align={"center"}>
        <Text>Copy Trading</Text>
        <Center
          w="20px"
          h="20px"
          bg="green.300"
          color="black"
          borderRadius={10}
        >
          3
        </Center>
      </Flex>
    );
  };

  // this function creates the links from the secondary accordions (for example auth -> sign-in -> default)
  const createLinks = (routes) => {
    return routes.map((route, index) => {
      if (route.category) {
        return (
          <>
            <Text
              fontSize={"md"}
              color={activeColor}
              fontWeight="bold"
              mx="auto"
              ps={{
                sm: "10px",
                xl: "16px",
              }}
              pt="18px"
              pb="12px"
              key={index}
              textTransform={"capitalize"}
            >
              {route.name}
            </Text>
            {createLinks(route.items)}
          </>
        );
      } else if (route.layout === "/admin" || route.layout === "/auth") {
        return (
          <NavLink key={index} to={route.layout + route.path}>
            {route.icon ? (
              <Box>
                <HStack
                  spacing={
                    activeRoute(route.path.toLowerCase()) ? "22px" : "26px"
                  }
                  py="15px"
                  ps="10px"
                  borderRadius={"12px"}
                  bg={
                    activeRoute(route.path.toLowerCase())
                      ? "rgba(255, 255, 255, 0.08)"
                      : "transparent"
                  }
                >
                  <Flex w="100%" alignItems="center" justifyContent="center">
                    <Box
                      color={
                        activeRoute(route.path.toLowerCase())
                          ? activeIcon
                          : textColor
                      }
                      me="18px"
                    >
                      {route.icon}
                    </Box>
                    <Text
                      me="auto"
                      color={
                        activeRoute(route.path.toLowerCase())
                          ? activeColor
                          : textColor
                      }
                      textTransform={"capitalize"}
                      fontWeight={
                        activeRoute(route.path.toLowerCase())
                          ? "bold"
                          : "normal"
                      }
                    >
                      {route.name === "Copy trading"
                        ? bagde()
                        : route.name === "userName"
                        ? username
                          ? username[0]
                          : ""
                        : route.name}
                    </Text>
                  </Flex>
                </HStack>
              </Box>
            ) : (
              <Box>
                <HStack
                  spacing={
                    activeRoute(route.path.toLowerCase()) ? "22px" : "26px"
                  }
                  py="5px"
                  ps="10px"
                >
                  <Text
                    me="auto"
                    color={
                      activeRoute(route.path.toLowerCase())
                        ? activeColor
                        : inactiveColor
                    }
                    textTransform={"capitalize"}
                    fontWeight={
                      activeRoute(route.path.toLowerCase()) ? "bold" : "normal"
                    }
                  >
                    {route.name}
                  </Text>
                  <Box h="36px" w="4px" bg="brand.400" borderRadius="5px" />
                </HStack>
              </Box>
            )}
          </NavLink>
        );
      }
    });
  };
  //  BRAND
  return createLinks(routes);
}

export default SidebarLinks;
