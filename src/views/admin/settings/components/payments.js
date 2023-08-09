import React, { useState } from "react";

// ProRIse imports
import { Flex, Grid, GridItem } from "@chakra-ui/react";

// Custom components
import GlobalTabs from "components/Tabs/tabs";
import BasicCard from "components/card/BasicCard";

import InputFeild from "components/fields/InputField";

import PriceCard from "views/auth/onboarding/components/priceCard";
import { RiVisaLine } from "react-icons/ri";

import { useSelector } from "react-redux";

import { useEffect } from "react";
import apiInstance from "constants/api";
import { PRO_RISE } from "constants/apiConstants";
import { setAuthToken } from "constants/api";
import { toast } from "react-hot-toast";

export default function Payments() {
  const { login } = useSelector((state) => state.user);
  const [plans, setPlans] = useState([]);

  useEffect(async () => {
    try {
      setAuthToken(login?.token);
      const { data } = await apiInstance.get(`${PRO_RISE.getPlans}`);
      if (data?.success) {
        setPlans(data?.result);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error(error);
    }
  }, []);

  const onCheckOut = async (param) => {
    const { data } = await apiInstance.post(`${PRO_RISE.checkOut}`, param);
    if (data?.success) {
      window.location.href = data?.url;
    }
  };

  return (
    <Flex direction={"column"} gap={10}>
      <BasicCard
        heading="Abonnement"
        buttonHeader={true}
        btnText={"Mettre à jour"}
      >
        <Flex
          zIndex="2"
          direction={{ xl: "row", lg: "row", md: "column", sm: "column" }}
          w={{ base: "100%", md: "100%", sm: "100%" }}
          maxW="100%"
          background="transparent"
          borderRadius="15px"
          mx={{ base: "auto", lg: "unset" }}
          me="auto"
          mb={{ base: "20px", md: "auto" }}
          alignItems="center"
        >
          {plans?.map((item, index) => (
            <PriceCard
              id={++index}
              heading={item?.name}
              paragraph={item?.description}
              price={`€ ${item?.price}/mois`}
              btnText={
                index === 1 ? "Essai gratuit de 7 jours" : "Sélectionner"
              }
              onClick={() =>
                onCheckOut({
                  priceId: item?.stripePrice,
                })
              }
              setting={true}
              userId={login?.user?.id}
              currentPlan={login?.user?.currentPlan}
            />
          ))}
        </Flex>
      </BasicCard>
      <BasicCard heading="Mode de paiement">
        <Grid
          templateRows="repeat(1, 1fr)"
          templateColumns="repeat(3, 1fr)"
          gap={10}
        >
          <GridItem
            colSpan={{
              "2xl": 1,
              xl: 1,
              lg: 1,
              md: 4,
              sm: 4,
            }}
          >
            <InputFeild
              label="Numéro de carte de crédit"
              type="password"
              icon={RiVisaLine}
              placeholder={"**** **** **** 9010"}
            />
          </GridItem>
          <GridItem
            colSpan={{
              "2xl": 1,
              xl: 1,
              lg: 1,
              md: 4,
              sm: 4,
            }}
          >
            <InputFeild
              label="Date d’expiration"
              type="number"
              placeholder={"11/2023"}
            />
          </GridItem>
          <GridItem
            colSpan={{
              "2xl": 1,
              xl: 1,
              lg: 1,
              md: 4,
              sm: 4,
            }}
          >
            <InputFeild label="CVV" type="password" placeholder={"***"} />
          </GridItem>
        </Grid>
      </BasicCard>
      <BasicCard heading="Historique des paiements" table={true} slice={true} />
    </Flex>
  );
}
