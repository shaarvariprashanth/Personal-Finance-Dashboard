import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import ExpenseChart from "./components/ExpenseChart";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import GoalForm from "./components/GoalForm";
import GoalList from "./components/GoalList";
import type { Transaction, Goal } from "./types";
import {
  getTransactions,
  createTransaction,
  getGoals,
  createGoal,
  updateGoalSaved,
} from "./services/api";
import Budgets from "./pages/Budgets";
import Recurring from "./pages/Recurring";
import MonthlyChart from "./components/MonthlyChart";

type TransactionResponse = Omit<Transaction, "date"> & { date: string };

export default function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false); // lifted state
  const budgetLimit = 10000;

  // Dark mode background for entire page
  useEffect(() => {
    document.body.style.background = darkMode ? "#1f2937" : "#f9fafb";
    document.body.style.transition = "background 0.3s ease";
  }, [darkMode]);

  // Load data
  useEffect(() => {
    setLoading(true);
    setError(null);
    Promise.all([getTransactions(), getGoals()])
      .then(([txs, gs]) => {
        setTransactions(
          txs.map((t: TransactionResponse) => ({
            ...t,
            date: t.date?.slice(0, 10) ?? new Date(t.date).toISOString().slice(0, 10),
          }))
        );
        setGoals(gs);
      })
      .catch((e: unknown) => {
        if (e instanceof Error) setError(e.message);
        else setError("Failed to load data");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleAddTransaction = async (tx: Omit<Transaction, "id" | "createdAt" | "updatedAt">) => {
    try {
      setError(null);
      const created = await createTransaction({
        type: tx.type,
        category: tx.category,
        amount: Math.round(tx.amount),
        date: tx.date,
      });
      created.date = created.date?.slice(0, 10) ?? created.date;
      setTransactions((prev) => [created, ...prev]);
    } catch (e: unknown) {
      if (e instanceof Error) setError(e.message);
      else setError("Create transaction failed");
    }
  };

  const handleAddGoal = async (goal: Omit<Goal, "id" | "saved" | "createdAt" | "updatedAt">) => {
    try {
      setError(null);
      const created = await createGoal({ name: goal.name, target: Math.round(goal.target) });
      setGoals((prev) => [created, ...prev]);
    } catch (e: unknown) {
      if (e instanceof Error) setError(e.message);
      else setError("Create goal failed");
    }
  };

  const handleUpdateGoal = async (id: number, newSaved: number) => {
    try {
      setError(null);
      const updated = await updateGoalSaved(id, Math.round(newSaved));
      setGoals((prev) => prev.map((g) => (g.id === id ? updated : g)));
    } catch (e: unknown) {
      if (e instanceof Error) setError(e.message);
      else setError("Update goal failed");
    }
  };

  return (
    <Router>
      <div className="flex flex-1 min-h-screen">
        <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />
        <main
          className="flex-1 p-6 overflow-auto space-y-6"
          style={{
            minHeight: "100vh",
            transition: "background 0.3s ease",
          }}
        >
          <Routes>
            {/* Dashboard */}
            <Route
              path="/"
              element={
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2
                      className="text-2xl font-bold"
                      style={{ color: darkMode ? "#f3f4f6" : "#1f2937", transition: "color 0.3s ease" }}
                    >
                      Dashboard
                    </h2>
                    {loading && (
                      <div className="text-sm" style={{ color: darkMode ? "#d1d5db" : "#6b7280", transition: "color 0.3s ease" }}>
                        Loading...
                      </div>
                    )}
                  </div>

                  {error && (
                    <div
                      className="p-2 rounded"
                      style={{
                        background: darkMode ? "#7f1d1d" : "#fee2e2",
                        color: darkMode ? "#fca5a5" : "#b91c1c",
                        transition: "all 0.3s ease",
                      }}
                    >
                      {error}
                    </div>
                  )}

                  <TransactionForm
                    onAdd={(tx) =>
                      handleAddTransaction({
                        type: tx.type.toUpperCase() as "INCOME" | "EXPENSE",
                        category: tx.category,
                        amount: Math.round(tx.amount),
                        date: tx.date,
                      })
                    }
                  />

                  <TransactionList transactions={transactions} budgetLimit={budgetLimit} />

                  <ExpenseChart transactions={transactions} />
                  <MonthlyChart transactions={transactions} />

                  <GoalForm
                    onAdd={(g) =>
                      handleAddGoal({
                        name: g.name,
                        target: Math.round(g.target),
                      })
                    }
                  />
                  <GoalList goals={goals} onUpdate={(id, saved) => handleUpdateGoal(id, saved)} />
                </div>
              }
            />

            {/* Budgets */}
            <Route path="/budgets" element={<Budgets darkMode={darkMode} />} />

            {/* Recurring */}
            <Route path="/recurring" element={<Recurring darkMode={darkMode} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
