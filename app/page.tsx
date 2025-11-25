'use client';
import { useEffect, useState } from "react";
import { Expense } from "./types/expense";
import { fetchExpenses } from "./utils/api";

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    fetchExpenses().then(data => setExpenses(data));
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div style={{ padding: "20px" }}>
          <p>
            <a href="/expenses">View Expenses</a> | <a href="/expenses/add">Add Expense</a>
          </p>
        </div>
      </main>
    </div>
  );
}
