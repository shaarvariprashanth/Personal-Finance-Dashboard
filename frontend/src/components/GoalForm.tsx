import { useState } from "react";
import type { Goal } from "../types";

type Props = {
  onAdd: (goal: Goal) => void;
};

export default function GoalForm({ onAdd }: Props) {
  const [name, setName] = useState("");
  const [target, setTarget] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !target) return;

    const newGoal: Goal = {
      id: Date.now(),
      name,
      target: parseFloat(target),
      saved: 0, // start at 0
    };

    onAdd(newGoal);
    setName("");
    setTarget("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-md mb-6 space-y-4"
    >
      <h2 className="text-lg font-semibold">Add Savings Goal</h2>
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Goal (e.g., Laptop)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded p-2 flex-1"
        />
        <input
          type="number"
          placeholder="Target Amount"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          className="border rounded p-2 w-40"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          Add
        </button>
      </div>
    </form>
  );
}
