import { TRegisterFormSchema } from "@rider/validations/auth-validations";

export const steps = [
  { title: "Step 1", subtitle: "Requirements" },
  { title: "Step 2", subtitle: "Personal info" },
  { title: "Step 3", subtitle: "Location" },
  { title: "Step 4", subtitle: "Vehicle" },
  { title: "Step 5", subtitle: "Account security" },
  { title: "Step 6", subtitle: "Finish your registration" },
];

export const stepFields: Record<number, (keyof TRegisterFormSchema)[]> = {
  0: [],
  1: ["first_name", "last_name", "email", "phone_number"],
  2: ["street_address", "building_number", "postcode", "city", "state"],
  3: ["vehicle_type"],
  4: ["password", "password_confirmation"],
  5: [],
};
