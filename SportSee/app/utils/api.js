const API_URL = "http://localhost:8000/api";

// Helper pour les appels
async function fetchAPI(endpoint, options = {}) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  if (!res.ok) throw new Error(`Erreur API: ${res.statusText}`);
  return res.json();
}

// Tous vos appels API
export const api = {
  login: (username, password) =>
    fetchAPI("/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    }),

  getUserInfo: () => fetchAPI("/user-info"),

  getUserActivity: (startWeek, endWeek) =>
    fetchAPI(`/user-activity?startWeek=${startWeek}&endWeek=${endWeek}`),
};
