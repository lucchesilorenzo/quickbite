import WorkIcon from "@mui/icons-material/Work";

export const riderUnemployedRoutes = [
  {
    label: "Job posts",
    href: "/rider/job-posts",
    icon: WorkIcon,
  },
];

export const riderEmployedRoutes = (restaurantId: string) => [
  {
    label: "Dashboard",
    href: `/rider/restaurants/${restaurantId}`,
  },
];
