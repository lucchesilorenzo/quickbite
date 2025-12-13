import { User } from "@/types/user.types";

export const user: User = {
  id: "019a0642-e093-728a-8298-693c85ec0bff",
  first_name: "Mario",
  last_name: "Rossi",
  email: "mariorossi@gmail.com",
  email_verified_at: null,
  profile_picture: null,
  date_of_birth: "1988-12-12",
  phone_number: "+39 323 2663 2653",
  street_address: null,
  building_number: null,
  postcode: null,
  city: null,
  state: null,
  country: "Italy",
  drivers_license: null,
  is_approved: true,
  created_at: "2025-10-21T10:13:57.000000Z",
  updated_at: "2025-10-21T10:13:57.000000Z",
  notification_preferences: [],
  roles: [
    {
      uuid: "0199e1dc-77e8-70e3-b9c8-2e49d62b12e0",
      name: "customer",
      guard_name: "web",
      created_at: "2025-10-14T08:35:46.000000Z",
      updated_at: "2025-10-14T08:35:46.000000Z",
      pivot: {
        model_type: "App\\Models\\User",
        model_uuid: "019a0642-e093-728a-8298-693c85ec0bff",
        role_id: "0199e1dc-77e8-70e3-b9c8-2e49d62b12e0",
      },
    },
  ],
};
