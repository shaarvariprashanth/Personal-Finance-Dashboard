import { Router } from "express";
import { prisma } from "./db";
import { createTransactionSchema } from "./validators";

const router = Router();

router.get("/", async (_req, res, next) => {
  try {
    const items = await prisma.transaction.findMany({
      orderBy: { date: "desc" },
    });
    res.json(items);
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const parsed = createTransactionSchema.parse(req.body);
    const created = await prisma.transaction.create({
      data: {
        type: parsed.type,
        category: parsed.category,
        amount: parsed.amount,
        date: new Date(parsed.date),
      },
    });
    res.status(201).json(created);
  } catch (e) {
    next(e);
  }
});

export default router;
