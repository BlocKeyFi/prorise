import React from "react";
import { NavLink } from "react-router-dom";
// ProRIse imports
import {
  Button,
  Center,
  Flex,
  FormControl,
  Heading,
  Icon,
  Image,
  Progress,
  Spinner,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components

import OnboardingAuth from "layouts/auth/onboarding";
// Assets

import InputFeild from "components/fields/InputField";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { userLogin } from "store/actions";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { TfiTwitter } from "react-icons/tfi";
import { TbBrandTelegram, TbBrandWhatsapp } from "react-icons/tb";
import { authButtons } from "constants/constants";

function Login() {
  // ProRIse color mode
  const textColor = useColorModeValue("white", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("#A0AEC0", "gray.200");

  const { isLoading } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => console.log(tokenResponse),
  });

  const onLogin = async () => {
    if (email && password) {
      try {
        const response = await dispatch(
          userLogin({
            email: email,
            password: password,
          })
        ).unwrap();
        if (response?.user?.currentSubscription) {
          history.push("/admin/dashboard");
        } else {
          history.push("/auth/onboarding");
        }
      } catch (error) {
        if (error.message) {
          toast.error("Network Error");
        } else {
          history.push("/auth/send-verification");
        }
        // Handle login error if needed
      }
    } else {
      toast.error("Fill All The Feilds");
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
          mb="10px"
        >
          {"Connectez-vous"}
        </Heading>
        <Text
          mb="36px"
          ms="4px"
          w={{ xl: "70%", lg: "70%", md: "70%", sm: "100%" }}
          color={textColorSecondary}
          fontWeight="400"
          fontSize={{ sm: "sm" }}
          textAlign={"center"}
        >
          Pour accédez à la plateforme, veuillez entrer votre adresse courriel
          et votre mot de passe.
        </Text>

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
            {isLoading ? (
              <Center>
                <Spinner size="md" />
              </Center>
            ) : (
              "Se connecter"
            )}
          </Button>
          {/* <Flex> */}
          {/* <Button
              fontSize="24px"
              variant="brand"
              fontWeight="500"
              w="100%"
              h="55"
              mb={"30"}
              bg="white"
              borderRadius="16px"
              _hover={{ bg: "white" }}
              _focus={{ bg: "white" }}
              color={"black"}
              onClick={() => googleLogin()}
            >
              Sign in with Google 🚀
            </Button> */}
          <Text
            color={textColorDetails}
            fontWeight="400"
            fontSize="16px"
            pb={30}
          >
            Ou créez votre compte avec
          </Text>
          <Flex
            gap={{ "2xl": 10, xl: 4, lg: 20, md: 10, sm: 10 }}
            justifyContent={"center"}
          >
            {authButtons.map((item) => (
              <Flex direction={"column"} alignItems={"center"} gap={3}>
                <Center
                  bg={"rgba(160, 174, 192, 0.04)"}
                  _hover={"rgba(160, 174, 192, 0.04)"}
                  w="140px"
                  h="64px"
                  lineHeight="100%"
                  borderRadius="16px"
                >
                  {item.icon ? (
                    <Icon as={item.icon} w="35px" h="auto" color="gray.400" />
                  ) : (
                    <img src={require(`assets/img/svg/${item.title}.svg`)} />
                  )}
                </Center>
              </Flex>
            ))}
          </Flex>

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
