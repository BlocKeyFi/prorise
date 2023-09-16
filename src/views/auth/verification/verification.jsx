import React, { useState } from "react";

// ProRIse imports
import { Box, Button, Flex, Text, useColorModeValue } from "@chakra-ui/react";

import OnboardingAuth from "layouts/auth/onboarding";

import { useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Card from "components/card/Card";
import { useEffect } from "react";
import { PRO_RISE } from "constants/apiConstants";
import apiInstance from "constants/api";
import { TOKEN } from "constants/constants";
import { toast } from "react-hot-toast";

// Custom Chakra theme
export default function Verification() {
  const textColor = useColorModeValue("white", "white");
  const textColorSecondary = "gray.400";

  useEffect(async () => {
    // Get the URL from the current location
    const url = new URL(window.location.href);

    // Get the token query parameter from the URL
    // const token = url.searchParams.get(TOKEN);

    const encodedString = url?.search;

    const token = encodedString.replace("?=", "");

    if (token) {
      // You can now use the 'token' variable in your code
      try {
        await apiInstance.post(`${PRO_RISE.verifyEmail}`, { token: token });
      } catch (error) {
        toast.error(error);
      }
    }
  }, []);
  return (
    <OnboardingAuth>
      <Card w={500} py={10} textAlign={"center"}>
        <Flex justifyContent={"center"}>
          <img src={require("assets/img/ProRise.png")} width={200} />
        </Flex>
        <Text fontSize={"26px"} py={5} fontWeight="600">
          Votre compte est vérifié
        </Text>

        <Flex justifyContent={"center"}>
          <img
            src={require("assets/img/email-verified.png")}
            width={200}
            style={{ borderRadius: 100 }}
          />
        </Flex>
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          maxW="100%"
          mt="30px"
        >
          <NavLink to="/auth/login">
            <Button> Login </Button>
          </NavLink>
        </Flex>
      </Card>
    </OnboardingAuth>
  );
}
