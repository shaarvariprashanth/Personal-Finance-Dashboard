import { useEffect, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import {  Pie } from "react-chartjs-2";
import type { Transaction } from "../types";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

type Props = {
  transactions: Transaction[];
};

export default function ExpenseChart({ transactions }: Props) {
  const [categoryData, setCategoryData] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const catTotals: { [key: string]: number } = {};
    transactions.forEach((tx) => {
      if (tx.type === "EXPENSE") {
        catTotals[tx.category] = (catTotals[tx.category] || 0) + tx.amount;
      }
    });
    setCategoryData(catTotals);
  }, [transactions]);

  const labels = Object.keys(categoryData);
  const data = {
    labels,
    datasets: [
      {
        label: "Expenses by Category",
        data: Object.values(categoryData),
        backgroundColor: [
          "#3b82f6",
          "#f87171",
          "#34d399",
          "#fbbf24",
          "#a78bfa",
          "#f472b6",
        ],
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h3 className="text-lg font-bold mb-2">Expenses by Category</h3>
      {transactions.length === 0 ? (
        <p className="text-gray-500">No transactions to display</p>
      ) : (
        <Pie data={data} />
      )}
    </div>
  );
}
