import z from "zod";

export const recipeSchema = z.object({
  recipe: z.object({
    name: z.string(),
    ingredients: z.array(z.object({
      name: z.string(),
      amount: z.number(),
    })),
    steps: z.array(z.string()),
  }),
});