import React from "react";

// ProRIse imports
import {
  Badge,
  Button,
  Flex,
  Heading,
  Icon,
  List,
  ListIcon,
  ListItem,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

// Custom components
import Card from "components/card/Card.js";
import { MdCheck, MdStar } from "react-icons/md";

import cartIcon from "../../../../assets/img/dashboards/svgIcon/cart.svg";
import { pakageDetails } from "constants/constants";
import { IoMdClose } from "react-icons/io";

export default function PriceCard(props) {
  const { setting, authScreen, getSubscriptionData, email, ...rest } = props;

  // ProRIse Color Mode

  const textColor = useColorModeValue("white", "white");
  const textColorSecondary = useColorModeValue("white", "#A0AEC0");
  const iconColor = useColorModeValue("white", "white");

  const pakageName = `${"pakage" + props?.heading}`;
  const pakageDetail = pakageDetails(pakageName);

  return (
    <Card
      justifyContent="center"
      align="center"
      direction="column"
      w={{ xl: "350px", lg: "350px", md: "350px", sm: "100%" }}
      mb="0px"
      m="2"
      {...rest}
      pl="8"
    >
      <Flex
        justify="space-between"
        ps="0px"
        pe="20px"
        pt="5px"
        direction={"column"}
        textAlign={"left"}
      >
        <Flex
          alignItems={"center"}
          direction={"row"}
          textAlign={"left"}
          justifyContent={
            setting && !props?.badge ? "space-between" : "flex-start"
          }
        >
          <Heading color={textColor} fontSize="36px" mb="10px" pr={"5"}>
            {props?.heading}
          </Heading>
          {props?.badge && (
            <Badge
              variant="subtle"
              h={"6"}
              color={"#A0AEC0"}
              colorScheme="#A0AEC0"
              bg={"rgba(255, 255, 255, 0.08)"}
              borderRadius={"4px"}
              border={"1px solid #A0AEC0"}
              display={"flex"}
              alignItems={"center"}
              fontSize={"10"}
            >
              <Icon as={MdStar} color="white.500" w="3" h="3" /> {props?.badge}
            </Badge>
          )}
          {setting && !props?.badge && (
            <Button
              fontSize="20px"
              variant="brand"
              fontWeight="500"
              w={{ "2xl": "28%", xl: "38%", lg: "40%", md: "28%", sm: "100%" }}
              h="45"
              bg="#0075FF"
              borderRadius="16px"
              _hover={{ bg: "#0075FF" }}
              textAlign={"left"}
              gap={3}
            >
              <img src={cartIcon} width={20} />
              {props?.btnText}
            </Button>
          )}
        </Flex>
        <Text
          mb="10px"
          ms="4px"
          color={textColorSecondary}
          fontWeight="400"
          fontSize="md"
          width={"100%"}
        >
          {props?.paragraph}
        </Text>
      </Flex>
      <Flex w="100%" flexDirection={{ base: "column", lg: "row" }} pb={"30"}>
        <Flex flexDirection="column" me="20px" mt="28px">
          <Text
            color={textColor}
            fontSize="34px"
            textAlign="start"
            fontWeight="700"
            lineHeight="100%"
            mb="30px"
          >
            {props?.price}
          </Text>
          <List spacing={5} textAlign={"left"}>
            {pakageDetail &&
              pakageDetail?.map((item, index) => (
                <ListItem
                  color={
                    pakageName === "pakageSilver" && index === 0
                      ? iconColor
                      : pakageName === "pakageGold" &&
                        (index === 0 ||
                          index === 1 ||
                          index === 2 ||
                          index === 3)
                      ? iconColor
                      : pakageName === "pakagePlatinum"
                      ? iconColor
                      : "#3D3F58"
                  }
                >
                  <ListIcon
                    w={"5"}
                    h={"5"}
                    as={
                      pakageName === "pakageSilver" && index === 0
                        ? MdCheck
                        : pakageName === "pakageGold" &&
                          (index === 0 ||
                            index === 1 ||
                            index === 2 ||
                            index === 3)
                        ? MdCheck
                        : pakageName === "pakagePlatinum"
                        ? MdCheck
                        : IoMdClose
                    }
                  />
                  {item}
                </ListItem>
              ))}
            {/* <ListItem color={props?.id === 2 ? iconColor : "#3D3F58"}>
              <ListIcon
                as={props?.id === 1 ? IoMdClose : MdCheck}
                w={"5"}
                h={"5"}
                color={props?.id === 1 ? "#3D3F58" : iconColor}
              />
              Fonction copy trading
            </ListItem>

            <ListItem color={props?.id === 2 ? iconColor : "#3D3F58"}>
              <ListIcon
                w={"5"}
                h={"5"}
                as={props?.id === 1 ? IoMdClose : MdCheck}
                color={props?.id === 1 ? "#3D3F58" : iconColor}
              />
              Gestion du risque
            </ListItem> */}
          </List>
        </Flex>
      </Flex>
      {setting ? null : (
        <Button
          fontSize={{ xl: "20px", lg: "24px", md: "24px", sm: "17px" }}
          variant="brand"
          fontWeight="500"
          w={{
            xl: props?.id === 1 ? "90%" : "55%",
            lg: props?.id === 1 ? "90%" : "55%",
            md: props?.id === 1 ? "90%" : "55%",
            sm: "100%",
          }}
          h="55"
          mb="24px"
          bg="#0075FF"
          borderRadius="16px"
          _hover={{ bg: "#0075FF" }}
          textAlign={"left"}
          onClick={() => {
            authScreen &&
              getSubscriptionData({
                packageType: props?.heading?.toUpperCase(),
                purchasedTime: new Date(),
                user: email,
              });
          }}
        >
          <Icon
            width="10"
            height="18"
            viewBox="0 0 16 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M14.0028 3.40998C13.5884 3.12282 13.0732 2.96536 12.4626 2.96536H3.5262L3.50217 2.69092C3.45724 2.33902 3.38094 1.8414 3.04098 1.44905C2.67908 1.03138 2.11596 0.832031 1.3335 0.832031C1.05736 0.832031 0.833496 1.05589 0.833496 1.33203C0.833496 1.60817 1.05736 1.83203 1.3335 1.83203C1.95716 1.83203 2.185 1.98824 2.28522 2.1039C2.40608 2.24339 2.46315 2.45388 2.50877 2.80626L2.56518 3.50556L2.60819 4.0389L2.96653 8.48143L2.96661 8.48243C3.05468 9.6273 3.42 10.6342 4.09383 11.3609C4.77636 12.097 5.73255 12.4987 6.89803 12.4987H11.0715C12.2536 12.4987 13.072 12.0831 13.6382 11.3185C14.1684 10.6026 14.4463 9.6173 14.6882 8.55816L15.035 7.1397C15.2273 6.35349 15.2363 5.34893 14.8786 4.5131C14.6968 4.08818 14.4146 3.69542 14.0028 3.40998ZM7.50016 6.9987C7.50016 6.72256 7.2763 6.4987 7.00016 6.4987C6.72403 6.4987 6.50016 6.72256 6.50016 6.9987V8.33203C6.50016 8.60816 6.72403 8.83203 7.00016 8.83203C7.2763 8.83203 7.50016 8.60816 7.50016 8.33203V6.9987ZM9.00016 6.4987C9.2763 6.4987 9.50016 6.72256 9.50016 6.9987V8.33203C9.50016 8.60816 9.2763 8.83203 9.00016 8.83203C8.72403 8.83203 8.50016 8.60816 8.50016 8.33203V6.9987C8.50016 6.72256 8.72403 6.4987 9.00016 6.4987ZM11.5002 6.9987C11.5002 6.72256 11.2763 6.4987 11.0002 6.4987C10.724 6.4987 10.5002 6.72256 10.5002 6.9987V8.33203C10.5002 8.60816 10.724 8.83203 11.0002 8.83203C11.2763 8.83203 11.5002 8.60816 11.5002 8.33203V6.9987Z"
              fill="white"
            />
          </Icon>
          {props?.btnText}
        </Button>
      )}
    </Card>
  );
}
