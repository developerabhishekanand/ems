// Removed stray Markdown fences and fixed formatting
export const API_URL = "https://ems-backend-liart.vercel.app";

export async function apiFetch(path, options = {}) {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };
  const res = await fetch(`${API_URL}${path}`, { ...options, headers });
  if (res.status === 401) {
    // token invalid/expired - clear and redirect on client
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    throw new Error("Unauthorized");
  }
  const data = await res.json();
  return data;
}

export async function fetchExpenses() {
  const response = await fetch(`${API_URL}/expenses/all`, {
    cache: "no-store",
  });
  // return the array body directly to avoid spreading array into object
  return response.json();
}

export async function fetchMyExpenses(token) {
  const response = await fetch(`${API_URL}/expenses/my`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const body = await response.json();
  // if body is an array, return it directly for consistency
  if (Array.isArray(body)) return body;
  return { status: response.status, ok: response.ok, ...body };
}

export async function addExpense(expense) {
  const token = localStorage.getItem("token");
  if (!token) return { ok: false, message: "No token found" };

  try {
    const res = await fetch(`${API_URL}/expenses/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...expense,
      }),
    });

    const data = await res.json();
    return {
      ok: res.ok,
      status: res.status,
      message: data?.message,
      data,
    };
  } catch (error) {
    console.log("addExpense error:", error);
    return { ok: false, message: "Network or server error" };
  }
}

export async function login(data) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const body = await response.json();
  return { status: response.status, ok: response.ok, ...body };
}

export async function register(data) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const body = await response.json();
  return { status: response.status, ok: response.ok, ...body };
}

export async function fetchUsers() {
  const response = await fetch(`${API_URL}/auth/users`, {
    cache: "no-store",
  });
  return response.json();
}

export async function deleteExpense(id) {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const response = await fetch(`${API_URL}/expenses/delete/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  const body = await response.json();
  return { status: response.status, ok: response.ok, ...body };
}
