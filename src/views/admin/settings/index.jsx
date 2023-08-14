import React, { useState } from "react";

// ProRIse imports
import { Box } from "@chakra-ui/react";

// Custom components
import GlobalTabs from "components/Tabs/tabs";

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
