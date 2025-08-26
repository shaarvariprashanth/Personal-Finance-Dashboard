import type { Transaction } from "../types";

type Props = {
  transactions: Transaction[];
  budgetLimit: number;
};

export default function TransactionList({ transactions, budgetLimit }: Props) {
  const totalExpenses = transactions
    .filter((t) => t.type === "EXPENSE")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-lg font-semibold mb-4">Transactions</h2>

      {transactions.length === 0 ? (
        <p className="text-gray-500">No transactions yet.</p>
      ) : (
        <table className="w-full text-left border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Type</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Amount</th>
              <th className="p-2 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t.id}>
                <td className="p-2 border">{t.type}</td>
                <td className="p-2 border">{t.category}</td>
                <td
                  className={`p-2 border ${
                    t.type === "EXPENSE" ? "text-red-600" : "text-green-600"
                  }`}
                >
                  ₹{t.amount}
                </td>
                <td className="p-2 border">{t.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="mt-4 font-semibold">
        Total Expenses: ₹{totalExpenses}
      </div>

      {totalExpenses > budgetLimit && (
        <div className="mt-2 p-2 bg-red-100 text-red-700 rounded">
          ⚠️ Alert: You have exceeded your budget limit of ₹{budgetLimit}!
        </div>
      )}
    </div>
  );
}
