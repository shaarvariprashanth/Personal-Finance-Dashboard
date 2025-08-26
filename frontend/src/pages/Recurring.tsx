// import { useEffect, useState } from "react";
// import { getRecurring, createRecurring } from "../services/api";

// type RecurringExpense = {
//   id: number;
//   name: string;
//   amount: number;
//   interval: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";
// };

// export default function Recurring() {
//   const [recurrings, setRecurrings] = useState<RecurringExpense[]>([]);
//   const [name, setName] = useState("");
//   const [amount, setAmount] = useState<number>(0);
//   const [interval, setInterval] = useState<RecurringExpense["interval"]>("MONTHLY");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     loadRecurring();
//   }, []);

//   const loadRecurring = async () => {
//     try {
//       setError(null);
//       setLoading(true);
//       const data = await getRecurring();
//       setRecurrings(data);
//     } catch (e: unknown) {
//       if (e instanceof Error) setError(e.message);
//       else setError("Failed to load recurring expenses");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAdd = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       setError(null);
//       const newRecurring = await createRecurring({ name, amount, interval });
//       setRecurrings((prev) => [...prev, newRecurring]);
//       setName("");
//       setAmount(0);
//       setInterval("MONTHLY");
//     } catch (e: unknown) {
//       if (e instanceof Error) setError(e.message);
//       else setError("Failed to create recurring expense");
//     }
//   };

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-4">Recurring Expenses</h2>

//       {error && <div className="bg-red-100 text-red-600 p-2 mb-2">{error}</div>}
//       {loading && <div>Loading...</div>}

//       <form onSubmit={handleAdd} className="space-x-2 mb-4">
//         <input
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           placeholder="Name"
//           className="border px-2 py-1 rounded"
//           required
//         />
//         <input
//           type="number"
//           value={amount}
//           onChange={(e) => setAmount(Number(e.target.value))}
//           placeholder="Amount"
//           className="border px-2 py-1 rounded"
//           required
//         />
//         <select
//           value={interval}
//           onChange={(e) => setInterval(e.target.value as RecurringExpense["interval"])}
//           className="border px-2 py-1 rounded"
//         >
//           <option value="DAILY">Daily</option>
//           <option value="WEEKLY">Weekly</option>
//           <option value="MONTHLY">Monthly</option>
//           <option value="YEARLY">Yearly</option>
//         </select>
//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
//         >
//           Add
//         </button>
//       </form>

//       <ul className="space-y-2">
//         {recurrings.map((r) => (
//           <li
//             key={r.id}
//             className="border p-2 rounded flex justify-between items-center"
//           >
//             <span className="font-medium">{r.name}</span>
//             <span>
//               ₹{r.amount} ({r.interval})
//             </span>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { getRecurring, createRecurring } from "../services/api";

type RecurringExpense = {
  id: number;
  name: string;
  amount: number;
  interval: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";
};

type RecurringProps = {
  darkMode: boolean; // receive from parent
};

export default function Recurring({ darkMode }: RecurringProps) {
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

  const colors = {
    background: darkMode ? "#1a202c" : "#ffffff",
    card: darkMode ? "#2d3748" : "#f9fafb",
    text: darkMode ? "#e2e8f0" : "#1f2937",
    textSecondary: darkMode ? "#cbd5e1" : "#4b5563",
    border: darkMode ? "#4a5568" : "#e5e7eb",
    errorBg: darkMode ? "#7f1d1d" : "#fee2e2",
    errorText: darkMode ? "#fca5a5" : "#b91c1c",
    buttonBg: "#3b82f6",
    buttonHover: "#2563eb",
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
          marginBottom: "1rem",
          transition: "color 0.3s ease",
        }}
      >
        Recurring Expenses
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
        <div style={{ color: colors.textSecondary, transition: "color 0.3s ease" }}>
          Loading...
        </div>
      )}

      <form
        onSubmit={handleAdd}
        style={{
          display: "flex",
          gap: "0.5rem",
          marginBottom: "1.5rem",
          transition: "background 0.3s ease, color 0.3s ease, border 0.3s ease",
        }}
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
          style={{
            flex: 1,
            padding: "0.5rem",
            borderRadius: "0.5rem",
            border: `1px solid ${colors.border}`,
            background: colors.card,
            color: colors.text,
            transition: "background 0.3s ease, color 0.3s ease, border 0.3s ease",
          }}
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder="Amount"
          required
          style={{
            width: "6rem",
            padding: "0.5rem",
            borderRadius: "0.5rem",
            border: `1px solid ${colors.border}`,
            background: colors.card,
            color: colors.text,
            transition: "background 0.3s ease, color 0.3s ease, border 0.3s ease",
          }}
        />
        <select
          value={interval}
          onChange={(e) => setInterval(e.target.value as RecurringExpense["interval"])}
          style={{
            border: `1px solid ${colors.border}`,
            borderRadius: "0.5rem",
            padding: "0.5rem",
            background: colors.card,
            color: colors.text,
            transition: "background 0.3s ease, color 0.3s ease, border 0.3s ease",
          }}
        >
          <option value="DAILY">Daily</option>
          <option value="WEEKLY">Weekly</option>
          <option value="MONTHLY">Monthly</option>
          <option value="YEARLY">Yearly</option>
        </select>
        <button
          type="submit"
          style={{
            background: colors.buttonBg,
            color: "#fff",
            padding: "0.5rem 1rem",
            borderRadius: "0.5rem",
            fontWeight: 600,
            transition: "background 0.3s ease",
          }}
          onMouseEnter={(e) => ((e.target as HTMLButtonElement).style.background = colors.buttonHover)}
          onMouseLeave={(e) => ((e.target as HTMLButtonElement).style.background = colors.buttonBg)}
        >
          Add
        </button>
      </form>

      <ul style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {recurrings.map((r) => (
          <li
            key={r.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0.75rem",
              borderRadius: "0.5rem",
              border: `1px solid ${colors.border}`,
              background: colors.card,
              color: colors.text,
              transition: "background 0.3s ease, border 0.3s ease, color 0.3s ease",
            }}
          >
            <span style={{ fontWeight: 600 }}>{r.name}</span>
            <span style={{ color: colors.textSecondary }}>
              ₹{r.amount} ({r.interval})
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
