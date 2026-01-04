import React from 'react'
import { fetchExpenses } from "../utils/api";

export default async function ReportPage() {
  // fetch all expenses (server-side)
  const expenses = await fetchExpenses();
  
  // group expenses by user_id
  const groups = Object.values(
    expenses.reduce((acc, e) => {
      const uid = e.user_id ?? 'unknown';
      if (!acc[uid]) {
        acc[uid] = { user_id: uid, name: e.name || 'Unknown', email: e.email || '', expenses: [], total: 0 };
      }
      const amt = parseFloat(e.amount) || 0;
      acc[uid].expenses.push(e);
      acc[uid].total += amt;
      return acc;
    }, {})
  );

  return (
    <div style={{ maxWidth: 900, margin: '24px auto', padding: 20 }}>
      <h1>Expenses Report (grouped by user)</h1>

      {groups.length === 0 && <p>No expenses available.</p>}

      {groups.map((g) => (
        <section key={g.user_id} style={{ marginBottom: 30, borderBottom: '1px solid #eee', paddingBottom: 12 }}>
          <h2 style={{ margin: '6px 0' }}>{g.name} <small style={{ color: '#666' }}>({g.email})</small></h2>
          <div style={{ marginBottom: 8, fontWeight: '600' }}>Total: ₹{g.total.toFixed(2)}</div>

          <div>
            {g.expenses.map((exp) => (
              <div key={exp.id} style={{ padding: '6px 0' }}>
                <strong>{exp.title}</strong> — ₹{exp.amount} <br />
                <small style={{ color: '#666' }}>{exp.category} | {new Date(exp.date).toLocaleString()}</small>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}