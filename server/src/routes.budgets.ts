import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

// Get all budgets
router.get("/", async (req, res) => {
  const budgets = await prisma.budget.findMany();
  res.json(budgets);
});

// Create new budget
router.post("/", async (req, res) => {
  const { category, limit } = req.body;
  const budget = await prisma.budget.create({
    data: { category, limit },
  });
  res.json(budget);
});

export default router;
