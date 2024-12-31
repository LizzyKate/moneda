import { type TransactionDetails } from '@/types/data'

const API_URL = import.meta.env.VITE_API_URL

async function fetchDashboardData() {
  const response = await fetch(`${API_URL}summary`)
  return await response.json()
}

async function fetchAwardingCompanies() {
  const response = await fetch(`${API_URL}awarding-company`)
  return await response.json()
}

async function submitTransactionData(data: TransactionDetails) {
  try {
    const formData = new FormData()

    for (const key in data) {
      const value = data[key as keyof TransactionDetails]

      if (value instanceof File) {
        console.log('Appending file:', value)
        formData.append(key, value)
      } else if (typeof value === 'object') {
        console.log('Appending object:', value)
        formData.append(key, JSON.stringify(value))
      } else {
        console.log('Appending file:', value)
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
