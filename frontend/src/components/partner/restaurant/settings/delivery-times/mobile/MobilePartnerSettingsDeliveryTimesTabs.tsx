import { useState } from "react";

import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Tab } from "@mui/material";

import MobilePartnerSettingsDeliveryTimes from "./MobilePartnerSettingsDeliveryTimes";

export default function MobilePartnerSettingsDeliveryTimesTabs() {
  const [tabToOpen, setTabToOpen] = useState("delivery");

  function handleChange(_e: React.SyntheticEvent, newValue: "delivery") {
    setTabToOpen(newValue);
  }

  return (
    <TabContext value={tabToOpen}>
      <TabList
        onChange={handleChange}
        aria-label="Restaurant About Tabs"
        textColor="inherit"
        sx={{
          ".MuiTabs-indicator": {
            bgcolor: "info.main",
            height: 3,
          },
        }}
      >
        <Tab label="Delivery" value="delivery" />
      </TabList>

      <TabPanel value="delivery" sx={{ px: 0 }}>
        <MobilePartnerSettingsDeliveryTimes />
      </TabPanel>
    </TabContext>
  );
}
