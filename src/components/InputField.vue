<script lang="ts" setup>
import { defineProps, ref, watch } from 'vue'
import { ElInput } from 'element-plus'

interface InputFieldProps {
  modelValue: string | number
  type: string
  placeholder: string
  label: string
  disabled?: boolean
  readonly?: boolean
}

const props = defineProps<InputFieldProps>()

watch(
  () => props.modelValue,
  (newVal) => {
    inputValue.value = newVal
  },
)

const inputValue = ref(props.modelValue)
</script>

<template>
  <div class="w-full">
    <!-- Optional label -->
    <label v-if="props.label" class="text-sm font-medium text-gray-700 mb-1">
      {{ props.label }}
    </label>

    <!-- Element Plus input field -->
    <el-input
      v-model="inputValue"
      :type="props.type"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      :readonly="props.readonly"
    />
  </div>
</template>

<style scoped>
/* Optional styling */
label {
  font-weight: 600;
  margin-bottom: 4px;
}
</style>
