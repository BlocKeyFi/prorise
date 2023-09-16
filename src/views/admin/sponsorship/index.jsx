import React, { useEffect, useState } from "react";

// ProRIse imports
import {
  Box,
  Center,
  Flex,
  Grid,
  GridItem,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";

// Custom components
import BasicCard from "components/card/BasicCard";
import {
  columnsDataSponsorship,
  columnsDataSponsorship2,
} from "../copyTrading/variables/columnsData";
import { TradersCardData } from "constants/constants";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { TbBrandTelegram, TbBrandWhatsapp } from "react-icons/tb";
import { TfiTwitter } from "react-icons/tfi";

import copyIcon from "../../../assets/img/dashboards/svgIcon/copy.svg";
import { toast } from "react-hot-toast";
import apiInstance from "constants/api";
import { PRO_RISE } from "constants/apiConstants";
import { setAuthToken } from "constants/api";

export default function SponsorShip() {
  const [tabIndex, setTabIndex] = useState(0);
  const [refralHistory, setRefralHistory] = useState([]);

  const { refralLink } = useSelector((state) => state?.user);

  const inputRef = useRef(null);

  useEffect(() => {
    setAuthToken(localStorage.getItem("jwt"));
    apiInstance
      .post(`${PRO_RISE.getRefralHistory}`)
      .then((response) => setRefralHistory(response?.data?.refrals))
      .catch((e) => toast.error(`${PRO_RISE.getRefralHistory} failed`));
  }, []);

  const copyValue = () => {
    if (inputRef.current) {
      inputRef.current.select();
      document.execCommand("copy");
      toast.success("RefralLink Copy Successfully");
    }
  };

  return (
    <Box>
      <Grid
        templateRows="repeat(1, 1fr)"
        templateColumns="repeat(4, 1fr)"
        gap={4}
      >
        <GridItem
          colSpan={{
            "2xl": 2,
            xl: 2,
            lg: 4,
            md: 4,
            sm: 4,
          }}
        >
          <BasicCard
            heading={refralHistory?.length ? "Félicitations! 🎉" : null}
            h={260}
            paragraph={
              refralHistory?.length
                ? "Vous avez parrainé 14 nouvelles personnes depuis le 3 janvier 2023."
                : `Devenez un partenaire affilié et maximisez vos revenus ! En parrainant de nouveaux
            membres sur notre plateforme, vous bénéficierez d&#39;une commission de 25% sur
          chaque abonnement souscrit. Ne manquez pas cette opportunité de gagner tout en
            aidant d&#39;autres à découvrir nos services`
            }
            price=" € 70 "
            btnText="Réclamer"
            button={refralHistory?.length ? true : false}
            tabIndex={tabIndex}
          />
        </GridItem>

        <GridItem
          colSpan={{
            "2xl": 2,
            xl: 2,
            lg: 4,
            md: 4,
            sm: 4,
          }}
        >
          <BasicCard
            heading="Partagez votre lien"
            paragraph="Utilisez l’une des méthodes suivantes :"
            share={true}
            button={false}
          >
            <Flex
              direction={{
                "2xl": "row",
                xl: "row",
                lg: "row",
                md: "row",
                sm: "column",
              }}
              gap={{
                "2xl": 20,
                xl: 10,
                lg: 10,
                md: 10,
                sm: 1,
              }}
              color={"gray.200"}
              fontSize={14}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Flex
                gap={{ "2xl": 10, xl: 4, lg: 20, md: 10, sm: 10 }}
                justifyContent={"center"}
              >
                <a
                  href={`https://telegram.me/share/url?url=${refralLink}`}
                  data-action="share/telegram/share"
                  target="_blank"
                >
                  <Flex direction={"column"} alignItems={"center"} gap={3}>
                    <Center
                      bg={"rgba(160, 174, 192, 0.04)"}
                      _hover={"rgba(160, 174, 192, 0.04)"}
                      w="50px"
                      h="50px"
                      lineHeight="100%"
                      borderRadius="10px"
                    >
                      <Icon
                        as={TbBrandTelegram}
                        w="20px"
                        h="auto"
                        color="gray.400"
                      />
                    </Center>
                    Telegram
                  </Flex>
                </a>
                <a
                  href={`http://twitter.com/share?text=${refralLink}`}
                  data-action="share/twitter/share"
                  target="_blank"
                >
                  <Flex direction={"column"} alignItems={"center"} gap={3}>
                    <Center
                      bg={"rgba(160, 174, 192, 0.04)"}
                      _hover={"rgba(160, 174, 192, 0.04)"}
                      w="50px"
                      h="50px"
                      lineHeight="100%"
                      borderRadius="10px"
                    >
                      <Icon
                        as={TfiTwitter}
                        w="20px"
                        h="auto"
                        color="gray.400"
                      />
                    </Center>
                    Twitter
                  </Flex>
                </a>
                <a
                  href={`whatsapp://send?text=${refralLink}`}
                  data-action="share/whatsapp/share"
                >
                  <Flex direction={"column"} alignItems={"center"} gap={3}>
                    <Center
                      bg={"rgba(160, 174, 192, 0.04)"}
                      _hover={"rgba(160, 174, 192, 0.04)"}
                      w="50px"
                      h="50px"
                      lineHeight="100%"
                      borderRadius="10px"
                    >
                      <Icon
                        as={TbBrandWhatsapp}
                        w="20px"
                        h="auto"
                        color="gray.400"
                      />
                    </Center>
                    Whatsapp
                  </Flex>
                </a>
              </Flex>
              <Center>ou</Center>
              <Flex direction={"column"} alignItems={"center"} gap={3}>
                <Center>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none" mt={2}>
                      <Image src={copyIcon} />
                    </InputLeftElement>
                    <Input
                      fontWeight="500"
                      placeholder={refralLink}
                      _placeholder={{ fontWeight: "400", color: "white" }}
                      h="53px"
                      borderRadius="8"
                      width={"100%"}
                      value={refralLink}
                      color={"gray.200"}
                      // disabled
                      ref={inputRef}
                      onClick={copyValue}
                    />
                  </InputGroup>
                </Center>
                <Text onClick={copyValue}>Copiez votre lien</Text>
              </Flex>
            </Flex>
          </BasicCard>
        </GridItem>
        <GridItem colSpan={4}>
          <BasicCard
            heading="Historique"
            tabs={true}
            table={true}
            getTabIndex={(e) => setTabIndex(e)}
            columnsData={
              tabIndex === 0 ? columnsDataSponsorship : columnsDataSponsorship2
            }
            tableData={tabIndex === 0 ? refralHistory : []}
          />
        </GridItem>
      </Grid>
    </Box>
  );
}
