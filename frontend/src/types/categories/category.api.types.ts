import { ApiResponse } from "../api.types";
import { Category } from "./category.types";

export type GetCategoriesResponse = {
  categories: Category[];
} & ApiResponse;
