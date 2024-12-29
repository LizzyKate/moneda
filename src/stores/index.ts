import { defineStore } from 'pinia'
import { ElNotification } from 'element-plus'
import { fetchDashboardData } from '@/utils'
import { type DashboardData } from '@/types/data'

export const useSummaryStore = defineStore('summary', {
  state: () => ({
    dashboardData: null as DashboardData | null,
    isLoading: true,
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
  },
})
