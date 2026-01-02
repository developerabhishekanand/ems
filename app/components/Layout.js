"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.css";
import { HeaderWrapper } from "../styles/wrapper";

export default function Layout({ children }) {
  const [userName, setUserName] = useState(() => {
    // Keep initial state deterministic for SSR (avoid reading localStorage here).
    // We'll populate it on mount in a client-only effect to prevent hydration
    // mismatches between server and client renders.
    return "";
  });
  const router = useRouter();

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  useEffect(() => {
    // subscribe for user changes (no synchronous setState on mount)
    if (typeof window === "undefined") return;

    const onUserChange = (ev) => {
      const u = ev?.detail?.user;
      if (u) {
        setUserName(u?.name || u?.email || "");
        return;
      }
      const stored = localStorage.getItem("user");
      try {
        const parsed = stored ? JSON.parse(stored) : null;
        setUserName(parsed?.name || parsed?.email || "");
      } catch {
        setUserName(stored || "");
      }
    };

    // Read current stored user on mount (client-only) to populate the UI
    onUserChange();

    window.addEventListener("user-changed", onUserChange);

    return () => window.removeEventListener("user-changed", onUserChange);
  }, []);

  function handleLogout(e) {
    e.preventDefault();
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    setUserName("");
    // notify components
    if (typeof window !== "undefined")
      window.dispatchEvent(new CustomEvent("user-changed"));
    router.push("/login");
  }

  return (
    <div className="app-root">
      <HeaderWrapper>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <Link href="/" className="navbar-brand">
              EMS
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link
                    href="/"
                    className="nav-link"
                    onClick={() =>
                      document
                        .getElementById("navbarNav")
                        ?.classList.remove("show")
                    }
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    href="/user"
                    className="nav-link"
                    onClick={() =>
                      document
                        .getElementById("navbarNav")
                        ?.classList.remove("show")
                    }
                  >
                    Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    href="/report"
                    className="nav-link"
                    onClick={() =>
                      document
                        .getElementById("navbarNav")
                        ?.classList.remove("show")
                    }
                  >
                    Report
                  </Link>
                </li>
                <li className="nav-item">
                  {userName ? (
                    <a
                      href="#"
                      className="nav-link"
                      onClick={(e) => {
                        e.preventDefault();
                        handleLogout(e);
                        document
                          .getElementById("navbarNav")
                          ?.classList.remove("show");
                      }}
                      title="Logout"
                    >
                      {`Hi, ${userName}`}
                    </a>
                  ) : (
                    <Link
                      href="/login"
                      className="nav-link"
                      onClick={() =>
                        document
                          .getElementById("navbarNav")
                          ?.classList.remove("show")
                      }
                    >
                      Login
                    </Link>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </HeaderWrapper>

      <main className="container my-4 app-main">{children}</main>

      <footer className="bg-light text-center py-4 app-footer">
        <div className="container">© {new Date().getFullYear()} EMS</div>
      </footer>
    </div>
  );
}
