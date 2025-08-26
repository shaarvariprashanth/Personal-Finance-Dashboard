import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

// Get all recurring expenses
router.get("/", async (req, res) => {
  const recurring = await prisma.recurringExpense.findMany();
  res.json(recurring);
});

// Create recurring expense
router.post("/", async (req, res) => {
  const { title, amount, category, interval, nextDate } = req.body;
  const rec = await prisma.recurringExpense.create({
    data: { title, amount, category, interval, nextDate: new Date(nextDate) },
  });
  res.json(rec);
});

// Apply recurring expenses (simple monthly forward)
router.post("/apply", async (req, res) => {
  const recurring = await prisma.recurringExpense.findMany();
  const now = new Date();

  for (const r of recurring) {
    if (new Date(r.nextDate) <= now) {
      await prisma.transaction.create({
        data: {
          title: r.title,
          amount: r.amount,
          category: r.category,
          date: now,
        },
      });

      const next = new Date(now);
      next.setMonth(next.getMonth() + 1);

      await prisma.recurringExpense.update({
        where: { id: r.id },
        data: { nextDate: next },
      });
    }
  }

  res.json({ message: "Recurring expenses applied" });
});

export default router;
