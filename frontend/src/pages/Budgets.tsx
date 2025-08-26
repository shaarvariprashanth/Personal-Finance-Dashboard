import { useEffect, useState } from "react";
import { getBudgets, createBudget } from "../services/api";

type Budget = {
  id: number;
  category: string;
  limit: number;
  spent: number;
};

export default function Budgets() {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [category, setCategory] = useState("");
  const [limit, setLimit] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadBudgets();
  }, []);

  const loadBudgets = async () => {
    try {
      setError(null);
      setLoading(true);
      const data = await getBudgets();
      setBudgets(data);
    } catch (e: unknown) {
      if (e instanceof Error) setError(e.message);
      else setError("Failed to load budgets");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError(null);
      const newBudget = await createBudget({ category, limit });
      setBudgets((prev) => [...prev, newBudget]);
      setCategory("");
      setLimit(0);
    } catch (e: unknown) {
      if (e instanceof Error) setError(e.message);
      else setError("Failed to create budget");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Budgets</h2>

      {error && <div className="bg-red-100 text-red-600 p-2 mb-2">{error}</div>}
      {loading && <div>Loading...</div>}

      <form onSubmit={handleAdd} className="space-x-2 mb-4">
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          className="border px-2 py-1 rounded"
          required
        />
        <input
          type="number"
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          placeholder="Limit"
          className="border px-2 py-1 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
        >
          Add
        </button>
      </form>

      <ul className="space-y-2">
        {budgets.map((b) => (
          <li
            key={b.id}
            className="border p-2 rounded flex justify-between items-center"
          >
            <span className="font-medium">{b.category}</span>
            <span>
              {b.spent} / {b.limit}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
