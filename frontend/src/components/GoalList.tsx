import type { Goal } from "../types";

type Props = {
  goals: Goal[];
  onUpdate: (id: number, saved: number) => void;
};

export default function GoalList({ goals, onUpdate }: Props) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-lg font-semibold mb-4">Savings Goals</h2>
      {goals.length === 0 ? (
        <p className="text-gray-500">No goals yet.</p>
      ) : (
        <div className="space-y-6">
          {goals.map((goal) => {
            const progress = (goal.saved / goal.target) * 100;
            return (
              <div key={goal.id} className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-semibold">{goal.name}</span>
                  <span>
                    ₹{goal.saved} / ₹{goal.target}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-green-600 h-4 rounded-full"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Add savings"
                    className="border rounded p-2 w-40"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        const val = parseFloat(
                          (e.target as HTMLInputElement).value
                        );
                        if (val > 0) {
                          onUpdate(goal.id, goal.saved + val);
                          (e.target as HTMLInputElement).value = "";
                        }
                      }
                    }}
                  />
                  <button
                    onClick={() => onUpdate(goal.id, goal.saved + 1000)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    +₹1000
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
