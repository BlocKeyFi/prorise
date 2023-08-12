import React, { useState } from "react";

// ProRIse imports
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";

// Custom components

import BasicCard from "components/card/BasicCard";

import Binance from "assets/img/dashboards/svgIcon/Binance.svg";
import ByBit from "assets/img/dashboards/svgIcon/Bybit.svg";
import KuCoin from "assets/img/dashboards/svgIcon/KuCoin.svg";

import { MdEdit } from "react-icons/md";

import Dialog from "components/dialog/Dialog";
import { useDispatch, useSelector } from "react-redux";
import { exchange } from "store/actions";
import { generateRandomString } from "utils/utils";
import { currentlyExchangeConnected } from "store/actions";

export default function Connections() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const textColor = useColorModeValue("white", "white");
  const textColorSecondary = useColorModeValue("gray.200", "gray.200");
  const { login } = useSelector((state) => state.user);
  const { exchangeConnection } = useSelector((state) => state.exchange);

  const dispatch = useDispatch();
  // console.log(getPlans());

  const [exchangeData, setExchangeData] = useState({
    secretKey: "",
    apiKey: "",
    exchange: "",
    connectionName: generateRandomString(8),
  });

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
          btnText={'Connect'}
        />
      </BasicCard>
    </Box>
  );
}
