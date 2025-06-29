import DeliveryDiningOutlinedIcon from "@mui/icons-material/DeliveryDiningOutlined";
import HotelClassIcon from "@mui/icons-material/HotelClass";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import RoomServiceIcon from "@mui/icons-material/RoomService";
import StarRateIcon from "@mui/icons-material/StarRate";

import { RestaurantDetail } from "@/types";

export const emptyRestaurant: RestaurantDetail = {
  id: "",
  name: "",
  slug: "",
  description: null,
  street_address: "",
  building_number: "",
  road: null,
  neighbourhood: null,
  suburb: null,
  island: null,
  city: null,
  county: null,
  state: null,
  postcode: "",
  country: "",
  full_address: "",
  latitude: 0,
  longitude: 0,
  phone_number: "",
  email: "",
  vat_id: null,
  min_amount: 0,
  shipping_cost: 0,
  service_fee: 0,
  delivery_time_min: 0,
  delivery_time_max: 0,
  discount: 0,
  min_discount_amount: 0,
  logo: "",
  cover: "",
  is_approved: false,
  created_at: "",
  updated_at: "",
  reviews_avg_rating: 0,
  reviews_count: 0,
  categories: [],
  delivery_days: [],
  menu_categories: [],
  reviews: [],
};

export const routes = [
  {
    href: "/become-a-rider",
    label: "Become a rider",
    icon: DeliveryDiningOutlinedIcon,
  },
  {
    href: "/become-a-partner",
    label: "Become a partner",
    icon: RestaurantOutlinedIcon,
  },
];

export const headerDialogOptions = [
  {
    href: "/become-a-rider",
    label: "Become a rider",
    icon: DeliveryDiningOutlinedIcon,
  },
  {
    href: "/become-a-partner",
    label: "Become a partner",
    icon: RestaurantOutlinedIcon,
  },
];

export const headerDialogCustomerOptions = [
  {
    href: "/become-a-rider",
    label: "Become a rider",
    icon: DeliveryDiningOutlinedIcon,
    divider: false,
  },
  {
    href: "/become-a-partner",
    label: "Become a partner",
    icon: RestaurantOutlinedIcon,
    divider: true,
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

export const whyChooseUsFeatures = [
  {
    icon: StarRateIcon,
    title: "Loyalty programs",
    details: [
      "Receive stamps, promotions, discounts, news, and more via our newsletters and social channels",
    ],
  },
  {
    icon: LocalActivityIcon,
    title: "Our promise",
    details: ["Excellent service", "Authentic user reviews"],
  },
  {
    icon: HotelClassIcon,
    title: "Your benefits",
    details: [
      "80,000+ places to choose from",
      "Pay online or with cash",
      "Order any time, anywhere, and on any device",
    ],
  },
];

export const ratings: Record<number, string> = {
  1: "one_star",
  2: "two_star",
  3: "three_star",
  4: "four_star",
  5: "five_star",
};
