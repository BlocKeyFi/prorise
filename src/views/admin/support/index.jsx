// ProRIse imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Icon,
  Switch,
  Text,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";

// Custom components
import React from "react";
import BasicCard from "components/card/BasicCard";

import InputFeild from "components/fields/InputField";

export default function Support() {
  const textColor = useColorModeValue("white", "white");
  const textColorSecondary = useColorModeValue("gray.200", "gray.200");
  return (
    <Box>
      <BasicCard heading="Assistance 7/7 - Contactez-nous">
        <Flex
          alignItems={"center"}
          direction={"column"}
          textAlign={"left"}
          gap={5}
        >
          <Text
            color={textColor}
            fontWeight="500"
            fontSize="16px"
            width={"100%"}
            mt={1}
          >
            {
              "Pour toute question, bug ou besoin d'assistance, vous pouvez nous joindre à tout moment. Utilisez simplement le formulaire ci-dessous :"
            }
          </Text>

          <Grid
            templateRows="repeat(1, 1fr)"
            templateColumns="repeat(4, 1fr)"
            gap={10}
            width={"100%"}
          >
            <GridItem colSpan={2}>
              <InputFeild
                label="Nom et prénom"
                type="text"
                placeholder={"Cole"}
              />
            </GridItem>
            <GridItem colSpan={2}>
              <InputFeild
                label="Adresse e-mail"
                type="text"
                placeholder={"Caufield"}
              />
            </GridItem>
            <GridItem colSpan={4}>
              <FormLabel
                fontSize="lg"
                color={textColor}
                _hover={{ cursor: "pointer" }}
              >
                Votre demande
              </FormLabel>
              <Textarea
                color={textColorSecondary}
                bg="rgba(0, 0, 0, 0.2)"
                type="text"
                placeholder={"Je n’arrive pas à trouver ma clé API..."}
                fontSize={"16px"}
                border="0.8px solid rgba(255, 255, 255, 0.3) !important"
              />
            </GridItem>
          </Grid>

          <Text
            color={textColor}
            fontWeight="500"
            fontSize="16px"
            width={"100%"}
            mt={1}
          >
            {
              "De plus, vous avez la possibilité de nous contacter via WhatsApp au numéro suivant : +41 76 777 77 77. Nous comprenons que vos besoins ne se limitent pas aux heures de bureau, c'est pourquoi notre équipe est disponible 7 jours sur 7 pour vous aider."
            }
          </Text>
          <Text
            color={textColor}
            fontWeight="500"
            fontSize="16px"
            width={"100%"}
            mt={1}
          >
            {
              "Merci de nous faire confiance pour répondre à vos besoins et questions de manière rapide et efficace."
            }
          </Text>
        </Flex>
      </BasicCard>

      <FormControl display="flex" alignItems="center" gap={2} py={2} px={5}>
        <Switch id="email-alerts" size="lg" colorScheme="blue" />
        <FormLabel htmlFor="email-alerts" mt={2}>
          J’aimerais être contacté par WhatsApp
        </FormLabel>
      </FormControl>
      <FormControl display="flex" alignItems="center" gap={2} py={2} px={5}>
        <Switch id="email-alerts" size="lg" colorScheme="blue" />
        <FormLabel htmlFor="email-alerts" mt={2}>
          Ma demande est vraiment urgente
        </FormLabel>
      </FormControl>

      <Button
        mt={2}
        fontSize="16px"
        variant="brand"
        fontWeight="600"
        w={"auto"}
        h="38px"
        px={6}
        display="flex"
        bg={"#0075FF"}
        borderRadius="10px"
        textAlign={"left"}
        gap={2}
      >
        {"Envoyer"}
      </Button>
    </Box>
  );
}
