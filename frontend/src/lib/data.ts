import LocationOnIcon from "@mui/icons-material/LocationOn";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import MopedIcon from "@mui/icons-material/Moped";
import PersonIcon from "@mui/icons-material/Person";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import RoomServiceIcon from "@mui/icons-material/RoomService";

export const routes = [
  { href: "/become-a-rider", label: "Become a rider", icon: MopedIcon },
  {
    href: "/become-a-partner",
    label: "Become a partner",
    icon: RestaurantIcon,
  },
  {
    href: "/auth/login",
    label: "Log in",
    icon: PersonIcon,
  },
];

export const headerDialogOptions = [
  { href: "/become-a-rider", label: "Become a rider", icon: MopedIcon },
  {
    href: "/become-a-partner",
    label: "Become a partner",
    icon: RestaurantIcon,
  },
];

export const footerLinks = [
  { href: "/become-a-rider", label: "Jobs" },
  { href: "/become-a-partner", label: "Sign up a restaurant" },
  { href: "/terms-and-conditions", label: "Terms of Service" },
  { href: "/privacy-policy", label: "Privacy statement" },
];

export const orderSteps = [
  {
    title: "Tell us where you are",
    subtitle:
      "We'll show you stores and restaurants nearby you can order from.",
    icon: LocationOnIcon,
  },
  {
    title: "Find what you want",
    subtitle: "Search for items or dishes, businesses or cuisines.",
    icon: LunchDiningIcon,
  },
  {
    title: "Order for delivery or collection",
    subtitle: "We'll update you on your order's progress.",
    icon: RoomServiceIcon,
  },
];
