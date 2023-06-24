import React from "react";
import { NavLink } from "react-router-dom";
// ProRIse imports
import {
  Button,
  Flex,
  FormControl,
  Heading,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components

import OnboardingAuth from "layouts/auth/onboarding";
// Assets

import InputFeild from "components/fields/InputField";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { userLogin } from "store/actions";

function Login() {
  // ProRIse color mode
  const textColor = useColorModeValue("white", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("#A0AEC0", "gray.200");

  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = () => {
    if (email && password) {
      dispatch(
        userLogin({
          email: email,
          password: password,
        })
      );
    } else {
      toast.error("Fill All The Feilds");
    }
  };

  return (
    <OnboardingAuth>
      <Flex
        maxW={{ base: "100%", md: "max-content" }}
        w="100%"
        mx={{ base: "auto", lg: "0px" }}
        me="auto"
        h="100%"
        alignItems="center"
        justifyContent="center"
        mb={{ base: "30px", md: "60px" }}
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "40px", md: "14vh" }}
        flexDirection="column"
      >
        <Heading color={textColor} fontSize="36px" mb="10px">
          {"Connectez-vous"}
        </Heading>
        <Text
          mb="36px"
          ms="4px"
          color={textColorSecondary}
          fontWeight="400"
          fontSize="md"
          textAlign={"center"}
        >
          Pour accédez à la plateforme, veuillez entrer votre adresse courriel{" "}
          <br /> et votre mot de passe.
        </Text>

        <Flex
          zIndex="2"
          direction="column"
          w={{ base: "50%", md: "600px" }}
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
              label="Adresse courriel"
              placeholder="cole.caufield@gmail.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputFeild
              label="Mot de passe"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
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
            Se connecter
          </Button>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            maxW="100%"
            mt="30px"
          >
            <Text color={textColorDetails} fontWeight="400" fontSize="16px">
              Vous n’avez pas de compte?
              <NavLink to="/auth/onboarding">
                <Text
                  color={textColor}
                  as="span"
                  ms="5px"
                  fontWeight="500"
                  fontSize="16px"
                >
                  Créez un compte
                </Text>
              </NavLink>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </OnboardingAuth>
  );
}

export default Login;
