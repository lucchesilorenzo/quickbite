export type Category = {
  id: string;
  name: string;
  slug: string;
  image: string;
  image_url: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
};

export type CategoryWithSelected = Category & {
  selected: boolean;
};

export type CategoryWithPivot = Category & {
  pivot: {
    restaurant_id: string;
    category_id: string;
  };
};
