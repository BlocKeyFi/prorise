import React, { useState } from "react";

// ProRIse imports
import { Box, Button, Flex, Text, useColorModeValue } from "@chakra-ui/react";

import OnboardingAuth from "layouts/auth/onboarding";

import { useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Card from "components/card/Card";

// Custom Chakra theme
export default function Verification() {
  const textColor = useColorModeValue("white", "white");
  const textColorSecondary = "gray.400";
  return (
    <OnboardingAuth>
      <Card w={500} py={10} textAlign={"center"}>
        <Flex justifyContent={"center"}>
          <img src={require("assets/img/ProRise.png")} width={200} />
        </Flex>
        <Text fontSize={"26px"} py={5} fontWeight="600">
          Your Acount is Verify
        </Text>

        <Flex justifyContent={"center"}>
          <img src={require("assets/img/email.png")} width={200} />
        </Flex>
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          maxW="100%"
          mt="30px"
        >
          <NavLink to="/admin/dashboard">
            <Button> Go to Dashboard </Button>
          </NavLink>
        </Flex>
      </Card>
    </OnboardingAuth>
  );
}
