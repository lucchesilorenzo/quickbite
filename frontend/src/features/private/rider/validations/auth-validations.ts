import z from "zod";

export const registerFormSchema = z.object({});

export type TRegisterFormSchema = z.infer<typeof registerFormSchema>;
