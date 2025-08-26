
const BASE = import.meta.env.VITE_API_URL;

type TxCreate = {
  type: "INCOME" | "EXPENSE";
  category: string;
  amount: number;
  date: string;
};

type GoalCreate = {
  name: string;
  target: number;
};

export async function getTransactions() {
  const res = await fetch(`${BASE}/api/transactions`);
  if (!res.ok) throw new Error("Failed to fetch transactions");
  return res.json();
}

export async function createTransaction(payload: TxCreate) {
  const res = await fetch(`${BASE}/api/transactions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error ?? "Failed to create transaction");
  }
  return res.json();
}

export async function getGoals() {
  const res = await fetch(`${BASE}/api/goals`);
  if (!res.ok) throw new Error("Failed to fetch goals");
  return res.json();
}

export async function createGoal(payload: GoalCreate) {
  const res = await fetch(`${BASE}/api/goals`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error ?? "Failed to create goal");
  }
  return res.json();
}

export async function updateGoalSaved(id: number, saved: number) {
  const res = await fetch(`${BASE}/api/goals/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ saved }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error ?? "Failed to update goal");
  }
  return res.json();
}

type BudgetCreate = {
  category: string;
  limit: number;
};

export async function getBudgets() {
  const res = await fetch(`${BASE}/api/budgets`);
  if (!res.ok) throw new Error("Failed to fetch budgets");
  return res.json();
}

export async function createBudget(payload: BudgetCreate) {
  const res = await fetch(`${BASE}/api/budgets`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error ?? "Failed to create budget");
  }
  return res.json();
}

type RecurringCreate = {
  name: string;
  amount: number;
  interval: string; // DAILY, WEEKLY, MONTHLY, YEARLY
};

export async function getRecurring() {
  const res = await fetch(`${BASE}/api/recurring`);
  if (!res.ok) throw new Error("Failed to fetch recurring expenses");
  return res.json();
}

export async function createRecurring(payload: RecurringCreate) {
  const res = await fetch(`${BASE}/api/recurring`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error ?? "Failed to create recurring expense");
  }
  return res.json();
}

export async function applyRecurring() {
  const res = await fetch(`${BASE}/api/recurring/apply`, { method: "POST" });
  if (!res.ok) throw new Error("Failed to apply recurring expenses");
  return res.json();
}
