// Removed stray Markdown fences and fixed formatting
export const API_URL = "http://localhost:5000";

export async function fetchExpenses() {
  const res = await fetch(`${API_URL}/expenses`, {
    cache: "no-store",
  });
  return res.json();
}

export async function addExpense(data) {
  const res = await fetch(`${API_URL}/expenses`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
}
