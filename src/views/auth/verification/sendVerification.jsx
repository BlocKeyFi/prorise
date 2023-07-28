import React, { useState } from "react";

// ProRIse imports
import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";

import OnboardingAuth from "layouts/auth/onboarding";

import { useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Card from "components/card/Card";

// Custom Chakra theme
export default function SendVerification() {
  const { auth } = useSelector((state) => state.user);
  const history = useHistory();

  const textColor = useColorModeValue("white", "white");
  const textColorSecondary = "gray.400";
  return (
    <OnboardingAuth>
      <Card w={500} py={10} textAlign={"center"}>
        <Flex justifyContent={"center"}>
          <img src={require("assets/img/ProRise.png")} width={200} />
        </Flex>
        <Text fontSize={"26px"} py={5} fontWeight="600">
          Verify your Acount
        </Text>
        <Text fontSize={"16px"} color={textColorSecondary}>
          Account activation link has been sent to Your E-mail address you
          provided
        </Text>
        <Flex justifyContent={"center"}>
          <img src={require("assets/img/email-send.png")} width={200} />
        </Flex>
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          maxW="100%"
          mt="30px"
        >
          {/* <Text fontWeight="400" fontSize="16px" color={textColorSecondary}>
            Didn't get the mail ?
            <Text
              color={textColor}
              as="span"
              ms="5px"
              fontWeight="500"
              fontSize="16px"
            >
              Send it again
            </Text>
          </Text> */}
        </Flex>
      </Card>
    </OnboardingAuth>
  );
}
