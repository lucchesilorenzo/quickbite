import { TRegisterFormSchema } from "@rider/validations/auth-validations";

export const registerForm: TRegisterFormSchema = {
  first_name: "John",
  last_name: "Doe",
  email: "johndoe@gmail.com",
  phone_number: "+39 373 332 3323",
  street_address: "Via Roma",
  building_number: "12",
  postcode: "00100",
  city: "Roma",
  state: "Lazio",
  vehicle_type: "scooter",
  password: "JohnDoe1111!",
  password_confirmation: "JohnDoe1111!",
};

export const registerFormWithoutPasswordAndConfirmation: Omit<
  TRegisterFormSchema,
  "password" | "password_confirmation"
> = {
  first_name: "John",
  last_name: "Doe",
  email: "johndoe@gmail.com",
  phone_number: "+39 373 332 3323",
  street_address: "Via Roma",
  building_number: "12",
  postcode: "00100",
  city: "Roma",
  state: "Lazio",
  vehicle_type: "scooter",
};
