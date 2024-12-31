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

      // Handling File objects
      if (value instanceof File) {
        formData.append(key, value)
      }
      // Handling the supplier_oem_subcontractors array, processing each item
      else if (Array.isArray(value) && key === 'supplier_oem_subcontractors') {
        const subContractorData = value.map((subContractor, index) => {
          const subContractorFormData: { [key: string]: any } = {}

          // Check if pro_forma_invoice exists and is a File
          if (subContractor.pro_forma_invoice instanceof File) {
            subContractorFormData.pro_forma_invoice = subContractor.pro_forma_invoice
          }

          // Add other properties of subContractor
          for (const subKey in subContractor) {
            const subValue = subContractor[subKey as keyof typeof subContractor]
            if (subValue instanceof File) {
              subContractorFormData[subKey] = subValue
            } else if (typeof subValue === 'object') {
              subContractorFormData[subKey] = JSON.stringify(subValue)
            } else {
              subContractorFormData[subKey] = subValue?.toString() ?? ''
            }
          }

          return subContractorFormData
        })

        formData.append(key, JSON.stringify(subContractorData)) // Append the formatted array as JSON string
      }
      // Handling other nested objects and primitive values
      else if (typeof value === 'object') {
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
