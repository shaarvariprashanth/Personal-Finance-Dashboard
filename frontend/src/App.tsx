import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
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

// API may return Transaction with date as string
type TransactionResponse = Omit<Transaction, "date"> & { date: string };

export default function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const budgetLimit = 10000;

  // Load from server once
  useEffect(() => {
    setLoading(true);
    setError(null);
    Promise.all([getTransactions(), getGoals()])
      .then(([txs, gs]) => {
        setTransactions(
          txs.map((t: TransactionResponse) => ({
            ...t,
            date:
              t.date?.slice(0, 10) ??
              new Date(t.date).toISOString().slice(0, 10),
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

  // Handler used by TransactionForm
  const handleAddTransaction = async (
    tx: Omit<Transaction, "id" | "createdAt" | "updatedAt">
  ) => {
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

  const handleAddGoal = async (
    goal: Omit<Goal, "id" | "saved" | "createdAt" | "updatedAt">
  ) => {
    try {
      setError(null);
      const created = await createGoal({
        name: goal.name,
        target: Math.round(goal.target),
      });
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
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-6 bg-gray-50 overflow-auto space-y-6">
            <Routes>
              {/* Dashboard Page */}
              <Route
                path="/"
                element={
                  <>
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold">Dashboard</h2>
                      {loading && (
                        <div className="text-sm text-gray-500">Loading...</div>
                      )}
                    </div>

                    {error && (
                      <div className="text-red-600 bg-red-100 p-2 rounded">
                        {error}
                      </div>
                    )}

                    <TransactionForm
                      onAdd={(tx) =>
                        handleAddTransaction({
                          type: tx.type.toUpperCase() as
                            | "INCOME"
                            | "EXPENSE",
                          category: tx.category,
                          amount: Math.round(tx.amount),
                          date: tx.date,
                        })
                      }
                    />

                    <TransactionList
                      transactions={transactions}
                      budgetLimit={budgetLimit}
                    />

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
                    <GoalList
                      goals={goals}
                      onUpdate={(id, saved) =>
                        handleUpdateGoal(id, saved)
                      }
                    />
                  </>
                }
              />

              {/* Budgets Page */}
              <Route path="/budgets" element={<Budgets />} />

              {/* Recurring Page */}
              <Route path="/recurring" element={<Recurring />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}
