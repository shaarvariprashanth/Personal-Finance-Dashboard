import { useState } from "react";
import type { Transaction } from "../types";

type Props = {
  onAdd: (transaction: Transaction) => void;
};

export default function TransactionForm({ onAdd }: Props) {
  const [type, setType] = useState<"INCOME" | "EXPENSE">("EXPENSE");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!category || !amount || !date) return;

    const newTransaction: Transaction = {
      id: Date.now(),
      type,
      category,
      amount: parseFloat(amount),
      date,
    };

    onAdd(newTransaction);
    setCategory("");
    setAmount("");
    setDate("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-md mb-6 space-y-4"
    >
      <h2 className="text-lg font-semibold">Add Transaction</h2>
      <div className="flex gap-4">
        <select
          value={type}
          onChange={(e) => setType(e.target.value as "INCOME" | "EXPENSE")}
          className="border rounded p-2"
        >
          <option value="EXPENSE">Expense</option>
          <option value="INCOME">Income</option>
        </select>
        <input
          type="text"
          placeholder="Category (e.g., Rent, Salary)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded p-2 flex-1"
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border rounded p-2 w-32"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border rounded p-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Add
        </button>
      </div>
    </form>
  );
}
