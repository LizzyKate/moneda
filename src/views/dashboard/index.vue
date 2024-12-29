<script setup lang="ts">
import { computed, onMounted, type Component } from 'vue'
import SupplierCard from './components/SupplierCards.vue'
import TransactionCards from './components/TransactionCards.vue'
import AwardingCompanies from './components/AwardingCompanies.vue'
import { CirclePlus, Document, Money, Watch } from '@element-plus/icons-vue'
import { useSummaryStore } from '../../stores/index'
import moment from 'moment'

const summaryStore = useSummaryStore()

const dashboardData = computed(() => summaryStore.dashboardData)
const isLoading = computed(() => summaryStore.isLoading)

// Required keys for filtering the dashboard data
const requiredKeys = [
  'total_transaction',
  'transaction_value',
  'transaction_cost',
  'avg_execution_time',
  'total_disbursement',
  'gross_profitability',
]

const iconMapping: { [key: string]: Component } = {
  total_transaction: Document,
  transaction_value: Money,
  transaction_cost: Money,
  avg_execution_time: Watch,
  total_disbursement: Money,
  gross_profitability: Money,
}

// Transform and filter the dashboard data reactively
const transformedData = computed(() => {
  if (!dashboardData.value || Object.keys(dashboardData.value).length === 0) {
    return requiredKeys.map((key) => ({
      name: key.replace(/_/g, ' '),
      value: '0',
      icon: iconMapping[key],
    }))
  }
  return Object.entries(dashboardData.value)
    .filter(([key]) => requiredKeys.includes(key))
    .map(([key, value]) => {
      // Check if the key is "avg_execution_time" and the value is a string
      if (key === 'avg_execution_time' && typeof value === 'string') {
        const seconds = parseFloat(value)
        // If seconds is greater than or equal to 86400 (1 day), calculate in days
        if (seconds >= 86400) {
          const days = (seconds / 86400).toFixed(0) // Convert seconds to whole days
          value = `${days} days` // Append "days" to the value
        } else {
          value = `${seconds} seconds` // If less than a day, keep in seconds
        }
      }
      return {
        name: key.replace(/_/g, ' '),
        value: String(value),
        icon: iconMapping[key],
      }
    })
})

// Fetch summary data on component mount
onMounted(() => {
  summaryStore.fetchSummary()
})
</script>

<template>
  <el-container class="!block">
    <el-row class="justify-between items-center w-full">
      <el-col :span="12">
        <h1 class="text-black poppins-bold text-[32px]">Dashboard</h1>
      </el-col>
      <el-col :span="12" class="text-end">
        <el-button
          :icon="CirclePlus"
          class="!bg-[#CC5500] !rounded-[4px] !border-0 w-[131px] !h-[26px] !py-4 !px-8 !text-white poppins-medium !text-xs"
          >New transaction</el-button
        >
      </el-col>
    </el-row>
    <el-row class="!mt-8">
      <el-col :span="6">
        <SupplierCard :suppliers="dashboardData?.soc_summary ?? []" :isLoading="isLoading" />
      </el-col>
      <el-col :xl="18" :lg="18" :md="16" class="ml-auto">
        <TransactionCards :transformedData="transformedData" :isLoading="isLoading" />
      </el-col>
    </el-row>
    <el-row class="!mt-8">
      <el-col :span="16">
        <AwardingCompanies
          :companies="dashboardData?.awarding_company_summary ?? []"
          :isLoading="isLoading"
        />
      </el-col>
    </el-row>
  </el-container>
</template>
