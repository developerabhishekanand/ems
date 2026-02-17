"use client";

import { useState, useEffect } from "react";
import { addExpense } from "../../utils/api.js";
import Link from "next/link";


export const AddExpense= () => {
  const [ form, setForm] = useState(
    { 
      title: '',
      amount: '',
      date: '', // YYYY-MM-DD (populate on client mount to avoid SSR/client mismatch)
      category: '' 

    });

  useEffect(() => {
    // Defer setState to avoid a synchronous state update within the effect
    const id = setTimeout(() => {
      setForm((prev) => ({ ...prev, date: new Date().toISOString().split('T')[0] }));
    }, 0);

    return () => clearTimeout(id);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  }

const handleSubmit = async (e) => {
  e.preventDefault(); // 🔑 prevents page reload
  const token = localStorage.getItem("token");
  alert(token ? "Submitting expense..." : "Please login to submit an expense");

  if (!token) return alert("Please login!");
  // Ensure amount is a number
  const expenseData = {
    ...form,
    amount: parseFloat(form.amount), // convert string to number
    category: form.category || "General",
  };

  const res = await addExpense(expenseData);

  if (res.ok) {
    alert("Expense added!");
    setForm({
      title: "",
      amount: "",
      category: "",
      date: new Date().toISOString().split("T")[0],
    });
  } else {
    alert(res.message || "Failed to add expense");
  }
};

  return (
    <div style={{ maxWidth: 420, margin: "40px auto", padding: 20 }}>
      <h1>Add Expense</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          placeholder="Title"
          name="title"
          value={form.title}
          onChange={handleChange}
          style={{ display: "block", marginBottom: "10px" }}
        />

        <label htmlFor="amount">Amount</label>
        <input
          placeholder="Amount"
          type="number"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          style={{ display: "block", marginBottom: "10px" }}
        />
        {/* /* Date auto readonly */ }
        <label htmlFor="date">Date  (Auto) </label>
        <input
          type="date"
          name="date"
          value={form.date}
          style={{ display: "block", marginBottom: "10px" }}
          readOnly
        />
        {/* Category */ }
        <label htmlFor="category">Category</label>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          style={{ display: "block", marginBottom: "10px" }}
        >
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="General">General</option>
          <option value="Utilities">Utilities</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Travel">Travel</option>
          <option value="Other">Other</option>
        </select>

        <button type="submit" style={{ marginTop: 12}}>Add Expense</button>
      </form>
      <Link  style={{ marginTop: 12, padding: 20}} href="/">← Back</Link>
    </div>
  );
}

export default AddExpense;
