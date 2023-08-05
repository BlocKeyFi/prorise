import React, { useState } from "react";

// ProRIse imports
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

// Custom components

import BasicCard from "components/card/BasicCard";

import user from "../../../../assets/img/dashboards/Profile.png";

import InputFeild from "components/fields/InputField";

import { useSelector } from "react-redux";

export default function Profile() {
  const textColor = useColorModeValue("white", "white");
  const textColorSecondary = useColorModeValue("gray.200", "gray.200");
  const { login } = useSelector((state) => state.user);

  const [userDetail, setUserDetail] = useState({ ...login?.user });

  return (
    <Box>
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
    </Box>
  );
}
