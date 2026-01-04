"use client";
import React, { useEffect, useState } from "react";
import { fetchMyExpenses, deleteExpense } from "../../utils/api.js";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function MyExpensesPage() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      setError("Please login to view your expenses.");
      setLoading(false);
      return;
    }

    const load = async () => {
      setLoading(true);
      try {
        const res = await fetchMyExpenses(token);
        if (res && res.status === 401) {
          // token invalid/expired
          localStorage.removeItem("token");
          setError("Session expired, please login again.");
          setLoading(false);
          router.push('/login');
          return;
        }

        if (Array.isArray(res)) {
          setExpenses(res);
        } else if (res && res.ok && Array.isArray(res.body)) {
          setExpenses(res.body);
        } else if (res && Array.isArray(res)) {
          setExpenses(res);
        } else if (res && res.length) {
          setExpenses(res);
        } else if (res && res.message && !res.ok) {
          setError(res.message || "Failed to load expenses");
        } else if (res && res.status && res.status >= 200 && res.status < 300 && Array.isArray(res)) {
          setExpenses(res);
        } else if (res && res.status && res.status >= 200 && res.status < 300 && Array.isArray(res.data)) {
          setExpenses(res.data);
        } else {
          // Fallback: try to read as array
          if (Array.isArray(res)) setExpenses(res);
          else if (Array.isArray(res?.data)) setExpenses(res.data);
          else setError(res?.message || "No expenses found");
        }
      } catch (err) {
        alert.error("Error loading my expenses:", err);
        setError("Failed to fetch expenses");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [router]);

  const handleRemove = async (id) => {
    if (!confirm("Are you sure you want to delete this expense?")) return;

    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      setError("Please login to remove expenses.");
      return;
    }

    // Optimistic update (keep a shallow copy for rollback)
    const previous = [...expenses];
    setExpenses((prev) => prev.filter((item) => item.id !== id));

    try {
      const res = await deleteExpense(id);

      // deleteExpense returns a plain object { status, ok, ...body }
      if (res && res.status === 401) {
        localStorage.removeItem("token");
        setError("Session expired, please login again.");
        router.push("/login");
        return;
      }

      if (!res || res.ok === false) {
        // rollback on failure
        setExpenses(previous);
        setError(res?.message || res?.error || "Failed to delete expense");
      }
    } catch (err) {
      Alert.error("Failed to delete expense:", err);
      // rollback on network error
      setExpenses(previous);
      setError("Failed to delete expense");
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: "40px auto", padding: 20 }}>
      <h2>My Expenses</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && expenses.length === 0 && <p>No expenses found.</p>}

      {!loading && !error && expenses.map((e) => (
        <div key={e.id} style={{ borderBottom: "1px solid #eee", padding: 8, marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div><strong>{e.title}</strong> - ₹{e.amount}</div>
            <strong> <button onClick={() => {handleRemove(e.id)}}>Remove</button> </strong>
          </div>
          <br />
          <small>{e.date} | {e.category}</small>
        </div>
      ))}
      <Link  style={{ marginTop: 12, padding: 20}} href="/">← Back</Link>
    </div>
  );
}
