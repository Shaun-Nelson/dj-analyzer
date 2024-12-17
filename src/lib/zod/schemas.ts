import { z } from "zod";

export const searchSchema = z.object({
  search: z
    .string()
    .trim()
    .min(1, { message: "Please search here" })
    .max(100, { message: "Search is too long" }),
});
