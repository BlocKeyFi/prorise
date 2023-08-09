import React, { useState } from "react";

// ProRIse imports
import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";

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
import { settingsTab } from "constants/constants";
import Profile from "./components/profile";
import Connections from "./components/connections";
import Notifications from "./components/notification";
import Payments from "./components/payments";

export default function Settings() {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Box>
      <GlobalTabs tabs={settingsTab} tabIndex={(e) => setTabIndex(e)} />

      {tabIndex === 0 && <Profile />}
      {tabIndex === 1 && <Connections />}
      {tabIndex === 2 && <Notifications />}
      {tabIndex === 3 && <Payments />}
    </Box>
  );
}
