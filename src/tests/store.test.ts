import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useSummaryStore } from '@/stores'
import { fetchDashboardData, fetchAwardingCompanies, submitTransactionData } from '@/utils'
import { ElNotification } from 'element-plus'

vi.mock('@/utils', () => ({
  fetchDashboardData: vi.fn(),
  fetchAwardingCompanies: vi.fn(),
  submitTransactionData: vi.fn(),
}))

vi.mock('element-plus', () => ({
  ElNotification: {
    success: vi.fn(),
    error: vi.fn(),
  },
}))

describe('useSummaryStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  describe('state', () => {
    it('should have default state', () => {
      const store = useSummaryStore()

      expect(store.dashboardData).toBeNull()
      expect(store.isLoading).toBe(true)
      expect(store.isSubmitting).toBe(false)
      expect(store.isMobileNavOpen).toBe(false)
      expect(store.transactionDetails).toEqual({
        transaction_type: '',
        awarding_company_id: '',
        previous_transaction: 0,
        estimated_value: 0,
        estimated_value_currency: '',
        awarding_payment_terms: '',
        incoterms: '',
        duration: 0,
        payment_after_invoice: 0,
        purchase_order: null,
        previous_invoice: null,
        bank_statement: null,
        supplier_oem_subcontractors: [
          {
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
            pro_forma_invoice: null,
          },
        ],
      })
      expect(store.awardingCompanies).toEqual([])
    })
  })

  describe('actions', () => {
    describe('toggleSideNav', () => {
      it('should toggle mobile nav state', () => {
        const store = useSummaryStore()
        expect(store.isMobileNavOpen).toBe(false)

        store.toggleSideNav()
        expect(store.isMobileNavOpen).toBe(true)

        store.toggleSideNav()
        expect(store.isMobileNavOpen).toBe(false)
      })
    })

    describe('fetchSummary', () => {
      it('should fetch dashboard data successfully', async () => {
        const store = useSummaryStore()
        const mockData = {
          soc_summary: [],
          awarding_company_summary: [],
          total_transaction: '0',
          transaction_value: '0',
          transaction_cost: '0',
          avg_completed_date: '',
          total_disbursement: '0',
          gross_profitability: '0',
          transaction_type_summary: [],
        }
        vi.mocked(fetchDashboardData).mockResolvedValue({ data: mockData })

        await store.fetchSummary()

        expect(store.dashboardData).toEqual(mockData)
        expect(store.isLoading).toBe(false)
        expect(fetchDashboardData).toHaveBeenCalledTimes(1)
      })

      it('should handle fetch dashboard data error', async () => {
        const store = useSummaryStore()
        const error = new Error('API Error')
        vi.mocked(fetchDashboardData).mockRejectedValue(error)

        await store.fetchSummary()

        expect(store.dashboardData).toBeNull()
        expect(store.isLoading).toBe(false)
        expect(vi.mocked(ElNotification.error)).toHaveBeenCalledWith({
          title: 'Error',
          message: 'API Error',
        })
      })
    })

    describe('fetchAwardingCompanies', () => {
      it('should fetch awarding companies successfully', async () => {
        const store = useSummaryStore()
        const mockCompanies = [{ id: '1', name: 'Company 1' }]
        vi.mocked(fetchAwardingCompanies).mockResolvedValue({ data: mockCompanies })

        await store.fetchAwardingCompanies()

        expect(store.awardingCompanies).toEqual(mockCompanies)
        expect(store.isLoading).toBe(false)
        expect(fetchAwardingCompanies).toHaveBeenCalledTimes(1)
      })

      it('should handle fetch awarding companies error', async () => {
        const store = useSummaryStore()
        const error = new Error('API Error')
        vi.mocked(fetchAwardingCompanies).mockRejectedValue(error)

        await store.fetchAwardingCompanies()

        expect(store.awardingCompanies).toEqual([])
        expect(store.isLoading).toBe(false)
        expect(vi.mocked(ElNotification.error)).toHaveBeenCalledWith({
          title: 'Error',
          message: 'API Error',
        })
      })
    })

    describe('updateTransactionDetails', () => {
      it('should update transaction details correctly', () => {
        const store = useSummaryStore()
        const newData = {
          transaction_type: 'NEW_TYPE',
          estimated_value: 1000,
        }

        store.updateTransactionDetails(newData)

        expect(store.transactionDetails.transaction_type).toBe('NEW_TYPE')
        expect(store.transactionDetails.estimated_value).toBe(1000)
        expect(store.transactionDetails.awarding_company_id).toBe('')
        expect(store.transactionDetails.previous_transaction).toBe(0)
        expect(store.transactionDetails.estimated_value_currency).toBe('')
        expect(store.transactionDetails.awarding_payment_terms).toBe('')
        expect(store.transactionDetails.incoterms).toBe('')
        expect(store.transactionDetails.duration).toBe(0)
        expect(store.transactionDetails.payment_after_invoice).toBe(0)
        expect(store.transactionDetails.purchase_order).toBeNull()
        expect(store.transactionDetails.previous_invoice).toBeNull()
        expect(store.transactionDetails.bank_statement).toBeNull()
        expect(store.transactionDetails.supplier_oem_subcontractors).toHaveLength(1)
      })
    })

    describe('submitTransactionData', () => {
      it('should submit transaction data successfully', async () => {
        const store = useSummaryStore()
        vi.mocked(submitTransactionData).mockResolvedValue(undefined)

        await store.submitTransactionData()

        expect(store.isSubmitting).toBe(false)
        expect(submitTransactionData).toHaveBeenCalledTimes(1)
        expect(vi.mocked(ElNotification.success)).toHaveBeenCalledWith({
          title: 'Success',
          message: 'Transaction data submitted successfully',
        })
      })

      it('should handle submit transaction data error', async () => {
        const store = useSummaryStore()
        const error = new Error('Submit Error')
        vi.mocked(submitTransactionData).mockRejectedValue(error)

        await store.submitTransactionData()

        expect(store.isSubmitting).toBe(false)
        expect(vi.mocked(ElNotification.error)).toHaveBeenCalledWith({
          title: 'Error',
          message: 'Submit Error',
        })
      })

      describe('submitTransactionData', () => {
        it('should transform data correctly before submission', async () => {
          const store = useSummaryStore()
          vi.mocked(submitTransactionData).mockResolvedValue(undefined)

          const testFile = new File([], 'test.pdf')

          store.transactionDetails.supplier_oem_subcontractors[0] = {
            soc_name: 'Supplier1',
            country: 'US',
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
            pro_forma_invoice: null,
          }

          Object.assign(store.transactionDetails.supplier_oem_subcontractors[0], {
            pro_forma_invoice: testFile,
          })

          await store.submitTransactionData()

          expect(submitTransactionData).toHaveBeenCalledWith(
            expect.objectContaining({
              supplier_oem_subcontractors: [
                expect.objectContaining({
                  soc_name: 'Supplier1',
                  country: 'US',
                }),
              ],
              Supplier1: testFile,
            }),
          )
        })
      })
    })
  })
})
