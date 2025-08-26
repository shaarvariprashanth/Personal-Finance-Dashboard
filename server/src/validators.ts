import { z } from "zod";

export const createTransactionSchema = z.object({
  type: z.enum(["INCOME", "EXPENSE"]),
  category: z.string().min(1),
  amount: z.number().int().positive(),
  date: z.string().refine((val) => !Number.isNaN(Date.parse(val)), {
    message: "Invalid date",
  }),
});

export const createGoalSchema = z.object({
  name: z.string().min(1),
  target: z.number().int().positive(),
});

export const updateGoalSavedSchema = z.object({
  saved: z.number().int().nonnegative(),
});
