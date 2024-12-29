const API_URL = import.meta.env.VITE_API_URL

async function fetchDashboardData() {
  const response = await fetch(`${API_URL}summary`)
  return await response.json()
}

export { fetchDashboardData }
