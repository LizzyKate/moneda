<script setup lang="ts">
import { onMounted } from 'vue'
import { fetchDashboardData } from '../../utils'
import SupplierCard from './components/SupplierCards.vue'
import TransactionCards from './components/TransactionCards.vue'
import AwardingCompanies from './components/AwardingCompanies.vue'
import { CirclePlus } from '@element-plus/icons-vue'

const getDashboardData = async () => {
  const data = await fetchDashboardData()
  console.log(data)
}

onMounted(() => {
  getDashboardData()
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
        <SupplierCard />
      </el-col>
      <el-col :span="18">
        <TransactionCards />
      </el-col>
    </el-row>
    <el-row class="!mt-8">
      <el-col :span="16">
        <AwardingCompanies />
      </el-col>
    </el-row>
  </el-container>
</template>
