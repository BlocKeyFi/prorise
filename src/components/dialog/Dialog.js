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
  children,
  auth,
  btnText,
  success,
  disconnect,
  balance,
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
            !auth
              ? "linear-gradient(0deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.08) 100%), linear-gradient(175deg, rgba(6, 11, 40, 0.67) 0%, rgba(10, 14, 35, 0.64) 100%)"
              : "linear-gradient(126deg, rgba(18, 18, 47, 1) 100%, rgba(10, 14, 35, 0.53) 91.2%)"
          }
        >
          <AlertDialogHeader fontSize={"34px"}>{heading}</AlertDialogHeader>
          <AlertDialogBody>
            {children}
            {connection && (
              <React.Fragment>
                {exchangeData?.exchange === "bitget" && (
                  <InputFeild
                    label="Pass Phrase"
                    type="password"
                    value={exchangeData.passphrase}
                    onChange={(e) =>
                      setExchangeData({
                        ...exchangeData,
                        passphrase: e.target.value,
                      })
                    }
                  />
                )}
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
              </React.Fragment>
            )}
            {filterData && (
              <React.Fragment>
                <InputFeild
                  label="Trader"
                  value={filterData ? filterData?.nickName : ""}
                  disabled
                />
                <Flex direction={"row"} gap={5}>
                  <InputFeild
                    value={"€ " + balance ?? 0}
                    label="Capital"
                    disabled
                  />
                  <InputFeild
                    label="Gestion du risque"
                    type="number"
                    value={capitalPercent === 0 ? "" : capitalPercent} // Value 0 ko empty string mein convert karein
                    onChange={(e) => {
                      const newValue = Number(e.target.value);
                      setCapitalPercent(isNaN(newValue) ? "" : newValue); // NaN ko empty string mein convert karein
                    }}
                  />
                </Flex>
              </React.Fragment>
            )}
          </AlertDialogBody>

          <AlertDialogCloseButton />
          <AlertDialogFooter>
            <Flex
              direction={"row"}
              gap={5}
              justifyContent={!connection ? "space-between" : "flex-end"}
              w={"100%"}
              alignItems={"center"}
            >
              {!connection && !auth && !disconnect && (
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
                      filterData?.followerCount + " " + "personnes"}
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
                // variant="brand"
                fontWeight="600"
                w={auth ? "100%" : "auto"}
                h="36px"
                display="flex"
                bg={"#0075FF"}
                borderRadius="10px"
                textAlign={"left"}
                gap={2}
                onClick={onSubmit}
                disabled={success ? success : false}
              >
                {!connection && !auth && !disconnect && <Icon as={BiCopy} />}

                {btnText}
              </Button>
            </Flex>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
