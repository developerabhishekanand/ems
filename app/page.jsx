'use client';

import Link from "next/link";
import {HomeWrapper} from './styles/wrapper';


export default function Home() {


  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      
      <HomeWrapper>
        <main className="home-page flex min-h-screen w-full max-w-3xl items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
          <div style={{ padding: "20px", gap: "20px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", border: "1px solid black", borderRadius: "8px", backgroundColor: "#f9f9f9" }}>
            <Link href="/expenses" className="hover-white" style={{ padding: 20}}>View Expenses</Link>
            <Link href="/expenses/add" className="hover-white" style={{ padding: 20}}>Add Expense</Link>
            <Link href="/expenses/myexpenses" className="hover-white" style={{ padding: 20 }}>My Expenses</Link>
          </div>
      </main>
      </HomeWrapper>
    </div>
  );
}
