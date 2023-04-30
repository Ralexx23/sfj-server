import { z } from "zod";

export const questionZod = z.object({
  question: z.string(),
  image: z.string().optional(),
  answer: z.string().or(z.boolean()),
  options: z.array(z.string()),
  value: z.number(),
});
