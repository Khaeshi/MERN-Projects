const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function login(email: string, password: string) {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Important: include cookies
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.message || 'Login failed');
  }

  return data;
}

export async function register(name: string, email: string, password: string, phone?: string) {
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ name, email, password, phone }),
  });

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.message || 'Registration failed');
  }

  return data;
}

export async function logout() {
  const response = await fetch(`${API_URL}/api/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  });

  const data = await response.json();
  return data;
}

export async function checkAuth() {
  const response = await fetch(`${API_URL}/api/auth/me`, {
    credentials: 'include',
  });

  const data = await response.json();
  return data;
}