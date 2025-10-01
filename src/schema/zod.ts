import { z, object, string, number } from "zod";

export const signInSchema = object({
  email: string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email" }),
  password: string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(32, { message: "Password must be less than 32 characters" }),
});


export const ingredientSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  category: z.enum(["VEGETABLE", "FRUIT", "MEAT", "DAIRY", "GRAIN", "OTHER"]).refine(
    (val) => !!val,
    { message: "Category is required and must be valid" }
  ),
  unit: z.enum(["GRAM", "KILOGRAM", "LITER", "MILLILITER", "PIECE", "OTHER"]).refine(
    (val) => !!val,
    { message: "Unit is required and must be valid" }
  ),
  pricePerUnit: z.number().nullable().optional(),
  description: z.string().optional(),
});
