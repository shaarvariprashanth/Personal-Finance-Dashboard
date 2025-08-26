import { useEffect, useState } from "react";
import { getRecurring, createRecurring } from "../services/api";

type RecurringExpense = {
  id: number;
  name: string;
  amount: number;
  interval: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";
};

export default function Recurring() {
  const [recurrings, setRecurrings] = useState<RecurringExpense[]>([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [interval, setInterval] = useState<RecurringExpense["interval"]>("MONTHLY");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadRecurring();
  }, []);

  const loadRecurring = async () => {
    try {
      setError(null);
      setLoading(true);
      const data = await getRecurring();
      setRecurrings(data);
    } catch (e: unknown) {
      if (e instanceof Error) setError(e.message);
      else setError("Failed to load recurring expenses");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError(null);
      const newRecurring = await createRecurring({ name, amount, interval });
      setRecurrings((prev) => [...prev, newRecurring]);
      setName("");
      setAmount(0);
      setInterval("MONTHLY");
    } catch (e: unknown) {
      if (e instanceof Error) setError(e.message);
      else setError("Failed to create recurring expense");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Recurring Expenses</h2>

      {error && <div className="bg-red-100 text-red-600 p-2 mb-2">{error}</div>}
      {loading && <div>Loading...</div>}

      <form onSubmit={handleAdd} className="space-x-2 mb-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="border px-2 py-1 rounded"
          required
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder="Amount"
          className="border px-2 py-1 rounded"
          required
        />
        <select
          value={interval}
          onChange={(e) => setInterval(e.target.value as RecurringExpense["interval"])}
          className="border px-2 py-1 rounded"
        >
          <option value="DAILY">Daily</option>
          <option value="WEEKLY">Weekly</option>
          <option value="MONTHLY">Monthly</option>
          <option value="YEARLY">Yearly</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
        >
          Add
        </button>
      </form>

      <ul className="space-y-2">
        {recurrings.map((r) => (
          <li
            key={r.id}
            className="border p-2 rounded flex justify-between items-center"
          >
            <span className="font-medium">{r.name}</span>
            <span>
              ₹{r.amount} ({r.interval})
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
