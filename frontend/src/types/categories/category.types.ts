import { CategoryResource } from "@/api/models";

export type CategoryWithSelected = CategoryResource & {
  selected: boolean;
};
