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

import { useDispatch, useSelector } from "react-redux";
import apiInstance from "constants/api";
import { PRO_RISE } from "constants/apiConstants";
import { toast } from "react-hot-toast";
import { updateUser } from "store/actions";

export default function Profile() {
  const textColor = useColorModeValue("white", "white");
  const textColorSecondary = useColorModeValue("gray.200", "gray.200");
  const { login } = useSelector((state) => state.user);

  const dispatch = useDispatch()

  const [userDetail, setUserDetail] = useState({ ...login?.user });
  const [password, setPassword] = useState({
    password: "",
    newPassword: "",
  });

  const updateData = async () => {
    const requiredFields = ["firstName", "lastName", "phoneNumber", "email"];
    if (
      !userDetail.firstName ||
      !userDetail.lastName ||
      !userDetail.phoneNumber ||
      !userDetail.email
    ) {
      if (!userDetail) {
        toast.error("userDetail is missing");
      } else {
        for (const field of requiredFields) {
          if (!userDetail[field]) {
            toast.error(`${field} is missing`);
          }
        }
      }

    } else {
      const extractedData = {
        firstName: userDetail?.firstName,
        lastName: userDetail?.lastName,
        phoneNumber: userDetail?.phoneNumber,
        email: userDetail?.email,
      };
      const { data } = await apiInstance.post(
        `${PRO_RISE.updateUserInfo}`,
        extractedData
      );
      dispatch(updateUser(data?.data))
      toast.success(data?.message);
    }
  };

  const onChangePassword = async () => {
    if (password.password && password.newPassword) {

      const { data } = await apiInstance.post(
        `${PRO_RISE.changePassword}`,
        password
      );
      if (data?.success) {
        toast.success(data?.msg);
        setPassword({
          password: "",
          newPassword: "",
        })
      }else{
        toast.error(data?.msg);
      }
    }
  };

  return (
    <Box>
      <Flex direction={"column"} gap={10}>
        <BasicCard
          heading="Informations de base"
          buttonHeader={true}
          btnText={"Mettre à jour"}
          onClick={updateData}
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
                isInvalid={!userDetail?.firstName}
                label="Prénom"
                placeholder="Cole"
                type="text"
                value={userDetail?.firstName}
                onChange={(e) =>
                  setUserDetail({
                    ...userDetail,
                    firstName: e.target.value,
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
                isInvalid={!userDetail?.lastName}
                label="Nom de famille"
                placeholder="Caufield"
                type="text"
                value={userDetail?.lastName}
                onChange={(e) =>
                  setUserDetail({
                    ...userDetail,
                    lastName: e.target.value,
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
          onClick={onChangePassword}
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
              <InputFeild
                label="Ancien mot de passe"
                type="password"
                value={password?.password}
                onChange={(e) =>
                  setPassword({
                    ...password,
                    password: e.target.value,
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
                label="Nouveau mot de passe"
                type="password"
                value={password?.newPassword}
                onChange={(e) =>
                  setPassword({
                    ...password,
                    newPassword: e.target.value,
                  })
                }
              />
            </GridItem>
          </Grid>
        </BasicCard>
      </Flex>
    </Box>
  );
}
