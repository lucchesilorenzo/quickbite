export type User = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  email_verified_at: string;
  role: "CUSTOMER" | "RESTAURATEUR" | "RIDER";
  profile_picture: string | null;
  date_of_birth: string;
  phone_number: string;
  street_address: string | null;
  building_number: string | null;
  postcode: string | null;
  city: string | null;
  country: string | null;
  driving_licence: string | null;
  created_at: string;
  updated_at: string;
};
