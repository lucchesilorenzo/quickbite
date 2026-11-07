import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import MopedIcon from "@mui/icons-material/Moped";

import { VehicleType } from "@/api/models";

type VehicleIcon = typeof DirectionsCarIcon;

export const vehicles: {
  label: string;
  value: VehicleType;
  icon: VehicleIcon;
}[] = [
  { label: "Scooter", value: "scooter", icon: MopedIcon },
  { label: "Car", value: "car", icon: DirectionsCarIcon },
];
