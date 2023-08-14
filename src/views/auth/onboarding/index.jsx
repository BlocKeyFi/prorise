import React, { useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { subscribeToPackage } from "store/actions";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import apiInstance from "constants/api";
import { PRO_RISE } from "constants/apiConstants";
import {
  SUCCESS_REGISTER,
  ALREADY_EMAIL,
  ALREADY_UESR,
  EMAIL,
  USERNAME,
  TARGET_ZERO,
} from "constants/constants";
import { setAuthToken } from "constants/api";
import { authButtons } from "constants/constants";

function Register() {
  // ProRIse color mode
  const textColor = useColorModeValue("white", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("#A0AEC0", "gray.200");

  const { login } = useSelector((state) => state.user);

  const [onbordOne, setOnbordOne] = useState(false);
  const [onbordTwo, setOnbordTwo] = useState(true);
  const [onbordThree, setOnbordThree] = useState(false);
  const [plans, setPlans] = useState([]);

  const [userData, setUserData] = useState({
    email: "",
    password: "",
    fisrtName: "",
    lastName: "",
  });

  useEffect(async () => {
    if (login?.user?.currentSubscription === null) {
      setOnbordTwo(false);
      setOnbordThree(true);
      try {
        setAuthToken(localStorage.getItem("jwt"));
        const { data } = await apiInstance.get(`${PRO_RISE.getPlans}`);
        if (data?.success) {
          setPlans(data?.result);
        } else {
          toast.error(data?.message);
        }
      } catch (error) {
        toast.error(error);
      }
    }
  }, [login]);

  const { email, password, fisrtName, lastName } = userData;

  // const dispatch = useDispatch();
  const history = useHistory();

  const onCheckOut = async (param) => {
    const { data } = await apiInstance.post(`${PRO_RISE.checkOut}`, param);
    if (data?.success) {
      window.location.href = data?.url;
    }
  };

  const url = new URL(window.location.href);

  const encodedString = url?.search;

  const refralCode = encodedString.replace("?ref=", "");

  const checkUser = async () => {
    if (email && password && fisrtName && lastName) {
      let userFinalobj = {
        email,
        password,
        phoneNumber: "",
        username: fisrtName + "-" + lastName,
        refralCode,
      };
      try {
        await apiInstance.post(`${PRO_RISE.register}`, userFinalobj);
        toast.success(SUCCESS_REGISTER);
        history.push("/auth/send-verification");
        // setOnbordTwo(false);
        // setOnbordThree(true);
      } catch (error) {
        if (error?.response?.data?.meta?.target[TARGET_ZERO] === EMAIL) {
          toast.error(ALREADY_EMAIL);
        } else if (
          error?.response?.data?.meta?.target[TARGET_ZERO] === USERNAME
        ) {
          toast.error(ALREADY_UESR);
        }
      }
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
        <Heading
          color={textColor}
          fontSize={{ xl: "36px", lg: "36px", md: "36px", sm: "26px" }}
          mb="10px"
        >
          {onbordOne && "Bienvenue sur ProRise!"}
          {onbordTwo && "Créez votre compte"}
          {onbordThree && "Choisissez votre plan"}
        </Heading>
        <Text
          mb="36px"
          ms="4px"
          w={{ xl: "80%", lg: "80%", md: "80%", sm: "100%" }}
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
            w={{ base: "50%", xl: "50%", md: "80%", sm: "100%" }}
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
              top={{ base: 450, sm: 440 }}
              loading="lazy"
            />
            <Flex align="center" mb="25px">
              <Image src={dashboard} alt="dashboard" borderRadius="16px" />
            </Flex>
            <Button
              fontSize="24px"
              variant="brand"
              fontWeight="500"
              w={{ xl: "15%", lg: "20%", md: "30%", sm: "100%" }}
              h="55"
              mb="24px"
              bg="#0075FF"
              borderRadius="16px"
              _hover={{ bg: "#0075FF" }}
              onClick={() => history.push("/")}
            >
              Suivant
            </Button>
          </Flex>
        )}
        {onbordTwo && (
          <Flex
            zIndex="2"
            direction="column"
            w={{ base: "50%", md: "600px", sm: "100%" }}
            maxW="100%"
            background="transparent"
            borderRadius="15px"
            mx={{ base: "auto", lg: "unset" }}
            me="auto"
            mb={{ base: "20px", md: "auto" }}
            textAlign={"center"}
          >
            <FormControl mb={{ base: "30px", sm: "0px" }} isRequired>
              <Flex
                direction={{ xl: "row", lg: "row", md: "column", sm: "column" }}
                justifyContent={"space-between"}
              >
                <InputFeild
                  label="Prénom"
                  w={{ xl: "260px", lg: "260px", md: "100%", sm: "100%" }}
                  value={fisrtName}
                  onChange={(e) =>
                    setUserData({ ...userData, fisrtName: e.target.value })
                  }
                  required
                />
                <InputFeild
                  label="Nom de famille"
                  w={{ xl: "260px", lg: "260px", md: "100%", sm: "100%" }}
                  value={lastName}
                  onChange={(e) =>
                    setUserData({ ...userData, lastName: e.target.value })
                  }
                />
              </Flex>
              <InputFeild
                label="Adresse courriel"
                placeholder="cole.caufield@gmail.com"
                type="email"
                value={email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
              />
              <InputFeild
                label="Mot de passe"
                type="password"
                value={password}
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
              />
            </FormControl>
            <Button
              fontSize={{ xl: "24px", lg: "24px", md: "24px", sm: "20px" }}
              variant="brand"
              fontWeight="500"
              w="100%"
              h="55"
              mb={{ base: "30px", sm: "0px" }}
              bg="#0075FF"
              borderRadius="16px"
              _hover={{ bg: "#0075FF" }}
              onClick={checkUser}
            >
              Créer mon compte
            </Button>
            <Text
              color={textColorDetails}
              fontWeight="400"
              fontSize="16px"
              py={30}
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
                    w="158px"
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
        )}
        {onbordThree && (
          <Flex
            zIndex="2"
            direction={{ xl: "row", lg: "row", md: "column", sm: "column" }}
            w={"100%"}
            background="transparent"
            borderRadius="15px"
            mx={{ base: "auto", lg: "unset" }}
            me="auto"
            mb={{ base: "20px", md: "auto" }}
            alignItems="center"
          >
            {plans?.map((item, index) => (
              <PriceCard
                id={++index}
                heading={item?.name}
                paragraph={item?.description}
                price={`€${item?.price}/mois`}
                btnText={
                  index === 1 ? "Essai gratuit de 7 jours" : "Sélectionner"
                }
                onClick={(e) =>
                  onCheckOut({
                    priceId: item?.stripePrice,
                  })
                }
                setting={true}
                userId={login?.user?.id}
              />
            ))}
            {/* <PriceCard
              id={2}
              heading={"Gold"}
              paragraph={"Le plan parfait pour débuter."}
              price={"€59/mois"}
              btnText={"Sélectionner"}
              getSubscriptionData={(e) => onCreateUser(e)}
              authScreen={true}
              email={email}
            />
            <PriceCard
              id={2}
              badge={"POPULAIRE"}
              heading={"Platinum"}
              paragraph={"Le plan complet pour le copy trading."}
              price={"€89/mois"}
              btnText={"Sélectionner"}
              getSubscriptionData={(e) => onCreateUser(e)}
              authScreen={true}
              email={email}
            /> */}
          </Flex>
        )}
      </Flex>
    </OnboardingAuth>
  );
}

export default Register;
