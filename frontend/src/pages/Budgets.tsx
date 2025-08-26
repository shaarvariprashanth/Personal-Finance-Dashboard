// import { useEffect, useState } from "react";
// import { getBudgets, createBudget } from "../services/api";

// type Budget = {
//   id: number;
//   category: string;
//   limit: number;
//   spent: number;
// };

// export default function Budgets() {
//   const [budgets, setBudgets] = useState<Budget[]>([]);
//   const [category, setCategory] = useState("");
//   const [limit, setLimit] = useState<number>(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     loadBudgets();
//   }, []);

//   const loadBudgets = async () => {
//     try {
//       setError(null);
//       setLoading(true);
//       const data = await getBudgets();
//       setBudgets(data);
//     } catch (e: unknown) {
//       if (e instanceof Error) setError(e.message);
//       else setError("Failed to load budgets");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAdd = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       setError(null);
//       const newBudget = await createBudget({ category, limit });
//       setBudgets((prev) => [...prev, newBudget]);
//       setCategory("");
//       setLimit(0);
//     } catch (e: unknown) {
//       if (e instanceof Error) setError(e.message);
//       else setError("Failed to create budget");
//     }
//   };

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-4">Budgets</h2>

//       {error && <div className="bg-red-100 text-red-600 p-2 mb-2">{error}</div>}
//       {loading && <div>Loading...</div>}

//       <form onSubmit={handleAdd} className="space-x-2 mb-4">
//         <input
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           placeholder="Category"
//           className="border px-2 py-1 rounded"
//           required
//         />
//         <input
//           type="number"
//           value={limit}
//           onChange={(e) => setLimit(Number(e.target.value))}
//           placeholder="Limit"
//           className="border px-2 py-1 rounded"
//           required
//         />
//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
//         >
//           Add
//         </button>
//       </form>

//       <ul className="space-y-2">
//         {budgets.map((b) => (
//           <li
//             key={b.id}
//             className="border p-2 rounded flex justify-between items-center"
//           >
//             <span className="font-medium">{b.category}</span>
//             <span>
//               {b.spent} / {b.limit}
//             </span>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { getBudgets, createBudget } from "../services/api";

type Budget = {
  id: number;
  category: string;
  limit: number;
  spent: number;
};

type BudgetsProps = {
  darkMode: boolean; // receive from parent
};

export default function Budgets({ darkMode }: BudgetsProps) {
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

  // Keep light mode as before, lighten dark mode colors
  const colors = {
    background: darkMode ? "#1a202c" : "#f9fafb", // slightly lighter dark
    card: darkMode ? "#2d3748" : "#ffffff",
    text: darkMode ? "#e2e8f0" : "#1f2937",
    textSecondary: darkMode ? "#cbd5e1" : "#4b5563",
    border: darkMode ? "#4a5568" : "#e5e7eb",
    errorBg: darkMode ? "#7f1d1d" : "#fee2e2",
    errorText: darkMode ? "#fca5a5" : "#b91c1c",
    progress: "#8b5cf6",
  };

  return (
    <div
      style={{
        background: colors.background,
        minHeight: "100vh",
        padding: "1.5rem",
        transition: "background 0.3s ease",
      }}
    >
      <h2
        style={{
          fontSize: "1.875rem",
          fontWeight: 700,
          color: colors.text,
          marginBottom: "1.5rem",
          transition: "color 0.3s ease",
        }}
      >
        Budgets
      </h2>

      {error && (
        <div
          style={{
            background: colors.errorBg,
            color: colors.errorText,
            padding: "0.75rem",
            borderRadius: "0.5rem",
            marginBottom: "1rem",
            transition: "background 0.3s ease, color 0.3s ease",
          }}
        >
          {error}
        </div>
      )}

      {loading && (
        <div
          style={{
            color: colors.textSecondary,
            transition: "color 0.3s ease",
          }}
        >
          Loading...
        </div>
      )}

      <form
        onSubmit={handleAdd}
        style={{
          background: colors.card,
          padding: "1rem",
          borderRadius: "0.5rem",
          display: "flex",
          gap: "0.75rem",
          marginBottom: "1.5rem",
          transition: "background 0.3s ease, border 0.3s ease, color 0.3s ease",
        }}
      >
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          required
          style={{
            flex: 1,
            padding: "0.5rem",
            borderRadius: "0.5rem",
            border: `1px solid ${colors.border}`,
            background: colors.card,
            color: colors.text,
            transition: "background 0.3s ease, border 0.3s ease, color 0.3s ease",
          }}
        />
        <input
          type="number"
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          placeholder="Limit"
          required
          style={{
            width: "6rem",
            padding: "0.5rem",
            borderRadius: "0.5rem",
            border: `1px solid ${colors.border}`,
            background: colors.card,
            color: colors.text,
            transition: "background 0.3s ease, border 0.3s ease, color 0.3s ease",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "0.5rem 1rem",
            background: colors.progress,
            color: "#fff",
            borderRadius: "0.5rem",
            fontWeight: 600,
            transition: "background 0.3s ease, color 0.3s ease",
          }}
        >
          Add
        </button>
      </form>

      <ul style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {budgets.map((b) => {
          const progress = Math.min((b.spent / b.limit) * 100, 100);
          return (
            <li
              key={b.id}
              style={{
                background: colors.card,
                border: `1px solid ${colors.border}`,
                borderRadius: "0.5rem",
                padding: "1rem",
                transition: "background 0.3s ease, border 0.3s ease, color 0.3s ease",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "0.5rem",
                  transition: "color 0.3s ease",
                }}
              >
                <span style={{ fontWeight: 600, color: colors.text }}>{b.category}</span>
                <span style={{ color: colors.textSecondary }}>{b.spent} / {b.limit}</span>
              </div>
              <div
                style={{
                  width: "100%",
                  height: "0.5rem",
                  background: colors.border,
                  borderRadius: "9999px",
                  overflow: "hidden",
                  transition: "background 0.3s ease",
                }}
              >
                <div
                  style={{
                    width: `${progress}%`,
                    height: "100%",
                    background: colors.progress,
                    transition: "width 0.3s ease, background 0.3s ease",
                  }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

