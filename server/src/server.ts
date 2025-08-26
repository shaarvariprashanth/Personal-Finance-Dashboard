import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import transactionsRouter from "./routes.transactions";
import goalsRouter from "./routes.goals";
import budgetRoutes from "./routes.budgets";
import recurringRoutes from "./routes.recurring";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"], 
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: false,
  })
);
app.use(morgan("dev"));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

app.use("/api/transactions", transactionsRouter);
app.use("/api/goals", goalsRouter);
app.use("/api/budgets", budgetRoutes);
app.use("/api/recurring", recurringRoutes);

// Error handler
app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    if (err?.name === "ZodError") {
      return res.status(400).json({ error: "Validation failed", details: err.errors });
    }
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
);


app.listen(3001, () => {
  console.log(`Server listening on http://localhost:3001`);
});
