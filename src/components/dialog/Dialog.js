import React from "react";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Flex,
  Icon,
  Text,
} from "@chakra-ui/react";

import InputFeild from "components/fields/InputField";
import { BiCopy } from "react-icons/bi";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";
// Custom components

export default function Dialog({
  isOpen,
  onClose,
  onSubmit,
  heading,
  exchangeData,
  setExchangeData,
  connection,
  capitalPercent,
  setCapitalPercent,
  filterData,
  stripe,
}) {
  const cancelRef = React.useRef();

  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent
          bg={
            "linear-gradient(0deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.08) 100%), linear-gradient(175deg, rgba(6, 11, 40, 0.67) 0%, rgba(10, 14, 35, 0.64) 100%)"
          }
        >
          <AlertDialogHeader fontSize={"34px"}>{heading}</AlertDialogHeader>
          {stripe ? (
            <>
              {/* <PaymentElement />
              <button>Submit</button> */}
            </>
          ) : (
            <AlertDialogBody>
              {connection ? (
                <React.Fragment>
                  <InputFeild
                    label="Secret Key"
                    type="password"
                    value={exchangeData.secretKey}
                    onChange={(e) =>
                      setExchangeData({
                        ...exchangeData,
                        secretKey: e.target.value,
                      })
                    }
                  />
                  <InputFeild
                    label="Api Key"
                    type="password"
                    value={exchangeData.apiKey}
                    onChange={(e) =>
                      setExchangeData({
                        ...exchangeData,
                        apiKey: e.target.value,
                      })
                    }
                  />
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <InputFeild
                    label="Trader"
                    value={filterData && filterData[0]?.nickName}
                    disabled
                  />
                  <Flex direction={"row"} gap={5}>
                    <InputFeild
                      value={"€" + filterData && filterData[0]?.rank}
                      label="Capital"
                      disabled
                    />
                    <InputFeild
                      label="Gestion du risque"
                      type="number"
                      value={capitalPercent}
                      onChange={(e) =>
                        setCapitalPercent(Number(e.target.value))
                      }
                    />
                  </Flex>
                </React.Fragment>
              )}
            </AlertDialogBody>
          )}

          <AlertDialogCloseButton />
          <AlertDialogFooter>
            <Flex
              direction={"row"}
              gap={5}
              justifyContent={!connection ? "space-between" : "flex-end"}
              w={"100%"}
              alignItems={"center"}
            >
              {!connection && (
                <Flex direction={"column"} w="100%" gap={1}>
                  <Text
                    fontSize={{
                      xl: "16px",
                      lg: "16px",
                      md: "16px",
                      sm: "14px",
                    }}
                    textAlign="start"
                    lineHeight="100%"
                    fontWeight="600"
                  >
                    {filterData &&
                      filterData[0]?.followerCount + " " + "personnes"}
                  </Text>
                  <Text
                    fontSize={{
                      xl: "12px",
                      lg: "12px",
                      md: "12px",
                      sm: "10px",
                    }}
                    textAlign="start"
                    lineHeight="100%"
                    fontWeight="400"
                  >
                    {"ont copié ce trade"}
                  </Text>
                </Flex>
              )}

              <Button
                fontSize="14px"
                variant="brand"
                fontWeight="600"
                w={"auto"}
                h="36px"
                display="flex"
                bg={"#0075FF"}
                borderRadius="10px"
                textAlign={"left"}
                gap={2}
                onClick={onSubmit}
              >
                {!connection && <Icon as={BiCopy} />}
                {connection ? "Connect" : "Copier"}
              </Button>
            </Flex>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
