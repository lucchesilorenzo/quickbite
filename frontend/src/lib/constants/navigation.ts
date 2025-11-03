import DeliveryDiningOutlinedIcon from "@mui/icons-material/DeliveryDiningOutlined";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";

export const headerDialogOptions = [
  {
    href: "/rider/auth/register",
    label: "Become a rider",
    icon: DeliveryDiningOutlinedIcon,
  },
  {
    href: "/partner/auth/register",
    label: "Become a partner",
    icon: RestaurantOutlinedIcon,
  },
];

export const footerLinks = [
  { href: "/rider/auth/register", label: "Jobs" },
  { href: "/partner/auth/register", label: "Sign up a restaurant" },
  { href: "/terms-and-conditions", label: "Terms of Service" },
  { href: "/privacy-policy", label: "Privacy statement" },
];
