import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useMediaQuery } from "@mui/material";
import Tab from "@mui/material/Tab";

import InfoTab from "./info/InfoTab";
import OffersPanel from "./offers/OffersPanel";
import ReviewsTab from "./reviews/ReviewsTab";

import { useSingleRestaurant } from "@/hooks/contexts/useSingleRestaurant";
import { RestaurantTab } from "@/types";

export default function RestaurantAboutDialogTabs() {
  const { tabToOpen, setTabToOpen, restaurant } = useSingleRestaurant();

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  function handleChange(_e: React.SyntheticEvent, newValue: RestaurantTab) {
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
            height: 4,
          },
        }}
      >
        <Tab label="Reviews" value="reviews" />
        <Tab label="Info" value="info" />
        {restaurant.offers.length > 0 && <Tab label="Offers" value="offers" />}
      </TabList>

      <TabPanel
        value="reviews"
        sx={{ p: 0, maxHeight: isMobile ? 800 : 600, overflowY: "auto" }}
      >
        <ReviewsTab />
      </TabPanel>

      <TabPanel
        value="info"
        sx={{ p: 0, maxHeight: isMobile ? 800 : 600, overflowY: "auto" }}
      >
        <InfoTab />
      </TabPanel>

      <TabPanel value="offers" sx={{ p: 0, maxHeight: 600, overflowY: "auto" }}>
        <OffersPanel />
      </TabPanel>
    </TabContext>
  );
}
