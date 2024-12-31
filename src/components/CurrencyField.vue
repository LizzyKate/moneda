<script setup lang="ts">
import { ref, watch } from 'vue'
import DropdownSelect from './DropdownSelect.vue'
import InputField from './InputField.vue'

const props = defineProps<{
  label: string
}>()
const emit = defineEmits(['update:modelValue'])
const currencies = [
  { code: 'USD', value: 'usd' },
  { code: 'EUR', value: 'eur' },
  { code: 'GBP', value: 'gbp' },
  { code: 'NGN', value: 'ngn' },
  { code: 'CNY', value: 'cny' },
  { code: 'JPY', value: 'jpy' },
  { code: 'Swiss Franc', value: 'swiss_franc' },
]

const selectedCurrency = ref(currencies[0].value)
const amount = ref<string>('')

watch([selectedCurrency, amount], () => {
  emit('update:modelValue', { selectedCurrency: selectedCurrency.value, amount: amount.value })
})
</script>

<template>
  <label v-if="props.label" class="text-sm font-medium text-gray-700 mb-1">
    {{ props.label }}
  </label>
  <div class="flex items-center gap-2">
    <DropdownSelect v-model="selectedCurrency" :options="currencies" class="!w-[28%]" />
    <InputField type="number" placeholder="Enter amount" v-model="amount" />
  </div>
</template>
<style scoped></style>
