import { fetchExpenses } from "../utils/api";
import { Expense } from "../types/expense";

export default async function ExpensesPage() {
  const expenses: Expense[] = await fetchExpenses();

  return (
    <div>
      <h1>Expenses</h1>

      <a href="/expenses/add">➕ Add Expense</a>

      <div style={{ marginTop: "20px" }}>
        {expenses.length === 0 && <p>No expenses found.</p>}

        {expenses.map((exp) => (
          <div key={exp.id} style={{ marginBottom: "10px" }}>
            <strong>{exp.title}</strong> - ₹{exp.amount}
            <br />
            <small>{exp.category} | {exp.date}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
