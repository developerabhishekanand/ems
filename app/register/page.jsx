"use client";

import React,{ useState } from 'react'
import { useRouter } from 'next/navigation';
import { register } from '@/app/utils/api';


const Register = () => {
    const router = useRouter();
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setForm(s => ({ ...s,[e.target.name]: e.target.value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {  
            const res = await register(form);
            console.log('Registration response:', res);
            if (res.status === 201) {
                alert(res.message || 'User registered successfully');
                router.push('/login');
            } else {
                alert(res.message || 'Registration failed');
                console.log('Registration failed:', res.message);
            }
        } catch (error) {
            console.log('An error occurred:', error);
        }
    }   
  return (
    <div style={{ maxWidth: 420, margin: "40px auto", padding: 20 }}>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 10}}>
                <label>Name:</label><br/>
                <input 
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    style={{ width: "100%", padding: 8, boxSizing: "border-box"}}
                />
            </div>
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
            <button type="submit" style={{ padding: "10px 20px"}}>Register</button>
        </form>
    </div>
  )
}

export default Register