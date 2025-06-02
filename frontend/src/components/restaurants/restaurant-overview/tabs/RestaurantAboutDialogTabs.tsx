import { useState } from "react";

import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Tab from "@mui/material/Tab";

import InfoTab from "./info/InfoTab";
import ReviewsTab from "./reviews/ReviewsTab";

export default function RestaurantAboutDialogTabs() {
  const [value, setValue] = useState("info");

  function handleChange(_e: React.SyntheticEvent, newValue: string) {
    setValue(newValue);
  }

  return (
    <TabContext value={value}>
      <TabList
        onChange={handleChange}
        aria-label="Restaurant About Tabs"
        textColor="inherit"
        sx={{
          ".MuiTabs-indicator": {
            height: 4,
          },
        }}
      >
        <Tab label="Reviews" value="reviews" />
        <Tab label="Info" value="info" />
      </TabList>

      <TabPanel value="reviews" sx={{ p: 0 }}>
        <ReviewsTab />
      </TabPanel>

      <TabPanel value="info" sx={{ p: 0 }}>
        <InfoTab />
      </TabPanel>
    </TabContext>
  );
}
