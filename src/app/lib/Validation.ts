import { z } from "zod";

export const formSchema = z.object({
  name: z
    .string()
    .min(2, "Username must be at least 2 characters.")
    .max(20, "Username must be at most 20 characters."),
  email: z.string().email("invalid email"),
  phone: z.string().refine((phone) => /^\+\d{10,15}$/.test(phone)),
});
