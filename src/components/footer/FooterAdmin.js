/*eslint-disable*/
import React from "react";
import {
  Flex,
  Link,
  List,
  ListItem,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";

import binn from "../../assets/img/dashboards/svgIcon/binn.svg";

export default function Footer() {
  const textColor = useColorModeValue("gray.200", "gray.200");
  const { toggleColorMode } = useColorMode();
  return (
    <Flex
      zIndex="3"
      alignItems={{
        base: "center",
        xl: "start",
      }}
      justifyContent={{
        "2xl": "space-between",
        xl: "space-between",
        lg: "space-between",
        md: "space-between",
        sm: "center",
      }}
      direction={{
        "2xl": "row",
        xl: "row",
        lg: "row",
        md: "row",
        sm: "column",
      }}
      // px={{ base: "30px", md: "10px" }}
      pt="30px"
    >
      <Text
        color={textColor}
        textAlign={{
          base: "center",
          xl: "start",
        }}
        // mb={{ base: "20px", xl: "0px" }}
      >
        <Text as="span" fontWeight="500" ms="4px" display={"flex"} gap={3}>
          Données importées à partir de <img src={binn} />
        </Text>
      </Text>
      <List display="flex">
        <ListItem
          me={{
            base: "20px",
            md: "44px",
          }}
        >
          {/* <Link
            fontWeight="500"
            color={textColor}
            href="mailto:hello@simmmple.com"
          >
            Dernière mise à jour : Il y a 10 minutes
          </Link> */}
        </ListItem>
      </List>
    </Flex>
  );
}
