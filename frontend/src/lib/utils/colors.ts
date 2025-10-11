import { COLORS } from "../constants/colors";

export function getColorByName(name?: string) {
  if (!name) return COLORS[0];

  const index = name.charCodeAt(0) % COLORS.length;
  return COLORS[index];
}
