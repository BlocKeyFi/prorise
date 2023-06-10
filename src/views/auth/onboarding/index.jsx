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

import dashboard from "../../../assets/img/onboarding/dashboard.png";
import playIcon from "../../../assets/img/onboarding/Vector.png";

import PriceCard from "./components/priceCard";
import InputFeild from "components/fields/InputField";

function SignIn() {
  // ProRIse color mode
  const textColor = useColorModeValue("white", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("#A0AEC0", "gray.200");

  const [onbordOne, setOnbordOne] = React.useState(true);
  const [onbordTwo, setOnbordTwo] = React.useState(false);
  const [onbordThree, setOnbordThree] = React.useState(false);

  const changeScreens = () => {
    if (onbordOne) {
      setOnbordTwo(true);
      setOnbordOne(false);
    }
    if (onbordTwo) {
      setOnbordThree(true);
      setOnbordTwo(false);
    }
  };
  return (
    <OnboardingAuth >
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
          {onbordOne && "Bienvenue sur ProRise!"}
          {onbordTwo && "Créez votre compte"}
          {onbordThree && "Choisissez votre plan"}
        </Heading>
        <Text
          mb="36px"
          ms="4px"
          color={textColorSecondary}
          fontWeight="400"
          fontSize="md"
          width={onbordTwo || onbordThree ? "80%" : "40%"}
          textAlign={"center"}
        >
          {onbordOne &&
            "Pour débuter, nous vous recommandons de visionner ce guide d'utilisation pour comprendre comment notre plateforme fonctionne."}
          {onbordTwo &&
            "Pour accédez à la plateforme, veuillez créer votre compte en complétant le formulaire ci-dessous."}
          {onbordThree &&
            "Il est maintenant le temps de sélectionner votre plan. Choisissez le celui qui correspond le mieux à vos objectifs et à votre budget. "}
        </Text>

        {onbordOne && (
          <Flex
            zIndex="2"
            direction="column"
            w={{ base: "50%" }}
            maxW="100%"
            background="transparent"
            borderRadius="15px"
            mx={{ base: "auto", lg: "unset" }}
            me="auto"
            mb={{ base: "20px", md: "auto" }}
            alignItems="center"
          >
            <Image
              src={playIcon}
              alt="playIcon"
              zIndex="2"
              position="fixed"
              top={450}
            />
            <Flex align="center" mb="25px">
              <Image src={dashboard} alt="dashboard" borderRadius="16px" />
            </Flex>
            <Button
              fontSize="24px"
              variant="brand"
              fontWeight="500"
              w="15%"
              h="55"
              mb="24px"
              bg="#0075FF"
              borderRadius="16px"
              _hover={{ bg: "#0075FF" }}
              onClick={changeScreens}
            >
              Suivant
            </Button>
          </Flex>
        )}
        {onbordTwo && (
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
              <Flex direction={"row"} justifyContent={"space-between"}>
                <InputFeild label="Prénom" w="250px" />
                <InputFeild label="Nom de famille" w="250px" />
              </Flex>
              <InputFeild
                label="Adresse courriel"
                placeholder="cole.caufield@gmail.com"
                type="email"
              />
              <InputFeild label="Mot de passe" type="password" />
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
              onClick={changeScreens}
            >
              Créer mon compte
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
                <NavLink to="/auth/sign-up">
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
        )}
        {onbordThree && (
          <Flex
            zIndex="2"
            direction="row"
            w={{ base: "100%" }}
            maxW="100%"
            background="transparent"
            borderRadius="15px"
            mx={{ base: "auto", lg: "unset" }}
            me="auto"
            mb={{ base: "20px", md: "auto" }}
            alignItems="center"
          >
            <PriceCard
              id={1}
              heading={"De base"}
              paragraph={
                "Profitez de la liste des top traders à un prix avantageux."
              }
              price={"€59/mois"}
              btnText={"Essai gratuit de 7 jours"}
            />
            <PriceCard
              id={2}
              badge={"POPULAIRE"}
              heading={"Avancé"}
              paragraph={"Profitez de toutes les fonctionnalités."}
              price={"€89/mois"}
              btnText={"Sélectionner"}
            />
          </Flex>
        )}
      </Flex>
    </OnboardingAuth>
  );
}

export default SignIn;
