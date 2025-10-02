import { useEffect } from "react";

import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useMediaQuery } from "@mui/material";
import Tab from "@mui/material/Tab";
import { useSearchParams } from "react-router-dom";

import InfoTab from "./info/InfoTab";
import OffersPanel from "./offers/OffersPanel";
import ReviewsTab from "./reviews/ReviewsTab";

import { useRestaurantOffer } from "@/hooks/contexts/useRestaurantOffer";
import { useSingleRestaurant } from "@/hooks/contexts/useSingleRestaurant";
import { restaurantTabs } from "@/lib/data";
import { RestaurantTab } from "@/types";

export default function RestaurantAboutDialogTabs() {
  const { tabToOpen, setTabToOpen } = useSingleRestaurant();
  const { offersData } = useRestaurantOffer();

  const [searchParams, setSearchParams] = useSearchParams();

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  function handleChange(_e: React.SyntheticEvent, newValue: RestaurantTab) {
    setTabToOpen(newValue);

    const params = new URLSearchParams(searchParams);
    params.set("tab", newValue);

    if (newValue !== "reviews") params.delete("reviews_page");
    if (newValue !== "offers") params.delete("offers_page");

    setSearchParams(params, { replace: true });
  }

  useEffect(() => {
    const tab = searchParams.get("tab") as RestaurantTab;
    if (!tab || !restaurantTabs.includes(tab)) return;

    setTabToOpen(tab);

    const params = new URLSearchParams(searchParams);
    if (tab !== "reviews") params.delete("reviews_page");
    if (tab !== "offers") params.delete("offers_page");

    setSearchParams(params, { replace: true });
  }, [searchParams, setSearchParams, setTabToOpen]);

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
        {offersData.data.length > 0 && <Tab label="Offers" value="offers" />}
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
