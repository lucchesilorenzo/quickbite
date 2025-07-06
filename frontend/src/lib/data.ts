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
  delivery_fee: 0,
  service_fee: 0,
  delivery_time_min: 0,
  delivery_time_max: 0,
  logo: "",
  cover: "",
  is_approved: false,
  created_at: "",
  updated_at: "",
  reviews_avg_rating: 0,
  reviews_count: 0,
  offers: [],
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

export const termsOfService: {
  title: string;
  content: string[];
}[] = [
  {
    title: "Eligibility",
    content: [
      "To use the Platform, you must be at least 18 years old or the age of majority in your jurisdiction. By using the Platform, you represent and warrant that you meet these requirements.",
    ],
  },
  {
    title: "User Accounts",
    content: [
      "You must create an account to place orders, become a restaurant partner, or register as a rider.",
      "You agree to provide accurate and complete information and to keep your account credentials secure.",
      "You are responsible for all activities that occur under your account.",
    ],
  },
  {
    title: "Orders and Payments",
    content: [
      "Orders placed through the Platform are binding.",
      "You agree to pay all charges associated with your order, including delivery fees and taxes.",
      "Payments are processed securely through third-party providers.",
      "Once an order is confirmed, cancellations or refunds may not be guaranteed.",
    ],
  },
  {
    title: "Restaurant and Menu Information",
    content: [
      "Restaurants are responsible for the accuracy of their menus, prices, and availability.",
      "We do not guarantee the quality, safety, or legality of the food or beverages offered by restaurants.",
    ],
  },
  {
    title: "Deliveries",
    content: [
      "Delivery times are estimates and may vary due to external conditions (e.g., weather, traffic).",
      "It is your responsibility to ensure someone is available to receive the delivery.",
      "In case of failed delivery attempts due to your unavailability, you may still be charged.",
    ],
  },
  {
    title: "Use of the Platform",
    content: [
      "Use the Platform only for lawful purposes.",
      "Do not misuse or interfere with the Platform's functionality or security.",
      "Do not submit false information or impersonate others.",
    ],
  },
  {
    title: "Termination",
    content: [
      "We reserve the right to suspend or terminate your access to the Platform at our sole discretion, with or without notice, for behavior that violates these Terms or is harmful to other users or the Platform.",
    ],
  },
  {
    title: "Intellectual Property",
    content: [
      "All content, trademarks, and technology used in the Platform are owned by us or our partners.",
      "You may not reproduce, distribute, or exploit any part of the Platform without our prior written consent.",
    ],
  },
  {
    title: "Limitation of Liability",
    content: [
      "We are not liable for any indirect, incidental, or consequential damages.",
      "We are not responsible for delays, failed deliveries, or errors caused by third parties (restaurants, riders, payment providers).",
      "We are not liable for losses resulting from unauthorized account access.",
    ],
  },
  {
    title: "Privacy",
    content: [
      "Your personal information is handled in accordance with our Privacy Policy.",
      "By using the Platform, you consent to such handling.",
    ],
  },
  {
    title: "Changes to Terms",
    content: [
      "We may update these Terms from time to time.",
      "Continued use of the Platform constitutes your acceptance of the revised Terms.",
    ],
  },
  {
    title: "Contact",
    content: [
      "For questions or concerns, contact us at: support@quickbite.com.",
    ],
  },
];

export const privacyPolicy: {
  title: string;
  content: {
    type: "paragraph" | "list";
    text?: string;
    items?: string[];
  }[];
}[] = [
  {
    title: "Introduction",
    content: [
      {
        type: "paragraph",
        text: "This Privacy Policy explains how we collect, use, and protect your personal data when you use our platform, including the mobile app and related services. We are committed to safeguarding your privacy and complying with applicable data protection laws.",
      },
    ],
  },
  {
    title: "Who is responsible",
    content: [
      {
        type: "paragraph",
        text: "The data controller of your personal data is the entity operating the food delivery platform in your country. If you have any questions about this policy or wish to exercise your rights, please contact us using the details provided below.",
      },
    ],
  },
  {
    title: "What data we collect",
    content: [
      {
        type: "paragraph",
        text: "We may collect the following types of personal data:",
      },
      {
        type: "list",
        items: [
          "Account Information: name, email, phone number, address",
          "Order Information: order details, payment information, delivery address",
          "Device and Usage Data: IP address, browser, app usage, location (if enabled)",
          "Communication Data: messages sent to restaurants/riders, customer support",
        ],
      },
    ],
  },
  {
    title: "Why we collect your data",
    content: [
      {
        type: "paragraph",
        text: "We process your data to:",
      },
      {
        type: "list",
        items: [
          "Provide and deliver our services",
          "Communicate with you (e.g. order confirmations, support)",
          "Improve our platform and services",
          "Comply with legal obligations",
          "Prevent fraud and misuse",
        ],
      },
    ],
  },
  {
    title: "Legal basis for processing",
    content: [
      {
        type: "paragraph",
        text: "We process your personal data based on:",
      },
      {
        type: "list",
        items: [
          "The performance of a contract (e.g. processing your order)",
          "Your consent (e.g. marketing)",
          "Compliance with legal obligations",
          "Our legitimate interests (e.g. service improvement)",
        ],
      },
    ],
  },
  {
    title: "Sharing your data",
    content: [
      {
        type: "paragraph",
        text: "We may share your personal data with:",
      },
      {
        type: "list",
        items: [
          "Restaurants and riders to fulfill your orders",
          "Payment service providers",
          "Customer support partners",
          "IT and hosting providers",
          "Authorities when legally required",
          "We never sell your personal data.",
        ],
      },
    ],
  },
  {
    title: "Your privacy rights",
    content: [
      {
        type: "paragraph",
        text: "You have the right to:",
      },
      {
        type: "list",
        items: [
          "Access your personal data",
          "Correct or update your data",
          "Request deletion of your data",
          "Object to or restrict processing",
          "Withdraw consent at any time",
          "Receive a copy of your data (data portability)",
          "Lodge a complaint with a data protection authority",
        ],
      },
      {
        type: "paragraph",
        text: "To exercise your rights, please contact us using the form or contact details below. We may verify your identity before fulfilling your request.",
      },
    ],
  },
  {
    title: "Security",
    content: [
      {
        type: "paragraph",
        text: "We implement appropriate technical and organizational measures to protect your data from unauthorized access, misuse, or loss. Only authorized personnel have access to your personal data.",
      },
    ],
  },
  {
    title: "Contact us",
    content: [
      {
        type: "paragraph",
        text: "If you have questions or concerns about this Privacy Policy or our data practices, contact us at:",
      },
      {
        type: "list",
        items: [
          "Email: privacy@quickbite.com",
          "Address: QuickBite S.r.l.",
          "Via Dante Alighieri, 23",
          "50100 Florence",
          "Italy",
        ],
      },
    ],
  },
  {
    title: "Changes to this Policy",
    content: [
      {
        type: "paragraph",
        text: "We may update this Privacy Policy from time to time.",
      },
      {
        type: "paragraph",
        text: "The latest version will always be available on our website and app.",
      },
    ],
  },
];
