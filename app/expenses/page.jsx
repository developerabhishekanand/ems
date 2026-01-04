import { fetchExpenses } from "../utils/api";
import Link from "next/link";

export default async function ExpensesPage() {
  const expenses = await fetchExpenses();
  // The API may return an object (e.g., an error message) when unauthorized or on failure.
  const expenseList = Array.isArray(expenses) ? expenses : [];
  const apiError = !Array.isArray(expenses) && expenses ? (expenses.message || JSON.stringify(expenses)) : null;
  // compute total expense (safely parse amounts as numbers)
  const total = expenseList.reduce((sum, e) => {
    const amt = parseFloat(e?.amount);
    return sum + (Number.isFinite(amt) ? amt : 0);
  }, 0);

  return (
    <div>
      <h1>Expenses</h1>

      <a href="/expenses/add">➕ Add Expense</a>

      <div style={{ marginTop: "20px" }}>
        {expenseList.length === 0 && <p>{apiError ? `Error: ${apiError}` : 'No expenses found.'}</p>}

        {expenseList.map((exp) => (
          <div key={exp.id} style={{ marginBottom: "10px" }}>
            <strong>{exp.title}</strong> - ₹{exp.amount}
            <br />
            <small>{exp.category} | {exp.date}</small>
            <hr />
          </div>
        ))}
        {expenseList.length > 0 && (
          <div style={{ marginTop: "20px", fontWeight: "bold" }}>
            Total: ₹{total.toFixed(2)}
          </div>
        )}
        <Link  style={{ marginTop: 12, padding: 20}} href="/">← Back</Link>
      </div>
    </div>
  );
}
