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

import { MdEdit } from "react-icons/md";

import Dialog from "components/dialog/Dialog";
import { useDispatch, useSelector } from "react-redux";
import { exchange } from "store/actions";
import { generateRandomString } from "utils/utils";
import { currentlyExchangeConnected } from "store/actions";
import { connetions } from "constants/constants";
import apiInstance from "constants/api";
import { PRO_RISE } from "constants/apiConstants";
import { toast } from "react-hot-toast";
import { disconnetExchange } from "store/actions";

export default function Connections() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const textColor = useColorModeValue("white", "white");
  const textColorSecondary = useColorModeValue("gray.200", "gray.200");
  const { login } = useSelector((state) => state.user);
  const { exchangeConnection } = useSelector((state) => state.exchange);

  const [disconnect, setDisconnect] = useState("");

  const dispatch = useDispatch();

  const [exchangeData, setExchangeData] = useState({
    secretKey: "",
    apiKey: "",
    exchange: "",
    passPhrase: "",
    connectionName: generateRandomString(8),
  });

  const updateExchnageData = (e) => {
    setDisconnect("");
    onOpen();
    setExchangeData({ ...exchangeData, exchange: e.toLowerCase() });
  };

  const onSubmit = () => {
    dispatch(exchange(exchangeData));
    setTimeout(() => {
      dispatch(currentlyExchangeConnected({ user: login?.user?.email }));
      onClose();
    }, 2000);
  };

  const openConnection = (e) => {
    onOpen();
    setDisconnect(e);
  };
  const disConnectConnection = async () => {
    dispatch(
      disconnetExchange({
        exchange: disconnect,
      })
    );
    onClose();
  };

  const randerConnected = () => {
    return connetions?.map((item, index) => {
      return (
        <>
          <Flex
            alignItems={"center"}
            direction={"row"}
            my={3}
            justifyContent={"space-between"}
          >
            <Box display={"flex"} direction={"row"} gap={5}>
              <img src={item.icon} width={50} height={50} />
              <Heading color={textColor} fontSize="20px">
                {item.title}
                <Text
                  color={textColorSecondary}
                  fontWeight="400"
                  fontSize="14px"
                  width={"100%"}
                  mt={1}
                >
                  {item.title.toLowerCase() === exchangeConnection
                    ? "Déconnecter"
                    : "Connecté"}
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
                gap={2}
                disabled={
                  exchangeConnection
                    ? item.title.toLowerCase() === exchangeConnection
                      ? false
                      : true
                    : false
                }
                onClick={() =>
                  item.title.toLowerCase() === exchangeConnection
                    ? openConnection(exchangeConnection)
                    : updateExchnageData(item.title.toLowerCase())
                }
              >
                <Icon as={MdEdit} />
                {item.title.toLowerCase() === exchangeConnection
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
          <Heading color={textColor} fontSize="20px">
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
          onSubmit={!disconnect ? onSubmit : disConnectConnection}
          heading={disconnect ? "Disclaimer" : `Make Connection`}
          exchangeData={exchangeData}
          setExchangeData={setExchangeData}
          connection={!disconnect}
          disconnect={disconnect}
          btnText={disconnect ? "Disconnect" : "Connect"}
        >
          {disconnect && (
            <Text color={"yellow"}>
              Si vous déconnectez votre plateforme d'échange alors que les
              transactions sont actives, vous risquez de perdre toutes vos
              données de trading.
            </Text>
          )}
        </Dialog>
      </BasicCard>
      <Text fontSize="24px">Disclaimer</Text>
      <Text color={"yellow"}>
        Si vous déconnectez votre plateforme d'échange alors que les
        transactions sont actives, vous risquez de perdre toutes vos
        données de trading.
      </Text>
    </Box>
  );
}
