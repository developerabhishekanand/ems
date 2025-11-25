"use client";

import { useState } from "react";
import { addExpense } from "../../utils/api";

export default function AddExpensePage() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState<number>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await addExpense({
      title,
      amount,
      category: "General",
      date: new Date().toISOString(),
    });

    alert("Expense Added!");
    window.location.href = "/expenses"; // navigate to list
  };

  return (
    <div>
      <h1>Add Expense</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ display: "block", marginBottom: "10px" }}
        />

      <input
          placeholder="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          style={{ display: "block", marginBottom: "10px" }}
        />

        <button type="submit">Add</button>
      </form>
    </div>
  );
}
