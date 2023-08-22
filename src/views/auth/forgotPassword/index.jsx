import React from "react";
import { NavLink } from "react-router-dom";
// ProRIse imports
import {
  Button,
  Flex,
  FormControl,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components

import OnboardingAuth from "layouts/auth/onboarding";
// Assets

import InputFeild from "components/fields/InputField";
import { useState } from "react";

function ForgotPassword() {
  // ProRIse color mode
  const textColor = useColorModeValue("white", "white");
  const textColorDetails = useColorModeValue("#A0AEC0", "gray.200");

  const [passwords, setPasswords] = useState({ password1: "", password2: "" });
  const [passwordsMatch, setPasswordsMatch] = useState(true);


  const handlePasswordChange = (event) => {
    const { name, value } = event.target;
    setPasswords((prevPasswords) => ({
      ...prevPasswords,
      [name]: value,
    }));

    if (name === "password1") {
      setPasswordsMatch(value === passwords.password2);
    } else if (name === "password2") {
      setPasswordsMatch(passwords.password1 === value);
    }
  };

  const onLogin = async () => {
    if (passwordsMatch) {
      //   try {
      //     const response = await dispatch(
      //       userLogin({
      //         password: password,
      //         password: password,
      //       })
      //     ).unwrap();
      //     if (response?.user?.currentSubscription) {
      //       history.push("/admin/dashboard");
      //     } else {
      //       history.push("/auth/onboarding");
      //     }
      //   } catch (error) {
      //     if (error.message) {
      //       toast.error("Network Error");
      //     } else {
      //       history.push("/auth/send-verification");
      //     }
      //     // Handle login error if needed
      //   }
      // } else {
      //   toast.error("Fill All The Feilds");
    }
  };

  return (
    <OnboardingAuth>
      <Flex
        maxW={{ base: "100%", md: "max-content", xs: "max-content" }}
        w="100%"
        mx={{ base: "auto", lg: "0px" }}
        me="auto"
        h="100%"
        alignItems="center"
        justifyContent="center"
        mb={{ base: "30px", md: "60px" }}
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "0px", md: "14vh" }}
        flexDirection="column"
      >
        <Heading
          color={textColor}
          fontSize={{ xl: "36px", lg: "36px", md: "36px", sm: "26px" }}
          mb="50px"
        >
          {"Mot de passe oublié"}
        </Heading>

        <Flex
          zIndex="2"
          direction="column"
          w={{ base: "50%", md: "600px", sm: "100%" }}
          maxW="85%"
          background="transparent"
          borderRadius="15px"
          mx={{ base: "auto", lg: "unset" }}
          me="auto"
          mb={{ base: "20px", md: "auto" }}
          textAlign={"center"}
        >
          <FormControl mb={"30"}>
            <InputFeild
              label="Nouveau mot de passe"
              type="password"
              name="password1"
              value={passwords.password1}
              onChange={handlePasswordChange}
            />
            <InputFeild
              label="Saisir à nouveau le mot de passe"
              type="password"
              name="password2"
              value={passwords.password2}
              onChange={handlePasswordChange}
            />

            {!passwordsMatch && passwords.password2 && (
              <Text color={"red"} fontWeight="400" fontSize="16px">
                Password Not Same
              </Text>
            )}
          </FormControl>

          <Button
            fontSize="24px"
            variant="brand"
            fontWeight="500"
            w="100%"
            h="55"
            mb={"30"}
            bg="#0075FF"
            borderRadius="16px"
            _hover={{ bg: "#0075FF" }}
            onClick={onLogin}
          >
            Changer le mot de passe
          </Button>

          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            maxW="100%"
            mt="30px"
          >
            <Text color={textColorDetails} fontWeight="400" fontSize="16px">
              Vous avez déjà un compte?
              <NavLink to="/auth/login">
                <Text
                  color={textColor}
                  as="span"
                  ms="5px"
                  fontWeight="500"
                  fontSize="16px"
                >
                  Connectez-vous
                </Text>
              </NavLink>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </OnboardingAuth>
  );
}

export default ForgotPassword;
