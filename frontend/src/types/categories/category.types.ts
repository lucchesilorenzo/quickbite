export type Category = {
  id: string;
  name: string;
  slug: string;
  image: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
};

export type CategoryWithSelected = {
  id: string;
  name: string;
  slug: string;
  image: string;
  selected: boolean;
  is_default: boolean;
  created_at: string;
  updated_at: string;
};

export type CategoryWithPivot = Category & {
  pivot: {
    restaurant_id: string;
    category_id: string;
  };
};
