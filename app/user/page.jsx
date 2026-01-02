"use client";
import { useEffect, useState } from 'react'
import { fetchUsers } from '../utils/api'
import Link from 'next/link'

export default function Users() {
  const [users, setUsers] = useState(null) // null = loading
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const res = await fetchUsers()
        if (!cancelled) setUsers(Array.isArray(res) ? res : [])
      } catch (err) {
        console.error('Failed to fetch users', err)
        if (!cancelled) setError('Failed to load users')
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  if (error) {
    return (
      <div className="container py-5">
        <h1 className="mb-4">Registered Users</h1>
        <div className="alert alert-danger">{error}</div>
      </div>
    )
  }

  if (users === null) {
    return (
      <div className="container py-5">
        <h1 className="mb-4">Registered Users</h1>
        <p>Loading users…</p>
      </div>
    )
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4">Registered Users</h1>
      <p className="mb-3">Total users: <strong>{users.length}</strong></p>

      {users.length ? (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr key={u.id ?? u.email ?? i}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No users found.</p>
      )}

      <div className="mt-3">
        <Link href="/">← Back</Link>
      </div>
    </div>
  )
}
