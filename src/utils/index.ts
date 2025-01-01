import type { TransactionDetails, DashboardData } from '@/types/data'

const API_URL = import.meta.env.VITE_API_URL

async function fetchData<T>(url: string): Promise<T> {
  const response = await fetch(url)

  if (!response.ok) {
    const errorMessage = await response.text()
    throw new Error(errorMessage || `Error: ${response.status} ${response.statusText}`)
  }

  return response.json()
}
async function fetchDashboardData(): Promise<{ data: DashboardData }> {
  return fetchData<{ data: DashboardData }>(`${API_URL}summary`)
}

async function fetchAwardingCompanies(): Promise<{ data: { id: string; name: string }[] }> {
  return fetchData<{ data: { id: string; name: string }[] }>(`${API_URL}awarding-company`)
}

async function submitTransactionData(data: TransactionDetails) {
  try {
    const formData = new FormData()

    for (const key in data) {
      const value = data[key as keyof TransactionDetails]
      if (value instanceof File) {
        formData.append(key, value)
      } else if (typeof value === 'object') {
        formData.append(key, JSON.stringify(value))
      } else {
        formData.append(key, value?.toString() ?? '')
      }
    }

    const response = await fetch(`${API_URL}transaction`, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      const errorMessage = await response.text()
      throw new Error(errorMessage || `Error ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw new Error('An unknown error occurred')
  }
}

export { fetchDashboardData, fetchAwardingCompanies, submitTransactionData }
