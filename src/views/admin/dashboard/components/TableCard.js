// ProRIse imports
import {
  Text,
  useColorModeValue,
  SimpleGrid,
  Button,
  Center,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";

import React from "react";

export default function TableCard(props) {
  const { ...rest } = props;

  let data = Array.from({ length: 6 }, () => ({}));

  // ProRIse Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const cardColor = useColorModeValue("white", "rgba(0, 0, 0, 0.4)");
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );
  return (
    <Card p="20px" align="left" direction="column" w="100%" {...rest}>
      <Text
        color={textColor}
        fontSize={{ xl: "32px", lg: "24px", md: "34px", sm: "16px" }}
        fontWeight="600"
        mt="4px"
      >
        Trades actifs
      </Text>

      <Card
        bg={cardColor}
        flexDirection="row"
        boxShadow={cardShadow}
        w="100%"
        p="15px"
        px="20px"
        mt="15px"
        mx="auto"
      >
        <SimpleGrid
          columns={2}
          gap={{
            "2xl": 20,
            xl: 10,
            lg: 10,
            md: 10,
            sm: 20,
          }}
        >
          <Text
            fontSize={{ xl: "14px", lg: "14px", md: "14px", sm: "12px" }}
            color="gray.200"
            fontWeight="400"
            mb="5px"
          >
            ORDER COIN
          </Text>
          <Text
            fontSize={{ xl: "14px", lg: "14px", md: "14px", sm: "12px" }}
            color="gray.200"
            fontWeight="400"
            mb="5px"
          >
            ROI
          </Text>
        </SimpleGrid>
      </Card>
      <Card
        w="100%"
        p="15px"
        px="20px"
        bg="none"
        h={{
          "2xl": "221px",
          xl: "195px",
          lg: "214px",
          md: "221px",
          sm: "221px",
        }}
      >
        {data.map(() => {
          return (
            <SimpleGrid columns={2} gap={8}>
              <Text
                fontSize={{
                  "2xl": "18px",
                  xl: "13px",
                  lg: "11px",
                  md: "14px",
                  sm: "12px",
                }}
                color="white.200"
                fontWeight="400"
                mb="5px"
              >
                IMXUSDT
              </Text>
              <Text
                fontSize={{
                  "2xl": "18px",
                  xl: "15px",
                  lg: "14px",
                  md: "14px",
                  sm: "12px",
                }}
                color="green.300"
                fontWeight="400"
                mb="5px"
              >
                ROI
              </Text>
            </SimpleGrid>
          );
        })}
      </Card>
      <Center>
        <Button
          fontSize="16px"
          variant="brand"
          fontWeight="500"
          w={"100%"}
          h="35px"
          bg="#0075FF"
          borderRadius="10px"
          _hover={{ bg: "#0075FF" }}
          textAlign={"center"}
          gap={2}
        >
          {"En voir plus"}
        </Button>
      </Center>
    </Card>
  );
}
