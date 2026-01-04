"use client";

import { useEffect, useState } from "react";
import { addExpense,fetchMyExpenses } from "../../utils/api";   

const MyExpenses= () => {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Please login first!");
            return;
        }

        const fetchExpenses = async () => {
            try {
                fetchMyExpenses(token )
                .then((res) => {
                    if (Array.isArray(res) ) {
                        setExpenses(res|| []);
                    }
                    else {
                        console.log("MyExpenses error: format:", res);
                    }                        
                 })
                 .catch(error => {
                    console.log("MyExpenses fetch error:", error);    
                 });
            } 
            catch (error) {
                console.log("Error fetching expenses:", error);
            }
        }
    }, []);

   
  return (
    <div style={{ maxWidth: 800, margin: "40px auto",padding: 20}}>
      <h2>My Expenses</h2>
      {expenses.length === 0 && <p>No expenses found </p>}
      {expenses.map((e) => (
        <div 
          key={e.id}
            style={{ 
                borderBottom: "1px solid #eee",
                borderRadius: 8,
                padding: 8,
                marginBottom: 12,
                }}
            >   
            <strong>{e.title}</strong> - ${e.amount}
            <br />
            <small>{e.date} | {e.category}</small>
        </div>
      ))}
    </div>
  )
}

export default MyExpenses;

