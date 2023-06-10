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
      <Text color={textColor} fontSize="32px" fontWeight="600" mt="4px">
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
        <SimpleGrid columns={2} gap={20}>
          <Text fontSize="md" color="gray.200" fontWeight="400" mb="5px">
            ORDER COIN
          </Text>
          <Text fontSize="md" color="gray.200" fontWeight="400" mb="5px">
            ROI
          </Text>
        </SimpleGrid>
      </Card>
      <Card w="100%" p="15px" px="20px" bg="none" h="215px">
        {data.map(() => {
          return (
            <SimpleGrid columns={2} gap={12}>
              <Text fontSize="md" color="white.200" fontWeight="400" mb="5px">
                IMXUSDT
              </Text>
              <Text fontSize="md" color="green.300" fontWeight="400" mb="5px">
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
