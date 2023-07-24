import React from "react";
// ProRIse imports
import { Box, Flex, HStack, Icon, Stack, Text } from "@chakra-ui/react";
//   Custom components
import Brand from "components/sidebar/components/Brand";
import Links from "components/sidebar/components/Links";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { BiLogOutCircle } from "react-icons/bi";
import { logout } from "store/actions";
import { useDispatch } from "react-redux";
import { persistStore } from "redux-persist";
import { store } from "store/store";

// FUNCTIONS

function SidebarContent(props) {
  const dispatch = useDispatch();
  const { routes } = props;

  const handleLogout = () => {
    dispatch(logout());
    const persistor = persistStore(store);
    persistor.purge();
  };
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
        <Box cursor={"pointer"} onClick={handleLogout}>
          <HStack py="15px" ps="10px" borderRadius={"12px"}>
            <Flex w="100%" alignItems="center" justifyContent="center">
              <Box me="18px">
                <Icon
                  as={BiLogOutCircle}
                  sx={{ fontSize: 23, cursor: "pointer" }}
                />
              </Box>
              <Text me="auto" textTransform={"capitalize"}>
                {"Logout"}
              </Text>
            </Flex>
          </HStack>
        </Box>
      </Box>
    </Flex>
  );
}

export default SidebarContent;
