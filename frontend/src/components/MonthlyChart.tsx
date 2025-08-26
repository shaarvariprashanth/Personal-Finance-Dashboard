
import { Bar } from "react-chartjs-2";
import type { Transaction } from "../types";

type Props = { transactions: Transaction[] };

export default function MonthlyChart({ transactions }: Props) {
  const months = Array.from({ length: 12 }, (_, i) => new Date(0, i).toLocaleString('default', { month: 'short' }));
  const incomeData = Array(12).fill(0);
  const expenseData = Array(12).fill(0);

  transactions.forEach((tx) => {
    const month = new Date(tx.date).getMonth();
    if (tx.type === "INCOME") incomeData[month] += tx.amount;
    else expenseData[month] += tx.amount;
  });

  const data = {
    labels: months,
    datasets: [
      { label: "Income", data: incomeData, backgroundColor: "#34d399" },
      { label: "Expenses", data: expenseData, backgroundColor: "#f87171" },
    ],
  };

  return <Bar data={data} />;
}
