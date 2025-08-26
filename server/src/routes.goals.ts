import { Router } from "express";
import { prisma } from "./db";
import { createGoalSchema, updateGoalSavedSchema } from "./validators";

const router = Router();

router.get("/", async (_req, res, next) => {
  try {
    const items = await prisma.goal.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(items);
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const parsed = createGoalSchema.parse(req.body);
    const created = await prisma.goal.create({
      data: { name: parsed.name, target: parsed.target, saved: 0 },
    });
    res.status(201).json(created);
  } catch (e) {
    next(e);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });
    const parsed = updateGoalSavedSchema.parse(req.body);
    const updated = await prisma.goal.update({
      where: { id },
      data: { saved: parsed.saved },
    });
    res.json(updated);
  } catch (e) {
    next(e);
  }
});

export default router;
