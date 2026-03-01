import RestaurantIcon from "@mui/icons-material/Restaurant";
import WorkIcon from "@mui/icons-material/Work";

export const riderRoutes = [
  {
    label: "Job posts",
    href: "/rider/job-posts",
    icon: WorkIcon,
  },
  {
    label: "My restaurant",
    href: "/rider/my-restaurant",
    icon: RestaurantIcon,
  },
] as const;
