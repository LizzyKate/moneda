<script lang="ts" setup>
import { defineProps, defineEmits, ref, watch } from 'vue'
import { ElSelect, ElOption } from 'element-plus'

interface Option {
  label: string
  value: string | number
}

interface SelectFieldProps {
  modelValue: string | number
  options: Option[]
  placeholder: string
  label: string
  disabled?: boolean
}

const props = defineProps<SelectFieldProps>()

const emit = defineEmits(['update:modelValue'])

const selectedValue = ref(props.modelValue)

watch(
  () => props.modelValue,
  (newVal) => {
    selectedValue.value = newVal
  },
)

watch(selectedValue, (newVal) => {
  emit('update:modelValue', newVal)
})
</script>

<template>
  <div>
    <label v-if="props.label" class="block mb-1">
      {{ props.label }}
    </label>

    <el-select v-model="selectedValue" :placeholder="props.placeholder" :disabled="props.disabled">
      <el-option
        v-for="option in props.options"
        :key="option.value"
        :label="option.label"
        :value="option.value"
        class="text-xs poppins-medium text-[#374151]"
      />
    </el-select>
  </div>
</template>

<style scoped></style>
