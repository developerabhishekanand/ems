"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/app/utils/api';
import Link from 'next/link';

const Login = () => {
  const router = useRouter()
    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setForm(s => ({ ...s,[e.target.name]: e.target.value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
          const data = await login(form);
          if (data && data.token) {
            localStorage.setItem('token', data.token);
            if (data.user) {
              localStorage.setItem('user', JSON.stringify(data.user));
              // notify other components in this tab
              window.dispatchEvent(new CustomEvent('user-changed', { detail: { user: data.user } }));
            }
            router.push('/expenses');
            alert('Login successful');
          } else {
            alert('Login failed');
          }
        } catch (error) {
            alert('Login error');
            console.log('Login error:', error);
        }
    }
  return (
    <div style={{ maxWidth: 400, margin: "40px auto",padding: 20}}>
        <h2>Login</h2>
        
        <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 10}}>
                <label>Email:</label><br/>
                <input 
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    style={{ width: "100%", padding: 8, boxSizing: "border-box"}}
                />
            </div>
            <div style={{ marginBottom: 10}}>
                <label>Password:</label><br/>
                <input 
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    style={{ width: "100%", padding: 8, boxSizing: "border-box"}}
                />
            </div>
            <button type="submit" style={{ padding: "10px 20px"}}>Login</button>
        </form> 
        <Link href="/register">Register</Link>
    </div>
  )
}

export default Login