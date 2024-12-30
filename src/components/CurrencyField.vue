<script setup lang="ts">
import { ref, computed } from 'vue'
import { countries } from 'countries-list'
import currency from 'currency.js'

interface Currency {
  code: string
  symbol: string
  name: string
}

const props = defineProps<{
  label: string
}>()

const currencies = Object.entries(countries).reduce((acc: Currency[], [_, country]) => {
  const currencyCode = country.currency?.[0]
  if (currencyCode && !acc.some((c) => c.code === currencyCode)) {
    acc.push({
      code: currencyCode,
      symbol: currency(0, { symbol: currencyCode }).format(),
      name: currencyCode,
    })
  }
  return acc
}, [])

const selectedCurrency = ref(currencies[0])
const amount = ref<string>('')

const formattedAmount = computed(() => {
  if (!amount.value) return ''
  return currency(amount.value, {
    symbol: selectedCurrency.value.code,
    separator: ',',
    decimal: '.',
  }).format()
})

const handleInput = (event: Event) => {
  const input = (event.target as HTMLInputElement).value
  const cleanValue = input.replace(/[^\d.]/g, '')
  amount.value = cleanValue
}
</script>

<template>
  <label v-if="props.label" class="block text-sm font-medium text-gray-700 mb-1">
    {{ props.label }}
  </label>
  <div class="flex items-center gap-2">
    <el-select v-model="selectedCurrency" filterable class="!w-[15%]">
      <el-option
        v-for="currency in currencies"
        :key="currency.code"
        :label="`${currency.code} - ${currency.name}`"
        :value="currency"
      />
    </el-select>

    <el-input
      :model-value="formattedAmount"
      placeholder="Enter amount"
      @input="handleInput"
      class="w-full"
    />
  </div>
</template>
