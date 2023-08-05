import React, { useState } from "react";

// ProRIse imports
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Icon,
  Switch,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";

// Custom components
import GlobalTabs from "components/Tabs/tabs";
import BasicCard from "components/card/BasicCard";

import user from "../../../assets/img/dashboards/Profile.png";
import Binance from "../../../assets/img/dashboards/svgIcon/Binance.svg";
import ByBit from "../../../assets/img/dashboards/svgIcon/Bybit.svg";
import KuCoin from "../../../assets/img/dashboards/svgIcon/KuCoin.svg";
import InputFeild from "components/fields/InputField";
import { MdEdit } from "react-icons/md";
import PriceCard from "views/auth/onboarding/components/priceCard";
import { RiVisaLine } from "react-icons/ri";
import Dialog from "components/dialog/Dialog";
import { useDispatch, useSelector } from "react-redux";
import { exchange } from "store/actions";
import { generateRandomString } from "utils/utils";
import { currentlyExchangeConnected } from "store/actions";
import { useEffect } from "react";
import apiInstance from "constants/api";
import { PRO_RISE } from "constants/apiConstants";
import { setAuthToken } from "constants/api";
import { toast } from "react-hot-toast";
import { settingsTab } from "constants/constants";

export default function Settings() {
  const [tabIndex, setTabIndex] = useState(0);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const switchs = Array.from({ length: 4 }, () => ({}));

  const textColor = useColorModeValue("white", "white");
  const textColorSecondary = useColorModeValue("gray.200", "gray.200");
  const { login } = useSelector((state) => state.user);
  const { exchangeConnection } = useSelector((state) => state.exchange);
  const [plans, setPlans] = useState([]);

  const [userDetail, setUserDetail] = useState({ ...login?.user });

  const dispatch = useDispatch();
  // console.log(getPlans());

  const [exchangeData, setExchangeData] = useState({
    secretKey: "",
    apiKey: "",
    exchange: "",
    connectionName: generateRandomString(8),
  });

  useEffect(async () => {
    try {
      setAuthToken(login?.token);
      const { data } = await apiInstance.get(`${PRO_RISE.getPlans}`);
      if (data?.success) {
        setPlans(data?.result);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error(error);
    }
  }, []);

  const switchWithText = () => {
    return switchs?.map((item, index) => {
      return (
        <FormControl display="flex" alignItems="center" gap={2} py={2}>
          <Switch id="email-alerts" size="lg" colorScheme="blue" />
          <FormLabel htmlFor="email-alerts" mt={2}>
            {index === 0
              ? "Nouvelles et mise à jour"
              : index === 1
              ? "Nouveaux parrainages"
              : index === 2
              ? "Résumé de la journée"
              : index === 3
              ? "Résumé de la semaines"
              : null}
          </FormLabel>
        </FormControl>
      );
    });
  };

  const updateExchnageData = (e) => {
    onOpen();
    setExchangeData({ ...exchangeData, exchange: e.toLowerCase() });
  };

  const onSubmit = () => {
    dispatch(exchange(exchangeData));
    setTimeout(() => {
      dispatch(currentlyExchangeConnected({ user: login?.user?.email }));
    }, 3000);
    onClose();
  };

  const randerConnected = () => {
    return [1, 2, 3].map((item, index) => {
      return (
        <>
          <Flex
            alignItems={"center"}
            direction={"row"}
            my={3}
            justifyContent={"space-between"}
          >
            <Box display={"flex"} direction={"row"} gap={5}>
              <img
                src={
                  index === 0
                    ? Binance
                    : index === 1
                    ? ByBit
                    : index === 2
                    ? KuCoin
                    : null
                }
              />
              <Heading color={textColor} fontSize="20px">
                {index === 0
                  ? "Binance"
                  : index === 1
                  ? "ByBit"
                  : index === 2
                  ? "KuCoin"
                  : null}
                <Text
                  color={textColorSecondary}
                  fontWeight="400"
                  fontSize="14px"
                  width={"100%"}
                  mt={1}
                >
                  {exchangeConnection === "binance" && index === 0
                    ? "Connecté"
                    : exchangeConnection === "bybit" && index === 1
                    ? "Connecté"
                    : exchangeConnection === "kucoin" && index === 2
                    ? "Connecté"
                    : "Déconnecter"}
                </Text>
              </Heading>
            </Box>
            <Box>
              <Button
                fontSize="14px"
                variant="brand"
                fontWeight="600"
                w={"120px"}
                h="36px"
                display="flex"
                bg={"#0075FF"}
                borderRadius="10px"
                _hover={{ bg: "#0075FF" }}
                textAlign={"left"}
                disabled={
                  index === 0
                    ? true
                    : index === 1
                    ? false
                    : index === 2
                    ? true
                    : null
                }
                gap={2}
                // disabled={
                //   exchangeConnection === "binance" && index === 0
                //     ? true
                //     : exchangeConnection === "bybit" && index === 1
                //     ? true
                //     : exchangeConnection === "kucoin" && index === 2
                //     ? true
                //     : false
                // }
                onClick={() =>
                  updateExchnageData(
                    index === 0
                      ? "Binance"
                      : index === 1
                      ? "ByBit"
                      : index === 2
                      ? "KuCoin"
                      : null
                  )
                }
              >
                <Icon as={MdEdit} />
                {exchangeConnection === "binance" && index === 0
                  ? "Déconnecter"
                  : exchangeConnection === "bybit" && index === 1
                  ? "Déconnecter"
                  : exchangeConnection === "kucoin" && index === 2
                  ? "Déconnecter"
                  : "Connecté"}
              </Button>
            </Box>
          </Flex>
          <hr />
        </>
      );
    });
  };

  return (
    <Box>
      <GlobalTabs tabs={settingsTab} tabIndex={(e) => setTabIndex(e)} />

      {tabIndex === 0 && (
        <Flex direction={"column"} gap={10}>
          <BasicCard
            heading="Informations de base"
            buttonHeader={true}
            btnText={"Mettre à jour"}
          >
            <Flex
              alignItems={"center"}
              direction={"row"}
              textAlign={"left"}
              gap={5}
            >
              <img src={user} />
              <Heading color={textColor} fontSize="20px">
                {"Photo de profil"}
                <Text
                  color={textColorSecondary}
                  fontWeight="400"
                  fontSize="14px"
                  width={"100%"}
                  mt={1}
                >
                  {"Maximum 5 MB"}
                </Text>
              </Heading>
            </Flex>
            <br />
            <Grid
              templateRows="repeat(1, 1fr)"
              templateColumns="repeat(4, 1fr)"
              gap={4}
            >
              <GridItem
                colSpan={{
                  "2xl": 2,
                  xl: 2,
                  lg: 2,
                  md: 4,
                  sm: 4,
                }}
              >
                <InputFeild
                  label="Prénom"
                  placeholder="Cole"
                  type="text"
                  value={userDetail?.username}
                  onChange={(e) =>
                    setUserDetail({
                      ...userDetail,
                      username: e.target.value,
                    })
                  }
                />
              </GridItem>
              <GridItem
                colSpan={{
                  "2xl": 2,
                  xl: 2,
                  lg: 2,
                  md: 4,
                  sm: 4,
                }}
              >
                <InputFeild
                  label="Nom de famille"
                  placeholder="Caufield"
                  type="text"
                />
              </GridItem>
              <GridItem
                colSpan={{
                  "2xl": 2,
                  xl: 2,
                  lg: 2,
                  md: 4,
                  sm: 4,
                }}
              >
                <InputFeild
                  label="Adresse courriel"
                  placeholder="cole.caufield@gmail.com"
                  type="email"
                  value={userDetail?.email}
                  onChange={(e) =>
                    setUserDetail({
                      ...userDetail,
                      email: e.target.value,
                    })
                  }
                />
              </GridItem>
              <GridItem
                colSpan={{
                  "2xl": 2,
                  xl: 2,
                  lg: 2,
                  md: 4,
                  sm: 4,
                }}
              >
                <InputFeild
                  label="Numéro de téléphone"
                  placeholder="+33 755-272-124"
                  type="number"
                  value={userDetail?.phoneNumber}
                  onChange={(e) =>
                    setUserDetail({
                      ...userDetail,
                      phoneNumber: e.target.value,
                    })
                  }
                />
              </GridItem>
            </Grid>
          </BasicCard>
          <BasicCard
            heading="Mot de passe"
            buttonHeader={true}
            btnText={"Mettre à jour"}
          >
            <Grid
              templateRows="repeat(1, 1fr)"
              templateColumns="repeat(4, 1fr)"
              gap={4}
            >
              <GridItem
                colSpan={{
                  "2xl": 2,
                  xl: 2,
                  lg: 2,
                  md: 4,
                  sm: 4,
                }}
              >
                <InputFeild label="Ancien mot de passe" type="password" />
              </GridItem>
              <GridItem
                colSpan={{
                  "2xl": 2,
                  xl: 2,
                  lg: 2,
                  md: 4,
                  sm: 4,
                }}
              >
                <InputFeild label="Nouveau mot de passe" type="password" />
              </GridItem>
            </Grid>
          </BasicCard>
        </Flex>
      )}
      {tabIndex === 1 && (
        <BasicCard heading="Connexion API">
          <Flex
            alignItems={"center"}
            direction={"row"}
            textAlign={"left"}
            gap={5}
          >
            <Heading color={textColor} fontSize="16px">
              {"Félicitations! 🎉"}
              <Text
                color={textColorSecondary}
                fontWeight="400"
                fontSize="14px"
                width={"100%"}
                mt={1}
              >
                {"Tous vos comptes sont connectés."}
              </Text>
            </Heading>
          </Flex>
          <br />
          {randerConnected()}
          <Dialog
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={onSubmit}
            heading={`Make Connection`}
            exchangeData={exchangeData}
            setExchangeData={setExchangeData}
            connection={true}
          />
        </BasicCard>
      )}
      {tabIndex === 2 && (
        <BasicCard heading="Notifications">
          <Grid
            templateRows="repeat(1, 1fr)"
            display={"flex"}
            justifyContent={"space-between"}
            flexDirection={{
              "2xl": "row",
              xl: "row",
              lg: "row",
              md: "row",
              sm: "column",
            }}
          >
            <GridItem colSpan={2}>
              <Text fontSize="lg"> Par courriel</Text>
              <Text fontSize="sm" color={textColorSecondary}>
                Recevez des notifications par courriel pour ne rien manquer
                pendant votre absence. Vous pouvez les désactiver en tout temps.
              </Text>
              {switchWithText()}
            </GridItem>
            <Divider orientation="vertical" />
            <GridItem colSpan={2}>
              <Text fontSize="lg"> Par SMS </Text>
              <Text fontSize="sm" color={textColorSecondary}>
                Recevez des notifications par SMS pour ne rien manquer pendant
                votre absence. Vous pouvez les désactiver en tout temps.
              </Text>
              {switchWithText()}
            </GridItem>
          </Grid>
        </BasicCard>
      )}
      {tabIndex === 3 && (
        <Flex direction={"column"} gap={10}>
          <BasicCard
            heading="Abonnement"
            buttonHeader={true}
            btnText={"Mettre à jour"}
          >
            <Flex
              zIndex="2"
              direction={{ xl: "row", lg: "row", md: "column", sm: "column" }}
              w={{ base: "100%", md: "100%", sm: "100%" }}
              maxW="100%"
              background="transparent"
              borderRadius="15px"
              mx={{ base: "auto", lg: "unset" }}
              me="auto"
              mb={{ base: "20px", md: "auto" }}
              alignItems="center"
            >
              {plans?.slice(0, 3)?.map((item, index) => (
                <PriceCard
                  id={++index}
                  planId={item?.id}
                  heading={item?.name}
                  paragraph={item?.description}
                  price={`€${item?.price}/mois`}
                  btnText={
                    index === 1 ? "Essai gratuit de 7 jours" : "Sélectionner"
                  }
                  // getSubscriptionData={(e) => onCreateUser(e)}
                  setting={true}
                  userId={login?.user?.id}
                  currentPlan={login?.user?.currentPlan}
                />
              ))}
            </Flex>
          </BasicCard>
          <BasicCard heading="Mode de paiement">
            <Grid
              templateRows="repeat(1, 1fr)"
              templateColumns="repeat(3, 1fr)"
              gap={10}
            >
              <GridItem
                colSpan={{
                  "2xl": 1,
                  xl: 1,
                  lg: 1,
                  md: 4,
                  sm: 4,
                }}
              >
                <InputFeild
                  label="Numéro de carte de crédit"
                  type="password"
                  icon={RiVisaLine}
                  placeholder={"**** **** **** 9010"}
                />
              </GridItem>
              <GridItem
                colSpan={{
                  "2xl": 1,
                  xl: 1,
                  lg: 1,
                  md: 4,
                  sm: 4,
                }}
              >
                <InputFeild
                  label="Date d’expiration"
                  type="number"
                  placeholder={"11/2023"}
                />
              </GridItem>
              <GridItem
                colSpan={{
                  "2xl": 1,
                  xl: 1,
                  lg: 1,
                  md: 4,
                  sm: 4,
                }}
              >
                <InputFeild label="CVV" type="password" placeholder={"***"} />
              </GridItem>
            </Grid>
          </BasicCard>
          <BasicCard
            heading="Historique des paiements"
            table={true}
            slice={true}
          />
        </Flex>
      )}
    </Box>
  );
}
