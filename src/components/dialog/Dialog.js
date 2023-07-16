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
} from "@chakra-ui/react";

import InputFeild from "components/fields/InputField";
import { useState } from "react";
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
                    setExchangeData({ ...exchangeData, apiKey: e.target.value })
                  }
                />
              </React.Fragment>
            ) : (
              <React.Fragment>
                <InputFeild
                  label="Gestion du risque"
                  type="number"
                  value={capitalPercent}
                  onChange={(e) => setCapitalPercent(e.target.value)}
                />
              </React.Fragment>
            )}
          </AlertDialogBody>
          <AlertDialogCloseButton />
          <AlertDialogFooter>
            <Button colorScheme="blue" ml={3} onClick={onSubmit}>
              {connection ? "Connect" : "Copy"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
