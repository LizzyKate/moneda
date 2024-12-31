import { defineStore } from 'pinia'
import { ElNotification } from 'element-plus'
import { fetchDashboardData } from '@/utils'
import type { DashboardData, TransactionDetails } from '@/types/data'

interface TransactionDetailsState {
  transactionDetails: TransactionDetails
}

export const useSummaryStore = defineStore('summary', {
  state: () => ({
    dashboardData: null as DashboardData | null,
    isLoading: true,
    transactionDetails: {
      transaction_type: '',
      awarding_company_id: '',
      previous_transaction: 0,
      estimated_value: 0,
      estimated_value_currency: '',
      awarding_payment_terms: '',
      incoterms: '',
      duration: '',
      payment_after_invoice: '',
      purchase_order: null,
      previous_invoice: null,
      bank_statement: null,
      soc_name: null,
      supplier_oem_subcontractors: {
        soc_name: '',
        country: '',
        continent: '',
        basis_of_selection: '',
        incoterms: '',
        previous_purchase: 0,
        delivery_time: 0,
        procurement_type: '',
        payment_terms: '',
        item_cost_currency: '',
        item_cost: 0,
        logistics_cost_currency: '',
        logistics_cost: 0,
        other_cost_currency: '',
        other_cost: 0,
        funding_request_currency: '',
        funding_request: 0,
      },
    },
  }),

  actions: {
    async fetchSummary() {
      try {
        const { data } = await fetchDashboardData()
        if (data) {
          this.dashboardData = data
        }
      } catch (error) {
        ElNotification.error({
          title: 'Error',
          message: (error as Error).message,
        })
      } finally {
        this.isLoading = false
      }
    },

    updateTransactionDetails(this: TransactionDetailsState, newData: Partial<TransactionDetails>) {
      this.transactionDetails = { ...this.transactionDetails, ...newData }
    },
  },
})
