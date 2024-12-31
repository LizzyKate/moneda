<script setup lang="ts">
import { ref, watch } from 'vue'
import { type Company } from '../../../types/data'

const modifiedCompanies = ref<Company[]>([])

// Format currency
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

const props = defineProps<{
  companies: Company[]
  isLoading: boolean
}>()

const colors = [
  'bg-purple-400',
  'bg-pink-400',
  'bg-purple-700',
  'bg-emerald-400',
  'bg-blue-500',
  'bg-orange-500',
  'bg-indigo-800',
  'bg-purple-600',
]

const widths = ['w-full', 'w-2/3', 'w-1/2', 'w-1/3', 'w-1/4']

function getRandomIndex(arr: string[]): string {
  return arr[Math.floor(Math.random() * arr.length)]
}
watch(
  () => props.companies,
  (newCompanies) => {
    if (newCompanies && newCompanies.length > 0) {
      modifiedCompanies.value = newCompanies.map((company) => ({
        ...company,
        color: getRandomIndex(colors),
        width: getRandomIndex(widths),
      }))
    }
  },
  { immediate: true },
)
</script>

<template>
  <div>
    <h2 class="text-lg text-[#080808] poppins-medium text-left md:text-center">
      Transaction by awarding companies
    </h2>
  </div>
  <el-card
    class="!border-[#efefef] h-[350px] 2xl:h-[650px] !rounded-lg w-full mx-auto mt-4 !bg-transparent !p-3 !shadow-none"
  >
    <el-skeleton v-if="props.isLoading" :rows="1" animated>
      <template #template>
        <el-skeleton-item class="bg-gray-300" />
      </template>
    </el-skeleton>
    <el-scrollbar v-else height="600px" class="custom-scrollbar">
      <div class="grid grid-cols-12 gap-4">
        <template v-for="(company, index) in modifiedCompanies" :key="`mixed-${index}`">
          <el-tooltip
            :content="formatCurrency(Number(company.value_usd))"
            placement="top"
            effect="light"
          >
            <div
              :class="[
                ' p-4 cursor-pointer transition-all text-start duration-300 hover:opacity-90',
                company.color,
                company.width === 'w-full'
                  ? 'col-span-12'
                  : company.width === 'w-2/3'
                    ? 'col-span-8'
                    : company.width === 'w-1/2'
                      ? 'col-span-6'
                      : company.width === 'w-1/3'
                        ? 'col-span-4'
                        : 'col-span-3',
              ]"
            >
              <span class="text-white poppins-medium text-sm">{{ company.awarding_company }}</span>
            </div>
          </el-tooltip>
        </template>
      </div>
    </el-scrollbar>
  </el-card>
</template>

<style scoped>
.custom-scrollbar :deep(.el-scrollbar__bar) {
  opacity: 0.3;
}

.custom-scrollbar :deep(.el-scrollbar__bar):hover {
  opacity: 0.8;
}
</style>
