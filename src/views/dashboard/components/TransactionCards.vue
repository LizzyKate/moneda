<script setup lang="ts">
import { ref, type Component } from 'vue'
import { Document } from '@element-plus/icons-vue'
import MdCard from '../../../components/MdCard.vue'

interface transactions {
  title: string
  value: string
  icon: Component
}

const transactions = ref<transactions[]>([
  { title: 'Total Transactions', value: '100', icon: Document },
  { title: 'Total Sales', value: '$60,000', icon: Document },
  { title: 'Total Purchases', value: '$7,000', icon: Document },
  { title: 'Total Expenses', value: '$10,000', icon: Document },
  { title: 'Total Income', value: '$20,000', icon: Document },
  { title: 'Total Profit', value: '$10,000', icon: Document },
])
</script>
<template>
  <el-row :gutter="16" class="gap-y-4">
    <el-col :span="8" v-for="(transaction, index) in transactions" :key="index">
      <MdCard :title="transaction.title" :value="transaction.value" :icon="transaction.icon" />
    </el-col>
  </el-row>
</template>
