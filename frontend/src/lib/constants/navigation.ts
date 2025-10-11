import BarChartIcon from "@mui/icons-material/BarChart";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import RateReviewIcon from "@mui/icons-material/RateReview";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import SettingsIcon from "@mui/icons-material/Settings";

export const partnerRestaurantRoutes = (restaurantId?: string) => [
  {
    href: `/partner/restaurants/${restaurantId}/dashboard`,
    label: "Dashboard",
    icon: DashboardIcon,
  },
  {
    href: `/partner/restaurants/${restaurantId}/settings`,
    label: "Settings",
    icon: SettingsIcon,
  },
  {
    href: `/partner/restaurants/${restaurantId}/menu`,
    label: "Menu",
    icon: RestaurantMenuIcon,
  },
  {
    href: `/partner/restaurants/${restaurantId}/orders`,
    label: "Orders",
    icon: ReceiptLongIcon,
  },
  {
    href: `/partner/restaurants/${restaurantId}/offers`,
    label: "Offers",
    icon: LocalOfferIcon,
  },
  {
    href: `/partner/restaurants/${restaurantId}/reviews`,
    label: "Reviews",
    icon: RateReviewIcon,
  },
  {
    href: `/partner/restaurants/${restaurantId}/stats`,
    label: "Stats",
    icon: BarChartIcon,
  },
];

export const footerLinks = [
  { href: "/become-a-rider", label: "Jobs" },
  { href: "/become-a-partner", label: "Sign up a restaurant" },
  { href: "/terms-and-conditions", label: "Terms of Service" },
  { href: "/privacy-policy", label: "Privacy statement" },
];
