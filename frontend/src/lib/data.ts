import MopedIcon from "@mui/icons-material/Moped";
import PersonIcon from "@mui/icons-material/Person";
import RestaurantIcon from "@mui/icons-material/Restaurant";

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
