import { CategoryResource } from "@/api/backend/models";

export type CategoryWithSelected = CategoryResource & {
  selected: boolean;
};
