import { TRegisterFormSchema } from "@/features/private/rider/schemas/auth.schema";

export const steps: {
  title: string;
  subtitle: string;
  fields: (keyof TRegisterFormSchema)[];
}[] = [
  {
    title: "Step 1",
    subtitle: "Requirements",
    fields: [],
  },
  {
    title: "Step 2",
    subtitle: "Personal info",
    fields: ["first_name", "last_name", "email", "phone_number"],
  },
  {
    title: "Step 3",
    subtitle: "Location",
    fields: ["street_address", "building_number", "postcode", "city", "state"],
  },
  {
    title: "Step 4",
    subtitle: "Vehicle",
    fields: ["vehicle_type"],
  },
  {
    title: "Step 5",
    subtitle: "Account security",
    fields: ["password", "password_confirmation"],
  },
  {
    title: "Step 6",
    subtitle: "Finish your registration",
    fields: [],
  },
];
