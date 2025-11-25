"use client";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <Link href="/" className="navbar-brand">EMS</Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="#navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link href="/" className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                  <Link href="/user" className="nav-link">Users</Link>
                </li>
                <li className="nav-item">
                  <Link href="/report" className="nav-link">Report</Link>
                </li>
                <li className="nav-item">
                  <Link href="/total-expense" className="nav-link">Total Expense</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <main className="container my-4">{children}</main>

      <footer className="bg-light text-center py-4 mt-auto">
        <div className="container">© {new Date().getFullYear()} EMS</div>
      </footer>
    </>
  );
}
