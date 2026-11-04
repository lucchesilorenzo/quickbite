import { CategoryResource } from "@/api/models";

export type CategoryWithSelected = CategoryResource & {
  selected: boolean;
};

export type CategoryWithPivot = CategoryResource & {
  pivot: {
    restaurant_id: string;
    category_id: string;
  };
};
